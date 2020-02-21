// @ts-check

const path = require('path');

/** @type {import('webpack').Configuration} */
const config = {
  mode: 'production',
  entry: path.join(__dirname, 'src/app.tsx'),
  output: {
    path: path.join(__dirname, 'dist/public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@api': path.join(__dirname, 'src/api'),
      '@store': path.join(__dirname, 'src/store')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        include: [
          path.join(__dirname, 'src')
        ],
        options: {
          transpileOnly: true
        }
      }
    ]
  },
  target: 'web',
  // devtool: "source-map"
}

module.exports = config;