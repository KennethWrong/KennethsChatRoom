import '../app.css'
import Alert from 'react-bootstrap/Alert'
import { useSelector } from 'react-redux'
const Notifications = () => {
//userName,loggedIn
const notification = useSelector(state => state.notification.value)

    return(
        <div className="notifications">
            <Alert variant={notification.color} >
                <Alert.Heading style={{fontSize: '1rem'}}>{notification.message}</Alert.Heading>
            </Alert>
        </div>
    )
}

export default Notifications