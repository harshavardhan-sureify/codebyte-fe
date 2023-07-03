import { Card, Grid, Typography, Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProgressCircle from "../ProgressCircle";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";
import { ADMIN_DASHBOARD_URL } from "../../constants";
import { useSelector } from "react-redux";
import { auth } from "../features/User.reducer";
import { LoadingContainer } from "../Styles";
const AdminDashBoard = () => {
    const user = useSelector(auth);
    const [data, setData] = useState([]);
    const [barData, setBarData] = useState([]);
    const [loading, setLoading] = useState(true);
    const BarGraph = () => {
        return (
            <ResponsiveBar
                data={barData}
                keys={["count"]}
                margin={{ top: 50, right: 10, bottom: 50, left: 60 }}
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
                    tickRotation: 8,
                    legend: "Polls",
                    legendPosition: "middle",
                    legendOffset: 40,
                    justify: true,
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "No of users",
                    legendPosition: "middle",
                    legendOffset: -40,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor="white"
                legends={[
                    {
                        dataFrom: "keys",
                        anchor: "bottom-right",
                        direction: "column",
                        justify: true,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 6,
                        itemWidth: 50,
                        itemHeight: 20,
                        itemDirection: "bottom-to-top",
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: "hover",
                                style: {
                                    itemOpacity: 1,
                                    itemBackground: "white",
                                    itemTextColor: "white",
                                },
                            },
                        ],
                    },
                ]}
                useMesh={true}
                animate={true}
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
                // dispatch(handleToaster({
                //     message:err.response.data.data.message,
                //     severity:'error',
                //     open:true
                // }))
            });
    }, [user.token]);
    if (loading) {
        return (
            <LoadingContainer>
                <CircularProgress />
                <Typography variant="subtitle">Loading</Typography>
            </LoadingContainer>
        );
    }
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
                <Grid item xs={12} sm={6} lg={4} md={4}>
                    {/* total active users */}
                    <Card elevation={4}>
                        <Grid container columns={12}>
                            <Grid item sm={4} md={6} lg={4}>
                                <ProgressCircle
                                    progress={Math.round(
                                        (data?.activeUsers / data?.allUsers) *
                                            100
                                    )}
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
                                    Total Active Users
                                </Typography>
                                <Typography color={"grey"}>
                                    Active Users : {data.activeUsers}
                                </Typography>
                                <Typography color={"grey"}>
                                    All Users : {data.allUsers}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} md={4}>
                    <Card elevation={4}>
                        <Grid container columns={10}>
                            <Grid item sm={3} md={5} lg={3}>
                                <ProgressCircle
                                    progress={Math.round(
                                        (data?.activePolls / data?.allPolls) *
                                            100
                                    )}
                                />
                            </Grid>
                            <Grid
                                item
                                sm={7}
                                md={5}
                                lg={7}
                                alignItems="flex-start"
                                p={2}
                            >
                                <Typography variant="h6">
                                    Total Active Polls
                                </Typography>
                                <Typography color={"grey"}>
                                    Active Polls : {data.activePolls}
                                </Typography>
                                <Typography color={"grey"}>
                                    All Polls : {data.allPolls}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} md={4}>
                    <Card elevation={4}>
                        <Grid container columns={10}>
                            <Grid item sm={3} md={5} lg={3}>
                                <ProgressCircle />
                            </Grid>
                            <Grid
                                item
                                sm={7}
                                md={5}
                                lg={7}
                                alignItems="flex-start"
                                p={2}
                            >
                                <Typography variant="h6">
                                    Total Attended polls
                                </Typography>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
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
