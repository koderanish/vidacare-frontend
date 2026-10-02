import { useRef, useState } from "react";
import { Lines } from "../components/Lines";
import { Magnetic } from "../components/Magnetic";
import { Eyebrow } from "../components/Section";
import { CONTACT_EMAIL } from "../components/Footer";
import { APP_URL } from "../components/Nav";
import { useReveal } from "../useReveal";

const LABEL = "font-label text-[11px] uppercase tracking-[0.25em] text-ink-500";
const INPUT =
  "mt-2 w-full bg-transparent text-xl text-site-ink outline-none placeholder:text-ink-300 md:text-2xl";
const FIELD = "block border-b border-site-ink/20 pb-3 transition-colors focus-within:border-vida-500";

export default function Contact() {
  const root = useRef(null);
  useReveal(root);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  // No form backend yet: sending opens the visitor's email app with the message filled in.
  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`VidaCare enquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n${form.name}\n${form.email}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div ref={root}>
      <section className="site-noise relative overflow-hidden bg-site-ink px-5 pb-20 pt-40 text-white md:pb-28 md:pt-52">
        <div className="site-grid pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-vida-500/25 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl">
          <Eyebrow light>[ Contact ]</Eyebrow>
          <Lines
            lines={["Say", <span key="h" className="text-vida-400">hello.</span>]}
            className="mt-6 font-display text-[clamp(4.5rem,18vw,17rem)] font-bold leading-[0.85] tracking-[-0.05em]"
          />
          <a
            data-reveal
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-12 inline-block break-all font-display text-2xl font-semibold tracking-tight underline decoration-vida-400 decoration-2 underline-offset-[10px] hover:no-underline md:text-5xl"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </section>

      <section className="bg-site-paper px-5 py-24 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <Eyebrow>[ Reach us ]</Eyebrow>
            <p data-reveal className="mt-6 max-w-xs text-base leading-relaxed text-ink-500">
              Questions, feedback or partnership ideas? Send a message and we will get back to you.
            </p>
            <div data-reveal className="mt-10 space-y-6">
              <div>
                <p className={LABEL}>Email</p>
                <a className="mt-1 block text-lg font-semibold text-site-ink hover:text-vida-600" href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL}
                </a>
              </div>
              <div>
                <p className={LABEL}>Web app</p>
                <a className="mt-1 block text-lg font-semibold text-site-ink hover:text-vida-600" href={APP_URL}>
                  app.vidacaretechnologies.ca
                </a>
              </div>
            </div>
          </div>

          <form data-reveal onSubmit={submit} className="space-y-10 md:col-span-8">
            <div className="grid gap-10 md:grid-cols-2">
              <label className={FIELD}>
                <span className={LABEL}>Your name</span>
                <input className={INPUT} placeholder="Jane Doe" required value={form.name} onChange={set("name")} />
              </label>
              <label className={FIELD}>
                <span className={LABEL}>Email</span>
                <input className={INPUT} type="email" placeholder="jane@email.com" required value={form.email} onChange={set("email")} />
              </label>
            </div>
            <label className={FIELD}>
              <span className={LABEL}>How can we help?</span>
              <textarea className={`${INPUT} min-h-[140px] resize-none`} placeholder="Tell us a little about it" required value={form.message} onChange={set("message")} />
            </label>
            <Magnetic>
              <button
                type="submit"
                className="flex h-32 w-32 items-center justify-center rounded-full bg-site-ink text-sm font-semibold text-white transition-transform duration-300 hover:scale-105 md:h-40 md:w-40 md:text-base"
              >
                Send ↗
              </button>
            </Magnetic>
          </form>
        </div>
      </section>
    </div>
  );
}
