import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

/**
 * Reusable Loading Component
 */
const Loading = ({ message = "Loading...", fullScreen = false }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: fullScreen ? "100vh" : 300,
        gap: 2,
      }}
    >
      <CircularProgress size={60} />
      <Typography variant="body1" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

export default Loading;
