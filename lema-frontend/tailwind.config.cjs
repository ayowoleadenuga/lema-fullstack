/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        "title-black": "#181D27",
        "custom-gray": "#535862",
        "custom-gray-light": "#717680",
        "custom-gray-lighter": "#94A3B8",
        "border-gray": "#E9EAEB",
        "custom-purple": "#7F56D9",
        "custom-purple-light": "#F9F5FF",
        "custom-loader": "#bdb1c6",
        "custom-button-gray": "#334155",
      },
      boxShadow: {
        normal: "0px 2px 4px -2px rgba(10, 13, 18, 0.06)",
        thick: "0px 4px 8px -2px rgba(10, 13, 18, 0.1)",
      },
      lineClamp: {
        7: "7",
        8: "8",
        9: "9",
        10: "10",
      },
      fontSize: {
        "xl-medium": "60px",
        "lg-medium": "36px",
        "sm-regular": "14px",
        "sm-medium": "18px",
        "xs-medium": "12px",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
