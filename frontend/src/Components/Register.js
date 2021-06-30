import React,{useState} from 'react'
import axios from 'axios'
import '../app.css'
import Button from 'react-bootstrap/Button';

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
            props.setNotification(`${props.regun} has successfully registered`)
            props.setColor('success')
            setTimeout(() => {
                props.setNotification('')
                props.setColor('#f0f0f0')
            },2000)

            
        }
            else
            {
                props.setNotification(`Username or password must be present`)
                props.setColor('danger')
                setTimeout(() => {
                props.setNotification('')
                 props.setColor('#f0f0f0')
                },2000)
            }
    }


    return(
        <div className="register">
            <div className="flex-div-column">
            <h3>Register</h3>

            <input type="text" onChange={handleunregChange} value={regun}
            autoComplete = "off" placeholder="Username"></input>
            <input type="password" onChange={handlepwregChange} value={regpw}
            autoComplete = "off" placeholder="Password"></input>
            <Button  variant="success" onClick={handleRegister} size='md' type='button'>Register</Button>
            </div>
            <Button variant="light" onClick={handleOther} type='button' size='sm'>
        Have an account?</Button>
            </div>
    )
}

export default Register;