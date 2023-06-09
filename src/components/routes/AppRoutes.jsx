import React, { useContext } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import AddUser from "../AddUser";
import SignupPage from "../SignupPage";
import PollCreate from "../PollCreation";
import LoginPage from "../LoginPage";
import Trigger from "../Trigger";
import UserContext from "../../context/UserContext";
import { ADMIN_ROLE, USER_ROLE } from "../../constants";
import AdminDashBoard from "../admin/AdminDashBoard";
import { AppBar, Toolbar, Typography } from "@mui/material";
import logo from "./../../assets/images/logo.png"

const AppRoutes = () => {
  const { user, isLoggedIn } = useContext(UserContext);
  console.log(isLoggedIn());
  const ProtectedRoute = ({ role, children }) => {
    if (!role || !isLoggedIn() || role !== user.role) {
      return <Navigate to="/" replace={true} />;
    } else {
      return children;
    }
  };

  return (
    <>
      {isLoggedIn() && (
        <AppBar position="sticky">
          <Toolbar>
            <img src={logo} alt="" width="32px" heigth="32px" />
            <Typography variant="h5" sx={{ marginLeft: "5px" }}>
              CodeByte
            </Typography>
          </Toolbar>
        </AppBar>
      )}
      <Routes>
        <Route path="/adduser" element={<AddUser />}></Route>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route
          path="/create"
          element={
            <ProtectedRoute role={ADMIN_ROLE}>
              <PollCreate />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/trigger" element={<Trigger />}></Route>
        <Route path="/admin/dashboard" element={<AdminDashBoard />}></Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
