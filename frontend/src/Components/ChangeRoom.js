import React,{useState} from 'react'
import { useDispatch,useSelector} from 'react-redux'
import { setRN } from '../app/roomSlice'
import Button from 'react-bootstrap/Button'
import '../app.css'

const ChangeRoom = (props) => {
    let rm;
    const [newRM,setNewRM] = useState('')
    let socket = props.socket
    const dispatch = useDispatch()
    const username = useSelector(state => state.username.value)

    const handleRoomChange = (e) => {
        setNewRM(e.target.value)
     }


    const changeRoom = (e) => {
        e.preventDefault()
        dispatch(setRN(newRM))
        socket.emit('change room',newRM,username)
    }


    return(
        <div>
            <form className="roomNumber">
                <input placeholder="Enter Room No."  
                onChange={handleRoomChange}
                value={rm}
                >
                </input>
            </form>
            <Button variant="outline-secondary" 
            onClick={changeRoom}
            className='xtra-small-button'
            >Change</Button>
        </div>
    )
}

export default ChangeRoom