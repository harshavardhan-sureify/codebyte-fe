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
      <Route exact path="/adduser" element={<AddUser />}></Route>
      <Route exact path="/signup" element={<SignupPage />}></Route>
      <Route exact path="/admin/create" element={<PollCreate />}></Route>
      <Route exact path="/trigger" element={<Trigger />}></Route>
      <Route exact path="/" element={<LoginPage />} />
    </Routes>
  );
};

export default AppRoutes;
