import React, { useCallback } from 'react';
import { CLICK_CELL } from './TicTacToe';

const Td = ({ rowIndex, cellIndex, cellData, dispatch }) => {
  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);
    // 한 번 클릭한 cell은 바뀌지 않음
    if (cellData) {
      return;
    }
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex }); // action은 마음대로 만들고, reducer에서 잘 처리하기만 하면 됨
  }, [cellData]);
  return <td onClick={onClickTd}>{cellData}</td>;
};

export default Td;
