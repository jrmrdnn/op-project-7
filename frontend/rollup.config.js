import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";
import scss from "rollup-plugin-scss";

export default {
  input: "frontend/src/index.tsx",
  output: {
    file: "backend/public/app.js",
    format: "es",
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    babel({
      babelHelpers: "bundled",
      exclude: ["node_modules/**"],
    }),
    scss({ outputStyle: "compressed" }),
    terser(),
  ],
};
