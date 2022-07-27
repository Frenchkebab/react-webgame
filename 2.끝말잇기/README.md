# 2. 구구단

## 2-1) React Hooks 사용하기

Hooks는 반드시 Component 안에 넣을 것

## 2-2) Class와 Hooks 비교하기

### 1: render되는 부분의 차이

**class component** 에서는 딱 `render()` 만큼만 다시 렌더링됨

```javascript
render() {
          return (
            <React.Fragment>
              <div>
                {this.state.first} X {this.state.second} is
              </div>
              <form onSubmit={this.onSubmit}>
                <input
                  ref={(c) => {
                    this.input = c;
                  }}
                  type="number"
                  value={this.state.value}
                  onChange={this.onChange}
                />
                <button>입력!</button>
              </form>
              <div>{this.state.result}</div>
            </React.Fragment>
          );
        }
```

**functional component**에서는 함수 코드들이 통째로 다시 실행되서 조금 느려질 수도 있음
내부의 함수도 재실행됨

```javascript
const GuGuDan = () => {
  const [first, setFirst] = React.useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = React.useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = React.useState('');
  const [result, setResult] = React.useState('');
  const inputRef = React.useRef(null);

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  const onSubmitForm = (e) => {
    e.preventDefault(); // 새로고침 되지 않도록
    if (parseInt(this.state.value) === this.state.first * this.state.second) {
      setResult('정답: ' + value);
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setValue('');
      inputRef.current.focus();
    } else {
      setResult('땡');
      setValue('');
      inputRef.current.focus();
    }
  };

  return (
    <React.Fragment>
      <div>
        {first} 곱하기 {second} 는?
      </div>
      <form>
        <input ref={inputRef} onChange={onChangeInput} value={value} />
        <button>입력!</button>
      </form>
      <div id="result">{result}</div>
    </React.Fragment>
  );
};
```

### 2: html에서 class, label은 사용할 수 없음

`class` 대신에 `className`, (class 문법과 혼동되므로)
`for` 대신에 `htmlFor` (for 반복문과 혼동되므로)

### 3: state를 object로 하나로 만들면?

```javascript
const [state, setState] = useState();
```

```javascript
setState({
  result: '정답',
  ...
})
```

-> `this.setState`와는 다르게 통째로 원래 내용을 다 넣어주어야 해서 setState 시에 불편해짐
(안써주는 것이 있으면 해당 state값이 다 날아감)

### 4: 이전 state를 쓰는 경우

```
setState((prev) => prev + 1);
```

### 5: setState가 여러번 실행될까?

```javascript
const onSubmitForm = (e) => {
  e.preventDefault(); // 새로고침 되지 않도록
  if (parseInt(this.state.value) === this.state.first * this.state.second) {
    setResult('정답: ' + value);
    setFirst(Math.ceil(Math.random() * 9));
    setSecond(Math.ceil(Math.random() * 9));
    setValue('');
    inputRef.current.focus();
  } else {
    setResult('땡');
    setValue('');
    inputRef.current.focus();
  }
};
```

-> react가 알아서 비동기적으로 처리해줌 (`setState`를 몰아서 한 번에 처리될 수 있도록 처리해줌)

## 2-3) 웹팩 설치하기

### 1: 웹팩이 뭐임?

100줄짜리 component 10개만 들어가도 1000줄이 넘어감...
Facebook의 경우 component가 2만개라고 함

그래서 중복을 제거해서 여러 개의 다른 js파일을 가져와서 하나의 파일로 합쳐주는 기술이 webpack임!

### 2: 웹팩 설치

```bash
$ npm i react react-dom
```

```bash
$ npm i -D webpack webpack-cli
```

### 3: 확장자

`.js`대신에 `.jsx` 를 사용하는 것이 `react`를 사용한다는 것을 조금 더 명시할 수 있음

## 2-4) 모듈 시스템과 웹팩 설정

### 1: HTML은 js파일 하나만 가져올 수 있음

-> `webpack`으로 합쳐서 하나로 만들어서 넣어주면 됨!

### 2: 웹팩 config 설정

```js
const path = require('path');

module.exports = {
  name: 'wordrelay-setting',
  mode: 'development', // 실서비스: production
  devtool: 'eval',

  // 이거 쓰면 entry에서 확장자명 안써도 알아서 찾아줌
  resolve: {
    extensions: ['.js', 'jsx']
  }

  // 입력
  entry: {
    app: ['./client'], // client에서 WordRelay를 불러오므로 webpack이 알아서 파악함
  },

  // 출력
  output: {
    path: path.join(__dirname, 'dist'), // /Users/frenchkebab/Dev/react/react-webgame/2.끝말잇기 + /dist
    filename: 'app.js',
  },
};
```

`path` 부분은 그냥 외우자...
`path.join`의 경우 `__dirname`과 `'dist'` 두 경로명을 합쳐준다!

## 2-5) 웹팩으로 빌드하기

### 1: command 등록이 되어 있지 않을 때

```bash
$ webpack
zsh: command not found: webpack
```

**방법1)** `package.json`에 **script** 등록하기

```json
  "scripts": {
    "dev": "webpack"
  },
```

**방법2** `npx` 명령어 사용하기

```bash
$ npx webpack
```

### 2: 에러 해결하기

```bash
$ npx webpack
asset app.js 1.53 KiB [compared for emit] (name: app)
./client.jsx 180 bytes [built] [code generated] [1 error]

ERROR in ./client.jsx 6:16
Module parse failed: Unexpected token (6:16)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
| const WordRelay = require('./WordRelay');
|
> ReactDom.render(<WordRelay />, document.querySelector('#root'));
```

Webpack이 JSX를 이해하지 못하여 생기는 문제.
`Babel`을 설치한 후에, `Babel`이 JSX를 이해할 수 있도록 설정해 주어야 함

```bash
$ npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader
```

`@babel/core` : 기본적인 `babel` 내용들

`@babel/preset-env` : 알아서 browser환경에 에 맞춰서 문법을 맞춰줌

`@babel/preset-react` : JSX 등을 지원해줌

`babel-loader` : `babel`과 `webpack`을 연결해줌

### 3: react18버전에서 ReactDom.render 를 사용할 수 없었던 이슈

```jsx
const React = require('react');
const ReactDOM = require('react-dom/client');

const WordRelay = require('./WordRelay');

// ReactDom.render(<WordRelay />, document.querySelector('#root'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<WordRelay />);
```

주석부분 대신 그 아래처럼 수정하였더니 정상 동작하였음.

## 2-7) @babel/preset-env와 plugins

### webpack.config

```javascript
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
```

여기에서

```javascript
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-proposal-class-properties'],
        },
```

preset들에 대한 세부 설정을 해주고 싶으면

```javascript
        options: {
          presets: [
            ['@babel/preset-env', {
              targets: {
                browsers: ['> 5% in KR', 'last 2 chrome versions'], // browserslist를 검색해서 참조하자
              }
            }]
           '@babel/preset-react'
           ],
          plugins: ['@babel/plugin-proposal-class-properties'],
        },
```

이렇게 배열의 처음에는 이름을, 두번째에는 세부 setting을 넣어준다.

결국에는 `mode`, `entry`, `module`, `output`, `plugins` 가 메인임!

**webpack.js.org** 공식문서를 참조하자!
