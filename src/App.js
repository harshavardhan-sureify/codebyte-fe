import { BrowserRouter } from "react-router-dom";
import "./App.css";
import PollCreate from "./components/pollcreation/PollCreation";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AppRoutes from "./components/routes/AppRoutes";
function App() {
  return (
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppRoutes/>
      </LocalizationProvider>
    </BrowserRouter>
  );
}

export default App;
