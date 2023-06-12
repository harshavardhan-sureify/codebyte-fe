import React, { useEffect, useState } from "react";
import { ViewPolls } from "./ViewPolls";
import { ACTIVE_POLLS_URL, AUTH_TOKEN } from "../../constants";
import axios from "axios";

export const ActivePolls = () => {
    const [pollsData, setPollsData] = useState({});
    const activeFlag = true;
    useEffect(() => {
        fetchActivePolls();
    }, []);
    const fetchActivePolls = async () => {
        const token = AUTH_TOKEN;
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(ACTIVE_POLLS_URL, config);
        setPollsData(response.data.data);
    };

    return <ViewPolls activeFlag={activeFlag} pollsData={pollsData} />;
};
