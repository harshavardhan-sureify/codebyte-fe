import { Box, Typography } from "@mui/material";
import React from "react";

const ProgressCircle = ({ progress = "70", size = "100"}) => {
  const angle = (progress/100) * 360;
  return (
    <Box
      sx={{
        background: `radial-gradient(${"white"} 61%, transparent 56%),
                conic-gradient(transparent 0deg ${angle}deg, ${"lightgrey"} ${angle}deg 360deg),
                ${"#0E3758"}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
        margin: 1,
        display: "flex",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>{`${progress}%`}</Typography>
    </Box>
  );
};

export default ProgressCircle;
