import React, { useCallback } from 'react';
import { CLICK_CELL } from './TicTacToe';

const Td = ({ rowIndex, cellIndex, dispatch, cellData }) => {
  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);

    // 클릭을 한 경우
    if (cellData) {
      return;
    }

    // 액션은 그냥 마음대로 만들고 reducer에서 잘 처리만 하면 됨
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
    // dispatch({ type: CHANGE_TURN }); // 비동기 문제 발생
  }, [cellData]);

  return <td onClick={onClickTd}>{cellData}</td>;
};

export default Td;
