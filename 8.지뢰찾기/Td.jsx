import React, { useContext, useCallback } from 'react';
import { CODE, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL, TableContext } from './MineSearch';

const getTdStyle = (code) => {
  switch (code) {
    // 기본적인 경우 회색
    case CODE.NORMAL:
    case CODE.MINE:
      return {
        background: '#444',
      };

    // 칸을 열었을 때 흰 색
    case CODE.CLICKED_MINE:
    case CODE.OPENED:
      return {
        background: 'white',
      };

    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return {
        background: 'yellow',
      };

    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return {
        background: 'red',
      };

    default:
      return {
        background: 'white',
      };
  }
};

const getTdText = (code) => {
  switch (code) {
    // 기본 칸인 경우 아무런 표시도 없음
    case CODE.NORMAL:
      return '';

    // 지뢰인 경우 X표시
    case CODE.MINE:
      return 'X';

    case CODE.CLICKED_MINE:
      return '펑';

    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return '!';

    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return '?';

    default:
      return code || ''; // 주변 지뢰 개수가 0인 경우 빈 문자열을 출력
  }
};

// props를 통해 해당 칸의 좌표를 알 수 있음
const Td = ({ rowIndex, cellIndex }) => {
  const { tableData, dispatch, halted } = useContext(TableContext);

  /* 
    ! [] 안에 halted를 넣어두지 않아서 update 안되는 문제가 있었음
  */

  // 클릭 하는 경우
  const onClickTd = useCallback(() => {
    // 게임이 멈췄으면 아무 일도 일어나지 않도록
    if (halted) {
      console.log(halted);
      return;
    }

    // 칸의 상태별로 클릭 행동을 구분
    switch (tableData[rowIndex][cellIndex]) {
      // 이미 열려있는 칸은 아무 효과가 없도록
      case CODE.OPENED:
      case CODE.FLAG_MINE:
      case CODE.FLAG:
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        return;

      // 일반 칸은 열리도록
      case CODE.NORMAL:
        dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
        return;

      // 지뢰칸을 클릭하는 경우 (펑 터져야 함)
      case CODE.MINE:
        dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex });
        return;
    }

    dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
  }, [tableData[rowIndex][cellIndex], halted]); // tableData는 클릭 시 바뀌므로 배열 안에 넣어줌

  // 우클릭 하는 경우
  const onRightClickTd = useCallback(
    (e) => {
      e.preventDefault();

      // 게임이 멈췄으면 아무 일도 일어나지 않도록
      if (halted) {
        return;
      }

      /* 
        아래와 같이 Action을 추상적으로 그냥 만들고 나서, reducer에서 동작을 구체화할 것!
      */
      switch (tableData[rowIndex][cellIndex]) {
        // 일반 셀에 우클릭한 경우 ('' -> !)
        case CODE.NORMAL:
        case CODE.MINE:
          dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex });
          return;

        // 깃발에 우클릭한 경우 (! -> ?)
        case CODE.FLAG_MINE:
        case CODE.FLAG:
          dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex });
          return;

        // 물음표에 우클릭한 경우 (? -> '')
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
          dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex });
          return;

        default:
          return;
      }
    },
    [tableData[rowIndex][cellIndex], halted] // tableData는 클릭 시 바뀌므로 배열 안에 넣어줌
  );

  return (
    // 우클릭 : onContextMenu
    <td style={getTdStyle(tableData[rowIndex][cellIndex])} onClick={onClickTd} onContextMenu={onRightClickTd}>
      {getTdText(tableData[rowIndex][cellIndex])}
    </td>
  );
};

export default Td;
