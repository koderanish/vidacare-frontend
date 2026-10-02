import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Fade/slide up any [data-reveal] element inside `scope` as it enters the viewport.
// Elements sharing a parent stagger. Skipped entirely for prefers-reduced-motion.
export function useReveal(scope) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.set("[data-reveal]", { opacity: 0, y: 28 });
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 88%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1, overwrite: true }),
        });
      }, scope);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [scope]);
}
