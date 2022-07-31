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
