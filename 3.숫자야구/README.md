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
