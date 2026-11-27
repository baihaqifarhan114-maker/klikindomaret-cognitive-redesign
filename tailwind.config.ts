import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        klik: {
          blue: "#1178D4",
          "blue-hover": "#0958AA",
          "blue-dark": "#044B95",
          "blue-soft": "#EAF4FD",
          "blue-light": "#6CA5E0",
          amber: "#F29D0D",
          "amber-hover": "#DA8D0B",
          "amber-soft": "#FFF7E6",
          red: "#EE2B2E",
          "red-dark": "#DC1013",
          "red-soft": "#FFEDEE",
          surface: "#EFF3F6",
          border: "#E5E7EB",
          "border-input": "#DCDEE3",
          ink: "#151823",
          "ink-secondary": "#434755",
          "ink-muted": "#70727D",
          "ink-subtle": "#9C9DA6",
          green: "#15803D",
          "green-soft": "#ECFDF3",
        },
      },
      maxWidth: {
        klik: "1216px",
      },
    },
  },
  plugins: [],
};
export default config;
