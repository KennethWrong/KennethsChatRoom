import { createSlice } from "@reduxjs/toolkit";


export const requestSlice = createSlice({
    name: 'request',
    initialState:{
        value:'',
    },
    reducers:{
        setRequest: (state,action) => {
            state.value = action.payload 
        },
        clearRequest: (state) => {
            state.value = ''
        },
    }
})

export const {setRequest,clearRequest} = requestSlice.actions

export default requestSlice.reducer