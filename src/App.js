import { LocalizationProvider } from '@mui/x-date-pickers';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './components/routes/AppRoutes';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppRoutes/>
      </LocalizationProvider>
    </BrowserRouter>
  );
};

export default App;
