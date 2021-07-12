import { configureStore } from '@reduxjs/toolkit'
import unReducer from './unSlice'
import roomReducer from './roomSlice'
import requestReducer from './requestSlice'


export default configureStore({
  reducer: {
    username : unReducer,
    roomnumber :  roomReducer,
    request : requestReducer,
  },
})