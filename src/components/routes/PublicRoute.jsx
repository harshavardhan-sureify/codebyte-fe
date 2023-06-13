import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { auth, isLoggedIn } from "../features/User.reducer";

const PublicRoute = () => {
    const authenticated = useSelector(isLoggedIn);
    const user = useSelector(auth);
    return !authenticated ? (
        <Outlet />
    ) : (
        <Navigate to={`/${user.role}/dashboard`} replace />
    );
};

export default PublicRoute;
