import {
    Card,
    Grid,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ProgressCircle from "../ProgressCircle";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";
import { adminDashboardApi } from "../../constants";

const AdminDashBoard = () => {
    const [data, setData] = useState([]);
    const [barData, setBarData] = useState([]);
    const [tableData, setTableData] = useState([]);
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
                colors={{ scheme: "category10" }}
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
                defs={[
                    {
                        id: "fiil",
                        size: 4,
                        padding: 1,
                        color: "#38bcb2",
                    },
                ]}
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
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "polls",
                    legendPosition: "middle",
                    legendOffset: 32,
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "no of users",
                    legendPosition: "middle",
                    legendOffset: -40,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{
                    from: "color",
                    modifiers: [["darker", 1.6]],
                }}
                legends={[
                    {
                        dataFrom: "keys",
                        anchor: "bottom-right",
                        direction: "column",
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
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
    const RecentTable = () => {
        return (
            <Table>
                <TableHead>
                    <TableRow sx={{ background: "grey", color: "white" }}>
                        <TableCell color="white">Username</TableCell>
                        <TableCell>Poll Title</TableCell>
                        <TableCell>Option</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((row) => (
                        <TableRow>
                            <TableCell>{row.userName}</TableCell>
                            <TableCell>{row.pollTitle}</TableCell>
                            <TableCell>{row.selectedOption}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    };
    useEffect(() => {
        axios
            .get(adminDashboardApi, {
                headers: {
                    Authorization:
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODYzMDQ5NjEsImlkIjoxLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSJ9.hdzfx9Kb3BV5NpaqTv6dYFRBIy-TgcxKIw26huDNoOQ",
                },
            })
            .then((data) => {
                setTableData(data.data.data.recentAnswers);
                setData(data.data.data);
                const dd = [];
                data.data.data.recentPolls.forEach((poll, ind) => {
                    const obj = {};
                    obj["count"] = poll.usersAnswered;
                    obj["option"] = poll.title;
                    dd.push(obj);
                });
                setBarData(dd);
            });
    }, []);
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
                    background: "#f7f5ff",
                    padding: 2,
                }}
            >
                <Grid item xs={12} sm={6} lg={4} md={4}>
                    {/* total active users */}
                    <Card elevation={4}>
                        <Grid container columns={10}>
                            <Grid item sm={3} md={3} lg={3}>
                                <ProgressCircle
                                    progress={Math.round(
                                        (data?.activeUsers / data?.allUsers) *
                                            100
                                    )}
                                />
                            </Grid>
                            <Grid
                                item
                                sm={7}
                                md={7}
                                lg={7}
                                alignItems="flex-start"
                                p={2}
                            >
                                <Typography variant="h5">
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
                            <Grid item sm={3} md={3} lg={3}>
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
                                md={7}
                                lg={7}
                                alignItems="flex-start"
                                p={2}
                            >
                                <Typography variant="h5">
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
                            <Grid item sm={3} md={3} lg={3}>
                                <ProgressCircle />
                            </Grid>
                            <Grid
                                item
                                sm={7}
                                md={7}
                                lg={7}
                                alignItems="flex-start"
                                p={2}
                            >
                                <Typography variant="h5">Future</Typography>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8}>
                    <Card elevation={4} sx={{ height: "420px" }}>
                        <BarGraph />
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Card
                        elevation={4}
                        sx={{ height: "420px", overflow: "auto" }}
                    >
                        <RecentTable />
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default AdminDashBoard;
