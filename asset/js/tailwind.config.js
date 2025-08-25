module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ["Playwrite CA", "cursive"],
      },
    },
  },
  plugins: [],
}

// main.js

// Make sure Tailwind is loaded before running this
if (typeof tailwind !== "undefined") {
  tailwind.config = {
    theme: {
      extend: {
        fontFamily: {
          ubuntu: ["Playwrite CA", "cursive"], // your custom font
          exo: ["Exo 2", "sans-serif"],
        },
      },
    },
  };
} else {
  console.error("Tailwind is not loaded yet.");
}


