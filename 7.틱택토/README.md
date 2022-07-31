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

## 7-5 렌더링 최적화 방법

### useEffect와 useRef로 어느 부분이 바뀌는지를 테스트하기

```javascript
const ref = useRef([]);
useEffect(() => {
  console.log(
    rowIndex === ref.current[0],
    cellIndex === ref.current[1],
    dispatch === ref.current[2],
    cellData === ref.current[3]
  );
  console.log(celldata, ref.current[3]);
  ref.current = [rowIndex, cellIndex, dispatch, cellData];
}, [rowIndex, cellIndex, dispatch, cellData]);
```

이렇게 모든 props를 넣어서 바뀌는 부분이 있는지를 검사해 본다.

여기서는 `true ture ture false`가 나오므로,
`cellData`만 바뀌는 것을 알 수 있다. (정상적으로 cellData만 우리가 원하는 대로 바뀌므로 문제가 없는 것을 알 수 있음)

근데 전체가 리렌더링되므로 부모인 `Tr` 컴포넌트에서 강제로 자식까지 렌더링을 하는 것 같다.

(결국 못찾음)

td -> tr -> table 순으로 전부 하나씩 memo를 적용하도록 한다
(memo, useMemo 차이점 찾아보기)

### memo를 해도 자꾸 렌더링이 되는 것 같을 때

**최후의 수단**으로 `useMemo`를 사용하여 컴포넌트 전체를 기억해버린다.
