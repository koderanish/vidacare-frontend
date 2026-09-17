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
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 32, 39, 0.04), 0 4px 16px rgba(15, 32, 39, 0.06)",
      },
      borderRadius: { xl2: "1rem" },
    },
  },
  plugins: [],
};
