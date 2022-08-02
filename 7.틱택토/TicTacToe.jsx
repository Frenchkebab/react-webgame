import React, { useState } from 'react';
import Table from './Table';

const TicTacToe = () => {
  const [winner, setWinner] = useState('initialState');
  const [turn, setTurn] = useState('O');
  const [tableData, setTableData] = useState(['', '', ''], ['', '', ''], ['', '', '']);
  return (
    <>
      <Table />
      {winner && <div>{winner}님의 승리</div>}
    </>
  );
};

export default TicTacToe;
