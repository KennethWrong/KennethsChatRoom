import React,{useState} from 'react'
import axios from 'axios'
import Register from './Register'
import '../app.css'
import Button from 'react-bootstrap/Button';


function Loggingin (props) {
    const [un,setun] = useState('')
    const [pw, setpw] = useState('')
    const [noAccount,setNoAccount] = useState(true)

    const handleUserChange = (text) => {
        setun(text.target.value)
    }

    const handlePWChange = (text) => {
        setpw(text.target.value)
    }

    const handleOther = () => {
        setNoAccount(true)
    }

    const handleLogin = () => {
        let validation = false;
        
    if(un && pw){
        axios.get(`http://localhost:3080/users/${un}`)
        .then(checkUser => {
            if(checkUser.data.length > 0){
            validation = checkUser.data[0].password === pw ? true : false
            }

            if(validation){
                props.setUserName(un)
                props.setLoggedIn(true)
                props.setNotification(`Welcome ${un}`)
                props.setColor('#57bc90')
                setTimeout(() => {
                    props.setNotification('')
                    props.setColor('#f9cf00')
                },2000)
                
            }else
                {
                    props.setNotification(`Wrong Username or Password`)
                    props.setColor('#cd5360')
                    setTimeout(() => {
                        props.setNotification('')
                        props.setColor('#f9cf00')
                    },2000)
                }

             })
        .catch((err) => console.log(err))
            }
            else{
                    props.setNotification(`Wrong Username or Password`)
                    props.setColor('#cd5360')
                    setTimeout(() => {
                    props.setNotification('')
                     props.setColor('#f9cf00')
                    },2000)
                }
    }

    return(
        <section className="align-left">
            {noAccount ?
            <div>
            <Register setUserName={props.setUserName} setLoggedIn={props.setLoggedIn} 
        setColor={props.setColor} setNotification={props.setNotification}
        setNoAccount={setNoAccount}/>
        </div>
    :<div className="login">
    
    <h3>Login</h3>
    <input type="text" onChange={handleUserChange} value={un}
    autoComplete = "off" placeholder="Username"></input>
    <input type="passworlotd" onChange={handlePWChange} value={pw}
    autoComplete = "off" placeholder="Password"></input>
    <button type="button" className="loginButton"  onClick={handleLogin}>Login</button>

    <Button variant="outline-primary" onClick={handleOther} type='button' size='sm'>
        Register</Button>
</div>}

    {/* <div className="text-on-right">
            <p>Hey guys I am kenneth nice to meet you, I am new to CSS so I am trying
                to use web development, SCSS, React and Node to create a webapp to improve and train my skills
                as a web-developer, I am going to add more things into this!
            </p>
        </div> */}
    </section>
    )
} 

export default Loggingin;