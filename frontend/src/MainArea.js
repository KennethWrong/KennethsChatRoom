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
    const [loggedIn, setLoggedIn] = useState(false)
    
    return(
        <div>
            <section className='sections'>
            <Notifications />
            </section>
        
        {!loggedIn?

        <Login  setLoggedIn={setLoggedIn} socket={socket}/>:
        <section>
        <Logout setLoggedIn={setLoggedIn} socket={socket}></Logout>
        

        <section className="responsive-section-row">
            <Chatbox socket={socket} />
            <Friendbar socket={socket}/>
         </section>
         </section>
    
    }
        </div>
        
    )
}

export default MainArea;