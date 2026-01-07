import apiClient from "./apiClient";

const mockUser = {
  id: 1,
  name: "Mock User",
  email: "mock@example.com",
  role: "user",
};

export const authAPI = {
  // User Registration
  register: async (userData) => {
    // const response = await apiClient.post("/auth/register/", userData);
    // return response.data;
    return { message: "Registration successful", user: { ...userData, id: 1 } };
  },

  // User Login
  login: async (credentials) => {
    // const response = await apiClient.post("/auth/login/", credentials);
    // return response.data;
    return {
      access: "mock_access_token",
      refresh: "mock_refresh_token",
      user: mockUser,
    };
  },

  // Admin Login
  adminLogin: async (credentials) => {
    // const response = await apiClient.post("/auth/admin-login/", credentials);
    // return response.data;
    return {
      access: "mock_admin_access_token",
      refresh: "mock_admin_refresh_token",
      user: { ...mockUser, role: "admin", name: "Mock Admin" },
    };
  },

  // Logout
  logout: async () => {
    // const response = await apiClient.post("/auth/logout/");
    // return response.data;
    return { message: "Logout successful" };
  },

  // Get Current User
  getCurrentUser: async () => {
    // const response = await apiClient.get("/auth/me/");
    // return response.data;
    return mockUser;
  },

  // Refresh Token
  refreshToken: async (refreshToken) => {
    // const response = await apiClient.post("/auth/refresh/", {
    //   refresh: refreshToken,
    // });
    // return response.data;
    return { access: "new_mock_access_token" };
  },
};

export default authAPI;
