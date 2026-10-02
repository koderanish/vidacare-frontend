import { useRef } from "react";
import { Eye, HeartHandshake, Lock, ShieldCheck } from "lucide-react";
import { PageHero, SectionHeading } from "../components/Section";
import { useReveal } from "../useReveal";

const VALUES = [
  { icon: HeartHandshake, title: "People first", text: "Every feature starts with a patient, a caregiver or a doctor and what they actually need." },
  { icon: Lock, title: "Privacy by default", text: "Health data is personal. Access is limited to you and the people you choose." },
  { icon: ShieldCheck, title: "Trust & verification", text: "Doctors are reviewed and approved before they can take part in care." },
  { icon: Eye, title: "Clarity", text: "Health numbers should be easy to read, not intimidating. We design for understanding." },
];

export default function About() {
  const root = useRef(null);
  useReveal(root);
  return (
    <div ref={root}>
      <PageHero eyebrow="About VidaCare" title="Care that stays connected, wherever you are">
        VidaCare Technologies Inc. builds tools that make remote health monitoring simple for patients, caregivers and doctors.
      </PageHero>

      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 md:grid-cols-2">
          <div>
            <SectionHeading center={false} eyebrow="Our mission" title="Make everyday health easier to understand and share" />
            <p data-reveal className="text-base leading-relaxed text-ink-500">
              Managing a health condition is hard when information is scattered. VidaCare brings vitals, ECG insights, alerts and
              care-team communication into one place, so people can spot changes early and get the right support sooner.
            </p>
            <p data-reveal className="mt-4 text-base leading-relaxed text-ink-500">
              We build for three groups at once: patients who live with their health every day, caregivers who support them, and
              verified doctors who guide treatment.
            </p>
          </div>
          <div data-reveal className="rounded-3xl bg-vida-deep p-10 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-vida-300">One circle of care</p>
            <ul className="mt-6 space-y-5">
              {[["Patients", "Track and understand your own health."], ["Caregivers", "Support the people you love."], ["Doctors", "Guide care with clear patient trends."]].map(([t, d]) => (
                <li key={t} className="flex gap-4">
                  <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-vida-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]" />
                  <p><span className="font-semibold">{t}.</span> <span className="text-white/70">{d}</span></p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-vida-50 py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading eyebrow="What we stand for" title="Our values" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ icon: Icon, title, text }) => (
              <div key={title} data-reveal className="rounded-2xl bg-white p-7 shadow-card">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-vida-100 text-vida-600"><Icon className="h-6 w-6" /></span>
                <h3 className="mt-5 text-lg font-semibold text-vida-deep">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
