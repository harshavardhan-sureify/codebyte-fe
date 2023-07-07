import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddUser from "./AddUser";
import { useDispatch } from "react-redux";
import { handleToaster } from "../features/Toaster.reducer";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(0),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(0),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function AddUserButton({ refetch }) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleToasters = () => {
        setOpen(false);
        dispatch(
            handleToaster({
                message: "User added successfully",
                severity: "success",
                open: true,
            })
        );
        refetch();
    };

    return (
        <div>
            <Button
                variant="contained"
                color="success"
                onClick={handleClickOpen}
            >
                Add User
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                    sx={{ borderRadius: 1 }}
                ></BootstrapDialogTitle>
                <AddUser toast={handleToasters} />
            </BootstrapDialog>
        </div>
    );
}
