import path from "path";
import webpack from "webpack";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import HtmlInlineScriptPlugin from "html-inline-script-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  optimization: {
    splitChunks: false,
  },
  devServer: {
    static: "./dist",
    port: 3000,
    hot: true,
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/inline",
      },
      { test: /\.js$/, use: "babel-loader" },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "body",
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    // new HtmlInlineScriptPlugin(),
  ],
};
