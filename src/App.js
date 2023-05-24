import "./App.css";
import PollCreate from "./components/PollCreate";
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
