import React, { Component, createRef } from 'react';
import Try from './Try';

// get 4 numbers randomly
function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}
class NubmerBaseball extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(), // ex) [1, 3, 5, 7]
    tries: [],
  };

  fruits = [
    { fruit: '사과', taste: '맛있다' },
    { fruit: '감', taste: '시다' },
    { fruit: '귤', taste: '달다' },
    { fruit: '밤', taste: '떫다' },
    { fruit: '배', taste: '맛있다' },
    { fruit: '무', taste: '맛있다' },
    { fruit: '사과', taste: '맛없다' },
  ];

  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.value === this.state.answer.join('')) {
      this.setState({
        result: '홈런!',
        tries: [...this.state.tries, { try: this.state.value, result: '홈런!' }],
      });
      alert('게임을 다시 시작합니다.');
      this.setState({
        value: '',
        answer: getNumbers(),
        tries: [],
      });
      this.inputRef.current.focus();
    } else {
      const answerArray = this.state.value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      // 10번 이상 틀린 경우
      if (this.state.tries.length >= 9) {
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`,
        });
        alert('게임을 다시 시작합니다.');
        this.setState({
          value: '',
          answer: getNumbers(),
          tries: [],
        });
        this.inputRef.current.focus();
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === this.state.answer[i]) {
            strike++;
          } else if (this.state.answer.includes(answerArray[i])) {
            ball++;
          }
          this.setState({
            tries: [...this.state.tries, { try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼입니다` }],
          });
        }
        this.inputRef.current.focus();
      }
    }
  };

  onChangeInput = (e) => {
    console.log(this.state.answer);
    this.setState({
      value: e.target.value,
    });
  };

  inputRef = createRef();

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input ref={this.inputRef} maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
        </form>
        <div>시도: {this.state.tries.length}</div>
        <ul>
          {this.state.tries.map((el, i) => {
            return <Try key={`${i + 1}차 시도`} tryInfo={el} />;
          })}
        </ul>
      </>
    );
  }
}

export default NubmerBaseball;
