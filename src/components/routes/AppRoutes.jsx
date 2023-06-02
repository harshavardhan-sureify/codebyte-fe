import React from "react";
import { Routes, Route } from "react-router-dom";
import AddUser from "../AddUser";
import SignupPage from "../SignupPage";
import PollCreate from "../PollCreation";
import LoginPage from "../LoginPage";
import Trigger from "../Trigger";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/adduser" element={<AddUser/>}></Route>
      <Route path="/" element={<LoginPage />} />

      <Route path="/signup" element={<SignupPage />}></Route>
      <Route path="/create" element={<PollCreate />}></Route>
      <Route path="/trigger" element={<Trigger />}></Route>      
    </Routes>
  );
};

export default AppRoutes;
