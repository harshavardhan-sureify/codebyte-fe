import "./App.css";
import PollCreate from "./components/pollcreation/PollCreation";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <PollCreate />
      </div>
    </LocalizationProvider>
  );
}

export default App;
