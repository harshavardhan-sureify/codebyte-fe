import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn, logout } from "../features/User.reducer";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

const ProtectedRoute = () => {
    const dispatch = useDispatch();
    const [showPopup, setShowPopup] = useState(false);
    useEffect(() => {
        const expirationTime = localStorage.getItem("expirationTime");
        const checkSessionExpiration = () => {
            const currentTime = new Date().getTime();
            if (currentTime > expirationTime) {
                setShowPopup(true);
            }
        };
        checkSessionExpiration();
        const interval = setInterval(checkSessionExpiration, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    const handleConfirm = () => {
        dispatch(logout());
        localStorage.removeItem("expirationTime");
        setShowPopup(false);
    };

    const authenticated = useSelector(isLoggedIn);
    if (authenticated) {
        if (showPopup) {
            return (
                <div>
                    hello world<Button onClick={handleConfirm}>confirn</Button>
                </div>
            );
        }
        return <Outlet />;
    } else {
        return <Navigate to="/login" replace />;
    }
};
export default ProtectedRoute;
