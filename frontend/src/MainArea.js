import React,{useState} from 'react'
import './app.css'
import Chatbox from './Components/Chatbox'
import Notifications from './Components/Notifications'
import Friendbar from './Components/Friendbar'
import Login from './Components/Login'
import Logout from './Components/Logout'


function MainArea() {
    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)
    const [color,setColor] = useState('')
    const [notification,setNotification] = useState('')
    const [roomNumber,setRoomNumber] = useState('')
    
    return(
        <div>
            <section className='sections'>
            <Notifications color={color} notification={notification}/>
            </section>
        
        {!loggedIn?

        <Login setUserName={setUserName} setLoggedIn={setLoggedIn} 
        setColor={setColor} setNotification={setNotification} setRoomNumber={setRoomNumber}/>:
        <section>
        <Logout setLoggedIn={setLoggedIn} setUserName={setUserName} 
         userName={userName} setPassword={setPassword}></Logout>
        

        <section className="responsive-section-row">
            <Chatbox username={userName}/>
            <Friendbar />
         </section>
         </section>
    
    }
        </div>
        
    )
}

export default MainArea;