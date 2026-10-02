import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Scroll-driven reveals inside `scope`:
//   [data-reveal]  fade + rise, staggered per batch
//   [data-lines]   masked line-by-line headline reveal (children: [data-line])
//   [data-scrub]   words fade in as you scroll (children: [data-word])
// Everything is skipped for prefers-reduced-motion, so content is simply visible.
export function useReveal(scope) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.set("[data-reveal]", { opacity: 0, y: 32 });
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 92%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, overwrite: true }),
        });

        gsap.utils.toArray("[data-lines]").forEach((block) => {
          const lines = block.querySelectorAll("[data-line]");
          gsap.set(lines, { yPercent: 115 });
          ScrollTrigger.create({
            trigger: block,
            start: "top 92%",
            once: true,
            onEnter: () => gsap.to(lines, { yPercent: 0, duration: 1.15, ease: "expo.out", stagger: 0.12 }),
          });
        });

        gsap.utils.toArray("[data-scrub]").forEach((block) => {
          const words = block.querySelectorAll("[data-word]");
          gsap.fromTo(
            words,
            { opacity: 0.15 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.15,
              scrollTrigger: { trigger: block, start: "top 85%", end: "bottom 55%", scrub: true },
            }
          );
        });
      }, scope);

      if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [scope]);
}
