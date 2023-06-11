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
import logo from "./../../assets/images/logo.png";

const AppRoutes = () => {
    const { user, isLoggedIn } = useContext(UserContext);
    console.log(isLoggedIn());
    const PublicRoute = ({ children }) => {
        if (isLoggedIn()) {
            return <Navigate to={`/${user.role}/dashboard`} replace={true} />;
        } else {
            return children;
        }
    };
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
                <Route
                    path="/"
                    element={
                        <PublicRoute>
                            <LoginPage />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <PublicRoute>
                            <SignupPage />
                        </PublicRoute>
                    }
                ></Route>
                <Route path="/admin/adduser" element={<AddUser />}></Route>
                <Route
                    path="/admin/create"
                    element={
                        <ProtectedRoute role={ADMIN_ROLE}>
                            <PollCreate />
                        </ProtectedRoute>
                    }
                ></Route>
                <Route path="/admin/trigger" element={<Trigger />}></Route>
                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute role={ADMIN_ROLE}>
                            <AdminDashBoard />
                        </ProtectedRoute>
                    }
                ></Route>
            </Routes>
        </>
    );
};

export default AppRoutes;
