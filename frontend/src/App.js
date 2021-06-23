import './styles/app.css';
import React,{useState} from 'react'
import ClockComponent from './ClockComponent';

function App() {

  return (
    <div id="intro">
    <h1>Welcome to Kenneth's chat App</h1>
    <ClockComponent />
  </div>
  );
}

export default App;
