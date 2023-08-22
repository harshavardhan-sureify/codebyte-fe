import {
    Card,
    Grid,
    Typography,
    Box,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ProgressCircle from "../ProgressCircle";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";
import { ADMIN_DASHBOARD_URL } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../features/User.reducer";
import { LoadingComponent } from "../commonComponents/LoadingComponent";
import { handleToaster } from "../features/Toaster.reducer";
const AdminDashBoard = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const greaterThanMid = useMediaQuery(theme.breakpoints.up("md"));
    const user = useSelector(auth);
    const [data, setData] = useState([]);
    const [barData, setBarData] = useState([]);
    const [loading, setLoading] = useState(true);
    const BarGraph = () => {
        return (
            <ResponsiveBar
                data={barData}
                keys={["count"]}
                margin={{
                    top: 50,
                    right: 10,
                    bottom: greaterThanMid ? 50 : 100,
                    left: 60,
                }}
                padding={0.4}
                innerPadding={1}
                valueScale={{ type: "linear" }}
                indexScale={{ type: "band", round: true }}
                valueFormat=" <-"
                colors={["#0E3758"]}
                indexBy="option"
                theme={{
                    axis: {
                        domain: {
                            line: {
                                stroke: "lightgrey",
                            },
                        },
                        legend: {
                            text: {
                                fill: "black",
                            },
                        },
                        ticks: {
                            line: {
                                stroke: "lightgrey",
                                strokeWidth: 1,
                            },
                            text: {
                                fill: "black",
                            },
                        },
                    },
                    legends: {
                        text: {
                            fill: "black",
                        },
                    },
                    tooltip: {
                        container: {
                            background: "blue",
                            color: "black",
                        },
                    },
                }}
                fill={[
                    {
                        match: {
                            id: "count",
                        },
                        id: "fiil",
                    },
                ]}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 7,
                    tickRotation: greaterThanMid ? 8 : 90,
                    legend: "Polls",
                    legendPosition: "middle",
                    legendOffset: greaterThanMid ? 40 : 80,
                    justify: true,
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "No of users",
                    legendPosition: "middle",
                    legendOffset: -40,
                    tickValues: barData?.reduce(
                        (set, { count }) => set.add(count),
                        new Set()
                    ).size,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor="white"
                useMesh={true}
                animate={true}
                gridYValues={
                    barData?.reduce(
                        (set, { count }) => set.add(count),
                        new Set()
                    ).size
                }
                reverseAnimation={true}
                motionStiffness={120}
                motionDamping={10}
                tooltip={(e) => {
                    return (
                        <Box
                            sx={{
                                padding: "6px 8px",
                                backgroundColor: "#AEC964",
                                borderRadius: "8px",
                            }}
                        >
                            {`${e.id} : ${e.value}`}
                        </Box>
                    );
                }}
                role="application"
                ariaLabel="Nivo bar chart demo"
                barAriaLabel={function (e) {
                    return (
                        e.id +
                        ": " +
                        e.formattedValue +
                        " in country: " +
                        e.indexValue
                    );
                }}
            />
        );
    };
    useEffect(() => {
        axios
            .get(ADMIN_DASHBOARD_URL, {
                headers: {
                    Authorization: user.token,
                },
            })
            .then((res) => {
                setData(res.data.data);
                const dd = [];
                res.data.data.recentPolls.forEach((poll, ind) => {
                    const obj = {};
                    obj["count"] = poll.usersAnswered;
                    obj["option"] = poll.title;
                    dd.push(obj);
                });
                setBarData(dd);
                setLoading(false);
            })
            .catch((err) => {
                dispatch(
                    handleToaster({
                        message: err.response.data.message,
                        severity: "error",
                        open: true,
                    })
                );
            });
        // eslint-disable-next-line
    }, [user.token]);

    if (loading) {
        return <LoadingComponent />;
    }
    const topCardsData = [
        {
            heading: "Total active users",
            subHeading1: "Active users",
            subHeading2: "Total users",
            progressPercentage: Math.round(
                (data?.activeUsers / data?.allUsers) * 100
            ),
            subHeading1Data: data.activeUsers,
            subHeading2Data: data.allUsers,
        },
        {
            heading: "Total active polls",
            subHeading1: "Active polls",
            subHeading2: "Total polls",
            progressPercentage: Math.round(
                (data?.activePolls / data?.allPolls) * 100
            ),
            subHeading1Data: data.activePolls,
            subHeading2Data: data.allPolls,
        },
        {
            heading: "Total attended users",
            subHeading1: "",
            subHeading2: "",
            progressPercentage: Math.round(
                (data?.attendedPolls / data?.allPolls) * 100
            ),
            subHeading1Data: "",
            subHeading2Data: "",
        },
    ];
    return (
        <div
            style={{
                overflow: "auto",
            }}
        >
            <Grid
                container
                spacing={3}
                sx={{
                    p: 2,
                }}
            >
                {topCardsData.map((cardData, index) => (
                    <Grid item xs={12} sm={6} lg={4} md={4} key={index}>
                        <Card elevation={4} sx={{ height: "100%" }}>
                            <Grid container columns={12}>
                                <Grid item sm={4} md={6} lg={4}>
                                    <ProgressCircle
                                        progress={cardData.progressPercentage}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    sm={8}
                                    md={6}
                                    lg={8}
                                    alignItems="flex-start"
                                    p={2}
                                >
                                    <Typography variant="h6">
                                        {cardData.heading}
                                    </Typography>
                                    {cardData.subHeading1 && (
                                        <Typography color={"grey"}>
                                            {cardData.subHeading1} :{" "}
                                            <b>{cardData.subHeading1Data}</b>
                                        </Typography>
                                    )}
                                    {cardData.subHeading2 && (
                                        <Typography color={"grey"}>
                                            {cardData.subHeading2} :{" "}
                                            <b>{cardData.subHeading2Data}</b>
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                ))}
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Card elevation={4} sx={{ height: "420px" }}>
                        <BarGraph />
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default AdminDashBoard;
