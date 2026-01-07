import React from "react";
import { Snackbar as MuiSnackbar, Alert } from "@mui/material";

/**
 * Reusable Snackbar Component for notifications
 */
const Snackbar = ({
  open,
  onClose,
  message,
  severity = "info",
  autoHideDuration = 6000,
  anchorOrigin = { vertical: "top", horizontal: "right" },
}) => {
  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{ width: "100%" }}
        elevation={6}
      >
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
