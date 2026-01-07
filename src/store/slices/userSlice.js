import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  consumptionData: [],
  uploadedFiles: [],
  predictions: {
    daily: null,
    weekly: null,
    monthly: null,
  },
  reports: [],
  devices: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Data Upload
    uploadDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    uploadDataSuccess: (state, action) => {
      state.loading = false;
      state.uploadedFiles.push(action.payload);
    },
    uploadDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Consumption Data
    setConsumptionData: (state, action) => {
      state.consumptionData = action.payload;
    },

    // Predictions
    setPredictions: (state, action) => {
      state.predictions = action.payload;
    },

    // Devices
    setDevices: (state, action) => {
      state.devices = action.payload;
    },

    // Reports
    addReport: (state, action) => {
      state.reports.push(action.payload);
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  uploadDataStart,
  uploadDataSuccess,
  uploadDataFailure,
  setConsumptionData,
  setPredictions,
  setDevices,
  addReport,
  clearError,
} = userSlice.actions;

export default userSlice.reducer;
