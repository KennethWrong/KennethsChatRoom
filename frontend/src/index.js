import React from 'react';
import ReactDOM from 'react-dom';
import './app.css';
import Navigation from './Components/Navigation';
import MainArea from './MainArea'
//import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(<Navigation />,document.getElementById('header'));
ReactDOM.render(<MainArea/>,document.getElementById('login'));


