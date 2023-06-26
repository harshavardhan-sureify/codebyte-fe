import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./User.reducer";
import toastReducer from "./Toaster.reducer";

const store = configureStore({
    name: "main",
    reducer: {
        user: userReducer,
        toaster: toastReducer,
    },
});

export default store;
