// Single source of truth for the marketing site's SEO: titles, descriptions, structured data
// and the static HTML that is written for every public page at build time (see vite-seo-plugin.js).
// Plain JS with no JSX so Node can import it during the build.
import { HOME_SERVICE_IDS, ROLES, SERVICES, STEPS } from "./data.js";
import { SECTIONS as PRIVACY_SECTIONS, UPDATED as PRIVACY_UPDATED } from "./privacy.js";

export const SITE_URL = "https://vidacaretechnologies.ca";
export const APP_URL = "https://app.vidacaretechnologies.ca";
export const SITE_NAME = "VidaCare";
export const LEGAL_NAME = "VidaCare Technologies Inc.";
export const SEO_EMAIL = "shikha@vidacaretechnologies.ca";
export const OG_IMAGE = `${SITE_URL}/images/og-image.png`;
export const LOGO_URL = `${SITE_URL}/images/logo.png`;

// Public pages. `path` is the URL users see; directories are written to disk for each one.
export const ROUTES = [
  {
    path: "/",
    name: "Home",
    title: "VidaCare | Remote Care for Patients, Caregivers & Doctors",
    description:
      "VidaCare connects patients, caregivers and verified doctors with live vitals monitoring, ECG insights and timely alerts, so care never waits.",
    pageType: "WebPage",
    priority: "1.0",
    preloadImage: "/images/hero-doctor.jpg",
  },
  {
    path: "/about",
    name: "About",
    title: "About VidaCare | Remote Health Monitoring, Made Simple",
    description:
      "VidaCare Technologies Inc. builds tools that make remote health monitoring simple for patients, caregivers and verified doctors.",
    pageType: "AboutPage",
    priority: "0.7",
  },
  {
    path: "/services",
    name: "Services",
    title: "VidaCare Services | Vitals, ECG Insights & Smart Alerts",
    description:
      "Vitals monitoring, ECG insights, smart alerts, verified doctors, a caregiver circle and health resources, all in one remote care app.",
    pageType: "CollectionPage",
    priority: "0.9",
  },
  {
    path: "/contact",
    name: "Contact",
    title: "Contact VidaCare | Get in Touch",
    description: "Questions about VidaCare? Email our team and we will get back to you.",
    pageType: "ContactPage",
    priority: "0.6",
  },
  {
    path: "/privacy",
    name: "Privacy Policy",
    title: "Privacy Policy | VidaCare",
    description: "How VidaCare Technologies Inc. collects, uses and protects personal and health information on our website and mobile app.",
    pageType: "WebPage",
    priority: "0.3",
  },
];

