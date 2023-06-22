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
import { confirmuser, userInfo, updateUserProfile } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../features/User.reducer";
import { login } from "../features/User.reducer";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [password, setPassword] = useState("");
  const user = useSelector(auth);
  const [errors, setErrors] = useState({});
  const [toaster, setToaster] = useState("");
  const dispatch = useDispatch();
  const [userData, setuserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [submitResponse, setSubmitResponse] = useState("");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setPassword("");
    setSubmitResponse("");
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
  const updateUserDetails = async (data) => {
    try {
      const res = await axios.put(updateUserProfile, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (res.status === 200) {
        setToaster(res.data.data.message);
        handleCancel();

        dispatch(
          login({ name: userData.name, role: user.role, token: user.token })
        );
      }
    } catch (error) {
      if (error.response.data.status === 400) {
        const payload = error.response.data.data.error;
        if (typeof payload === "string" || payload instanceof String) {
          setSubmitResponse(payload);
        } else {
          let msg = "";
          for (let i in payload) {
            msg += payload[i] + "\n";
          }
          setSubmitResponse(msg);
        }
      } else {
        setToaster(error.response.data.data.error);
      }
    }
  };
  const handleSubmit = () => {
    const n = Object.keys(errors).length;
    if (n === 0) {
      setSubmitResponse("Please make your changes ");
      return;
    }
    const data = {};
    for (let i in errors) {
      if (errors[i].length !== 0) {
        setSubmitResponse("Please fill the details properly");
        return;
      } else {
        data[i] = userData[i];
      }
    }
    updateUserDetails(data);
  };
  const handleCancel = () => {
    setEnabled(false);
    fetchUserDetails();
    setErrors({});
    setSubmitResponse("");
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
        setSubmitResponse(error.response.data.data.message);
      } else {
        setToaster(error.response.data.data.error);
      }
      setPassword("");
    }
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const fetchUserDetails = async () => {
    try {
      const res = await axios.get(userInfo, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (res.status === 200) {
        setuserData({ ...res.data.data.user, password: "********" });
      }
    } catch (error) {
      setSubmitResponse(error.response.data.error);
    }
  };
  useEffect(() => {
    fetchUserDetails();
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
              {submitResponse && enabled && (
                <Alert severity="error">{submitResponse}</Alert>
              )}

              <Typography variant="h6">Profile Info</Typography>
              <Dialog open={open} onClose={handleClose}>
                {open && submitResponse && (
                  <Alert
                    severity="error"
                    sx={{
                      marginTop: "4px",
                      marginLeft: "4px",
                      marginRight: "5px",
                    }}
                  >
                    {submitResponse}
                  </Alert>
                )}

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
          autoHideDuration={1000}
          sx={{ paddingTop: "43px" }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          onClose={() => setSubmitResponse("")}
        >
          <Alert
            severity={
              toaster === "Updated details successfully" ? "success" : "error"
            }
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

export default Profile;
