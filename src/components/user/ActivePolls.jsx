import React, { useEffect, useState } from "react";
import { ViewPolls } from "./ViewPolls";
import { ACTIVE_POLLS_URL, AUTH_TOKEN } from "../../constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ActivePolls = () => {
    const [pollsData, setPollsData] = useState({});
    const activeFlag = true;
    const navigate=useNavigate()
    
    const fetchActivePolls = async () => {
        try {
            const token = localStorage.getItem("userToken");
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const response = await axios.get(ACTIVE_POLLS_URL, config);
            if (response.status === 200) {
                setPollsData(response.data.data);
            }
        } catch (err) {
            localStorage.clear()
            navigate("/login")
        }
    };
    useEffect(() => {
        fetchActivePolls();
    }, []);

    return <ViewPolls activeFlag={activeFlag} pollsData={pollsData} />;
};
