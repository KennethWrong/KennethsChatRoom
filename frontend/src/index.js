import React from 'react';
import ReactDOM from 'react-dom';
import './styles/app.css';
import App from './App';
import Chatbox from './Chatbox'
import Login from './Login'


ReactDOM.render(<App />,document.getElementById('header'));
ReactDOM.render(<Login/>,document.getElementById('login'));
ReactDOM.render(<Chatbox />,document.getElementById('chatbox'));


