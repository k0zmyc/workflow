import {createSlice} from '@reduxjs/toolkit'
import data from '../components/mock_data';

const initialData = data

export const stateSlice = createSlice ({
    name: "states",
    initialState: initialData,
    reducers: {
        addState: (state, action) => {
            state.push(action.payload)
            return state
        },
    },
})

export const {addState} = stateSlice.actions

export default stateSlice.reducer