import {
    Avatar,
    Button,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import axios from "axios";
import LockIcon from "@mui/icons-material/Lock";
import React, { useState } from "react";
import { theme } from "../themes/theme";
import profileImage from "../assets/images/profileImage.png";
import { ImagePaper, ImageText } from "./Styles";
import { MyTextField } from "./Styles";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../constants";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { login } from "./features/User.reducer";
import { handleToaster } from "./features/Toaster.reducer";
const intitialize = () => {
    return {
        email: "",
        password: "",
    };
};
const LoginPage = () => {
    const dispatch = useDispatch();
    const [loginForm, setLoginForm] = useState(intitialize());
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [seePassword, setSeePassword] = useState(false);
    const [notFound, setNotFound] = useState("");
    const themee = useTheme();
    const isSmAndBelow = useMediaQuery(themee.breakpoints.down("sm"));
    const sendDataToServer = (data) => {
        const postData = { ...data };
        for (let i in postData) {
            postData[i] = postData[i].trim();
        }
        axios
            .post(LOGIN_URL, postData)
            .then((res) => {
                const data = res.data.data;
                dispatch(login(data));
                navigate(`${data.role}/dashboard`);
            })
            .catch((err) => {
                if (err.response) {
                    const payload = err.response.data;
                    if (payload.status === 400) {
                        setErrors({
                            ...errors,
                            password: payload.message,
                        });
                    } else if (payload.status === 404) {
                        setNotFound(payload.message);
                    } else {
                        dispatch(
                            handleToaster({
                                message: "Something went wrong",
                                severity: "error",
                                open: true,
                            })
                        );
                    }
                }
            });
    };

    const handleChange = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
        validations(e.target.name, e.target.value);
        setNotFound("");
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const temp = {};
        for (let i in loginForm) {
            temp[i] = validations(i, loginForm[i]);
        }
        setErrors({ ...errors, ...temp });
        for (let i in temp) {
            if (temp[i] !== "") {
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
        setErrors({ ...errors, [name]: message });
        return message;
    };
    return (
        <Grid
            sx={{
                backgroundColor: theme.palette.bColor.main,
                height:"90vh"
            }}
        >
            <Grid container sx={{ display: "flex", justifyContent: "center" }}>
                <Grid
                    item
                    xs={6}
                    md={6}
                    lg={4}
                    mt={5}
                    sx={{ display: isSmAndBelow ? "none" : "block" }}
                >
                    <ImagePaper elevation={3} align={"center"}>
                        <img
                            src={profileImage}
                            alt=""
                            width="100px"
                            height="100px"
                        />
                        <ImageText variant="h6">Welcome Back!</ImageText>
                    </ImagePaper>
                </Grid>
                <Grid item xs={isSmAndBelow ? 10 : 6} md={6} lg={4} mt={5}>
                    <Paper
                        elevation={3}
                        sx={{
                            padding: "2px 15px",
                            margin: "20px 0px",
                            height: "100%",
                        }}
                        align={"center"}
                    >
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
                        {notFound && (
                            <Typography
                                variant="subtitle1"
                                color="error"
                                component="div"
                            >
                                {notFound}
                            </Typography>
                        )}
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
                                color="secondary"
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    padding: "8.3px 0px",
                                    marginBottom: "9px",
                                    marginTop: "6px",
                                }}
                            >
                                Login
                            </Button>
                            <Typography variant="body2">
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
