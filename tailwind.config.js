// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "pulse-scale": "pulseScale 2s infinite",
      },
      keyframes: {
        pulseScale: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.10)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
