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
