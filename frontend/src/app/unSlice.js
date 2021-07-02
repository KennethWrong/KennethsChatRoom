import {createSlice} from '@reduxjs/toolkit'

export const unSlice = createSlice({
    name:'username',
    initialState:{
        value:'',
    },
    reducers:{
        setUN: (state, action) => {
            state.value = action.payload
        },
        clearUN: (state) => {
            state.value = ''
        },
    }
})

export const {setUN,clearUN} = unSlice.actions
export default unSlice.reducer