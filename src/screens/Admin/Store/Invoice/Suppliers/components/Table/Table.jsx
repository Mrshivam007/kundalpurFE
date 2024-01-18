
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import Tooltip from "@mui/material/Tooltip";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import { Button } from "@mui/material";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TablePagination, TableFooter } from "@mui/material";
import Edit from '../../../../../../../assets/Edit.png';
import Delete from '../../../../../../../assets/Delete.png';
import { useReactToPrint } from 'react-to-print';
import { serverInstance } from "../../../../../../../API/ServerInstance";
import { Converter, hiIN } from 'any-number-to-words';

export default function Tabl({isData, getPayment,componentRef}) {


  const [deleteId, setDeleteId] = useState('')
  const [openDelete, setOpenDelete] = useState(false)

  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);




  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 25));

    setPage(0);
  };



  const handleDeleteClose = () => {
    setOpenDelete(false)
  }

  const handleDelete = (id) => {
    setOpenDelete(true);
    setDeleteId(id);
  }



  const deletePayment = () => {

    try {
      serverInstance(`store/delete-paymentIn?id=${deleteId}`, 'delete').then((res) => {
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
    getPayment();
  }, [openDelete])

  return (
    <>

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
          <Button onClick={deletePayment} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>


      <div className="wrapper_abc" ref={componentRef}>
        <Table>
          <TableHead>
            <TableRow>

              <TableCell>Sn</TableCell>
              <TableCell>PO Code</TableCell>
              <TableCell>Supplier Name</TableCell>
              <TableCell>Supplier Code</TableCell>
              <TableCell>Department Code</TableCell>
              <TableCell>Department Name</TableCell>

              <TableCell>Payment Type</TableCell>
              <TableCell>Payment Mode</TableCell>
              <TableCell>Payment Amount</TableCell>
              <TableCell>Payment Date</TableCell>

              <TableCell className="sticky-col first-col" id="acts">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              isData && isData.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              ).map((item, index) => (
                <TableRow ket={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item?.purchaseOrderNo}</TableCell>
                  <TableCell>{item?.supplierCode}</TableCell>
                  <TableCell>{item?.supplierName}</TableCell>
                  <TableCell>{item?.departmentCode}</TableCell>
                  <TableCell>{item?.departmentName}</TableCell>
                  <TableCell>{item?.paymentType}</TableCell>
                  <TableCell>{item?.paymentMode}</TableCell>
                  <TableCell>{item?.paymentAmount}</TableCell>
                  <TableCell>{moment(item?.paymentDate).format('DD/MM/YYYY')}</TableCell>
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


                  </TableCell>
                </TableRow>
              ))
            }
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
