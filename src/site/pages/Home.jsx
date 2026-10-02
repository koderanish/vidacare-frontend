import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { Activity, Bell, BookOpen, ShieldCheck, Stethoscope, Users, HeartPulse, ArrowRight, Smartphone } from "lucide-react";
import { EcgLine } from "../components/EcgLine";
import { SectionHeading } from "../components/Section";
import { APP_URL } from "../components/Nav";
import { useReveal } from "../useReveal";

const FEATURES = [
  { icon: Activity, title: "Live vitals tracking", text: "Log heart rate, blood pressure, glucose and more, and see trends at a glance." },
  { icon: HeartPulse, title: "ECG insights", text: "A clear, readable heartbeat view so changes are easy to spot and share." },
  { icon: Bell, title: "Smart alerts", text: "Get notified when a reading looks off, so nothing important is missed." },
  { icon: Stethoscope, title: "Verified doctors", text: "Every doctor is reviewed and approved before they can see patient care." },
  { icon: Users, title: "Caregiver support", text: "Keep the people who care for you in the loop, with your permission." },
  { icon: BookOpen, title: "Health resources", text: "Trusted guidance and educational content, right inside the app." },
];

const STEPS = [
  { n: "01", title: "Create your account", text: "Sign up as a patient, caregiver or doctor with email or Google." },
  { n: "02", title: "Track your health", text: "Add readings and watch your vitals and ECG build a clear picture over time." },
  { n: "03", title: "Stay connected", text: "Share progress with your care team and act early on alerts." },
];

const ROLES = [
  { icon: HeartPulse, title: "Patients", text: "Understand your numbers, build healthy routines and share them with the people who matter." },
  { icon: Users, title: "Caregivers", text: "Stay close to a loved one's health and respond quickly when something changes." },
  { icon: Stethoscope, title: "Doctors", text: "Review patient trends in one place, backed by a verified-professional onboarding." },
];

export default function Home() {
  const root = useRef(null);
  useReveal(root);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from("[data-hero='badge']", { opacity: 0, y: 16, duration: 0.6 })
          .from("[data-hero='word']", { opacity: 0, y: 40, duration: 0.8, stagger: 0.08 }, "-=0.3")
          .from("[data-hero='sub']", { opacity: 0, y: 20, duration: 0.7 }, "-=0.4")
          .from("[data-hero='cta']", { opacity: 0, y: 20, duration: 0.6, stagger: 0.1 }, "-=0.4")
          .from("[data-hero='card']", { opacity: 0, y: 40, scale: 0.96, duration: 0.9 }, "-=0.8");
        gsap.to("[data-float]", { y: -12, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.4 });
      }, root);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  const headline = "Your health, always in sync.".split(" ");

  return (
    <div ref={root}>
      {/* Hero */}
      <section className="relative overflow-hidden bg-vida-deep pb-24 pt-32 text-white md:pb-32 md:pt-40">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-vida-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 -left-32 h-96 w-96 rounded-full bg-teal-500/25 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 md:grid-cols-2">
          <div>
            <span data-hero="badge" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-vida-300">
              <span className="h-2 w-2 rounded-full bg-vida-400" /> Remote care, made simple
            </span>
            <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              {headline.map((w, i) => (
                <span key={i} data-hero="word" className={`mr-3 inline-block ${w.startsWith("sync") ? "text-vida-400" : ""}`}>
                  {w}
                </span>
              ))}
            </h1>
            <p data-hero="sub" className="mt-6 max-w-lg text-lg leading-relaxed text-white/70 [text-wrap:pretty]">
              VidaCare connects patients, caregivers and verified doctors with live vitals, ECG insights and timely alerts, so care never waits.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a data-hero="cta" href={APP_URL} className="inline-flex items-center gap-2 rounded-full bg-vida-400 px-7 py-3.5 text-sm font-semibold text-vida-deep transition hover:bg-vida-300 active:scale-[0.96]">
                <Smartphone className="h-4 w-4" /> Open web app
              </a>
              <Link data-hero="cta" to="/services" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 active:scale-[0.96]">
                Explore services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div data-hero="card" className="relative">
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50">Heart rate</p>
                  <p className="mt-1 text-5xl font-bold tabular-nums">78 <span className="text-lg font-medium text-white/50">BPM</span></p>
                </div>
                <span className="rounded-full bg-vida-400/15 px-3 py-1 text-xs font-medium text-vida-300">Normal</span>
              </div>
              <EcgLine className="mt-6 h-28 w-full" />
              <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-white/60">
                {[["BP", "120/80"], ["SpO₂", "98%"], ["Glucose", "95"]].map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-white/5 py-3">
                    <p className="text-base font-semibold tabular-nums text-white">{v}</p>
                    <p className="mt-0.5">{k}</p>
                  </div>
                ))}
              </div>
            </div>
            <div data-float className="absolute -left-4 top-8 hidden items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-medium text-vida-deep shadow-xl md:flex">
              <ShieldCheck className="h-5 w-5 text-vida-500" /> Verified doctor
            </div>
            <div data-float className="absolute -bottom-5 -right-3 hidden items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-medium text-vida-deep shadow-xl md:flex">
              <Bell className="h-5 w-5 text-vida-500" /> Alert sent to caregiver
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading eyebrow="What you get" title="Everything care needs, in one app">
            Simple tools for the people living with a condition, the people supporting them, and the doctors guiding them.
          </SectionHeading>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <div key={title} data-reveal className="group rounded-2xl border border-ink-900/10 p-7 transition hover:-translate-y-1 hover:border-vida-400 hover:shadow-card">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-vida-100 text-vida-600 transition group-hover:bg-vida-500 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-vida-deep">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-vida-50 py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading eyebrow="How it works" title="Up and running in three steps" />
          <div className="grid gap-6 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} data-reveal className="relative rounded-2xl bg-white p-8 shadow-card">
                <span className="text-5xl font-bold text-vida-200">{s.n}</span>
                <h3 className="mt-4 text-lg font-semibold text-vida-deep">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading eyebrow="Built for everyone in the circle" title="One platform, three roles" />
          <div className="grid gap-5 md:grid-cols-3">
            {ROLES.map(({ icon: Icon, title, text }) => (
              <div key={title} data-reveal className="rounded-3xl bg-vida-deep p-8 text-white">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-vida-400/15 text-vida-300">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-24">
        <div data-reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-vida-500 to-vida-700 px-8 py-16 text-center text-white">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <h2 className="relative text-3xl font-bold tracking-tight [text-wrap:balance] md:text-4xl">Ready to take charge of your health?</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-white/85">Open VidaCare in your browser, or get in touch and we will help you get started.</p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <a href={APP_URL} className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-vida-700 transition hover:bg-vida-50 active:scale-[0.96]">Open web app</a>
            <Link to="/contact" className="rounded-full border border-white/50 px-7 py-3.5 text-sm font-semibold transition hover:bg-white/10 active:scale-[0.96]">Contact us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
