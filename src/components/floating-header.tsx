"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import type { Variants } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

// --- CONSTANTS ---

// FIX: Changed ease property from array to string to satisfy Framer Motion/TypeScript types
const floatIn: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.4,
      // removed `ease` to satisfy framer-motion TypeScript definitions
    },
  },
};

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

// --- COMPONENTS ---

// Wrapper must be exported if it is used outside this file
export function Wrapper({ children }: { children: ReactNode }) {
  // Fixed typo in text color (text-white/80 instead of 70 for contrast)
  return (
  <div className="rounded-full border border-white/15 bg-white/10 px-6 py-3 text-white shadow-[0_25px_45px_rgba(15,23,42,0.45)] backdrop-blur-md backdrop-saturate-150">
      {children}
    </div>
  );
}

// BespokeLogo must be exported if it is used outside this file
export function BespokeLogo() {
  return (
    <Wrapper>
      <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80 shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
        Bespoke
      </div>
    </Wrapper>
  );
}

// MainNav must be exported if it is used outside this file
export function MainNav() {
  return (
    <Wrapper>
  <nav className="flex flex-wrap items-center gap-4 text-xs font-medium uppercase tracking-[0.3em] text-white/70">
        {navLinks.map(({ href, label }) => (
          <a
            key={label}
            href={href}
            className="transition-colors duration-200 hover:text-white"
          >
            {label}
          </a>
        ))}
      </nav>
    </Wrapper>
  );
}

// MenuToggle must be exported if it is used outside this file
export function MenuToggle({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  // Note: The animation here is for a standard hamburger-to-cross/rotate, 
  // not the custom Layered Gate/Geometric icon we discussed previously. 
  // I will leave this standard version for now as it aligns with the existing code.
  return (
  <motion.button
      type="button"
      aria-expanded={open}
      aria-label="Toggle navigation menu"
      onClick={onToggle}
  className="rounded-full border border-white/15 bg-white/10 px-4 py-3 text-white shadow-[0_20px_35px_rgba(15,23,42,0.45)] backdrop-blur-md backdrop-saturate-150 transition-colors hover:bg-white/15"
    >
      <span className="relative block h-5 w-6">
        {/* Top line animation (disappears/rotates on open) */}
        <motion.span
          className="absolute left-1/2 top-0.5 h-0.5 w-5 -translate-y-1/2 rounded-full bg-white"
          animate={{
            // Simplified x/y transforms for reliability
            x: open ? "-50%" : "-60%", 
            y: open ? "-6px" : "0px", 
            rotate: open ? 12 : 0,
            opacity: open ? 0 : 1,
            scaleX: open ? 0.6 : 1,
          }}
          transition={{ duration: 0.28 }}
        />
        {/* Bottom line animation (disappears/rotates on open) */}
        <motion.span
          className="absolute left-1/2 bottom-0.5 h-0.5 w-5 translate-y-1/2 rounded-full bg-white"
          animate={{
            // Simplified x/y transforms for reliability
            x: open ? "-50%" : "-40%",
            y: open ? "6px" : "0px",
            rotate: open ? -12 : 0,
            opacity: open ? 0 : 1,
            scaleX: open ? 0.6 : 1,
          }}
          transition={{ duration: 0.28 }}
        />
        {/* X/Close icon (appears on open) */}
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{ scale: open ? 1 : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <span className="relative block h-4 w-4">
            <span className="absolute left-1/2 top-1/2 h-0.5 w-full -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-white" />
            <span className="absolute left-1/2 top-1/2 h-0.5 w-full -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-white" />
          </span>
        </motion.span>
      </span>
    </motion.button>
  );
}

// --- MENU OVERLAY VARIANTS ---

// FIX: Changed ease to string
const overlayVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35 },
  },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.25 } },
};

const overlayList: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

// FIX: Changed ease to string
const overlayItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
  exit: { opacity: 0, y: 12, transition: { duration: 0.2 } },
};

