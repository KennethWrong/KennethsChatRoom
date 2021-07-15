import React from 'react';
import ReactDOM from 'react-dom';
import './app.css';
import Navigation from './Components/Navigation';
import MainArea from './MainArea'
import store from './app/store'
import {Provider} from 'react-redux'


ReactDOM.render(
<Provider store={store}>
<Navigation />
</Provider>,
document.getElementById('header'));

ReactDOM.render(
<Provider store={store}>
<MainArea/>
</Provider>,
document.getElementById('login')
);

