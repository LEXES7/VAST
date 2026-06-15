import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          violet: "#8b5cf6",
          blue: "#3b82f6",
          cyan: "#22d3ee",
          pink: "#ec4899",
        },
      },
      keyframes: {
        "aurora-a": {
          "0%, 100%": { transform: "translate(-10%, -10%) scale(1)" },
          "50%": { transform: "translate(15%, 20%) scale(1.25)" },
        },
        "aurora-b": {
          "0%, 100%": { transform: "translate(10%, 5%) scale(1.1)" },
          "50%": { transform: "translate(-20%, -15%) scale(0.9)" },
        },
        "aurora-c": {
          "0%, 100%": { transform: "translate(0%, 10%) scale(1)" },
          "50%": { transform: "translate(20%, -10%) scale(1.2)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "aurora-a": "aurora-a 20s ease-in-out infinite",
        "aurora-b": "aurora-b 24s ease-in-out infinite",
        "aurora-c": "aurora-c 28s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "gradient-x": "gradient-x 8s ease infinite",
        "fade-up": "fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
        "scale-in": "scale-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
} satisfies Config;
