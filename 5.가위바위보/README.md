# 5. 가위바위보

## 5-1) 리액트 라이프사이클 소개

### 라이프사이클

**Component**가 불려와서 render되면 DOM에 붙는 순간에 특정한 동작을 하게됨

`shouldComponentUpdate`처럼 `componentDidMount()`가 실행됨.
하지만 `setState`에 의해서 리렌더링 될 때에는 실행되지 않음.

```javascript
componentDidMount() { // 컴포넌트가 제거되기 직전 -> 보통 비동기 요청을 많이함
  // 따로 없애지 않으면 계속 돌아감
  setInterval(() => {
    console.log('asdf')
  }, 1000);
}

componentDidUpdate() { // 리렌더링 후 (state, props 변경 등)

}

componentWillUnmount() { // 컴포넌트가 제거되기 직전 (부모에 의해 없어지는 등) -> 보통 비동기 요청 정리
  clearInterval(this.interval);
}
```

`render()` 안에 `setState()`를 사용하면 무한 리렌더링이 되므로, `render` 밖에다가 `componentDidMount`를 쓸 수 있음.

### class의 라이프사이클

constructor(state 설정 포함) -> 첫 렌더링 -> ref -> `componentDidMount`
-> (setState/props변경) -> `shouldComponentUpdate(true)` -> render -> `componentDidUpdate`
-> 부모가 자식 컴포넌트를 제거 -> `componentWillUnount` -> 소멸

### componentDidMount

보통 **비동기** 요청을 많이함
