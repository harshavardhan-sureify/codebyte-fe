import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../features/User.reducer";
import { POLL_ANSWERS_URL } from "../../constants";
import axios from "axios";
import { LoadingComponent } from "../commonComponents/LoadingComponent";
import { useEffect } from "react";
import { handleToaster } from "../features/Toaster.reducer";
import { TableComponent } from "../commonComponents/TableComponent";
import { useState } from "react";

export const PollAnswers = ({ pollId }) => {
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = useState(null);
    const user = useSelector(auth);
    const dispatch = useDispatch();
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
                setData(response.data.data);
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
    return <TableComponent data={data} />;
};
