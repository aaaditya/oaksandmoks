
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F7F5F2",
        sage: "#7A9273",
        "sage-dark": "#5F7359",
        mocha: "#6F4E37",
        olive: "#556B4A",
        beige: "#ECE8E1",
        charcoal: "#1E1E1E",
        stone: {
          warm: "#E8E4DC",
          muted: "#9C958A",
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        manrope: ['"Manrope"', "system-ui", "sans-serif"],
      },
      fontSize: {
        "display": ["clamp(2.75rem,6vw+1rem,5.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-sm": ["clamp(2rem,4vw+1rem,3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
      boxShadow: {
        "soft": "0 4px 24px -4px rgba(30, 30, 30, 0.08), 0 8px 16px -8px rgba(30, 30, 30, 0.06)",
        "card": "0 2px 8px -2px rgba(30, 30, 30, 0.06), 0 12px 32px -12px rgba(30, 30, 30, 0.12)",
        "card-hover": "0 8px 32px -8px rgba(30, 30, 30, 0.14), 0 16px 48px -16px rgba(30, 30, 30, 0.1)",
      },
      maxWidth: {
        "content": "90rem",
      },
      transitionDuration: {
        "400": "400ms",
      },
    }
  },
  plugins: []
}
