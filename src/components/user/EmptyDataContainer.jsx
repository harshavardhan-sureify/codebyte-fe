import { Box, Typography } from "@mui/material";
import React from "react";
import Notfound from "../../assets/images/notfound.jpeg";
export const EmptyDataContainer = ({ message }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "60vh",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <img
                src={Notfound}
                alt="404"
                style={{ width: "150px", borderRadius: "10px" }}
            />

            <Typography variant="h5" fontWeight={500} textAlign="center" m={2}>
                {message}
            </Typography>
        </Box>
    );
};
