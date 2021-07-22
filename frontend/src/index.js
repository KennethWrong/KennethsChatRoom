import React from 'react';
import ReactDOM from 'react-dom';
import './app.css';
import Navigation from './Components/Navigation';
import MainArea from './MainArea'
import store from './app/store'
import {Provider} from 'react-redux'
import Footer from './Components/Footer'
import io from 'socket.io-client'
const socket = io("http://localhost:3080")


ReactDOM.render(
<Provider store={store}>
<Navigation socket={socket}/>
</Provider>,
document.getElementById('header'));

ReactDOM.render(
<Provider store={store}>
<MainArea socket={socket}/>
</Provider>,
document.getElementById('login')
);


