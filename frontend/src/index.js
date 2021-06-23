import React from 'react';
import ReactDOM from 'react-dom';
import './styles/app.css';
import App from './App';
import Login from './Login'
import Notifications from './Notifications'


ReactDOM.render(<App />,document.getElementById('header'));
ReactDOM.render(<Login/>,document.getElementById('login'));


