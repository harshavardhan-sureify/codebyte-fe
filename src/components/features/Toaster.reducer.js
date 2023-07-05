import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    severity: "",
    message: "",
    open: false,
};

const toasterSlice = createSlice({
    name: "toaster",
    initialState,
    reducers: {
        handleToaster(state, action) {
            state.message = action.payload.message;
            state.severity = action.payload.severity;
            state.open = action.payload.open;
            return state;
        },
        closeToaster(state,action){
            state = {...initialState}
            return state;
        }
    },
});

export const { handleToaster,closeToaster } = toasterSlice.actions;
export const toaster = (state) => state.toaster;
export default toasterSlice.reducer;