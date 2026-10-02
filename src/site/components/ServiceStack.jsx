import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";
import { ServiceVisual } from "./ServiceVisual";

gsap.registerPlugin(ScrollTrigger);

const TONES = [
  { card: "bg-site-ink text-white", panel: "bg-white/5 ring-1 ring-white/10", accent: "#4ade80", inverse: "#04140f", muted: "text-white/65", tick: "text-vida-300" },
  { card: "bg-vida-deep text-white", panel: "bg-white/5 ring-1 ring-white/10", accent: "#4ade80", inverse: "#04140f", muted: "text-white/65", tick: "text-vida-300" },
  { card: "bg-vida-400 text-site-ink", panel: "bg-black/10 ring-1 ring-black/10", accent: "#04140f", inverse: "#ffffff", muted: "text-site-ink/70", tick: "text-site-ink" },
  { card: "bg-white text-site-ink ring-1 ring-black/10", panel: "bg-vida-50 ring-1 ring-vida-200", accent: "#16a34a", inverse: "#ffffff", muted: "text-ink-500", tick: "text-vida-500" },
];

// Cards that stick to the top and stack up as you scroll; each one shrinks slightly when the next covers it.
export function ServiceStack({ items }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray("[data-stack-card]");
        cards.forEach((card, i) => {
          if (i === cards.length - 1) return;
          gsap.to(card, {
            scale: 0.93,
            ease: "none",
            scrollTrigger: { trigger: cards[i + 1], start: "top 85%", end: "top 12%", scrub: true },
          });
        });
      }, rootRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={rootRef} className="mx-auto max-w-7xl px-5">
      {items.map((s, i) => {
        const tone = TONES[i % TONES.length];
        return (
          <article
            key={s.id}
            data-stack-card
            className={`mb-6 grid origin-top gap-8 rounded-[2rem] p-7 md:sticky md:mb-[8vh] md:min-h-[62vh] md:grid-cols-2 md:gap-12 md:rounded-[2.5rem] md:p-12 ${tone.card}`}
            style={{ top: `calc(11vh + ${i * 16}px)` }}
          >
            <div className="flex flex-col justify-between gap-10">
              <div>
                <p className="font-label text-xs uppercase tracking-[0.25em] opacity-70">
                  [ {String(i + 1).padStart(2, "0")} ] — {s.title}
                </p>
                <h3 className="mt-6 font-display text-4xl font-bold leading-[0.95] tracking-[-0.03em] md:text-6xl">{s.tagline}</h3>
                <p className={`mt-6 max-w-md text-base leading-relaxed ${tone.muted}`}>{s.text}</p>
              </div>
              <ul className="space-y-2.5">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm font-medium">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${tone.tick}`} /> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className={`flex min-h-[16rem] items-center justify-center overflow-hidden rounded-3xl p-6 ${tone.panel}`}>
              <ServiceVisual kind={s.visual} accent={tone.accent} inverse={tone.inverse} />
            </div>
          </article>
        );
      })}
    </div>
  );
}
