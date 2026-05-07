'use client';

import { useState } from 'react';

interface Config {
  density: number;
  driftSpeed: number;
  parallax: number;
  depthTint: boolean;
  accentColor: string;
}

interface BubbleSettingsProps {
  config: Config;
  onChange: (config: Config) => void;
}

export default function BubbleSettings({ config, onChange }: BubbleSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = <K extends keyof Config>(key: K, value: Config[K]) => {
    onChange({ ...config, [key]: value });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-500/50 hover:bg-cyan-500/30 transition-colors flex items-center justify-center text-cyan-400 text-lg font-bold z-50"
        title="Open bubble settings"
      >
        ⚙️
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-slate-900/95 border border-cyan-500/30 rounded-lg p-6 shadow-2xl z-50 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-cyan-400 font-bold">Bubble Settings</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-white text-lg"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        {/* Density */}
        <div>
          <label className="text-gray-300 text-sm font-medium flex justify-between">
            <span>Density</span>
            <span className="text-cyan-400">{Math.round(config.density)}</span>
          </label>
          <input
            type="range"
            min="4"
            max="200"
            step="1"
            value={config.density}
            onChange={(e) => handleChange('density', parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
          <p className="text-xs text-gray-500 mt-1">Number of bubbles (4–200)</p>
        </div>

        {/* Drift Speed */}
        <div>
          <label className="text-gray-300 text-sm font-medium flex justify-between">
            <span>Drift Speed</span>
            <span className="text-cyan-400">{config.driftSpeed.toFixed(2)}</span>
          </label>
          <input
            type="range"
            min="0.05"
            max="15"
            step="0.1"
            value={config.driftSpeed}
            onChange={(e) => handleChange('driftSpeed', parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
          <p className="text-xs text-gray-500 mt-1">Upward movement speed (0.05–15.0)</p>
        </div>

        {/* Parallax */}
        <div>
          <label className="text-gray-300 text-sm font-medium flex justify-between">
            <span>Parallax</span>
            <span className="text-cyan-400">{config.parallax.toFixed(2)}</span>
          </label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.05"
            value={config.parallax}
            onChange={(e) => handleChange('parallax', parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
          <p className="text-xs text-gray-500 mt-1">Scroll depth effect (0–2.0)</p>
        </div>

        {/* Depth Tint Toggle */}
        <div>
          <label className="text-gray-300 text-sm font-medium flex items-center justify-between">
            <span>Depth Tint</span>
            <button
              onClick={() => handleChange('depthTint', !config.depthTint)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                config.depthTint
                  ? 'bg-cyan-500/30 text-cyan-400 border border-cyan-500/50'
                  : 'bg-slate-700 text-gray-400 border border-slate-600'
              }`}
            >
              {config.depthTint ? 'ON' : 'OFF'}
            </button>
          </label>
          <p className="text-xs text-gray-500 mt-1">Darken background as you scroll</p>
        </div>

        {/* Accent Color */}
        <div>
          <label className="text-gray-300 text-sm font-medium flex justify-between">
            <span>Accent Color</span>
            <span className="text-cyan-400 font-mono text-xs">{config.accentColor}</span>
          </label>
          <input
            type="color"
            value={config.accentColor}
            onChange={(e) => handleChange('accentColor', e.target.value)}
            className="w-full h-10 rounded cursor-pointer"
          />
          <p className="text-xs text-gray-500 mt-1">Bubble rim and glow color</p>
        </div>
      </div>

      <button
        onClick={() =>
          onChange({
            density: 100,
            driftSpeed: 0.25,
            parallax: 0.4,
            depthTint: true,
            accentColor: '#00D4FF',
          })
        }
        className="w-full mt-4 py-2 text-xs font-medium text-gray-300 bg-slate-700 hover:bg-slate-600 rounded transition-colors"
      >
        Reset to Default
      </button>
    </div>
  );
}
