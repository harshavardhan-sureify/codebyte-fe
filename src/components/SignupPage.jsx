import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signUp } from "../constants";
import axios from "axios";
import { theme } from "../themes/theme";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Alert,
  AppBar,
  Avatar,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  Toolbar,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
import { MyTextField } from "./Styles";
import logo from "../assets/images/logo.png";
import profileImage from "../assets/images/profileImage.png";
import { ImagePaper, ImageText } from "./Styles";

import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [responseStatus, setResponseStatus] = useState("");

  const sendSignUpDataToServer = async (signUpdata) => {
    try {
      const postData = { ...signUpdata };
      delete postData.cpassword;
      const res = await axios.post(signUp, postData);

      if (res.status === 200) {
        const data = res.data.data;

        localStorage.setItem("userToken", data.token);
        localStorage.setItem("role", data.role);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response) {
        const payload = err.response.data;

        if (payload.status === 400 && payload.data.error) {
          setResponseStatus(payload.data.error);
        } else if (payload.status === 400) {
          let msg = "";
          for (let i in payload.data) {
            msg += payload.data[i] + "\n";

            setResponseStatus(msg);
          }
        } else {
          setResponseStatus("Something went wrong");
        }
        setOpen(true);
      }
    }
  };

  const handleChange = (e) => {
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
    validations(e.target.name, e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(error).length !== 4) {
      if (Object.keys(error).length === 0) {
        setSubmitStatus("Please fill the form ");
        return;
      }
      setSubmitStatus("Please fill the form Properly");
      return;
    } else {
      for (let i in error) {
        if (error[i].length !== 0) {
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
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
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
          !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])/.test(value)
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
  };

  return (
      <Grid
          sx={{
              minHeight: "100vh",
          }}
      >
          {responseStatus && (
              <Snackbar
                  open={open}
                  autoHideDuration={3200}
                  sx={{ paddingTop: "43px" }}
                  anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                  }}
                  onClose={() => setOpen(false)}
              >
                  <Alert
                      severity="error"
                      action={
                          <IconButton
                              size="small"
                              aria-label="close"
                              color="inherit"
                              onClick={() => setOpen(false)}
                          >
                              <CancelIcon></CancelIcon>
                          </IconButton>
                      }
                  >
                      {responseStatus}
                  </Alert>
              </Snackbar>
          )}
          <Grid container sx={{ display: "flex", justifyContent: "center" }}>
              <Grid item xs={6} md={6} lg={4} mt={5}>
                  <ImagePaper elevation={3} align={"center"}>
                      <img
                          src={profileImage}
                          alt=""
                          width="100px"
                          height="100px"
                      />
                      <ImageText variant="h6">Hey,User</ImageText>
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
                                      to="/"
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
