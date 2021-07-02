import '../app.css';
import React from 'react'
import {useState} from 'react'
import {useSelector} from 'react-redux'

function Chatbox(props) {

    const [messages, setMessages] = useState([])
    const [tempmsg, setTempMsg] = useState('')
    const username = useSelector((state) => state.username.value)
    const roomnumber = useSelector((state) => state.roomnumber.value)
    let actualMessage;
    const socket = props.socket

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
    
    socket.on('join room', (username) => {
        const enterText = `${username} has entered the room`
        setMessages(messages.concat(enterText))
    })

    socket.on('disconnect', () => {
        socket.emit('leave', {username,roomnumber})
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

