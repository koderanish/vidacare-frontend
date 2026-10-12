import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { OG_IMAGE, findRoute, headTagsFor, urlFor } from "./seo";

const setMeta = (selector, attr, key, value) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
};

// Keeps <title>, description, canonical, social tags and JSON-LD in step with the current page
// when visitors move around without a full reload. The first load is already correct because the
// server sends per-page HTML (see vite-seo-plugin.js).
export function useSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const route = findRoute(pathname);
    if (!route) return;
    const url = urlFor(route.path);

    document.title = route.title;
    setMeta('meta[name="description"]', "name", "description", route.description);
    setMeta('meta[property="og:title"]', "property", "og:title", route.title);
    setMeta('meta[property="og:description"]', "property", "og:description", route.description);
    setMeta('meta[property="og:url"]', "property", "og:url", url);
    setMeta('meta[property="og:image"]', "property", "og:image", OG_IMAGE);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", route.title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", route.description);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    // headTagsFor() already builds the JSON-LD; reuse it rather than keeping a second copy.
    const holder = document.createElement("div");
    holder.innerHTML = headTagsFor({ ...route, preloadImage: undefined });
    const fresh = holder.querySelector("#ld-json");
    const current = document.getElementById("ld-json");
    if (fresh && current) current.textContent = fresh.textContent;
    else if (fresh) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "ld-json";
      script.textContent = fresh.textContent;
      document.head.appendChild(script);
    }
  }, [pathname]);
}
