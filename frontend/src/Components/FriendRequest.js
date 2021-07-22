import react from 'react'
import {useDispatch} from 'react-redux'
import { setRequest } from '../app/requestSlice'
import friendFunction from '../utils/friendFunction'

const FriendRequest = (props) => {
    const requests = props.requests
    const dispatch = useDispatch()
    const socket = props.socket

    const removingRequest = (request) => {
        const index = requests.indexOf(request)
        let requestClone = requests.slice()
            requestClone.splice(index,1)
            dispatch(setRequest(requestClone))
    }


    const requestHandlerTrue = async (e) => {
        e.preventDefault()
        const body = {
            sender: e.target.value,
            to: props.username,
            state:true
        }
        removingRequest(e.target.value)

        const res = await friendFunction.handleFriendRequest(body)
        socket.emit('refresh friends',e.target.value)
        
    }

    const requestHandlerFalse = async (e) => {
        e.preventDefault()
        const body = {
            sender: e.target.value,
            to: props.username,
            state:false
        }
        removingRequest(e.target.value)

        const res = await friendFunction.handleFriendRequest(body)
        socket.emit('refresh friends',e.target.value)
    }


    return(
        requests.map((request,index) =>
      <div key={index}>
       <p
       style={{fontSize:'1.2rem',textAlign:'center'}}
       >
         {request}
         </p>
         <button value={request}
         className="accept-button"
         onClick={requestHandlerTrue}>
             Accept</button>
         <button value={request}
         className="decline-button"
         onClick={requestHandlerFalse}>
             Decline</button>
         </div>)
    )
}

export default FriendRequest