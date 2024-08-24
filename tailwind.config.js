module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    fontFamily: {
      "climate": ["Climate Crisis", "sans-serif"]
    },
    extend: {
      strokeWidth: {
        '5': '5px',
      },
    },
  },
    plugins: [require("daisyui")],
}
