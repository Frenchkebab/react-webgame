import React from 'react';
import Td from './Td';

const Tr = ({ rowIndex, rowData }) => {
  return (
    <tr>
      {Array(rowData.length)
        .fill()
        .map((td, i) => (
          <Td rowIndex={rowIndex} cellIndex={i}>
            {''}
          </Td>
        ))}
    </tr>
  );
};

export default Tr;
