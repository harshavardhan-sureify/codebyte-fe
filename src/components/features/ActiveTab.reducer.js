import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeTab: localStorage.getItem("activeTab") ?? "Active",
};

const activeTabSlice = createSlice({
    name: "activeTab",
    initialState,
    reducers: {
        handleActiveTab(state, action) {
            state.activeTab = action.payload;
            localStorage.setItem("activeTab", action.payload);
            return state;
        },
    },
});

export const { handleActiveTab } = activeTabSlice.actions;
export const activeTab = (state) => state.activeTab;
export default activeTabSlice.reducer;
