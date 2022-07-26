const path = require('path');

module.exports = {
  name: 'wordrelay-setting',
  mode: 'development', // 실서비스: production
  devtool: 'eval',

  // 이거 쓰면 entry에서 확장자명 안써도 알아서 찾아줌
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  // 입력
  entry: {
    app: ['./client.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?/, // jsx 파일에 적용을 함
        loader: 'babel-loader', // babel-loader를 사용하여 최신 문법을 옛날 browser를 사용하더라도 호환
        exclude: path.resolve(__dirname, 'node_modules/'),
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-proposal-class-properties'],
        },
      },
    ],
  },

  // 출력
  output: {
    path: path.join(__dirname, 'dist'),
  },
};
