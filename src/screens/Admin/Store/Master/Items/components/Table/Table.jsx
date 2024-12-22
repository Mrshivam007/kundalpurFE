
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import axios from "axios";
import Edit from '../../../../../../../assets/Edit.png';
import Delete from '../../../../../../../assets/Delete.png';
import CloseIcon from '@mui/icons-material/Close';
import { serverInstance } from "../../../../../../../API/ServerInstance";
import Update from "../Add/UpdateItem"
import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Fade, IconButton, Modal, Tooltip, Typography } from "@mui/material";
import DialogActions from '@mui/material/DialogActions';



export default function Table() {

  const [item, setItem] = useState([]);
  const [updatedata, setupdatedata] = useState('');
  const [open1, setOpen1] = React.useState(false);
  const handleClose1 = () => setOpen1(false);
  const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    p: 2,
    boxShadow: 24,
    borderRadius: '5px',
  };

  var options = { year: 'numeric', month: 'short', day: '2-digit' };
  var today = new Date();
  const currDate = today
    .toLocaleDateString('en-IN', options)
    .replace(/-/g, ' ');
  const currTime = today.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const [deleteId, setdeleteId] = useState('');
  const [open3, setOpen3] = React.useState(false);

  const handleClickOpen3 = (id) => {
    setOpen3(true);
    setdeleteId(id);
  };

    const handleClose5 = () => setOpen3(false);
    const handleClose4 = () => {
      setOpen3(false);
      serverInstance(`store/delete-itemMaster?id=${deleteId}`, 'delete').then((res) => {
        if (res.data.status === true) {
          setOpen1(false);
          Swal.fire('Great!', res.data.message, 'success');
        }
        if (res.data.status === false) {
          setOpen1(false);
          Swal.fire('Error!', res.data.message, 'error');
        }
      });
    };

  // Fetch supplier data from API
  const fetchItems = async () => {
    try {
      const response = await serverInstance("store/get-itemMaster", "get"); // Adjust the endpoint as required
      if (response.status) {
        setItem(response.data);
      } else {
        console.error("Failed to fetch supplier data:", response.msg);
      }
    } catch (error) {
      console.error("Error fetching supplier data:", error);
    }
  };

  const handleEdit = (data) => {
    setOpen1(true);
    setupdatedata(data);
  };

  // Load data on component mount
  useEffect(() => {
    fetchItems();
  }, []);


  return (
    <>

      <Dialog
        open={open3}
        onClose={handleClose5}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Do you want to delete'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            After delete you cannot get again
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose5}>Disagree</Button>
          <Button onClick={handleClose4} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open1}
        onClose={handleClose1}
        closeAfterTransition
      >
        <Fade in={open1}>
          <Box sx={style}>
            <div>
              <div className="add-div-close-div">
                <div>
                  <h2 style={{ marginBottom: '0.5rem', marginLeft: '1rem' }}>
                    Item Master Update
                  </h2>
                  <Typography
                    style={{ marginLeft: '1rem' }}
                    variant="body2"
                    color="primary"
                  >
                    {currDate} / {currTime}
                  </Typography>
                </div>
                <IconButton>
                  <CloseIcon onClick={() => handleClose1()} />
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
                  <td>{supplier.opening_stock}</td>
                  <td>{supplier?.current_stock}</td>
                  <td>
                    <Tooltip title="Edit">
                      <img
                        onClick={() => handleEdit(supplier)}
                        src={Edit}
                        alt="eye"
                        style={{ width: '20px', marginRight: '0.5rem' }}
                      />
                    </Tooltip>

                    <Tooltip title="Delete">
                      <img
                        onClick={() => handleClickOpen3(supplier?.id)}
                        src={Delete}
                        alt="eye"
                        style={{ width: '20px' }}
                      />
                    </Tooltip>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12">No item found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
