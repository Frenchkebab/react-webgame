const React = require('react');
const { useState, useRef } = React;
const { Component } = React;

const WordRelay = () => {
  const [word, setWord] = useState('최정현');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  onSubmitForm = (e) => {
    e.preventDefault();
    console.dir(e.target);
    console.log(e.target.children.wordInput.value);
    if (word[word.length - 1] === e.target.children.wordInput.value[0]) {
      setResult('딩동댕');
      setWord(e.target.children.wordInput.value);
      e.target.children.wordInput.value = '';
      inputRef.current.focus();
    } else {
      setResult('땡');
      e.target.children.wordInput.value = '';
      inputRef.current.focus();
    }
  };

  onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <label htmlFor="wordInput">글자를 입력하세요</label>
        <input id="wordInput" className="wordInput" ref={inputRef} />
        <button>입력!</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = WordRelay;
