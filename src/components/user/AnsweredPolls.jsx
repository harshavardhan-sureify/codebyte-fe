import axios from "axios";
import React, { useEffect, useState } from "react";
import { ANSWERED_POLLS_URL, AUTH_TOKEN } from "../../constants";
import { ViewPolls } from "./ViewPolls";
import { auth } from "../features/User.reducer";
import { useSelector } from "react-redux";

export const AnsweredPolls = () => {
    const user  = useSelector(auth);
    const [pollsData, setPollsData] = useState({});
    const activeFlag = false;
    useEffect(() => {
        fetchAnsweredPolls();
    }, []);
    const fetchAnsweredPolls = async () => {
        const token = user.token;
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
