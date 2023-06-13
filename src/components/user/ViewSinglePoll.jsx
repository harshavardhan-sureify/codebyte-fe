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
import { StyledBackIcon } from "../Styles";
import { StyledDuration } from "./StyledDuration";

export const ViewSinglePoll = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const poll = location.state.pollProps;
    const isActivePoll = location.state.pollStatus;
    const options = JSON.parse(poll.options).options;
    const [currSelectedValue, setSelectedValue] = useState("");
    const prevSelectedValue = options[poll.option_id];
    const handleSelectionChange = (e) => {
        if (isActivePoll) setSelectedValue(e.target.value);
    };
    const handleBackNavigation = () => {
        navigate(-1);
    };
    const submitPoll = (e) => {
        e.preventDefault()
        const data = {
            poll_id: poll.poll_id,
            option_id:options.findIndex((option)=>option===currSelectedValue)
        }
        console.log(data)
    }
    return (
        <Box sx={{display:"flex",justifyContent:"center"}}>
            <Card
                p
                sx={{ width: "400px", p: "20px", position: "relative" }}
            >
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
                                                        : theme.palette.bColor.main,
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
                               {isActivePoll && <Button
                                    type="submit"
                                    color="secondary"
                                    variant="contained"
                                    size="small"
                                >
                                    submit
                                </Button>}
                            </Box>
                        </form>
                    </Box>
                </Stack>
            </Card>
        </Box>
    );
};
