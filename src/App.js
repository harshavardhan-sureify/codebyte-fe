import { LocalizationProvider } from "@mui/x-date-pickers";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./components/routes/AppRoutes";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import UserProvider from "./context";
import { useContext } from "react";
import UserContext from "./context/UserContext";
import { AppBar, Toolbar, Typography } from "@mui/material";
import logo from "./assets/images/logo.png";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AppRoutes />
        </LocalizationProvider>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
