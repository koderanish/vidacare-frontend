import { useRef } from "react";
import { ShieldCheck } from "lucide-react";
import { Cta } from "../components/Cta";
import { Lines } from "../components/Lines";
import { Eyebrow, PageHero } from "../components/Section";
import { ServiceStack } from "../components/ServiceStack";
import { SERVICES, STEPS } from "../data";
import { useReveal } from "../useReveal";

export default function Services() {
  const root = useRef(null);
  useReveal(root);

  return (
    <div ref={root}>
      <PageHero eyebrow="[ Our services ]" lines={["Everything care", "needs, in one app."]}>
        From daily vitals to doctor collaboration, VidaCare covers what remote care needs.
      </PageHero>

      <section className="bg-site-paper pb-24 pt-20 md:pt-32">
        <ServiceStack items={SERVICES} />
      </section>

      <section className="site-noise relative overflow-hidden bg-site-ink px-5 py-24 text-white md:py-36">
        <div className="relative mx-auto max-w-7xl">
          <Eyebrow light>[ How it works ]</Eyebrow>
          <Lines
            as="h2"
            lines={["Three steps."]}
            className="mb-12 mt-6 font-display text-[clamp(2.8rem,8vw,7.5rem)] font-bold leading-[0.92] tracking-[-0.04em]"
          />
          <ol>
            {STEPS.map((s) => (
              <li
                key={s.n}
                data-reveal
                data-cursor
                className="group grid items-center gap-4 border-t border-white/15 py-8 transition-colors duration-500 last:border-b hover:bg-white/5 md:grid-cols-12 md:gap-8 md:py-12"
              >
                <span className="outline-text-light font-display text-6xl font-bold leading-none transition-colors group-hover:text-vida-400 md:col-span-3 md:text-8xl">
                  {s.n}
                </span>
                <h3 className="font-display text-3xl font-bold tracking-tight md:col-span-5 md:text-5xl">{s.title}</h3>
                <p className="text-base leading-relaxed text-white/65 md:col-span-4">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-site-paper px-5 py-24 md:py-36">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <span data-reveal className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-vida-400 text-site-ink shadow-[0_0_60px_rgba(34,197,94,0.5)]">
            <ShieldCheck className="h-9 w-9" />
          </span>
          <Lines
            as="h2"
            lines={["Safety is part", "of the product."]}
            className="font-display text-[clamp(2.4rem,7vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-site-ink"
          />
          <p data-reveal className="mt-8 max-w-xl text-base leading-relaxed text-ink-500">
            Doctor accounts go through a review before they can access patient care, and your data stays limited to you and the people you choose.
          </p>
        </div>
      </section>

      <Cta lines={["Questions?", "Let's talk."]} />
    </div>
  );
}
