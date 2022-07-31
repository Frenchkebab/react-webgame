import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from './Ball';

function getWinNumbers() {
  console.log('getWinNumbers');
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

const Lotto = () => {
  const [winBalls, setWinBalls] = useState([]);
  const lottoNumbers = useMemo(() => getWinNumbers(), []); // Hooks는 순서가 중요함!
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  const runTimeouts = () => {
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevWinBalls) => [...prevWinBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
  };

  const onClickRedo = useCallback(() => {
    console.log('onClickRedo');
    console.log(winNumbers);
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, [winNumbers]);

  // input이 빈배열이면 componentDidMount와 동일
  // 배열에 요소가 있으면 componentDidMount와 componentDidUpdate 모두 수행
  useEffect(() => {
    console.log('useEffect');
    runTimeouts();
    return () => {
      timeouts.current.forEach((el) => {
        clearTimeout(el);
      });
    };
  }, [timeouts.current]);

  return (
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map((v) => (
          <Ball key={v} number={v} />
        ))}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} />}
      {redo && <button onClick={redo ? onClickRedo : () => {}}>한 번 더!</button>}
    </>
  );

  // // 컴포넌트가 시작하자 마자 setTimeout이 시작되어야 하므로
  // componentDidMount() {
  //   console.log('didMount');
  //   this.runTimeouts();
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log('didUpdate');
  //   // 업데이트를 하고 싶은 상황을 잘 정리해주어야 함!! (안그러면 state가 바뀔 때마다 변경됨)
  //   if (this.state.winBalls.length === 0) {
  //     this.runTimeouts();
  //   }
  // }

  // // 컴포넌트가 제거되었는데도 setTimeout, setInterval 같은 것들이 돌아가게 되면
  // // 메모리 문제가 생길 수 있으므로 컴포넌트가 제거될 시 반드시 제거를 해 주어야 함!
  // componentWillUnmount() {
  //   this.timeouts.forEach((el) => {
  //     clearTimeout(el);
  //   });
  // }
};

export default Lotto;
