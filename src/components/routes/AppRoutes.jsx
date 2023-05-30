import React from "react";
import { Routes, Route } from "react-router-dom";
import UserRegistrationByAdmin from "../UserRegistrationByAdmin";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/adduser" element={<UserRegistrationByAdmin/>}></Route>
    </Routes>
  );
};

export default AppRoutes;