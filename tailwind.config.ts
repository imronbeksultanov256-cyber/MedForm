import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B1E3D",
          50: "#EEF2F8",
          100: "#D7E0EE",
          400: "#3A4E75",
          500: "#1B3155",
          600: "#122544",
          700: "#0B1E3D",
          900: "#060F1E",
        },
        sky: {
          DEFAULT: "#3FA9F5",
          50: "#EBF6FE",
          100: "#D3ECFD",
          300: "#8FCEFA",
          500: "#3FA9F5",
          600: "#1E8FE0",
        },
        ice: "#F3F7FC",
        graphite: "#1C2430",
        gold: "#C9A46A",
      },
      fontFamily: {
        display: ["var(--font-manrope)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.75rem",
      },
      boxShadow: {
        soft: "0 8px 30px -12px rgba(11,30,61,0.18)",
        card: "0 4px 20px -6px rgba(11,30,61,0.12)",
        glass: "0 8px 32px 0 rgba(11,30,61,0.10)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease-out both",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
