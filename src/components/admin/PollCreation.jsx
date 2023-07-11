import {
    Box,
    Grid,
    TextField,
    Typography,
    Fab,
    Button,
    IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { DatePicker } from "@mui/x-date-pickers";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import dayjs from "dayjs";
import LinearProgress from "@mui/material/LinearProgress";
import { CREATE_POLL_URL } from "../../constants";
import { ErrorText, CreatePollContainer } from "./../Styles";
import Tooltip from "@mui/material/Tooltip";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../features/User.reducer";
import { useLocation, useNavigate } from "react-router-dom";
import { handleToaster } from "../features/Toaster.reducer";

const Option = ({
    option,
    handleOptionChange,
    handleDeleteOption,
    errors,
    index,
    canDelete,
}) => (
    <Box sx={{ textAlign: "left" }}>
        <Box
            sx={{ width: "100%", marginTop: 2 }}
            justifyContent="space-between"
            display="flex"
            alignItems="center"
            textAlign="center"
            gap={2}
        >
            <TextField
                label={`Option ${index + 1}`}
                variant="outlined"
                sx={{ width: canDelete ? "88%" : "100%" }}
                value={option}
                onChange={(e) => handleOptionChange(e.target.value, index)}
            />
            {canDelete && (
                <IconButton
                    color="error"
                    aria-label="delete"
                    size="small"
                    sx={{ height: "2px", borderRadius: "50%" }}
                    onClick={() => handleDeleteOption(index)}
                >
                    <ClearIcon />
                </IconButton>
            )}
        </Box>
        {errors.options[index] && <ErrorText>Enter valid option</ErrorText>}
        {!errors.options[index] && errors.optionErrors[index] && (
            <ErrorText>Duplicate option</ErrorText>
        )}
    </Box>
);

const PollCreate = () => {
    const { token } = useSelector(auth);
    const location = useLocation();
    const dispatch = useDispatch();
    const [question, setQuestion] = useState("");
    const navigate = useNavigate();
    var minMax = require("dayjs/plugin/minMax");
    dayjs.extend(minMax);
    const today = dayjs(new Date());
    const [startDate, setStartDate] = useState(today);
    const [title, setTitle] = useState("");
    const [endDate, setEndDate] = useState(null);
    const [options, setOptions] = useState(["", ""]);
    const [isClicked, setIsClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [pollProps, setPollProps] = useState(null)
    const [errors, setErrors] = useState({
        title: false,
        question: false,
        startDate: false,
        endDate: false,
        options: [],
        optionErrors: [],
    });
    const fromEdit = location.pathname.includes("/admin/edit/");

    const handleOptionChange = (value, index) => {
        setOptions((prev) => {
            let newOptions = [...prev];
            newOptions[index] = value;
            return newOptions;
        });
    };

    useEffect(() => {
        if (fromEdit) {
            if (location.state === null) {
                navigate("/admin/allpolls");
            } else {
                setPollProps(location.state.pollProps);
                const poll = location.state.pollProps;
                const { options } = JSON.parse(poll.options);
                setQuestion(poll.question);
                setTitle(poll.title);
                setStartDate(dayjs(poll.start_date));
                setEndDate(dayjs(poll.end_date));
                setOptions(options);
            }
        }
    }, []);
    useEffect(() => {
        if (isClicked) validateForm();
        // eslint-disable-next-line
    }, [title, question, options, isClicked, startDate, endDate]);

    const handleNewOption = () => {
        setOptions([...options, ""]);
    };

    const handleDeleteOption = (deleteIndex) => {
        if (options.length <= 2) {
            return;
        }
        setOptions((prev) => {
            return prev.filter((_, ind) => ind !== deleteIndex);
        });
    };
    const handleQuestionChange = (event) => {
        setQuestion(event.target.value);
    };

    const submitPoll = () => {
        setIsLoading(true);
        let message = "";
        let severity = "";
        const pollData = {
            title,
            question: question.endsWith("?") ? question : question + "?",
            startDate: dayjs(startDate).format("YYYY-MM-DD"),
            endDate: dayjs(endDate).format("YYYY-MM-DD"),
            options,
        };
        if (pollProps !== null) pollData["id"] = pollProps.poll_id;
        axios
            .post(CREATE_POLL_URL, pollData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    severity = "success";
                    setQuestion("");
                    setIsClicked(false);
                    setOptions(["", ""]);
                    setStartDate(today);
                    setEndDate(null);
                    setTitle("");
                    message = response.data.message;
                    navigate(-1);
                }
            })
            .catch((error) => {
                severity = "error";
                message = error.response.data.message;
            })
            .finally(() => {
                setIsLoading(false);
                dispatch(
                    handleToaster({
                        message,
                        severity,
                        open: true,
                    })
                );
            });
    };

    const validateForm = () => {
        const newOptionErrors = options.map(
            (option, i, arr) =>
                arr.findIndex(
                    (item) =>
                        item.toLowerCase().trim() ===
                        option.toLowerCase().trim()
                ) !== i
        );
        const newErrors = {
            title: title.trim() === "",
            question: question.trim() === "",
            startDate: startDate === null || dayjs(startDate).isAfter(endDate),
            endDate: endDate === null || dayjs(startDate).isAfter(endDate),
            options: options.map((option) => option.trim() === ""),
            optionErrors: newOptionErrors,
        };
        setErrors(newErrors);
        const isOptionsValid = newOptionErrors.every((val) => val === false);
        return (
            !Object.values(newErrors).some((error) => {
                if (Array.isArray(error)) return error.some((er) => er);
                return error;
            }) && isOptionsValid
        );
    };

    return (
        <>
            {isLoading && <LinearProgress />}
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                sx={{ minHeight: "100vh", mt: 4 }}
            >
                <CreatePollContainer elevation={3}>
                    <Grid
                        container
                        justifyContent="flex-start"
                        display="flex"
                        alignItems="center"
                        sx={{ marginbottom: 0 }}
                    >
                        <TextField
                            sx={{ width: "100%" }}
                            label="Poll Title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                        {errors.title && (
                            <ErrorText>Enter valid title</ErrorText>
                        )}
                        <Box
                            sx={{
                                display: "flex",
                                gap: 0,
                                marginTop: 2,
                                alignItems: "center",
                                width: "100%",
                            }}
                        >
                            <DatePicker
                                label="Start Date"
                                format="DD/MM/YYYY"
                                value={startDate}
                                minDate={dayjs.min(
                                    today,
                                    endDate === null ? today : endDate
                                )}
                                onChange={(value) => setStartDate(value)}
                            />
                            <HorizontalRuleIcon />
                            <DatePicker
                                label="End Date"
                                format="DD/MM/YYYY"
                                value={endDate}
                                minDate={startDate}
                                onChange={(value) => setEndDate(value)}
                            />
                        </Box>
                        <Box
                            display="flex"
                            gap={2}
                            justifyContent="space-between"
                        >
                            {errors.startDate && (
                                <ErrorText>Select valid start date</ErrorText>
                            )}
                            {errors.endDate && (
                                <ErrorText>Select valid end date</ErrorText>
                            )}
                        </Box>
                    </Grid>
                    <Box sx={{ textAlign: "left" }}>
                        <TextField
                            multiline
                            rows={2}
                            label="Question"
                            fullWidth
                            value={question}
                            onChange={handleQuestionChange}
                            sx={{
                                borderColor: errors.question
                                    ? "red"
                                    : "primary",
                                marginTop: 2,
                            }}
                        />
                        {errors.question && (
                            <ErrorText>Enter valid question</ErrorText>
                        )}
                    </Box>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        marginTop={2}
                    >
                        <Typography variant="p" sx={{ marginLeft: 1 }}>
                            OPTIONS
                        </Typography>
                        <Tooltip title="Add new option">
                            <Fab
                                color="secondary"
                                aria-label="add"
                                onClick={handleNewOption}
                                size="small"
                            >
                                <AddIcon />
                            </Fab>
                        </Tooltip>
                    </Box>
                    <Box
                        sx={{
                            maxHeight: "22vh",
                            overflow: "auto",
                            width: "100%",
                        }}
                    >
                        {options.map((option, index) => (
                            <Option
                                option={option}
                                handleOptionChange={handleOptionChange}
                                handleDeleteOption={handleDeleteOption}
                                errors={errors}
                                index={index}
                                canDelete={options.length > 2}
                                key={index}
                            />
                        ))}
                    </Box>
                    <Box
                        display="flex"
                        justifyContent="end"
                        marginTop={2}
                        gap={2}
                    >
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                                navigate(-1);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => {
                                setIsClicked(true);
                                if (validateForm()) submitPoll();
                            }}
                            color="secondary"
                        >
                            Submit
                        </Button>
                    </Box>
                </CreatePollContainer>
            </Grid>
        </>
    );
};

export default PollCreate;
