import React, { useRef, useState } from 'react';

const ResponseCheck = () => {
  const [status, setStatus] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작하세요.');
  const [result, setResult] = useState([]);
  const timeOut = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = () => {
    if (status === 'waiting') {
      setStatus('ready');
      setMessage('초록색이 되면 클릭하세요.');
      timeOut.current = setTimeout(() => {
        setStatus('now');
        setMessage('지금 클릭');
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 랜덤
    } else if (status == 'ready') {
      clearTimeout(timeOut.current);
      setStatus('waiting');
      setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');
    } else if (status === 'now') {
      endTime.current = new Date();
      // 반응 속도 체크
      setStatus('waiting');
      setMessage('클릭해서 시작하세요.');
      setResult((prevResult) => {
        console.log(endTime, startTime);
        return [...prevResult, endTime.current - startTime.current];
      });
    }
  };

  const onReset = () => {
    setResult([]);
  };

  const renderAverage = () => {
    return result.length === 0 ? null : (
      <>
        <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={onReset}>Reset</button>
      </>
    );
  };

  return (
    <>
      <div id="screen" className={status} onClick={onClickScreen}>
        {message}
      </div>
      {/* 따로 함수 component로 분리하는 것이 좋음! */}
      {renderAverage()}
    </>
  );
};

export default ResponseCheck;
