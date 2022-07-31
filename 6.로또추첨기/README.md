# 6. 로또 추첨기

## 6-4) useEffect로 업데이트 감지하기

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

## 6-5 useMemo와 useCallback

### useMemo와 useRef의 차이

`useMemo`: 복잡한 함수의 결과값을 기억
`useRef`: 일반 값을 기억

`getNumbers()` 함수가 여러 번 호출되는 것을 막기 위해

```javascript
const lottoNumbers = useMemo(() => getWinNumbers(), []);
const [winNumbers, setWinNumbers] = useState(lottoNumbers);
```

초기에 `useMemo`를 이용하여 결과값을 뽑아서 기억해준다.
(매 번 함수가 재실행 되는 것을 막기 위해)

함수에 항상 `console.log`를 박아놓고 정말 필요할 때에만 실행되는 것이 맞는지를 확인할 것!

### useCallback

`useMemo`는 함수의 **리턴값**을 기억하고, `useCallback`은 **함수 자체**를 기억하도록 하여,
함수 자체가 다시 생성되는 것을 막는다.

```javascript
const onClickRedo = useCallback(() => {
  console.log('onClickRedo');
  console.log(winNumbers);
  setWinNumbers(getWinNumbers());
  setWinBalls([]);
  setBonus(null);
  setRedo(false);
  timeouts.current = [];
}, []);
```

근데 기억을 너무 잘해서 redo를 해도 똑같은 배열을 기억하고 있다...
따라서 항상 배열에 **state**를 넣어주어야 한다.

```javascript
const onClickRedo = useCallback(() => {
  console.log('onClickRedo');
  console.log(winNumbers);
  setWinNumbers(getWinNumbers());
  setWinBalls([]);
  setBonus(null);
  setRedo(false);
  timeouts.current = [];
}, [winNumbers]);
```

`useEffect`와 마찬가지로 두번 째 배열의 요소들이 바뀌면 재실행되도록 해준다.

### 자식 컴포넌트에게 함수를 넘길 때

자식에게 `props`로 함수를 넘길 때, `useCallback`으로 넘기지 않으면 새로운 함수를 넘기게 되어 매 번 새로 렌더링을 하게 된다.
(자식이 매번 새로 함수가 생성되어 다른 함수로 인식되어 새로 렌더링이 됨)

## 6-6 Hooks에 대한 팁들

### Hooks 시리즈는 순서가 중요해서 중간에 바뀌면 안된다

```javascript
const [bonus, setBonus] = useState([]);
if (조건) {
  const [redo, setRedo] = useState(false);
}
const timeouts = useRef([]);
```

이렇게 **조건**에 따라 Hooks를 선언하면 안된다.
1 -> 2 -> 3 순서에서 1 -> 2 순서가 되어버리면 혼동이 될 수 있다.

따라서 무조건 최상위에 빼놓고, **조건문**, **반복문** 등에 넣지 않도록 주의하자!

### useRef, useMemo, useCallback

`useRef`: 값을 기억
`useMemo`: 복잡한 함수의 리턴값을 기억
`useCallback`: 함수 자체를 기억

### useEffect

`componentDidMount`에 쓰일 것들 안에 넣어주고,
`componentDidUpdate`에 쓰일 것들은 배열에 넣어주면 됨.

서로 다른 `state`에 대해서 실행을 하고자 하면, `useEffect`를 **여러번** 쓰면 됨!

### useEffect가 componentDidMount 없이 update에서만 쓰고 싶은 경우

다음의 패턴을 그냥 외워두자!

```javascript
// componentDidMount, componentDidUpdate 둘 다
useEffect(() => {
  // ajax
}, []);
```

아래의 패턴을 **암기**할 것!

```javascript
const mounted = useRef(false);
useEffect(() => {
  // componentDidMount 없이 componentDidUpdate만 하는 경우
  if(!mounted.current) {
    mounted.current = true;
  } else {
    // ajax
  }
}, [바뀌는 값])
```
