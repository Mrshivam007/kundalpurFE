
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { TableFooter, TablePagination, TableCell } from '@mui/material/';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Edit from '../../../../../../../assets/Edit.png';
import Delete from '../../../../../../../assets/Delete.png';
import DoneIcon from '@mui/icons-material/Done';
import Swal from "sweetalert2";
import Dialog from '@mui/material/Dialog';
import { Button } from "@mui/material";
import PresentToAllIcon from '@mui/icons-material/PresentToAll';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { serverInstance } from "../../../../../../../API/ServerInstance";


export default function Tabl({ getApprover, approver, isData }) {

  const [openApprove, setOpenApprove] = useState(false)
  const [openReject, setOpenReject] = useState(false)
  const [createdItemId, setCreatedItemId] = useState(null);
  const [item, setItem] = useState('')
  const [isApproved, setIsApproved] = useState(false);
  const [isApprover1, setIsApprover1] = useState('')
  const [isApprover2, setIsApprover2] = useState('')
  const [isApprover3, setIsApprover3] = useState('')
  const [isApprover4, setIsApprover4] = useState('')
  const [approver1, setApprover1] = useState('')
  const [approver2, setApprover2] = useState('')
  const [approver3, setApprover3] = useState('')
  const [approver4, setApprover4] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));

    setPage(0);
  };
  console.log('approver', approver)


  // const [isApprover1, setIsApprover1] = useState(approver[0].isApprover1)
  // const [isApprover2, setIsApprover2] = useState(approver[0].isApprover2)
  // const [isApprover3, setIsApprover3] = useState(approver[0].isApprover3)
  // const [isApprover4, setIsApprover4] = useState(approver[0].isApprover4)
  const [empid, setempid] = useState('')




  const handleApproveOpen = (item) => {

    setItem(item);


    if (item?.approver1 == empid && item?.isApprover1 == false) {

      setIsApprover1(true)
      setIsApprover2(item?.isApprover2)
      setIsApprover3(item?.isApprover3)
      setIsApprover4(item?.isApprover4)

    }
    if (item?.approver2 == empid && item?.isApprover2 == false) {

      setIsApprover2(true)
      setIsApprover1(item?.isApprover1)
      setIsApprover3(item?.isApprover3)
      setIsApprover4(item?.isApprover4)

    }
    if (item?.approver3 == empid && item?.isApprover3 == false) {
      setIsApprover3(true)
      setIsApprover1(item?.isApprover1)
      setIsApprover2(item?.isApprover2)
      setIsApprover4(item?.isApprover4)


    }
    if (item?.approver4 == empid && item?.isApprover4 == false) {

      setIsApprover4(true)
      setIsApprover2(item?.isApprover2);
      setIsApprover3(item?.isApprover3)
      setIsApprover1(item?.isApprover1)
    }

    setOpenApprove(true)
  }

  const handleApproveClose = () => {

    setOpenApprove(false)
  }

  const handleRejectClose = () => {

    setOpenReject(false)
  }


  const handleSet = async (item) => {

  }

  const created = () => {
    return (
      <>
        <p> PO Created</p>
      </>
    )
  }

  const handlePO = async (item) => {

    try {

      const data = {
        purchaseRequisitonNo: item?.purchaseRequisitionNo,
        supplierCode: item?.supplierCode,
        supplierName: item?.supplierName,
        departmentCode: item?.departmentCode,
        departmentName: item?.departmentName,

        address: item?.address,
        state: item?.state,
        city: item?.city,
        pincode: item?.pincode,
        // purchaseOrderDate: date,
        deliveryDate: item?.deliveryDate,
        mobileNo: item?.mobileNo,
        remark: item?.remark,
        purchaseOrderList: item?.purchaseRequisitionLists,
      }

      const response = await serverInstance('store/add-purchaseOrder ', 'post', data)
      console.log('post', response.status)
      if (response.status) {
        setCreatedItemId(item.id);
        Swal.fire('Sent To Purchase Order!', response.msg, 'success');

      }
    } catch (err) {
      console.log(err)
    }
  }


  const handleApprove = async () => {

    try {


      const data = {
        purchaseRequisitionNo: item?.purchaseRequisitionNo,
        supplierCode: item?.supplierCode,
        supplierName: item?.supplierName,
        departmentCode: item?.departmentCode,
        departmentName: item?.departmentName,
        address: item?.address,
        state: item?.state,
        city: item?.city,
        pincode: item?.pincode,
        purchaseRequisitionDate: item?.purchaseRequisitionDate,
        deliveryDate: item?.deliveryDate,
        approver1: item?.approver1,
        approver2: item?.approver2,
        approver3: item?.approver3,
        approver4: item?.approver4,
        isApprover1: isApprover1,
        isApprover2: isApprover2,
        isApprover3: isApprover3,
        isApprover4: isApprover4,
        mobileNo: item?.mobileNo,
        remark: item?.remark,
        purchaseRequisitionLists: item?.purchaseRequisitionLists,
        id: item?.id
      }

      const res = await serverInstance('store/edit-purchaseRequisition ', 'put', data)

      if (res.status) {
        getApprover();
        setOpenApprove(false)
        Swal.fire('Approved!', res.msg, 'success')

      }

      if (res.status === false) {
        setOpenApprove(false)
        Swal.fire('Error!', res?.msg, 'error')
      }

    } catch (err) {
      Swal.fire('Error!', 'Something went wrong', 'error')
      console.log(err)
    }
  }

  const handleRejectOpen = (item) => {

    setItem(item)

    if (item?.approver1 == empid && item?.isApprover1 == false) {

      setApprover1(null)
      setApprover2(item?.approver2)
      setApprover3(item?.approver3)
      setApprover4(item?.approver4)

    }
    if (item?.approver2 == empid && item?.isApprover2 == false) {

      setApprover2(null)
      setApprover1(item?.approver1)
      setApprover3(item?.approver3)
      setApprover4(item?.approver4)

    }
    if (item?.approver3 == empid && item?.isApprover3 == false) {
      setApprover3(null)
      setApprover1(item?.approver1)
      setApprover2(item?.approver2)
      setApprover4(item?.approver4)


    }
    if (item?.approver4 == empid && item?.isApprover4 == false) {

      setApprover4(null)
      setApprover2(item?.approver2);
      setApprover3(item?.approver3)
      setApprover1(item?.approver1)
    }

    setOpenReject(true)
  }

  const handleReject = async () => {


    try {


      const data = {
        purchaseRequisitionNo: item?.purchaseRequisitionNo,
        supplierCode: item?.supplierCode,
        supplierName: item?.supplierName,
        departmentCode: item?.departmenttCode,
        departmentName: item?.departmentName,
        address: item?.address,
        state: item?.state,
        city: item?.city,
        pincode: item?.pincode,
        purchaseRequisitionDate: item?.purchaseRequisitionDate,
        deliveryDate: item?.deliveryDate,
        approver1: approver1,
        approver2: approver2,
        approver3: approver3,
        approver4: approver4,
        isApprover1: item?.isApprover1 ? item?.isApprover1 : false,
        isApprover2: item?.isApprover2 ? item?.isApprover2 : false,
        isApprover3: item?.isApprover3 ? item?.isApprover3 : false,
        isApprover4: item?.isApprover4 ? item?.isApprover4 : false,
        mobileNo: item?.mobileNo,
        remark: item?.remark,
        purchaseRequisitionLists: item?.purchaseRequisitionLists,
        id: item?.id
      }

      const res = await serverInstance('store/edit-purchaseRequisition ', 'put', data)
      if (res.status) {
        getApprover();

        setOpenReject(false)
        Swal.fire('Approved!', res.msg, 'success')

      }

      if (res.status === false) {
        setOpenReject(false)
        Swal.fire('Error!', res?.msg, 'error')
      }

    } catch (err) {
      Swal.fire('Error!', 'Something went wrong', 'error')
      console.log(err)
    }

  }
  console.log(approver)
  const filteredApprover = approver && approver.filter(approverItem => approverItem.purchaseRequisitionNo === item.purchaseRequisitionNo);
  useEffect(() => {


    if (
      filteredApprover[0]?.isApprover1 &&
      filteredApprover[0]?.isApprover2 &&
      filteredApprover[0]?.isApprover3 &&
      filteredApprover[0]?.isApprover4
    ) {
      setIsApproved(true);
    }
  }, [filteredApprover]);

  useEffect(() => {
    setempid(Number(sessionStorage.getItem('empid')));

  }, [empid, openReject, openApprove]);

  useEffect(() => {
    console.log(isApprover1, isApprover2, isApprover3, isApprover4);
  }, [isApprover1, isApprover2, isApprover3, isApprover4]);

  return (
    <>
      <div className="wrapper_abc">

        <Dialog
          open={openApprove}
          onClose={handleApproveClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Do you want to Approve'}
          </DialogTitle>
          {/* <DialogContent>
            <DialogContentText id="alert-dialog-description">
              After  you cannot get again
            </DialogContentText>
          </DialogContent> */}
          <DialogActions>
            <Button onClick={handleApproveClose}>Disagree</Button>
            <Button onClick={handleApprove} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openReject}
          onClose={handleRejectClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Do you want to Reject'}
          </DialogTitle>
          {/* <DialogContent>
            <DialogContentText id="alert-dialog-description">
              After  you cannot get again
            </DialogContentText>
          </DialogContent> */}
          <DialogActions>
            <Button onClick={handleRejectClose}>Disagree</Button>
            <Button onClick={handleReject} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>

        <Table>
          <TableHead>
            <TableRow>

              <TableCell>Sn</TableCell>
              <TableCell>Purchase Req. No.</TableCell>
              <TableCell>Supplier Code</TableCell>
              <TableCell>Supplier Name</TableCell>
              <TableCell>Department Code</TableCell>
              <TableCell>Department Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Pincode</TableCell>
              <TableCell>PR Date</TableCell>
              <TableCell>Delivery Date</TableCell>
              <TableCell>Contact No.</TableCell>
              <TableCell>Remark</TableCell>
              <TableCell className="sticky-col first-col" id="acts">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              approver && approver.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              ).map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.purchaseRequisitionNo}</TableCell>
                  <TableCell>{item.supplierCode}</TableCell>
                  <TableCell>{item.supplierName}</TableCell>
                  <TableCell>{item.departmentCode}</TableCell>
                  <TableCell>{item.departmentName}</TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>{item.city}</TableCell>
                  <TableCell>{item.state}</TableCell>
                  <TableCell>{item.pincode}</TableCell>
                  <TableCell>{moment(item.purchaseRequisitionDate).format('YYYY-MM-DD')}</TableCell>
                  <TableCell>{moment(item.deliveryDate).format('YYYY-MM-DD')}</TableCell>
                  <TableCell>{item.mobileNo}</TableCell>
                  <TableCell>{item.remark}</TableCell>
                  <TableCell>
                    {createdItemId === item.id ? (
                      <div>
                        <span style={{ color: 'green' }}>Sent To PO</span>
                      </div>
                    ) : (
                      item.isApprover1 &&
                        item.isApprover2 &&
                        item.isApprover3 &&
                        item.isApprover4 ? (
                        <Tooltip title="Send to Purchase Order">
                          <PresentToAllIcon
                            sx={{ color: 'green' }}
                            onClick={() => handlePO(item)}
                          />
                        </Tooltip>
                      ) : (
                        ((item.approver1 == empid && item.isApprover1 == true) ||
                          (item.approver2 == empid && item.isApprover2 == true) ||
                          (item.approver3 == empid && item.isApprover3 == true) ||
                          (item.approver4 == empid && item.isApprover4 == true)) ? (
                          <span style={{ color: 'green' }}>APPROVED</span>
                        ) : (
                          <>
                            <Tooltip title="Accept">
                              <DoneIcon
                                sx={{ color: 'green' }}
                                onClick={() => handleApproveOpen(item)}
                              />
                            </Tooltip>
                            <Tooltip title="Reject">
                              <CloseIcon
                                onClick={() => handleRejectOpen(item)}
                                sx={{ color: 'red' }}
                              />
                            </Tooltip>
                          </>
                        )
                      )
                    )}
                  </TableCell>



                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={approver.length}
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
