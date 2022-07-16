# React Webgame

[https://github.com/ZeroCho/react-webgame/tree/react18]()

## 1. 구구단

### 1-1) React는 화면 먼저

React는 데이터 중심
-> 전에는 화면 그리고 자바스크립트로 데이트를 넣어주는 방식이였다면,
React에서는 데이터가 바뀌면 화면이 함께 바뀜. (바뀌는 부분은 state로 만들어둠)

```javascript
<script>
      "use strict";

      // class는 거의 1%정도만 쓰임 (1% ErrorBoundary)
      class LikeButton extends React.Component {
        constructor(props) {
          super(props);
          this.state = { liked: false };
        }
        render() {
          if (this.state.liked) {
            return "You liked this.";
          }

          return React.createElement("button", { onClick: () => this.setState({ liked: true }) }, "Like");
        }
      }
    </script>
    <script>
      // LikeButton 컴포넌트를 root 안에다 그림
      ReactDOM.render(React.createElement(LikeButton), document.querySelector("#root"));
    </script>
```

### 1-2) 가독성을 위한 JSX

```javascript
return React.createElement("button", { onClick: () => this.setState({ liked: true }) }, "Like");
```

```javascript
return <button onClick={() => this.setState({ liked: true })}>Like</button>;
```

babel 이라는 라이브러리가 아래의 Javascript 속의 HTML 문법을 `React.createElement` 로 변환해줌

다음과 같이 `type="text/babel"` 안에 있는 코드여야 함

```javascript
<script type="text/babel"></script>
```

### 1-3) React 18버전에서 가장 크게 달라진 점

React 17버전

```javascript
ReactDOM.render(React.createElement(LikeButton), document.querySelector("#root"));
```

React 18버전

```javascript
ReactDOM.createRoot(document.querySelector("#root").render(<LikeButton />));
```

-> 순서도 헷갈리지 않도록 바꾸어 주었음

### 1-4) 객체를 함부로 바꾸지 말고 복사본을 사용할 것

```javascript
return <button onClick={() => this.setState({ liked: true })}>Like</button>;
```

이렇게 직접 state를 바꾸면 안됨

```javascript
return <button onClick={() => { this.state.liked = true }}>Like `</button>`;
```

(배열, 함수도 객체임)

react에서는 `push`, `pop`, `shift`, `unshift`, `splice` 처럼 배열을 직접적으로 수정하는 함수는 사용하면 안됨

`concat`, `slice` 처럼 원본을 수정하지 않는 함수들을 사용해야 함

### 1-5) 함수 컴포넌트

위의 클래스 컴포넌트를 대신하여 이제 이렇게 함수 컴포넌트를 사용함

```javascript
    <script type="text/babel">
      "use strict";

      // 함수 컴포넌트 (함수형 컴포넌트 X)
      function LikeButton() {
        const [liked, setLiked] = React.useState(false);
        if (liked) {
          return "You liked this.";
        }

        return (
          <button
            onClick={() => {
              setLiked(true);
            }}
          >
            Like
          </button>
        );
      }
    </script>
```

### 1-6) 구구단 만들기

nothing special

### 1-7) 이벤트 함수

`button` 태그
form이 있는 경우 : onSubmit()
form이 없는 경우 : onClick()

### 1-8) prevState

이렇게 이전 state의 상태가 필요할 때에는 `prevState`를 인자로 받아오면 됨

```javascript
this.setState((prevState).value => {
  return {
    result: '정답: ' + prevState.value,
    first: ...
    second: ///
    value: '',
  }
})
```

`setState`는 비동기로 진행되는데
헷갈리니까 다음의 예시를 보자

```javascript
this.setState({
  value: this.state.value + 1,
});

this.setState({
  value: this.state.value + 1,
});

this.setState({
  value: this.state.value + 1,
});
```

새로운 value가 기존 value + 3이 될 것이라 예상되지만
value + 1이 되는 경우도 있음.

따라서 이렇게 하는 것이 가장 안전한 방법임.

```javascript
this.setState((prevState) => {
  value: this.state.value + 1,
});
```

### 1-9) input 박스에 focus 주기

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
```

이렇게 `input` 안에 ref 프로퍼티를 추가해주고

```javascript
onSubmit = (e) => {
  e.preventDefault(); // 새로고침 되지 않도록
  if (parseInt(this.state.value) === this.state.first * this.state.second) {
    this.setState((prevState) => {
      return {
        result: `정답: ${prevState.value}`,
        first: Math.ceil(Math.random() * 9),
        second: Math.ceil(Math.random() * 9),
        value: "",
      };
    });
    this.input.focus(); // <-
  } else {
    // first, second는 바뀌지 않음
    this.setState({
      result: "땡",
      value: "",
    });
  }
};
```

`onSubmit`에서 실행되도록 함
