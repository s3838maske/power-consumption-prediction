import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alerts: [],
  unreadCount: 0,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlerts: (state, action) => {
      state.alerts = action.payload;
      state.unreadCount = action.payload.filter((a) => !a.read).length;
    },
    addAlert: (state, action) => {
      state.alerts.unshift(action.payload);
      state.unreadCount += 1;
    },
    markAsRead: (state, action) => {
      const alert = state.alerts.find((a) => a.id === action.payload);
      if (alert && !alert.read) {
        alert.read = true;
        state.unreadCount -= 1;
      }
    },
    markAllAsRead: (state) => {
      state.alerts.forEach((alert) => {
        alert.read = true;
      });
      state.unreadCount = 0;
    },
    deleteAlert: (state, action) => {
      const alert = state.alerts.find((a) => a.id === action.payload);
      if (alert && !alert.read) {
        state.unreadCount -= 1;
      }
      state.alerts = state.alerts.filter((a) => a.id !== action.payload);
    },
    clearAllAlerts: (state) => {
      state.alerts = [];
      state.unreadCount = 0;
    },
  },
});

export const {
  setAlerts,
  addAlert,
  markAsRead,
  markAllAsRead,
  deleteAlert,
  clearAllAlerts,
} = alertSlice.actions;

export default alertSlice.reducer;
