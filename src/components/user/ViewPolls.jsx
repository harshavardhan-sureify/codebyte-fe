import { Poll } from "./PollCard";
import { Grid, Typography } from "@mui/material";

export const ViewPolls = ({ activeFlag, pollsData }) => {
    return (
        <Grid container>
            {pollsData.length > 0 ? (
                pollsData.map((poll) => (
                    <Poll activeFlag={activeFlag} poll={poll} />
                ))
            ) : (
                <Typography variant="h4">
                    {activeFlag
                        ? "Currently there are no active polls available for you!!!"
                        : "Oops ! You haven't answered any poll yet!"}
                </Typography>
            )}
        </Grid>
    );
};
