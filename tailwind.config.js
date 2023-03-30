/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      main: "main",
      question: "question",
    },
    backgroundImage: {
      markWrong: "url('/image/markWrong.png')",
      markWrongClicked: "url('/image/markWrong-clicked.png')",
      markReview: "url('/image/markReview.png')",
      markReviewClicked: "url('/image/markReview-clicked.png')",
    },
    extend: {
      colors: {
        black: "#1e1e1e",
        blue: "#0077c8",
        "gray-dark": "#505050",
        gray: "#bdbdbd",
        "gray-light": "#f0f0f0",
      },
    },
  },
  plugins: [],
};
