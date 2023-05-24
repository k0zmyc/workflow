import {createSlice} from '@reduxjs/toolkit'
import data from '../components/workflow_struct';

const initialData = data

export const workflowSlice = createSlice ({
    name: "workflows",
    initialState: initialData,
    reducers: {
        addWorkflow: (state, action) => {
            state.push(action.payload)
            return state
        },
    },
})

export const {addWorkflow} = workflowSlice.actions

export default workflowSlice.reducer