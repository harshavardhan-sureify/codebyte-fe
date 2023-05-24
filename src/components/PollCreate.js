import {
  Box,
  Checkbox,
  Grid,
  Paper,
  TextField,
  Typography,
  styled,
  Fab,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { TextareaAutosize } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { DatePicker } from "@mui/x-date-pickers";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import dayjs from "dayjs";

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
          onClick={() => handleDeleteOption(index)}
        >
          <ClearIcon />
        </Fab>
      )}
    </Box>
    {errors.options[index] && <ErrorText>Enter valid option</ErrorText>}
    {!errors.options[index] && errors.optionErrors[index] && (
      <ErrorText>Duplicate option</ErrorText>
    )}
  </Box>
);

const ErrorText = styled(Typography)(({ theme }) => ({
  color: "red",
  fontSize: "small",
  margin: "4px 0px 0px 4px",
}));
const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
  border: "1px solid #ced4da",
  borderRadius: "4px",
  backgroundColor: "#fff",
  fontSize: "1rem",
  padding: "1rem 0.75rem",
  lineHeight: "1.5",
  textAlign: "justify",
  "&:focus": {
    borderColor: "#80bdff",
    borderWidth: "2px",
    boxShadow: "0 0 0 0rem rgba(0,123,255,.25)",
    outline: "none",
  },
  resize: "vertical",
  width: "100%",
  marginBottom: 2,
  boxSizing: "border-box",
}));

const PollCreate = () => {
  const [question, setQuestion] = useState("");
  var minMax = require("dayjs/plugin/minMax");
  dayjs.extend(minMax);
  const today = dayjs(new Date());
  const tommorrow = dayjs().add(1, "day");
  const [startDate, setStartDate] = useState(today);
  const [title, setTitle] = useState("");
  const [endDate, setEndDate] = useState(today);
  const [options, setOptions] = useState(["Option 1", "Option 2"]);
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [optionErrors, setOptionErrors] = useState([]);
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
  const handleModalClose = () => {
    setIsOpen(false);
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
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <Paper
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
              }}
            >
              <DatePicker
                label="Start Date"
                format="DD/MM/YYYY"
                value={startDate}
                minDate={dayjs.min(today, endDate)}
                onChange={(value) => setStartDate(value)}
                slotProps={{
                  textField: {
                    helperText: errors.startDate
                      ? "Select valid start Date"
                      : "",
                  },
                }}
              />
              <HorizontalRuleIcon />
              <DatePicker
                label="End Date"
                format="DD/MM/YYYY"
                value={endDate}
                minDate={startDate}
                onChange={(value) => setEndDate(value)}
                slotProps={{
                  textField: {
                    helperText: errors.endDate ? "Select valid end Date" : "",
                  },
                }}
              />
            </Box>
            <Checkbox />
            <Typography>Is Muilt select</Typography>
          </Grid>
          <Box sx={{ textAlign: "left" }}>
            <StyledTextarea
              aria-label="empty textarea"
              placeholder="Question"
              id="hellonj"
              sx={{
                width: "100%",
                boxSizing: "border-box",
                borderColor: errors.question ? "red" : "primary",
              }}
              minRows={2}
              value={question}
              onChange={handleQuestionChange}
            />
            {errors.question && <ErrorText>Enter valid Question</ErrorText>}
          </Box>
          <Box
            sx={{
              maxHeight: "40vh",
              overflow: "auto",
              my:2,
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
          <Box display="flex" justifyContent="space-between">
            <Fab color="primary" aria-label="add" onClick={handleNewOption}>
              <AddIcon />
            </Fab>
            <Button
              variant="contained"
              onClick={() => {
                setIsClicked(true);
                if (validateForm()) setIsOpen(true);
              }}
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </Grid>
      <Modal
        open={isOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper>
          <Box sx={{ p: 2 }}>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              {question}?
            </Typography>
            <Box>
              {options.map((option) => (
                <Paper
                  elevation={0}
                  sx={{
                    border: 1,
                    m: 1,
                    borderRadius: "15px",
                  }}
                >
                  <Typography
                    sx={{
                      width: "300px",
                      maxWidth: "300px",
                      p: 1,
                      overflow: "auto",
                    }}
                  >
                    <Checkbox />
                    {option}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Box>
        </Paper>
      </Modal>
    </>
  );
};

export default PollCreate;
