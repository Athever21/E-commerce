const path = require("path");
const cwd = process.cwd();
const nodeExternals = require("webpack-node-externals");

module.exports = {
  target: "node",
  mode: "development",
  name: "server",
  entry: [path.join(cwd,"src","server.ts")],
  output: {
    path: path.join(cwd,"build"),
    filename: "dist.js",
    publicPath: "/build/"
  },
  externals: nodeExternals(),
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        include: [
          path.resolve(__dirname, './src')
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],    
  },
}