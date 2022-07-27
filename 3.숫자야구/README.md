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
