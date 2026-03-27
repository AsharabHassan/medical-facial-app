import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          DEFAULT: "#F8B188",
          light: "#FAC4A3",
          dark: "#E89A6E",
        },
        slate: "#3A474D",
        teal: {
          DEFAULT: "#4CA6A2",
          light: "#6BBAB7",
          dark: "#3A8B87",
        },
        graphite: "#4A4A4A",
        ivory: "#FFF9EF",
      },
      fontFamily: {
        serif: ["var(--font-castoro)", "Georgia", "serif"],
        sans: ["var(--font-mulish)", "system-ui", "sans-serif"],
      },
      animation: {
        scan: "scan 2.8s ease-in-out infinite",
        "scan-fast": "scan 1.4s linear infinite",
        "pulse-coral": "pulseCoral 2.5s ease-in-out infinite",
        shimmer: "shimmer 2s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(900%)", opacity: "0" },
        },
        pulseCoral: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(248,177,136,0)" },
          "50%": { boxShadow: "0 0 0 8px rgba(248,177,136,0.1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
