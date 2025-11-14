import About from "@/components/about";
import ContactForm from "@/components/contact-form";
import FloatingHeader from "@/components/floating-header";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Image from "next/image";

const projects = [
  {
    title: "Digital Atelier",
    description: "Tailored commerce platform for a couture house.",
    image: "/images/adrianna-geo-1rBg5YSi00c-unsplash.jpg",
  },
  {
    title: "Heritage Archive",
    description: "Interactive museum archive with cinematic pacing.",
    image: "/images/birmingham-museums-trust-pWVJHDiAonU-unsplash.jpg",
  },
  {
    title: "Nocturne Spaces",
    description: "Architectural lighting site blending art & utility.",
    image: "/images/birmingham-museums-trust-wKlHsooRVbg-unsplash.jpg",
  },
  {
    title: "Monograph Studio",
    description: "Editorial hub for a boutique strategy firm.",
    image: "/images/dan-farrell-fT49QnFucQ8-unsplash.jpg",
  },
  {
    title: "Aurora Editions",
    description: "Publishing experience focused on typography purity.",
    image: "/images/europeana-5TK1F5VfdIk-unsplash.jpg",
  },
  {
    title: "Silent Resonance",
    description: "Immersive audio brand reveal with subtle motion.",
    image: "/images/europeana-6c43FgRt0Dw-unsplash.jpg",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <FloatingHeader />
      <Hero />
      <About />

      <Services />

      {/* Gallery / Work */}
      <section
        id="work"
        className="mx-auto max-w-5xl px-6 py-24 md:px-12 lg:px-20"
      >
        <div className="flex flex-col gap-6 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Selected work
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
              Blue-note studies in clarity.
            </h2>
          </div>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-zinc-400 md:mx-0">
            Portraits of strategy, light, and craft—cropped to feel cinematic and
            toned to match our monochrome palette. Each tile links to a deeper
            narrative about velocity and restraint.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-zinc-800/70 bg-[#050509] shadow-[0_0_0_1px_rgba(0,0,0,0.7)] transition-transform duration-200 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="absolute inset-0 object-cover"
                style={{
                  filter:
                    "grayscale(1) contrast(1.15) saturate(1.2) hue-rotate(205deg) brightness(0.85)",
                }}
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 300px"
                priority={index < 3}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#01030b]/85 via-[#020617]/35 to-transparent" />
              <div className="relative flex h-full flex-col justify-between p-4">
                <div className="h-1 w-10 rounded-full bg-zinc-500/70 transition-colors group-hover:bg-emerald-300/70" />
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
                    Study {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="text-sm font-semibold text-zinc-50">
                    {project.title}
                  </p>
                  <p className="text-xs text-zinc-400">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="border-t border-zinc-800 bg-black/40"
      >
        <div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center gap-16 px-6 py-24 text-center md:flex-row md:px-12 md:text-left lg:px-20">
          <div className="flex-1 space-y-6">
            <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
              Contact
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
              Request a private consultation.
            </h2>
            <p className="mx-auto max-w-md text-sm leading-relaxed text-zinc-400 md:mx-0">
              Share the essentials—vision, timing, constraints. We respond within
              two business days with availability, process, and what a bespoke
              engagement looks like for your team.
            </p>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              Bespoke studio · Invite-only projects
            </p>
          </div>

          <div className="flex-1">
            <ContactForm />
          </div>
        </div>

        <footer className="border-t border-zinc-800/70 px-6 py-6 text-xs text-zinc-500 md:px-12 lg:px-20">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
            <span>© {new Date().getFullYear()} Bespoke Studio</span>
            <span className="hidden sm:inline">
              Built with Next.js, TypeScript, and Tailwind CSS.
            </span>
          </div>
        </footer>
      </section>
    </main>
  );
}
