const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  entry: "./source/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),

    filename: "script.js",
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader"],
        }),
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({ filename: "style.css", allChunks: true }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: "./source/html/index.html",
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: "./source/html/statlist.html",
      filename: "statlist.html",
    }),
    new CopyPlugin([
      { from: "./source/assets", to: "./assets" },
      { from: "./source/font", to: "./font" },
    ]),
  ],
};
