import '../app.css'
import Button from 'react-bootstrap/Button';
import {useDispatch,useSelector} from 'react-redux'
import {setUN} from '../app/unSlice'
import {setRN} from '../app/roomSlice'

const Logout = (props) => {
    const dispatch = useDispatch()
    const socket = props.socket;
    const userName = useSelector((state) => state.username.value)
    const room = useSelector((state) => state.roomnumber.value)

    const handleLogOut = () => {
        dispatch(setUN(''))
        dispatch(setRN(''))
        props.setLoggedIn(false)
        socket.emit('logout',{userName,room})
    }


    return(
    <div className="logged-in-as">
    <h3>Logged in as: {userName}</h3>
    <Button type="button" variant="outline-secondary "onClick={handleLogOut} size="sm">
        Logout</Button>
    </div>
    )
}

export default Logout;