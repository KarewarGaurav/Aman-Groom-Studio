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
        ivory: "#f7f3ec",
        warmwhite: "#fdf9f2",
        cream: "#efe6d8",
        champagne: "#e4d5bc",
        "champagne-deep": "#d9c4a3",
        sandgold: "#d4af6a",
        gold: "#c9a227",
        bronze: "#9a7b4f",
        taupe: "#8b7d6b",
        burgundy: "#5c1528",
        wine: "#3d0f1c",
        charcoal: "#2a2624",
        charcoalsoft: "#4a4542",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "var(--font-bodoni)", "serif"],
        displayAlt: ["var(--font-bodoni)", "serif"],
        body: ["var(--font-manrope)", "sans-serif"],
        sans: ["var(--font-jakarta)", "var(--font-manrope)", "sans-serif"],
      },
      backgroundImage: {
        "luxury-light":
          "linear-gradient(135deg, #fdf9f2 0%, #f7f3ec 50%, #efe6d8 100%)",
        "promo-banner":
          "linear-gradient(120deg, #e4d5bc 0%, #efe6d8 50%, #f7f3ec 100%)",
        "hero-editorial":
          "radial-gradient(ellipse 70% 55% at 15% 20%, rgba(228,213,188,0.55), transparent 60%), linear-gradient(125deg, #fdf9f2 0%, #f7f3ec 50%, #e4d5bc 100%)",
        "gold-shimmer":
          "linear-gradient(135deg, #e4d5bc 0%, #d4af6a 40%, #c9a227 70%, #d4af6a 100%)",
        "burgundy-rich":
          "linear-gradient(135deg, #5c1528 0%, #3d0f1c 100%)",
      },
      boxShadow: {
        luxury: "var(--shadow-luxury)",
        soft: "var(--shadow-soft)",
        "glow-gold": "var(--shadow-glow-gold)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
