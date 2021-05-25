const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  mode: 'development',
  target: false,
  entry: resolve(__dirname, 'src', 'index.js'),
  output: {
    filename: 'openlayers.dev.js',
    path: resolve(__dirname, 'dist/openlayers-dev'),
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
      filename: 'openlayers-dev.css'
    }),
    new ESLintPlugin({
      fix: true,
      failOnError: true
    })
  ],
  devtool: 'source-map'
}
