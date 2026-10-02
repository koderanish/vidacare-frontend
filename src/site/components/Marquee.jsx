import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Endless text strip. Drifts slowly and speeds up with scroll velocity.
export function Marquee({ items }) {
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tween = gsap.to(trackRef.current, { xPercent: -50, duration: 38, ease: "none", repeat: -1 });
      let boost = 0;
      const trigger = ScrollTrigger.create({
        onUpdate: (self) => {
          boost = Math.min(Math.abs(self.getVelocity()) / 300, 8);
        },
      });
      const decay = () => {
        boost *= 0.92;
        tween.timeScale(1 + boost);
      };
      gsap.ticker.add(decay);
      return () => {
        gsap.ticker.remove(decay);
        trigger.kill();
        tween.kill();
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <div className="overflow-hidden bg-site-paper py-8 md:py-12" aria-hidden="true">
      <div ref={trackRef} className="flex w-max whitespace-nowrap">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {items.map((text, i) => (
              <span key={text} className="flex items-center">
                <span
                  className={`font-display text-[clamp(3rem,8vw,7rem)] font-bold leading-none tracking-tight text-site-ink ${
                    i % 2 ? "outline-text" : ""
                  }`}
                >
                  {text}
                </span>
                <span className="mx-8 text-3xl text-vida-500 md:mx-12">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
