import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { auth } from "../features/User.reducer";
import { POLL_ANSWERS_URL } from "../../constants";
import axios from "axios";
import { EmptyDataContainer } from "../user/EmptyDataContainer";
import { LoadingComponent } from "../commonComponents/LoadingComponent";
import { useEffect } from "react";

export const PollAnswers = ({ pollId }) => {
    const [loading, setLoading] = React.useState(true);
    const [rows, setRows] = React.useState([]);
    const user = useSelector(auth);
    const columns = [
        { field: "id", headerName: "Id", width: 70 },
        { field: "userName", headerName: "Name", width: 100 },
        { field: "option", headerName: "Option", width: 130 },
        { field: "answeredDate", headerName: "Answered date", width: 170 },
    ];

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
            //Handle session termination here
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
        <>
            {rows == null ? (
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
        </>
    );
};
