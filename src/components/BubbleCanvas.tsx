'use client';

import { useEffect, useRef } from 'react';

const hexToRgb = (hex: string): [number, number, number] | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
};

interface Bubble {
  x: number;
  worldY: number;
  depth: number;
  radius: number;
  velocityY: number;
  bobAmplitude: number;
  bobFrequency: number;
  swayAmplitude: number;
  swayPhase: number;
  time: number;
}

interface Config {
  density: number;
  driftSpeed: number;
  parallax: number;
  depthTint: boolean;
  accentColor: string;
}

const DEFAULT_CONFIG: Config = {
  density: 100,
  driftSpeed: 0.25,
  parallax: 0.4,
  depthTint: true,
  accentColor: '#00D4FF',
};

interface BubbleCanvasProps {
  config?: Partial<Config>;
  onConfigChange?: (config: Config) => void;
}

export default function BubbleCanvas({ config: propConfig, onConfigChange }: BubbleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const scrollRef = useRef(0);
  const smoothScrollRef = useRef(0);
  const configRef = useRef<Config>({ ...DEFAULT_CONFIG, ...propConfig });
  const animationFrameRef = useRef<number | undefined>(undefined);
  const tintDivRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (propConfig) {
      configRef.current = { ...configRef.current, ...propConfig };
      onConfigChange?.(configRef.current);
    }
  }, [propConfig, onConfigChange]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const onMouseMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onMouseLeave = () => { mouseRef.current = null; };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);

    window.addEventListener('resize', resizeCanvas);

    // Initialize bubbles
    const initBubbles = () => {
      const bubbleCount = Math.floor((canvas.width * canvas.height) / 10000) * (configRef.current.density / 100);
      bubblesRef.current = [];

      for (let i = 0; i < bubbleCount; i++) {
        const depth = Math.random() * 0.8 + 0.2;
        const radius = 7 + Math.pow(Math.random(), 1.5) * 64 * depth;

        bubblesRef.current.push({
          x: Math.random() * canvas.width,
          worldY: Math.random() * canvas.height * 3,
          depth,
          radius,
          velocityY: (0.5 + depth * 0.5) * configRef.current.driftSpeed,
          bobAmplitude: 6 + Math.random() * 18,
          bobFrequency: 0.15 + Math.random() * 0.45,
          swayAmplitude: 4 + Math.random() * 18,
          swayPhase: Math.random() * Math.PI * 2,
          time: 0,
        });
      }
    };

    initBubbles();

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    const animate = (timestamp: number) => {
      smoothScrollRef.current += (scrollRef.current - smoothScrollRef.current) * 0.1;

      bubblesRef.current.forEach((bubble) => {
        bubble.time += 0.016;
        bubble.worldY += bubble.velocityY;

        // Mouse proximity repel
        if (mouseRef.current) {
          const screenY = bubble.worldY - smoothScrollRef.current * configRef.current.parallax * bubble.depth;
          const dx = bubble.x - mouseRef.current.x;
          const dy = screenY - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const repelRadius = bubble.radius * 4 + 80;
          if (dist < repelRadius && dist > 0) {
            const force = (1 - dist / repelRadius) * 1.2;
            bubble.x += (dx / dist) * force * 1.5;
            bubble.worldY += (dy / dist) * force * 1.5;
          }
        }

        const wrapHeight = canvas.height * 3;
        if (bubble.worldY > scrollRef.current + wrapHeight) {
          bubble.worldY = scrollRef.current - bubble.radius;
        }
      });

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubblesRef.current.forEach((bubble) => {
        const screenY = bubble.worldY - smoothScrollRef.current * configRef.current.parallax * bubble.depth;
        const bobOffset = Math.sin(bubble.time * bubble.bobFrequency) * bubble.bobAmplitude;
        const swayOffset = Math.sin(bubble.time * bubble.bobFrequency * 0.7 + bubble.swayPhase) * bubble.swayAmplitude;

        const finalY = screenY + bobOffset;
        const finalX = bubble.x + swayOffset;

        if (finalY > -bubble.radius * 2 && finalY < canvas.height + bubble.radius * 2) {
          const accentColor = configRef.current.accentColor;
          const rgb = hexToRgb(accentColor);
          const rgbStr = rgb ? `${rgb[0]}, ${rgb[1]}, ${rgb[2]}` : '0, 212, 255';

          const gradient = ctx.createRadialGradient(
            finalX - bubble.radius * 0.3,
            finalY - bubble.radius * 0.3,
            0,
            finalX,
            finalY,
            bubble.radius
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${0.12 * (1 - bubble.depth * 0.3)})`);
          gradient.addColorStop(0.5, `rgba(${rgbStr}, ${0.06 * (1 - bubble.depth * 0.2)})`);
          gradient.addColorStop(1, `rgba(${rgbStr}, 0)`);

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(finalX, finalY, bubble.radius, 0, Math.PI * 2);
          ctx.fill();

          // Subtle rim glow
          ctx.strokeStyle = `rgba(${rgbStr}, ${0.25 * (1 - bubble.depth * 0.3)})`;
          ctx.lineWidth = Math.max(0.5, bubble.radius * 0.04);
          ctx.beginPath();
          ctx.arc(finalX, finalY, bubble.radius, 0, Math.PI * 2);
          ctx.stroke();

          // Large soft inner glow from the highlight side
          const innerGlowGradient = ctx.createRadialGradient(
            finalX - bubble.radius * 0.3,
            finalY - bubble.radius * 0.3,
            0,
            finalX - bubble.radius * 0.3,
            finalY - bubble.radius * 0.3,
            bubble.radius * 0.7
          );
          innerGlowGradient.addColorStop(0, `rgba(200, 230, 255, ${0.07 * (1 - bubble.depth * 0.2)})`);
          innerGlowGradient.addColorStop(1, 'rgba(200, 230, 255, 0)');
          ctx.fillStyle = innerGlowGradient;
          ctx.beginPath();
          ctx.arc(finalX, finalY, bubble.radius, 0, Math.PI * 2);
          ctx.fill();

          // Sharp bright specular highlight
          const highlightX = finalX - bubble.radius * 0.3;
          const highlightY = finalY - bubble.radius * 0.3;
          const highlightGradient = ctx.createRadialGradient(
            highlightX,
            highlightY,
            0,
            highlightX,
            highlightY,
            bubble.radius * 0.28
          );
          highlightGradient.addColorStop(0, `rgba(255, 255, 255, ${0.95 * (1 - bubble.depth * 0.15)})`);
          highlightGradient.addColorStop(0.4, `rgba(255, 255, 255, ${0.4 * (1 - bubble.depth * 0.15)})`);
          highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.fillStyle = highlightGradient;
          ctx.beginPath();
          ctx.arc(highlightX, highlightY, bubble.radius * 0.28, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      if (configRef.current.depthTint && tintDivRef.current) {
        const scrollProgress = Math.min(scrollRef.current / (document.documentElement.scrollHeight - window.innerHeight), 1);
        const startColor = [10, 20, 32];
        const endColor = [2, 6, 15];
        const color = startColor.map((s, i) =>
          Math.round(s + (endColor[i] - s) * scrollProgress)
        );
        tintDivRef.current.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

        const glowAlpha = Math.max(0, 1 - scrollProgress);
        const accentColor = configRef.current.accentColor;
        const rgb = hexToRgb(accentColor);
        const rgbStr = rgb ? `${rgb[0]}, ${rgb[1]}, ${rgb[2]}` : '0, 212, 255';
        tintDivRef.current.style.boxShadow = `inset 0 100px 200px rgba(${rgbStr}, ${glowAlpha * 0.1})`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ background: 'transparent', zIndex: 1 }}
      />
      <div
        ref={tintDivRef}
        className="fixed inset-0 pointer-events-none transition-colors"
        style={{
          backgroundColor: 'rgb(10, 20, 32)',
          zIndex: 0,
        }}
      />
    </>
  );
}
