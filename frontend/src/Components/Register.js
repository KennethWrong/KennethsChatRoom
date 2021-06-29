import React,{useState} from 'react'
import axios from 'axios'
import '../app.css'

function Register (props) {
    const[regun,setregun] = useState('')
    const [regpw,setregpw] = useState('')

    const handleunregChange = (text) => {
        setregun(text.target.value)
    }

    const handlepwregChange = (text) => {
        setregpw(text.target.value)
    }

    const handleOther = () => {
        props.setNoAccount(false)
    }

    const handleRegister = async () => {


        if(regun && regpw){

            let account = {
                username: props.regun,
                password: props.regpw,
            }

            axios.post('http://localhost:3080/users',account)
            .catch(error => console.log(error))

            props.setUserName(props.regun)
            props.setLoggedIn(true)
            props.RegistersetNotification(`${props.regun} has successfully registered`)
            props.setColor('#57bc90')
            setTimeout(() => {
                props.setNotification('')
                props.setColor('#f9cf00')
            },2000)

            
        }
            else
            {
                props.setNotification(`Username or password must be present`)
                props.setColor('#cd5360')
                setTimeout(() => {
                props.setNotification('')
                 props.setColor('#f9cf00')
                },2000)
            }
    }


    return(
        <div className="register">
            <h3>Register</h3>
            <input type="text" onChange={handleunregChange} value={regun}
            autoComplete = "off" placeholder="Username"></input>
            <input type="password" onChange={handlepwregChange} value={regpw}
            autoComplete = "off" placeholder="Password"></input>
            <button type="button" className="loginButton"  onClick={handleRegister}>Register</button>
            <button type="button" onClick={handleOther}>Already have an account?</button>
            </div>
    )
}

export default Register;