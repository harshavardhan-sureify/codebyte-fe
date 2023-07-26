import React, { useEffect, useState } from "react";
import { ViewPolls } from "../user/ViewPolls";
import { ALL_POLLS_URL } from "../../constants";
import axios from "axios";
import { auth } from "../features/User.reducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    Stack,
    Tab,
    Tabs,
    TextField,
} from "@mui/material";
import { LoadingComponent } from "../commonComponents/LoadingComponent";
import { handleToaster } from "../features/Toaster.reducer";
import { activeTab, handleActiveTab } from "../features/ActiveTab.reducer";
import ClearIcon from "@mui/icons-material/Clear";

export const Polls = () => {
    const user = useSelector(auth);
    const { activeTab: currentActiveTab } = useSelector(activeTab);
    const dispatch = useDispatch();
    const [pollsData, setPollsData] = useState([]);
    const [resetPolls, setResetPolls] = useState([]);
    const [search, setSearch] = useState("");
    const activeFlag = false;
    const [selectedTab, setSelectedTab] = useState(currentActiveTab);
    const [activePolls, setActivePolls] = useState([]);
    const [endedPolls, setEndedPolls] = useState([]);
    const [upcomingPolls, setUpcomingPolls] = useState([]);
    const [focus, setFocus] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleSelectedTab = (e, value) => {
        setSelectedTab(value);
    };

    useEffect(() => {
        selectedTab === "Active"
            ? setPollsData([...activePolls])
            : selectedTab === "Ended"
            ? setPollsData([...endedPolls])
            : setPollsData([...upcomingPolls]);
        dispatch(handleActiveTab(selectedTab));
        // eslint-disable-next-line
    }, [selectedTab]);

    const navigate = useNavigate();
    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearch(value);
        if (value === "") {
            setPollsData([...resetPolls]);
            return;
        }

        const updatedPollsData = resetPolls.filter((cur) =>
            cur.title.toLowerCase().includes(value.trim())
        );
        setPollsData(updatedPollsData);
    };
    const managePolls = (data) => {
        const active = [];
        const ended = [];
        const upcoming = [];
        const currentDate = new Date().setHours(0, 0, 0, 0);
        data.forEach((cur) => {
            const startDate = new Date(cur.start_date).setHours(0, 0, 0, 0);
            const endDate = new Date(cur.end_date).setHours(0, 0, 0, 0);
            if (startDate <= currentDate && endDate >= currentDate) {
                active.push(cur);
            } else if (startDate > currentDate) {
                upcoming.push(cur);
            } else {
                ended.push(cur);
            }
        });
        setActivePolls(active);
        setUpcomingPolls(upcoming);
        setEndedPolls(ended);
        currentActiveTab === "Active"
            ? setPollsData([...active])
            : currentActiveTab === "Ended"
            ? setPollsData([...ended])
            : setPollsData([...upcoming]);
    };

    const fetchPolls = async () => {
        try {
            const token = user.token;
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const response = await axios.get(ALL_POLLS_URL, config);

            if (response.status === 200) {
                setResetPolls(response.data.data);
                managePolls(response.data.data);
                setLoading(false);
                setSelectedTab(currentActiveTab);
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
        fetchPolls();
        setSearch("");
        setSelectedTab(currentActiveTab);
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        if (!focus) {
            currentActiveTab === "Active"
                ? setPollsData([...activePolls])
                : currentActiveTab === "Ended"
                ? setPollsData([...endedPolls])
                : setPollsData([...upcomingPolls]);
            setSelectedTab(currentActiveTab);
        } else {
            setPollsData(resetPolls);
        }
        // eslint-disable-next-line
    }, [focus]);
    if (loading) {
        return <LoadingComponent />;
    }
    return (
        <>
            <Stack
                direction={"row"}
                justifyContent={"space-between"}
                pt={2}
                px={2}
                display="flex"
                flexWrap="wrap"
                rowGap={2}
            >
                <Box>
                    <TextField
                        placeholder="Enter the keywords"
                        label="Search Poll"
                        size="small"
                        onChange={handleSearch}
                        value={search}
                        onFocus={() => {
                            setFocus(true);
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {focus && (
                                        <IconButton
                                            onClick={() => {
                                                setFocus(false);
                                                setSearch("");
                                            }}
                                        >
                                            <ClearIcon />
                                        </IconButton>
                                    )}
                                </InputAdornment>
                            ),
                        }}
                    ></TextField>
                </Box>
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => navigate("/admin/create")}
                >
                    Create Poll
                </Button>
            </Stack>
            {!focus && !search.length > 0 && (
                <Box>
                    <Tabs value={selectedTab} onChange={handleSelectedTab}>
                        <Tab value="Active" label="Active"></Tab>
                        <Tab value="Ended" label="Ended"></Tab>
                        <Tab value="Upcoming" label="Upcoming"></Tab>
                    </Tabs>
                </Box>
            )}
            <ViewPolls
                refetch={fetchPolls}
                activeFlag={activeFlag}
                message={"No polls available"}
                pollsData={pollsData}
            />
        </>
    );
};
