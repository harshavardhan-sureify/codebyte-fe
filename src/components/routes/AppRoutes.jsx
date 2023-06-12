import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignupPage from "../SignupPage";
import PollCreate from "../PollCreation";
import LoginPage from "../LoginPage";
import Trigger from "../Trigger";
import { ADMIN_ROLE } from "../../constants";
import AdminDashBoard from "../admin/AdminDashBoard";
import { AppBar, Toolbar, Typography } from "@mui/material";
import logo from "./../../assets/images/logo.png";
import ProtectedRoute from "./ProtectedRoute";
import { auth, isLoggedIn } from "../features/User.reducer";
import { useSelector } from "react-redux";
import PublicRoute from "./PublicRoute";

const AppRoutes = () => {
  const user = useSelector(auth);
  const islogIn = useSelector(isLoggedIn);

    return (
        <>
            {islogIn && (
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
            <Route element={<PublicRoute />}>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                    {user.role === ADMIN_ROLE && (
                        <>
                            <Route path="/admin/dashboard" element={<AdminDashBoard />}/>
                            <Route path="/admin/create"element={<PollCreate />}/>
                            <Route path = "/admin/trigger" element={<Trigger/>}/>
                        </>
                    )}
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
};

export default AppRoutes;
