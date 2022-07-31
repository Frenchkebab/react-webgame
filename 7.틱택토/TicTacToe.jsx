import React, { useState, useReducer } from 'react';
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

// useReducer 안에서 state를 어떻게 바꾸어 줄지를 적어줌
const reducer = (state, action) => {};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] = useState('0');
  // const [tableData, setTableData] = useState(['', '', ''], ['', '', ''], ['', '', '']);
  return (
    <>
      <Table />
      {winner && <div>{winner}님의 승리</div>}
    </>
  );
};

export default TicTacToe;
