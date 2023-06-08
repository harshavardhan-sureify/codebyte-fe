import { LocalizationProvider } from "@mui/x-date-pickers";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./components/routes/AppRoutes";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider } from "@mui/material";
import { theme } from "./themes/theme";
import "./App.css"
function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <AppRoutes />
                </LocalizationProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
