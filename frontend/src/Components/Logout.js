import React,{useState} from 'react'
import '../app.css'
import Button from 'react-bootstrap/Button';



const Logout = (props) => {

    const handleLogOut = () => {
        props.setLoggedIn(false)
        props.setUserName('')
        props.setPassword('')
    }


    return(
    <div className="logged-in-as">
    <h3>Logged in as: {props.userName}</h3>
    <Button type="button" variant="outline-secondary "onClick={handleLogOut} size="sm">
        Logout</Button>
    </div>
    )
}

export default Logout;