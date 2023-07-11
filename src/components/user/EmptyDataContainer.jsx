import { Box, Typography } from "@mui/material";
import React from "react";
export const EmptyDataContainer = ({ message }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "60vh",   
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
            }}
        >
            <img
                src="/assets/notfound.jpeg"
                alt="404"
                style={{ width: "150px", borderRadius: "10px" }}
            />

            <Typography variant="h5" fontWeight={500}>
                {message}
            </Typography>
        </Box>
    );
};
