import React,{useEffect, useState} from 'react'
import friendFunction from '../utils/friendFunction'
import CheckOnline from './CheckOnline'
import '../app.css'
import '../styling/responsive.css'
import refresh from '../assets/refresh2.png'
import Image from 'react-bootstrap/Image'
import AddFriend from './AddFriend'
import {useSelector} from 'react-redux'

const Friendbar = (props) => {
    const username = useSelector(state => state.username.value)
    const [friends,setFriends] = useState([])
    const [refreshs,setRefreshs] = useState(true)

    useEffect(() => {
        friendFunction.getActualFriends(username)
        .then(res => {
            setFriends(res)
        })
     }, [refreshs])


     const refreshFriend = (e) => {
         e.preventDefault()
         setRefreshs(!refreshs)
     }


    
    return(
        <section className='friendbar'>
            <div className='friendbar-div'>
                <AddFriend></AddFriend>
                <div className="friendonline-wrapper">
                <h3 className="friendonline">Friends online</h3>
                <button onClick={refreshFriend} className='refresh1'>
                    <Image className="refresh" fluid src={refresh}/>
                    </button>
                </div>
                <CheckOnline socket={props.socket} friends={friends}>

                </CheckOnline>
            </div>
        </section>
    )
}

export default Friendbar