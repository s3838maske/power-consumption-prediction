import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Add, Edit, Delete, Search, PersonAdd } from "@mui/icons-material";
import Table from "../../components/common/Table";
import Dialog from "../../components/common/Dialog";
import Snackbar from "../../components/common/Snackbar";
import Loading from "../../components/common/Loading";
import { adminAPI } from "../../services/api/adminAPI";
import {
  setUsers,
  addUser,
  updateUser,
  deleteUser,
  setLoading,
} from "../../store/slices/adminSlice";

const UserManagementContainer = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.admin);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "user",
    status: "active",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      dispatch(setLoading(true));
      const response = await adminAPI.getUsers();
      dispatch(setUsers(response.results || []));
      dispatch(setLoading(false));
    } catch (error) {
      console.error("Error fetching users:", error);
      dispatch(setLoading(false));
      setSnackbar({
        open: true,
        message: "Failed to fetch users",
        severity: "error",
      });
    }
  };

  const handleOpenDialog = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    } else {
      setEditingUser(null);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        role: "user",
        status: "active",
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingUser(null);
  };

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSaveUser = async () => {
    try {
      if (editingUser) {
        // Update existing user
        const response = await adminAPI.updateUser(editingUser._id, formData);
        dispatch(updateUser(response));
        setSnackbar({
          open: true,
          message: "User updated successfully",
          severity: "success",
        });
      } else {
        // Create new user
        const response = await adminAPI.createUser(formData);
        dispatch(addUser(response));
        setSnackbar({
          open: true,
          message: "User created successfully",
          severity: "success",
        });
      }
      handleCloseDialog();
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to save user",
        severity: "error",
      });
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await adminAPI.deleteUser(userId);
        dispatch(deleteUser(userId));
        setSnackbar({
          open: true,
          message: "User deleted successfully",
          severity: "success",
        });
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Failed to delete user",
          severity: "error",
        });
      }
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { id: "firstName", label: "First Name", minWidth: 120 },
    { id: "lastName", label: "Last Name", minWidth: 120 },
    { id: "email", label: "Email", minWidth: 200 },
    {
      id: "role",
      label: "Role",
      minWidth: 100,
      render: (row) => (
        <Chip
          label={row.role}
          color={row.role === "admin" ? "error" : "primary"}
          size="small"
        />
      ),
    },
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
      minWidth: 120,
      align: "center",
      render: (row) => (
        <Box>
          <IconButton
            size="small"
            color="primary"
            onClick={() => handleOpenDialog(row)}
          >
            <Edit />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDeleteUser(row._id)}
          >
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  if (loading && users.length === 0) {
    return <Loading message="Loading users..." />;
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" fontWeight="600">
          User Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<PersonAdd />}
          onClick={() => handleOpenDialog()}
        >
          Add User
        </Button>
      </Box>

      {/* Search */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search users by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Table */}
      <Table
        columns={columns}
        rows={filteredUsers}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        loading={loading}
      />

      {/* Add/Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        title={editingUser ? "Edit User" : "Add New User"}
        maxWidth="sm"
        actions={
          <>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button variant="contained" onClick={handleSaveUser}>
              {editingUser ? "Update" : "Create"}
            </Button>
          </>
        }
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
          <TextField
            label="First Name"
            value={formData.firstName}
            onChange={(e) => handleFormChange("firstName", e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Last Name"
            value={formData.lastName}
            onChange={(e) => handleFormChange("lastName", e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleFormChange("email", e.target.value)}
            fullWidth
            required
          />
          <TextField
            select
            label="Role"
            value={formData.role}
            onChange={(e) => handleFormChange("role", e.target.value)}
            fullWidth
            SelectProps={{ native: true }}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </TextField>
          <TextField
            select
            label="Status"
            value={formData.status}
            onChange={(e) => handleFormChange("status", e.target.value)}
            fullWidth
            SelectProps={{ native: true }}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </TextField>
        </Box>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Box>
  );
};

export default UserManagementContainer;
