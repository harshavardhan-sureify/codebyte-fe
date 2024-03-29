import { Person } from "@mui/icons-material";
import {
    TextField,
    Paper,
    Avatar,
    Typography,
    Button,
    Alert,
    Box,
} from "@mui/material";
import React, { useState } from "react";
import { ADD_USER_URL } from "../../constants";
import axios from "axios";
import { auth } from "../features/User.reducer";
import { useDispatch, useSelector } from "react-redux";
import { handleToaster } from "../features/Toaster.reducer";
const initialize = () => {
    return {
        name: "",
        email: "",
    };
};
const regex = {
    name: { length: 3, expresion: /^[A-Za-z][A-Za-z\s]{2,}$/ },
    email: {
        length: 0,
        expresion: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
};
const messages = {
    name: {
        length: "Name should consist of atleast 3 characters",
        expresion: "Name should consists of only characters",
    },
    email: { expresion: "Please enter a valid email address" },
};
const AddUser = ({ toast }) => {
    const user = useSelector(auth);
    const dispatch = useDispatch();
    const [addUserForm, setAddUserForm] = useState(initialize());
    const [error, setErrors] = useState({});
    const [submitStatus, setSubmitStatus] = useState("");
    const [msg, setMsg] = useState("");
    const [button, setButton] = useState(false);

    const validate = (value, name) => {
        if (!value) {
            if (name === "name") {
                return "Enter valid Name";
            }
            return "Enter valid Email";
        } else if (value.length < regex[name]["length"]) {
            return messages[name]["length"];
        } else if (!regex[name]["expresion"].test(value)) {
            return messages[name]["expresion"];
        }
        return "";
    };
    const postData = async (dataObj) => {
        let message = "";
        let severity = "";
        for (let i in dataObj) {
            dataObj[i] = dataObj[i].trim();
        }
        try {
            const token = user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.post(ADD_USER_URL, dataObj, config);
            if (res.status === 200) {
                message = res.data.message;
                severity = "success";
                toast();
            }
        } catch (err) {
            severity = "error";
            if (err.response.data.status === 500) {
                message = "Internal Server Error";
                dispatch(
                    handleToaster({
                        severity,
                        message,
                        open: true,
                    })
                );
            } else {
                setMsg(err.response.data.message);
            }
        } finally {
            setButton(false);
        }
    };

    const handleChange = (e) => {
        setAddUserForm({ ...addUserForm, [e.target.name]: e.target.value });
        validations(e.target.value, e.target.name);
        setMsg("");
        setSubmitStatus("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        var temp = {};
        for (let x in addUserForm) {
            temp[x] = validate(addUserForm[x], x);
        }

        setErrors({ ...error, ...temp });

        if (Object.keys(error).length !== 2) {
            if (Object.keys(error).length === 0) {
                setSubmitStatus("Please fill the form ");
                return;
            }
            setSubmitStatus("Enter valid details");
            return;
        } else {
            for (let i in error) {
                if (error[i].length !== 0) {
                    setSubmitStatus("Enter valid details");
                    return;
                }
            }
        }
        setSubmitStatus("");
        postData(addUserForm);
        setButton(true);
    };

    const validations = (value, name) => {
        const errorMessage = validate(value, name);
        setErrors({ ...error, [name]: errorMessage });
    };

    return (
        <Paper
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 4,
                maxWidth: 350,
                pt: 1,
                boxShadow: "none",
                borderRadius: "8px",
            }}
            size="small"
        >
            {submitStatus && (
                <Alert severity="error" sx={{ mb: 0.5 }}>
                    <strong>{submitStatus} </strong>
                </Alert>
            )}
            <form onSubmit={handleSubmit} method="POST">
                <Avatar
                    sx={{
                        bgcolor: "secondary.main",
                        mr: "auto",
                        ml: "auto",
                    }}
                >
                    <Person />
                </Avatar>
                <Typography sx={{ mt: 1, textAlign: "center", mb: 1 }}>
                    Add User
                </Typography>
                {msg && msg !== "Internal server error" && (
                    <Typography
                        variant="subtitle1"
                        component="div"
                        color="error"
                        sx={{ textAlign: "center" }}
                    >
                        {msg}
                    </Typography>
                )}

                <TextField
                    sx={{ mt: 1, mb: 1, border: 0 }}
                    label="Name"
                    placeholder="Enter your Name"
                    onChange={handleChange}
                    name="name"
                    fullWidth
                    value={addUserForm.name}
                    error={error.name ? true : false}
                    helperText={error.name}
                    size="small"
                    disabled={button}
                />
                <TextField
                    sx={{ mt: 1, mb: 1 }}
                    label="Email"
                    fullWidth
                    placeholder="Enter your Email"
                    onChange={handleChange}
                    name="email"
                    value={addUserForm.email}
                    error={error.email ? true : false}
                    helperText={error.email}
                    disabled={button}
                    size="small"
                />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "end",
                        mt: 1,
                        gap: 1,
                        px: 0,
                    }}
                >
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={button}
                        sx={{
                            height: 40,
                        }}
                        size="small"
                        color="secondary"
                    >
                        Add
                    </Button>
                </Box>
            </form>
        </Paper>
    );
};

export default AddUser;
