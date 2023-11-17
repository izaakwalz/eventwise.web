/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        ews: {
          100: "#FAFAFA",
          300: "#353A5A",
          200: "#6C94EC",
          400: "#EEDDE4",
          500: "#E4EAEB",
          600: "#D2DCF1",
          700: "#EEEEEE",
        },
      },
      boxShadow: {
        card: "-3px 5px 0px 0px rgba(0,0,0, 0.25)",
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
  },
  plugins: [require("tailwindcss-animate")],
};
