// Build-time SEO: writes real HTML for every public page (own <title>, description, canonical,
// Open Graph tags, JSON-LD and readable content), plus sitemap.xml, so crawlers and link previews
// do not depend on JavaScript. The app itself still runs as a normal SPA on top of it.
import fs from "node:fs";
import path from "node:path";
import { ROUTES, bodyFor, headTagsFor, sitemapXml } from "./src/site/seo.js";

const HEAD_RE = /<!-- seo:head-start -->[\s\S]*?<!-- seo:head-end -->/;
const ROOT_RE = /<!-- seo:root-start -->[\s\S]*?<!-- seo:root-end -->/;

const fill = (html, route) =>
  html
    .replace(HEAD_RE, () => `<!-- seo:head-start -->\n    ${headTagsFor(route)}\n    <!-- seo:head-end -->`)
    .replace(ROOT_RE, () => `<!-- seo:root-start -->${bodyFor(route)}<!-- seo:root-end -->`);

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function seoPlugin({ adminBase = "/vc-portal" } = {}) {
  let outDir = "dist";
  const home = ROUTES.find((r) => r.path === "/");

  return {
    name: "vidacare-seo",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    // Home page tags for both `vite dev` and the built index.html.
    transformIndexHtml(html) {
      if (!HEAD_RE.test(html) || !ROOT_RE.test(html)) {
        this.warn?.("seo markers missing in index.html; skipping SEO injection");
        return html;
      }
      return fill(html, home);
    },
    closeBundle() {
      const indexPath = path.join(outDir, "index.html");
      if (!fs.existsSync(indexPath)) return;
      const built = fs.readFileSync(indexPath, "utf8");

      for (const route of ROUTES) {
        if (route.path === "/") continue;
        const dir = path.join(outDir, route.path);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, "index.html"), fill(built, route));
      }

      fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemapXml(new Date().toISOString().slice(0, 10)));

      // Keep the .htaccess in step with the configured admin URL prefix.
      const htaccess = path.join(outDir, ".htaccess");
      if (fs.existsSync(htaccess)) {
        const base = escapeRegex(adminBase.replace(/\/+$/, ""));
        fs.writeFileSync(htaccess, fs.readFileSync(htaccess, "utf8").replaceAll("__ADMIN_BASE__", base));
      }
    },
  };
}
