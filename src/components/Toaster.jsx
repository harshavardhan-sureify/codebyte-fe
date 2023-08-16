import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toaster, closeToaster } from "./features/Toaster.reducer";

const Toaster = () => {
    const toast = useSelector(toaster);
    const dispatch = useDispatch();
    const handleToastClose = () => {
        dispatch(
            closeToaster({
                severity: "success",
                message: "",
                open: false,
            })
        );
    };
    return (
        <Snackbar
            open={toast.open}
            autoHideDuration={2000}
            onClose={handleToastClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            sx={{ paddingTop: "43px" }}
        >
            <Alert
                onClose={handleToastClose}
                severity={toast.severity ? toast.severity : "info"}
                sx={{ width: "100%" }}
            >
                {toast.message}
            </Alert>
        </Snackbar>
    );
};

export default Toaster;
