import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddUser from "./AddUser";
import AddIcon from "@mui/icons-material/Add";
import { Alert, Snackbar } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

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

export default function AddUserButton() {
    const [open, setOpen] = React.useState(false);
    const [msg,setMsg]=React.useState("")

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleToaster=()=>{
        setOpen(false);
        setMsg("user added successfully")
    }

    return (
        <div>
            {msg&& (
                <Snackbar
                    open={msg}
                    autoHideDuration={3200}
                    sx={{ paddingTop: "43px" }}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    onClose={() => setMsg("")}
                >
                    <Alert
                        severity="success"
                        variant="standard"
                        action={
                            <IconButton
                                size="small"
                                aria-label="close"
                                color="inherit"
                                onClick={() => setMsg("")}
                            >
                                <CancelIcon></CancelIcon>
                            </IconButton>
                        }
                    >
                        {msg}
                    </Alert>
                </Snackbar>
            )}
            <Button
                variant="contained"
                color="success"
                onClick={handleClickOpen}
                sx={
                    {mr:4}
                }
            >
               Add User
               <AddIcon fontSize="small"/>

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
                <AddUser toast={handleToaster}/>
            </BootstrapDialog>
        </div>
    );
}
