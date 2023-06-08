import axios from "axios";
import React, { useEffect, useState } from "react";
import { ANSWERED_POLLS_URL } from "../../constants";
import { ViewPolls } from "./ViewPolls";

export const AnsweredPolls = () => {
    const [pollsData, setPollsData] = useState({});
    const activeFlag = false;
    useEffect(() => {
        fetchAnsweredPolls();
    }, []);
    const fetchAnsweredPolls = async () => {
        const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODYzMzQyNjEsImlkIjoxLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSJ9.-Q50mUQZfaXymaUETcrsZkeRCV2QIgyO_Qy0Ydl6VD4`;

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(ANSWERED_POLLS_URL, config);
        setPollsData(response.data.data);
    };

    return (
        <>
            <ViewPolls activeFlag={activeFlag} pollsData={pollsData} />
        </>
    );
};
