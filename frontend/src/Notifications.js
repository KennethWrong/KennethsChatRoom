import React from 'react'

const Notifications = (props) => {


    return(
        <div className="notifications">
        <h1 style={{backgroundColor:`${props.color}`}}>
            {props.msg}
        </h1>
        </div>
    )
}

export default Notifications