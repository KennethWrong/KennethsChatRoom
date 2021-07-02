import { configureStore } from '@reduxjs/toolkit'
import unReducer from './unSlice'
import roomReducer from './roomSlice'


export default configureStore({
  reducer: {
    username : unReducer,
    roomnumber :  roomReducer
  },
})