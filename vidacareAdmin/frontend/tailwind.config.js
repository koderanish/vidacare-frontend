/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        teal: {
          50: "#f0fbfa", 100: "#d9f4f1", 200: "#b6e9e3", 300: "#86d8cf",
          400: "#52c0b4", 500: "#2fa39a", 600: "#23827c", 700: "#1f6965",
          800: "#1e5451", 900: "#1c4644",
        },
        ink: { 900: "#0f2027", 700: "#25414c", 500: "#54707a", 300: "#93a9b0" },
        // Exact tokens confirmed from literal oklch() values in the Flowstep
        // reference JSX (ui/source/*.jsx) rather than approximated - this is
        // the same green used on the login page, now shared app-wide.
        primary: {
          DEFAULT: "oklch(0.723 0.219 149.579)",
          foreground: "oklch(1 0 0)",
          // Precomputed alpha variant: Tailwind 3.4 can't auto-derive a /NN
          // opacity modifier from a raw oklch() theme color (only from
          // hex/rgb), so the soft tint is its own token instead.
          soft: "oklch(0.723 0.219 149.579 / 0.15)",
        },
        secondary: "oklch(0.6 0.118 184.704)",
        border: "oklch(0.92 0.004 286.32)",
        foreground: "oklch(0.141 0.005 285.823)",
        "muted-foreground": "oklch(0.552 0.016 285.938)",
        destructive: "oklch(0.577 0.245 27.325)",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 32, 39, 0.04), 0 4px 16px rgba(15, 32, 39, 0.06)",
      },
      borderRadius: { xl2: "1rem" },
    },
  },
  plugins: [],
};
