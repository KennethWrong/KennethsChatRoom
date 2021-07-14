import React,{useState} from 'react'
import axios from 'axios'
import Register from './Register'
import '../app.css'
import Button from 'react-bootstrap/Button';
import {useDispatch} from 'react-redux'
import {setUN} from '../app/unSlice'
import {setRN} from '../app/roomSlice'
import { setNotification } from '../app/notificationSlice';
import { clearNotification } from '../app/notificationSlice';
import {setRequest} from '../app/requestSlice'
import friendFunction from '../utils/friendFunction';


function Login (props) {
    const [un,setun] = useState('')
    const [pw, setpw] = useState('')
    const [noAccount,setNoAccount] = useState(false)
    const [rm,setRm] = useState('')
    const dispatch = useDispatch()

    const socket = props.socket;

    const CreateNotification = (color,message) => {
        const body = {
            color:color,
            message:message
        }
    
        dispatch(setNotification(body))
        setTimeout(() => {
            dispatch(clearNotification())
        },2000)

    }

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


    const handleLogin = async (e) => {
        e.preventDefault()
        let validation = false;

        if(!(un&&pw)){
            setpw('')
            setun('')
            CreateNotification('danger','Wrong Username or Password')
        }else if(!rm){
            CreateNotification('warning','Specify a valid Room Number')
        }
        
        else if(un && pw && rm){
        
        
        const checkUser = await axios.get(`http://localhost:3080/users/login/${un}`)

            if(checkUser.data.length > 0){
            validation = checkUser.data[0].password === pw ? true : false
            }

            if(validation){
                let state = {state:true,room: rm,}
                await axios.put(`http://localhost:3080/users/online/${un}`,state)
                dispatch(setUN(un))
                dispatch(setRN(rm))
                props.setLoggedIn(true)
                socket.emit('join room',{un,rm})
                let requests = await friendFunction.getFriendRequests(un)
                dispatch(setRequest(requests))
                //setting notification
                let message = `${un} joined room ${rm}`;
                let color = 'success';
                CreateNotification(color,message)
                
            }else
                {
                    CreateNotification('danger','Wrong Username or Password')

                }

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
    <h3 style={{fontWeight:'bolder'}}>Login</h3>
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