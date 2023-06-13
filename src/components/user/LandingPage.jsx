import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { StyledOutletContainer, StyledSideBar } from "../Styles";
import { auth } from "../features/User.reducer";
import { useSelector } from "react-redux";
import { ADMIN_ROUTES, USER_ROLE, USER_ROUTES } from "../../constants";
export const LandingPage = () => {
    const { role } = useSelector(auth);
    const [routes, setRoutes] = useState([]);
    useEffect(() => {
        if (role === USER_ROLE) {
            setRoutes(USER_ROUTES);
        } else setRoutes(ADMIN_ROUTES);
    }, []);

    const theme = useTheme();
    const activeStyles = ({ isActive }) => {
        return {
            display: "block",
            color: "white",
            fontWeight: isActive ? 900 : 450,
            backgroundColor: isActive ? theme.palette.primary.main : "",
            textDecoration: "none",
            width: "100%",
            padding: "5% 0",
            textTransform: "uppercase",
            textAlign: "center",
        };
    };
    return (
        <Box sx={{ display: "flex" }}>
            <StyledSideBar>
                {routes.map((route) => (
                    <NavLink to={route.route} style={activeStyles} key = {`navlink${route.name}`}>
                        {route.name}
                    </NavLink>
                ))}
            </StyledSideBar>
            <StyledOutletContainer>
                <Outlet />
            </StyledOutletContainer>
        </Box>
    );
};
