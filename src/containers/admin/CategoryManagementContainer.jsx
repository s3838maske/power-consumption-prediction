import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Add, Edit, Delete, Search, Category } from "@mui/icons-material";
import Table from "../../components/common/Table";
import Dialog from "../../components/common/Dialog";
import Snackbar from "../../components/common/Snackbar";
import Loading from "../../components/common/Loading";
import { adminAPI } from "../../services/api/adminAPI";
import {
  setCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../../store/slices/adminSlice";

const CategoryManagementContainer = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.admin);

  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await adminAPI.getCategories();
      dispatch(setCategories(response || []));
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to fetch categories",
        severity: "error",
      });
    }
  };

  const handleOpenDialog = (cat = null) => {
    if (cat) {
      setEditingCategory(cat);
      setFormData({ name: cat.name, description: cat.description || "" });
    } else {
      setEditingCategory(null);
      setFormData({ name: "", description: "" });
    }
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingCategory) {
        const res = await adminAPI.updateCategory(
          editingCategory._id,
          formData
        );
        dispatch(updateCategory(res));
      } else {
        const res = await adminAPI.createCategory(formData);
        dispatch(addCategory(res));
      }
      setDialogOpen(false);
      setSnackbar({
        open: true,
        message: "Category saved successfully",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error saving category",
        severity: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this category?")) {
      try {
        await adminAPI.deleteCategory(id);
        dispatch(deleteCategory(id));
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Error deleting category",
          severity: "error",
        });
      }
    }
  };

  const columns = [
    { id: "name", label: "Category Name", minWidth: 200 },
    { id: "description", label: "Description", minWidth: 300 },
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
          <IconButton onClick={() => handleDelete(row._id)} color="error">
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
          Categories
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Add Category
        </Button>
      </Box>

      <TextField
        fullWidth
        placeholder="Search categories..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      <Table
        columns={columns}
        rows={categories.filter((c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase())
        )}
      />

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={editingCategory ? "Edit Category" : "New Category"}
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
            label="Category Name"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
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

export default CategoryManagementContainer;
