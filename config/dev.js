const paths = require('./paths');
const { merge } = require('webpack-merge');
const shared = require('./shared.js');
const webpack = require('webpack');

module.exports = merge(shared, {
  mode: 'development',
  devtool: 'inline-source-map',

  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: 'paths.BUILD_DIR',
    port: 8080,
    open: true,
    compress: true,
    stats: 'errors-only',
    clientLogLevel: 'error',
    historyApiFallback: true,
    noInfo: true,
    quiet: true,
    hot: false,
  },
});
