import React, { useState, useEffect, useCallback, useReducer } from 'react';
import Table from './Table';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  recentCell: [-1, -1], // 없는 칸으로 만들어 놓음
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

// useReducer 안에서 state를 어떻게 바꾸어 줄지를 적어줌
// action이 실행될 때마다 reducer가 실행됨
const reducer = (state, action) => {
  switch (action.type) {
    // state.winner = action.winner; 이렇게 하면 안됨!
    case SET_WINNER:
      return { ...state, winner: action.winner }; // 바뀌는 부분만 바꿈

    case CLICK_CELL: {
      const tableData = [...state.tableData]; // 기존의 테이블 데이터를 얕은 복사
      tableData[action.row] = [...tableData[action.row]]; // 나중에 immer라는 라이브러리로 가독성을 해결함
      tableData[action.row][action.cell] = state.turn;
      // 원하는 부분만 불변성을 지키면서 state를 수정함
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell],
      };
    }

    case CHANGE_TURN: {
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      };
    }

    case RESET_GAME: {
      return {
        ...state,
        turn: 'O',
        tableData: [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        recentCell: [-1, -1],
      };
    }

    default:
      return state;
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell } = state;

  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] = useState('O');
  // const [tableData, setTableData] = useState(['', '', ''], ['', '', ''], ['', '', '']);

  const onClickTable = useCallback(() => {
    dispatch({ type: SET_WINNER, winner: 'O' }); // 안의 object가 action
  }, []);

  useEffect(() => {
    const [row, cell] = recentCell;
    if (row < 0) {
      return;
    }
    let win = false;
    // 가로줄 검사
    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true;
    }
    // 세로줄 검사
    if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
      win = true;
    }
    // 대각선 검사1
    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win = true;
    }
    // 대각선 검사2
    if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      win = true;
    }
    console.log(row, cell, win, tableData);
    if (win) {
      // 승리 시
      dispatch({ type: SET_WINNER, winner: turn });
      dispatch({ type: RESET_GAME });
    } else {
      // 무승부 검사
      let all = true; // true일 경우 무승부
      tableData.forEach((row) => {
        row.forEach((cell) => {
          if (!cell) {
            all = false;
          }
        });
      });
      if (all) {
        dispaych({ type: RESET_GAME });
      } else {
        dispatch({ type: CHANGE_TURN });
      }
    }
  }, [recentCell]);

  return (
    <>
      <Table onClick={onClickTable} tableData={state.tableData} dispatch={dispatch} />
      {state.winner && <div>{state.winner}님의 승리</div>}
    </>
  );
};

export default TicTacToe;
