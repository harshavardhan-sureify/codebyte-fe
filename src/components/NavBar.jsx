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
import { auth, isLoggedIn, logout } from "./features/User.reducer";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import {
    Button,
    Drawer,
    List,
   
} from "@mui/material";
import { USER_ROLE } from "../constants";
import { USER_ROUTES } from "../constants";
import { ADMIN_ROUTES } from "../constants";
import { useTheme } from "@emotion/react";

export default function NavBar() {
    const dispatch = useDispatch();
    const isLogIn = useSelector(isLoggedIn);
    const { role } = useSelector(auth);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(false);
    const [routes, setRoutes] = React.useState([]);
    React.useEffect(() => {
        if (role === USER_ROLE) {
            setRoutes(USER_ROUTES);
        } else setRoutes(ADMIN_ROUTES);
    }, []);

    const handleMenu = (event) => {
        setAnchorEl(!anchorEl);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const [state, setState] = React.useState({
        left: false,
    });

     const theme = useTheme();
     const activeStyles = ({ isActive }) => {
         return {
             display: "block",
             color: "white",
             fontWeight: isActive ? 700 : 450,
             backgroundColor: isActive ? theme.palette.primary.light : "",
             textDecoration: "none",
             width: "100%",
             padding: "5% 0",
             textTransform: "uppercase",
             textAlign: "center",
         };
     };

    const list = (anchor) => {
        return (
            <Box
                sx={{ width: 200,height:"100vh",background:theme.palette.secondary.main }}
                role="presentation"
                onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}
            >
                <List>
                    {routes.map((route) => (
                        <NavLink
                            to={route.route}
                            style={activeStyles}
                            key={`navlink${route.name}`}
                        >
                            {route.name}
                        </NavLink>
                    ))}
                </List>
            </Box>
        );
    };

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Button
                        onClick={toggleDrawer("left", true)}
                        sx={{
                            display: {
                                xs: "block",
                                sm: "block",
                                md: "none",
                                lg: "none",
                            },
                        }}
                    >
                        <MenuIcon
                            sx={{
                                mr: 2,

                                color: "white",
                            }}
                        />
                    </Button>
                    <Drawer
                        anchor="left"
                        open={state["left"]}
                        onClose={toggleDrawer("left", false)}
                    >
                        {list("left")}
                    </Drawer>
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
