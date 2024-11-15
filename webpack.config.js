import { WordpressShortcodeWebpackPlugin } from "wordpress-shortcode-webpack-plugin";

export default {
  entry: "./src/index.js",
  output: {
    filename: "ratecalc.js",
  },
  plugins: [
    new WordpressShortcodeWebpackPlugin({
      wordpressPluginName: "my-awesome-plugin",
      headerFields: {
        author: "Tom Lagier",
        description: "An awesome plugin that does many cool things",

        version: "1.2.3",
      },
    }),
  ],
};
