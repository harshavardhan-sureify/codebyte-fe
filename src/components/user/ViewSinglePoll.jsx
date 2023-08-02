import {
    Box,
    Button,
    Card,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    Stack,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { theme } from "../../themes/theme";
import { StyledDuration } from "./StyledDuration";
import axios from "axios";
import { POLL_OPTION_STATS_URL, SAVE_POLL_URL } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../features/User.reducer";
import { ADMIN_ROLE } from "../../constants";
import { handleToaster } from "../features/Toaster.reducer";
import { PollAnswers } from "../admin/PollAnswers";
import { LoadingComponent } from "../commonComponents/LoadingComponent";
import { PieGraph } from "../commonComponents/PieGraph";
import { EmptyDataContainer } from "./EmptyDataContainer";
import { PIE_GRAPH_COLORS } from "../../constants";

export const ViewSinglePoll = () => {
    const { role } = useSelector(auth);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [poll, setPoll] = useState(null);
    const [isActivePoll, setIsActivePoll] = useState(false);
    const [options, setOptions] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pieData, setPieData] = useState([]);
    let prevSelectedValue;
    if (options !== null) {
        prevSelectedValue = options[poll.option_id];
    }

    const [currSelectedValue, setSelectedValue] = useState("");
    const user = useSelector(auth);

    const AddColorsToData = (data) => {
        if (data === null) return null;
        data = data.map((item, index) => {
            return { ...item, color: PIE_GRAPH_COLORS[index] };
        });
        return data;
    };
    const fetchAnswersStats = async () => {
        try {
            const token = user.token;
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const response = await axios.get(
                POLL_OPTION_STATS_URL + poll.poll_id,
                config
            );
            setPieData(AddColorsToData(response.data.data));
        } catch (err) {
            const message = err.response.data.message;
            dispatch(
                handleToaster({
                    message: message,
                    severity: "error",
                    open: true,
                })
            );
        }
    };
    useEffect(() => {
        if (location.state === null) {
            navigate(-1);
        } else {
            setPoll(location.state.pollProps);
            setIsActivePoll(location.state.pollStatus);
            setOptions(JSON.parse(location.state.pollProps.options).options);
            setLoading(false);
        }
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        if (poll !== null) {
            fetchAnswersStats();
        }
        // eslint-disable-next-line
    }, [poll]);
    const handleSelectionChange = (e) => {
        if (isActivePoll) {
            setSelectedValue(e.target.value);
        }
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
                    navigate(`/user/answeredpolls`, {
                        state: {
                            id: poll.poll_id,
                            poll: {
                                ...poll,
                                option_id: options.findIndex(
                                    (option) => option === currSelectedValue
                                ),
                            },
                        },
                        replace: true,
                    });
                }, 1000);
            }
        } catch (err) {
            if (err.response) {
                const payload = err.response.data;
                if (payload.status === 401) {
                    dispatch(
                        handleToaster({
                            severity: "error",
                            message: payload.message,
                            open: true,
                        })
                    );
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
                    }, 1000);
                }
            }
        }
    };
    if (loading) {
        return <LoadingComponent />;
    }
    const LegendContainer = ({ data }) => (
        <Box
            sx={{
                width: "100%",
                position: "absolute",
                bottom: 10,
                display: "flex",
                columnGap: 2,
                rowGap: "2px",
                flexWrap: "wrap",
                p: "0 50px",
            }}
        >
            {data.map((item, index) => {
                return (
                    <Box
                        key={index}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "5px",
                        }}
                    >
                        <Box
                            sx={{
                                width: "12px",
                                height: "12px",
                                background: item.color,
                            }}
                        ></Box>
                        <Typography variant="body2" color={"grey"}>
                            {item.id}
                        </Typography>
                    </Box>
                );
            })}
        </Box>
    );

    const pollStartDate = new Date(poll.start_date);
    const currDate = new Date();

    return (
        poll && (
            <Grid container spacing={2} p={3}>
                <Grid
                    item
                    xs={12}
                    md={isActivePoll || pollStartDate > currDate ? 12 : 6}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Card
                        elevation={4}
                        sx={{
                            p: "20px",
                            minHeight: { md: "80vh" },
                            width: "30rem",
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
                                                                ? theme.palette
                                                                      .primary
                                                                      .light
                                                                : theme.palette
                                                                      .bColor
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
                                                    disabled={
                                                        role === ADMIN_ROLE
                                                    }
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
                </Grid>
                {!isActivePoll && pollStartDate < currDate && (
                    <Grid item xs={12} md={6}>
                        <Card
                            elevation={4}
                            sx={{
                                height: { xs: "40vh", md: "80vh" },
                                maxWidth: "30rem",
                                margin: "0px auto",
                                position: "relative",
                            }}
                        >
                            {pieData !== null ? (
                                <>
                                    <PieGraph data={pieData} />
                                    <LegendContainer data={pieData} />
                                </>
                            ) : (
                                <EmptyDataContainer
                                    message={"No one answered this poll yet"}
                                />
                            )}
                        </Card>
                    </Grid>
                )}
                <Grid item xs={12}>
                    {role === "admin" && pollStartDate < currDate && (
                        <PollAnswers pollId={poll.poll_id} />
                    )}
                </Grid>
            </Grid>
        )
    );
};
