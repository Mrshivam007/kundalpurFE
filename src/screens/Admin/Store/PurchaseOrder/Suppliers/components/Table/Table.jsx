
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import './Tabl.css'
import PaymentIcon from '@mui/icons-material/Payment';
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Print from '../../../../../../../assets/Print.png';
import Payment from "@mui/icons-material/Payment";
import LoginIcon from '@mui/icons-material/Login';
import Login from "@mui/icons-material/Login";
import { MenuItem } from '@mui/material'
import { TablePagination, TableFooter } from "@mui/material";
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import { Button } from "@mui/material";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Edit from '../../../../../../../assets/Edit.png';
import Delete from '../../../../../../../assets/Delete.png';
import PaymentIn from '../Add/PaymentIn'
import GateEntry from "../GateEntry/GateEntry";
import { serverInstance } from "../../../../../../../API/ServerInstance";
import UpdatePO from "../Add/UpdatePO";




export default function Tabl({ getPO, isData, searchData, componentRef }) {

  const navigate = useNavigate();

  const [paymentShow, setPaymentShow] = useState(false);
  const [gateEntryShow, setGateEntryShow] = useState(false)

  const [updatedata, setupdatedata] = useState('')
  const [openDelete, setOpenDelete] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [deleteId, setDeleteId] = useState('')

  const [GEData, setGEData] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 25));

    setPage(0);
  };

  console.log('isData', isData)

  const handleEdit = (data) => {
    setOpenEdit(true);
    setupdatedata(data)

  };

  const closeEdit = () => {
    setOpenEdit(false)
  }

  const handlePaymentShow = () => {
    setPaymentShow(true)
  }

  const handlePaymentInClose = () => {
    setPaymentShow(false);
  }


  const handleGateEntryShow = (item) => {
    setGateEntryShow(true);
    setGEData(item)
  }

  const handleGateEntryClose = () => {
    setGateEntryShow(false);
  }

  const handleDeleteClose = () => {
    setOpenDelete(false)
  }

  const handleDelete = (id) => {
    setOpenDelete(true);
    setDeleteId(id);
  }

  const handlePrint = (item) => {

    navigate('/admin-panel/store/print_po', { state: { itemData: item } });
  };








  const deletePO = () => {

    try {

      serverInstance(`store/delete-purchaseOrder?id=${deleteId}`, 'delete').then((res) => {
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


  useEffect(() => {
    getPO()
  }, [openDelete, openEdit])


  return (
    <>

      {/* {paymentShow && <PaymentIn open={paymentShow} onClose={handlePaymentInClose} />} */}
      {gateEntryShow && <GateEntry GEData={GEData} open={gateEntryShow} onClose={handleGateEntryClose} />}
      <div className="wrapper_abc" ref={componentRef}>


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
            <Button onClick={deletePO} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>

        <UpdatePO updatedata={updatedata} closeEdit={closeEdit} openEdit={openEdit} />

        <Table>

          <TableHead>
            <TableRow>

              <TableCell>Sn</TableCell>
              <TableCell>Purchase Req. No.</TableCell>
              <TableCell>Purchase Order No.</TableCell>
              <TableCell>Supplier Code</TableCell>
              <TableCell>Supplier Name </TableCell>
              <TableCell>Department Code</TableCell>
              <TableCell>Department Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Pincode</TableCell>
              <TableCell>Purchase Order Date</TableCell>
              <TableCell>Deliver Date</TableCell>
              <TableCell>Contact No.</TableCell>

              <TableCell className="sticky-col first-col" id="acts">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchData && searchData.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            ).map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.purchaseRequisitonNo}</TableCell>
                <TableCell>{item.purchaseOrderNo}</TableCell>
                <TableCell>{item.supplierCode}</TableCell>
                <TableCell>{item.supplierName}</TableCell>
                <TableCell>{item.departmentCode}</TableCell>
                <TableCell>{item.departmentName}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.city}</TableCell>
                <TableCell>{item.state}</TableCell>
                <TableCell>{item.pincode}</TableCell>
                <TableCell>{moment(item.purchaseOrderDate).format('DD/MM/YYYY')}</TableCell>
                <TableCell>{moment(item.deliveryDate).format('DD/MM/YYYY')}</TableCell>
                <TableCell>{item.mobileNo}</TableCell>

                <TableCell>


                  <div className="tooltip-row">
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
                    <Tooltip title='Print'>
                      <img
                        style={{ width: '22px' }}
                        onClick={() => handlePrint(item)}
                        src={Print}
                        alt=" Print"
                      />
                    </Tooltip>
                  </div>

                  <div className="tooltip-row">

                    {/* 
                    <Tooltip title="Payment In">
                      <PaymentIcon
                        style={{ width: '30px', marginRight: '0.8%' }}
                        onClick={()=>handlePaymentShow()}
                        alt="PaymentIn"
                      />
                    </Tooltip> */}
                    <Tooltip title="Gate Entry">
                      <Login
                        style={{ width: '30px', marginRight: '0.8%' }}
                        onClick={() => handleGateEntryShow(item)}
                        alt="GateEntry"
                      />
                    </Tooltip>
                  </div>

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
