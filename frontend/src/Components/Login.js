import React,{useState} from 'react'
import axios from 'axios'
import Register from './Register'
import '../app.css'
import Button from 'react-bootstrap/Button';
import {useDispatch} from 'react-redux'
import {setUN} from '../app/unSlice'
import {setRN} from '../app/roomSlice'



function Login (props) {
    const [un,setun] = useState('')
    const [pw, setpw] = useState('')
    const [noAccount,setNoAccount] = useState(false)
    const [rm,setRm] = useState('')
    const dispatch = useDispatch()

    const socket = props.socket;

    const handleUserChange = (text) => {
        setun(text.target.value)
    }

    const handlePWChange = (text) => {
        setpw(text.target.value)
    }

    const handleRoomChange = (text) => {
        setRm(text.target.value)
    }

    const handleOther = () => {
        setNoAccount(true)
    }


    const handleLogin = (e) => {
        e.preventDefault()
        let validation = false;

        if(!(un&&pw)){
            setpw('')
            setun('')
            props.setNotification(`Wrong Username or Password`)
                    props.setColor('danger')
                    setTimeout(() => {
                        props.setNotification('')
                        props.setColor('')
                    },2000)
        }else if(!rm){
            props.setNotification(`Specify a valid room number`)
            props.setColor('warning')
            setTimeout(() => {
                props.setNotification('')
                props.setColor('')
            },2000)
        }
        
        else if(un && pw && rm){
        
        
        axios.get(`http://localhost:3080/users/${un}`)
        .then(checkUser => {
            if(checkUser.data.length > 0){
            validation = checkUser.data[0].password === pw ? true : false
            }


            if(validation){
                dispatch(setUN(un))
                dispatch(setRN(rm))
                props.setLoggedIn(true)
                socket.emit('join room',{un,rm})
                props.setNotification(`${un} joined room ${rm}`)
                props.setColor('success')
                setTimeout(() => {
                    props.setNotification('')
                    props.setColor('')
                },2000)
                
            }else
                {
                    props.setNotification(`Wrong Username or Password`)
                    props.setColor('danger')
                    setTimeout(() => {
                        props.setNotification('')
                        props.setColor('')
                    },2000)
                }

             })
        .catch((err) => console.log(err))
            }
    }

    return(
        <section className="align-left">
            {noAccount ?
            <div>
            <Register  setLoggedIn={props.setLoggedIn} 
        setColor={props.setColor} setNotification={props.setNotification}
        setNoAccount={setNoAccount} socket={socket}/>
        </div>
    :<div className="login">
    <div className="flex-div-column">
    <h3>Login</h3>
    <input type="text" onChange={handleUserChange} value={un}
    autoComplete = "off" placeholder="Username"></input>

    <input type="password" onChange={handlePWChange} value={pw}
    autoComplete = "off" placeholder="Password"></input>

    <input type="text" onChange={handleRoomChange} value={rm}
    autoComplete = "off" placeholder="Room Number"></input>

    <Button type="button" variant="success" size='md'  onClick={handleLogin}>Login</Button>
    </div>
    <Button variant="light" onClick={handleOther} type='button' size='sm'>
        Register</Button>
</div>}
    </section>
    )
} 

export default Login;