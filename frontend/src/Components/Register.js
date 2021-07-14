import React,{useState} from 'react'
import axios from 'axios'
import '../app.css'
import Button from 'react-bootstrap/Button';
import {useDispatch} from 'react-redux'
import {setUN} from '../app/unSlice'
import {setRN} from '../app/roomSlice'
import {setNotification} from '../app/notificationSlice'
import {clearNotification} from '../app/notificationSlice'

function Register (props) {
    const[regun,setregun] = useState('')
    const [regpw,setregpw] = useState('')
    const [rm,setRm] = useState('')
    const dispatch = useDispatch()

    const socket = props.socket

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

    const handleRoomChange = (text) => {
        setRm(text.target.value)
    }

    const handleunregChange = (text) => {
        setregun(text.target.value)
    }

    const handlepwregChange = (text) => {
        setregpw(text.target.value)
    }

    const handleOther = () => {
        props.setNoAccount(false)
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        let status;

        if(regun && regpw &&rm){

            let account = {
                username: regun,
                password: regpw,
                room:rm
            }

            const res = await axios.post('http://localhost:3080/users',account)
            .catch(error => 
                {
                    status = error.response.status
                    CreateNotification('danger',error.response.data.message)
                })
            
            if(status !== 500){
                dispatch(setUN(regun))
                dispatch(setRN(rm))
                props.setLoggedIn(true)
                let un = regun
                socket.emit('join room',{un,rm})
                CreateNotification('success',`${regun} has successfully Registered`)
        }
            setregun('')
            setregpw('')
            setRm('')

            
        }
        else if(!rm)
        {
                CreateNotification('warning',`Room Number must be provided`)
        }
        else
        {
            CreateNotification('danger',`Username or Password must be present`)
        }
    }


    return(
        <div className="register">
            <div className="flex-div-column">
            <h3 style={{fontWeight:'bolder'}}>Register</h3>

            <input type="text" onChange={handleunregChange} value={regun}
            autoComplete = "off" placeholder="Username"></input>
            <input type="password" onChange={handlepwregChange} value={regpw}
            autoComplete = "off" placeholder="Password"></input>
            <input type="text" onChange={handleRoomChange} value={rm}
            autoComplete = "off" placeholder="Room Number"></input>
            <Button  variant="success" onClick={handleRegister} size='md' type='button'>Register</Button>
            </div>
            <Button variant="light" onClick={handleOther} type='button' size='sm'>
        Have an account?</Button>
            </div>
    )
}

export default Register;