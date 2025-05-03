const path = require('path');
const PugPlugin = require('pug-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';


const config = {
    output: {
      path: path.join(__dirname, 'dist/'),
      publicPath: '/',
    },
    devServer: {
      host: 'localhost',
      static: path.join(__dirname, 'dist'),
      watchFiles: {
        paths: ['src/**/*.*', 'assets/**/*.*',],
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
      new MiniCssExtractPlugin(),
      new MiniCssExtractPlugin(),
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
        {
          test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
          include: path.resolve(__dirname, 'assets/fonts'),
          type: 'asset/resource',
          generator: {
            filename: 'assets/fonts/[name][ext]'
          }
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ]
    },
    stats: 'errors-only'
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
    } else {
        config.mode = 'development';
    }
    return config;
};
