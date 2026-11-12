"use client";

import { useEffect, useRef } from "react";

interface LatticeNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  phase: number;
}

export function HeroAmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationId = 0;
    let nodes: LatticeNode[] = [];

    const pointer = { x: -9999, y: -9999, active: false };

    const initNodes = () => {
      const count = width < 640 ? 22 : width < 1024 ? 32 : 44;
      nodes = Array.from({ length: count }, (_, i) => ({
        x: ((i * 197.3) % 1) * width || Math.random() * width,
        y: ((i * 311.7) % 1) * height || Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.18,
        radius: 1.2 + Math.random() * 1.4,
        alpha: 0.18 + Math.random() * 0.28,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initNodes();
    };

    const drawFrame = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const maxDist = width < 640 ? 120 : 165;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (!motionQuery.matches) {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < -20) node.x = width + 20;
          if (node.x > width + 20) node.x = -20;
          if (node.y < -20) node.y = height + 20;
          if (node.y > height + 20) node.y = -20;

          if (pointer.active) {
            const dx = pointer.x - node.x;
            const dy = pointer.y - node.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 180 && dist > 1) {
              node.x += (dx / dist) * 0.16;
              node.y += (dy / dist) * 0.16;
            }
          }
        }

        // Draw subtle connecting hairlines
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.hypot(dx, dy);
          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.2;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(49, 94, 171, ${opacity.toFixed(3)})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        // Draw node dot
        const pulse = motionQuery.matches
          ? 1
          : 0.85 + 0.15 * Math.sin(time * 0.0014 + node.phase);
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(49, 94, 171, ${(node.alpha * 1.2 * pulse).toFixed(3)})`;
        ctx.fill();
      }

      if (!motionQuery.matches) {
        animationId = window.requestAnimationFrame(drawFrame);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    resize();
    animationId = window.requestAnimationFrame(drawFrame);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    const handleMotionChange = () => {
      window.cancelAnimationFrame(animationId);
      drawFrame(0);
    };
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
