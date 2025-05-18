import React from "react";
import { serverInstance } from "../../../../../../../API/ServerInstance";
import Edit from "../../../../../../../assets/Edit.png";
import Delete from "../../../../../../../assets/Delete.png";
import Swal from "sweetalert2";
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, Fade, Modal, Tooltip, DialogActions, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Update from "../Add/Update"


export default function Table({ suppliers }) {

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


  const handleDelete = async () => {
    try {
      const response = await serverInstance(`store/delete-supplierMaster?id=${deleteId}`, "delete");
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
  return (
    <div className="wrapper_abc">
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
      <table>
        <thead>
          <tr>
            <th>Sn</th>
            <th>Supplier Name</th>
            <th>Address</th>
            <th>Mobile No</th>
            <th>GST No</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.length > 0 ? (
            suppliers.map((supplier, index) => (
              <tr key={supplier.id}>
                <td>{index + 1}</td>
                <td>{supplier.supplierName}</td>
                <td>{supplier.address}</td>
                <td>{supplier.mobileNo}</td>
                <td>{supplier.gstNo}</td>
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
              <td colSpan="6">No suppliers found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
