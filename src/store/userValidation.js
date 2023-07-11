import { createSlice } from "@reduxjs/toolkit";
import initialUserInputState from '../utilities/initialUserInputState'

const initialState = {initialUserInputState};

const validationSlice = createSlice({
    name: "validation",
    initialState,
    reducers: {
        validate(state, action) {
            return {
                [action.name]: action.value,
            };
        }
    },
});

export const userValidationActions = validationSlice.actions;

export default validationSlice.reducer;