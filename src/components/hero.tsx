"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const headlineLines = [
  "Tailored Digital Experiences",
  "Engineered For Speed & Clarity.",
];
const letterDelay = 0.03;
const linePause = 0.12;
const letterCounts = headlineLines.map((line) => Array.from(line).length);
const lineDelays = (() => {
  const delays: number[] = [];
  let cumulative = 0;
  letterCounts.forEach((count, index) => {
    delays.push(cumulative);
    cumulative += count * letterDelay;
    if (index < letterCounts.length - 1) {
      cumulative += linePause;
    }
  });
  return delays;
})();
const totalHeadlineDuration =
  lineDelays[lineDelays.length - 1] +
  letterCounts[letterCounts.length - 1] * letterDelay;
const supportingContentDelay = totalHeadlineDuration + 0.5;
const subtextVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: supportingContentDelay,
      type: "spring",
      stiffness: 160,
      damping: 24,
    },
  },
};
const buttonsDelay = supportingContentDelay + 0.3;
const primaryButtonVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: buttonsDelay,
      duration: 0.6,
      // removed `ease` to satisfy framer-motion TypeScript definitions
    },
  },
};
const secondaryButtonVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: buttonsDelay + 0.08,
      duration: 0.6,
      // removed `ease` to satisfy framer-motion TypeScript definitions
    },
  },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
  <div className="pointer-events-none absolute inset-0 bg-hero-radial" />
      <div className="absolute inset-0 bg-[url('/hero-texture.webp')] bg-cover bg-center opacity-35 mix-blend-soft-light" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 py-36 text-center">
        <div className="w-full">
          <motion.h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-zinc-50 sm:text-5xl md:text-6xl lg:text-7xl">
            {headlineLines.map((line, lineIndex) => {
              const words = line.split(" ");
              let charOffset = 0;
              return (
                <span
                  key={line}
                  className={`block ${
                    lineIndex === 0 ? "text-zinc-50" : "text-zinc-400"
                  }`}
                >
                  {words.map((word, wordIndex) => {
                    const letters = Array.from(word);
                    const isLastWord = wordIndex === words.length - 1;
                    const wordContent = letters.map((letter, letterIndex) => {
                      const delay =
                        lineDelays[lineIndex] +
                        (charOffset + letterIndex) * letterDelay;
                      return (
                        <motion.span
                          key={`${lineIndex}-${wordIndex}-${letterIndex}-${letter}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay,
                            type: "spring",
                            stiffness: 320,
                            damping: 28,
                            mass: 0.45,
                          }}
                          className="inline-block"
                        >
                          {letter}
                        </motion.span>
                      );
                    });

                    charOffset += letters.length;
                    if (!isLastWord) {
                      charOffset += 1;
                    }

                    return (
                      <span
                        key={`${line}-${wordIndex}`}
                        className={`inline-flex whitespace-nowrap ${
                          isLastWord ? "" : "mr-3 md:mr-4"
                        }`}
                      >
                        {wordContent}
                      </span>
                    );
                  })}
                </span>
              );
            })}
          </motion.h1>

          <div className="mt-6 flex flex-col items-center space-y-6 text-center">
            <motion.p
              initial="hidden"
              animate="visible"
              variants={subtextVariants}
              className="max-w-xl text-pretty text-sm leading-relaxed text-zinc-400 sm:text-base"
            >
              A minimal, performance-obsessed studio site built with Next.js,
              TypeScript, and Tailwind. No noise—just sharp typography, balanced
              whitespace, and effortless scrolling.
            </motion.p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.a
                initial="hidden"
                animate="visible"
                variants={primaryButtonVariants}
                href="#contact"
                className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold tracking-wide text-white shadow-lg shadow-black/40 backdrop-blur-lg transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-105 hover:shadow-emerald-500/40"
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Start a project</span>
                <div className="pointer-events-none absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-110%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(110%)]">
                  <div className="relative h-full w-10 bg-white/20" />
                </div>
              </motion.a>
              <motion.a
                initial="hidden"
                animate="visible"
                variants={secondaryButtonVariants}
                href="#work"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold tracking-wide text-zinc-100 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:text-emerald-200"
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">View selected work</span>
                <div className="pointer-events-none absolute inset-0">
                  <span className="absolute right-2 top-1 h-10 w-10 rounded-full bg-emerald-500/40 blur-lg transition-all duration-500 group-hover:-right-4 group-hover:-top-2" />
                  <span className="absolute right-8 top-0 h-14 w-14 rounded-full bg-white/20 blur-lg transition-all duration-500 group-hover:right-10 group-hover:-top-3" />
                </div>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
