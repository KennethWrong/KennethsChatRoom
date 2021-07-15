import '../app.css'
import Star from '../svg/Star'
import {useDispatch,useSelector} from 'react-redux'
import {setUN} from '../app/unSlice'
import {setRN} from '../app/roomSlice'
import {clearRequest} from '../app/requestSlice'
import ChangeRoom from './ChangeRoom'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'


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

    const popover = () => (
        <Popover style={{position:'relative',}}>
          <Popover.Title as="h3">
              <h6 style={{textAlign:'center', fontSize:'1rem',color:'grey'}}>
                  Settings
                  </h6>
              </Popover.Title>
          <Popover.Content>
            <div className='settings-wrapper'>
                <button className="logout-button"
                onClick={handleLogOut}
                >
                    Logout
                    </button>
                    <OverlayTrigger 
                    trigger="click" 
                    placement="left" 
                    overlay={popover2()}
                    delay={{ show: 250, hide: 150 }}>
                        <button className="logout-button">Change Room</button>
                    </OverlayTrigger>
            </div>
          </Popover.Content>
        </Popover>
      );

      const popover2 = () => (
        <Popover style={{position:'relative',}}>
          <Popover.Title as="h3">
              <h6 style={{textAlign:'center',color:'grey',fontSize:'1rem'}}>
                  Change Room
                  </h6>
              </Popover.Title>
          <Popover.Content>
              <ChangeRoom socket={socket}></ChangeRoom>
          </Popover.Content>
        </Popover>
      );


    return(
    <div className="logged-in-as-wrapper">
    <div className="logged-in-as">
    <h3>{userName}</h3>
    <h3 className="in-room">Room: {room}</h3>
    </div>
    <OverlayTrigger 
      trigger="click" 
      placement="bottom" 
      overlay={popover()}
      delay={{ show: 250, hide: 150 }}>
          <Star />
    </OverlayTrigger>
    </div>
    )
}

export default Logout;
