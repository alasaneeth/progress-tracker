import { useEffect, useRef } from "react";

export default function Confetti({ active }) {
  const ref = useRef(null);
  const anim = useRef(null);
  const parts = useRef([]);

  useEffect(() => {
    if (!active) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const COLORS = [
      "#f7971e", "#ffd200", "#34d399", "#f87171",
      "#a78bfa", "#60a5fa", "#ec4899", "#22d3ee",
    ];

    parts.current = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: -20,
      w: Math.random() * 12 + 4,
      h: Math.random() * 6 + 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      vy: Math.random() * 5 + 2,
      vx: (Math.random() - 0.5) * 4,
      angle: Math.random() * 360,
      spin: (Math.random() - 0.5) * 8,
      life: 1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      parts.current.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx;
        p.angle += p.spin;
        if (p.y > canvas.height * 0.55) p.life -= 0.014;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.angle * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      parts.current = parts.current.filter(
        (p) => p.life > 0 && p.y < canvas.height + 30
      );
      if (parts.current.length > 0) anim.current = requestAnimationFrame(draw);
    };

    anim.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(anim.current);
  }, [active]);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
        display: active ? "block" : "none",
      }}
    />
  );
}