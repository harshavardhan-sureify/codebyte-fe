import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token") ?? "",
    role: localStorage.getItem("role") ?? "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action) {
            state.token = action.payload.token;
            state.role = action.payload.role;
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("role", action.payload.role);
            return state;
        },
        logout(state, action) {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            state.token = "";
            state.role = "";
            return state;
        },
    },
});

export const { login, logout } = userSlice.actions;
export const auth = (state) => state.user;
export const isLoggedIn = (state) => !(state.user.token.length === 0);
export default userSlice.reducer;
