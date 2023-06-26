import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn, logout } from "../features/User.reducer";
import { useEffect, useState } from "react";
import { Box, Button, Card, Modal, Typography } from "@mui/material";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
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
                <Box>
                    <Modal
                        open={showPopup}
                        onClose={handleConfirm}
                        sx={{
                            height: "100vh",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Card
                            sx={{ background: "white", width: "350px", p: 2 }}
                        >
                            <AccessTimeFilledIcon color="secondary" />
                            <Typography>
                                Your Session expired please login again
                            </Typography>
                            <Button
                                onClick={handleConfirm}
                                variant="contained"
                                color="secondary"
                                sx={{ mt: 2 }}
                            >
                                go to login
                            </Button>
                        </Card>
                    </Modal>
                </Box>
            );
        }
        return <Outlet />;
    } else {
        return <Navigate to="/login" replace />;
    }
};
export default ProtectedRoute;
