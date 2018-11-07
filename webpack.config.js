const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

const rules = [
  {
    "test": /\.(js|jsx)$/,
    "exclude": /node_modules/,
    "use": {
      "loader": "babel-loader"
    }
  }, {
    test: /\.(sa|sc|c)ss$/,
    use: [
      devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
      'css-loader',
      'postcss-loader',
      'sass-loader',
    ],
  }
];

const plugins = [
  new HtmlWebpackPlugin({
    template: "./index.html",
    chunks: [
      'vendor',
      'app'
    ],
    chunksSortMode: 'manual'
  }),
  new MiniCssExtractPlugin({
    filename: devMode ? '[name].css' : '[name].[hash].css',
    chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
  })
];

const config = {
  context: path.resolve(__dirname, "src"),
  entry: {
    vendor: [
      'react',
      'react-dom'
    ],
    app: './index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules
  },
  plugins,
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    host: '0.0.0.0',
    port: 5000,
    hot: false,
    publicPath: '/'
  }
};

module.exports = config;
