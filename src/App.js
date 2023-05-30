import logo from './logo.svg';
import './App.css';

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
