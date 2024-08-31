/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      sm: "515px",
      md: "700px",
      lg: "940px",
      xl: "1115px",
      "2xl": "1300px",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        sm: "515px",
        md: "700px",
        lg: "940px",
        xl: "1115px",
        "2xl": "1300px",
      },
    },
    extend: {
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
        Cairo: ["Cairo", "sans-serif"],
      },
      colors: {
        bg: "#ffffff",
        temp_primary: "hsl(var(--temp_primary))",
        temp_secondary: "hsl(var(--temp_secondary))",
        delete: "#f87171",
        error: "#ef4444",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        grey: "hsl(var(--grey))",
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
        accnt: {
          DEFAULT: "hsl(var(--accnt))",
          foreground: "hsl(var(--accnt_2))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        altern_color: "#ff920f",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      height: {
        "form-filed-height": "var(--form-filed-height)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    screens: {
      "6xl": { max: "1536px" },
      "5xl": { max: "1400px" },
      "4xl": { max: "1350px" },
      "3xl": { max: "1200px" },
      "2xl": { max: "1270px" },
      xl: { max: "1200px" },
      lg: { max: "990px" },
      md: { max: "768px" },
      ss: { max: "650px" },
      sm: { max: "550px" },
      axs: { max: "400px" },
      xs: { max: "375px" },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/forms")],
};
