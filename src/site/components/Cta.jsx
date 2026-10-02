import { Link } from "react-router-dom";
import { Lines } from "./Lines";
import { Magnetic } from "./Magnetic";
import { APP_URL } from "./Nav";

export function Cta({ lines = ["Ready to take", "charge of care?"] }) {
  return (
    <section className="site-noise relative overflow-hidden bg-vida-400 px-5 py-24 text-site-ink md:py-36">
      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p data-reveal className="font-label text-xs uppercase tracking-[0.25em] text-site-ink/70">
            [ Get started ]
          </p>
          <Lines
            as="h2"
            lines={lines}
            className="mt-6 font-display text-[clamp(2.8rem,8.5vw,8rem)] font-bold leading-[0.92] tracking-[-0.04em]"
          />
        </div>
        <div className="flex items-center gap-8">
          <Magnetic>
            <a
              href={APP_URL}
              className="flex h-36 w-36 items-center justify-center rounded-full bg-site-ink text-sm font-semibold text-white transition-transform duration-300 hover:scale-105 md:h-44 md:w-44 md:text-base"
            >
              Open app ↗
            </a>
          </Magnetic>
          <Link to="/contact" className="text-sm font-semibold underline decoration-2 underline-offset-8 hover:no-underline">
            or talk to us
          </Link>
        </div>
      </div>
    </section>
  );
}
