import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import Tooltip from "@mui/material/Tooltip";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { TableFooter, TablePagination, TableCell } from '@mui/material/';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DownloadIcon from '@mui/icons-material/Download';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Button } from "@mui/material";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Swal from "sweetalert2";
import Edit from '../../../../../../../assets/Edit.png';
import Delete from '../../../../../../../assets/Delete.png';
import { serverInstance } from "../../../../../../../API/ServerInstance";
import UpdatePR from "../Add/UpdatePR";
import ModalPurchaseRequest from "../../../../../Reciept/ModelPurchaseRequest";

export default function Tabl({ isData, getPR }) {


  const [openDelete, setOpenDelete] = useState(false)
  const [updatedata, setupdatedata] = useState('')
  const [openEdit, setOpenEdit] = useState(false)
  const [deleteId, setDeleteId] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);
  const [datasend, setdatasend] = useState('');
  const [open60, setOpen60] = React.useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));

    setPage(0);
  };

  const handleOpen60 = (data) => {
    setOpen60(true);
    setdatasend(data);
  };
  const handleClose60 = () => setOpen60(false);


  const handleDeleteClose = () => {
    setOpenDelete(false)
  }

  const handleDelete = (id) => {
    setOpenDelete(true);
    setDeleteId(id);
  }

  const handleEdit = (data) => {
    setOpenEdit(true);
    setupdatedata(data)

  };

  const closeEdit = () => {
    setOpenEdit(false)
  }

  const style50 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '80%',
    height: '95%',
    overflow: 'auto',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    p: 2,
  
    boxShadow: 24,
    borderRadius: '0px',
  };

  const deletePR = () => {

    try {

      serverInstance(`store/delete-purchaseRequisition?id=${deleteId}`, 'delete').then((res) => {
        console.log(res)
        if (res.status === true) {
          handleDeleteClose();
          Swal.fire('Deleted!', res.message, 'success');
        }
        if (res.status === false) {
          handleDeleteClose();
          Swal.fire('Error!', res.message, 'failed');

        }
      })
    } catch (err) {
      console.log(err)
      setLoader(false);
    }

  };


  useEffect(() => {
    getPR();
  }, [openDelete, openEdit])

  return (
    <>
      <div className="wrapper_abc">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open60}
        onClose={handleClose60}
        closeAfterTransition
      >
        <Fade in={open60}>
          <Box sx={style50}>
            <ModalPurchaseRequest
              // setopendashboard={setopendashboard}
              handleClose60={handleClose60}
              datasend={datasend}
              // setshowreciept={setshowreciept}
            />
          </Box>
        </Fade>
      </Modal>
        <Dialog
          open={openDelete}
          onClose={handleDeleteClose}
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
            <Button onClick={handleDeleteClose}>Disagree</Button>
            <Button onClick={deletePR} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>


        <UpdatePR updatedata={updatedata} openEdit={openEdit} closeEdit={closeEdit} />


        <Table>
          <TableHead>
            <TableRow>

              <TableCell>Sn</TableCell>
              <TableCell>Purchase Req. No.</TableCell>
              {/* <TableCell>Supplier Code</TableCell> */}
              {/* <TableCell>Supplier Name</TableCell> */}
              <TableCell>Department Code</TableCell>
              <TableCell>Department Name</TableCell>
              {/* <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Pincode</TableCell> */}
              <TableCell>PR Date</TableCell>
              {/* <TableCell>Delivery Date</TableCell> */}
              {/* <TableCell>Contact No.</TableCell> */}
              <TableCell>Remark</TableCell>
              <TableCell className="sticky-col first-col" id="acts">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              isData && isData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.purchaseRequisitionNo}</TableCell>
                  <TableCell>{item.departmentCode}</TableCell>
                  <TableCell>{item.departmentName}</TableCell>
                  {/* <TableCell>{item.address}</TableCell>
                  <TableCell>{item.city}</TableCell>
                  <TableCell>{item.state}</TableCell>
                  <TableCell>{item.pincode}</TableCell> */}
                  <TableCell>{moment(item.purchaseRequisitionDate).format('YYYY-MM-DD')}</TableCell>
                  {/* <TableCell>{moment(item.deliveryDate).format('YYYY-MM-DD')}</TableCell> */}
                  {/* <TableCell>{item.mobileNo}</TableCell> */}
                  <TableCell>{item.remark}</TableCell>
                  <TableCell>

                    <Tooltip title="Edit">
                      <img
                        onClick={() => handleEdit(item)}
                        src={Edit}
                        alt="Edit"
                        style={{ width: '20px', marginRight: '0.5rem' }}
                      />
                    </Tooltip>

                    <Tooltip title="Delete">
                      <img
                        onClick={() => handleDelete(item?.id)}
                        src={Delete}
                        alt="Delete"
                        style={{ width: '20px' }}
                      />
                    </Tooltip>

                    {item ? (
                          <DownloadIcon
                            onClick={() => {
                              handleOpen60(item);
                            }}
                          />
                        ) : (
                          <ClearIcon />
                        )}

                  </TableCell>

                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={isData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[25, 50, 100]}
                labelRowsPerPage={<span>Rows:</span>}
                labelDisplayedRows={({ page }) => {
                  return `Page: ${page}`;
                }}
                backIconButtonProps={{
                  color: 'secondary',
                }}
                nextIconButtonProps={{ color: 'secondary' }}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'page number',
                  },
                }}

              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  );
}
