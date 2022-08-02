import React, { useReducer, createContext, useMemo } from 'react';
import Table from './Table';
import Form from './Form';

// 헷갈리지 않기 위해 적어둠
export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0, // 0 이상이면 다 opened
};

export const TableContext = createContext({
  tableData: [],
  halted: true,
  dispatch: () => {},
});

const initialState = {
  tableData: [],
  data: {
    row: 0,
    cell: 0,
    mine: 0,
  },
  timer: 0,
  result: '',
  halted: true,
  openedCount: 0,
};

// 지뢰를 심어줌
const plantMine = (row, cell, mine) => {
  console.log(row, cell, mine);
  const candidate = Array(row * cell)
    .fill()
    .map((arr, i) => {
      return i;
    });
  const shuffle = [];
  // 0 ~ 99 지뢰 개수만큼을 뽑아놓음
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }
  const data = [];
  // row * cell 배열에 넣어줌
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }

  console.log(data);
  return data;
};

// actions
export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        // 게임 스타트 시 초기 세팅에 대한 데이터를 넣어둠
        data: {
          row: action.row,
          cell: action.cell,
          mine: action.mine,
        },
        tableData: plantMine(action.row, action.cell, action.mine),
        halted: false,
      };

    case OPEN_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      // 원래는 클릭한 칸만 불변성을 유지했지만, 어떤 칸이 열릴지 모르므로 모든 칸을 새로운 객체로 만들어줌
      tableData.forEach((row, i) => {
        tableData[i] = [...state.tableData[i]];
      });

      // 한 번 검사한 칸은 다시 재귀에서 검사하지 않도록
      const checked = [];

      // 칸 개수를 세서 다열면 게임 종료
      let count = 0;

      // 주변 칸들을 검사하는 함수
      const checkAround = (row, cell) => {
        if (
          [CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])
        ) {
          // 이미 열려있거나 지뢰가 있는 칸들은 막아줌
          return;
        }

        if (row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) {
          // 상하좌우 칸이 범위를 벗어나는 경우
          return;
        }

        if (checked.includes(row + '/' + cell)) {
          // 이미 검사한 칸이면
          return;
        } else {
          // 검사하지 않은 칸이면
          checked.push(row + '/' + cell);
        }
        count++;

        let around = [tableData[row][cell - 1], tableData[row][cell + 1]];
        if (tableData[row - 1]) {
          around = around.concat([
            tableData[row - 1][cell - 1],
            tableData[row - 1][cell],
            tableData[row - 1][cell + 1],
          ]);
        }
        if (tableData[row + 1]) {
          around = around.concat([
            tableData[row + 1][cell - 1],
            tableData[row + 1][cell],
            tableData[row + 1][cell + 1],
          ]);
        }

        const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
        console.log(around, count);
        tableData[row][cell] = count;

        if (count === 0) {
          // 내가 빈칸일 경우 주변 애들을 검사
          const near = [];

          // 맨 윗칸을 클릭했을 경우 그 윗칸은 없음
          if (row - 1 > -1) {
            near.push([row - 1, cell - 1]);
            near.push([row - 1, cell]);
            near.push([row - 1, cell + 1]);
          }
          near.push([row, cell - 1]);
          near.push([row, cell + 1]);

          // 맨 아랫칸을 클릭했을 경우 그 아래칸은 없음
          if (row + 1 > tableData.length) {
            near.push([row + 1, cell - 1]);
            near.push([row + 1, cell]);
            near.push([row + 1, cell + 1]);
          }

          // 주변 칸들을 클릭
          // 좌 or 우 칸이 없을 경우 undefined가 되어 사라져버림
          /* 
            arr[0][-1] 의 경우 그냥 undefined가 반환되지만,
            arr[-1][0] 의 경우 undefined의 속성에 접근하므로 에러가 나오게 됨
          */
          near.forEach((n) => {
            if (tableData[n[0]][n[1]] !== CODE.OPENED) {
              // 이미 열은 칸이 아니면
              checkAround(n[0], n[1]);
            }
          });
        } else {
        }
      };

      // 해당 칸 기준으로 검사
      checkAround(action.row, action.cell);

      return {
        ...state,
        tableData,
        openedCount: state.openedCount + count,
      };
    }

    case CLICK_MINE: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE;
      return {
        ...state,
        tableData,
        halted: true,
      };
    }

    // 겉보기에는 똑같음
    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.MINE) {
        // 지뢰가 있는 칸인 경우
        tableData[action.row][action.cell] = CODE.FLAG_MINE;
      } else {
        // 지뢰가 없는 칸인 경우
        tableData[action.row][action.cell] = CODE.FLAG;
      }
      return {
        ...state,
        tableData,
      };
    }

    // 깃발이 있는 상태에서 물음표로 만들기 - 겉보기에는 똑같음
    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;
      } else {
        tableData[action.row][action.cell] = CODE.QUESTION;
      }
      return {
        ...state,
        tableData,
      };
    }

    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
        tableData[action.row][action.cell] = CODE.MINE;
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

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, halted, timer, result } = state;

  const value = useMemo(
    () => ({
      tableData: tableData,
      halted: halted,
      dispatch,
    }),
    [tableData, halted]
  ); // dispatch는 항상 같게 유지되기 때문에 넣지 않아도 된다

  return (
    <TableContext.Provider value={value}>
      <Form />
      <div>{timer}</div>
      <Table />
      <div>{result}</div>
    </TableContext.Provider>
  );
};

export default MineSearch;
