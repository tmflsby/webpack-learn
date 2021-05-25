const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  /** 开发环境 */
  mode: 'development',

  /** 入口文件 */
  entry: resolve(__dirname, 'src', 'index.js'),

  /** 出口文件 */
  output: {
    filename: 'webpack-demo.js',
    path: resolve(__dirname, 'dist')
  },

  /** loader配置 */
  module: {
    rules: [
      {
        oneOf: [
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
              'style-loader',
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
              'style-loader',
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
              'style-loader',
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
            // use: [
            //   {
            //     loader: 'url-loader',
            //     options: {
            //       // 图片小于8kb，就会被base64处理
            //       limit: 8 * 1024,
            //       esModule: false
            //     }
            //   }
            // ]
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
            // use: 'file-loader'
            type: 'asset/resource'
          }
        ]
      }
    ]
  },

  /** 插件 */
  plugins: [
    /** 打包html */
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'src', 'index.html'),
      filename: 'index.html'
    }),

    /** eslint 配置 */
    new ESLintPlugin({
      fix: true,
      failOnError: true
    })
  ],

  /** webpack-dev-server */
  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    port: 2333,
    hot: true,
    open: true,
    compress: true   // 启用gzip压缩
  },

  resolve: {
    alias: {
      'src': resolve(__dirname, 'src')
    },
    extensions: ['.js', '.json'],
    modules: [resolve(__dirname, '../node-modules'), 'node-modules']
  }

}
