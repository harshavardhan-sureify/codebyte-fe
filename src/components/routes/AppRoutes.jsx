import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AddUser from "../AddUser";
import SignupPage from "../SignupPage";
import PollCreate from "../admin/PollCreation";
// import Trigger from "../admin/Trigger";
import LoginPage from "../LoginPage";
import { LandingPage } from "../user/LandingPage";
import { ActivePolls } from "../user/ActivePolls";
import { AnsweredPolls } from "../user/AnsweredPolls";
import { ViewSinglePoll } from "../user/ViewSinglePoll";
import NavBar from "../NavBar";
import { PageNotFound } from "../user/PageNotFound";
// import Trigger from "../Trigger";
import { ADMIN_ROLE, USER_ROLE } from "../../constants";
import AdminDashBoard from "../admin/AdminDashBoard";
import { AppBar, Toolbar, Typography } from "@mui/material";
import logo from "./../../assets/images/logo.png";
import ProtectedRoute from "./ProtectedRoute";
import { auth, isLoggedIn } from "../features/User.reducer";
import { useSelector } from "react-redux";
import PublicRoute from "./PublicRoute";

const AppRoutes = () => {
    return (
        <>
            {/* // <AppBar position="sticky">
                //     <Toolbar>
                //         <img src={logo} alt="" width="32px" heigth="32px" />
                //         <Typography variant="h5" sx={{ marginLeft: "5px" }}>
                //             CodeByte
                //         </Typography>
                //     </Toolbar>
                // </AppBar> */}
            <NavBar />
            <Routes>
                <Route element={<PublicRoute />}>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                    {user.role === ADMIN_ROLE && (
                        <>
                            <Route
                                path="/admin/dashboard"
                                element={<AdminDashBoard />}
                            />
                            <Route
                                path="/admin/create"
                                element={<PollCreate />}
                            />
                            <Route
                                path="/admin/trigger"
                                element={<Trigger />}
                            />
                        </>
                    )}
                    {user.role === USER_ROLE && (
                        <>
                            <Route path="/user" element={<LandingPage />} />
                            <Route
                                path="/user/dashboard"
                                element={<ActivePolls />}
                            />
                            <Route
                                path="/user/dashboard/:id"
                                element={<ViewSinglePoll />}
                            />
                            <Route
                                path="/user/answeredpolls"
                                element={<AnsweredPolls />}
                            />
                            <Route
                                path="answeredpolls/:id"
                                element={<ViewSinglePoll />}
                            />
                        </>
                    )}
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
};

export default AppRoutes;
