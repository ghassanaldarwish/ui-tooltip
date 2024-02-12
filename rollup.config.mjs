import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import alias from "@rollup/plugin-alias";
import path from "path";
import replace from "@rollup/plugin-replace";
import postcss from "rollup-plugin-postcss";

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.tsx",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      replace({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        preventAssignment: true,
      }),
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        include: ["**/*.ts+(|x)"],
      }),
      postcss({
        extensions: [".css"], // Add other extensions if needed
        extract: true, // Extract to a file
      }),
      terser(),
      alias({
        entries: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
      }),
    ],
    external: [
      "react",
      "react-dom",
      "tailwindcss",
      "@wds-utils/cn",
      "@wds-core/styled",
      "@radix-ui/react-tooltip",
      "@wds-ui/button",
    ],
  },
  {
    input: "src/index.tsx",
    output: [{ file: packageJson.types, format: "es" }],
    plugins: [dts()],
  },
];
