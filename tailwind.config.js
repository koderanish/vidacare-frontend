/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        teal: {
          50: "#f5f2fd", 100: "#ebe5fa", 200: "#d7cbf3", 300: "#bba7ea",
          400: "#9a7bdc", 500: "#7a4fc9", 600: "#6238b0", 700: "#4d2a8e",
          800: "#3b2175", 900: "#2b1d6e",
        },
        // Brand purple from the client logo (deep wordmark purple -> lighter accent).
        vida: {
          50: "#f5f2fd", 100: "#ebe5fa", 200: "#d7cbf3", 300: "#bba7ea", 400: "#a086e0",
          500: "#6c40b8", 600: "#57309f", 700: "#43257f", deep: "#2b1d6e", night: "#1c1248",
        },
        // Gold from the logo's "TECHNOLOGIES" wordmark.
        gold: { 300: "#f0c36b", 400: "#eab04d", 500: "#e5a63a", 600: "#c98a22" },
        site: { ink: "#130b30", paper: "#f7f4fd", mist: "#ebe5f8" },
        ink: { 900: "#1a1333", 700: "#3a3158", 500: "#6b6485", 300: "#a9a4bd" },
        // Exact tokens confirmed from literal oklch() values in the Flowstep
        // reference JSX (ui/source/*.jsx) rather than approximated - this is
        // the brand purple from the client logo, now shared app-wide.
        primary: {
          DEFAULT: "#6c40b8",
          foreground: "oklch(1 0 0)",
          // Precomputed alpha variant: Tailwind 3.4 can't auto-derive a /NN
          // opacity modifier from a raw oklch() theme color (only from
          // hex/rgb), so the soft tint is its own token instead.
          soft: "rgba(108, 64, 184, 0.15)",
        },
        secondary: "#e5a63a",
        border: "oklch(0.92 0.004 286.32)",
        foreground: "oklch(0.141 0.005 285.823)",
        "muted-foreground": "oklch(0.552 0.016 285.938)",
        destructive: "oklch(0.577 0.245 27.325)",
      },
      fontFamily: {
        display: ["\"Bricolage Grotesque\"", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        label: ["\"JetBrains Mono\"", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(26, 19, 51, 0.04), 0 4px 16px rgba(26, 19, 51, 0.06)",
      },
      borderRadius: { xl2: "1rem" },
    },
  },
  plugins: [],
};
