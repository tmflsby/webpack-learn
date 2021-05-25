const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  mode: 'production',
  target: false,
  entry: resolve(__dirname, 'src', 'index.js'),
  output: {
    filename: 'openlayers.prod.js',
    path: resolve(__dirname, 'dist/openlayers-prod'),
    assetModuleFilename: 'assets/[hash][ext][query]'
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.js$/,
            use: 'babel-loader',
            include: resolve(__dirname, 'src'),
            exclude: /node_modules/
          },
          {
            test: /\.css|s[ac]ss$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: ['postcss-preset-env']
                  }
                }
              },
              'sass-loader'
            ]
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/,
            type: 'asset/resource'
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource'
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'openlayers-prod.css'
    }),
    new CssMinimizerPlugin(),
    new ESLintPlugin({
      fix: true,
      failOnError: true
    })
  ],
  devtool: 'source-map'
}
