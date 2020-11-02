const paths = require('./paths');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [paths.SRC_DIR + '/index.js'],
  output: {
    path: paths.BUILD_DIR,
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      //FOR BABEL
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      //FOR IMAGES
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      //FONT AND SVG
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      // FOR CSS, POSTCSS, SCSS(SASS)
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1 },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      //FOR HANDLEBARS
      {
        test: /\.hbs$/,
        exclude: /node_modules/,
        use: 'handlebars-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.SRC_DIR + '/index.html',
      filename: 'index.html',
      // minify: {
      //   collapseWhitespace: true,
      //   removeComments: true,
      //   removeRedundantAttributes: true,
      //   removeScriptTypeAttributes: true,
      //   removeStyleLinkTypeAttributes: true,
      //   useShortDoctype: true,
      // },
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.PUBLIC_DIR,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
        },
      ],
    }),
  ],
};
