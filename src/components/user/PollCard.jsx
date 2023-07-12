import {
    Box,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Tooltip,
    Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { StyledCard, StyledPollButton } from "../Styles";
import { countSum } from "../utils";
import { StyledDuration } from "./StyledDuration";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import { DialogComponent } from "../admin/DialogComponent";
export const Poll = ({ activeFlag, poll, refetch }) => {
    const navigate = useNavigate();
    const handleClick = (flag) => {
        navigate(`${poll.poll_id}`, {
            state: {
                pollProps: poll,
                pollStatus: flag,
            },
        });
    };
    const pollStartDate = new Date(poll.start_date);
    const currDate = new Date();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleEdit = () => {
        navigate(`/admin/edit/${poll.poll_id}`, { state: { pollProps: poll } });
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
                    <StyledDuration
                        startDate={poll.start_date}
                        endDate={poll.end_date}
                    />
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        textTransform="uppercase"
                        component="div"
                    >
                        {poll.title}
                    </Typography>
                </CardContent>
                <CardActions
                    sx={{ display: "flex", justifyContent: "space-between" }}
                >
                    <StyledPollButton
                        variant="contained"
                        size="small"
                        color="secondary"
                        onClick={() => handleClick(activeFlag)}
                    >
                        {activeFlag ? "Answer Poll" : "View Poll"}
                    </StyledPollButton>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-around",
                            width: "5rem",
                        }}
                    >
                        {pollStartDate > currDate && (
                            <>
                                <Tooltip title="Edit">
                                    <IconButton onClick={handleEdit}>
                                        <EditRoundedIcon color="warning" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                    <IconButton onClick={handleClickOpen}>
                                        <DeleteIcon
                                            color="error"
                                            sx={{
                                                "&:hover": {
                                                    cursor: "pointer",
                                                    fontSize: "30px",
                                                },
                                            }}
                                        />
                                    </IconButton>
                                </Tooltip>
                            </>
                        )}
                    </Box>
                </CardActions>
                <DialogComponent
                    refetch={refetch}
                    handleClick={handleClickOpen}
                    handleClose={handleClose}
                    open={open}
                    title={poll.title}
                    id={poll.poll_id}
                />
            </StyledCard>
        </Grid>
    );
};
