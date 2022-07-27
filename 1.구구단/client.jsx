const React = require('react');
const ReactDOM = require('react-dom/client');

const Gugudan = require('./Gugudan');

// ReactDom.render(<Gugudan />, document.querySelector('#root'));

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<Gugudan />);
