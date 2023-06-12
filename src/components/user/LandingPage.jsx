import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { StyledOutletContainer, StyledSideBar } from "../Styles";
export const LandingPage = () => {
    const theme = useTheme();
    const activeStyles = ({ isActive }) => {
        return {
            display: "block",
            color: "white",
            fontWeight: isActive ? 900 : 200,
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
                <NavLink to="dashboard" style={activeStyles}>
                    dashboard
                </NavLink>
                <NavLink to="answeredpolls" style={activeStyles}>
                    answered polls
                </NavLink>
            </StyledSideBar>
            <StyledOutletContainer>
                <Outlet />
            </StyledOutletContainer>
        </Box>
    );
};
