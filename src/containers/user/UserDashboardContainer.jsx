import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  IconButton,
  Badge,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  TrendingUp,
  Warning,
  Bolt,
  Notifications,
  CloudUpload,
  Assessment,
} from "@mui/icons-material";
import PieChart from "../../components/charts/PieChart";
import LineChart from "../../components/charts/LineChart";
import BarChart from "../../components/charts/BarChart";
import Card from "../../components/common/Card";
import Loading from "../../components/common/Loading";
import Snackbar from "../../components/common/Snackbar";
import { userAPI } from "../../services/api/userAPI";
import {
  setConsumptionData,
  setPredictions,
} from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

const UserDashboardContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { consumptionData, predictions } = useSelector((state) => state.user);
  const { unreadCount } = useSelector((state) => state.alert);

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalConsumption: 0,
    avgDailyConsumption: 0,
    peakConsumption: 0,
    predictedNextMonth: 0,
  });
  const [deviceData, setDeviceData] = useState([]);
  const [trendData, setTrendData] = useState({
    categories: [],
    series: [],
  });
  const [comparisonData, setComparisonData] = useState({
    categories: [],
    actual: [],
    predicted: [],
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch dashboard stats
      const statsResponse = await userAPI.getDashboardStats();
      setStats(statsResponse);

      // Fetch consumption data
      const consumptionResponse = await userAPI.getConsumptionData({
        period: "last_30_days",
      });
      dispatch(setConsumptionData(consumptionResponse.data));

      // Process device-wise data for pie chart
      const deviceWiseData = processDeviceData(
        consumptionResponse.deviceBreakdown
      );
      setDeviceData(deviceWiseData);

      // Process trend data for line chart
      const trendChartData = processTrendData(consumptionResponse.dailyData);
      setTrendData(trendChartData);

      // Fetch predictions
      const predictionsResponse = await userAPI.getPredictions();
      dispatch(setPredictions(predictionsResponse));

      // Process comparison data for bar chart
      const comparisonChartData = processComparisonData(
        consumptionResponse.weeklyData,
        predictionsResponse.weekly
      );
      setComparisonData(comparisonChartData);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setSnackbar({
        open: true,
        message:
          error.response?.data?.message || "Failed to load dashboard data",
        severity: "error",
      });
      setLoading(false);
    }
  };

  const processDeviceData = (deviceBreakdown = []) => {
    return deviceBreakdown.map((device) => ({
      name: device.deviceName,
      value: device.consumption,
    }));
  };

  const processTrendData = (dailyData = []) => {
    const categories = dailyData.map((item) => item.date);
    const series = [
      {
        name: "Daily Consumption",
        data: dailyData.map((item) => item.consumption),
        color: "#1976d2",
      },
    ];
    return { categories, series };
  };

  const processComparisonData = (weeklyData = [], weeklyPredictions = []) => {
    const categories = weeklyData.map((item) => item.week);
    const actual = weeklyData.map((item) => item.consumption);
    const predicted = weeklyPredictions.map((item) => item.prediction);
    return { categories, actual, predicted };
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return <Loading message="Loading dashboard..." />;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <DashboardIcon sx={{ fontSize: 40, color: "primary.main" }} />
          <Typography variant="h4" fontWeight="600">
            Dashboard
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<CloudUpload />}
            onClick={() => navigate("/user/upload")}
          >
            Upload Data
          </Button>
          <IconButton onClick={() => navigate("/user/alerts")}>
            <Badge badgeContent={unreadCount} color="error">
              <Notifications />
            </Badge>
          </IconButton>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              gap: 1,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Total Consumption</Typography>
              <Bolt sx={{ fontSize: 40, opacity: 0.8 }} />
            </Box>
            <Typography variant="h4" fontWeight="700">
              {stats.totalConsumption.toFixed(2)} kWh
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Last 30 days
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              gap: 1,
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              color: "white",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Avg Daily</Typography>
              <TrendingUp sx={{ fontSize: 40, opacity: 0.8 }} />
            </Box>
            <Typography variant="h4" fontWeight="700">
              {stats.avgDailyConsumption.toFixed(2)} kWh
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Per day average
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              gap: 1,
              background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              color: "white",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Peak Usage</Typography>
              <Warning sx={{ fontSize: 40, opacity: 0.8 }} />
            </Box>
            <Typography variant="h4" fontWeight="700">
              {stats.peakConsumption.toFixed(2)} kWh
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Highest recorded
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              gap: 1,
              background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
              color: "white",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Predicted</Typography>
              <Assessment sx={{ fontSize: 40, opacity: 0.8 }} />
            </Box>
            <Typography variant="h4" fontWeight="700">
              {stats.predictedNextMonth.toFixed(2)} kWh
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Next month forecast
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        {/* Device-wise Consumption - Pie Chart */}
        <Grid item xs={12} md={6}>
          <PieChart
            data={deviceData}
            title="Device-wise Energy Consumption"
            subtitle="Distribution of power usage by device"
          />
        </Grid>

        {/* Consumption Trend - Line Chart */}
        <Grid item xs={12} md={6}>
          <LineChart
            series={trendData.series}
            categories={trendData.categories}
            title="Daily Consumption Trend"
            yAxisTitle="Consumption (kWh)"
          />
        </Grid>

        {/* Actual vs Predicted - Bar Chart */}
        <Grid item xs={12}>
          <BarChart
            categories={comparisonData.categories}
            actualData={comparisonData.actual}
            predictedData={comparisonData.predicted}
            title="Actual vs Predicted Weekly Consumption"
          />
        </Grid>
      </Grid>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Box>
  );
};

export default UserDashboardContainer;
