import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../features/User.reducer";
import { POLL_ANSWERS_URL } from "../../constants";
import axios from "axios";
import { EmptyDataContainer } from "../user/EmptyDataContainer";
import { LoadingComponent } from "../commonComponents/LoadingComponent";
import { useEffect } from "react";
import { Box } from "@mui/material";
import { handleToaster } from "../features/Toaster.reducer";

export const PollAnswers = ({ pollId }) => {
    const [loading, setLoading] = React.useState(true);
    const [rows, setRows] = React.useState([]);
    const user = useSelector(auth);
    const dispatch = useDispatch();
    const columns = [
        { field: "id", headerName: "Id", width: 70 },
        { field: "userName", headerName: "Name", width: 100 },
        { field: "option", headerName: "Option", width: 130 },
        { field: "answeredDate", headerName: "Answered date", width: 170 },
    ];
    const handleToast = (message, color) => {
        dispatch(
            handleToaster({
                message,
                severity: color,
                open: true,
            })
        );
    };

    const fetchPollAnswers = async () => {
        try {
            const token = user.token;
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const response = await axios.get(POLL_ANSWERS_URL + pollId, config);
            if (response.status === 200) {
                setRows(response.data.data);
                setLoading(false);
            }
        } catch (err) {
            const message = err.response.data.message;
            handleToast(message, "error");
        }
    };
    useEffect(() => {
        fetchPollAnswers();
        // eslint-disable-next-line
    }, []);

    if (loading) {
        return <LoadingComponent />;
    }
    return (
        <Box sx={{ width: "30rem" }}>
            {rows === null ? (
                <EmptyDataContainer
                    message={"No one answered this poll yet!!!"}
                />
            ) : (
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />
            )}
        </Box>
    );
};
