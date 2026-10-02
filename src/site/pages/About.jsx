import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Cta } from "../components/Cta";
import { Lines } from "../components/Lines";
import { Roles } from "../components/Roles";
import { Eyebrow, PageHero } from "../components/Section";
import { ScrubText } from "../components/ScrubText";
import { useReveal } from "../useReveal";

const VALUES = [
  { n: "01", title: "People first", text: "Every feature starts with a patient, a caregiver or a doctor and what they actually need." },
  { n: "02", title: "Privacy by default", text: "Health data is personal. Access is limited to you and the people you choose." },
  { n: "03", title: "Trust & verification", text: "Doctors are reviewed and approved before they can take part in care." },
  { n: "04", title: "Clarity", text: "Health numbers should be easy to read, not intimidating. We design for understanding." },
];

const STATEMENT =
  "We build tools that make remote health monitoring simple, so people can spot changes early and get the right support sooner.";

export default function About() {
  const root = useRef(null);
  useReveal(root);

  return (
    <div ref={root}>
      <PageHero eyebrow="[ About VidaCare ]" lines={["Care, connected", "wherever you are."]}>
        VidaCare Technologies Inc. builds tools that make remote health monitoring simple for patients, caregivers and doctors.
      </PageHero>

      <section className="bg-site-paper px-5 py-28 md:py-44">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>[ Our mission ]</Eyebrow>
          <ScrubText
            text={STATEMENT}
            highlight={["simple", "early", "support"]}
            className="mt-8 font-display text-[clamp(2rem,5.2vw,5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-site-ink"
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <p data-reveal className="text-base leading-relaxed text-ink-500">
              Managing a health condition is hard when information is scattered. VidaCare brings vitals, ECG insights, alerts and
              care-team communication into one place.
            </p>
            <p data-reveal className="text-base leading-relaxed text-ink-500">
              We build for three groups at once: patients who live with their health every day, caregivers who support them, and
              verified doctors who guide treatment.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-site-paper px-5 pb-28 md:pb-44">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>[ What we stand for ]</Eyebrow>
          <Lines
            as="h2"
            lines={["Our values."]}
            className="mb-12 mt-6 font-display text-[clamp(2.8rem,8vw,7.5rem)] font-bold leading-[0.92] tracking-[-0.04em] text-site-ink"
          />
          <ul>
            {VALUES.map((v) => (
              <li
                key={v.n}
                data-reveal
                data-cursor
                className="group grid items-start gap-4 border-t border-site-ink/15 px-2 py-8 transition-colors duration-500 last:border-b hover:bg-vida-400 md:grid-cols-12 md:gap-8 md:px-6 md:py-12"
              >
                <span className="font-label text-sm text-ink-500 transition-colors group-hover:text-site-ink md:col-span-2">{v.n}</span>
                <h3 className="font-display text-3xl font-bold tracking-tight text-site-ink md:col-span-5 md:text-5xl">{v.title}</h3>
                <p className="text-base leading-relaxed text-ink-500 transition-colors group-hover:text-site-ink md:col-span-4">{v.text}</p>
                <ArrowUpRight className="hidden h-8 w-8 -translate-x-3 text-site-ink opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 md:col-span-1 md:block" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="site-noise relative overflow-hidden bg-site-ink px-5 py-24 text-white md:py-36">
        <div className="relative mx-auto max-w-7xl">
          <Eyebrow light>[ One circle of care ]</Eyebrow>
          <Lines
            as="h2"
            lines={["Three roles,", "one platform."]}
            className="mb-14 mt-6 font-display text-[clamp(2.8rem,8vw,7.5rem)] font-bold leading-[0.92] tracking-[-0.04em]"
          />
          <Roles />
        </div>
      </section>

      <Cta lines={["Join the", "circle of care."]} />
    </div>
  );
}
