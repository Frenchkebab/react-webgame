const path = require('path');

module.exports = {
  name: 'wordrelay-setting',
  mode: 'development', // 실서비스: production
  devtool: 'eval',

  // 입력
  entry: {},

  // 출력
  output: {
    path: path.join(__dirname, 'dist'),
  },
};
