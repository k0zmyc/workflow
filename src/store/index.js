import { configureStore } from '@reduxjs/toolkit';
import WorkflowReducer from '../reducers/WorkflowSlicer';

// Configures the Redux store with reducers
export const Store = configureStore({
    reducer: {
        events: WorkflowReducer,
    }
})