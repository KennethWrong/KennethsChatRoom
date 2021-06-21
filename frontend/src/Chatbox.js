import './app.css';
import react from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
const io = require("socket.io-client");
const socket = io("http://localhost:3080")

function Chatbox() {
    const [userText, setText] = useState('')
    const [messages,setMessages] = useState([])

    const userTextChange = (text) => {
        setText(text.target.value);
    }

    const textSend = (event) => {
        event.preventDefault()
        socket.emit('chat message',userText)
        setText('')
    }

    socket.on('chat message',(msg) => {
        setMessages(messages.concat(msg))
        window.scrollTo(0,document.body.scrollHeight);
    })


    return (
        <section>
        <div id="intro">
        <h1>Welcome to Kenneth's chat App</h1>
      </div>
      <div id="chatArea">{messages.map(indi => <li>{indi}</li>)}</div>

        <div>
            <form id="form" action="">
            <input onChange={userTextChange} type="text" id="inputbox" autoComplete="off">
                </input> <button onClick={textSend}>Send</button>
            </form>
        </div>
        </section>
    )

}

export default Chatbox;

