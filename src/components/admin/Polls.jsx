import React, { useEffect, useState } from "react";
import { ViewPolls } from "../user/ViewPolls";
import { ACTIVE_POLLS_URL, allPollsUrl } from "../../constants";
import axios from "axios";
import { auth } from "../features/User.reducer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Stack, TextField } from "@mui/material";
import { LoadingComponent } from "../commonComponents/LoadingComponent";

export const Polls = ({ type }) => {
    const user = useSelector(auth);
    const [pollsData, setPollsData] = useState([]);
    const [resetPolls, setResetPolls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const activeFlag = false;

    const navigate = useNavigate();
    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearch(value);
        if (value === "") {
            setPollsData(resetPolls);
            return;
        }

        const updatedPollsData = resetPolls.filter((cur) =>
            cur.title.toLowerCase().includes(value.trim())
        );
        setPollsData(updatedPollsData);
    };

    const fetchPolls = async () => {
        try {
            let serverURL = "";
            if (type === "activePolls") {
                serverURL = ACTIVE_POLLS_URL;
            } else {
                serverURL = allPollsUrl;
            }
            const token = user.token;
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const response = await axios.get(serverURL, config);
            if (response.status === 200) {
                setPollsData(response.data.data);
                setResetPolls(response.data.data);

                setLoading(false);
            }
        } catch (err) {
            localStorage.clear();
            navigate("/login");
        }
    };
    useEffect(() => {
        fetchPolls();
        setSearch("");
    }, [type]);
    if (loading) {
        return <LoadingComponent />;
    }
    return (
        <>
            <Stack
                direction={"row"}
                justifyContent={"space-between"}
                marginRight={2}
                marginLeft={2}
            >
                <Box>
                    <TextField
                        placeholder="Enter the keywords"
                        label="Search Poll"
                        size="small"
                        onChange={handleSearch}
                        value={search}
                    ></TextField>
                </Box>
                {type === "allPolls" && (
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => navigate("/admin/create")}
                    >
                        Create Poll
                    </Button>
                )}
            </Stack>
            <ViewPolls
                activeFlag={activeFlag}
                pollsData={pollsData}
                type={type}
            />
            ;
        </>
    );
};
