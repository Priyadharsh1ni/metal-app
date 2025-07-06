import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography
} from "@mui/material";

const EditPurityDialog = ({
  open,
  setOpen,
  onSubmit,
  updateData,
  setUpdateData,
  view,
  addDataPopup,
  setAddDataPopup,
  createPurity,
  metals = ["gold", "silver", "platinum"]
}) => {
  const handleClose = () => {
    setOpen(false) 
    setAddDataPopup(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
      if (addDataPopup) {
            e.preventDefault()
            createPurity()
            setAddDataPopup(false)
      } else {
          e.preventDefault();
          onSubmit(updateData.id);
      }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>{!addDataPopup ? `Edit Purity Record` : `Add Purity Record`}</DialogTitle>
        <DialogContent sx={{ mt: 1 }}>
         {!addDataPopup && <Typography variant="body2" color="text.secondary" mb={2}>
            Update the {view.view} information
          </Typography>}

          {!addDataPopup ? <FormControl fullWidth margin="normal">
            <InputLabel>Metal</InputLabel>
            <Select
              label="Metal"
              name="metal"
              value={updateData.metal || ""}
              onChange={handleChange}
            >
              {metals.map((metal) => (
                <MenuItem key={metal} value={metal}>
                  {metal}
                </MenuItem>
              ))}
            </Select>
          </FormControl> :           
          <TextField
            label="Metal"
            name="metal"
            value={updateData.metal || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          }
          <TextField
            label="Purity %"
            name="purity"
            value={updateData.purity || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          
          <TextField
            label="Description"
            name="description"
            value={updateData.description || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained" sx={{background: "#000"}}>
            {addDataPopup ? `Add Purity` :`Update Purity`}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditPurityDialog;
