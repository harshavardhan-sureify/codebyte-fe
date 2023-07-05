import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signUp } from "../constants";
import axios from "axios";
import { theme } from "../themes/theme";
import CancelIcon from "@mui/icons-material/Cancel";
import {
    Alert,
    Avatar,
    Button,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    Typography,
} from "@mui/material";

import React, { useState } from "react";
import { MyTextField } from "./Styles";
import profileImage from "../assets/images/profileImage.png";
import { ImagePaper, ImageText } from "./Styles";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "./features/User.reducer";
import { handleToaster } from "./features/Toaster.reducer";
let message = "";

const initialize = () => {
    return {
        name: "",
        email: "",
        password: "",
        cpassword: "",
    };
};
const SignupPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [signUpForm, setSignUpForm] = useState(initialize());
    const [error, setErrors] = useState({});
    const [seePassword, setSeePassword] = useState(false);

    const sendSignUpDataToServer = async (signUpdata) => {
        try {
            const postData = { ...signUpdata };
            delete postData.cpassword;
            const res = await axios.post(signUp, postData);

            if (res.status === 200) {
                const data = res.data.data;
                dispatch(login(data));
                dispatch(
                    handleToaster({
                        message: "Signed up successfully",
                        severity: "success",
                        open: true,
                    })
                );
                setTimeout(() => {
                    navigate(`/${data.role}/dashboard`);
                }, 2000);
            }
        } catch (err) {
            let message = "";
            if (err.response) {
                const payload = err.response.data;

                if (payload.status === 400 && payload.data.error) {
                    message = payload.data.error;
                } else if (payload.status === 400) {
                    let msg = "";
                    for (let i in payload.data) {
                        msg += payload.data[i] + "\n";

                        message = msg;
                    }
                } else {
                    message = "Something went wrong";
                }
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

    const handleChange = (e) => {
        setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
        validations(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const temp = {};
        for (let i in signUpForm) {
            temp[i] = validations(i, signUpForm[i]);
        }
        setErrors({ ...error, ...temp });
        for (let i in temp) {
            if (temp[i] !== "") {
                return;
            }
        }
        sendSignUpDataToServer(signUpForm);
    };

    const validations = (clickedField, value) => {
        message = "";
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
            case "cpassword":
                if (!value) {
                    message = " Confirm password is required";
                } else if (value !== signUpForm.password) {
                    message = "Password not match";
                }
                break;
            default:
        }

        setErrors({ ...error, [clickedField]: message });
        return message;
    };

    return (
        <Grid
            sx={{
                backgroundColor: theme.palette.bColor.main,
                minHeight: "91vh",
            }}
        >
            <Grid
                container
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    maxHeight: "400px",
                }}
            >
                <Grid item xs={6} md={6} lg={4} mt={5}>
                    <ImagePaper elevation={3} align={"center"}>
                        <img
                            src={profileImage}
                            alt=""
                            width="100px"
                            height="100px"
                        />
                        {/* <ImageText variant="h6"></ImageText> */}
                        <ImageText variant="h6">
                            Get started by creating an account
                        </ImageText>
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

                        <Avatar
                            sx={{
                                backgroundColor: theme.palette.secondary.main,
                                marginTop: "8px",
                            }}
                        ></Avatar>
                        <Typography variant="h5">Sign up</Typography>
                        <Typography variant="caption">
                            Create your CodeByte Account
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid>
                                <MyTextField
                                    fullWidth
                                    label="Name"
                                    placeholder="Enter your Name"
                                    onChange={handleChange}
                                    name="name"
                                    value={signUpForm.name}
                                    error={!!error.name}
                                    helperText={error.name}
                                    size="small"
                                >
                                    {" "}
                                </MyTextField>

                                <MyTextField
                                    fullWidth
                                    label="Email"
                                    placeholder="Enter your Email"
                                    onChange={handleChange}
                                    name="email"
                                    value={signUpForm.email}
                                    error={!!error.email}
                                    helperText={error.email}
                                    size="small"
                                >
                                    {" "}
                                </MyTextField>

                                <MyTextField
                                    fullWidth
                                    type={seePassword ? "text" : "password"}
                                    label="Password"
                                    placeholder="Enter your password"
                                    onChange={handleChange}
                                    name="password"
                                    size="small"
                                    value={signUpForm.password}
                                    error={!!error.password}
                                    helperText={error.password}
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
                                ></MyTextField>
                                <MyTextField
                                    fullWidth
                                    type="password"
                                    label="Confirm Password"
                                    placeholder="Enter your Password"
                                    onChange={handleChange}
                                    name="cpassword"
                                    value={signUpForm.cpassword}
                                    error={!!error.cpassword}
                                    helperText={error.cpassword}
                                    size="small"
                                ></MyTextField>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    sx={{
                                        padding: "11px 0px",
                                        marginBottom: "9px",
                                    }}
                                >
                                    Create account
                                </Button>
                                <Typography variant="p">
                                    Already have account?{" "}
                                    <Link
                                        style={{ textDecoration: "none" }}
                                        to="/login"
                                    >
                                        Login
                                    </Link>
                                </Typography>
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default SignupPage;
