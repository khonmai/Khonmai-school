import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    colors: {
      "sea-green": {
        "50": "#EEF0F6",
        "100": "#d6f1f0",
        "200": "#ade2e1",
        "300": "#7ccccc",
        "400": "#51acb0",
        "500": "#379095",
        "600": "#2a7177",
        "700": "#23555a",
        "800": "#22484d",
        "900": "#203d41",
        "950": "#0d2326",
      },
      "silver-tree": {
        "50": "#f0f9f3",
        "100": "#dbf0e0",
        "200": "#bae0c6",
        "300": "#8cc9a2",
        "400": "#73B88E",
        "500": "#3a8f5e",
        "600": "#297249",
        "700": "#215b3d",
        "800": "#1c4931",
        "900": "#183c2a",
        "950": "#0c2218",
      },
      tidal: {
        "50": "#fafce9",
        "100": "#f2f8cf",
        "200": "#e4f0a1",
        "300": "#d2e571",
        "400": "#bbd645",
        "500": "#9ebc26",
        "600": "#7b951b",
        "700": "#5d7219",
        "800": "#4b5b19",
        "900": "#404d1a",
        "950": "#202a09",
      },
      "orange": {
        "50": "#fff5ed",
        "100": "#ffe8d5",
        "200": "#fed0aa",
        "300": "#fdb274",
        "400": "#fb923c",
        "500": "#f97c16",
        "600": "#ea700c",
        "700": "#c25e0c",
        "800": "#9a4f12",
        "900": "#7c4212",
        "950": "#432207",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
