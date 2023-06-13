import {
    Alert,
    Box,
    Button,
    Card,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Snackbar,
    Stack,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { theme } from "../../themes/theme";
import { StyledBackIcon } from "../Styles";
import { StyledDuration } from "./StyledDuration";
import axios from "axios";
import { SAVE_POLL_URL } from "../../constants";
import { useSelector } from "react-redux";
import { auth } from "../features/User.reducer";

export const ViewSinglePoll = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const poll = location.state.pollProps;
    const [open, setOpen] = React.useState(false);
    const isActivePoll = location.state.pollStatus;
    const options = JSON.parse(poll.options).options;
    const [currSelectedValue, setSelectedValue] = useState("");
    const [toasterObj, setToasterObj] = useState({});
    const prevSelectedValue = options[poll.option_id];
    const user = useSelector(auth);

    const handleSelectionChange = (e) => {
        if (isActivePoll) setSelectedValue(e.target.value);
    };
    const handleBackNavigation = () => {
        navigate(-1);
    };
    const submitPoll = async (e) => {
        e.preventDefault();
        const data = {
            poll_id: poll.poll_id,
            option_id: options.findIndex(
                (option) => option === currSelectedValue
            ),
        };
        try {
            const token = user.token;
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const res = await axios.post(SAVE_POLL_URL, data, config);
            if (res.status === 200) {
                setOpen(true);
                setToasterObj({
                    severity: "success",
                    message: "poll submitted successfully",
                });
                setTimeout(() => {
                    navigate(-1);
                }, 1000);
            }
        } catch (err) {
            if (err.response) {
                const payload = err.response.data;
                if (payload.status === 401) {
                    localStorage.clear();
                    navigate("/login");
                } else {
                    setOpen(true);
                    setToasterObj({
                        severity: "error",
                        message: "unable to submit poll",
                    });
                    setTimeout(() => {
                        navigate(-1);
                    }, 2000);
                }
            }
        }
    };
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Snackbar
                sx={{ mt: "40px" }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    variant="filled"
                    onClose={handleClose}
                    severity={toasterObj.severity}
                    sx={{ width: "100%", color: "white" }}
                >
                    {toasterObj.message}
                </Alert>
            </Snackbar>
            <Card p sx={{ width: "400px", p: "20px", position: "relative" }}>
                <Stack spacing={4} sx={{ alignItems: "center" }}>
                    <Typography variant="h4">{poll.title}</Typography>
                    <StyledDuration
                        startDate={poll.start_date}
                        endDate={poll.end_date}
                    />
                    <Box>
                        <form onSubmit={submitPoll}>
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">
                                    <Typography
                                        variant="h5"
                                        color={"secondary"}
                                    >
                                        Q.{poll.question}
                                    </Typography>
                                </FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                    value={
                                        isActivePoll
                                            ? currSelectedValue
                                            : prevSelectedValue
                                    }
                                    onChange={handleSelectionChange}
                                >
                                    {options.map((option) => (
                                        <FormControlLabel
                                            sx={{
                                                backgroundColor:
                                                    (currSelectedValue ===
                                                        option) |
                                                    (prevSelectedValue ===
                                                        option)
                                                        ? theme.palette.primary
                                                              .light
                                                        : theme.palette.bColor
                                                              .main,
                                                border:
                                                    (currSelectedValue ===
                                                        option) |
                                                    (prevSelectedValue ===
                                                        option)
                                                        ? "2px solid"
                                                        : "0",
                                                mt: "10px",
                                                px: "10px",
                                                ml: "10px",
                                                borderRadius: "10px",
                                            }}
                                            value={option}
                                            control={<Radio />}
                                            label={option}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    mt: "15px",
                                }}
                            >
                                <StyledBackIcon
                                    onClick={handleBackNavigation}
                                />
                                {isActivePoll && (
                                    <Button
                                        type="submit"
                                        color="secondary"
                                        variant="contained"
                                        size="small"
                                    >
                                        submit
                                    </Button>
                                )}
                            </Box>
                        </form>
                    </Box>
                </Stack>
            </Card>
        </Box>
    );
};
