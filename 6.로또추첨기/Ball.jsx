import React, { memo } from 'react';

// 보통 제일 아래에 위치하는 자식 컴포넌트의 경우,
// 데이터를 담기보다는 화면을 뿌려주는 역할만 하기 때문에 PureComponent로 사용함
// 여기서는 PureComponent 역할을 위해 memo로 감싸줌
const Ball = memo(({ number }) => {
  let background;
  if (number <= 10) {
    background = 'red';
  } else if (number <= 20) {
    background = 'oragne';
  } else if (number <= 30) {
    background = 'yellow';
  } else if (number <= 40) {
    background = 'blue';
  } else {
    background = 'green';
  }

  return (
    <div className="ball" style={{ background }}>
      {number}
    </div>
  );
});

export default Ball;
