import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ashoka: {
          DEFAULT: "var(--color-ashoka)",
          100: "var(--color-ashoka-100)",
          700: "var(--color-ashoka-700)",
        },
        saffron: {
          DEFAULT: "var(--color-saffron)",
          600: "var(--color-saffron-600)",
        },
        paper: {
          DEFAULT: "var(--color-paper)",
          dim: "var(--color-paper-dim)",
        },
        ink: {
          DEFAULT: "var(--color-ink)",
          dim: "var(--color-ink-dim)",
        },
        line: "var(--color-line)",
        resolved: "var(--color-resolved)",
        pending: "var(--color-pending)",
        critical: "var(--color-critical)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        card: "var(--radius-card)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
      },
    },
  },
  plugins: [],
};

export default config;
