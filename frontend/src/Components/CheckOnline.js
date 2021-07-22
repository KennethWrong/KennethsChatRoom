import React from 'react'
import greenDot from '../assets/greendot.png'
import redDot from '../assets/reddot.png'
import {useDispatch,useSelector} from 'react-redux'
import {setRN} from '../app/roomSlice'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import friendFunction from '../utils/friendFunction'

const CheckOnline = (props) => {

const dispatch = useDispatch()
const username = useSelector(state => state.username.value)
const socket = props.socket;
const friends = props.friends;

const checkOnlineImage = (friend) => {
    if(friend.online){
        return <Image className="dots1"src={greenDot}/>
    }else{
        return <Image className="dots1" src={redDot}/>
    }
}

const checkOnline = (friend) => {
    if(friend.online){
        
        return (
            <div>
                <h6 className="onlineStatus">Currently: <span className="online">Online</span></h6>
                <div className="in-room-wrapper">
                    <p>In Room:  </p>
                    <button
                    className="joinRoom"
                    onClick={joinRoom} value={friend.room}>
                    {friend.room}</button></div>
            </div>
        )
    }else{
        return (
            <h6 className="onlineStatus">Currently: <span className="offline">Offline</span></h6>
        )
    }
}



const joinRoom = (e) => {
    e.preventDefault()
    if(window.confirm(`You want to switch to room: ${e.target.value}?`)){
        dispatch(setRN(e.target.value))
        socket.emit('change room',e.target.value)
    }
 }

 const unfriendFunction = async (e) => {
     e.preventDefault()
     const targetUser = e.target.value
     if(window.confirm(`You sure you want to unfriend ${targetUser}?`)){
         const body = {
             user: username,
             toDelete: e.target.value
         }
        const res = await friendFunction.deleteFriend(body)
        console.log('I am getting called!')
        socket.emit('refresh friends',targetUser)

    }



 }


 const popover = (friend) => (
    <Popover style={{position:'relative',}}>
      <Popover.Title as="h3">
          <div className="friend-username">
          {friend.username}
          <button className="unfriend-button" value ={friend.username} onClick={unfriendFunction}>
                unfriend
          </button>
          </div>
          </Popover.Title>
      <Popover.Content>
        {checkOnline(friend)}
      </Popover.Content>
    </Popover>
  );


 return (
    <div className="innerfriendonline">
    {friends.map((friend,index) => 
      <OverlayTrigger 
      trigger="click" 
      placement="top" 
      overlay={popover(friend)}
      delay={{ show: 250, hide: 150 }}
      key={index}>
        <div className="indifriendwrapper">
        <p><strong>{friend.username}</strong></p> 
        {checkOnlineImage(friend)}
        </div>
        </OverlayTrigger>
        )}
</div>
 )


}

export default CheckOnline