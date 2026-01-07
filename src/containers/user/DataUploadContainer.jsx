import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Paper,
  Button,
  LinearProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import {
  CloudUpload,
  InsertDriveFile,
  Delete,
  CheckCircle,
  Error as ErrorIcon,
} from "@mui/icons-material";
import * as XLSX from "xlsx";
import { userAPI } from "../../services/api/userAPI";
import {
  uploadDataStart,
  uploadDataSuccess,
  uploadDataFailure,
} from "../../store/slices/userSlice";
import Snackbar from "../../components/common/Snackbar";

const DataUploadContainer = () => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [validationErrors, setValidationErrors] = useState([]);
  const [previewData, setPreviewData] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ];
      if (!validTypes.includes(file.type)) {
        setSnackbar({
          open: true,
          message: "Please select a valid Excel file (.xlsx or .xls)",
          severity: "error",
        });
        return;
      }

      setSelectedFile(file);
      validateAndPreviewFile(file);
    }
  };

  const validateAndPreviewFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);

        // Validate required columns
        const errors = validateData(jsonData);
        setValidationErrors(errors);

        // Set preview data (first 5 rows)
        setPreviewData(jsonData.slice(0, 5));

        if (errors.length === 0) {
          setSnackbar({
            open: true,
            message: "File validated successfully! Ready to upload.",
            severity: "success",
          });
        }
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Error reading file. Please check the format.",
          severity: "error",
        });
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const validateData = (data) => {
    const errors = [];
    const requiredColumns = ["date", "device", "consumption"];

    if (data.length === 0) {
      errors.push("File is empty");
      return errors;
    }

    // Check required columns
    const firstRow = data[0];
    requiredColumns.forEach((col) => {
      if (!(col in firstRow)) {
        errors.push(`Missing required column: ${col}`);
      }
    });

    // Validate data types
    data.forEach((row, index) => {
      if (row.consumption && isNaN(parseFloat(row.consumption))) {
        errors.push(`Row ${index + 2}: Invalid consumption value`);
      }
      if (row.date && isNaN(Date.parse(row.date))) {
        errors.push(`Row ${index + 2}: Invalid date format`);
      }
    });

    return errors;
  };

  const handleUpload = async () => {
    if (!selectedFile || validationErrors.length > 0) {
      return;
    }

    try {
      setUploading(true);
      dispatch(uploadDataStart());

      const formData = new FormData();
      formData.append("file", selectedFile);

      // Simulate progress (in real app, use axios onUploadProgress)
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await userAPI.uploadData(formData);

      clearInterval(progressInterval);
      setUploadProgress(100);

      dispatch(uploadDataSuccess(response));

      setSnackbar({
        open: true,
        message: "Data uploaded successfully!",
        severity: "success",
      });

      // Reset form
      setTimeout(() => {
        setSelectedFile(null);
        setPreviewData(null);
        setUploadProgress(0);
        setUploading(false);
      }, 1500);
    } catch (error) {
      dispatch(
        uploadDataFailure(error.response?.data?.message || "Upload failed")
      );
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to upload data",
        severity: "error",
      });
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewData(null);
    setValidationErrors([]);
    setUploadProgress(0);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h4" fontWeight="600" sx={{ mb: 3 }}>
        Upload Electricity Usage Data
      </Typography>

      {/* Upload Area */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 3,
          textAlign: "center",
          border: "2px dashed",
          borderColor: selectedFile ? "success.main" : "primary.main",
          backgroundColor: selectedFile ? "success.light" : "background.paper",
          transition: "all 0.3s",
        }}
      >
        {!selectedFile ? (
          <>
            <CloudUpload sx={{ fontSize: 80, color: "primary.main", mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 2 }}>
              Select Excel File to Upload
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Supported formats: .xlsx, .xls
              <br />
              Required columns: date, device, consumption
            </Typography>
            <Button
              variant="contained"
              component="label"
              size="large"
              startIcon={<CloudUpload />}
            >
              Choose File
              <input
                type="file"
                hidden
                accept=".xlsx,.xls"
                onChange={handleFileSelect}
              />
            </Button>
          </>
        ) : (
          <>
            <InsertDriveFile
              sx={{ fontSize: 80, color: "success.main", mb: 2 }}
            />
            <Typography variant="h6" sx={{ mb: 1 }}>
              {selectedFile.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {(selectedFile.size / 1024).toFixed(2)} KB
            </Typography>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                disabled={uploading || validationErrors.length > 0}
                startIcon={<CloudUpload />}
              >
                {uploading ? "Uploading..." : "Upload"}
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleRemoveFile}
                disabled={uploading}
                startIcon={<Delete />}
              >
                Remove
              </Button>
            </Box>
          </>
        )}
      </Paper>

      {/* Upload Progress */}
      {uploading && (
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Uploading... {uploadProgress}%
          </Typography>
          <LinearProgress variant="determinate" value={uploadProgress} />
        </Paper>
      )}

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 1 }}>
            Validation Errors:
          </Typography>
          <List dense>
            {validationErrors.map((error, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <ErrorIcon color="error" />
                </ListItemIcon>
                <ListItemText primary={error} />
              </ListItem>
            ))}
          </List>
        </Alert>
      )}

      {/* Data Preview */}
      {previewData && validationErrors.length === 0 && (
        <Paper elevation={2} sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <CheckCircle color="success" />
            <Typography variant="h6">Data Preview (First 5 Rows)</Typography>
          </Box>
          <Box sx={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f5f5f5" }}>
                  {Object.keys(previewData[0]).map((key) => (
                    <th
                      key={key}
                      style={{
                        padding: "12px",
                        textAlign: "left",
                        borderBottom: "2px solid #ddd",
                        fontWeight: 600,
                      }}
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewData.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, i) => (
                      <td
                        key={i}
                        style={{
                          padding: "12px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Paper>
      )}

      {/* Instructions */}
      <Paper elevation={2} sx={{ p: 3, mt: 3, backgroundColor: "info.light" }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          📋 File Format Instructions
        </Typography>
        <Typography variant="body2" component="div">
          <ul>
            <li>
              <strong>date:</strong> Date of consumption (format: YYYY-MM-DD or
              DD/MM/YYYY)
            </li>
            <li>
              <strong>device:</strong> Name of the device/appliance
            </li>
            <li>
              <strong>consumption:</strong> Energy consumption in kWh (numeric
              value)
            </li>
            <li>Optional columns: category, location, notes</li>
          </ul>
        </Typography>
      </Paper>

      <Snackbar
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Box>
  );
};

export default DataUploadContainer;
