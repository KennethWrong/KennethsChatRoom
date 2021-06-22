import React,{useState,useEffect} from 'react'
import './styles/app.css'
const io = require('socket.io-client')


function Login() {
    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)

    const handleUserChange = (text) => {
        setUserName(text.target.value)
    }

    const handlePWChange = (text) => {
        setPassword(text.target.value)
    }

    const handleLogin = () => {
        const account = {
            username: userName,
            password: password,
        }


    }




    return(
        <section class="align-left">
        <div class="login">
                <h3>Login</h3>
                <input type="text" onChange={handleUserChange} value={userName}
                autoComplete = "off" placeholder="Username"></input>
                <input type="text" onChange={handlePWChange} value={password}
                autoComplete = "off" placeholder="Password"></input>
                <button type="button" onClick={handleLogin}>Login</button>
        </div>
        
        <div class="text-on-right">
            <p>Hey guys I am kenneth nice to meet you, I am new to css so I am trying
                to use webdevelopment, SCSS, React and Node to create a webapp to improve and train my skills
                as a web-developer, I am going to add more things into this!
            </p>
        </div>
        </section>
    )
}

export default Login;