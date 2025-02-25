const path = require("path");
const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const paths = {
  scripts: { src: "src/ts/index.tsx" },
  dest: "dist",
};

module.exports = (() => ({
  entry: { main: path.resolve(__dirname, paths.scripts.src) },
  output: {
    path: path.resolve(__dirname, paths.dest),
    filename: "bundle.js",
    publicPath: "/",
  },
  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true,
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
      //favicon: path.resolve(__dirname, "src", "favicon.ico"),
      inject: true,
    }),
  ],
  devServer: {
    static: { directory: path.join(__dirname, paths.dest) },
    compress: true,
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
}))();
