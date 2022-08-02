import React, { useCallback } from 'react';

const Td = ({ rowIndex, cellIndex }) => {
  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);
  }, []);

  return <td onClick={onClickTd}>{''}</td>;
};

export default Td;
