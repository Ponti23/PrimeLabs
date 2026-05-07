'use client';

import { useState } from 'react';
import BubbleCanvas from './BubbleCanvas';
import BubbleSettings from './BubbleSettings';

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

export default function BubbleCanvasWrapper() {
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);

  return (
    <>
      <BubbleCanvas config={config} />
      <BubbleSettings config={config} onChange={setConfig} />
    </>
  );
}
