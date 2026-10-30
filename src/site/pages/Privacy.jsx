import { useRef } from "react";
import { PageHero } from "../components/Section";
import { SECTIONS, UPDATED } from "../privacy";
import { useReveal } from "../useReveal";

export default function Privacy() {
  const root = useRef(null);
  useReveal(root);

  return (
    <div ref={root}>
      <PageHero eyebrow="[ Legal ]" lines={["Privacy", "policy."]}>
        How VidaCare Technologies Inc. collects, uses and protects your information. Last updated {UPDATED}.
      </PageHero>

      <section className="bg-site-paper px-5 py-20 md:py-32">
        <div className="mx-auto max-w-3xl space-y-12">
          {SECTIONS.map((s) => (
            <div key={s.title} data-reveal>
              <h2 className="font-display text-2xl font-bold tracking-tight text-site-ink md:text-3xl">{s.title}</h2>
              {s.body?.map((p, i) => (
                <p key={i} className="mt-4 text-base leading-relaxed text-ink-500">{p}</p>
              ))}
              {s.list && (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-ink-500">
                  {s.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
