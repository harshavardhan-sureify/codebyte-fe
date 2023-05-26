import { Visibility, VisibilityOff } from "@mui/icons-material";
import { GO_BASE_URL} from "../constants";
import { theme } from "../themes/theme";
import {
  Alert,
  AppBar,
  Avatar,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { SignUpTextField } from "./styles";
import profileImage from "../images/profileImage.png";
import logo from "../images/logo.png";
import { ImagePaper } from "./styles";
import { ImageText } from "./styles";
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
  const [signUpForm, setSignUpForm] = useState(initialize());
  const [error, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState("");
  const [seePassword, setSeePassword] = useState(false);

  const sendSignUpDataToServer = async (data) => {
    try {
      delete data.cpassword;
      const res = await fetch(GO_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
      }
    } catch (err) {}
  };

  const handleChange = (e) => {
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
    validations(e.target.name, e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(error).length != 4) {
      if (Object.keys(error).length == 0) {
        setSubmitStatus("Please fill the form ");
        return;
      }
      setSubmitStatus("Please fill the form Properly");
      return;
    } else {
      for (let i in error) {
        if (error[i].length != 0) {
          setSubmitStatus("Please fill the form properly");

          return;
        }
      }
    }
    setSubmitStatus("");
    sendSignUpDataToServer(signUpForm);
  };
  const validations = (clickedField, value) => {
    message = "";

    switch (clickedField) {
      case "name":
        if (!value) {
          message = "Name is required";
        } else if (value.length < 3) {
          message = "Name should have atleast length 3";
        } else {
          message = "";
        }
        break;

      case "email":
        if (!value) {
          message = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          message = "Email is not valid";
        }
        break;
      case "password":
        if (!value) {
          message = "Password is required";
        } else if (value.length < 8) {
          message = "Password length should be atleast 8";
        } else if (
          !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])/.test(value)
        ) {
          message =
            "Password must contain atleast one upper,one lower,one digit and one special character";
        }
        break;
      case "cpassword":
        if (!value) {
          message = " Confirm password is required";
        } else if (value != signUpForm.password) {
          message = "Password not match";
        }
        break;
    }

    setErrors({ ...error, [clickedField]: message });
  };

  return (
    <Grid
      sx={{
        backgroundColor: theme.palette.bColor.main,
        minHeight: "100vh",
      }}
    >
      <AppBar position="sticky">
        <Toolbar>
          <img src={logo} alt="" width="32px" heigth="32px" />
          <Typography variant="h5" sx={{ marginLeft: "5px" }}>
            CodeByte
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item xs={6} md={6} lg={4}>
          <ImagePaper elevation={3} align={"center"}>
            <img src={profileImage} alt="" width="100px" height="100px" />
            <ImageText variant="h6">Hey,User</ImageText>
            <ImageText variant="h6">
              Get started by creating an account
            </ImageText>
          </ImagePaper>
        </Grid>
        <Grid item xs={6} md={6} lg={4}>
          <Paper
            elevation={3}
            sx={{ padding: "2px 15px", margin: "20px 0px", height: "100%" }}
            align={"center"}
          >
            {submitStatus && (
              <Alert severity="error">
                <strong>{submitStatus} </strong>
              </Alert>
            )}
            <Avatar
              sx={{
                backgroundColor: theme.palette.success.main,
                marginTop: "8px",
              }}
            ></Avatar>
            <Typography variant="h5">Sign up</Typography>
            <Typography variant="caption">
              Create your CodeByte Account
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid>
                <SignUpTextField
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
                </SignUpTextField>

                <SignUpTextField
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
                </SignUpTextField>

                <SignUpTextField
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
                          onClick={() => setSeePassword(!seePassword)}
                        >
                          {seePassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                >
                  {" "}
                </SignUpTextField>
                <SignUpTextField
                  fullWidth
                  type="password"
                  label="Confirm Password"
                  placeholder="Enter your Pasword"
                  onChange={handleChange}
                  name="cpassword"
                  value={signUpForm.cpassword}
                  error={!!error.cpassword}
                  helperText={error.cpassword}
                  size="small"
                ></SignUpTextField>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ padding: "11px 0px", marginBottom: "9px" }}
                >
                  Create account
                </Button>
                <Typography variant="p">
                  Already have account? <a href="">Signin</a>
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
