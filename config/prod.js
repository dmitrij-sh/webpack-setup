const paths = require('./paths');
const { merge } = require('webpack-merge');
const shared = require('./shared.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(shared, {
  mode: 'production',
  devtool: false,
  output: {
    path: paths.BUILD_DIR,
    filename: 'js/[name].[contenthash].bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      // FOR CSS, POSTCSS, SCSS(SASS)
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new OptimizeCssAssetsPlugin()],
    runtimeChunk: {
      name: 'runtime',
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
  ],
});
