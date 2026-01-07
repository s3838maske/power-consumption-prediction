import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Chip,
  Paper,
  Divider,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import {
  Warning,
  NotificationsActive,
  CheckCircle,
  DeleteOutline,
  Lightbulb,
  Bolt,
  ErrorOutline,
} from "@mui/icons-material";
import { formatDistanceToNow } from "date-fns";
import {
  setAlerts,
  markAsRead,
  deleteAlert,
  markAllAsRead,
} from "../../store/slices/alertSlice";
import { userAPI } from "../../services/api/userAPI";

const AlertsContainer = () => {
  const dispatch = useDispatch();
  const { alerts, unreadCount } = useSelector((state) => state.alert);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        const data = await userAPI.getAlerts();
        dispatch(setAlerts(data));
      } catch (error) {
        console.error("Error fetching alerts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (alerts.length === 0) {
      fetchAlerts();
    }
  }, [dispatch, alerts.length]);

  const getAlertIcon = (type, severity) => {
    switch (type) {
      case "spike":
        return <Bolt color="error" />;
      case "threshold":
        return <Warning color="warning" />;
      case "suggestion":
        return <Lightbulb color="info" />;
      default:
        return <NotificationsActive color="primary" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case "high":
      case "critical":
        return "error";
      case "medium":
      case "warning":
        return "warning";
      case "low":
      case "info":
        return "info";
      default:
        return "default";
    }
  };

  if (loading && alerts.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: "auto" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <NotificationsActive sx={{ fontSize: 32, color: "primary.main" }} />
          <Typography variant="h4" fontWeight="600">
            Alerts & Notifications
          </Typography>
          {unreadCount > 0 && (
            <Chip label={`${unreadCount} New`} color="error" size="small" />
          )}
        </Box>
        <Button
          startIcon={<CheckCircle />}
          onClick={() => dispatch(markAllAsRead())}
          disabled={unreadCount === 0}
        >
          Mark all as read
        </Button>
      </Box>

      {alerts.length === 0 ? (
        <Paper
          elevation={1}
          sx={{ p: 10, textAlign: "center", borderRadius: 4 }}
        >
          <CheckCircle
            sx={{ fontSize: 80, color: "success.light", mb: 2, opacity: 0.5 }}
          />
          <Typography variant="h6" color="text.secondary">
            You're all caught up!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            No active alerts or spikes detected in your consumption history.
          </Typography>
        </Paper>
      ) : (
        <Paper elevation={2} sx={{ borderRadius: 3, overflow: "hidden" }}>
          <List sx={{ p: 0 }}>
            {alerts.map((alert, index) => {
              const timestamp = alert.timestamp
                ? new Date(alert.timestamp)
                : new Date();
              return (
                <React.Fragment key={alert.id}>
                  <ListItem
                    alignItems="flex-start"
                    sx={{
                      bgcolor: alert.read ? "transparent" : "action.hover",
                      py: 2,
                      transition: "all 0.2s",
                      "&:hover": { bgcolor: "action.selected" },
                    }}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        onClick={() => dispatch(deleteAlert(alert.id))}
                      >
                        <DeleteOutline />
                      </IconButton>
                    }
                    onClick={() =>
                      !alert.read && dispatch(markAsRead(alert.id))
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor: "background.paper",
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        {getAlertIcon(alert.type, alert.severity)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 0.5,
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            fontWeight={alert.read ? 500 : 700}
                          >
                            {alert.title || "Observation"}
                          </Typography>
                          {alert.severity && (
                            <Chip
                              label={alert.severity.toUpperCase()}
                              size="small"
                              color={getSeverityColor(alert.severity)}
                              variant={alert.read ? "outlined" : "filled"}
                              sx={{ height: 20, fontSize: "0.65rem" }}
                            />
                          )}
                        </Box>
                      }
                      secondary={
                        <Box component="span">
                          <Typography
                            variant="body2"
                            color="text.primary"
                            sx={{ mb: 0.5 }}
                          >
                            {alert.message}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {isNaN(timestamp.getTime())
                              ? "Just now"
                              : formatDistanceToNow(timestamp, {
                                  addSuffix: true,
                                })}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < alerts.length - 1 && <Divider component="li" />}
                </React.Fragment>
              );
            })}
          </List>
        </Paper>
      )}

      {/* Recommendations Card */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          💡 Current Insights
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                gap: 2,
                borderLeft: "4px solid",
                borderLeftColor: "info.main",
              }}
            >
              <Avatar sx={{ bgcolor: "info.light" }}>
                <Lightbulb />
              </Avatar>
              <Box>
                <Typography variant="subtitle2">Off-peak efficiency</Typography>
                <Typography variant="body2" color="text.secondary">
                  Moving your heavy usage (Washing Machine) to 11 PM - 5 AM
                  could reduce your bill by 15%.
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                gap: 2,
                borderLeft: "4px solid",
                borderLeftColor: "warning.main",
              }}
            >
              <Avatar sx={{ bgcolor: "warning.light" }}>
                <Bolt />
              </Avatar>
              <Box>
                <Typography variant="subtitle2">AC Maintenance Tip</Typography>
                <Typography variant="body2" color="text.secondary">
                  Your AC consumption is 12% higher than similar users. Cleaning
                  the filter might help.
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AlertsContainer;
