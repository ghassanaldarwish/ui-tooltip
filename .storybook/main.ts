import type { StorybookConfig } from "@storybook/react-webpack5";
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  webpackFinal: async (config: any) => {
    // Find and replace the existing CSS rule
    const cssRule = config.module.rules.find(
      (rule) => rule.test.toString() === /\.css$/.toString()
    );
    if (cssRule) {
      const cssRuleIndex = config.module.rules.indexOf(cssRule);
      config.module.rules[cssRuleIndex] = {
        ...cssRule,
        use: [...cssRule.use, { loader: "postcss-loader" }],
      };
    }

    return config;
  },

  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
