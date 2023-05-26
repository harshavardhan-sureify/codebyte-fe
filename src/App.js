import { Box, useTheme } from "@mui/material";
import React from "react";

import AppRoutes from "./components/routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
