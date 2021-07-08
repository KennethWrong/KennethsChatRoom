import React, { useEffect, useRef } from 'react'

const Messages = ({ messages }) => {

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages]);

  return (
    <div>
      {messages.map((message,index) => 
      <div key={index} className={message.style}>
        {message.name?
        <div className="nameplustext">
        <h6>{message.name}</h6>
        <p>{message.message}</p>
        </div>
        :
        <p>{message.message}</p>
      } 
        </div>
        )
        }
    
      <div ref={messagesEndRef} />
    </div>
  )
}

export default Messages