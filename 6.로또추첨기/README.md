## 6. 로또 추첨기

### 6-4) useEffect로 업데이트 감지하기

```javascript
useEffect(() => {}, []);
```

input 배열이 비어있으면 `componentDidMount`와 동일하게 작동하고,
input 배열에 요소가 있으면 `componentDidMount`와 `componentDidUpdate` 모두 수행

`return`은 `componentWillUnmount`의 기능을 수행함

`[ winBalls.length === 0 ]` 과 같이 조건을 넣어서 **class**에서의 `if문`을 대체할 수도 있음

하지만 지금의 경우 처음 실행될 때 해당 배열이 비어있기 떄문에 `uesEffect`가 두 번 실행됨

따라서 `[timeouts.current]`를 넣어주면 됨.
(배열에 추가를 해주는 것은 바뀌는 것이 아님)
