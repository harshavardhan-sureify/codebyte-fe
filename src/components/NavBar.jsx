import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import logo from "../assets/images/logo.png";
import { isLoggedIn, logout } from "./features/User.reducer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
    const dispatch = useDispatch();
    const isLogIn = useSelector(isLoggedIn);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(false);

    const handleMenu = (event) => {
        setAnchorEl(!anchorEl);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <img
                        src={logo}
                        alt=""
                        width="32px"
                        heigth="32px"
                        style={{ marginRight: "5px" }}
                    />
                    <Typography
                        variant="h4"
                        color={"white"}
                        fontWeight={"bold"}
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        codebyte
                    </Typography>
                    {isLogIn && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                sx={{
                                    marginTop: "35px",
                                }}
                            >
                                <MenuItem onClick={handleClose}>
                                    Profile
                                </MenuItem>
                                <MenuItem
                                    onClick={handleLogout}
                                    sx={{ color: "danger" }}
                                >
                                    Logout
                                </MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
