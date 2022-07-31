import React, { useEffect, useRef, memo, useMemo } from 'react';
import Td from './Td';

const Tr = memo(({ rowIndex, rowData, dispatch }) => {
  const ref = useRef([]);
  useEffect(() => {
    console.log(rowData === ref.current[0], dispatch === ref.current[1]);
    ref.current = [rowData, , dispatch];
  }, [rowData, dispatch]);

  return (
    <tr>
      {Array(rowData.length)
        .fill()
        .map((td, i) => (
          <Td key={i} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]} dispatch={dispatch}>
            {''}
          </Td>
        ))}
    </tr>
  );
});

export default Tr;
