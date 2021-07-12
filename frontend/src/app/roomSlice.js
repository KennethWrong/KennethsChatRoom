import { createSlice } from "@reduxjs/toolkit";


export const roomSlice = createSlice({
    name: 'roomnumber',
    initialState:{
        value:'',
    },
    reducers:{
        setRN: (state,action) => {
            state.value = action.payload 
        },
        clearRN: (state) => {
            state.value = ''
        },
    }
})

export const {setRN,clearRN} = roomSlice.actions

export default roomSlice.reducer