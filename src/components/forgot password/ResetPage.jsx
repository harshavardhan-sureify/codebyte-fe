import {
  Alert,
  Avatar,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { theme } from "../../themes/theme";
import axios from "axios";
import { resetPassword } from "../../constants";
import { useNavigate } from "react-router-dom";
const intitialize = () => {
  return {
    npassword: "",
    cpassword: "",
  };
};
const ResetPage = ({ prop }) => {
  const navigate = useNavigate();
  const [data, setData] = useState(intitialize());
  const [showPassword, SetShowPassword] = useState(false);
  const [resetStatus, setResetStatus] = useState("");
  const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])/;
  const errors=prop.errors 
  const setErrors=prop.setErrors;

  const handleChange = (e) => {
    setResetStatus("");
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({
      ...errors,
      [e.target.name]: validation(e.target.name, e.target.value),
    });
  };
  const sendData = async (password) => {
    try {
      const data = { password: password, passToken: prop.token };
      const res = await axios.post(resetPassword, data);
      if (res.data.status === 200) {
        prop.setToast("password got reset")
        navigate("/login");
      }
    } catch (err) {
      prop.setToast(err.response.data.data.error);
    }
  };
  const handleClick = (e) => {
    if (Object.keys(errors).length === 0) {
      setResetStatus("Please fill the form");
      return;
    } else if (Object.keys(errors).length < 2) {
      setResetStatus("Please fill the form properly");
      return;
    }
    for (let i in errors) {
      if (errors[i] !== "") {
        setResetStatus("Please fill the form properly");
        return;
      }
    }
    sendData(data["npassword"]);
  };
  const validation = (name, value) => {
    if (!value) {
      return "field is required";
    }
    if (name === "npassword" && value.length < 8) {
      return "Password length should be atleast 8";
    }
    if (name === "npassword" && !passwordRegex.test(value)) {
      return "Password must contain atleast one upper,one lower,one digit and one special character";
    }
    if (name === "cpassword" && value !== data["npassword"]) {
      return "password doesn't match";
    }
    return "";
  };

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: 350,
        p: 4,
        ml: "auto",
        mr: "auto",
        mt: 10,
      }}
    >
      {resetStatus && <Alert severity="error">{resetStatus}</Alert>}
      <Avatar
        sx={{
          backgroundColor: theme.palette.secondary.main,
          ml: "auto",
          mr: "auto",
          width: 50,
          height: 50,
        }}
      >
        <LockIcon sx={{ width: 30, height: 30 }}></LockIcon>
      </Avatar>
      <Typography
        variant="h5"
        component="div"
        sx={{ textAlign: "center", my: 1 }}
      >
        Reset Password
      </Typography>
      <TextField
        label="New Password"
        type={showPassword ? "text" : "password"}
        value={data.npassword}
        name="npassword"
        onChange={handleChange}
        error={errors.npassword}
        helperText={errors.npassword}
        InputProps={{
          endAdornment: (
            <IconButton>
              <InputAdornment
                onClick={(e) => {
                  SetShowPassword(!showPassword);
                }}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </InputAdornment>
            </IconButton>
          ),
        }}
        sx={{
          mb: 1,
        }}
      ></TextField>
      <TextField
        label="Confirm Password"
        type="password"
        name="cpassword"
        value={data.cpassword}
        onChange={handleChange}
        error={errors.cpassword}
        helperText={errors.cpassword}
        sx={{
          mt: 1,
        }}
      ></TextField>
      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 2 }}
        onClick={handleClick}
        type="submit"
      >
        Reset
      </Button>
    </Paper>
  );
};

export default ResetPage;
