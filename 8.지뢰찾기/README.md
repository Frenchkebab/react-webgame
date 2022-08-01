# 이전에 배운 것

Redux에서 차용한 useReducer를 배웠음.
`state`가 여러 개일 때, 하나로 묶어주고 `action`을 `dispatch`해서 `state`를 바꾸어줌.

**Redux**는 동기적으로 작동하는 반면, `useReducer`는 `state`가 비동기적으로 바뀌어서 그 부분을 조심했어야 함.

틱택토에서 불편했던 점을 해결하기 위해 `contextAPI`를 사용함!
