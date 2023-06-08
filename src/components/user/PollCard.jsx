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
import { CardDate } from "./CardDate";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems:"center",
                            gap: 4,
                        }}
                    >
                        <CardDate date={poll.start_date} flag={true} />
                        <div>
                            <ArrowForwardIcon/>
                        </div>
                        <CardDate date={poll.end_date} />
                    </div>
                    <Typography  variant="h6" fontWeight="bold" textTransform="uppercase" component="div">
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
