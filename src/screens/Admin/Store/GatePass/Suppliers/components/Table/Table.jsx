
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import Dialog from '@mui/material/Dialog';
import { Button } from "@mui/material";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from "@mui/material/Tooltip";
import PaymentIcon from '@mui/icons-material/Payment';
import Swal from "sweetalert2";
import Edit from '../../../../../../../assets/Edit.png';
import Delete from '../../../../../../../assets/Delete.png';
import InventoryIcon from '@mui/icons-material/Inventory';
import { serverInstance } from "../../../../../../../API/ServerInstance";
import PaymentIn from '../Add/PaymentIn'
import Inventory from "../Add/Inventory";
import { TablePagination, TableFooter } from "@mui/material";

export default function Tabl({ isData ,getGP , componentRef}) {


  const [paymentShow, setPaymentShow] = useState(false)
  const [paymentItem, setPaymentItem] = useState('')
  const [openDelete, setOpenDelete] = useState(false)
  const [deleteId, setDeleteId] = useState('')
  const [InventoryItem, setInventoryItem] = useState('')
  const [inventoryShow, setInventoryShow] = useState(false)

  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 25));

    setPage(0);
  };

  const handlePaymentShow = (item) => {
    setPaymentShow(true)
    setPaymentItem(item)
  }

  const handleInventoryShow = (item) => {
    setInventoryShow(true)
    setInventoryItem(item)

  }

  const handleInventoryClose = () => {

    setInventoryShow(false);
  }


  const handlePaymentInClose = () => {

    setPaymentShow(false);
  }

  const handleDelete = (id) => {
    setOpenDelete(true);
    setDeleteId(id);
  }

  const handleDeleteClose = () => {
    setOpenDelete(false)
  }

  const deleteGE = () => {

    try {

      serverInstance(`store/delete-gateEntry?id=${deleteId}`, 'delete').then((res) => {
        console.log(res)
        if (res.status === true) {
          handleDeleteClose()
          Swal.fire('Deleted!', res.message, 'success');
        }
        if (res.status === false) {
          handleDeleteClose()
          Swal.fire('Error!', res.message, 'failed');

        }
      })
    } catch (err) {
      console.log(err)
      setLoader(false);
    }

  };




  console.log('GE', isData)



  useEffect(() => {
    getGP();
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
          <Button onClick={deleteGE} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>


      {paymentShow && <PaymentIn paymentItem={paymentItem} onClose={handlePaymentInClose} paymentShow={paymentShow} />}
      {inventoryShow && <Inventory inventoryItem={InventoryItem} onClose={handleInventoryClose} inventoryShow={inventoryShow} />}

      <div className="wrapper_abc" ref={componentRef}>
        <Table>
          <TableHead>
            <TableRow>

              <TableCell>Sn</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Gate Entry No.</TableCell>
              <TableCell>Purchase Order No.</TableCell>

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
                <TableRow key={index} >

                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{moment(item?.date).format("DD/MM/YYYY")}</TableCell>
                  <TableCell>{item?.time}</TableCell>
                  <TableCell>{item?.gateEntryNo}</TableCell>
                  <TableCell>{item?.purchaseOrderNo}</TableCell>
                  <TableCell>
                    {/* <Tooltip title="Edit">
                      <img
                        onClick={() => handleEdit(item)}
                        src={Edit}
                        alt="Edit"
                        style={{ width: '20px', marginRight: '0.5rem' }}
                      />
                    </Tooltip> */}

                    <Tooltip title="Delete">
                      <img
                        onClick={() => handleDelete(item?.id)}
                        src={Delete}
                        alt="Delete"
                        style={{ width: '20px' }}
                      />
                    </Tooltip>

                    <Tooltip title="Payment In">
                      <PaymentIcon
                        style={{ width: '30px', marginRight: '0.8%' }}
                        onClick={() => handlePaymentShow(item)}
                        alt="PaymentIn"
                      />
                    </Tooltip>

                    <Tooltip title="Send To Inventory">
                      <InventoryIcon
                        style={{ width: '30px', marginRight: '0.8%' }}
                        onClick={() => handleInventoryShow(item)}
                        alt="PaymentIn"
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
