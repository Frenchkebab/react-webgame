# 3. 숫자야구

## 3-1) import vs require

### require

`node` 의 모듈시스템
`export` 되는 것이 `object` or `array` 이면 `destructure` 가능함!

```javascript
// 여러 개 쓸 수 있음
export const hello = 'hello'; // import { hello }
export const bye = 'hello'; // import { hello, bye }

export default NumberBaseball; // import NumberBaseball;
```

따라서

```javascript
import React, { Component } from 'react';
```

의 경우, `React`는 **default**로, `Component`는 그냥 **export**로 되어있을 것!
(엄밀히 말할 경우에는 조금 다름)

여기까지는 ES2015 문법.

node 문법은

```javascript
exports.hellp = 'hello';
module.exports = NumberBaseball;
```

기본적으로 webpack은 node로 돌리기 때문에 `import`를 쓰면 에러가 남.
-> **`babel`**이 `import`를 `require`로 바꾸어 줌

## 3-2) react 반복문 (map)

## 3-3) react 반복문 (key)

`key`를 i로 놓으면 성능 최적화 이슈에 문제가 될 수 있다고 한다.
(단, 삭제X 배열의 경우 괜찮음)

## 3-4) 주석과 Method 바인딩

핸들러 함수들을 화살표 함수로 쓰지 않으면 constructor에 전부 해당 `class`를 `this`로 바인딩 해주어야 함

```javascript
constructor(props) {
  super(props);
  this.state = {
    result: '',
    value: '',
    answer: getNumbers(),
    tries: [],
  };
  this.onSubmitForm = this.onSubmitForm.bind(this);
  this.onChangeInput = this.onChangeInput.bind(this);
}
```

### 3-7) Tips

### `this.state.xxx` 안쓰기

```javascript
const { result, value } = this.state;
```

이렇게 각 **state**를 변수로 빼놓을 수도 있다.
**props**도 마찬가지임!

### 함수를 컴포넌트 밖으로 빼는 경우

별 상관 없음... 그냥 해당 컴포넌트 외에서도 사용하고 싶을 경우에 밖으로 빼놓으면 됨!

## 3-8 숫자야구 Hooks 전환

### setState에 함수를 넣을 때 (lazy init)

```javascript
const [answer, setAnswer] = useState(getNumbers);
```

이렇게 함수 자체를 넣어주면 리턴값이 들어가고, 그 다음부터는 실행되지 않음.
`useState(getNumbers())`될 경우 리렌더링이 될 때마다 쓸데없이 새로 실행된다
(그냥 값을 무시함)

이후에 `setAnswer`를 호출할 때에는 return 값을 넣어야 함!
(사실 함수 자체를 넣어도 동작은 된다... 하지만 이건 그냥 얻어걸린거임)

## 3-9) React Devtools

`props`를 쓰면서 렌더링이 자주 일어나서 성능이 안좋아지는 문제를 찾고 해결하는 방법

## 3-10) shouldComponentUpdate

### setState만 있으면 re-render

React는 멍청해서 다음과 같이 `setState`만 있으면 `state`가 바뀌지 않더라도 리렌더링이 일어난다.

```javascript
onClick = () => {
  this.setState({});
};
```

### shouldComponentUpdate

따라서 다음과 같이 어떤 부분을 다시 rendering할지 직접 적어주어야 한다.

```javascript
shouldComponentUpdate(nextProps, nextState, nextContext) {
  if(this.state.counter !== nextState.counter) {
    return true;
  }
  return false;
}
```

## 3-11) PureComponent & Memo - 억울한 자식 리렌더링 막기

### PureComponent를 사용하면 shouldComponentUpdate를 자동으로 해결해준다

```javascript
class Test extends PureComponent ...
```

다만

```javascript
setState({ a: 1 });
```

과 같은 경우 매번 새로 렌더링하므로 `state`에 `object` 구조는 가급적 쓰지 않는 것이 좋다!

가급적 배열 안에 객체 안에 배열 등 복잡한 자료구조는 사용하지 않는 것이 좋다!

### 자식이 re-rendering되는 경우

`state`, `props` 가 바뀌는 경우 외에도,
**부모 component\***가 re-rendering 되면 자식 component도 rerendering 된다

**input** 입력만 되었는데도 아래의 `Try` 까지 적용이 된다.

### functional component에서는 PureComponent 대신 memo를 사용

```javascript
import React, { memo } from 'react';

const Try = memo(({ tryInfo }) => {
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
});

Try.displayName = 'Try';
```

이렇게 작성하면 memo가 부모 component가 리렌더링 되었을 때, 자식 component가 리렌더링 되는 것을 막아준다!

memo를 쓸 경우 `displayName`도 설정을 해 주어야 component의 이름이 바뀌지 않는다!

---하지만 성능 문제가 없다면 굳이 쓰지 않아도 됨---

## 3-13) props와 state 연결하기

### render 안에 this.setstate를 넣는 경우

`setState`를 실행하면 다시 `render`가 실행되고, `render`가 실행되면 다시 `setState`가 실행되고 무한반복됨...

### props와 state 연결하기

부모가 물려준 `props`를 다시 state로 만들어준다.
부모의 `setState`를 사용해버리면, 뜻하지않게 자식이 바뀌었을 때 부모까지 바뀔 수 있다.

```javascript
const Try = memo(({ tryInfo }) => {
  const [result, setResult] = useState(tryInfo.result);

  const onclick = () => {
    setResult('1');
  };

  return (
    <li>
      <div>{tryInfo.try}</div>
      <div onClick={onClick}>{tryInfo.result}</div>
    </li>
  );
});
```
