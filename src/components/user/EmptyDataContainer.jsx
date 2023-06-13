import { Box, Typography } from "@mui/material";
import React from "react";
export const EmptyDataContainer = ({ isActive }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "86vh",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                gap:2
            }}
        >
            <img src="/assets/notfound.jpeg" alt="404" style={{width:"150px",borderRadius:"10px"}}/>
            <Typography variant="h4" fontWeight={500}>
                {isActive ? "Currently there are no Active polls for you !!!" : "You haven't answered any polls yet !!!"}
            </Typography>
        </Box>
    );
};
