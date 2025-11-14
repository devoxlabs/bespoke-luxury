"use client";

import { useEffect, useMemo, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      const { clientX, clientY, target } = event;
      setPosition({ x: clientX, y: clientY });
      setVisible(true);

      let cursor =
        target instanceof HTMLElement
          ? window.getComputedStyle(target).cursor
          : "auto";
      if (cursor === "auto") {
        const el = document.elementFromPoint(clientX, clientY);
        if (el) {
          cursor = window.getComputedStyle(el as Element).cursor;
        }
      }
      setHovering(cursor === "pointer" || cursor === "text");
    };

    const hide = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseout", hide);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseout", hide);
    };
  }, []);

  const cursorStyle = useMemo(
    () => ({
      left: `${position.x}px`,
      top: `${position.y}px`,
    }),
    [position],
  );

  return (
    <div
      className={`pointer-events-none fixed z-[999] h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/70 transition-all duration-120 ${
        visible
          ? hovering
            ? "opacity-100 scale-130"
            : "opacity-100 scale-110"
          : "opacity-0 scale-95"
      }`}
      style={cursorStyle}
    />
  );
}
