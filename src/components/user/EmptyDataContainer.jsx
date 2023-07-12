import { Box, Typography } from "@mui/material";
import React from "react";
import Notfound from "../../assets/images/notfound.jpeg";
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
                src={Notfound}
                alt="404"
                style={{ width: "150px", borderRadius: "10px" }}
            />

            <Typography variant="h5" fontWeight={500}>
                {message}
            </Typography>
        </Box>
    );
};
