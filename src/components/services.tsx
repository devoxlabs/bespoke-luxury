"use client";

const services = [
  "High-impact hero design and typography systems.",
  "Ultra-fast marketing sites built on Next.js.",
  "Subtle interaction design and hover polish.",
  "Performance-focused image and asset strategy.",
  "Responsive layouts that feel native everywhere.",
  "Tidy, maintainable TypeScript and Tailwind setups.",
];

const repeated = [...services, ...services, ...services];

function ServiceCard({ text }: { text: string }) {
  return (
    <div className="service-card min-w-[260px] flex-shrink-0 rounded-2xl border border-zinc-800/60 bg-black/40 px-6 py-5 text-sm text-zinc-200 shadow-[0_0_0_1px_rgba(0,0,0,0.6)] transition duration-300 hover:-translate-y-2 hover:border-emerald-200/80 hover:text-white hover:shadow-[0_12px_35px_rgba(16,185,129,0.25)]">
      <p className="leading-relaxed">{text}</p>
    </div>
  );
}

function TickerRow({
  direction,
}: {
  direction: "left" | "right";
}) {
  return (
    <div
      className="group relative overflow-hidden py-10"
      onMouseEnter={(event) => {
        const row = event.currentTarget.querySelector(".ticker-row");
        if (row) {
          (row as HTMLElement).style.animationPlayState = "paused";
        }
      }}
      onMouseLeave={(event) => {
        const row = event.currentTarget.querySelector(".ticker-row");
        if (row) {
          (row as HTMLElement).style.animationPlayState = "running";
        }
      }}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[12%] bg-gradient-to-r from-[#050509] via-[#050509]/70 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[12%] bg-gradient-to-l from-[#050509] via-[#050509]/70 to-transparent" />
      <div
        className={`ticker-row flex gap-4 ${direction === "left" ? "animate-ticker-left" : "animate-ticker-right"}`}
      >
        {repeated.map((item, index) => (
          <ServiceCard text={item} key={`${item}-${index}`} />
        ))}
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative flex min-h-screen flex-col justify-center border-y border-zinc-800 bg-black/20 px-6 py-24 text-zinc-50 md:px-12 lg:px-20"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 text-center">
        <TickerRow direction="left" />

        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
            Services
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            What we focus on.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">
            Strategy, typography, and interaction design aligned to feel quietly
            inevitable across every screen. Each capability is engineered to stay
            fast, thoughtful, and perfectly on brand.
          </p>
        </div>

        <TickerRow direction="right" />
      </div>
    </section>
  );
}
