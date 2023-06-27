import { Paper, Avatar, TextField, Button, Typography } from "@mui/material";
import { theme } from "../../themes/theme";
import LockIcon from "@mui/icons-material/Lock";
const EmailPage = ({ prop }) => {
  const handleChange = (e) => {
    prop.setEmail(e.target.value);
    if (!e.target.value) {
      prop.setErrors("this field is required");
      return;
    }
    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.target.value)
    ) {
      prop.setErrors("Enter Valid Email");
      return;
    }
    prop.setErrors("");
  };
  const handleClick = () => {
    if (prop.email === "") {
      prop.setErrors("This field is required");
      return;
    }
    if (prop.errors !== "") {
      return;
    }
    prop.setOpen(true);
    prop.sendData();
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
        error={prop.errors}
        helperText={prop.errors}
        value={prop.email}
        onChange={handleChange}
      ></TextField>
      <Button
        onClick={handleClick}
        color="secondary"
        variant="contained"
        sx={{ mt: 2 }}
        disabled={prop.open}
      >
        Continue
      </Button>
    </Paper>
  );
};

export default EmailPage;
