// ─────────────────────────────────────────────────────────────────────────────
// PrimeLabs — Booking notification email (Web3Forms)
//
// Sends the "New PrimeLabs Booking Request" notification to the address
// configured in the Web3Forms account (hello.primelabs@gmail.com), including
// the customer's details and — where they fit within size limits — their
// uploaded photos as attachments.
//
// SETUP (see MANAGE.md):
//   Add your Web3Forms access key to the environment as
//   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY (in .env.local locally, and in the Vercel
//   project settings for production). Web3Forms access keys are public by
//   design, so exposing it in the browser is expected and safe.
// ─────────────────────────────────────────────────────────────────────────────

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

// Keep the total attachment payload comfortably under Web3Forms' limit.
const MAX_TOTAL_ATTACHMENT_BYTES = 4.5 * 1024 * 1024; // ~4.5 MB
const MAX_IMAGE_DIMENSION = 1600; // px (longest edge)
const JPEG_QUALITY = 0.7;

export interface BookingEmailPayload {
  fullName: string;
  mobile: string;
  email?: string;
  vehicle: string;
  address: string;
  preferredDate: string;
  preferredTime: string;
  vehicleNotes?: string;
  additionalNotes?: string;
  photos: File[];
}

export interface BookingEmailResult {
  ok: boolean;
  photosAttached: number;
  photosOmitted: number;
  error?: string;
}

/**
 * Downscale + re-encode an image File to a JPEG Blob to keep attachments small.
 * Falls back to the original File if anything goes wrong (e.g. non-image input).
 */
async function compressImage(file: File): Promise<Blob> {
  if (!file.type.startsWith('image/')) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close?.();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY),
    );
    // Use the smaller of original vs compressed.
    if (blob && blob.size < file.size) return blob;
    return file;
  } catch {
    return file;
  }
}

function line(label: string, value?: string): string {
  return `${label}: ${value && value.trim() ? value.trim() : '—'}`;
}

export async function sendBookingEmail(
  payload: BookingEmailPayload,
): Promise<BookingEmailResult> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return {
      ok: false,
      photosAttached: 0,
      photosOmitted: payload.photos.length,
      error: 'Missing NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY',
    };
  }

  // Compress photos and keep as many as fit under the size budget.
  const attachments: { blob: Blob; name: string }[] = [];
  let runningTotal = 0;
  let omitted = 0;
  for (let i = 0; i < payload.photos.length; i++) {
    const original = payload.photos[i];
    const blob = await compressImage(original);
    if (runningTotal + blob.size > MAX_TOTAL_ATTACHMENT_BYTES) {
      omitted++;
      continue;
    }
    runningTotal += blob.size;
    const baseName = original.name.replace(/\.[^.]+$/, '') || `photo-${i + 1}`;
    attachments.push({ blob, name: `${baseName}.jpg` });
  }

  const photoCount = payload.photos.length;
  const photosSummary =
    photoCount === 0
      ? 'None provided'
      : omitted > 0
        ? `${attachments.length} of ${photoCount} attached (${omitted} too large to attach — ask customer to resend if needed)`
        : `${attachments.length} attached`;

  const message = [
    'New PrimeLabs Booking Request',
    '',
    line('Name', payload.fullName),
    line('Mobile', payload.mobile),
    line('Email', payload.email),
    line('Vehicle', payload.vehicle),
    line('Service Address / Suburb', payload.address),
    line('Preferred Date', payload.preferredDate),
    line('Preferred Time', payload.preferredTime),
    line('Vehicle Details / Requests', payload.vehicleNotes),
    line('Additional Notes', payload.additionalNotes),
    line('Photos', photosSummary),
    'Status: Pending Review',
  ].join('\n');

  const buildForm = (withAttachments: boolean): FormData => {
    const form = new FormData();
    form.append('access_key', accessKey);
    form.append('subject', 'New PrimeLabs Booking Request');
    form.append('from_name', 'PrimeLabs Website');
    if (payload.email && payload.email.trim()) form.append('replyto', payload.email.trim());

    // Individual fields (render as a readable table in the email) …
    form.append('Name', payload.fullName);
    form.append('Mobile', payload.mobile);
    form.append('Email', payload.email?.trim() || '—');
    form.append('Vehicle', payload.vehicle);
    form.append('Service Address / Suburb', payload.address);
    form.append('Preferred Date', payload.preferredDate);
    form.append('Preferred Time', payload.preferredTime);
    form.append('Vehicle Details / Requests', payload.vehicleNotes?.trim() || '—');
    form.append('Additional Notes', payload.additionalNotes?.trim() || '—');
    form.append('Photos', photosSummary);
    form.append('Status', 'Pending Review');
    // … plus a plain-text message as a fallback/summary.
    form.append('message', message);

    if (withAttachments) {
      attachments.forEach((a, i) => {
        form.append(`photo_${i + 1}`, a.blob, a.name);
      });
    }
    return form;
  };

  const post = async (withAttachments: boolean): Promise<boolean> => {
    const res = await fetch(WEB3FORMS_ENDPOINT, { method: 'POST', body: buildForm(withAttachments) });
    if (!res.ok) return false;
    const data = await res.json().catch(() => ({ success: false }));
    return Boolean(data?.success);
  };

  try {
    // First attempt with attachments (if any).
    if (await post(attachments.length > 0)) {
      return { ok: true, photosAttached: attachments.length, photosOmitted: omitted };
    }
    // Fallback: attachments may have pushed the request over a server limit —
    // resend without files so the request itself is never lost.
    if (attachments.length > 0 && (await post(false))) {
      return {
        ok: true,
        photosAttached: 0,
        photosOmitted: photoCount,
        error: 'Sent without photo attachments (size limit).',
      };
    }
    return {
      ok: false,
      photosAttached: 0,
      photosOmitted: photoCount,
      error: 'Web3Forms submission failed.',
    };
  } catch (err) {
    return {
      ok: false,
      photosAttached: 0,
      photosOmitted: photoCount,
      error: err instanceof Error ? err.message : 'Network error.',
    };
  }
}
