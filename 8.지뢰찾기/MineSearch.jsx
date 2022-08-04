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
  halted: true,
  dispatch: () => {},
});

// 초기 state 모음
const initialState = {
  tableData: [],
  timer: 0,
  result: '',
  halted: false,
};

// action 이름 정의
export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';

// reducer 함수 (action에 따라 할 동작 정의)
const reducer = (state, action) => {
  switch (action.type) {
    // 게임 시작
    case START_GAME:
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine),
        halted: false, // 게임 시작하면 다시 halted를 false로 변경
      };

    // 일반 칸 클릭
    case OPEN_CELL:
      const tableData = [...state.tableData]; // tableData 얕은 복사
      tableData[action.row] = [...state.tableData[action.row]]; // 클릭한 줄을 다시 얕은 복사 (윗줄에서는 참조 상태)
      tableData[action.row][action.cell] = CODE.OPENED; // 클릭한 셀을 OPENED로 변경 -> 이 action을 Td에서 dispatch

      // 상하좌우대각선 8칸 검사

      let around = [];

      // 윗줄이 있는 경우
      if (tableData[action.row - 1]) {
        around = around.concat(
          tableData[action.row - 1][action.cell - 1],
          tableData[action.row - 1][action.cell],
          tableData[action.row - 1][action.cell + 1]
        );
      }

      // 좌우는 검사할 필요 없음 (어차피 action.row는 존재하므로 undefined)
      around = around.concat(tableData[action.row][action.cell - 1], tableData[action.row][action.cell + 1]);

      // 아랫줄이 있는 경우
      if (tableData[action.row + 1]) {
        around = around.concat(
          tableData[action.row + 1][action.cell - 1],
          tableData[action.row + 1][action.cell],
          tableData[action.row + 1][action.cell + 1]
        );
      }

      const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
      console.log(count);
      tableData[action.row][action.cell] = count; // 해당 개수를 칸에 넣어줌

      // tableData를 변경함
      return {
        ...state,
        tableData,
      };

    // 지뢰 클릭
    case CLICK_MINE: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE;

      return {
        ...state,
        tableData,
        halted: true, // 지뢰를 클릭했으므로 게임을 멈춤
      };
    }

    // 일반칸/지뢰칸 우클릭 (깃발)
    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];

      // 깃발을 꽂을 칸이 지뢰가 있는 칸인 경우
      if (tableData[action.row][action.cell] === CODE.MINE) {
        tableData[action.row][action.cell] = CODE.FLAG_MINE;

        // 깃발을 꽂을 칸이 일반 칸인 경우
      } else {
        tableData[action.row][action.cell] = CODE.FLAG;
      }

      return {
        ...state,
        tableData,
      };
    }

    // 깃발칸 우클릭
    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];

      // 지뢰가 있는 깃발 칸을 우클릭한 경우
      if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;

        // 지뢰가 없는 깃발 칸을 우클릭한 경우
      } else {
        tableData[action.row][action.cell] = CODE.QUESTION;
      }

      return {
        ...state,
        tableData,
      };
    }

    // 물음표칸 우클릭
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];

      // 지뢰 칸에 물음표를 친 경우
      if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
        tableData[action.row][action.cell] = CODE.MINE;

        // 일반 칸에 물음표를 친 경우
      } else {
        tableData[action.row][action.cell] = CODE.NORMAL;
      }

      return {
        ...state,
        tableData,
      };
    }

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
  const { tableData, halted, timer, result } = state;

  // ContextAPI 성능을 위해 props값을 memo에 넣어줌 (tableData, dispatch를 하위 컴포넌트에 전달)
  // tableData의 값이 바뀌면 자동으로 props의 값을 update해줌
  const value = useMemo(() => ({ tableData: tableData, halted: halted, dispatch }), [tableData, halted]);

  return (
    <>
      {/* value의 값이 바뀌면 자동으로 하위 컴포넌트 리렌더링 */}
      <TableContext.Provider value={value}>
        <Form />
        <div>{timer}</div>
        <Table />
        <div>{result}</div>
      </TableContext.Provider>
    </>
  );
};

export default MineSearch;
