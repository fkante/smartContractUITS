const { colors, fontSize, fontFamily } = require("tailwindcss/defaultTheme");
const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: [
    "./components/**/*.tsx",
    "./components/**/*.ts",
    "./pages/**/*.tsx",
    "./pages/**/*.ts",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          ...colors.blue,
          100: "#F7FAFB",
          200: "#EFF2F3",
        },
        orange: {
          ...colors.orange,
          100: "#FFF7ED",
          400: "#FD6C33",
          500: "#FDAC45",
        },
        gray: {
          50: "#EDEDED",
          100: "#F7F7F7",
          200: "#E1E1E1",
          300: "#CFCFCF",
          400: "#B1B1B1",
          500: "#9E9E9E",
          600: "#626262",
          700: "#515151",
          800: "#3B3B3B",
          900: "#222222",
        },
        green: {
          ...colors.green,
          300: "#4FA203",
        },
        red: {
          ...colors.red,
          250: "#FD1D1D",
          300: "#BC4F37",
          400: "#ef0909",
          500: "#d40808",
          600: "#be0707",
          700: "#a90606",
        },
        purple: {
          ...colors.purple,
          100: "#E7E0EC",
          250: "#833AB4",
          450: "#AD3282",
          500: "#8C39AA",
        },
        yellow: {
          ...colors.yellow,
          200: "#FCB045",
        },
      },
      fontFamily: {
        sans: ["Open Sans", ...fontFamily.sans]
      },
      fontSize: {
        ...fontSize,
        12: "12px",
        14: "14px",
      },
      height: {
        md: "38px",
        48: "48px",
        80: "80px",
        96: "96px",
        "7/10": "70%",
        100: "100px",
        500: "500px",
        600: "600px",
      },
      transitionProperty: {
        width: "width",
      },
      width: {
        md: "84px",
        "2/3": "66%",
        "1/8": "12.5%",
        "3/8": "37.5%",
        "1/12": "8.33%",
        "1/15": "6.66%",
        "1/16": "6.25%",
        "1/17": "5.88%"
      },
    },
  },
  variants: {
    transitionProperty: ["responsive", "hover", "focus"],
    width: ["responsive", "hover", "focus", "group-hover"],
  },
  plugins: [
    plugin(function({ addUtilities }) {
      const newUtilities = {
        '.background-gradient': {
          "background": "rgba(252, 175, 69, 0.08)",
          "background": "linear-gradient(272.65deg, rgba(252, 175, 6, 0.08) 1.22%, rgba(52, 211, 153, 0.08) 45.91%, rgba(96, 165, 250, 0.08) 92.48%)"
        },
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    })
  ],
};
