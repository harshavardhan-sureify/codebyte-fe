import React from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Avatar, Paper, Typography, Button } from "@mui/material";
import axios from "axios";
import LockIcon from "@mui/icons-material/Lock";
import { theme } from "../../themes/theme";
import {validateOtp} from "../../constants"
const VerificationPage = ({prop}) => {
  const [otp, setOtp] = React.useState("");
  const [open, setOpen] = React.useState(true);
  const errors=prop.errors 
  const setErrors=prop.setErrors;

  const senddata = async () => {
    try {
      setOpen(true)
      const data1={otp:otp,token:prop.token}
      const res = await axios.post(validateOtp,data1);
      console.log(res.status);
      if (res.status === 200) {
        prop.setToken(res.data.data.passToken)
        prop.page();
        prop.setToast("valid user")
      }
    } catch (err) {
      console.log("hi")
      console.log(err.response.data.status)
      if(err.response.data.status===500){
        prop.setToast("Internal server error")
      }else{
        setErrors(err.response.data.data.error)
      }
    }finally{
      setOpen(false)
      setOtp("")
    } 
  };

  const handleChange = (newValue) => {
    setOpen(true);
    setOtp(newValue);
    setErrors("");
    if (newValue.length === 4 && /^\d{4}$/.test(newValue)) {
      setOpen(false);
    } else if (newValue.length === 4 && !/^\d{4}$/.test(newValue)) {
      setErrors("invalid format");
      setOtp("");
    }
  };

  return (
    <Paper
      sx={{
        width: 350,
        p: 3,
        ml: "auto",
        mr: "auto",
        mt: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
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
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        Verification
      </Typography>
      {errors && (
        <Typography
          variant="subtitle1"
          component="div"
          color="red"
          sx={{ textAlign: "center" }}
        >
          {errors}
        </Typography>
      )}
      <Typography variant="p" sx={{ my: 1 }}>
        Enter the otp sent to mail
      </Typography>
      <MuiOtpInput value={otp} onChange={handleChange} />
      <Button
        variant="contained"
        color="secondary"
        disabled={open}
        sx={{ mt: 3 }}
        onClick={senddata}
      >
        Verify
      </Button>
      <Button color="secondary" sx={{ mt: 1 }} disabled={prop.open} onClick={()=>{prop.setOpen(true);prop.sendData()}}>
        Resend
      </Button>
    </Paper>
  );
};

export default VerificationPage;
