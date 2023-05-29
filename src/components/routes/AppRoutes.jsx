import React from "react";
import { Routes, Route } from "react-router-dom";
import PollCreate from "../PollCreation";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/create" element={<PollCreate />}></Route>
    </Routes>
  );
};

export default AppRoutes;
