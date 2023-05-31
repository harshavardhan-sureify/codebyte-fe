import React from "react";
import { Routes, Route } from "react-router-dom";
import AddUser from "../AddUser";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/adduser" element={<AddUser/>}></Route>
    </Routes>
  );
};

export default AppRoutes;