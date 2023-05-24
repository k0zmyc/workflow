import {configureStore} from '@reduxjs/toolkit';
import stateReducer from "../slices/stateSlice"

export const store =  configureStore({
    reducer: {
        states: stateReducer,
    }
}) 