import { createSlice } from "@reduxjs/toolkit";


export const notificationSlice = createSlice({
    name: 'notification',
    initialState:{
        value:'',
    },
    reducers:{
        setNotification: (state,action) => {
            state.value = action.payload 
        },
        clearNotification: (state) => {
            state.value = ''
        },
    }
})

export const {setNotification,clearNotification} = notificationSlice.actions

export default notificationSlice.reducer