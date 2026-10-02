export function SectionHeading({ eyebrow, title, children, light = false, center = true }) {
  return (
    <div className={`mb-12 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p data-reveal className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-vida-500">
          {eyebrow}
        </p>
      )}
      <h2 data-reveal className={`text-3xl font-bold tracking-tight [text-wrap:balance] md:text-4xl ${light ? "text-white" : "text-vida-deep"}`}>
        {title}
      </h2>
      {children && (
        <p data-reveal className={`mt-4 text-base leading-relaxed [text-wrap:pretty] ${light ? "text-white/70" : "text-ink-500"}`}>
          {children}
        </p>
      )}
    </div>
  );
}

export function PageHero({ eyebrow, title, children }) {
  return (
    <section className="relative overflow-hidden bg-vida-deep pb-20 pt-32 text-white">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-vida-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-teal-500/20 blur-3xl" />
      <div className="relative mx-auto max-w-4xl px-5 text-center">
        <p data-reveal className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-vida-300">{eyebrow}</p>
        <h1 data-reveal className="text-4xl font-bold tracking-tight [text-wrap:balance] md:text-5xl">{title}</h1>
        <p data-reveal className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70 [text-wrap:pretty]">{children}</p>
      </div>
    </section>
  );
}
