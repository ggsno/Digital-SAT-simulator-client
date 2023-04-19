/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      main: "main",
      question: "question",
    },
    backgroundImage: {
      optionEliminator: "url('/image/optionEliminator.png')",
      optionEliminatorClicked: "url('/image/optionEliminator-clicked.png')",
      markReview: "url('/image/markReview.png')",
      markReviewClicked: "url('/image/markReview-clicked.png')",
    },
    extend: {
      colors: {
        black: "#1e1e1e",
        blue: "#0077c8",
        "gray-dark": "#505050",
        gray: "#cccccc",
        "gray-light": "#f0f0f0",
        yellow: "#fae89d",
        "yellow-dark": "#fada53",
        "violet-blue": "#324dc7",
      },
    },
  },
  plugins: [],
};
