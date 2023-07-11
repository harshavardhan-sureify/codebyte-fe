import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Box, DialogTitle } from "@mui/material";
import axios from "axios";
import { DELETE_POLL_URL } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../features/User.reducer";
import { handleToaster } from "../features/Toaster.reducer";
import { useNavigate } from "react-router-dom";

export const DialogComponent = ({ title, id, open, handleClose }) => {
    const user = useSelector(auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = () => {
        handleClose();
        handleDelete();
    };
    const handleToast = (message, color) => {
        dispatch(
            handleToaster({
                message,
                severity: color,
                open: true,
            })
        );
    };
    const handleDelete = async () => {
        try {
            const token = user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.delete(DELETE_POLL_URL + id, config);
            if (response.status === 200) {
                handleToast("Poll deleted successfully", "success");
                setTimeout(() => {
                    navigate("activepolls");
                }, 1000);
            }
        } catch (err) {
            const message = err.response.data.message;
            handleToast(message, "error");
        }
    };
    return (
        <Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you really want to delete this poll?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        color="error"
                        size="small"
                    >
                        No
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="success"
                        size="small"
                        autoFocus
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
