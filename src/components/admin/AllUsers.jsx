import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { auth } from "../features/User.reducer";
import axios from "axios";
import { allUsers, deleteUserApi } from "../../constants";
import PersonIcon from "@mui/icons-material/Person";
import {
    Alert,
    Avatar,
    Box,
    Button,
    Grid,
    Modal,
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import AddUserButton from "./AddUserButton";
import { formatDate } from "./../utils";
const StyledTableCell = styled(TableCell)`
    text-align: center;
    background-color: ${(props) => (props.head ? "lightgrey" : "white")};
`;
const AllUsers = () => {
    const user = useSelector(auth);
    const [userData, setUserData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setsearchText] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [page, setPage] = useState(2);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [deleteUser, setDeleteUser] = useState({});
    const [alertOpen, setAlertOpen] = useState(false);
    const [severity, setSeverity] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleDeleteModal = (user) => {
        setDeleteUser(user);
        setIsOpen(true);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const submitUserDelete = () => {
        setIsOpen(false);
        axios
            .delete(`${deleteUserApi}\\${deleteUser.user_id}`, {
                headers: { Authorization: user.token },
            })
            .then((res) => {
                setSeverity("success");
                setAlertMessage(res.data.data.message);
            })
            .catch((error) => {
                setSeverity("error");
                setAlertMessage(error.response.data.data.message);
            })
            .finally(() => {
                setAlertOpen(true);
                fetchAllUsers();
            });
    };

    const fetchAllUsers = () => {
        axios
            .get(allUsers, {
                headers: { Authorization: "Bearer " + user.token },
            })
            .then((data) => {
                setUserData(data.data.data.users);
                setFilteredData(data.data.data.users);
            })
            .catch((err) => {
                setSeverity("error");
                setAlertMessage("Internal Server Error");
            });
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);
    useEffect(() => {
        setFilteredData(
            userData?.filter(
                (user) =>
                    user.name
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    user.user_id.includes(searchText)
            )
        );
        setPage(0);
    }, [searchText, userData]);
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentPageData = filteredData.slice(startIndex, endIndex);
    return (
        <Box>
            <Snackbar
                open={alertOpen}
                autoHideDuration={3000}
                onClose={() => setAlertOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                sx={{ paddingTop: "43px" }}
            >
                <Alert
                    onClose={() => setAlertOpen(false)}
                    severity={severity}
                    sx={{ width: "100%" }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
            <Grid
                container
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Grid item>
                    <TextField
                        label="Search"
                        value={searchText}
                        onChange={(e) => setsearchText(e.target.value)}
                        size="small"
                    />
                </Grid>
                <Grid item>
                    <AddUserButton />
                </Grid>
            </Grid>
            <Box pt={2}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell head>User Id</StyledTableCell>
                            <StyledTableCell head>Username</StyledTableCell>
                            <StyledTableCell head>Email</StyledTableCell>
                            <StyledTableCell head>Status</StyledTableCell>
                            <StyledTableCell head>Created At</StyledTableCell>
                            <StyledTableCell head>Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentPageData?.map((user, ind) => (
                            <TableRow key={user.user_id}>
                                <StyledTableCell>
                                    {user.user_id}
                                </StyledTableCell>
                                <StyledTableCell>{user.name}</StyledTableCell>
                                <StyledTableCell>{user.email}</StyledTableCell>
                                <StyledTableCell
                                    sx={{
                                        color:
                                            user.is_active === "1"
                                                ? "green"
                                                : "red",
                                    }}
                                >
                                    {user.is_active === "1"
                                        ? "Active"
                                        : "Inactive"}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {formatDate(user.created_at)}
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleDeleteModal(user)}
                                        disabled={!(user.is_active === "1")}
                                    >
                                        Delete
                                    </Button>
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
                            Are You sure you want to delete the user{" "}
                            {deleteUser.name}?
                        </Typography>
                    </Box>
                    <Grid container pt={2} justifyContent="flex-end" gap={2}>
                        <Grid item>
                            <Button onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                color="error"
                                variant="contained"
                                onClick={() => submitUserDelete()}
                            >
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Modal>
        </Box>
    );
};

export default AllUsers;
