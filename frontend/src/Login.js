import React,{useState} from 'react'
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
    
    const[regun,setregun] = useState('')
    const [regpw,setregpw] = useState('')
    const[tempregun,settempregun] = useState('')
    const [tempregpw,settempregpw] = useState('')

    const handleUserChange = (text) => {
        setun(text.target.value)
        setUserName(text.target.value)
    }

    const handlePWChange = (text) => {
        setp(text.target.value)
        setPassword(text.target.value)
    }

    const handleunregChange = (text) => {
        settempregun(text.target.value)
        setregun(text.target.value)
    }

    const handlepwregChange = (text) => {
        settempregpw(text.target.value)
        setregpw(text.target.value)
    }


    const handleLogin = () => {
        let validation = false;
        
if(userName){
        axios.get(`http://localhost:3080/users/${userName}`)
        .then(checkUser => {
            console.log(checkUser.length >0)
            if(checkUser){
            console.log(checkUser.data[0].password)
            validation = checkUser.data[0].password === password ? true : false
            }

            if(validation){
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

             })
        .catch((err) => console.log(err))
            }else{
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

    const handleRegister = async () => {

        if(tempregun && tempregpw){

            let account = {
                username: regun,
                password: regpw,
            }

            axios.post('http://localhost:3080/users',account)
            .catch(error => console.log(error))

            setUserName(regun)
            setLoggedIn(true)
            setNotification(`${regun} has successfully registered`)
            setColor('#57bc90')
            setTimeout(() => {
                setNotification('')
                setColor('#f9cf00')
            },2000)

            socket.emit('user enter',regun)
            
        }
            else
            {
                setNotification(`Username or password must be present`)
                setColor('#cd5360')
                setTimeout(() => {
                setNotification('')
                 setColor('#f9cf00')
                },2000)
}
                settempregun('')
                settempregpw('')

    }

    const handleLogOut = () => {
        setLoggedIn(false)
        setUserName('')
        setPassword('')
        setregun('')
        setregpw('')
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
        <div className="register">
            <h3>Register</h3>
            <input type="text" onChange={handleunregChange} value={tempregun}
            autoComplete = "off" placeholder="Username"></input>
            <input type="password" onChange={handlepwregChange} value={tempregpw}
            autoComplete = "off" placeholder="Password"></input>
            <button type="button" className="loginButton"  onClick={handleRegister}>Register</button>
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