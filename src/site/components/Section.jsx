import { Lines } from "./Lines";

export function Eyebrow({ children, light = false }) {
  return (
    <p data-reveal className={`font-label text-xs uppercase tracking-[0.25em] ${light ? "text-vida-300" : "text-vida-600"}`}>
      {children}
    </p>
  );
}

export function PageHero({ eyebrow, lines, children }) {
  return (
    <section className="site-noise relative overflow-hidden bg-site-ink px-5 pb-20 pt-40 text-white md:pb-28 md:pt-52">
      <div className="site-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-vida-500/25 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl">
        <Eyebrow light>{eyebrow}</Eyebrow>
        <Lines
          lines={lines}
          className="mt-6 font-display text-[clamp(3rem,10vw,9.5rem)] font-bold leading-[0.92] tracking-[-0.045em]"
        />
        <p data-reveal className="mt-10 max-w-xl text-lg leading-relaxed text-white/65 [text-wrap:pretty]">
          {children}
        </p>
      </div>
    </section>
  );
}
