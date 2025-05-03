const path = require('path');
const PugPlugin = require('pug-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const config = {
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'assets'),
    },
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    publicPath: '',
  },
  devServer: {
    host: 'localhost',
    static: path.join(__dirname, 'dist'),
    watchFiles: {
      paths: ['src/**/*.*', 'assets/**/*.*'],
      options: {
        usePolling: true
      }
    }
  },
  plugins: [
    new PugPlugin({
      pretty: 'auto',
      entry: {
        index: './src/index.pug',
      },
      js: {
        filename: 'assets/js/[name].js'
      },
      css: {
        filename: 'assets/css/[name].css'
      }
    }),
    new ESLintPlugin({
      cwd: path.resolve(__dirname, '.'),
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'assets/images'),
          to: 'assets/img'
        }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: ['css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|jpeg|ico|svg)$/,
        include: path.resolve(__dirname, 'assets/images'),
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name][ext]'
        }
      },
    ]
  },
  stats: 'errors-only'
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }
  return config;
};