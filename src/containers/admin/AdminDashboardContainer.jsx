import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Typography, Paper, Button, Chip } from "@mui/material";
import {
  People,
  Devices,
  Category,
  TrendingUp,
  Assessment,
  Warning,
} from "@mui/icons-material";
import LineChart from "../../components/charts/LineChart";
import BarChart from "../../components/charts/BarChart";
import PieChart from "../../components/charts/PieChart";
import Table from "../../components/common/Table";
import Loading from "../../components/common/Loading";
import { adminAPI } from "../../services/api/adminAPI";
import { setSystemAnalytics } from "../../store/slices/adminSlice";
import { useNavigate } from "react-router-dom";

const AdminDashboardContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { systemAnalytics } = useSelector((state) => state.admin);

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDevices: 0,
    totalCategories: 0,
    totalPredictions: 0,
    activeAlerts: 0,
  });
  const [userGrowthData, setUserGrowthData] = useState({
    categories: [],
    series: [],
  });
  const [categoryDistribution, setCategoryDistribution] = useState([]);
  const [recentPredictions, setRecentPredictions] = useState([]);

  useEffect(() => {
    fetchAdminDashboardData();
  }, []);

  const fetchAdminDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch system analytics
      const analyticsResponse = await adminAPI.getSystemAnalytics();
      dispatch(setSystemAnalytics(analyticsResponse));

      // Set stats
      setStats({
        totalUsers: analyticsResponse.totalUsers || 0,
        totalDevices: analyticsResponse.totalDevices || 0,
        totalCategories: analyticsResponse.totalCategories || 0,
        totalPredictions: analyticsResponse.totalPredictions || 0,
        activeAlerts: analyticsResponse.activeAlerts || 0,
      });

      // Process user growth data
      setUserGrowthData({
        categories:
          analyticsResponse.userGrowth?.map((item) => item.month) || [],
        series: [
          {
            name: "New Users",
            data: analyticsResponse.userGrowth?.map((item) => item.count) || [],
            color: "#1976d2",
          },
        ],
      });

      // Process category distribution
      setCategoryDistribution(
        analyticsResponse.categoryDistribution?.map((item) => ({
          name: item.categoryName,
          value: item.count,
        })) || []
      );

      // Fetch recent predictions
      const predictionsResponse = await adminAPI.getPredictionLogs({
        limit: 10,
      });
      setRecentPredictions(predictionsResponse.results || []);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching admin dashboard data:", error);
      setLoading(false);
    }
  };

  const predictionColumns = [
    { id: "user", label: "User", minWidth: 150 },
    { id: "type", label: "Type", minWidth: 100 },
    {
      id: "value",
      label: "Predicted Value",
      minWidth: 120,
      render: (row) => `${row.value} kWh`,
    },
    {
      id: "accuracy",
      label: "Accuracy",
      minWidth: 100,
      render: (row) => (
        <Chip
          label={`${row.accuracy}%`}
          color={
            row.accuracy >= 90
              ? "success"
              : row.accuracy >= 75
              ? "warning"
              : "error"
          }
          size="small"
        />
      ),
    },
    { id: "timestamp", label: "Date", minWidth: 150 },
  ];

  if (loading) {
    return <Loading message="Loading admin dashboard..." />;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight="600" sx={{ mb: 1 }}>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          System overview and analytics
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": { transform: "translateY(-4px)" },
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
            }}
            onClick={() => navigate("/admin/users")}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography variant="h6">Users</Typography>
              <People sx={{ fontSize: 40, opacity: 0.8 }} />
            </Box>
            <Typography variant="h3" fontWeight="700">
              {stats.totalUsers}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": { transform: "translateY(-4px)" },
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              color: "white",
            }}
            onClick={() => navigate("/admin/devices")}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography variant="h6">Devices</Typography>
              <Devices sx={{ fontSize: 40, opacity: 0.8 }} />
            </Box>
            <Typography variant="h3" fontWeight="700">
              {stats.totalDevices}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": { transform: "translateY(-4px)" },
              background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              color: "white",
            }}
            onClick={() => navigate("/admin/categories")}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography variant="h6">Categories</Typography>
              <Category sx={{ fontSize: 40, opacity: 0.8 }} />
            </Box>
            <Typography variant="h3" fontWeight="700">
              {stats.totalCategories}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": { transform: "translateY(-4px)" },
              background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
              color: "white",
            }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography variant="h6">Predictions</Typography>
              <TrendingUp sx={{ fontSize: 40, opacity: 0.8 }} />
            </Box>
            <Typography variant="h3" fontWeight="700">
              {stats.totalPredictions}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": { transform: "translateY(-4px)" },
              background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",
              color: "white",
            }}
            onClick={() => navigate("/admin/alerts")}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography variant="h6">Active Alerts</Typography>
              <Warning sx={{ fontSize: 40, opacity: 0.8 }} />
            </Box>
            <Typography variant="h3" fontWeight="700">
              {stats.activeAlerts}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <LineChart
            series={userGrowthData.series}
            categories={userGrowthData.categories}
            title="User Growth Trend"
            yAxisTitle="Number of Users"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <PieChart
            data={categoryDistribution}
            title="Category Distribution"
            subtitle="Devices by category"
          />
        </Grid>
      </Grid>

      {/* Recent Predictions Table */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="600" sx={{ mb: 2 }}>
          Recent Predictions
        </Typography>
        <Table
          columns={predictionColumns}
          rows={recentPredictions}
          page={0}
          rowsPerPage={10}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
        />
      </Box>
    </Box>
  );
};

export default AdminDashboardContainer;
