import React, { useContext } from 'react';
import { CODE, TableContext } from './MineSearch';

const getTdStyle = (code) => {
  switch (code) {
    // 기본적인 경우 회색
    case CODE.NORMAL:
    case CODE.MINE:
      return {
        background: '#444',
      };

    // 칸을 열었을 때 흰 색
    case CODE.OPENED:
      return {
        background: 'white',
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

    default:
      return '';
  }
};

// props를 통해 해당 칸의 좌표를 알 수 있음
const Td = ({ rowIndex, cellIndex }) => {
  const { tableData } = useContext(TableContext);
  return <td style={getTdStyle(tableData[rowIndex][cellIndex])}>{getTdText(tableData[rowIndex][cellIndex])}</td>;
};

export default Td;
