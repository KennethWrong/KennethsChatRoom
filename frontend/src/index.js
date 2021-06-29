import React from 'react';
import ReactDOM from 'react-dom';
import './app.css';
import Navigation from './Navigation';
import Login from './Login'
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(<Navigation />,document.getElementById('header'));
ReactDOM.render(<Login/>,document.getElementById('login'));


