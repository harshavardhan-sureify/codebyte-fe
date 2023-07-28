import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../features/User.reducer";
import axios from "axios";
import { ALL_USERS_URL, UPDATE_USER_STATUS_URL } from "../../constants";
import PersonIcon from "@mui/icons-material/Person";
import { EmptyDataContainer } from "../user/EmptyDataContainer";
import {
    Avatar,
    Box,
    Button,
    Grid,
    IconButton,
    InputAdornment,
    Modal,
    Paper,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Tabs,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import AddUserButton from "./AddUserButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatDate } from "./../utils";
import { handleToaster } from "../features/Toaster.reducer";
import { LoadingComponent } from "../commonComponents/LoadingComponent";
import ClearIcon from "@mui/icons-material/Clear";
import RestoreIcon from "@mui/icons-material/Restore";
const StyledTableCell = styled(TableCell)`
    text-align: center;
    background-color: ${(props) => (props.head ? "lightgrey" : "white")};
`;
const AllUsers = () => {
    const user = useSelector(auth);
    const [userData, setUserData] = useState([]);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [page, setPage] = useState(2);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [statusUpdateUser, setStatusUpdateUser] = useState({});
    const [selectedTab, setSelectedTab] = useState("Active");
    const [focus, setFocus] = useState(false);
    const [activeUsers, setActiveUsers] = useState([]);
    const [inActiveUsers, setInActiveUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleSelectedTab = (e, value) => {
        setSelectedTab(value);
    };
    useEffect(() => {
        const users =
            selectedTab === "Active" ? [...activeUsers] : [...inActiveUsers];
        setFilteredData(users);
        setPage(0);
        // eslint-disable-next-line
    }, [selectedTab]);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleStatusUpdateModal = (user) => {
        setStatusUpdateUser(user);
        setIsOpen(true);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const submitUpdateUserStatus = () => {
        setIsOpen(false);
        let severity = "";
        let message = "";
        axios
            .post(
                `${UPDATE_USER_STATUS_URL}`,
                { userId: statusUpdateUser.user_id },
                {
                    headers: { Authorization: user.token },
                }
            )
            .then((res) => {
                severity = "success";
                message = res.data.message;
            })
            .catch((error) => {
                severity = "error";
                message = error.response.data.data.message;
            })
            .finally(() => {
                dispatch(
                    handleToaster({
                        message,
                        severity,
                        open: true,
                    })
                );
                fetchAllUsers();
                setLoading(false);
            });
    };

    const fetchAllUsers = () => {
        axios
            .get(ALL_USERS_URL, {
                headers: { Authorization: "Bearer " + user.token },
            })
            .then((res) => {
                setUserData(res.data.data.users);
                const active = res.data.data.users.filter(
                    (curUser) => curUser.is_active === "1"
                );
                setActiveUsers(active);
                setInActiveUsers(
                    res.data.data.users.filter(
                        (curUser) => curUser.is_active === "0"
                    )
                );

                setFilteredData(active);
                setLoading(false);
                setSelectedTab("Active")
            })
            .catch((err) => {
                dispatch(
                    handleToaster({
                        message: "Internal Server Error",
                        severity: "error",
                        open: true,
                    })
                );
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchAllUsers();
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        if (searchText.length === 0) {
            setFilteredData(activeUsers);
            return;
        }
        setFilteredData(
            userData?.filter(
                (user) =>
                    user.name
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    user.user_id.includes(searchText.trim())
            )
        );
        setPage(0);
        // eslint-disable-next-line
    }, [searchText]);
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentPageData = filteredData.slice(startIndex, endIndex);
    if (loading) {
        return <LoadingComponent />;
    }
    return (
        <Box>
            <Grid
                container
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
                pt={2}
                px={2}
                rowGap={2}
            >
                <Grid item>
                    <TextField
                        label="Search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        size="small"
                        onFocus={() => setFocus(true)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {focus && (
                                        <IconButton
                                            onClick={() => {
                                                setFocus(false);
                                                setSearchText("");
                                            }}
                                        >
                                            <ClearIcon />
                                        </IconButton>
                                    )}
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item flex={1}>
                    <Box />
                </Grid>
                <Grid item>
                    <AddUserButton refetch={fetchAllUsers} />
                </Grid>
            </Grid>
            {!focus && !searchText.length > 0 && (
                <Box>
                    <Tabs value={selectedTab} onChange={handleSelectedTab}>
                        <Tab value={"Active"} label="Active"></Tab>
                        <Tab value={"Inactive"} label="Inactive"></Tab>
                    </Tabs>
                </Box>
            )}
            {currentPageData.length > 0 ? (
                <Box pt={2}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell head="true">
                                    Sno.
                                </StyledTableCell>
                                <StyledTableCell head="true">
                                    Name
                                </StyledTableCell>
                                <StyledTableCell head="true">
                                    Email
                                </StyledTableCell>

                                <StyledTableCell head="true">
                                    Created At
                                </StyledTableCell>
                                <StyledTableCell head="true">
                                    Actions
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentPageData?.map((user, ind) => (
                                <TableRow key={user.user_id}>
                                    <StyledTableCell>
                                        {startIndex + ind + 1}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {user.name}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {user.email}
                                    </StyledTableCell>

                                    <StyledTableCell>
                                        {formatDate(user.created_at)}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Tooltip
                                            title={
                                                user.is_active === "1"
                                                    ? "Delete user"
                                                    : "Activate user"
                                            }
                                        >
                                            <IconButton
                                                variant="contained"
                                                color={
                                                    user.is_active === "1"
                                                        ? "error"
                                                        : "success"
                                                }
                                                onClick={() =>
                                                    handleStatusUpdateModal(user)
                                                }
                                            >
                                                {user.is_active === "1" ? (
                                                    <DeleteIcon fontSize="medium" />
                                                ) : (
                                                    <RestoreIcon />
                                                )}
                                            </IconButton>
                                        </Tooltip>
                                    </StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        component="div"
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        count={filteredData.length}
                        page={page}
                        onPageChange={handleChangePage}
                    />
                </Box>
            ) : (
                <EmptyDataContainer message="No users found!!" />
            )}
            <Modal
                open={isOpen}
                onClose={() => {
                    setIsOpen(false);
                }}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Paper
                    sx={{
                        width: "300px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        p: 2,
                    }}
                >
                    <Box pb={2}>
                        <Avatar>
                            <PersonIcon />
                        </Avatar>
                    </Box>
                    <Box sx={{ typography: "subtitle2" }}>
                        <Typography variant="subtitle2">
                            {statusUpdateUser.is_active === "1"
                                ? "Are you sure want to delete the user "
                                : "Are you sure want to activate the user "}
                            {statusUpdateUser.name}?
                        </Typography>
                    </Box>
                    <Grid container pt={2} justifyContent="flex-end" gap={2}>
                        <Grid item>
                            <Button
                                onClick={() => setIsOpen(false)}
                                color="error"
                                variant="contained"
                                size="small"
                            >
                                no
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                color="success"
                                variant="contained"
                                onClick={() => submitUpdateUserStatus()}
                                size="small"
                            >
                                yes
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Modal>
        </Box>
    );
};

export default AllUsers;
