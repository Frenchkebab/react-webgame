import React, { useEffect, useReducer, createContext, useMemo, memo } from 'react';
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

// action 이름 정의
export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

// reducer 함수 (action에 따라 할 동작 정의)
const reducer = (state, action) => {
  switch (action.type) {
    // 게임 시작
    case START_GAME:
      return {
        ...state,
        data: {
          row: action.row,
          cell: action.cell,
          mine: action.mine,
        }, // 스타트 시 가로, 세로, 지뢰수 기록
        openedCount: 0, // 게임 시작 시 초기화
        tableData: plantMine(action.row, action.cell, action.mine),
        halted: false, // 게임 시작하면 다시 halted를 false로 변경
        timer: 0,
      };

    // 일반 칸 클릭
    case OPEN_CELL:
      const tableData = [...state.tableData]; // tableData 얕은 복사
      tableData[action.row] = [...state.tableData[action.row]]; // 클릭한 줄을 다시 얕은 복사 (윗줄에서는 참조 상태)

      // 모든 칸을 객체로 만들어줌
      tableData.forEach((row, i) => {
        tableData[i] = [...row];
      });

      // 한 번 검사한 칸은 다시 checkAround를 돌리지 않도록
      const checked = [];

      // 오픈된 칸 수
      let openedCount = 0;

      // 상하좌우대각선 8칸 검사
      const checkAround = (row, cell) => {
        // 클릭한 셀이 [열린 칸, 지뢰 칸, '!', '?'] 중 하나이면 넘어감

        if (row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) {
          return;
        }

        // 상하좌우 없는칸은 안 열기
        if (
          [CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])
        ) {
          return;
        }

        // 이미 검사한 칸이면 무시하기
        if (checked.includes(row + ',' + cell)) {
          return;
        } else {
          checked.push(row + ',' + cell);
        }

        // 상하좌우가 범위를 벗어나면 넘어감
        if (row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) {
          return;
        }

        // 선택 칸의 주변 8칸 배열기
        let around = [];

        // 윗줄이 있는 경우
        if (tableData[row - 1]) {
          around = around.concat(tableData[row - 1][cell - 1], tableData[row - 1][cell], tableData[row - 1][cell + 1]);
        }

        // 좌우는 검사할 필요 없음 (어차피 row는 존재하므로 undefined)
        around = around.concat(tableData[row][cell - 1], tableData[row][cell + 1]);

        // 아랫줄이 있는 경우
        if (tableData[row + 1]) {
          around = around.concat(tableData[row + 1][cell - 1], tableData[row + 1][cell], tableData[row + 1][cell + 1]);
        }

        // filter에서 'X' or '!' or '?' 중 하나가 있는 셀만 걸러냄 (여기서 좌/우에 칸이 없을 경우 undefined라서 걸러짐)
        const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;

        // 클릭한 칸이 빈칸이면 재귀로 주변 빈칸까지 다 비워줌
        if (count === 0) {
          const near = [];
          // 주변 8칸을 모두 검사

          // 제일 윗 줄을 클릭했는지 검사
          if (row - 1 > -1) {
            near.push([row - 1, cell - 1]);
            near.push([row - 1, cell]);
            near.push([row - 1, cell + 1]);
          }

          near.push([row, cell - 1]);
          near.push([row, cell + 1]);

          // 제일 아랫 줄을 클릭했는지 검사
          if (row + 1 < tableData.length) {
            near.push([row + 1, cell - 1]);
            near.push([row + 1, cell]);
            near.push([row + 1, cell + 1]);
          }

          near.forEach((el) => {
            // 이미 연 칸이 아니면 검사
            if (tableData[el[0]][el[1]] !== CODE.OPENED) {
              checkAround(el[0], el[1]);
            }
          });
        }

        // 해당 칸이 닫혀있는 칸일 경우에만
        if (tableData[row][cell] === CODE.NORMAL) {
          // 체크한 칸 카운트
          openedCount++;
        }
        tableData[row][cell] = count;
      };

      // 주변 8칸 검사
      checkAround(action.row, action.cell);

      // return에서 반환
      let halted = false;
      let result = '';

      console.log(state.data.row * state.data.cell - state.data.mine, state.openedCount, openedCount);

      // 승리 조건
      if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) {
        halted = true;
        result = `${state.timer}초 만에 승리하셨습니다`;
      }

      // tableData를 변경함
      return {
        ...state,
        tableData,
        openedCount: state.openedCount + openedCount,
        halted,
        result,
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

    case INCREMENT_TIMER: {
      return {
        ...state,
        timer: state.timer + 1,
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
const MineSearch = memo(() => {
  // state 대신 reducer를 사용
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, halted, timer, result } = state;

  // ContextAPI 성능을 위해 props값을 memo에 넣어줌 (tableData, dispatch를 하위 컴포넌트에 전달)
  // tableData의 값이 바뀌면 자동으로 props의 값을 update해줌
  const value = useMemo(() => ({ tableData: tableData, halted: halted, dispatch }), [tableData, halted]);

  useEffect(() => {
    let timer;
    if (halted === false) {
      timer = setInterval(() => {
        dispatch({ type: INCREMENT_TIMER });
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [halted]);

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
});

export default MineSearch;
