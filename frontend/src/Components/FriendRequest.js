import react from 'react'
import Button from 'react-bootstrap/Button'
import {useDispatch} from 'react-redux'
import { setRequest } from '../app/requestSlice'
import friendFunction from '../utils/friendFunction'

const FriendRequest = (props) => {
    const requests = props.requests
    const dispatch = useDispatch()

    const removingRequest = (request) => {
        const index = requests.indexOf(request)
        console.log(index)
        let requestClone = requests.slice()
            console.log(requestClone)
            requestClone = requestClone.splice(index+1,1)
            console.log(requestClone)
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

    }


    return(
        requests.map((request,index) =>
      <div key={index}>
       <p
       style={{fontSize:'12px'}}
       >
         {request}
         </p>
         <Button 
         variant="success" value={request}
         onClick={requestHandlerTrue}>
             Accept</Button>
         <Button variant = "danger" value={request}
         onClick={requestHandlerFalse}>
             Decline</Button>
         </div>)
    )
}

export default FriendRequest