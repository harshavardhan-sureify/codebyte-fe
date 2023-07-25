import React, { useEffect, useState } from "react";
import { ViewPolls } from "./ViewPolls";
import { ACTIVE_POLLS_URL} from "../../constants";
import axios from "axios";
import { auth } from "../features/User.reducer";
import { useDispatch, useSelector } from "react-redux";
import { LoadingComponent } from "../commonComponents/LoadingComponent";
import { handleToaster } from "../features/Toaster.reducer";

export const ActivePolls = () => {
    const user = useSelector(auth);
    const [pollsData, setPollsData] = useState({});
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

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
        fetchActivePolls();
        // eslint-disable-next-line
    }, []);
    if (loading) {
        return <LoadingComponent />;
    }
    return (
        <ViewPolls
            activeFlag={true}
            message={"Currently there are no active polls"}
            pollsData={pollsData}
        />
    );
};
