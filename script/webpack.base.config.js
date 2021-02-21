const path = require("path");
const webpack = require('webpack');
const packageinfo = require('../package.json');

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: packageinfo.name + ".js",
    path: path.resolve(__dirname, "../dist"),
    libraryTarget: "umd"
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: packageinfo.name + " - ver " + packageinfo.version + " created:" + new Date().toLocaleString()
    })
  ]
};

