import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { auth } from "../features/User.reducer";
import axios from "axios";
import { allUsers } from "../../constants";
import {
    Box,
    Button,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
} from "@mui/material";
import styled from "@emotion/styled";
import Trigger from "../Trigger";
import { formatDate } from "./../utils";
const StyledTableCell = styled(TableCell)`
    text-align: center;
    background-color: ${(props) => (props.head ? "lightgrey" : "white")};
    color: ${(props) => (props.active ? "green" : "black")};
`;
const AllUsers = () => {
    const user = useSelector(auth);
    const [userData, setUserData] = useState([]);
    const [searchText, setsearchText] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [page, setPage] = useState(2);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleDeleteModal = (user) => {
        
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    useEffect(() => {
        axios
            .get(allUsers, {
                headers: { Authorization: "Bearer " + user.token },
            })
            .then((data) => {
                setUserData(data.data.data.users);
                setFilteredData(data.data.data.users);
            })
            .catch((err) => {
                console.log(err);
            });
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
            <Grid
                container
                sx={{
                    p: 2,
                    justifyContent: "space-evenly",
                    alignItems: "center",
                }}
            >
                <Grid item>
                    <TextField
                        label="Search"
                        value={searchText}
                        onChange={(e) => setsearchText(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <Trigger />
                </Grid>
            </Grid>
            <Box p={2}>
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
                                    active={user.is_active === "1"}
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
                                        onClick={handleDeleteModal(user)}
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
                    rowsPerPage={10}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    count={filteredData.length}
                    page={page}
                    onPageChange={handleChangePage}
                />
            </Box>
        </Box>
    );
};

export default AllUsers;
