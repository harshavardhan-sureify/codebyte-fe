import axios from "axios";
import React, { useEffect, useState } from "react";
import { ANSWERED_POLLS_URL } from "../../constants";
import { ViewPolls } from "./ViewPolls";
import { auth } from "../features/User.reducer";
import { useDispatch, useSelector } from "react-redux";
import { LoadingComponent } from "../commonComponents/LoadingComponent";
import { handleToaster } from "../features/Toaster.reducer";
import { useLocation, useNavigate } from "react-router-dom";

export const AnsweredPolls = () => {
    const user = useSelector(auth);
    const [pollsData, setPollsData] = useState({});
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const location = useLocation();
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
            const message = err.response.data.message;
            dispatch(
                handleToaster({
                    message,
                    severity: "error",
                    open: true,
                })
            );
        }
    };
    useEffect(() => {
        if (location.state !== null) {
            navigate(`${location.state.id}`, {
                state: {
                    pollProps: location.state.poll,
                    pollStatus: false,
                },
                replace: true,
            });
        } else {
            fetchAnsweredPolls();
        }
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
