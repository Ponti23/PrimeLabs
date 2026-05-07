'use client';

import { useEffect, useRef } from 'react';

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

export default function BubbleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const scrollRef = useRef(0);
  const smoothScrollRef = useRef(0);
  const configRef = useRef(DEFAULT_CONFIG);
  const animationFrameRef = useRef<number>();
  const tintDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log('Canvas ref not available');
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      console.log('Reduced motion enabled, skipping animation');
      return;
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      console.log('Canvas resized to:', canvas.width, 'x', canvas.height);
    };

    resizeCanvas();

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.log('2D context not available');
      return;
    }

    console.log('BubbleCanvas initialized, context ready');

    window.addEventListener('resize', resizeCanvas);

    // Initialize bubbles
    const initBubbles = () => {
      const bubbleCount = Math.floor((canvas.width * canvas.height) / 10000) * (configRef.current.density / 100);
      bubblesRef.current = [];
      console.log('Creating', bubbleCount, 'bubbles');

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
          const gradient = ctx.createRadialGradient(
            finalX - bubble.radius * 0.3,
            finalY - bubble.radius * 0.3,
            0,
            finalX,
            finalY,
            bubble.radius
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${0.6 * (1 - bubble.depth * 0.3)})`);
          gradient.addColorStop(0.6, `rgba(0, 212, 255, ${0.3 * (1 - bubble.depth * 0.2)})`);
          gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(finalX, finalY, bubble.radius, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = `rgba(0, 212, 255, ${0.4 * (1 - bubble.depth * 0.3)})`;
          ctx.lineWidth = Math.max(1, bubble.radius * 0.08);
          ctx.beginPath();
          ctx.arc(finalX, finalY, bubble.radius, 0, Math.PI * 2);
          ctx.stroke();

          const highlightX = finalX - bubble.radius * 0.25;
          const highlightY = finalY - bubble.radius * 0.25;
          const highlightGradient = ctx.createRadialGradient(
            highlightX,
            highlightY,
            0,
            highlightX,
            highlightY,
            bubble.radius * 0.15
          );
          highlightGradient.addColorStop(0, `rgba(255, 255, 255, ${0.8 * (1 - bubble.depth * 0.2)})`);
          highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.fillStyle = highlightGradient;
          ctx.beginPath();
          ctx.arc(highlightX, highlightY, bubble.radius * 0.15, 0, Math.PI * 2);
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
        tintDivRef.current.style.boxShadow = `inset 0 100px 200px rgba(0, 212, 255, ${glowAlpha * 0.1})`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
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
