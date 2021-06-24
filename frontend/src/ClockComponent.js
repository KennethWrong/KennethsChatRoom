import React,{useState,useEffect} from 'react'

function ClockComponent() {
    const [date,setDate] = useState(new Date())

    useEffect(()=> {
        setInterval(() => {
            setDate(new Date())
        },1000)
    })

    return(
        <div className="clockComponent">
            <h3>{date.toLocaleString()}</h3>
        </div>
    )

}

export default ClockComponent;