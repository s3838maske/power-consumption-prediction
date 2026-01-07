import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

// Auth Pages
import LoginPage from "../pages/Auth/LoginPage";
import RegistrationPage from "../pages/Auth/RegistrationPage";

// User Pages
import UserDashboardPage from "../pages/User/UserDashboardPage";
import DataUploadPage from "../pages/User/DataUploadPage";
import PredictionsPage from "../pages/User/PredictionsPage";
import ReportsPage from "../pages/User/ReportsPage";
import AlertsPage from "../pages/User/AlertsPage";

// Admin Pages
import AdminDashboardPage from "../pages/Admin/AdminDashboardPage";
import UserManagementPage from "../pages/Admin/UserManagementPage";
import CategoryManagementPage from "../pages/Admin/CategoryManagementPage";
import DeviceManagementPage from "../pages/Admin/DeviceManagementPage";

// Layouts
import UserLayout from "../components/layouts/UserLayout";
import AdminLayout from "../components/layouts/AdminLayout";

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return (
      <Navigate
        to={role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
        replace
      />
    );
  }

  return children;
};

const AppRoutes = () => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate
                to={role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
                replace
              />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/user/dashboard" replace />
            ) : (
              <RegistrationPage />
            )
          }
        />

        {/* User Routes */}
        <Route
          path="/user/*"
          element={
            <ProtectedRoute requiredRole="user">
              <UserLayout>
                <Routes>
                  <Route path="dashboard" element={<UserDashboardPage />} />
                  <Route path="upload" element={<DataUploadPage />} />
                  <Route path="predictions" element={<PredictionsPage />} />
                  <Route path="reports" element={<ReportsPage />} />
                  <Route path="alerts" element={<AlertsPage />} />
                  <Route
                    path="*"
                    element={<Navigate to="/user/dashboard" replace />}
                  />
                </Routes>
              </UserLayout>
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout>
                <Routes>
                  <Route path="dashboard" element={<AdminDashboardPage />} />
                  <Route path="users" element={<UserManagementPage />} />
                  <Route
                    path="categories"
                    element={<CategoryManagementPage />}
                  />
                  <Route path="devices" element={<DeviceManagementPage />} />
                  <Route
                    path="*"
                    element={<Navigate to="/admin/dashboard" replace />}
                  />
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Default Route */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate
                to={role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
                replace
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* 404 Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
