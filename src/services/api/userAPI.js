import apiClient from "./apiClient";

const mockConsumptionData = {
  data: [
    { date: "2024-01-01", consumption: 45.5, device: "AC", category: "Heavy" },
    {
      date: "2024-01-02",
      consumption: 42.1,
      device: "Fridge",
      category: "Essential",
    },
    { date: "2024-01-03", consumption: 48.3, device: "AC", category: "Heavy" },
  ],
  deviceBreakdown: [
    { deviceName: "Air Conditioner", consumption: 150.5 },
    { deviceName: "Refrigerator", consumption: 45.2 },
    { deviceName: "Washing Machine", consumption: 30.8 },
    { deviceName: "Lights & Fans", consumption: 65.4 },
    { deviceName: "Other Appliances", consumption: 25.1 },
  ],
  dailyData: Array.from({ length: 30 }, (_, i) => ({
    date: `2024-01-${String(i + 1).padStart(2, "0")}`,
    consumption: Math.random() * 20 + 30,
  })),
  weeklyData: [
    { week: "Week 1", consumption: 280.5 },
    { week: "Week 2", consumption: 310.2 },
    { week: "Week 3", consumption: 295.8 },
    { week: "Week 4", consumption: 320.4 },
  ],
};

const mockPredictions = {
  daily: Array.from({ length: 7 }, (_, i) => ({
    date: `2024-02-${String(i + 1).padStart(2, "0")}`,
    prediction: Math.random() * 10 + 35,
  })),
  weekly: [
    { week: "Week 1", prediction: 290.0, label: "Week 1" },
    { week: "Week 2", prediction: 305.0, label: "Week 2" },
    { week: "Week 3", prediction: 300.0, label: "Week 3" },
    { week: "Week 4", prediction: 315.0, label: "Week 4" },
  ],
  monthly: [
    { label: "Feb", prediction: 1250.5 },
    { label: "Mar", prediction: 1180.2 },
  ],
  summary: {
    monthlyTotal: 1250.5,
    percentageChange: 5.2,
    dailyAvg: 41.7,
  },
  accuracy: {
    confidence: 94,
    mae: 0.85,
  },
};

const mockAlerts = [
  {
    id: 1,
    type: "threshold",
    severity: "high",
    title: "Critical Usage Alert",
    message: "High power consumption detected in Air Conditioner unit.",
    timestamp: new Date().toISOString(),
    read: false,
  },
  {
    id: 2,
    type: "spike",
    severity: "medium",
    title: "Usage Spike",
    message: "Energy consumption is 15% higher than last week's average.",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    read: true,
  },
  {
    id: 3,
    type: "suggestion",
    severity: "low",
    title: "Eco Suggestion",
    message: "New energy saving recommendations available for your profile.",
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    read: false,
  },
];

const mockRecommendations = [
  {
    id: 1,
    title: "Optimise AC usage",
    description: "Set your AC to 24°C to save up to 20% on energy.",
    potentialSaving: 45.2,
  },
  {
    id: 2,
    title: "Peak Hour Awareness",
    description: "Avoid using heavy appliances between 6 PM and 10 PM.",
    potentialSaving: 30.5,
  },
  {
    id: 3,
    title: "Smart Lighting",
    description: "Replace remaining incandescent bulbs with LED alternatives.",
    potentialSaving: 12.8,
  },
];

export const userAPI = {
  // Upload Excel Data
  uploadData: async (formData) => {
    // const response = await apiClient.post("/user/upload-data/", formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });
    // return response.data;
    return { message: "Data uploaded successfully (Mock)" };
  },

  // Get Consumption Data
  getConsumptionData: async (params) => {
    // const response = await apiClient.get("/user/consumption-data/", { params });
    // return response.data;
    return mockConsumptionData;
  },

  // Get Predictions
  getPredictions: async (params) => {
    // const response = await apiClient.get("/user/predictions/", { params });
    // return response.data;
    return mockPredictions;
  },

  // Request Prediction
  requestPrediction: async (data) => {
    // const response = await apiClient.post("/user/predict/", data);
    // return response.data;
    return { ...mockPredictions, message: "Prediction generated successfully" };
  },

  // Get Dashboard Stats
  getDashboardStats: async () => {
    // const response = await apiClient.get("/user/dashboard-stats/");
    // return response.data;
    return {
      totalConsumption: 1245.8,
      avgDailyConsumption: 41.5,
      peakConsumption: 65.2,
      predictedNextMonth: 1280.0,
    };
  },

  // Get Devices
  getDevices: async () => {
    // const response = await apiClient.get("/user/devices/");
    // return response.data;
    return [
      { id: 1, name: "Air Conditioner", type: "Heavy" },
      { id: 2, name: "Refrigerator", type: "Essential" },
      { id: 3, name: "Washing Machine", type: "Medium" },
    ];
  },

  // Get Alerts
  getAlerts: async () => {
    // const response = await apiClient.get("/user/alerts/");
    // return response.data;
    return mockAlerts;
  },

  // Generate Report
  generateReport: async (reportType, params) => {
    // const response = await apiClient.post("/user/generate-report/", {
    //   type: reportType,
    //   ...params,
    // });
    // return response.data;
    return { id: "report_123", message: "Report generated successfully" };
  },

  // Download Report
  downloadReport: async (reportId, format) => {
    // const response = await apiClient.get(`/user/download-report/${reportId}/`, {
    //   params: { format },
    //   responseType: "blob",
    // });
    // return response.data;
    return new Blob(["Mock report content"], { type: "application/pdf" });
  },

  // Get Recommendations
  getRecommendations: async () => {
    // const response = await apiClient.get("/user/recommendations/");
    // return response.data;
    return mockRecommendations;
  },
};

export default userAPI;
