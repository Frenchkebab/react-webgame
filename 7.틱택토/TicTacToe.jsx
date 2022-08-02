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

const reducer = (state, action) => {};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialstate);

  // const [winner, setWinner] = useState('initialState');
  // const [turn, setTurn] = useState('O');
  // const [tableData, setTableData] = useState(['', '', ''], ['', '', ''], ['', '', '']);
  return (
    <>
      <Table />
      {winner && <div>{winner}님의 승리</div>}
    </>
  );
};

export default TicTacToe;
