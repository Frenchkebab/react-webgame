const React = require('react');
const { Component } = require('react');

// get 4 numbers randomly
function getNumbers() {}
class NubmerBaseball extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(),
    tries: [],
  };

  onSubmitForm = () => {};

  onChangeINput = () => {};

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input maxLength={4} value={this.state.value} onChange={this.state.value} />
        </form>
        <div>시도: {this.state.tries.length}</div>
        <ul>
          {['사과', '바나나', '포도', '귤', '감', '배', '밤'].map((el) => {
            return <li>{el}</li>;
          })}
        </ul>
      </>
    );
  }
}

module.exports = NubmerBaseball;