export const urlFor = (path) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}/`);

export const findRoute = (pathname) => {
  const clean = pathname.replace(/\/+$/, "") || "/";
  return ROUTES.find((r) => r.path === clean);
};

const esc = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// ---- Structured data (JSON-LD) -------------------------------------------------------------

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

const organization = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: LEGAL_NAME,
  alternateName: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: { "@type": "ImageObject", url: LOGO_URL, width: 962, height: 348 },
  email: SEO_EMAIL,
  contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: SEO_EMAIL, availableLanguage: "English" },
};

const website = {
  "@type": "WebSite",
  "@id": SITE_ID,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  inLanguage: "en",
  publisher: { "@id": ORG_ID },
};

export const jsonLdFor = (route) => {
  const url = urlFor(route.path);
  const graph = [
    organization,
    website,
    {
      "@type": route.pageType,
      "@id": `${url}#webpage`,
      url,
      name: route.title,
      description: route.description,
      isPartOf: { "@id": SITE_ID },
      about: { "@id": ORG_ID },
      inLanguage: "en",
      primaryImageOfPage: { "@type": "ImageObject", url: OG_IMAGE },
    },
  ];

  if (route.path !== "/") {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: route.name, item: url },
      ],
    });
  }

  if (route.path === "/") {
    graph.push({
      "@type": "SoftwareApplication",
      name: SITE_NAME,
      url: APP_URL,
      applicationCategory: "HealthApplication",
      operatingSystem: "Web",
      description: route.description,
      publisher: { "@id": ORG_ID },
    });
  }

  if (route.path === "/services") {
    graph.push({
      "@type": "ItemList",
      name: "VidaCare services",
      itemListElement: SERVICES.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: { "@type": "Service", name: s.title, description: s.text, provider: { "@id": ORG_ID } },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
};

// ---- <head> tags ---------------------------------------------------------------------------

export const headTagsFor = (route) => {
  const url = urlFor(route.path);
  const tags = [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="en_CA" />`,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="VidaCare: remote care that keeps patients, caregivers and doctors in sync" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(route.title)}" />`,
    `<meta name="twitter:description" content="${esc(route.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
  ];
  if (route.preloadImage) {
    tags.push(`<link rel="preload" as="image" href="${route.preloadImage}" fetchpriority="high" />`);
  }
  // "<" is escaped so the JSON can never close the script tag early.
  const json = JSON.stringify(jsonLdFor(route)).replace(/</g, "\\u003c");
  tags.push(`<script type="application/ld+json" id="ld-json">${json}</script>`);
  return tags.join("\n    ");
};

// ---- Static page body ----------------------------------------------------------------------
// Written into #root for crawlers and link previews that do not run JavaScript. React replaces it
// as soon as the app mounts, so visitors never keep it.

const links = (items) => items.map(([href, label]) => `<a href="${href}">${esc(label)}</a>`).join(" · ");

const serviceList = (items) =>
  items
    .map(
      (s) =>
        `<h3>${esc(s.title)}</h3><p>${esc(s.tagline)} ${esc(s.text)}</p><ul>${s.points
          .map((p) => `<li>${esc(p)}</li>`)
          .join("")}</ul>`
    )
    .join("");

const BODY = {
  "/privacy": () => `
    <h1>Privacy Policy</h1>
    <p>Last updated ${esc(PRIVACY_UPDATED)}.</p>
    ${PRIVACY_SECTIONS.map((section) => `
      <section>
        <h2>${esc(section.title)}</h2>
        ${(section.body || []).map((p) => `<p>${esc(p)}</p>`).join("")}
        ${section.list ? `<ul>${section.list.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>` : ""}
      </section>
    `).join("")}
  `,
  "/": () => `
    <h1>Your health, always in sync.</h1>
    <p>VidaCare connects patients, caregivers and verified doctors with live vitals, ECG insights and timely alerts, so care never waits.</p>
    <p><a href="${APP_URL}">Open the VidaCare web app</a> · <a href="/services/">Explore services</a></p>
    <p>Questions? Write to us at <a href="mailto:${SEO_EMAIL}">${SEO_EMAIL}</a></p>
    <h2>What VidaCare does</h2>
    ${serviceList(HOME_SERVICE_IDS.map((id) => SERVICES.find((s) => s.id === id)))}
    <h2>Built for three groups</h2>
    ${ROLES.map((r) => `<h3>${esc(r.title)}</h3><p>${esc(r.text)}</p>`).join("")}
  `,
  "/about": () => `
    <h1>Care, connected wherever you are.</h1>
    <p>VidaCare Technologies Inc. builds tools that make remote health monitoring simple for patients, caregivers and doctors.</p>
    <h2>Our mission</h2>
    <p>We build tools that make remote health monitoring simple, so people can spot changes early and get the right support sooner.</p>
    <p>Managing a health condition is hard when information is scattered. VidaCare brings vitals, ECG insights, alerts and care-team communication into one place.</p>
    <h2>Who it is for</h2>
    ${ROLES.map((r) => `<h3>${esc(r.title)}</h3><p>${esc(r.text)}</p>`).join("")}
  `,
  "/services": () => `
    <h1>Everything care needs, in one app.</h1>
    <p>From daily vitals to doctor collaboration, VidaCare covers what remote care needs.</p>
    ${serviceList(SERVICES)}
    <h2>How it works</h2>
    ${STEPS.map((s) => `<h3>${esc(s.title)}</h3><p>${esc(s.text)}</p>`).join("")}
  `,
  "/contact": () => `
    <h1>Say hello.</h1>
    <p>Questions about VidaCare? Email us at <a href="mailto:${SEO_EMAIL}">${SEO_EMAIL}</a>.</p>
    <p><a href="${APP_URL}">Open the VidaCare web app</a></p>
  `,
};

export const bodyFor = (route) => `<div id="seo-static" style="max-width:56rem;margin:0 auto;padding:7rem 1.25rem 4rem;font-family:Inter,system-ui,sans-serif;line-height:1.6;color:#130b30">
      <header><a href="/"><strong>VidaCare</strong></a> · ${links([["/about/", "About"], ["/services/", "Services"], ["/contact/", "Contact"]])}</header>
      <main>${BODY[route.path]()}</main>
      <footer><p>© ${LEGAL_NAME} · <a href="/privacy/">Privacy Policy</a></p></footer>
    </div>`;

// ---- Sitemap -------------------------------------------------------------------------------

export const sitemapXml = (lastmod) =>
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (r) => `  <url>
    <loc>${urlFor(r.path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${r.priority}</priority>
  </url>`
).join("\n")}
</urlset>
`;
