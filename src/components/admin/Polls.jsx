import React, { useEffect, useState } from "react";
import { ViewPolls } from "../user/ViewPolls";
import { ALL_POLLS_URL } from "../../constants";
import axios from "axios";
import { auth } from "../features/User.reducer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Stack, Tab, Tabs, TextField } from "@mui/material";
import { LoadingContainer } from "../Styles";

export const Polls = () => {
  const user = useSelector(auth);
  const [pollsData, setPollsData] = useState([]);
  const [resetPolls, setResetPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const activeFlag = false;
  const [selectedTab, setSelectedTab] = useState("Active");
  const [activePolls, setActivePolls] = useState([]);
  const [endedPolls, setEndedPolls] = useState([]);
  const [upcomingPolls, setUpcomingPolls] = useState([]);
  const [focus, setFocus] = useState(false);

  const handleSelectedTab = (e, value) => {
    setSelectedTab(value);
  };
  useEffect(() => {
    selectedTab === "Active"
      ? setPollsData([...activePolls])
      : selectedTab === "Ended"
      ? setPollsData([...endedPolls])
        : setPollsData([...upcomingPolls]);
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
    setLoading(false);

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
    setPollsData(active);
    setLoading(false)
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
      }
    } catch (err) {
      localStorage.clear();
      navigate("/login");
    }
  };
  useEffect(() => {
      fetchPolls();
      setSearch("");
      // eslint-disable-next-line
  }, []);
  useEffect(() => {
      if (!focus) {
          setPollsData([...activePolls]);
          setSelectedTab("Active");
      } else {
          setPollsData(resetPolls);
      }
      setLoading(false);
      // eslint-disable-next-line
  }, [focus]);
  if (loading) {
    return <LoadingContainer />;
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
            onFocus={() => {
              setFocus(true);
            }}
          ></TextField>
        </Box>
        <Box flex={1} onClick={() => setFocus(false)}></Box>

        <Button
          variant="contained"
          color="secondary"
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
      <ViewPolls activeFlag={activeFlag} message={"Currently there are no upcoming polls"} pollsData={pollsData} />
    </>
  );
};
