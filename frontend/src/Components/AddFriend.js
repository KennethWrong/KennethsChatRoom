import {useState} from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import '../app.css'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import { setNotification } from '../app/notificationSlice';
import { clearNotification } from '../app/notificationSlice';

const AddFriend = (props) => {
    const [addFriend,setAddFriend] = useState('')
    const username = useSelector(state => state.username.value)
    const dispatch = useDispatch()
    const socket = props.socket

    const CreateNotification = (color,message) => {
        const body = {
            color:color,
            message:message
        }
    
        dispatch(setNotification(body))
        setTimeout(() => {
            dispatch(clearNotification())
        },2000)

    }

    const handleFriendChange = (e) => {
        setAddFriend(e.target.value)
    }

    const sendFriendRequest = async (e) => {
        e.preventDefault()
        setAddFriend('')
       const sendBody = {
           sender: username,
           to: addFriend
       }
       try{
       const response = await axios.put(`http://localhost:3080/friends/friendrequest`,sendBody)
        socket.emit('friend request',addFriend)
        CreateNotification('success',response.data.message)
       }catch(error){
        CreateNotification('danger',error.response.data.message)
       }
    }

    const popover = () => (
        <Popover style={{position:'relative'}}>
          <Popover.Title>
              <h3 className="sendfriendrequest">
                  Send Friend Request</h3>
              </Popover.Title>
          <Popover.Content>
            <div className="sendrequest-wrapper">
                <form>
                    <input type="text"
                    placeholder="Enter Username"
                    value={addFriend}
                    onChange={handleFriendChange}>
                    </input>
                </form>
                <button
                    className="sendRequest"
                    onClick={sendFriendRequest}>
                        Send Request
                        </button>

            </div>
          </Popover.Content>
        </Popover>
      );


    
    
    return(
        <OverlayTrigger 
        trigger="click" 
        placement="right" 
        overlay={popover()}
        delay={{ show: 250, hide: 150 }}>
            
            <button 
            className='addfriend'
            >
                Add Friend
            </button>
        
        </OverlayTrigger>
    )
}

export default AddFriend