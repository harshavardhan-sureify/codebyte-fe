import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./User.reducer";
import toastReducer from "./Toaster.reducer";
import ActiveTabReducer from "./ActiveTab.reducer";

const store = configureStore({
    name: "main",
    reducer: {
        user: userReducer,
        toaster: toastReducer,
        activeTab:ActiveTabReducer,
    },
});

export default store;
