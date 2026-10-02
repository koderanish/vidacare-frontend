import { useRef } from "react";
import { Link } from "react-router-dom";
import { EcgLine } from "../components/EcgLine";
import { Lines } from "../components/Lines";
import { Magnetic } from "../components/Magnetic";
import { Marquee } from "../components/Marquee";
import { ScrubText } from "../components/ScrubText";
import { ServiceStack } from "../components/ServiceStack";
import { Roles } from "../components/Roles";
import { Cta } from "../components/Cta";
import { Eyebrow } from "../components/Section";
import { APP_URL } from "../components/Nav";
import { HOME_SERVICE_IDS, SERVICES } from "../data";
import { useReveal } from "../useReveal";

const MARQUEE_ITEMS = ["Vitals", "ECG insights", "Smart alerts", "Caregivers", "Verified doctors", "Resources"];
const HOME_SERVICES = HOME_SERVICE_IDS.map((id) => SERVICES.find((s) => s.id === id));

const MANIFESTO =
  "VidaCare brings patients, caregivers and verified doctors into one circle of care, so nothing important goes unseen.";

export default function Home() {
  const root = useRef(null);
  useReveal(root);

  return (
    <div ref={root}>
      <section className="site-noise relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-site-ink px-5 pb-10 pt-36 text-white md:pb-14">
        <div className="site-grid pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -bottom-1/3 left-1/2 h-[70vh] w-[90vw] -translate-x-1/2 rounded-full bg-vida-500/25 blur-[120px]" />
        <EcgLine
          className="pointer-events-none absolute inset-x-0 top-[42%] h-40 w-full -translate-y-1/2 md:h-56"
          viewWidth={1600}
          beats={4}
        />

        <div className="relative mx-auto w-full max-w-7xl">
          <p data-reveal className="mb-6 font-label text-xs uppercase tracking-[0.25em] text-vida-300">
            ● Remote care platform
          </p>
          <Lines
            lines={["Your health,", <span key="b" className="text-vida-400">always in sync.</span>]}
            className="font-display text-[clamp(3.2rem,11vw,10.5rem)] font-bold leading-[0.9] tracking-[-0.045em]"
          />
          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p data-reveal className="max-w-md text-base leading-relaxed text-white/65 [text-wrap:pretty]">
              VidaCare connects patients, caregivers and verified doctors with live vitals, ECG insights and timely alerts, so care never waits.
            </p>
            <div data-reveal className="flex items-center gap-7">
              <Magnetic>
                <a
                  href={APP_URL}
                  className="flex h-28 w-28 items-center justify-center rounded-full bg-vida-400 text-sm font-semibold text-site-ink transition-transform duration-300 hover:scale-105 md:h-32 md:w-32"
                >
                  Open app ↗
                </a>
              </Magnetic>
              <Link to="/services" className="text-sm font-semibold underline decoration-vida-400 decoration-2 underline-offset-8 hover:no-underline">
                Explore services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Marquee items={MARQUEE_ITEMS} />

      <section className="bg-site-paper px-5 pb-28 pt-16 md:pb-44 md:pt-24">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>[ Why VidaCare ]</Eyebrow>
          <ScrubText
            text={MANIFESTO}
            highlight={["circle", "care", "unseen"]}
            className="mt-8 font-display text-[clamp(2rem,5.4vw,5.2rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-site-ink"
          />
        </div>
      </section>

      <section className="bg-site-paper pb-24">
        <div className="mx-auto mb-14 max-w-7xl px-5">
          <Eyebrow>[ What we do ]</Eyebrow>
          <Lines
            as="h2"
            lines={["Built for the", "whole circle."]}
            className="mt-6 font-display text-[clamp(2.8rem,8vw,7.5rem)] font-bold leading-[0.92] tracking-[-0.04em] text-site-ink"
          />
        </div>
        <ServiceStack items={HOME_SERVICES} />
      </section>

      <section className="site-noise relative overflow-hidden bg-site-ink px-5 py-24 text-white md:py-36">
        <div className="relative mx-auto max-w-7xl">
          <Eyebrow light>[ Who it is for ]</Eyebrow>
          <Lines
            as="h2"
            lines={["One circle,", "three roles."]}
            className="mb-14 mt-6 font-display text-[clamp(2.8rem,8vw,7.5rem)] font-bold leading-[0.92] tracking-[-0.04em]"
          />
          <Roles />
        </div>
      </section>

      <Cta />
    </div>
  );
}
