import { EmptyDataContainer } from "./EmptyDataContainer";
import { Poll } from "./PollCard";
import { Grid } from "@mui/material";

export const ViewPolls = ({ activeFlag,message, pollsData,refetch }) => {
    pollsData.sort((a, b) => {
        if (a.start_date > b.start_date) return -1;
        else if (a.start_date < b.start_date) return 1;
        return 0;
    });

    return (
        <Grid container>
            {pollsData.length > 0 ? (
                pollsData.map((poll) => (
                    <Poll
                        refetch={refetch}
                        activeFlag={activeFlag}
                        poll={poll}
                        key={poll.poll_id}
                    />
                ))
            ) : (
                <EmptyDataContainer message={message} />
            )}
        </Grid>
    );
};
