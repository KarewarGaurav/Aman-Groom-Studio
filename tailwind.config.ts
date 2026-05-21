import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: "var(--burgundy)",
        wine: "var(--wine)",
        gold: "var(--gold)",
        champagne: "var(--champagne)",
        ivory: "var(--ivory)",
        charcoal: "var(--charcoal)",
        bronze: "var(--bronze)",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-manrope)", "sans-serif"],
        accent: ["var(--font-cormorant)", "serif"],
      },
      backgroundImage: {
        "luxury-gradient":
          "linear-gradient(135deg, var(--charcoal) 0%, #1a0a0f 40%, var(--wine) 100%)",
        "gold-shimmer":
          "linear-gradient(90deg, transparent, rgba(212, 175, 106, 0.15), transparent)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease forwards",
        shimmer: "shimmer 2.5s infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
