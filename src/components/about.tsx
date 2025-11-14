"use client";

import { useState } from "react";

const tickerWords =
  "PERFORMANCE \u2022 PRECISION \u2022 ELEGANCE \u2022 BESPOKE \u2022 CLARITY \u2022";

export default function AboutSection() {
  const [cursor, setCursor] = useState({ x: 0, y: 0, active: false });

  const handleMouseMove = (event: React.MouseEvent<HTMLParagraphElement>) => {
    setCursor((prev) => ({
      ...prev,
      x: event.clientX,
      y: event.clientY,
    }));
  };

  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20 pb-36 text-center text-zinc-50 sm:py-24 sm:pb-24 md:px-12 lg:px-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_#111827_0,_#020617_65%)] opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-[url('/hero-texture.webp')] bg-cover bg-center opacity-20 mix-blend-soft-light" />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-10 pb-12 sm:pb-0">
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
          About
        </p>
        <div className="space-y-8 text-balance">
          <h2 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl md:text-6xl">
            Minimal on the surface.
            <span className="block text-zinc-400">
              Tailored to feel quietly inevitable.
            </span>
          </h2>
          <p
            onMouseMove={handleMouseMove}
            onMouseEnter={() =>
              setCursor((prev) => ({ ...prev, active: true }))
            }
            onMouseLeave={() =>
              setCursor((prev) => ({ ...prev, active: false }))
            }
            className="max-w-3xl text-pretty text-base leading-relaxed text-zinc-400 md:text-lg"
          >
            Every interaction on this page has a purpose. Typography, spacing,
            and motion are tuned to keep the experience quiet, confident, and
            fast. No heavy scripts, no visual clutter—just a focused narrative
            that guides visitors from first impression to contact.{" "}
            <span className="font-semibold text-zinc-100">Obsessive</span> about
            performance underneath, effortless on the surface.
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-[-20%] bottom-10 flex overflow-hidden opacity-10 sm:bottom-24 sm:opacity-20">
        <div className="animate-marquee whitespace-nowrap text-2xl font-semibold uppercase tracking-[0.5em] text-white/30 sm:text-4xl">
          {tickerWords.repeat(6)}
        </div>
      </div>

      <div
        className={`pointer-events-none fixed z-30 h-12 w-12 rounded-full border border-emerald-300/70 opacity-0 transition-opacity duration-200 ${
          cursor.active ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: `translate3d(${cursor.x - 24}px, ${cursor.y - 24}px, 0)`,
        }}
      />
    </section>
  );
}
