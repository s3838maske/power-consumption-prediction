import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  categories: [],
  devices: [],
  systemAnalytics: null,
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    // Users Management
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex((u) => u._id === action.payload._id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((u) => u._id !== action.payload);
    },

    // Categories Management
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    updateCategory: (state, action) => {
      const index = state.categories.findIndex(
        (c) => c._id === action.payload._id
      );
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(
        (c) => c._id !== action.payload
      );
    },

    // Devices Management
    setDevices: (state, action) => {
      state.devices = action.payload;
    },
    addDevice: (state, action) => {
      state.devices.push(action.payload);
    },
    updateDevice: (state, action) => {
      const index = state.devices.findIndex(
        (d) => d._id === action.payload._id
      );
      if (index !== -1) {
        state.devices[index] = action.payload;
      }
    },
    deleteDevice: (state, action) => {
      state.devices = state.devices.filter((d) => d._id !== action.payload);
    },

    // System Analytics
    setSystemAnalytics: (state, action) => {
      state.systemAnalytics = action.payload;
    },

    // Loading & Error
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setUsers,
  addUser,
  updateUser,
  deleteUser,
  setCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  setDevices,
  addDevice,
  updateDevice,
  deleteDevice,
  setSystemAnalytics,
  setLoading,
  setError,
  clearError,
} = adminSlice.actions;

export default adminSlice.reducer;
