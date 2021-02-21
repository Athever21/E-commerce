const path = require("path");
const cwd = process.cwd();

module.exports = {
  name: "browser",
  mode: "development",
  devtool: "eval-source-map",
  entry: [
    path.join(cwd, "client", "index.ts"),
  ],
  output: {
    path: path.join(cwd, "build"),
    filename: "dist.js",
    publicPath: "/build/",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              sassOptions: {
                fiber: require("fibers"),
              },
            },
          },
        ],
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  }
};
