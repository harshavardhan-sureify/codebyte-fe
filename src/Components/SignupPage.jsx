import { useTheme } from "@emotion/react";
import { DataArray, Visibility, VisibilityOff } from "@mui/icons-material";
import { signUrl } from "../constants";
import {
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
var message = "";

const paperStyle = {
  padding: "15px",
  margin: "20px 0px",
};
const textField = {
  margin: "8px 0px",
};
const initialize = () => {
  return {
    name: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  };
};
const SignupPage = () => {
  const theme = useTheme();
  const [signUpForm, setSignUpForm] = useState(initialize());
  const [error, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState("");
  const [seePassword, setSeePassword] = useState(false);

  const sendSignUpDataToServer = async (data) => {
    console.log(data,"what a drag")
    try {
      delete data.cpassword
      const res = await fetch(signUrl, {
        method: "POST",
        headers: { "Content-Type": 'application/json' },
        body:JSON.stringify(data)
      })
      if (res.ok) {
        alert("submitted")
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
    validations(e.target.name, e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(error).length != 5) {
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
    sendSignUpDataToServer(signUpForm)
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
          message = "password length should be atleast 8";
        } else if (
          !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])/.test(value)
        ) {
          message =
            "Passwors must contain atleast one upper,one lower,one digit and one special character";
        }
        break;
      case "cpassword":
        if (!value) {
          message = " Confirm Password is required";
        } else if (value != signUpForm.password) {
          message = "password not match";
        }
        break;
      case "mobile":
        if (!value) {
          message = " mobile no. is required";
        } else if (!/^\d{10}$/.test(value)) {
          message = "mobile no. should have 10 digits";
        } else if (!/^[9,8,7,6]\d{9}$/.test(value)) {
          message =
            "Mobile number should contain only digits and must start with 9,8,7 or 6";
        }
        break;
    }

    setErrors({ ...error, [clickedField]: message });
  };

  return (
    <Grid sx={{ backgroundColor: "#f7f5ff", minHeight: "100vh" }}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h5">Polls-App</Typography>
        </Toolbar>
      </AppBar>
      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={3} style={paperStyle} align={"center"}>
            {submitStatus && (
              <Typography variant="p" color="error">
                {submitStatus}
              </Typography>
            )}
            <Avatar
              sx={{ backgroundColor: theme.palette.success.main }}
            ></Avatar>
            <Typography variant="h5">Sign up</Typography>
            <Typography variant="caption">
              Create your Poll-App Account
            </Typography>
            <form method="post" onSubmit={handleSubmit}>
              <Grid>
                <TextField
                  fullWidth
                  label="Name"
                  placeholder="Enter your Name"
                  sx={textField}
                  onChange={handleChange}
                  name="name"
                  value={signUpForm.name}
                  error={error.name}
                  helperText={error.name}
                >
                  {" "}
                </TextField>
                <TextField
                  fullWidth
                  label="Email"
                  placeholder="Enter your Email"
                  sx={textField}
                  onChange={handleChange}
                  name="email"
                  value={signUpForm.email}
                  error={error.email}
                  helperText={error.email}
                >
                  {" "}
                </TextField>
                <TextField
                  fullWidth
                  label="Mobile"
                  placeholder="Enter your Mobile"
                  sx={textField}
                  onChange={handleChange}
                  name="mobile"
                  value={signUpForm.mobile}
                  error={error.mobile}
                  helperText={error.mobile}
                >
                  {" "}
                </TextField>
                <TextField
                  fullWidth
                  type={seePassword ? "text" : "password"}
                  label="Password"
                  placeholder="Enter your password"
                  sx={textField}
                  onChange={handleChange}
                  name="password"
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
                </TextField>
                <TextField
                  fullWidth
                  type="password"
                  label="Confirm Password"
                  placeholder="Enter your Pasword"
                  sx={textField}
                  onChange={handleChange}
                  name="cpassword"
                  value={signUpForm.cpassword}
                  error={error.cpassword}
                  helperText={error.cpassword}
                ></TextField>
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
