import {
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { StyledCard, StyledPollButton } from "../Styles";
import { countSum } from "../utils";
import { StyledDuration } from "./StyledDuration";

export const Poll = ({ activeFlag, poll }) => {
    const navigate = useNavigate();
    const handleClick = (flag) => {
        navigate(`${poll.poll_id}`, {
            state: {
                pollProps: poll,
                pollStatus: flag,
            },
        });
    };
    return (
        <Grid item p={3} xs={12} sm={6} md={4}>
            <StyledCard elevation={2}>
                <CardMedia
                    component="img"
                    height="80"
                    image={`/assets/cardimages/pic${countSum(poll.title)}.jpeg`}
                />

                <CardContent
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                    <StyledDuration startDate={poll.start_date} endDate={poll.end_date} />
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        textTransform="uppercase"
                        component="div"
                    >
                        {poll.title}
                    </Typography>
                </CardContent>
                <CardActions>
                    <StyledPollButton
                        variant="contained"
                        size="small"
                        color="secondary"
                        onClick={() => handleClick(activeFlag)}
                    >
                        {activeFlag ? "Answer Poll" : "View Poll"}
                    </StyledPollButton>
                </CardActions>
            </StyledCard>
        </Grid>
    );
};
