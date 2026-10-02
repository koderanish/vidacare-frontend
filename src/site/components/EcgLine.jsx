import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const PATH =
  "M0 60 H70 L85 60 L100 22 L116 98 L132 40 L146 60 H260 L275 60 L290 22 L306 98 L322 40 L336 60 H450 L465 60 L480 22 L496 98 L512 40 L526 60 H600";

export function EcgLine({ className = "" }) {
  const lineRef = useRef(null);
  const glowRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const nodes = [lineRef.current, glowRef.current];
      const length = lineRef.current.getTotalLength();
      gsap.set(nodes, { strokeDasharray: length, strokeDashoffset: length, opacity: 1 });
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.4 });
      tl.to(nodes, { strokeDashoffset: 0, duration: 2.6, ease: "none" })
        .to(nodes, { opacity: 0, duration: 0.6, ease: "power1.in" }, "+=0.5")
        .set(nodes, { strokeDashoffset: length });
      return () => tl.kill();
    });
    return () => mm.revert();
  }, []);

  return (
    <svg viewBox="0 0 600 120" className={className} fill="none" aria-hidden="true">
      <path ref={glowRef} d={PATH} stroke="#4ade80" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" opacity="0.25" style={{ filter: "blur(4px)" }} />
      <path ref={lineRef} d={PATH} stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
