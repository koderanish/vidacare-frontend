import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IMAGE_REST_SCALE = 1.12; // images sit slightly oversized so parallax never shows an edge

// Animates the hero photo collage inside `scope`:
//   [data-collage]     wrapper (scroll parallax range)
//   [data-photo]       each photo frame (its first child is the <img>)
//   [data-float-card]  floating cards that fade in, then bob gently
// Skipped entirely for prefers-reduced-motion.
export function useHeroCollage(scope) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const collage = scope.current && scope.current.querySelector("[data-collage]");
        const frames = gsap.utils.toArray("[data-photo]");
        const images = frames.map((frame) => frame.firstElementChild);
        if (!collage || frames.length === 0) return;

        gsap.set(frames, { clipPath: "inset(100% 0% 0% 0% round 2rem)" });
        gsap.set(images, { scale: 1.35 });
        gsap.set("[data-float-card]", { opacity: 0, y: 28 });

        // 1. Wipe each photo in from the bottom while its image settles from a zoom.
        gsap
          .timeline({ delay: 0.15 })
          .to(frames, { clipPath: "inset(0% 0% 0% 0% round 2rem)", duration: 1.3, ease: "power3.inOut", stagger: 0.18 }, 0)
          .to(images, { scale: IMAGE_REST_SCALE, duration: 1.9, ease: "power2.out", stagger: 0.18 }, 0)
          .to("[data-float-card]", { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.15 }, 1.1);

        // 2. Floating cards drift up and down, out of phase.
        gsap.to("[data-float-card]", {
          y: -9,
          duration: 2.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.7,
          delay: 2.2,
        });

        // 3. Scroll parallax: images slide inside their frames at different speeds.
        images.forEach((image, i) => {
          gsap.fromTo(
            image,
            { yPercent: 5 },
            {
              yPercent: i === 0 ? -4 : -7,
              ease: "none",
              scrollTrigger: { trigger: collage, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        });
      }, scope);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [scope]);
}
