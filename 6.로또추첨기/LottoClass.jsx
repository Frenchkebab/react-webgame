import React, { Component } from 'react';
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
class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(), // 당첨 숫자들
    winBalls: [],
    bonus: null, // 보너스 공
    redo: false,
  };

  timeoutes = [];

  // 컴포넌트가 시작하자 마자 setTimeout이 시작되어야 하므로
  componentDidMount() {
    const { winNumbers } = this.state;
    for (let i = 0; i < this.state.winNumbers.length - 1; i++) {
      this.timeoutes[i] = setTimeout(() => {
        this.setState((prevState) => {
          return { winBalls: [...prevState.winBalls, winNumbers[i]] };
        });
      }, (i + 1) * 1000);
    }
    this.timeoutes[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true,
      });
    }, 7000);
  }

  // 컴포넌트가 제거되었는데도 setTimeout, setInterval 같은 것들이 돌아가게 되면
  // 메모리 문제가 생길 수 있으므로 컴포넌트가 제거될 시 반드시 제거를 해 주어야 함!
  componentWillUnmount() {
    this.timeoutes.forEach((el) => {
      clearTimeout(el);
    });
  }

  onClickRedo = () => {};

  render() {
    const { winBalls, bonus, redo } = this.state;
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
        <button onClick={redo ? this.onClickRedo : () => {}}>한 번 더!</button>
      </>
    );
  }
}

export default Lotto;
