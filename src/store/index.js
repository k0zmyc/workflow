import { configureStore } from '@reduxjs/toolkit';
import statesReducer from "../features/statesSlice"

// Configures the Redux store with reducers
export const store = configureStore({
    reducer: {
        projects: statesReducer,
    }
})
