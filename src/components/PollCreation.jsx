import { Box, Grid, TextField, Typography, Fab, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { DatePicker } from "@mui/x-date-pickers";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import dayjs from "dayjs";
import LinearProgress from "@mui/material/LinearProgress";
import { createPollApi } from "../constants";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { ErrorText, CreatePollContainer } from "./Styles";
import Tooltip from "@mui/material/Tooltip";
import ClearIcon from "@mui/icons-material/Clear";

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
        <Fab
          color="error"
          aria-label="delete"
          size="small"
          sx={{ width: "36px", height: "2px", borderRadius: "50%" }}
          onClick={() => handleDeleteOption(index)}
        >
          <ClearIcon sx={{ width: "12px" }} />
        </Fab>
      )}
    </Box>
    {errors.options[index] && <ErrorText>Enter valid option</ErrorText>}
    {!errors.options[index] && errors.optionErrors[index] && (
      <ErrorText>Duplicate option</ErrorText>
    )}
  </Box>
);

const PollCreate = () => {
  const [question, setQuestion] = useState("");
  var minMax = require("dayjs/plugin/minMax");
  dayjs.extend(minMax);
  const today = dayjs(new Date());
  const [startDate, setStartDate] = useState(today);
  const [title, setTitle] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [options, setOptions] = useState(["Option 1", "Option 2"]);
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [errors, setErrors] = useState({
    title: false,
    question: false,
    startDate: false,
    endDate: false,
    options: [],
    optionErrors: [],
  });

  const handleOptionChange = (value, index) => {
    setOptions((prev) => {
      let newOptions = [...prev];
      newOptions[index] = value;
      return newOptions;
    });
  };

  useEffect(() => {
    if (isClicked) validateForm();
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
  const submitPoll = async () => {
    setIsLoading(true);
    const pollData = {
      title,
      question,
      startDate: dayjs(startDate).format("DD/MM/YYYY"),
      endDate: dayjs(endDate).format("DD/MM/YYYY"),
      options,
    };

    try {
      const response = await fetch(createPollApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pollData),
      });

      if (!response.status === 200) {
        throw new Error("Error occured");
      }

      setSeverity("success");
      setAlertMessage("Created a poll successfully");
      setAlertOpen(true);
    } catch (error) {
      setSeverity("error");
      setAlertMessage(error);
      setAlertOpen(true);
    }
    setIsLoading(false);
  };

  const validateForm = () => {
    const newOptionErrors = options.map(
      (option, i, arr) =>
        arr.findIndex(
          (item) => item.toLowerCase().trim() === option.toLowerCase().trim()
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
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {JSON.stringify(alertMessage)}
          {/* will be edited based on the backend api while integration  */}
        </Alert>
      </Snackbar>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <CreatePollContainer
          sx={{ width: "40%", minWidth: "350px", padding: 2 }}
          elevation={3}
        >
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
            />
            {errors.title && <ErrorText>Enter valid Title</ErrorText>}
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
                minDate={dayjs.min(today, endDate === null ? today : endDate)}
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
            <Box display="flex" gap={2} justifyContent="space-between">
              {errors.startDate && (
                <ErrorText>Select valid start Date</ErrorText>
              )}
              {errors.endDate && <ErrorText>Select valid end Date</ErrorText>}
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
                borderColor: errors.question ? "red" : "primary",
                marginTop: 2,
              }}
            />
            {errors.question && <ErrorText>Enter valid Question</ErrorText>}
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
                color="primary"
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
          <Box display="flex" justifyContent="space-evenly" marginTop={2}>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                console.log("going back");
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
