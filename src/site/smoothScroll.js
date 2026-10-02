import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis = null;
let tick = null;
let users = 0;

// Inertial smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync.
// Reference-counted so React StrictMode's double mount can't leave it half-started.
// Disabled for prefers-reduced-motion. Returns a cleanup function.
export function startSmoothScroll() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  if (!lenis) {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    tick = (time) => lenis && lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
  }
  users += 1;

  return () => {
    users -= 1;
    if (users > 0) return;
    gsap.ticker.remove(tick);
    lenis.destroy();
    lenis = null;
    tick = null;
  };
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo(0, 0);
}
