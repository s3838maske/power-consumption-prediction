import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
} from "@mui/material";
import {
  Timeline,
  TrendingUp,
  QueryStats,
  Psychology,
  Lightbulb,
  CheckCircle,
} from "@mui/icons-material";
import LineChart from "../../components/charts/LineChart";
import Card from "../../components/common/Card";
import Loading from "../../components/common/Loading";
import Snackbar from "../../components/common/Snackbar";
import { userAPI } from "../../services/api/userAPI";
import { setPredictions } from "../../store/slices/userSlice";

const PredictionsContainer = () => {
  const dispatch = useDispatch();
  const { predictions } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(true);
  const [modelType, setModelType] = useState("random_forest");
  const [period, setPeriod] = useState("daily");
  const [chartData, setChartData] = useState({ categories: [], series: [] });
  const [recommendations, setRecommendations] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  useEffect(() => {
    fetchPredictions();
  }, [modelType]);

  const fetchPredictions = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getPredictions({ model: modelType });
      dispatch(setPredictions(response));

      // Update chart based on current period
      updateChartData(response, period);

      // Fetch recommendations
      const recResponse = await userAPI.getRecommendations();
      setRecommendations(recResponse || []);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching predictions:", error);
      setSnackbar({
        open: true,
        message: "Failed to load predictions",
        severity: "error",
      });
      setLoading(false);
    }
  };

  const updateChartData = (data, selectedPeriod) => {
    const periodData = data[selectedPeriod] || [];
    setChartData({
      categories: periodData.map((item) => item.date || item.label),
      series: [
        {
          name: "Predicted Consumption",
          data: periodData.map((item) => item.prediction),
          color: "#9c27b0",
        },
      ],
    });
  };

  const handlePeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setPeriod(newPeriod);
      updateChartData(predictions, newPeriod);
    }
  };

  const handleModelChange = (event, newModel) => {
    if (newModel !== null) {
      setModelType(newModel);
    }
  };

  if (loading && !predictions.daily) {
    return (
      <Loading message="Analyzing patterns and generating predictions..." />
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="600" gutterBottom>
            Consumption Predictions
          </Typography>
          <Typography variant="body1" color="text.secondary">
            AI-powered forecasting based on your historical usage patterns
          </Typography>
        </Box>
        <Paper
          elevation={1}
          sx={{ p: 0.5, display: "inline-flex", borderRadius: 2 }}
        >
          <ToggleButtonGroup
            value={modelType}
            exclusive
            onChange={handleModelChange}
            size="small"
            color="secondary"
          >
            <ToggleButton value="linear_regression">
              <Timeline sx={{ mr: 1 }} /> Linear Regression
            </ToggleButton>
            <ToggleButton value="random_forest">
              <Psychology sx={{ mr: 1 }} /> Random Forest (A.I)
            </ToggleButton>
          </ToggleButtonGroup>
        </Paper>
      </Box>

      <Grid container spacing={3}>
        {/* Prediction Chart */}
        <Grid item xs={12} lg={8}>
          <Card
            title="Forecast visualization"
            actions={
              <ToggleButtonGroup
                value={period}
                exclusive
                onChange={handlePeriodChange}
                size="small"
                color="primary"
                sx={{ ml: "auto" }}
              >
                <ToggleButton value="daily">Daily</ToggleButton>
                <ToggleButton value="weekly">Weekly</ToggleButton>
                <ToggleButton value="monthly">Monthly</ToggleButton>
              </ToggleButtonGroup>
            }
          >
            <LineChart
              title={`${
                period.charAt(0).toUpperCase() + period.slice(1)
              } Forecast`}
              categories={chartData.categories}
              series={chartData.series}
              yAxisTitle="Predicted Energy (kWh)"
            />
          </Card>
        </Grid>

        {/* Prediction Summary */}
        <Grid item xs={12} lg={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper sx={{ p: 3, bgcolor: "secondary.main", color: "white" }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <TrendingUp sx={{ mr: 1 }} />
                  <Typography variant="h6">Next Month Forecast</Typography>
                </Box>
                <Typography variant="h3" fontWeight="700">
                  {predictions.summary?.monthlyTotal || "0.00"}{" "}
                  <small>kWh</small>
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                  Expected{" "}
                  {predictions.summary?.percentageChange > 0
                    ? "increase"
                    : "decrease"}{" "}
                  of {Math.abs(predictions.summary?.percentageChange || 0)}%
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 3, border: "1px solid", borderColor: "divider" }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <QueryStats color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Accuracy Metrics</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">Model Confidence:</Typography>
                  <Typography variant="body2" fontWeight="600">
                    {predictions.accuracy?.confidence || "92"}%
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2">Mean Absolute Error:</Typography>
                  <Typography variant="body2" fontWeight="600">
                    {predictions.accuracy?.mae || "1.2"} kWh
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Recommendations */}
        <Grid item xs={12}>
          <Card
            title="Personalized Recommendations"
            subtitle="Actionable tips to reduce your forthcoming consumption spikes"
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={7}>
                <List>
                  {recommendations.length > 0 ? (
                    recommendations.map((rec, index) => (
                      <React.Fragment key={index}>
                        <ListItem alignItems="flex-start">
                          <ListItemIcon>
                            <Lightbulb color="warning" />
                          </ListItemIcon>
                          <ListItemText
                            primary={rec.title}
                            secondary={rec.description}
                          />
                          <Chip
                            label={`Save ~${rec.potentialSaving} kWh`}
                            size="small"
                            color="success"
                            variant="outlined"
                          />
                        </ListItem>
                        {index < recommendations.length - 1 && (
                          <Divider variant="inset" component="li" />
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      align="center"
                      sx={{ py: 4 }}
                    >
                      No recommendations at this time.
                    </Typography>
                  )}
                </List>
              </Grid>
              <Grid
                item
                xs={12}
                md={5}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    textAlign: "center",
                    p: 3,
                    bgcolor: "background.default",
                    borderRadius: 4,
                    width: "100%",
                  }}
                >
                  <CheckCircle
                    sx={{ fontSize: 60, color: "success.main", mb: 2 }}
                  />
                  <Typography variant="h6">Eco-Friendly Peak</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Your current usage pattern is within the 75th percentile of
                    efficient households!
                  </Typography>
                  <Button variant="outlined" sx={{ mt: 2 }}>
                    View Details
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Box>
  );
};

export default PredictionsContainer;
