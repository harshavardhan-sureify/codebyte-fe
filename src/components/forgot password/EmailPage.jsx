import { Paper, Avatar, TextField, Button, Typography } from "@mui/material";
import { theme } from "../../themes/theme";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";
import axios from "axios";

const init = () => {
  return {
    email: "",
  };
};
const EmailPage = (props) => {
  const [data, setData] = useState(init());
  const [errors, setErrors] = useState("");
  const [button, setButton] = useState(false);
  const [message, setMessage] = useState("");
  const sendData = async (data) => {
    try {
      const res = await axios.post(data);
      if (res.status === 200) {
        props.page();
      }
    } catch (err) {
    } finally {
    }
  };

  const handleChange = (e) => {
    setData({ [e.target.name]: e.target.value });
    setMessage("");
    if (!e.target.value) {
      setErrors({ [e.target.name]: "this field is required" });
      return;
    }
    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.target.value)
    ) {
      setErrors({ [e.target.name]: "Enter Valid Email" });
      return;
    }
    setErrors({ [e.target.name]: "" });
  };
  const handleClick = () => {
    if (Object.keys(errors).length === 0) {
      setErrors({ email: "This field is required" });
      return;
    }
    if (errors["email"] !== "") {
      return;
    }
    console.log("hi");
    setButton(true);
    sendData(data);
    props.page();
  };
  return (
    <Paper
      sx={{
        width: 350,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        ml: "auto",
        mr: "auto",
        mt: 10,
        p: 3,
      }}
    >
      <Avatar
        sx={{
          backgroundColor: theme.palette.secondary.main,
          ml: "auto",
          mr: "auto",
          mb: 2,
          width: 50,
          height: 50,
        }}
      >
        <LockIcon sx={{ width: 30, height: 30 }}></LockIcon>
      </Avatar>
      <Typography
        variant="h5"
        component="div"
        sx={{ textAlign: "center", mb: 4 }}
      >
        Forgot Password
      </Typography>
      {message && (
        <Typography
          variant="subtitle1"
          component="div"
          color="red"
          sx={{ textAlign: "center" }}
        >
          {message}
        </Typography>
      )}
      <Typography
        variant="p"
        component="div"
        sx={{ textAlign: "left", mb: 1, fontSize: 15 }}
      >
        Enter your registered Email
      </Typography>
      <TextField
        label="Email"
        name="email"
        error={errors.email}
        helperText={errors.email}
        value={data.email}
        onChange={handleChange}
      ></TextField>
      <Button
        onClick={handleClick}
        color="secondary"
        variant="contained"
        sx={{ mt: 2 }}
        disabled={button}
      >
        Continue
      </Button>
    </Paper>
  );
};

export default EmailPage;
