const React = require('react');
const ReactDOM = require('react-dom/client');

const WordRelay = require('./WordRelay');

// ReactDom.render(<WordRelay />, document.querySelector('#root'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<WordRelay />);
