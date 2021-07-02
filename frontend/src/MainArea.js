import React,{useState} from 'react'
import './app.css'
import Chatbox from './Components/Chatbox'
import Notifications from './Components/Notifications'
import Friendbar from './Components/Friendbar'
import Login from './Components/Login'
import Logout from './Components/Logout'
import io from 'socket.io-client'
const socket = io("http://localhost:3080")


function MainArea() {
    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)
    const [color,setColor] = useState('')
    const [notification,setNotification] = useState('')
    
    return(
        <div>
            <section className='sections'>
            <Notifications color={color} notification={notification}/>
            </section>
        
        {!loggedIn?

        <Login  setLoggedIn={setLoggedIn} 
        setColor={setColor} setNotification={setNotification}  socket={socket}/>:
        <section>
        <Logout setLoggedIn={setLoggedIn} setPassword={setPassword} socket={socket}></Logout>
        

        <section className="responsive-section-row">
            <Chatbox socket={socket}/>
            <Friendbar />
         </section>
         </section>
    
    }
        </div>
        
    )
}

export default MainArea;