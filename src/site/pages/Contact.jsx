import { useRef, useState } from "react";
import { Mail, Globe, Send } from "lucide-react";
import { PageHero } from "../components/Section";
import { CONTACT_EMAIL } from "../components/Footer";
import { APP_URL } from "../components/Nav";
import { useReveal } from "../useReveal";

const FIELD = "w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-vida-500 focus:ring-2 focus:ring-vida-500/30";

export default function Contact() {
  const root = useRef(null);
  useReveal(root);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  // No form backend yet: the button opens the visitor's email app with the message filled in.
  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`VidaCare enquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n${form.name}\n${form.email}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div ref={root}>
      <PageHero eyebrow="Contact" title="We would love to hear from you">
        Questions, feedback or partnership ideas? Send us a message and we will get back to you.
      </PageHero>

      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-5">
          <div className="space-y-5 md:col-span-2">
            <a data-reveal href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-4 rounded-2xl border border-ink-900/10 p-6 transition hover:border-vida-400 hover:shadow-card">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-vida-100 text-vida-600"><Mail className="h-6 w-6" /></span>
              <span><span className="block text-xs uppercase tracking-widest text-ink-500">Email</span><span className="font-semibold text-vida-deep">{CONTACT_EMAIL}</span></span>
            </a>
            <a data-reveal href={APP_URL} className="flex items-center gap-4 rounded-2xl border border-ink-900/10 p-6 transition hover:border-vida-400 hover:shadow-card">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-vida-100 text-vida-600"><Globe className="h-6 w-6" /></span>
              <span><span className="block text-xs uppercase tracking-widest text-ink-500">Web app</span><span className="font-semibold text-vida-deep">app.vidacaretechnologies.ca</span></span>
            </a>
          </div>

          <form data-reveal onSubmit={submit} className="space-y-4 rounded-3xl bg-vida-50 p-8 md:col-span-3">
            <div className="grid gap-4 sm:grid-cols-2">
              <input className={FIELD} placeholder="Your name" required value={form.name} onChange={set("name")} aria-label="Your name" />
              <input className={FIELD} type="email" placeholder="Email address" required value={form.email} onChange={set("email")} aria-label="Email address" />
            </div>
            <textarea className={`${FIELD} min-h-[160px] resize-y`} placeholder="How can we help?" required value={form.message} onChange={set("message")} aria-label="Message" />
            <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-vida-500 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-vida-600 active:scale-[0.96]">
              <Send className="h-4 w-4" /> Send message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
