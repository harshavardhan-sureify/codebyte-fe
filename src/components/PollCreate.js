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
import React, { useRef, useState } from "react";
import Modal from "@mui/material/Modal";
import { TextareaAutosize } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { DatePicker } from "@mui/x-date-pickers";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import dayjs from "dayjs";
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
  const [endDate, setEndDate] = useState(today);
  const [options, setOptions] = useState(["Option 1", "Option 2"]);
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({
    title: false,
    question: false,
    startDate: false,
    endDate: false,
    options: [],
  });


  const handleOptionChange = (value, index) => {
    setOptions((prev) => {
      let newOptions = [...prev];
      newOptions[index] = value;
      return newOptions;
    });
  };

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
    const newErrors = {
      question: question.trim() === "",
      startDate: startDate === null && startDate > endDate,
      endDate: endDate === null,
      options: options.map((option) => option.trim() === ""),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
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
            <TextField sx={{ width: "100%" }} label="Poll Title" />
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
                minDate={dayjs.max(today, endDate)}
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
                onError={(e) => console.log(e)}
                slotProps={{
                  textField: {
                    helperText: errors.endDate ? "Select valid end Date" : "",
                  },
                }}
              />
            </Box>
            <Checkbox sx={{ m: 0 }} />
            <Typography>Is Muilt select</Typography>
          </Grid>
          <StyledTextarea
            aria-label="empty textarea"
            placeholder="Question"
            id="hellonj"
            sx={{
              width: "100%",
              marginBottom: 2,
              boxSizing: "border-box",
              borderColor: errors.question ? "red" : "primary",
            }}
            minRows={2}
            // ref={questionRef}
            value={question}
            onChange={handleQuestionChange}
          />
          {/* <TextareaAutosize
              placeholder="Question"
              minRows={2}
              value={question}
              onChange={handleQuestionChange}
            /> */}

          <Box
            sx={{
              maxHeight: "40vh",
              overflow: "auto",
              marginBottom: 2,
              width: "100%",
            }}
          >
            {options.map((option, index) => (
              <Box
                sx={{ width: "100%", marginTop: 2 }}
                justifyContent="space-between"
                display="flex"
                alignItems="center"
                textAlign="center"
                key={index}
                gap={2}
              >
                <TextField
                  label={`Option ${index + 1}`}
                  variant="outlined"
                  sx={{ width: options.length > 2 ? "88%" : "100%" }}
                  value={option}
                  onChange={(e) => handleOptionChange(e.target.value, index)}
                />
                {options.length > 2 && (
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
            ))}
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Fab color="primary" aria-label="add" onClick={handleNewOption}>
              <AddIcon />
            </Fab>
            <Button
              variant="contained"
              onClick={() => {
                validateForm();
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
          {/* <Typography>{questionRef.current?.value}</Typography> */}
        </Paper>
      </Modal>
    </>
  );
};

export default PollCreate;
