import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignupPage from "../SignupPage";
import PollCreate from "../admin/PollCreation";
import Trigger from "../admin/Trigger";
import LoginPage from "../LoginPage";
import { LandingPage } from "../user/LandingPage";
import { ActivePolls } from "../user/ActivePolls";
import { AnsweredPolls } from "../user/AnsweredPolls";
import { ViewSinglePoll } from "../user/ViewSinglePoll";
import NavBar from "../NavBar";
import { PageNotFound } from "../user/PageNotFound";
import { ADMIN_ROLE, USER_ROLE } from "../../constants";
import AdminDashBoard from "../admin/AdminDashBoard";
import { AppBar, Toolbar, Typography } from "@mui/material";
import ProtectedRoute from "./ProtectedRoute";
import { auth, isLoggedIn } from "../features/User.reducer";
import { useSelector } from "react-redux";
import PublicRoute from "./PublicRoute";

const AppRoutes = () => {
     const user = useSelector(auth);
     const islogIn = useSelector(isLoggedIn);
    return (
        <>
            <NavBar />
            <Routes>
                <Route element={<PublicRoute />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                    {user.role === ADMIN_ROLE && (
                        <Route path="/admin" element={<LandingPage/>}>
                            <Route
                                path="dashboard"
                                element={<AdminDashBoard />}
                            />
                            <Route
                                path="create"
                                element={<PollCreate />}
                            />
                            <Route
                                path="trigger"
                                element={<Trigger />}
                            />
                        </Route>
                    )}
                    {user.role === USER_ROLE && (
                      
                        <Route path="/user" element={<LandingPage />}>
                            {/* <Route index element={<PageNotFound />} /> */}
                            <Route path="dashboard" element={<ActivePolls />} />
                            <Route
                                path="dashboard/:id"
                                element={<ViewSinglePoll />}
                            />
                            <Route
                                path="answeredpolls"
                                element={<AnsweredPolls />}
                            />
                            <Route
                                path="answeredpolls/:id"
                                element={<ViewSinglePoll />}
                            />
                        </Route>
                    )}
                </Route>
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </>
    );
};

export default AppRoutes;
