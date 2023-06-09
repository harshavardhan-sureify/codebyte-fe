import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token") ?? "",
    role: localStorage.getItem("role") ?? "",
    name: localStorage.getItem("name") ?? "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action) {
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.name = action.payload.name;
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("role", action.payload.role);
            localStorage.setItem("name", action.payload.name);
            localStorage.setItem(
                "expirationTime",
                new Date().getTime() + 60*60*1000
            );
            return state;
        },
        logout(state, action) {
            localStorage.clear();
            state.token = "";
            state.role = "";
            state.name = "";
            return state;
        },
    },
});

export const { login, logout } = userSlice.actions;
export const auth = (state) => state.user;
export const isLoggedIn = (state) => !(state.user.token.length === 0);
export default userSlice.reducer;
