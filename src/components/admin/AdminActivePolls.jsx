import React, { useEffect, useState } from "react";
import { ViewPolls } from "./../user/ViewPolls";
import { ACTIVE_POLLS_URL } from "../../constants";
import axios from "axios";
import { auth } from "../features/User.reducer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";
import { LoadingContainer } from "../Styles";

export const AdminActivePolls = () => {
    const user = useSelector(auth);
    const [pollsData, setPollsData] = useState({});
    const [loading, setLoading] = useState(true);
    const activeFlag = false;
    const navigate = useNavigate();

    const fetchActivePolls = async () => {
        try {
            const token = user.token;
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const response = await axios.get(ACTIVE_POLLS_URL, config);
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
        fetchActivePolls();
    }, []);
    if (loading) {
        return (
            <LoadingContainer>
                <CircularProgress />
                <Typography variant="subtitle">Loading</Typography>
            </LoadingContainer>
        );
    }
    return <ViewPolls activeFlag={activeFlag} pollsData={pollsData} />;
};
