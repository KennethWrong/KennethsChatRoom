import React,{useEffect, useState} from 'react'
import friendFunction from '../utils/friendFunction'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import '../app.css'
import refresh from '../assets/refresh2.png'
import Image from 'react-bootstrap/Image'
import {useDispatch,useSelector} from 'react-redux'
import {setRN} from '../app/roomSlice'

const Friendbar = (props) => {
    const [friends,setFriends] = useState([])
    const [refreshs,setRefreshs] = useState(true)
    const socket = props.socket;
    const dispatch = useDispatch()
    const username = useSelector(state => state.username.value)

    useEffect(() => {
        friendFunction.getAllFriends()
        .then(res => {
            setFriends(res)
        })
     }, [refreshs])

     const joinRoom = (e) => {
        e.preventDefault()
        if(window.confirm(`You want to switch to room: ${e.target.value}?`)){
            dispatch(setRN(e.target.value))
            socket.emit('change room',e.target.value,username)
        }
     }

     const refreshFriend = (e) => {
         e.preventDefault()
         setRefreshs(!refreshs)
     }


    
    return(
        <section className='friendbar'>
            <div className='friendbar-div'>
                <div className="friendonline-wrapper">
                <h3 className="friendonline">Friends online</h3>
                <button onClick={refreshFriend}>
                    <Image className="refresh" fluid src={refresh}/>
                    </button>
                </div>
                <div className="innerfriendonline">
                <Table borderless responsive size='sm'>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Room</th>
                        </tr>
                    </thead>
                    <tbody>
                        {friends.map((friend,index) => <tr key={index}>
                            <td className="friendword">{friend.username}  </td> 
                            <td>
                                    <Button type="button" onClick={joinRoom} value={friend.room} size="sm">
                                        {friend.room}
                                        </Button>
                                </td>
                            </tr>)}
                    </tbody>
                    </Table>
                </div>
            </div>
        </section>
    )
}

export default Friendbar