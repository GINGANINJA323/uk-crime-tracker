const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env", "@babel/preset-typescript"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: [".ts", ".js", ".tsx"] },
  output: {
    path: path.resolve(__dirname, "public/"),
    publicPath: "/public/",
    filename: "bundle.js"
  }
};