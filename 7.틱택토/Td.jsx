import React, { useCallback, useEffect, useRef, memo } from 'react';
import { CLICK_CELL } from './TicTacToe';

const Td = memo(({ rowIndex, cellIndex, cellData, dispatch }) => {
  console.log('td rendered');

  const ref = useRef([]);
  useEffect(() => {
    console.log(
      rowIndex === ref.current[0],
      cellIndex === ref.current[1],
      dispatch === ref.current[2],
      cellData === ref.current[3]
    );
    ref.current = [rowIndex, cellIndex, dispatch, cellData];
  }, [rowIndex, cellIndex, dispatch, cellData]);

  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);
    // 한 번 클릭한 cell은 바뀌지 않음
    if (cellData) {
      return;
    }
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex }); // action은 마음대로 만들고, reducer에서 잘 처리하기만 하면 됨
  }, [cellData]); // 바뀔 여지가 있는 애들은 이렇게 배열 안에 넣어둠
  return <td onClick={onClickTd}>{cellData}</td>;
});

export default Td;
