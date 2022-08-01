# 이전에 배운 것

Redux에서 차용한 useReducer를 배웠음.
`state`가 여러 개일 때, 하나로 묶어주고 `action`을 `dispatch`해서 `state`를 바꾸어줌.

**Redux**는 동기적으로 작동하는 반면, `useReducer`는 `state`가 비동기적으로 바뀌어서 그 부분을 조심했어야 함.

틱택토에서 불편했던 점을 해결하기 위해 `contextAPI`를 사용함!

# 9. 지뢰찾기

### contextAPI 만드는 법

일단

```javascript
import { createContext } from 'react';

export const TableContext = createContext({});
```

와 같이 **context**를 생성해준다.

그리고 data에 접근하고자 하는 component들을 Provider들로 묶어준다.
provider 안에는 전달하고자 하는 값들을 넣어준다.

```javascript
return (
  <TableContext.Provider value={{ tableData: state.tableData, dispatch }}>
    <Form />
    <div>{state.timer}</div>
    <Table />
    <div>{state.result}</div>
  </TableContext.Provider>
);
```

그리고 이 값을 사용하는 컴포넌트에서

```javascript
import { useContext } from 'react';
import { TableContext } from './MineSearch';

const { dispatch } = useContext(TableContext);
```

이렇게 해당 `context`를 가져온다.

### contextAPI는 성능 이슈가 심하다

```javascript
return (
  <TableContext.Provider value={value}>
    <Form />
    <div>{state.timer}</div>
    <Table />
    <div>{state.result}</div>
  </TableContext.Provider>
);
```

이렇게 위에서처럼 **Provider**에 객체로 값을 다 넘겨버리면 렌더링이 될 때마다 `value`안의 객체가 새로 생겨버리기 때문에
캐싱을 해주는 것이 좋다

```javascript
const value = useMemo(() => {
  tableData: state.tableData, dispatch;
}, [state.tableData]); // dispatch는 항상 같게 유지되기 때문에 넣지 않아도 된다
```
