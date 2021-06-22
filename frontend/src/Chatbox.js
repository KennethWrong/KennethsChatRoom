import './styles/app.css';
import react from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
const io = require("socket.io-client");
const socket = io("http://localhost:3080")

function Chatbox() {
    const [messages, setMessages] = useState([])
    const [tempmsg, setTempMsg] = useState('')

    const userTextChange = (text) => {
        setTempMsg(text.target.value);
    }

    const textSend = (event) => {
        event.preventDefault()
        socket.emit('chat message',tempmsg)
        setMessages(messages.concat(tempmsg))
        setTempMsg('')
        console.log('this only meant for me')
    }

    socket.on('chat message',(msg) => {
        setMessages(messages.concat(msg))
        window.scrollTo(0,document.body.scrollHeight);
    })


    return (
        <section>
      <div id="chatArea">{messages.map(indi => <p id="messages">{indi}</p>)}</div>
        <div>
            <form id="form" action="">
            <input onChange={userTextChange} type="text" id="inputbox" autoComplete="off" 
            placeholder="Type something..." value={tempmsg}>
                </input> 
                {tempmsg.length > 0?
                <button onClick={textSend}>Send</button>:
                <br></br>
                }
            </form>
        </div>
        </section>
    )

}

export default Chatbox;

