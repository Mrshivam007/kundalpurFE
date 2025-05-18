import React from "react";
import Edit from "../../../../../../../assets/Edit.png";
import Delete from "../../../../../../../assets/Delete.png";
import { Box, Modal, Fade, IconButton, Tooltip, Typography, Button, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Update from "../Add/UpdateItem";
import { serverInstance } from "../../../../../../../API/ServerInstance";
import Swal from "sweetalert2";

export default function Table({ item }) {
  const [open1, setOpen1] = React.useState(false);
  const [updatedata, setupdatedata] = React.useState(null);
  const [deleteId, setDeleteId] = React.useState("");
  const [open3, setOpen3] = React.useState(false);

  const handleClose1 = () => setOpen1(false);
  const handleClose3 = () => setOpen3(false);

  const handleClickOpen3 = (id) => {
    setOpen3(true);
    setDeleteId(id);
  };

  const handleDelete = async () => {
    try {
      const response = await serverInstance(`store/delete-itemMaster?id=${deleteId}`, "delete");
      if (response.status) {
        setOpen3(false);
        Swal.fire('Great!', 'Item deleted successfully', 'success');
      } else {
        Swal.fire('Oops!', 'Failed to delete the item', 'error');

      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEdit = (data) => {
    setOpen1(true);
    setupdatedata(data);
  };

  const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    bgcolor: "background.paper",
    p: 2,
    boxShadow: 24,
    borderRadius: "5px",
  };

  return (
    <>
      <Dialog open={open3} onClose={handleClose3}>
        <DialogTitle>{"Do you want to delete this item?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>After deletion, you cannot recover this item.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose3}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Modal open={open1} onClose={handleClose1} closeAfterTransition>
        <Fade in={open1}>
          <Box sx={style}>
            <div>
              <div className="add-div-close-div">
                <div>
                  <h2 style={{ marginBottom: "0.5rem", marginLeft: "1rem" }}>Item Master Update</h2>
                  <Typography style={{ marginLeft: "1rem" }} variant="body2" color="primary">
                    {new Date().toLocaleString()}
                  </Typography>
                </div>
                <IconButton>
                  <CloseIcon onClick={handleClose1} />
                </IconButton>
              </div>
              <Update setOpen={handleClose1} updatedata={updatedata} />
            </div>
          </Box>
        </Fade>
      </Modal>

      <div className="wrapper_abc">
        <table>
          <thead>
            <tr>
              <th>Sn</th>
              <th>Item Name</th>
              <th>Department Name</th>
              <th>UOM</th>
              <th>Opening Stock</th>
              <th>Current Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {item.length > 0 ? (
              item.map((supplier, index) => (
                <tr key={supplier.id}>
                  <td>{index + 1}</td>
                  <td>{supplier.item_name}</td>
                  <td>{supplier.department_name}</td>
                  <td>{supplier.UOM || "N/A"}</td>
                  <td>{supplier.opening_stock}</td>
                  <td>{supplier.current_stock}</td>
                  <td>
                    <Tooltip title="Edit">
                      <img
                        onClick={() => handleEdit(supplier)}
                        src={Edit}
                        alt="Edit"
                        style={{ width: "20px", marginRight: "0.5rem" }}
                      />
                    </Tooltip>
                    <Tooltip title="Delete">
                      <img
                        onClick={() => handleClickOpen3(supplier.id)}
                        src={Delete}
                        alt="Delete"
                        style={{ width: "20px" }}
                      />
                    </Tooltip>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No items found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
