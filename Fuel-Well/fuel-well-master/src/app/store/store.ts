//redux toolkit store
import { configureStore } from '@reduxjs/toolkit';
import advancedFilterInputReducer from './advancedFilterInputSlice'; 

export const store = configureStore({
    reducer: {
        advancedFilterInput: advancedFilterInputReducer, 
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
