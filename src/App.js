import { LocalizationProvider } from "@mui/x-date-pickers";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./components/routes/AppRoutes";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import store from "./components/features/store";
import { theme } from "./themes/theme";
import "./App.css";

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <BrowserRouter>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <AppRoutes />
                    </LocalizationProvider>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
