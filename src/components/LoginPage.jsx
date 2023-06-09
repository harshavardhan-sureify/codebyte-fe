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
  Snackbar 
} from "@mui/material";
import axios from "axios";
import LockIcon from "@mui/icons-material/Lock";
import React, { useState } from "react";
import { theme } from "../themes/theme";
import logo from "../assets/images/logo.png";
import profileImage from "../assets/images/profileImage.png";
import { ImagePaper, ImageText } from "./Styles";
import { MyTextField } from "./Styles";
import { Link,useNavigate} from "react-router-dom";
import { login } from "../constants";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
const intitialize = () => {
  return {
    email: "",
    password: "",
  };
};
const LoginPage = () => {
  const [loginForm, setLoginForm] = useState(intitialize());
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState("");
  const navigate=useNavigate();
  const [seePassword, setSeePassword] = useState(false);
  const [open, setOpen] = useState(true);
  const [responseStatus, setResponseStatus] = useState("");
  const [notFound, setNotFound] = useState("");
  const sendDataToServer = async (data) => {
    try {
      const postData = { ...data };
      const res = await axios.post(login,postData)
      if (res.status===200) {
        const data = res.data.data;

        localStorage.setItem("userToken", data.token);
        localStorage.setItem("role", data.role);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response) {
        const payload = err.response.data;
        if(payload.status===400){
          if('error' in payload.data){
            setErrors({...errors,"password":payload.data.error})
          }else{
            setErrors({...errors,...payload.data})
          }
        }
        else if(payload.status===404){
         setNotFound("Invalid details");
        
        }
        else{
          setResponseStatus("Something went wrong");
          setOpen(true);
        }
      }
    }
  };
  const handleChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    validations(e.target.name, e.target.value);
    setSubmitStatus("");
    setNotFound("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(errors['password']==='Incorrect Password '){
      errors['password']="" 
    }
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
            variant="filled"
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
      <AppBar position="sticky">
        <Toolbar>
          <img src={logo} alt="" width="32px" heigth="32px" />
          <Typography variant="h5" sx={{ marginLeft: "5px" }}>
            CodeByte
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item xs={6} md={6} lg={4} mt={5}>
          <ImagePaper elevation={3} align={"center"}>
            <img src={profileImage} alt="" width="100px" height="100px" />
            <ImageText variant="h6">Hey,User</ImageText>
            <ImageText variant="h6">Welcome Back!</ImageText>
          </ImagePaper>
        </Grid>
        <Grid item xs={6} md={6} lg={4} mt={5}>
          <Paper
            elevation={3}
            sx={{ padding: "2px 15px", margin: "20px 0px", height: "100%" }}
            align={"center"}
          >
            {submitStatus && (
              <Alert severity="error">
                 
                {submitStatus}
              </Alert>
            )}
            <Avatar
              sx={{
                backgroundColor: theme.palette.success.main,
                marginTop: "7px",
              }}
            >
              <LockIcon></LockIcon>
            </Avatar>
            <Typography variant="h5">Login</Typography>
            <Typography variant="caption">
              Login into your account and start answering the polls
            </Typography>
            {notFound &&
            
            <Typography variant="subtitle1" color="error" component="div">
              {notFound}
            </Typography>
            }
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
                      <IconButton onClick={() => setSeePassword(!seePassword)}>
                        {seePassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              ></MyTextField>
              <Button
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
              <Typography variant="p">
                <Link to="/forgotpassword" style={{ textDecoration: "none" }}>
                  Forgot password?
                </Link>
              </Typography>
              <Typography variant="body2">
                Dont have an account?{" "}
                <Link to="/signup" style={{ textDecoration: "none" }}>
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
