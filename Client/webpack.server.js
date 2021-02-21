const path = require("path");
const cwd = process.cwd();
const nodeExternals = require("webpack-node-externals");

module.exports = {
  name: "server",
  mode: "development",
  devtool: 'source-map',
  entry: [path.join(cwd,"server","index.ts")],
  externals: nodeExternals(),
  output: {
    path: path.join(cwd,"build"),
    filename: "server.js",
    publicPath: "/build/"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  }
}