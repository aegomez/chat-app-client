// @ts-check

const path = require('path');

/** @type {import('webpack').Configuration} */
const config = {
  mode: 'development',
  entry: path.join(__dirname, 'src/app.tsx'),
  output: {
    path: path.join(__dirname, 'dist/public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      "@api": path.join(__dirname, 'src/api'),
      "@store": path.join(__dirname, 'src/store')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      // },
      // {
      //   test: /\.css$/i,
      //   use: ['style-loader', 'css-loader']
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    port: 9000,
    proxy: {
      '/api/auth': {
        target:'http://localhost:2000/q',
        pathRewrite: {'^/api/auth': ''}
      }
    },
    publicPath: '/public'
  }
}

module.exports = config;