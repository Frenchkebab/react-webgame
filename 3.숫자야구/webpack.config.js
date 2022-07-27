const path = require('path');
const webpack = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// 여기 있는 것들은 다 이해하고 넘어가야 함!!
module.exports = {
  name: 'numberbaseball-setting',
  mode: 'development', // 실서비스: production
  devtool: 'eval',

  // 이거 쓰면 entry에서 확장자명 안써도 알아서 찾아줌
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  // 입력
  entry: {
    app: ['./client'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?/, // jsx 파일에 적용을 함
        loader: 'babel-loader', // babel-loader를 사용하여 최신 문법을 옛날 browser를 사용하더라도 호환
        exclude: path.resolve(__dirname, 'node_modules/'),
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  browsers: ['> 5% in KR'], // browserslist 참조!
                },
                debug: true,
              },
            ],
            '@babel/preset-react',
          ],
          plugins: ['@babel/plugin-proposal-class-properties', 'react-refresh/babel'],
        },
      },
    ],
  },

  plugins: [new RefreshWebpackPlugin()], // 빌드 시마다 이것이 실행됨

  // 출력
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/dist/',
  },

  devServer: {
    devMiddleware: { publicPath: '/dist' }, // webpack이 빌드한 파일들이 존재하는 경우
    static: { directory: path.resolve(__dirname) },
    // static: { directory: path.resolve(__dirname, 'src') }, // src 안에 index.html이 있는 경우
    hot: true,
  },
};
