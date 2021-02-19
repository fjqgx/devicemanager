const Merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config")

module.exports = Merge.smart(baseWebpackConfig, {})