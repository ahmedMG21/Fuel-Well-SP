//store/adavancedFilterInputSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';


// Define a type for the slice state
interface AdvancedFilterInputState {
    sliderValues: Object;
}

// Define the initial state using that type
// Calories , Total Fat , Saturated Fat , Serving Size , Total Sugar , Protien , , Sodium , Cholesterol , Dietary Fiber , Total Carbs , Added Sugar



const initialState: AdvancedFilterInputState = {
    sliderValues: {
        'Calories': [0, 999],
        'Total Fat': [0, 70],
        'Saturated Fat': [0, 100],
        'Serving Size': [0, 500],
        'Total Sugar': [0, 100],
        'Protien': [0, 100],
        'Sodium': [0, 1500],
        'Cholesterol': [0, 200],
        'Dietary Fiber': [0, 100],
        'Total Carbs': [0, 999],
        'Added Sugar': [0, 100],
    
    }
};

export const advancedFilterInputSlice = createSlice({
    name: 'advancedFilterInput',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setSliderValues: (state, action: PayloadAction<{ [key: string]: number[] }>) => {
            state.sliderValues = action.payload;
        },
    },
});

export const { setSliderValues } = advancedFilterInputSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSliderValues = (state: RootState) => state.advancedFilterInput.sliderValues;

export default advancedFilterInputSlice.reducer;