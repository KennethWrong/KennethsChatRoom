import React,{useState} from 'react'
import './app.css'
import Chatbox from './Components/Chatbox'
import Notifications from './Components/Notifications'
import Friendbar from './Components/Friendbar'
import ServerTabs from './Components/ServerTabs'
import Loggingin from './Components/Loggingin'
const io = require('socket.io-client')
const socket = io("http://localhost:3080")

function Login() {
    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)
    const [color,setColor] = useState('#f9cf00')
    const [notification,setNotification] = useState('')
    

    const handleLogOut = () => {
        setLoggedIn(false)
        setUserName('')
        setPassword('')
    }
    
    return(
        <div>
            <section className='sections'>
            <Notifications color={color} notification={notification}/>
            </section>
        
        {!loggedIn?

        <Loggingin setUserName={setUserName} setLoggedIn={setLoggedIn} 
        setColor={setColor} setNotification={setNotification}/>:
        <section>
        <div className="logged-in-as">
        <h3>Logged in as: {userName}</h3>
        <button type="button" className="logoutButton" onClick={handleLogOut}>Logout</button>
        </div>
        <section className="responsive-section-col">
            <ServerTabs />
            <Chatbox username={userName}/>
        </section>
        <Friendbar />
         </section>
        

    }
        </div>
        
    )
}

export default Login;