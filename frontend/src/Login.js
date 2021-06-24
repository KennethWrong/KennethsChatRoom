import React,{useState,useEffect} from 'react'
import './styles/app.css'
import Chatbox from './Chatbox'
import axios from 'axios'
import Notifications from './Notifications'
import Friendbar from './Friendbar'
import ServerTabs from './ServerTabs'
const io = require('socket.io-client')
const socket = io("http://localhost:3080")

function Login() {
    const [userName,setUserName] = useState('')
    const [tempun,setun] = useState('')
    const [password,setPassword] = useState('')
    const [tempp,setp] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)
    const [color,setColor] = useState('#f9cf00')
    const [notification,setNotification] = useState('')

    const handleUserChange = (text) => {
        setun(text.target.value)
        setUserName(text.target.value)
    }

    const handlePWChange = (text) => {
        setp(text.target.value)
        setPassword(text.target.value)
    }

    const handleLogin = async () => {
        if(tempun){
            setun('')
            setp('')
            setLoggedIn(true)
            setNotification(`Welcome ${userName}`)
            setColor('#57bc90')
            setTimeout(() => {
                setNotification('')
                setColor('#f9cf00')
            },2000)
            socket.emit('user enter',userName)
            const account = {
                username: userName,
                password: password,
            }
            axios.post('http://localhost:3080/users',account)
            .catch(error => console.log(error))
            
        }
            else
            {
                setNotification(`Wrong Username or Password`)
                setColor('#cd5360')
                setTimeout(() => {
                setNotification('')
                 setColor('#f9cf00')
                },2000)
}
                setun('')
                setp('')
    }

    const handleLogOut = () => {
        setLoggedIn(false)
    }


    return(
        <div>
            <section className='sections'>
            <Notifications color={color} notification={notification}/>
            </section>
        
        {!loggedIn?
        <section className="align-left">
            <div className="login">
            <h3>Login</h3>
            <input type="text" onChange={handleUserChange} value={tempun}
            autoComplete = "off" placeholder="Username"></input>
            <input type="password" onChange={handlePWChange} value={tempp}
            autoComplete = "off" placeholder="Password"></input>
            <button type="button" className="loginButton"  onClick={handleLogin}>Login</button>
    </div>
    <div className="text-on-right">
            <p>Hey guys I am kenneth nice to meet you, I am new to css so I am trying
                to use webdevelopment, SCSS, React and Node to create a webapp to improve and train my skills
                as a web-developer, I am going to add more things into this!
            </p>
        </div>
        </section>:
        <section>
        <div className="logged-in-as">
        <h3>Logged in as: {userName}</h3>
        <button type="button" className="logoutButton" onClick={handleLogOut}>Logout</button>
        </div>
        <section className="responsive-section-col">
            <ServerTabs />
            <Chatbox username={userName}/>
        </section>
        <Friendbar socket={socket}/>
         </section>
        

    }
        </div>
        
    )
}

export default Login;