import axios from "axios";
import React, { useEffect, useState } from "react";
import { ANSWERED_POLLS_URL} from "../../constants";
import { ViewPolls } from "./ViewPolls";
import { auth } from "../features/User.reducer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const AnsweredPolls = () => {
    const user = useSelector(auth);
    const [pollsData, setPollsData] = useState({});
    const activeFlag = false;
    const navigate = useNavigate();

    const fetchAnsweredPolls = async () => {
        try {
            const token = user.token;
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const response = await axios.get(ANSWERED_POLLS_URL, config);
            if (response.status === 200) {
                setPollsData(response.data.data);
            }
        } catch (err) {
            localStorage.clear();
            navigate("/login");
        }
    };
    useEffect(() => {
        fetchAnsweredPolls();
    }, []);
    return <ViewPolls activeFlag={activeFlag} pollsData={pollsData} />;
};
