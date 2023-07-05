import {
    Box,
    Button,
    Card,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Stack,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { theme } from "../../themes/theme";
import { StyledDuration } from "./StyledDuration";
import axios from "axios";
import { SAVE_POLL_URL } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../features/User.reducer";
import { ADMIN_ROLE } from "../../constants";
import { handleToaster } from "../features/Toaster.reducer";
import { PollAnswers } from "../admin/PollAnswers";

export const ViewSinglePoll = () => {
    const { role } = useSelector(auth);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const poll = location.state.pollProps;
    const isActivePoll = location.state.pollStatus;
    const options = JSON.parse(poll.options).options;
    const [currSelectedValue, setSelectedValue] = useState("");
    const prevSelectedValue = options[poll.option_id];
    const user = useSelector(auth);

    const handleSelectionChange = (e) => {
        if (isActivePoll) setSelectedValue(e.target.value);
    };
    const submitPoll = async (e) => {
        e.preventDefault();
        if (currSelectedValue === "") {
            dispatch(
                handleToaster({
                    message: "Please select a option",
                    severity: "error",
                    open: true,
                })
            );
            return;
        }
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
                dispatch(
                    handleToaster({
                        message: "poll submitted successfully",
                        severity: "success",
                        open: true,
                    })
                );
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
                    dispatch(
                        handleToaster({
                            severity: "error",
                            message: "unable to submit poll",
                            open: true,
                        })
                    );
                    setTimeout(() => {
                        navigate(-1);
                    }, 2000);
                }
            }
        }
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "space-around",mt:"50px",flexWrap:"wrap",gap:5 }}>
            <Card
                elevation={4}
                sx={{
                    width: "450px",
                    p: "20px",
                    position: "relative",
                }}
            >
                <Stack spacing={4} sx={{ alignItems: "center" }}>
                    <Typography
                        variant="h4"
                        sx={{ paddingLeft: "7px" }}
                        textAlign="center"
                    >
                        {poll.title}
                    </Typography>
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
                                            disabled={role===ADMIN_ROLE}
                                            key={option}
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
                                {/* <StyledBackIcon
                                    onClick={handleBackNavigation}
                                /> */}
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
            {role === "admin" && (
                <Card elevation={4} sx={{ padding: 2 }}>
                    <PollAnswers pollId={poll.poll_id} />
                </Card>
            )}
        </Box>
    );
};
