import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Divider,
  CircularProgress,
} from "@mui/material";
import {
  PictureAsPdf,
  TableChart,
  GetApp,
  Description,
  History,
  FileDownload,
} from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { format } from "date-fns";
import Card from "../../components/common/Card";
import Table from "../../components/common/Table";
import Snackbar from "../../components/common/Snackbar";
import { userAPI } from "../../services/api/userAPI";
import {
  setConsumptionData,
  setPredictions,
} from "../../store/slices/userSlice";

const ReportsContainer = () => {
  const dispatch = useDispatch();
  const { consumptionData = [], predictions = {} } = useSelector(
    (state) => state.user
  );
  const { user } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    end: new Date(),
  });
  const [reportType, setReportType] = useState("consumption_summary");
  const [formatType, setFormatType] = useState("pdf");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (consumptionData.length === 0) {
        try {
          setLoading(true);
          const response = await userAPI.getConsumptionData({
            period: "last_30_days",
          });
          dispatch(setConsumptionData(response.data || []));

          const predResponse = await userAPI.getPredictions();
          dispatch(setPredictions(predResponse));
        } catch (error) {
          console.error("Error fetching data for reports:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [dispatch, consumptionData.length]);

  // Mock report history
  const reportHistory = [
    {
      id: "1",
      name: "December 2025 Usage",
      date: "2025-12-31",
      type: "Monthly",
      format: "PDF",
    },
    {
      id: "2",
      name: "Annual Prediction 2026",
      date: "2025-12-15",
      type: "Prediction",
      format: "Excel",
    },
  ];

  const columns = [
    { id: "name", label: "Report Name", minWidth: 200 },
    { id: "date", label: "Generated On", minWidth: 120 },
    { id: "type", label: "Type", minWidth: 100 },
    { id: "format", label: "Format", minWidth: 80 },
    {
      id: "actions",
      label: "Action",
      minWidth: 100,
      align: "center",
      render: (row) => (
        <Button startIcon={<FileDownload />} size="small">
          Download
        </Button>
      ),
    },
  ];

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Header
    doc.setFontSize(22);
    doc.setTextColor(25, 118, 210); // MUI Primary
    doc.text("Power Consumption Report", pageWidth / 2, 20, {
      align: "center",
    });

    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(
      `Generated for: ${user?.firstName || user?.name || "User"}`,
      20,
      35
    );
    doc.text(
      `Period: ${format(dateRange.start, "dd MMM yyyy")} - ${format(
        dateRange.end,
        "dd MMM yyyy"
      )}`,
      20,
      42
    );
    doc.text(`Date: ${format(new Date(), "dd MMM yyyy HH:mm")}`, 20, 49);

    doc.line(20, 55, pageWidth - 20, 55);

    // Summary Table
    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.text("Usage Summary", 20, 65);

    const tableData = consumptionData.map((row) => [
      row.date || "N/A",
      row.device || "N/A",
      row.category || "General",
      `${row.consumption || 0} kWh`,
    ]);

    doc.autoTable({
      startY: 70,
      head: [["Date", "Device", "Category", "Consumption"]],
      body: tableData.slice(0, 20), // Show first 20 for preview
      theme: "striped",
      headStyles: { fillStyle: [25, 118, 210] },
    });

    // Predictions
    const finalY = (doc.lastAutoTable?.finalY || 70) + 15;
    doc.text("Future Predictions", 20, finalY);
    doc.setFontSize(11);
    doc.text(
      `Estimated Daily Average: ${
        predictions?.summary?.dailyAvg || "0.00"
      } kWh`,
      20,
      finalY + 10
    );
    doc.text(
      `Monthly Forecast: ${predictions?.summary?.monthlyTotal || "0.00"} kWh`,
      20,
      finalY + 17
    );

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(
        `Page ${i} of ${pageCount}`,
        pageWidth / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: "center" }
      );
    }

    doc.save(`PowerReport_${format(new Date(), "yyyyMMdd")}.pdf`);
  };

  const generateExcel = () => {
    const ws = XLSX.utils.json_to_sheet(consumptionData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Consumption");

    // Add Predictions Sheet
    if (predictions && predictions.daily) {
      const ps = XLSX.utils.json_to_sheet(predictions.daily);
      XLSX.utils.book_append_sheet(wb, ps, "Predictions");
    }

    XLSX.writeFile(wb, `PowerReport_${format(new Date(), "yyyyMMdd")}.xlsx`);
  };

  const handleGenerate = () => {
    try {
      if (formatType === "pdf") {
        generatePDF();
      } else {
        generateExcel();
      }
      setSnackbar({
        open: true,
        message: "Report generated and downloading...",
        severity: "success",
      });
    } catch (error) {
      console.error("Report generation error:", error);
      setSnackbar({
        open: true,
        message: "Failed to generate report",
        severity: "error",
      });
    }
  };

  if (loading && consumptionData.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" fontWeight="600" sx={{ mb: 3 }}>
          Generate Reports
        </Typography>

        <Grid container spacing={3}>
          {/* Configuration */}
          <Grid item xs={12} md={5}>
            <Card
              title="Report Settings"
              subtitle="Configure the data and format for your report"
            >
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}
              >
                <FormControl fullWidth>
                  <InputLabel>Report Type</InputLabel>
                  <Select
                    value={reportType}
                    label="Report Type"
                    onChange={(e) => setReportType(e.target.value)}
                  >
                    <MenuItem value="consumption_summary">
                      Consumption Summary
                    </MenuItem>
                    <MenuItem value="prediction_analysis">
                      Prediction Analysis
                    </MenuItem>
                    <MenuItem value="comprehensive">
                      Comprehensive Report
                    </MenuItem>
                  </Select>
                </FormControl>

                <Box sx={{ display: "flex", gap: 2 }}>
                  <DatePicker
                    label="Start Date"
                    value={dateRange.start}
                    onChange={(val) =>
                      setDateRange({ ...dateRange, start: val })
                    }
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                  <DatePicker
                    label="End Date"
                    value={dateRange.end}
                    onChange={(val) => setDateRange({ ...dateRange, end: val })}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </Box>

                <FormControl fullWidth>
                  <InputLabel>Format</InputLabel>
                  <Select
                    value={formatType}
                    label="Format"
                    onChange={(e) => setFormatType(e.target.value)}
                  >
                    <MenuItem value="pdf">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <PictureAsPdf sx={{ color: "error.main" }} /> PDF
                        Document
                      </Box>
                    </MenuItem>
                    <MenuItem value="excel">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <TableChart sx={{ color: "success.main" }} /> Excel
                        Spreadsheet
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>

                <Button
                  variant="contained"
                  size="large"
                  startIcon={<GetApp />}
                  fullWidth
                  onClick={handleGenerate}
                  disabled={consumptionData.length === 0}
                >
                  Generate & Download
                </Button>

                {consumptionData.length === 0 && !loading && (
                  <Typography
                    variant="caption"
                    color="error"
                    textAlign="center"
                  >
                    Please upload consumption data before generating reports.
                  </Typography>
                )}
              </Box>
            </Card>
          </Grid>

          {/* Quick Previews & History */}
          <Grid item xs={12} md={7}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card title="Available Data Summary">
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Box sx={{ textAlign: "center" }}>
                        <Description color="primary" sx={{ fontSize: 40 }} />
                        <Typography variant="h6">
                          {consumptionData.length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Records
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box sx={{ textAlign: "center" }}>
                        <History color="secondary" sx={{ fontSize: 40 }} />
                        <Typography variant="h6">30</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Days Analyzed
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box sx={{ textAlign: "center" }}>
                        <TableChart color="success" sx={{ fontSize: 40 }} />
                        <Typography variant="h6">8</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Devices
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
                >
                  <History /> Recent Generations
                </Typography>
                <Table
                  columns={columns}
                  rows={reportHistory}
                  page={0}
                  rowsPerPage={5}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Snackbar
          open={snackbar.open}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          message={snackbar.message}
          severity={snackbar.severity}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default ReportsContainer;
