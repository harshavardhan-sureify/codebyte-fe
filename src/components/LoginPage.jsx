import {
    Alert,
    AppBar,
    Avatar,
    Button,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    Toolbar,
    Typography,
} from "@mui/material";

import LockIcon from "@mui/icons-material/Lock";
import React, { useState } from "react";
// import { theme } from "../themes/theme";
import logo from "../assets/images/logo.png";
import profileImage from "../assets/images/profileImage.png";
import { ImagePaper, ImageText } from "./Styles";
import { MyTextField } from "./Styles";
import { Link } from "react-router-dom";
import { login } from "../constants";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
const intitialize = () => {
    return {
        email: "",
        password: "",
    };
};
const LoginPage = () => {
    const theme = useTheme();
    const [loginForm, setLoginForm] = useState(intitialize());
    const [errors, setErrors] = useState({});
    const [submitStatus, setSubmitStatus] = useState("");
    const [seePassword, setSeePassword] = useState(false);
    const sendDataToServer = async (data) => {
        try {
            const res = await fetch(login, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (res.status === 200) {
            }
        } catch (error) {}
    };
    const handleChange = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
        validations(e.target.name, e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(errors).length !== 2) {
            if (Object.keys(errors).length === 0) {
                setSubmitStatus("Please enter the details");
            } else setSubmitStatus("Please enter the details properly");
            return;
        }
        for (let i in errors) {
            if (errors[i] !== "") {
                setSubmitStatus("Please enter the details properly");
                return;
            }
        }
        sendDataToServer(loginForm);
    };
    const validations = (name, value) => {
        let message = "";
        value = value.trim();
        switch (name) {
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
                    message = "Password length should be atleast 8";
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
        setErrors({ ...errors, [name]: message });
    };
    return (
        <Grid
            sx={{
                backgroundColor: theme.palette.bColor.main,
                minHeight: "100vh",
            }}
        >
            <Grid
                container
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    
                }}
            >
                <Grid item xs={6} md={6} lg={4} mt={5}>
                    <ImagePaper
                        elevation={3}
                        align={"center"}
                   >
                        <img
                            src={profileImage}
                            alt=""
                            width="100px"
                            height="100px"
                        />
                        <ImageText variant="h6">Hey,User</ImageText>
                        <ImageText variant="h6">Welcome Back!</ImageText>
                    </ImagePaper>
                </Grid>
                <Grid item xs={6} md={6} lg={4} mt={5}>
                    <Paper
                        elevation={3}
                        sx={{
                            padding: "2px 15px",
                            margin: "20px 0px",
                            height: "100%",
                        }}
                        align={"center"}
                    >
                        {submitStatus && (
                            <Alert severity="error">{submitStatus}</Alert>
                        )}
                        <Avatar
                            sx={{
                                backgroundColor: theme.palette.secondary.main,
                                marginTop: "7px",
                            }}
                        >
                            <LockIcon></LockIcon>
                        </Avatar>
                        <Typography variant="h5">Login</Typography>
                        <Typography variant="caption">
                            Login into your account and start answering the
                            polls
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <MyTextField
                                fullWidth
                                label="Email"
                                placeholder="Enter your Email"
                                size="small"
                                name="email"
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email}
                            ></MyTextField>
                            <MyTextField
                                fullWidth
                                label="Password"
                                placeholder="Enter your Password"
                                size="small"
                                type={seePassword ? "text" : "password"}
                                name="password"
                                onChange={handleChange}
                                error={!!errors.password}
                                helperText={errors.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setSeePassword(!seePassword)
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
                            ></MyTextField>
                            <Button
                                type="submit"
                                fullWidth
                                color="secondary"
                                variant="contained"
                                sx={{
                                    padding: "8.3px 0px",
                                    marginBottom: "9px",
                                    marginTop: "6px",
                                }}
                            >
                                Login
                            </Button>
                            <Typography variant="p">
                                <Link
                                    to="/forgotpassword"
                                    style={{ textDecoration: "none" }}
                                >
                                    Forgot password?
                                </Link>
                            </Typography>
                            <Typography variant="body2">
                                Dont have an account?{" "}
                                <Link
                                    to="/signup"
                                    style={{ textDecoration: "none" }}
                                >
                                    Signup
                                </Link>
                            </Typography>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default LoginPage;
