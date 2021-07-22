import { useSelector,useDispatch } from "react-redux";
import {setNotification} from '../app/notificationSlice'
import {clearNotification} from '../app/notificationSlice'

const CreateNotification = (color,message) => {
    const dispatch = useDispatch()
    const body = {
        color:color,
        message:message
    }

    dispatch(setNotification(body))
    setTimeout(() => {
        dispatch(clearNotification())
    },2000)

}

export default CreateNotification