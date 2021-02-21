const path = require("path");
const nodeExternals = require("webpack-node-externals");
const cwd = process.cwd();

module.exports = {
  name: "server",
  mode: "development",
  entry: [path.join(cwd,"src","index.ts")],
  externals: nodeExternals(),
  output: {
    path: path.join(cwd,"build"),
    filename: "dist.js",
    publicPath: "/build/"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        include: [path.resolve("./src")]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],    
  }
}