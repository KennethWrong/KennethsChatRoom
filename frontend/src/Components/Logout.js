import '../app.css'
import Button from 'react-bootstrap/Button';
import {useDispatch,useSelector} from 'react-redux'
import {setUN} from '../app/unSlice'
import {setRN} from '../app/roomSlice'
import {clearRequest} from '../app/requestSlice'
import ChangeRoom from './ChangeRoom'

const Logout = (props) => {
    const dispatch = useDispatch()
    const socket = props.socket;
    const userName = useSelector((state) => state.username.value)
    const room = useSelector((state) => state.roomnumber.value)

    const handleLogOut = async () => {
        socket.emit('logout')
        dispatch(setUN(''))
        dispatch(setRN(''))
        dispatch(clearRequest())
        props.setLoggedIn(false)
    }


    return(
    <div className="logged-in-as-wrapper">
    <div className="logged-in-as">
    <h3>Logged in as: {userName}</h3>
    <Button type="button" 
    variant="outline-secondary "
    onClick={handleLogOut}
    >
        Logout</Button>
    </div>
    <h3 className="in-room">Currently in room: {room}</h3>
    <ChangeRoom socket={socket}></ChangeRoom>
    </div>
    )
}

export default Logout;