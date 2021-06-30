import '../app.css'
import Alert from 'react-bootstrap/Alert'
const Notifications = (props) => {
//userName,loggedIn

    return(
        <div className="notifications">
            <Alert variant={props.color}>
                <Alert.Heading>{props.notification}</Alert.Heading>
            </Alert>
        </div>
    )
}

export default Notifications