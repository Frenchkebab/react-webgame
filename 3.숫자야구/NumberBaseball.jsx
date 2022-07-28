const React = require('react');
const { Component } = require('react');
import Try from './Try';

// get 4 numbers randomly
function getNumbers() {}
class NubmerBaseball extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(),
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

  onSubmitForm = () => {
    e.preventDefault();
  };

  onChangeInput = (e) => {
    setValue(e.target.value);
  };

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
        </form>
        <div>시도: {this.state.tries.length}</div>
        <ul>
          {this.fruits.map((el, i) => {
            return <Try key={el.fruit + el.taste} value={el} index={i} />;
          })}
        </ul>
      </>
    );
  }
}

export default NubmerBaseball;
