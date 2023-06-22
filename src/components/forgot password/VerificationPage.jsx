import React from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Avatar, Paper, Typography, Button } from "@mui/material";
import axios from "axios";
import LockIcon from "@mui/icons-material/Lock";
import { theme } from "../../themes/theme";
const VerificationPage = (props) => {
  const [otp, setOtp] = React.useState("");
  const [error, setError] = React.useState("");
  const [open, setOpen] = React.useState(true);

  const sendData = async () => {
    try {
      const res = await axios.post();
      if (res.status === 200) {
        props.page();
      }
    } catch (err) {
    } finally {
    }
  };

  const handleChange = (newValue) => {
    setOpen(true);
    setOtp(newValue);
    setError("");
    if (newValue.length === 4 && /^\d{4}$/.test(newValue)) {
      setOpen(false);
      props.page();
    } else if (newValue.length === 4 && !/^\d{4}$/.test(newValue)) {
      setError("invalid format");
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
      {error && (
        <Typography
          variant="subtitle1"
          component="div"
          color="red"
          sx={{ textAlign: "center" }}
        >
          {error}
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
        onClick={sendData}
      >
        Verify
      </Button>
      <Button color="secondary" sx={{ mt: 1 }}>
        Resend
      </Button>
    </Paper>
  );
};

export default VerificationPage;
