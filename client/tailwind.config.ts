import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        primeColor:"#263636",
        lightText:"6D6D6D",
      },
      boxShadow:{
        testShadow:"0px 0px 54px  -13px rgba(0,0,0,0.7)"
      }
    },
  },
  plugins: [],
};
export default config;
