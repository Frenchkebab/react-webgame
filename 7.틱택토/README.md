# 7. 틱택토

## 7-1 useReducer 소개

### useReducer란?

react에서의 redux 부분을 그대로 들여온 것.
redux의 기능을 react를 쓸 수 있다.
(하지만 규모가 커지면 비동기 부분 처리를 위해 결국에는 redux를 쓰기는 해야함...)

### 가능 한 쪼갤 수 있으면 최대한 쪼개자!

`Table`, `Tr`, `Td` 컴포넌트 각각을 최대한 나눌 수 있는 만큼 쪼개서 나누는 것이 좋다!

###

실제 `td` 태그와 `TicTacToe` 컴포넌트는 간격이 엄청 떨어져 있다
(`td` -> `Td` -> `Tr` -> `Table` -> `TicTacTo`)

그리고 전해주어야 할 것이 너무 많다 (**state**까지 모두 전달해 주어야 함)

### dispatch와 reducer

`state`가 있고 `event`들이 웹서비스에서 발생을 하게 되는데,
`state`를 수정하려면 `action`을 만들고 그 `action`을 `dispatch`해서 그것을
`reducer`로 관리를 함
(`state`를 어떻게 바꿀 지는 `reducer`에 기록을 함)

## 7-4. 틱택토 구현하기

### dispatch는 비동기

state가 동기적으로 바뀌는 redux와는 다르게 `useReducer`에서는 리액트의 state처럼 비동기적으로 바뀐다.
`changeTurn`에서 state를 O -> X로 바꾸었더라도 console을 찍으면 O로 나온다.

### 비동기 state를 처리할 때에는 useEffect를 처리하자!

## 7-4 틱택토 구현하기

### 정리

`state`가 너무 많아지면 복잡해지므로, 한방에 모아서 `state`를 모아서 처리함.
`setState`도 `dispatch`로 한방에 모아서 처리하기 위해 `useReducer`를 사용함. (이것은 redux에서 따온 개념)

앞으로는 `state`를 하나로 모아놓고, `action`(객체)을 통해서 `dispatch`하면 `reducer`에 정의된 대로
`state`를 변경시킴. (이 때 불변성이 중요!)

따라서 `state`가 많아지는 경우 `useReducer`를 항상 고려하도록 하자!
