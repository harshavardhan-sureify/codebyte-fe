import React from "react";
import { Routes, Route } from "react-router-dom";
import SignupPage from "../SignupPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignupPage />}></Route>
    </Routes>
  );
};

export default AppRoutes;
