import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPrediction: null,
  predictionHistory: [],
  loading: false,
  error: null,
};

const predictionSlice = createSlice({
  name: "prediction",
  initialState,
  reducers: {
    predictionStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    predictionSuccess: (state, action) => {
      state.loading = false;
      state.currentPrediction = action.payload;
      state.predictionHistory.push({
        ...action.payload,
        timestamp: new Date().toISOString(),
      });
    },
    predictionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearPrediction: (state) => {
      state.currentPrediction = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  predictionStart,
  predictionSuccess,
  predictionFailure,
  clearPrediction,
  clearError,
} = predictionSlice.actions;

export default predictionSlice.reducer;
