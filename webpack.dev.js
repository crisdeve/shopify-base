const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const shoulAnalyze = process.argv.includes('--analyze');

const plugins = [];

if (shoulAnalyze) {
  const { BundleAnalyzerPlugin } = module.require('webpack-bundle-analyzer');
  plugins.push(new BundleAnalyzerPlugin());
}

/** @type {import("webpack").Configuration}  */

const devConfig = {
  mode: "development",
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
    ]
  },
  plugins,
}

module.exports = merge(common, devConfig);