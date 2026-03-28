import React, { useEffect, useRef } from "react";
import { cn } from "../../utils";

interface GravityStarsBackgroundProps {
  starColor?: string;
  className?: string;
  count?: number;
}

export const GravityStarsBackground: React.FC<GravityStarsBackgroundProps> = ({
  starColor = "#fdbf1f",
  className,
  count = 150,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    const stars: {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      baseX: number;
      baseY: number;
      opacity: number;
    }[] = [];

    for (let i = 0; i < count; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
      stars.push({
        x: x,
        y: y,
        baseX: x,
        baseY: y,
        r: Math.random() * 1.5 + 0.5,
        vx: 0,
        vy: 0,
        opacity: Math.random(),
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        // Gravity / Mouse Repulsion Physics
        const dx = mouse.x - star.x;
        const dy = mouse.y - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Repel from mouse
        const interactionRadius = 150;
        if (distance < interactionRadius) {
            const force = (interactionRadius - distance) / interactionRadius;
            star.vx -= (dx / distance) * force * 0.3;
            star.vy -= (dy / distance) * force * 0.3;
        }

        // Spring back to base position (gravity anchor)
        star.vx += (star.baseX - star.x) * 0.01;
        star.vy += (star.baseY - star.y) * 0.01;

        // Friction
        star.vx *= 0.9;
        star.vy *= 0.9;

        // Apply velocities
        star.x += star.vx;
        star.y += star.vy;

        // Twinkle
        star.opacity += (Math.random() - 0.5) * 0.1;
        if (star.opacity < 0.2) star.opacity = 0.2;
        if (star.opacity > 0.8) star.opacity = 0.8;

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = starColor;
        ctx.globalAlpha = star.opacity;
        ctx.fill();
        
        // Minor ambient drifting
        star.baseY -= 0.2;
        if (star.baseY < -10) {
            star.baseY = canvas.height + 10;
            star.y = star.baseY;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [starColor, count]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 pointer-events-none z-0", className)}
    />
  );
};
