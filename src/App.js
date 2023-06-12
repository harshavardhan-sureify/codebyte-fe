import { LocalizationProvider } from "@mui/x-date-pickers";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./components/routes/AppRoutes";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Provider } from "react-redux";
import store from "./components/features/store";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <AppRoutes />
                </LocalizationProvider>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
