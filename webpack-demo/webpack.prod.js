const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')


module.exports = {
  /** 开发环境 */
  mode: 'production',

  /** 入口文件 */
  entry: resolve(__dirname, 'src', 'index.js'),

  /** 出口文件 */
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dist')
  },

  /** loader配置 */
  module: {
    rules: [
      /** 打包js文件 */
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: resolve(__dirname, 'src'),
        exclude: /node_modules/
      },

      /** 打包css文件 */
      {
        test: /\.css$/,
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
          }
        ]
      },

      /** 打包less文件*/
      {
        test: /\.less$/,
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
          'less-loader'
        ]
      },

      /** 打包scss/sass文件 */
      {
        test: /\.s[ac]ss$/,
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

      /** 打包图片资源 url-loader file-loader */
      {
        test: /\.(png|jpg|gif)$/,
        type: 'asset/inline'
      },

      /** 打包html中img图片 */
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              esModule: false
            }
          }
        ]
      },

      /** 打包其他资源 */
      {
        exclude: /\.(js|css|less|s[ac]ss|png|jpg|gif|html)$/,
        type: 'asset/resource'
      }
    ]
  },

  /** 插件 */
  plugins: [
    /** 打包html */
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'src', 'index.html'),
      filename: 'index.html',
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true
      }
    }),

    /** 提取css为单独文件 */
    new MiniCssExtractPlugin({
      filename: 'webpack-demo.css'
    }),

    /** 压缩css */
    new CssMinimizerPlugin(),

    /** eslint 配置 */
    new ESLintPlugin({
      fix: true,
      failOnError: true
    })
  ]

  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //     minSize: 30 * 1024,
  //     maxSize: 0,
  //     minChunks: 1,
  //     maxAsyncRequests: 5,
  //     automaticNameDelimiter: '~',
  //     name: true,
  //     cacheGroups: {
  //       defaultVendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         priority: -10,
  //         reuseExistingChunk: true
  //       },
  //       default: {
  //         minChunks: 2,
  //         priority: -20,
  //         reuseExistingChunk: true
  //       }
  //     }
  //   }
  // }

}
