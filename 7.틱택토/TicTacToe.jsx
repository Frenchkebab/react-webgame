import React, { useState, useCallback, useReducer } from 'react';
import Table from './Table';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';

// useReducer 안에서 state를 어떻게 바꾸어 줄지를 적어줌
// action이 실행될 때마다 reducer가 실행됨
const reducer = (state, action) => {
  switch (action.type) {
    // state.winner = action.winner; 이렇게 하면 안됨!
    case 'SET_WINNER':
      return { ...state, winner: action.winner }; // 바뀌는 부분만 바꿈

    case 'CLICK_CELL': {
      const tableData = [...state.tableData]; // 기존의 테이블 데이터를 얕은 복사
      tableData[action.row] = [...tableData[action.row]]; // 나중에 immer라는 라이브러리로 가독성을 해결함
      tableData[action.row][action.cell] = state.turn;
      // 원하는 부분만 불변성을 지키면서 state를 수정함
      return {
        ...state,
        tableData,
      };
    }

    case 'CHANGE_TURN': {
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      };
    }
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] = useState('O');
  // const [tableData, setTableData] = useState(['', '', ''], ['', '', ''], ['', '', '']);

  const onClickTable = useCallback(() => {
    dispatch({ type: SET_WINNER, winner: 'O' }); // 안의 object가 action
  }, []);

  return (
    <>
      <Table onClick={onClickTable} tableData={state.tableData} dispatch={dispatch} />
      {state.winner && <div>{state.winner}님의 승리</div>}
    </>
  );
};

export default TicTacToe;
