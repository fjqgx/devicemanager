const Merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = Merge.smart(baseWebpackConfig, {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      })
    ],
  },
})
