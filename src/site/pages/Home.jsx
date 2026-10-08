import { useRef } from "react";
import { Link } from "react-router-dom";
import { HeartPulse, ShieldCheck, Stethoscope, Users } from "lucide-react";
import { EcgLine } from "../components/EcgLine";
import { Lines } from "../components/Lines";
import { Photo } from "../components/Photo";
import { Marquee } from "../components/Marquee";
import { ScrubText } from "../components/ScrubText";
import { ServiceStack } from "../components/ServiceStack";
import { Roles } from "../components/Roles";
import { Cta } from "../components/Cta";
import { Eyebrow } from "../components/Section";
import { APP_URL } from "../components/Nav";
import { HOME_SERVICE_IDS, SERVICES } from "../data";
import { useHeroCollage } from "../useHeroCollage";
import { useReveal } from "../useReveal";

const MARQUEE_ITEMS = ["Vitals", "ECG insights", "Smart alerts", "Caregivers", "Verified doctors", "Resources"];
const HOME_SERVICES = HOME_SERVICE_IDS.map((id) => SERVICES.find((s) => s.id === id));

const MANIFESTO =
  "VidaCare brings patients, caregivers and verified doctors into one circle of care, so nothing important goes unseen.";

export default function Home() {
  const root = useRef(null);
  useReveal(root);
  useHeroCollage(root);

  return (
    <div ref={root}>
      <section className="site-noise relative overflow-hidden bg-site-ink px-5 pb-16 pt-32 text-white md:pb-24 md:pt-40">
        <div className="site-grid pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -right-40 top-0 h-[40rem] w-[40rem] rounded-full bg-vida-500/25 blur-[130px]" />
        <EcgLine
          className="pointer-events-none absolute inset-x-0 top-[36%] h-40 w-full -translate-y-1/2 opacity-25 md:h-56"
          viewWidth={1600}
          beats={4}
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-[1.05fr_0.95fr] md:gap-10">
          <div>
            <p data-reveal className="mb-6 font-label text-xs uppercase tracking-[0.25em] text-vida-300">
              ● Remote care platform
            </p>
            <Lines
              lines={["Your health,", <span key="b" className="text-vida-400">always in sync.</span>]}
              className="font-display text-[clamp(2.9rem,6.6vw,6.2rem)] font-bold leading-[0.95] tracking-[-0.04em]"
            />
            <p data-reveal className="mt-8 max-w-md text-base leading-relaxed text-white/70 [text-wrap:pretty]">
              VidaCare connects patients, caregivers and verified doctors with live vitals, ECG insights and timely alerts, so care never waits.
            </p>
            <div data-reveal className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={APP_URL}
                className="rounded-full bg-vida-400 px-7 py-3.5 text-sm font-semibold text-site-ink transition hover:bg-vida-300 active:scale-[0.96]"
              >
                Open web app ↗
              </a>
              <Link to="/services" className="text-sm font-semibold underline decoration-vida-400 decoration-2 underline-offset-8 hover:no-underline">
                Explore services
              </Link>
            </div>
            <ul data-reveal className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
              {["Verified doctors", "Private by default", "Web and mobile"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-vida-400" /> {t}
                </li>
              ))}
            </ul>
          </div>

          <div data-collage className="relative mx-auto w-full max-w-xl pb-8 md:pb-0">
            <div className="grid h-[26rem] grid-cols-5 grid-rows-6 gap-3 md:h-[35rem]">
              <div data-photo className="col-span-3 row-span-6 overflow-hidden rounded-[2rem] ring-1 ring-white/10">
                <Photo src="/images/hero-doctor.jpg" alt="A smiling doctor with a stethoscope" icon={Stethoscope} />
              </div>
              <div data-photo className="col-span-2 row-span-3 overflow-hidden rounded-[2rem] ring-1 ring-white/10">
                <Photo src="/images/hero-patient.jpg" alt="An older woman smiling at her phone" icon={HeartPulse} />
              </div>
              <div data-photo className="col-span-2 row-span-3 overflow-hidden rounded-[2rem] ring-1 ring-white/10">
                <Photo src="/images/hero-caregiver.jpg" alt="A caregiver smiling with an older woman" className="object-left" icon={Users} />
              </div>
            </div>

            <div data-float-card className="absolute -bottom-2 -left-3 flex items-center gap-4 rounded-2xl bg-white p-4 text-site-ink shadow-2xl md:-left-8">
              <div>
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-ink-500">Heart rate</p>
                <p className="mt-1 font-display text-3xl font-bold tabular-nums leading-none">
                  78 <span className="text-sm font-medium text-ink-500">BPM</span>
                </p>
              </div>
              <EcgLine className="h-12 w-28" color="#6c40b8" viewWidth={600} beats={2} strokeWidth={4} />
            </div>

            <div data-float-card className="absolute -right-2 top-6 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-site-ink shadow-xl md:-right-6">
              <ShieldCheck className="h-4 w-4 text-vida-500" /> Verified doctor
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
