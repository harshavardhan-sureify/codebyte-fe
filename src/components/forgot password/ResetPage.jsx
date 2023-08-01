import {
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
import { RESET_PASSWORD_URL } from "../../constants";
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
  const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])/;
  const errors = prop.errors;
  const setErrors = prop.setErrors;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({
      ...errors,
      [e.target.name]: validation(e.target.name, e.target.value.trim()),
    });
  };
  const sendData = async (password) => {
    try {
      const data = { password: password.trim(), passToken: prop.token };
      const res = await axios.post(RESET_PASSWORD_URL, data);
      if (res.data.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      prop.setToast(err.response.data.message);
    }
  };
  const handleClick = (e) => {
    let temp = {};
    for (let i in data) {
      temp[i] = validation(i, data[i].trim());
    }
    setErrors({ ...errors, ...temp });
    for (let i in temp) {
      if (temp[i] !== "") {
        return;
      }
    }
    sendData(data["npassword"]);
  };
  const validation = (name, value) => {
    if (!value) {
      return "Password is required";
    }
    if (name === "npassword" && value.length < 8) {
      return "Password length should be atleast 8 characters";
    }
    if (name === "npassword" && !passwordRegex.test(value)) {
      return "Password must contain atleast one upper,one lower,one digit and one special character";
    }
    if (name === "cpassword" && value !== data["npassword"].trim()) {
      return "Password doesn't match";
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
        error={errors.npassword ? true : false}
        helperText={errors.npassword}
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={(e) => {
                SetShowPassword(!showPassword);
              }}
            >
              <InputAdornment position="end">
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
        error={errors.cpassword ? true : false}
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
