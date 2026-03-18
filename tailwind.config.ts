import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        bg:       "#07070f",
        surface:  "#10101e",
        surface2: "#18182a",
        violet:   "#7c6fff",
        pink:     "#ff6fa8",
        mint:     "#6fffd4",
        muted:    "#5858a0",
        muted2:   "#9090cc",
      },
      backgroundImage: {
        "grad-btn":  "linear-gradient(135deg, #7c6fff, #ff6fa8)",
        "grad-text": "linear-gradient(135deg, #7c6fff 0%, #ff6fa8 55%, #ff9a6f 100%)",
      },
      boxShadow: {
        glow:      "0 0 28px rgba(124,111,255,0.42)",
        "glow-lg": "0 0 50px rgba(124,111,255,0.5), 0 8px 30px rgba(0,0,0,0.45)",
        card:      "0 20px 60px rgba(0,0,0,0.4), 0 0 28px rgba(124,111,255,0.07)",
        cta:       "0 40px 100px rgba(0,0,0,0.5)",
      },
      keyframes: {
        fadeDown: {
          from: { opacity: "0", transform: "translateY(-16px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(28px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        popIn: {
          from: { opacity: "0", transform: "scale(0.8) translateY(12px)" },
          to:   { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-22px)" },
        },
        floatRev: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(18px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        pulseGlow: {
          "0%,100%": { opacity: "1" },
          "50%":     { opacity: "0.3" },
        },
        blink: {
          "0%,100%": { opacity: "1" },
          "50%":     { opacity: "0" },
        },
        barFill: {
          from: { width: "0%" },
          to:   { width: "100%" },
        },
      },
      animation: {
        "fade-down":  "fadeDown 0.6s ease both",
        "fade-up":    "fadeUp 0.75s ease both",
        "fade-up-d1": "fadeUp 0.75s 0.15s ease both",
        "fade-up-d2": "fadeUp 0.75s 0.30s ease both",
        "fade-up-d3": "fadeUp 0.75s 0.45s ease both",
        "pop-in":     "popIn 0.6s 0.2s ease both",
        float:        "float 5s ease-in-out infinite",
        "float-rev":  "floatRev 6s ease-in-out infinite 1s",
        marquee:      "marquee 26s linear infinite",
        pulse:        "pulseGlow 2s ease-in-out infinite",
        blink:        "blink 1s step-end infinite",
        "bar-fill":   "barFill 1.4s ease forwards",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
        back: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
