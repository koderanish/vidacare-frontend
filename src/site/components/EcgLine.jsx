import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";

// Builds a flat line with a QRS-style spike repeated `beats` times across `viewWidth`.
const buildPath = (viewWidth, beats) => {
  const step = viewWidth / beats;
  let d = "M0 80";
  for (let i = 0; i < beats; i += 1) {
    const x = step * i + step * 0.3;
    d += ` H${x} L${x + 14} 80 L${x + 30} 30 L${x + 48} 135 L${x + 64} 55 L${x + 80} 80`;
  }
  return `${d} H${viewWidth}`;
};

export function EcgLine({ className = "", color = "#a086e0", viewWidth = 600, beats = 3, strokeWidth = 3 }) {
  const lineRef = useRef(null);
  const glowRef = useRef(null);
  const path = useMemo(() => buildPath(viewWidth, beats), [viewWidth, beats]);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const nodes = [lineRef.current, glowRef.current];
      const length = lineRef.current.getTotalLength();
      gsap.set(nodes, { strokeDasharray: length, strokeDashoffset: length, opacity: 1 });
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.3 });
      tl.to(nodes, { strokeDashoffset: 0, duration: 3, ease: "none" })
        .to(nodes, { opacity: 0, duration: 0.7, ease: "power1.in" }, "+=0.6")
        .set(nodes, { strokeDashoffset: length });
      return () => tl.kill();
    });
    return () => mm.revert();
  }, [path]);

  return (
    <svg viewBox={`0 0 ${viewWidth} 160`} preserveAspectRatio="xMidYMid slice" className={className} fill="none" aria-hidden="true">
      <path ref={glowRef} d={path} stroke={color} strokeWidth={strokeWidth * 3} strokeLinecap="round" strokeLinejoin="round" opacity="0.28" style={{ filter: "blur(6px)" }} />
      <path ref={lineRef} d={path} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
