import {
  Alert,
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { confirmuser, userInfo, updateProfile } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../features/User.reducer";
import { login } from "../features/User.reducer";

const UpdateProfile = () => {
  const [open, setOpen] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [password, setPassword] = useState("");
  const user = useSelector(auth);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const [userData, setuserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [toaster, setToaster] = useState("");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setPassword("");
  };
  const handleChange = (event) => {
    setuserData({ ...userData, [event.target.name]: event.target.value });
    validations(event.target.name, event.target.value);
  };
  const validations = (clickedField, value) => {
    let message = "";
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
      default:
    }

    setErrors({ ...errors, [clickedField]: message });
  };
  const updateUser = async (data) => {
    try {
      const res = await axios.put(updateProfile, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (res.status === 200) {
        setToaster("Successfully updated");
        handleCancel();
        setErrors({});
        dispatch(
          login({ name: userData.name, role: user.role, token: user.token })
        );
      }
    } catch (error) {
      if (error.response.data.status === 400) {
        const payload = error.response.data.data.error;
        if (typeof (payload) === "string" || payload instanceof String) {
          setToaster(payload);
        } else {
          let msg = "";
          for (let i in payload) {
            msg += payload[i] + "\n";
          }
          setToaster(msg);
        }
      } else {
        setToaster("Something went wrong");
      }
    }
  };
  const handleSubmit = () => {
    const n = Object.keys(errors).length;
    if (n === 0) {
      setToaster("Please make your changes ");
      return;
    }
    const data = {};
    for (let i in errors) {
      if (errors[i].length !== 0) {
        setToaster("Please fill the details properly");
        return;
      } else {
        data[i] = userData[i];
      }
    }
    updateUser(data);
  };
  const handleCancel = () => {
    setEnabled(false);
    fetchData();
  };

  const handlePasswordSubmit = async () => {
    const data = { oldpassword: password };

    try {
      const res = await axios.post(confirmuser, data, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (res.status === 200) {
        setEnabled(true);
        handleClose();
        setPassword("");
      }
    } catch (error) {
      if (error.response.data.status === 400) {
        setToaster("Wrong password");
      } else {
        setToaster("Something went Wrong");
      }
    }
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const fetchData = async () => {
    try {
      const res = await axios.get(userInfo, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (res.status === 200) {
        setuserData({ ...res.data.data.user, password: "3210@Abcd" });
      }
    } catch (error) {
      setToaster(error.response.data.error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ height: "85vh" }}>
      <Grid
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={6} lg={12}>
          <Card sx={{ width: "100%", padding: "21px" }} elevation={3}>
            <Stack direction="column" gap={3}>
              <Typography variant="h6">Profile Info</Typography>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirm Its you!!</DialogTitle>
                <DialogContent>
                  <DialogContentText>Enter your password</DialogContentText>
                  <TextField
                    size="small"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                  ></TextField>
                  <Stack
                    direction={"row"}
                    gap={2}
                    justifyContent={"end"}
                    mt={1}
                  >
                    <Button
                      variant="contained"
                      size="small"
                      color="error"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      color="success"
                      onClick={handlePasswordSubmit}
                    >
                      Submit
                    </Button>
                  </Stack>
                </DialogContent>
              </Dialog>

              <TextField
                label="Name"
                name="name"
                value={userData.name}
                disabled={!enabled}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
              ></TextField>
              <TextField
                label="Email"
                name="email"
                value={userData.email}
                disabled={!enabled}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              ></TextField>
              <TextField
                type="password"
                label="Password"
                name="password"
                value={userData.password}
                disabled={!enabled}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              ></TextField>
              <Stack direction={"row"} justifyContent={"end"} gap={1}>
                {!enabled ? (
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleOpen}
                    color="secondary"
                  >
                    Update
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      size="small"
                      color="error"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      color="success"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </>
                )}
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
      {toaster && (
        <Snackbar
          open={!!toaster}
          autoHideDuration={3200}
          sx={{ paddingTop: "43px" }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          onClose={() => setToaster("")}
        >
          <Alert
            severity={toaster === "Successfully updated" ? "success" : "error"}
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => setToaster("")}
              >
                <CancelIcon></CancelIcon>
              </IconButton>
            }
          >
            {toaster}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default UpdateProfile;
