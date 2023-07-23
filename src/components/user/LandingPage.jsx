import { useTheme } from "@emotion/react";
import { Box, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { StyledOutletContainer, StyledSideBar } from "../Styles";
import { auth, logout } from "../features/User.reducer";
import { useDispatch, useSelector } from "react-redux";
import { ADMIN_ROUTES, USER_ROLE, USER_ROUTES } from "../../constants";
import LogoutIcon from "@mui/icons-material/Logout";
import { matchPath } from "react-router-dom";
export const LandingPage = () => {
    const { role } = useSelector(auth);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [routes, setRoutes] = useState([]);
    useEffect(() => {
        if (role === USER_ROLE) {
            setRoutes(USER_ROUTES);
        } else setRoutes(ADMIN_ROUTES);
    }, [role]);

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
    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };
    return (
        <Box sx={{ display: "flex" }}>
            <StyledSideBar
                sx={{
                    display: {
                        sm: "none",
                        xs: "none",
                        md: "block",
                        lg: "block",
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "100%",
                    }}
                >
                    <Box>
                        {routes.map((route) => {
                            const isActive = route.activePaths
                                .map((pattern) =>
                                    matchPath(pattern, location.pathname)
                                )
                                .find(Boolean);
                            return (
                                <NavLink
                                    to={route.route}
                                    style={activeStyles({ isActive })}
                                    key={`navlink${route.name}`}
                                >
                                    {route.name}
                                </NavLink>
                            );
                        })}
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <IconButton
                            variant="contained"
                            sx={{
                                px: 3,
                                py: 1,
                                color: "white",
                                fontWeight: "",
                                fontSize: "16px",
                                background: "grey",
                                borderRadius: "0px",
                                width: "100%",
                                ":hover": {
                                    background: theme.palette.danger.main,
                                },
                            }}
                            onClick={handleLogout}
                            size="medium"
                        >
                            <LogoutIcon /> LOGOUT
                        </IconButton>
                    </Box>
                </Box>
            </StyledSideBar>
            <StyledOutletContainer>
                <Outlet />
            </StyledOutletContainer>
        </Box>
    );
};
