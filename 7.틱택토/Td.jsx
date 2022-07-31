import React, { useCallback } from 'react';
import { CLICK_CELL, CHANGE_TURN } from './TicTacToe';

const Td = ({ rowIndex, cellIndex, cellData, dispatch }) => {
  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex }); // action은 마음대로 만들고, reducer에서 잘 처리하기만 하면 됨
    dispatch({ type: CHANGE_TURN });
  }, []);
  return <td onClick={onClickTd}>{cellData}</td>;
};

export default Td;
