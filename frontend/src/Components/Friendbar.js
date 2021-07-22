import React,{useEffect, useState} from 'react'
import friendFunction from '../utils/friendFunction'
import CheckOnline from './CheckOnline'
import '../app.css'
import '../styling/responsive.css'
import refresh from '../assets/refresh2.png'
import Image from 'react-bootstrap/Image'
import AddFriend from './AddFriend'
import {useSelector,useDispatch} from 'react-redux'
import {setRequest} from '../app/requestSlice'

const Friendbar = (props) => {
    const username = useSelector(state => state.username.value)
    const [friends,setFriends] = useState([])
    const [refreshs,setRefreshs] = useState(true)
    const socket = props.socket
    const dispatch = useDispatch()

    socket.on('friend request', async () => {
        const requests = await friendFunction.getFriendRequests(username)
        dispatch(setRequest(requests))
    })

    socket.on('refresh friends', async () => {
        setRefreshs(!refreshs)
    })

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
                <AddFriend socket={socket}></AddFriend>
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