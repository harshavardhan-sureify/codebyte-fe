import {
    Alert,
    Box,
    Button,
    Card,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../features/User.reducer";
import { login } from "../features/User.reducer";
import { handleToaster } from "../features/Toaster.reducer";
import {
    CONFIRM_USER_URL,
    UPDATE_PROFILE_URL,
    USER_INFO_URL,
} from "../../constants";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Profile = () => {
    const [open, setOpen] = useState(false);
    const [enabled, setEnabled] = useState(false);
    const [password, setPassword] = useState("");
    const user = useSelector(auth);
    const [errors, setErrors] = useState({});
    const [enableField, setEnableField] = useState(false);
    const [seePassword, setSeePassword] = useState(false);
    const dispatch = useDispatch();
    const [userData, setuserData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [submitResponse, setSubmitResponse] = useState("");
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setPassword("");
        setSubmitResponse("");
    };
    const handleChange = (event) => {
        setuserData({ ...userData, [event.target.name]: event.target.value });
        validations(event.target.name, event.target.value);
    };
    const validations = (clickedField, value) => {
        let message = "";
        value = value.trim();
        switch (clickedField) {
            case "name":
                if (!value) {
                    message = "Name is required";
                } else if (value.length < 3) {
                    message = "Name should contain atleast 3 characters";
                } else if (!/^[A-Za-z\s]+$/.test(value)) {
                    message = "Name should not have digits";
                } else {
                    message = "";
                }
                break;

            case "email":
                if (!value) {
                    message = "Email is required";
                } else if (
                    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                        value
                    )
                ) {
                    message = "Email is not valid";
                }
                break;
            case "password":
                if (!value) {
                    message = "Password is required";
                } else if (value.length < 8) {
                    message = "Password length should be atleast 8 characters";
                } else if (
                    !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])/.test(
                        value
                    )
                ) {
                    message =
                        "Password must contain atleast one upper,one lower,one digit and one special character";
                }
                break;
            default:
        }

        setErrors({ ...errors, [clickedField]: message });
    };
    const updateUserDetails = async (data) => {
        let message = "";
        for (let i in data) {
            data[i] = data[i].trim();
        }
        try {
            const res = await axios.put(UPDATE_PROFILE_URL, data, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            if (res.status === 200) {
                message = "Updated successfully";
                handleCancel();
                dispatch(
                    handleToaster({
                        message,
                        severity: "success",
                        open: true,
                    })
                );
                dispatch(
                    login({
                        name: userData.name,
                        role: user.role,
                        token: user.token,
                    })
                );
            }
        } catch (error) {
            if (error.response.data.status === 400) {
                const payload = error.response.data;
                if (payload.data === null) {
                    setSubmitResponse(payload.message);
                    let msg = payload.message;
                    if (msg.toLowerCase().includes("email")) {
                        setErrors({ ...errors, email: msg });
                    } else {
                        setErrors({ ...errors, password: msg });
                    }
                } else {
                    let msg = "";
                    for (let i in payload.data) {
                        msg += payload.data[i] + "\n";
                    }
                    setSubmitResponse(msg);
                }
            } else {
                message = error.response.data.message;
                dispatch(
                    handleToaster({
                        message,
                        severity: "error",
                        open: true,
                    })
                );
            }
        }
    };
    const handleSubmit = () => {
        const n = Object.keys(errors).length;
        if (n === 0) {
            setSubmitResponse("Please make your changes ");
            return;
        }
        const data = {};
        for (let i in errors) {
            if (errors[i].length !== 0) {
                return;
            } else {
                data[i] = userData[i];
            }
        }
        updateUserDetails(data);
    };
    const handleCancel = () => {
        setEnabled(false);
        fetchUserDetails();
        setErrors({});
        setSubmitResponse("");
        setEnableField(false);
        setSeePassword(false);
    };

    const handlePasswordSubmit = async () => {
        const data = { oldpassword: password };
        let message = "";
        try {
            const res = await axios.post(CONFIRM_USER_URL, data, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            if (res.status === 200) {
                setEnabled(true);
                handleClose();
                setPassword("");
            }
        } catch (error) {
            if (error.response.data.status === 400) {
                setSubmitResponse(error.response.data.message);
            } else {
                message = error.response.data.message;
                dispatch(
                    handleToaster({
                        message,
                        severity: "error",
                        open: true,
                    })
                );
            }
            setPassword("");
        }
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setSubmitResponse("");
    };
    const fetchUserDetails = async () => {
        try {
            const res = await axios.get(USER_INFO_URL, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            if (res.status === 200) {
                setuserData({ ...res.data.data.user, password: "" });
            }
        } catch (error) {
            setSubmitResponse(error.response.data.error);
        }
    };
    useEffect(() => {
        fetchUserDetails();
        // eslint-disable-next-line
    }, []);

    return (
        <Box sx={{ height: "85vh" }}>
            <Grid
                sx={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Grid item xs={12} lg={6} sx={{ width: "330px" }}>
                    <Card sx={{ width: "100%", padding: "21px" }} elevation={3}>
                        <Stack direction="column" gap={3}>
                            {submitResponse.includes("Please") && enabled && (
                                <Alert severity="error">{submitResponse}</Alert>
                            )}

                            <Typography variant="h6">Profile Info</Typography>
                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>Confirm its you!!</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Enter your password
                                    </DialogContentText>
                                    <TextField
                                        size="small"
                                        type="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        error={!!(open && submitResponse)}
                                        helperText={submitResponse}
                                    ></TextField>
                                    <Stack
                                        direction={"row"}
                                        gap={2}
                                        justifyContent={"end"}
                                        mt={1}
                                    >
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="error"
                                            onClick={handleClose}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="success"
                                            onClick={handlePasswordSubmit}
                                        >
                                            Submit
                                        </Button>
                                    </Stack>
                                </DialogContent>
                            </Dialog>

                            <TextField
                                label="Name"
                                name="name"
                                value={userData.name}
                                disabled={!enabled}
                                onChange={handleChange}
                                error={!!errors.name}
                                helperText={errors.name}
                            ></TextField>
                            <TextField
                                label="Email"
                                name="email"
                                value={userData.email}
                                disabled={!enabled}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email}
                            ></TextField>
                            {!enableField && (
                                <Button
                                    size="small"
                                    onClick={() => setEnableField(true)}
                                    disabled={!enabled}
                                >
                                    Click to change password
                                </Button>
                            )}
                            {enableField && (
                                <TextField
                                    type={seePassword ? "text" : "password"}
                                    label="Password"
                                    name="password"
                                    value={userData.password}
                                    disabled={!enabled}
                                    onChange={handleChange}
                                    error={!!errors.password}
                                    helperText={errors.password}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() =>
                                                        setSeePassword(
                                                            !seePassword
                                                        )
                                                    }
                                                >
                                                    {seePassword ? (
                                                        <Visibility />
                                                    ) : (
                                                        <VisibilityOff />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                ></TextField>
                            )}
                            <Stack
                                direction={"row"}
                                justifyContent={"end"}
                                gap={1}
                            >
                                {!enabled ? (
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={handleOpen}
                                        color="secondary"
                                    >
                                        Update
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="error"
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="success"
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                        </Button>
                                    </>
                                )}
                            </Stack>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Profile;
