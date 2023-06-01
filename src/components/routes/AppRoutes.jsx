import React from "react";
import { Routes, Route } from "react-router-dom";
import SignupPage from "../SignupPage";
import PollCreate from "../PollCreation";
import LoginPage from "../LoginPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route path="/signup" element={<SignupPage />}></Route>
      <Route path="/create" element={<PollCreate />}></Route>
      
    </Routes>
  );
};

export default AppRoutes;
