import React,{useState,useEffect} from 'react'

function ClockComponent() {
    const [date,setDate] = useState(new Date())

    useEffect(()=> {
        setInterval(() => {
            setDate(new Date())
        },1000)
    })

    return(
            <h2>{date.toLocaleString()}</h2>
    )

}

export default ClockComponent;