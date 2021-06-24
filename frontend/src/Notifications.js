import React,{useState} from 'react'

const Notifications = (props) => {
//userName,loggedIn

    return(
        <div className="notifications" style={{backgroundColor:`${props.color}`}}>
        <h1>
            {props.notification}
        </h1>
        </div>
    )
}

export default Notifications