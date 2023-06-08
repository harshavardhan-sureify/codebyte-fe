
import { Poll } from "./PollCard";
import {  Grid } from "@mui/material";

export const ViewPolls = ({ activeFlag, pollsData }) => {
    return (
            <Grid container >
                {pollsData.length > 0 &&
                    pollsData.map((poll) => (
                        <Poll activeFlag={activeFlag} poll={poll} />
                    ))}
            </Grid>
    );
};
