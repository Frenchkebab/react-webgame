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

## 5-4) 고차 함수

### React에서 자주 쓰이는 고차함수 패턴

`onClick`함수에는 `event`가 인자로 전달되므로 이렇게 작성을 하거나

```javascript
<button id="rock" className="btn" onClick={() => this.onClickBtn('바위')}>
```

```javascript
onClickBtn = (choice) => {
  ...
};
```

아예 이렇게 함수만 넣어주고 이런 패턴으로 많이 사용을 하게된다.

```javascript
<button id="rock" className="btn" onClick={this.onClickBtn('바위')}>
```

```javascript
onClickBtn = (choice) => (e) => {
 ...
};
```

## 5-5) Hooks로 바꾸기

### componentDidMount와 componentWillUnmount 대체하기

**Hooks**에서는 `useEffect`를 사용하여 대체한다!

```javascript
// componentDidMount, componentDidUpdate, componentWillUnmount 역할 (1:1 대응은 아님)
useEffect(() => {
  // componentDidMount 역할
  interval.current = setInterval(changeHand, 100);

  // componentWillUnmount 역할
  return () => {
    clearInterval(interval.current);
  };
}, [imgCoord]);
```

useEffect를 여러번 쓰는 경우도 있음

```javascript
// componentDidMount, componentDidUpdate, componentWillUnmount 역할 (1:1 대응은 아님)
useEffect(() => {
  // componentDidMount 역할
  interval.current = setInterval(changeHand, 100);

  // componentWillUnmount 역할
  return () => {
    clearInterval(interval.current);
  };
}, [score]);
```

와 같이..

## 5-6) class와 hooks의 lifecycle 비교

### useEffect 조금 더 쉽게 이해하기

```javascript
//                         result   imgCoord    score
// componentDidMount
// componentDidUpdate
// componentWillUnmount
```

**class** 에서는 가로로(componentDidMount, componentDidUpdate, componentWillUnmount가 result, imgCoord, score 모두 처리),
**hookss**에서는 세로로 돌아간다고 생각하면 됨 (result, imgCoord, score 각각이 componentDidMount, componentDidUpdate, componentWillUnmount모두를 사용함)
