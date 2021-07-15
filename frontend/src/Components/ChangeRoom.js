import React,{useState} from 'react'
import { useDispatch,useSelector} from 'react-redux'
import { setRN } from '../app/roomSlice'
import Button from 'react-bootstrap/Button'
import '../app.css'

const ChangeRoom = (props) => {
    const [newRM,setNewRM] = useState('')
    let socket = props.socket
    const dispatch = useDispatch()
    const username = useSelector(state => state.username.value)

    const handleRoomChange = (e) => {
        setNewRM(e.target.value)
     }


    const changeRoom = (e) => {
        e.preventDefault()
        setNewRM('')
        dispatch(setRN(newRM))
        socket.emit('change room',newRM,username)
    }


    return(
        <div className="changeRoomDiv">
            <form className="roomNumber">
                <input placeholder="Room Number"  
                onChange={handleRoomChange}
                value={newRM}
                >
                </input>
            </form>
            <button onClick={changeRoom}
            className='xtra-small-button'
            >Change
            </button>
        </div>
    )
}

export default ChangeRoom