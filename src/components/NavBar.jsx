import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import logo from "../assets/images/logo.png";
import { auth, isLoggedIn, logout } from "./features/User.reducer";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Drawer, List } from "@mui/material";
import { USER_ROLE } from "../constants";
import { USER_ROUTES } from "../constants";
import { ADMIN_ROUTES } from "../constants";
import { useTheme } from "@emotion/react";

export default function NavBar() {
    const dispatch = useDispatch();
    const isLogIn = useSelector(isLoggedIn);
    const { role, name } = useSelector(auth);
    const navigate = useNavigate();
    const [routes, setRoutes] = React.useState([]);
    React.useEffect(() => {
        if (role === USER_ROLE) {
            setRoutes(USER_ROUTES);
        } else setRoutes(ADMIN_ROUTES);
    }, [role, name]);

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
                sx={{
                    width: 200,
                    height: "100vh",
                    background: theme.palette.secondary.main,
                }}
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
                    {isLogIn && (
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
                    )}
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
                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                            }}
                        >
                            <Box sx={{ display: "flex", gap: 2 }}>
                                <Typography
                                    sx={{
                                        display: "flex",
                                        gap: 1,
                                        alignItems: "center",
                                    }}
                                >
                                    <AccountCircle />
                                    {name}
                                </Typography>
                            </Box>

                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => handleLogout()}
                            >
                                Logout
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