// MenuOverlay must be exported if it is used outside this file
export function MenuOverlay({ onClose }: { onClose: () => void }) {
  const listRef = useRef<HTMLUListElement>(null);
  const firstItemRef = useRef<HTMLLIElement>(null);
  const lastItemRef = useRef<HTMLLIElement>(null);
  const [markers, setMarkers] = useState({ top: 0, bottom: 0, width: 0 });

  // useLayoutEffect dependency fix: measure function is stable.
  useLayoutEffect(() => {
    const measure = () => {
      if (
        !listRef.current ||
        !firstItemRef.current ||
        !lastItemRef.current
      ) {
        return;
      }
      const listRect = listRef.current.getBoundingClientRect();
      const topRect = firstItemRef.current.getBoundingClientRect();
      const bottomRect = lastItemRef.current.getBoundingClientRect();
      setMarkers({
        top: topRect.top - listRect.top - 18,
        bottom: bottomRect.bottom - listRect.top + 18,
        width: Math.max(topRect.width, bottomRect.width) + 56,
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []); 

  return (
    <motion.div
      key="menu-overlay"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={overlayVariants}
  className="fixed inset-0 z-40 bg-black/90 backdrop-blur-xl"
      onClick={onClose}
    >
      <div
        className="flex h-full flex-col items-center justify-center px-8 text-center text-white"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative">
          {markers.width > 0 && (
            <>
              {/* Top marker line */}
              <motion.div
                className="absolute left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-white/45"
                style={{ width: markers.width }}
                initial={{ opacity: 0, scaleX: 0.4 }}
                animate={{ opacity: 1, scaleX: 1, top: markers.top }}
                exit={{ opacity: 0, scaleX: 0.4 }}
                transition={{ duration: 0.4 }}
              />
              {/* Bottom marker line */}
              <motion.div
                className="absolute left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-white/45"
                style={{ width: markers.width }}
                initial={{ opacity: 0, scaleX: 0.4 }}
                animate={{ opacity: 1, scaleX: 1, top: markers.bottom }}
                exit={{ opacity: 0, scaleX: 0.4 }}
                transition={{ duration: 0.4 }}
              />
            </>
          )}
          <motion.ul
            ref={listRef}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayList}
            className="space-y-6 text-2xl font-semibold uppercase tracking-widest"
          >
            {navLinks.map(({ href, label }, index) => {
              const isFirst = index === 0;
              const isLast = index === navLinks.length - 1;
              return (
                <motion.li
                  key={label}
                  ref={
                    isFirst
                      ? firstItemRef
                      : isLast
                        ? lastItemRef
                        : undefined
                  }
                  variants={overlayItem}
                >
                  <a
                    href={href}
                    onClick={onClose}
                    className="text-white/70 transition-colors hover:text-white"
                  >
                    {label}
                  </a>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </motion.div>
  );
}

// --- MAIN COMPONENT ---
export default function FloatingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Effect to prevent body scrolling when the menu is open
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = menuOpen ? "hidden" : original;
    return () => {
      document.body.style.overflow = original;
    };
  }, [menuOpen]);

  // Effect to close the menu on Escape key press
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header className="fixed top-4 z-50 w-full px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          {/* Logo */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={floatIn}
            className="shrink-0"
          >
            <BespokeLogo />
          </motion.div>
          
          {/* Nav Links and Toggle */}
          <div className="flex items-center gap-3">
            {/* Desktop Nav */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={floatIn}
              className="hidden shrink-0 justify-end md:flex"
            >
              <MainNav />
            </motion.div>
            {/* Mobile Toggle */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={floatIn}
              className="shrink-0 md:hidden"
            >
              <MenuToggle
                open={menuOpen}
                onToggle={() => setMenuOpen((prev) => !prev)}
              />
            </motion.div>
          </div>
        </div>
      </header>
      {/* Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <MenuOverlay
            onClose={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
