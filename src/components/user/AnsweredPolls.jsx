import axios from "axios";
import React, { useEffect, useState } from "react";
import { ANSWERED_POLLS_URL } from "../../constants";
import { ViewPolls } from "./ViewPolls";
import { auth } from "../features/User.reducer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoadingComponent } from "../commonComponents/LoadingComponent";

export const AnsweredPolls = () => {
    const user = useSelector(auth);
    const [pollsData, setPollsData] = useState({});
    const [loading, setLoading] = useState(true);
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
                setLoading(false);
            }
        } catch (err) {
            localStorage.clear();
            navigate("/login");
        }
    };
    useEffect(() => {
        fetchAnsweredPolls();
        // eslint-disable-next-line
    }, []);
    if (loading) {
        return <LoadingComponent />;
    }
    return (
        <ViewPolls
            message={"You haven't answered any polls yet"}
            pollsData={pollsData}
        />
    );
};
