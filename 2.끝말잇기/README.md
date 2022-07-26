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

`.js`대신에 `.jsx` 를 사용하는 것이
