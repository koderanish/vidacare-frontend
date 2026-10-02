import { useRef } from "react";
import { Link } from "react-router-dom";
import { Activity, Bell, BookOpen, Check, HeartPulse, ShieldCheck, Stethoscope, Users } from "lucide-react";
import { PageHero, SectionHeading } from "../components/Section";
import { useReveal } from "../useReveal";

const SERVICES = [
  { icon: Activity, title: "Vitals monitoring", points: ["Heart rate, blood pressure, glucose and more", "Trend charts over time", "Easy manual logging"] },
  { icon: HeartPulse, title: "ECG insights", points: ["Clear heartbeat visualisation", "Spot changes at a glance", "Share with your doctor"] },
  { icon: Bell, title: "Alerts & notifications", points: ["Notified when readings look unusual", "Keep caregivers informed", "Reminders that fit your routine"] },
  { icon: Stethoscope, title: "Doctor access", points: ["Verified, admin-approved doctors", "Patient trends in one view", "Guide care with clear data"] },
  { icon: Users, title: "Caregiver support", points: ["Stay close to a loved one's health", "Respond quickly to changes", "Shared with permission"] },
  { icon: BookOpen, title: "Health resources", points: ["Educational guidance in the app", "Curated by our team", "Always one tap away"] },
];

export default function Services() {
  const root = useRef(null);
  useReveal(root);
  return (
    <div ref={root}>
      <PageHero eyebrow="Our services" title="Tools for every part of the care journey">
        From daily vitals to doctor collaboration, VidaCare covers what remote care needs.
      </PageHero>

      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-2">
          {SERVICES.map(({ icon: Icon, title, points }) => (
            <div key={title} data-reveal className="group flex gap-5 rounded-2xl border border-ink-900/10 p-8 transition hover:border-vida-400 hover:shadow-card">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-vida-100 text-vida-600 transition group-hover:bg-vida-500 group-hover:text-white">
                <Icon className="h-7 w-7" />
              </span>
              <div>
                <h3 className="text-xl font-semibold text-vida-deep">{title}</h3>
                <ul className="mt-3 space-y-2">
                  {points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-ink-500">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-vida-500" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-vida-deep py-24 text-white">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <SectionHeading light eyebrow="Trust" title="Safety is part of the product">
            Doctor accounts go through a review before they can access patient care, and your data stays limited to you and the people you choose.
          </SectionHeading>
          <span data-reveal className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-vida-400/15 text-vida-300 shadow-[0_0_40px_rgba(34,197,94,0.35)]">
            <ShieldCheck className="h-8 w-8" />
          </span>
          <Link data-reveal to="/contact" className="mt-10 inline-block rounded-full bg-vida-400 px-7 py-3.5 text-sm font-semibold text-vida-deep transition hover:bg-vida-300 active:scale-[0.96]">
            Talk to us
          </Link>
        </div>
      </section>
    </div>
  );
}
