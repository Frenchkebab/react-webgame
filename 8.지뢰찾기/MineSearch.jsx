import React, { useReducer, createContext, useMemo } from 'react';
import Table from './Table';
import Form from './Form';

// 칸의 상태
export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4, // 지뢰에 물음표 한 경우
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0, // 0 이상인 경우 다 opened (눌러서 숫자 뜨는 경우)
};

// Context
export const TableContext = createContext({
  tableData: [[], [], [], [], []],
  dispatch: () => {},
});

// 초기 state 모음
const initialState = {
  tableData: [],
  timer: 0,
  result: '',
};

// action 이름 정의
export const START_GAME = 'START_GAME';

// reducer 함수 (action에 따라 할 동작 정의)
const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine),
      };

    default:
      return state;
  }
};

const plantMine = (row, cell, mine) => {
  console.log(row, cell, mine);

  // 전체 칸 (0~99)
  const candidate = Array(row * cell)
    .fill()
    .map((arr, i) => {
      return i;
    });

  // 0~99를 뒤섞음 (shuffle에는 몇 번째 칸에 지뢰가기ㅐ 들어있는지가 뽑펴힜음)
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }

  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL); // 일반적인 칸으로 초기화해줌
    }
  }

  // 좌표에 맞게 shuffle의 지뢰 칸들을 뿌려주기
  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }
  console.log(data);
  return data;
};

// component
const MineSearch = () => {
  // state 대신 reducer를 사용
  const [state, dispatch] = useReducer(reducer, initialState);

  // ContextAPI 성능을 위해
  const value = useMemo(() => ({ tableData: state.tableData, dispatch }), [state.tableData]);

  return (
    <>
      <TableContext.Provider value={value}>
        <Form />
        <div>{state.timer}</div>
        <Table />
        <div>{state.result}</div>
      </TableContext.Provider>
    </>
  );
};

export default MineSearch;
