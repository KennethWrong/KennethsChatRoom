import React,{useState,useEffect} from 'react'
import './styles/app.css'
import Chatbox from './Chatbox'
import axios from 'axios'
import Notifications from './Notifications'
const io = require('socket.io-client')
const socket = io("http://localhost:3080")

function Login() {
    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)
    const [color,setColor] = useState('white')
    const [notification,setNotification] = useState('')

    const handleUserChange = (text) => {
        setUserName(text.target.value)
    }

    const handlePWChange = (text) => {
        setPassword(text.target.value)
    }

    const handleLogin = async () => {
        if(userName){
            setLoggedIn(true)
            socket.emit('user enter',userName)
            const account = {
                username: userName,
                password: password,
            }
            setNotification(`Welcome ${userName}`)
            setColor('green')
            setTimeout(() => {
                setNotification('')
                setColor('white')
            },2000)
            axios.post('http://localhost:3080/users',account)
            .catch(error => console.log(error))
            
        }
            else
            {
                setNotification(`Wrong Username or Password`)
            setColor('red')
            setTimeout(() => {
                setNotification('')
                setColor('white')
            },2000)
            }
    }

    const handleLogOut = () => {
        setLoggedIn(false)
    }



    return(
        <div>
            <Notifications color={color} notification={notification}/>
        
        {!loggedIn?
        <section className="align-left">
            <div className="login">
            <h3>Login</h3>
            <input type="text" onChange={handleUserChange} value={userName}
            autoComplete = "off" placeholder="Username"></input>
            <input type="password" onChange={handlePWChange} value={password}
            autoComplete = "off" placeholder="Password"></input>
            <button type="button" className="loginButton" onClick={handleLogin}>Login</button>
    </div>
    <div className="text-on-right">
            <p>Hey guys I am kenneth nice to meet you, I am new to css so I am trying
                to use webdevelopment, SCSS, React and Node to create a webapp to improve and train my skills
                as a web-developer, I am going to add more things into this!
            </p>
        </div>
        </section>:
        <div>
        <h3 className="logged-in-as">Currently Logged in as: {userName}</h3>
        <button type="button" className="loginButton" onClick={handleLogOut}>Logout</button>
        <Chatbox username={userName}/>
        </div>

    }
        </div>
        
    )
}

export default Login;