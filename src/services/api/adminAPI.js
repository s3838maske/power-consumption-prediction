import apiClient from "./apiClient";

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    status: "active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "admin",
    status: "active",
  },
  {
    id: 3,
    name: "Bob Wilson",
    email: "bob@example.com",
    role: "user",
    status: "inactive",
  },
];

const mockCategories = [
  { id: 1, name: "Residential", description: "Standard home appliances" },
  { id: 2, name: "Commercial", description: "Office and industrial equipment" },
  {
    id: 3,
    name: "HVAC",
    description: "Heating, ventilation, and air conditioning",
  },
];

const mockDevices = [
  { id: 1, name: "AC Unit 1", category: "HVAC", status: "active" },
  { id: 2, name: "Server Rack", category: "Commercial", status: "active" },
  { id: 3, name: "Lighting", category: "Residential", status: "maintenance" },
];

export const adminAPI = {
  // User Management
  getUsers: async (params) => {
    // const response = await apiClient.get("/admin/users/", { params });
    // return response.data;
    return mockUsers;
  },

  createUser: async (userData) => {
    // const response = await apiClient.post("/admin/users/", userData);
    // return response.data;
    return { ...userData, id: Math.floor(Math.random() * 1000) };
  },

  updateUser: async (userId, userData) => {
    // const response = await apiClient.put(`/admin/users/${userId}/`, userData);
    // return response.data;
    return { ...userData, id: userId };
  },

  deleteUser: async (userId) => {
    // const response = await apiClient.delete(`/admin/users/${userId}/`);
    // return response.data;
    return { message: "User deleted successfully" };
  },

  // Category Management
  getCategories: async () => {
    // const response = await apiClient.get("/admin/categories/");
    // return response.data;
    return mockCategories;
  },

  createCategory: async (categoryData) => {
    // const response = await apiClient.post("/admin/categories/", categoryData);
    // return response.data;
    return { ...categoryData, id: Math.floor(Math.random() * 1000) };
  },

  updateCategory: async (categoryId, categoryData) => {
    // const response = await apiClient.put(
    //   `/admin/categories/${categoryId}/`,
    //   categoryData
    // );
    // return response.data;
    return { ...categoryData, id: categoryId };
  },

  deleteCategory: async (categoryId) => {
    // const response = await apiClient.delete(`/admin/categories/${categoryId}/`);
    // return response.data;
    return { message: "Category deleted successfully" };
  },

  // Device Management
  getDevices: async (params) => {
    // const response = await apiClient.get("/admin/devices/", { params });
    // return response.data;
    return mockDevices;
  },

  createDevice: async (deviceData) => {
    // const response = await apiClient.post("/admin/devices/", deviceData);
    // return response.data;
    return { ...deviceData, id: Math.floor(Math.random() * 1000) };
  },

  updateDevice: async (deviceId, deviceData) => {
    // const response = await apiClient.put(
    //   `/admin/devices/${deviceId}/`,
    //   deviceData
    // );
    // return response.data;
    return { ...deviceData, id: deviceId };
  },

  deleteDevice: async (deviceId) => {
    // const response = await apiClient.delete(`/admin/devices/${deviceId}/`);
    // return response.data;
    return { message: "Device deleted successfully" };
  },

  // System Analytics
  getSystemAnalytics: async (params) => {
    // const response = await apiClient.get("/admin/analytics/", { params });
    // return response.data;
    return {
      totalUsers: 150,
      activeDevices: 450,
      totalPredictions: 1200,
      systemUptime: "99.9%",
    };
  },

  // Prediction Logs
  getPredictionLogs: async (params) => {
    // const response = await apiClient.get("/admin/prediction-logs/", { params });
    // return response.data;
    return [
      {
        id: 1,
        user: "John Doe",
        timestamp: new Date().toISOString(),
        result: "Success",
      },
      {
        id: 2,
        user: "Jane Smith",
        timestamp: new Date().toISOString(),
        result: "Success",
      },
    ];
  },

  // Alert Logs
  getAlertLogs: async (params) => {
    // const response = await apiClient.get("/admin/alert-logs/", { params });
    // return response.data;
    return [
      {
        id: 1,
        type: "CRITICAL",
        user: "John Doe",
        timestamp: new Date().toISOString(),
      },
      {
        id: 2,
        type: "WARNING",
        user: "Jane Smith",
        timestamp: new Date().toISOString(),
      },
    ];
  },
};

export default adminAPI;
