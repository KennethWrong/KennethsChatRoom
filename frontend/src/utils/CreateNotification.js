import { useSelector,useDispatch } from "react-redux";
import {setNotification} from '../app/notificationSlice'
import {clearNotification} from '../app/notificationSlice'

const CreateNotification = (props) => {
    const dispatch = useDispatch()
    console.log('am i getting called?')
    const body = {
        color:props.color,
        message:props.message
    }

    dispatch(setNotification(body))
    setTimeout(() => {
        dispatch(clearNotification())
    },2000)
}

export default CreateNotification