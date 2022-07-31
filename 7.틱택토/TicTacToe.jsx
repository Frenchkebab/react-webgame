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

const SET_WINNER = 'SET_WINNER';

// useReducer 안에서 state를 어떻게 바꾸어 줄지를 적어줌
// action이 실행될 때마다 reducer가 실행됨
const reducer = (state, action) => {
  switch (action.type) {
    // state.winner = action.winner; 이렇게 하면 안됨!
    case 'SET_WINNER':
      return { ...state, winner: action.winner }; // 바뀌는 부분만 바꿈
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
      <Table onClick={onClickTable} tableData={state.tableData} />
      {state.winner && <div>{state.winner}님의 승리</div>}
    </>
  );
};

export default TicTacToe;
