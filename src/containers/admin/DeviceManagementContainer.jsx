import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  Chip,
  MenuItem,
} from "@mui/material";
import { Add, Edit, Delete, Devices, Search } from "@mui/icons-material";
import Table from "../../components/common/Table";
import Dialog from "../../components/common/Dialog";
import Snackbar from "../../components/common/Snackbar";
import { adminAPI } from "../../services/api/adminAPI";
import {
  setDevices,
  addDevice,
  updateDevice,
  deleteDevice,
} from "../../store/slices/adminSlice";

const DeviceManagementContainer = () => {
  const dispatch = useDispatch();
  const { devices, categories } = useSelector((state) => state.admin);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDevice, setEditingDevice] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    ratedPower: "",
    avgUsageHours: "",
    status: "active",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const res = await adminAPI.getDevices();
      dispatch(setDevices(res.results || []));
    } catch (e) {
      setSnackbar({
        open: true,
        message: "Failed to fetch devices",
        severity: "error",
      });
    }
  };

  const handleOpenDialog = (dev = null) => {
    if (dev) {
      setEditingDevice(dev);
      setFormData({
        name: dev.name,
        categoryId: dev.categoryId,
        ratedPower: dev.ratedPower,
        avgUsageHours: dev.avgUsageHours,
        status: dev.status,
      });
    } else {
      setEditingDevice(null);
      setFormData({
        name: "",
        categoryId: "",
        ratedPower: "",
        avgUsageHours: "",
        status: "active",
      });
    }
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingDevice) {
        const res = await adminAPI.updateDevice(editingDevice._id, formData);
        dispatch(updateDevice(res));
      } else {
        const res = await adminAPI.createDevice(formData);
        dispatch(addDevice(res));
      }
      setDialogOpen(false);
      setSnackbar({ open: true, message: "Device saved", severity: "success" });
    } catch (e) {
      setSnackbar({
        open: true,
        message: "Error saving device",
        severity: "error",
      });
    }
  };

  const columns = [
    { id: "name", label: "Device Name", minWidth: 150 },
    {
      id: "category",
      label: "Category",
      minWidth: 120,
      render: (row) =>
        categories.find((c) => c._id === row.categoryId)?.name || "N/A",
    },
    { id: "ratedPower", label: "Rated Power (W)", minWidth: 100 },
    { id: "avgUsageHours", label: "Avg Hrs/Day", minWidth: 100 },
    {
      id: "status",
      label: "Status",
      minWidth: 100,
      render: (row) => (
        <Chip
          label={row.status}
          color={row.status === "active" ? "success" : "default"}
          size="small"
        />
      ),
    },
    {
      id: "actions",
      label: "Actions",
      minWidth: 100,
      align: "center",
      render: (row) => (
        <Box>
          <IconButton onClick={() => handleOpenDialog(row)} color="primary">
            <Edit />
          </IconButton>
          <IconButton
            sx={{ color: "error.main" }}
            onClick={async () => {
              if (window.confirm("Delete device?")) {
                await adminAPI.deleteDevice(row._id);
                dispatch(deleteDevice(row._id));
              }
            }}
          >
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" fontWeight="600">
          Product Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Add Product
        </Button>
      </Box>

      <Table columns={columns} rows={devices} />

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={editingDevice ? "Edit Product" : "New Product"}
        actions={
          <>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </>
        }
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
          <TextField
            label="Product Name"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            select
            label="Category"
            fullWidth
            value={formData.categoryId}
            onChange={(e) =>
              setFormData({ ...formData, categoryId: e.target.value })
            }
          >
            {categories.map((c) => (
              <MenuItem key={c._id} value={c._id}>
                {c.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Rated Power (Watts)"
            type="number"
            fullWidth
            value={formData.ratedPower}
            onChange={(e) =>
              setFormData({ ...formData, ratedPower: e.target.value })
            }
          />
          <TextField
            label="Average Usage (Hours/Day)"
            type="number"
            fullWidth
            value={formData.avgUsageHours}
            onChange={(e) =>
              setFormData({ ...formData, avgUsageHours: e.target.value })
            }
          />
        </Box>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Box>
  );
};

export default DeviceManagementContainer;
