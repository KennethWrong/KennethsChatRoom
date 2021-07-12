import '../app.css';
import React from 'react'
import {useState} from 'react'
import {useSelector} from 'react-redux'
import Messages from './Messages'

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
        actualMessage = `${tempmsg}`
        socket.emit('chat message',actualMessage,roomnumber,username)

        const msg = {
            message: actualMessage,
            style: 'ownStyle',
            name:'',
        }

        setMessages(messages.concat(msg))
        setTempMsg('')
    }

    socket.on('chat message',(incomeMsg,otherName) => {

        const msg = {
            message : incomeMsg,
            style: 'userStyle',
            name:otherName,
        }

        setMessages(messages.concat(msg))
    })
    
    socket.on('join room', (username) => {
        const enterText = `User ${username} has entered the room`


        const msg = {
            message : enterText,
            style: 'systemStyle',
            name:'',
        }
        setMessages(messages.concat(msg))
    })

    socket.on('leave', (sentMessage) => {
        const msg = {
            message : sentMessage,
            style: 'systemStyle',
            name:'',
        }
        setMessages(messages.concat(msg))
    })

    socket.on('change room', () => {
        setMessages([])
    })


    return (
        <section className="sections">
      <div id="chatArea">
          <Messages messages={messages}></Messages>
          </div>
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

