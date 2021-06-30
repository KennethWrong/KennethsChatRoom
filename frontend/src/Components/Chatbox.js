import '../app.css';
import React from 'react'
import {useState} from 'react'
import io from 'socket.io-client'
const socket = io("http://localhost:3080")

function Chatbox(props) {

    const [messages, setMessages] = useState([])
    const [tempmsg, setTempMsg] = useState('')
    const username = props.username;
    let actualMessage;

    const userTextChange = (text) => {
        setTempMsg(text.target.value);
    }

    const textSend = (event) => {
        event.preventDefault()
        actualMessage = `${username}: ${tempmsg}`
        socket.emit('chat message',actualMessage)
        setMessages(messages.concat(actualMessage))
        setTempMsg('')
    }

    socket.on('chat message',(msg) => {
        setMessages(messages.concat(msg))
    })
    
    socket.on('user enter', (username) => {
        const enterText = `${username} has entered the chat`
        setMessages(messages.concat(enterText))
    })

    socket.on('connection',() =>{
        socket.emit('chat message',`${username} has entered the chat`)
    })



    return (
        <section className="sections">
      <div id="chatArea">{messages.map((indi,index) => <p id="messages" key={index}>{indi} </p>)}</div>
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

