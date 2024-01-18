import moment from "moment";

import React, { useEffect, useRef, useState } from "react";
import { Modal, Box, Fade } from '@mui/material'
import { Table, TableHead, TableRow, TableBody, TableCell, TableFooter, TablePagination, Tooltip } from '@mui/material'
import { serverInstance } from "../../../../../../../API/ServerInstance";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button'

import IconButton from '@mui/material/IconButton';
import Swal from "sweetalert2";
import Expense from '../form/Expense'
import Edit from '../../../../../../../assets/Edit.png';
import Delete from '../../../../../../../assets/Delete.png';
import ExportPdf from '../../../../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../../.././../assets/ExportExcel.png';
import Print from '../../../../../../../assets/Print.png';
import Invoice from "../form/Invoice";
import Received from "../MainForm/Received";
import Payment from "../MainForm/Payment";
import Contra from '../MainForm/Contra'
import Journal from '../MainForm/Journal'



const colorTheme = {
  received: '#cc0066',
  payment: '#e6b800',
  journal: '#4d79ff',
  contra: '#ff5c33',
};
const openupadtestyle = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
  borderRadius: '5px',
};


export default function VoucherTable({ invoiceOpen, setopendashboard }) {


  const [invoiceData, setInvocieData] = useState('')
  const [isData, setIsData] = useState('')
  const [refresh, setRefresh] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [deleteId, setDeleteId] = useState('')
  const [updateData, setUpdateData] = useState('')
  const [openEdit, setOpenEdit] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [page, setPage] = useState(0);
  const [open4, setOpen4] = useState(false);
  const [voucher, setVoucher] = useState('')
  const [updateBtn, setUpdateBtn] = useState(false)
  const [fromdate, setfromdate] = useState('')
  const [todate, settodate] = useState('')


  const handleRefreshTable = () => {
    setRefresh(!refresh);
  };




  const handleOpen4 = () => {
    setOpen4(true);
  };

  const handleEdit = (data) => {
    setOpenEdit(true);
    setUpdateData(data);
    console.log(updateData.modeOfExpense)
  };

  const closeEdit = () => {
    setOpenEdit(false)
  }

  const handleDelete = (id) => {
    setOpenDelete(true);
    setDeleteId(id);
  }

  const handleDeleteClose = () => {
    setOpenDelete(false)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));

    setPage(0);
  };

  const filterdata = async (e) => {
    e.preventDefault();

    try {
      if (fromdate && todate) {

        const response = await serverInstance(
          `expense/get-expenseVoucher?fromDate=${fromdate}&toDate=${todate}`,
          'get'
        );
        if (response.data) {
          setIsData(response.data);

        }
      }
    } catch (error) {
      console.log(error)
    }
  };


  const getVoucher = () => {
    serverInstance('admin/voucher-get', 'get').then((res) => {
      if (res) {
        console.log('voucher', res.voucher);
        setVoucher(res.voucher);
      }
    });
  };

  const getExpenseVoucher = async () => {
    try {
      const res = await serverInstance('expense/get-expenseVoucher', 'get')
      if (res.status) {
        setIsData(res.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getUploadedInvoice = async () => {

    try {
      const res = await serverInstance('expense/get-invoiceUpload', 'get')
      setInvocieData(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const deleteExpenseVoucher = () => {

    try {

      serverInstance(`expense/delete-expenseVoucher?id=${deleteId}`, 'delete').then((res) => {
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
    }

  };






  useEffect(() => {
    getVoucher();
    getExpenseVoucher()
    getUploadedInvoice()
  }, [openDelete, openEdit])



  return (
    <>
      <div className="wrapper_abc">

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
            <Button onClick={deleteExpenseVoucher} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openEdit}
          onClose={closeEdit}
          closeAfterTransition
        >
          <Fade in={openEdit}>
            <Box
              sx={{
                ...openupadtestyle,
                width: {
                  xs: '90%',
                  sm: '70%',
                  md: '60%',
                },
              }}
            >
              {updateData && (
                <>
                  {updateData.modeOfExpense === 1 && (
                    <Received
                      handleClose={closeEdit}
                      themeColor={colorTheme.received}
                      handleOpen4={handleOpen4}
                      updateData={updateData}
                      voucher={voucher}
                      openEdit={openEdit}
                      setopendashboard={setopendashboard}
                    />
                  )}
                  {updateData.modeOfExpense === 2 && (
                    <Payment
                      handleClose={closeEdit}
                      themeColor={colorTheme.payment}
                      handleOpen4={handleOpen4}
                      voucher={voucher}
                      updateData={updateData}
                      openEdit={openEdit}
                      setopendashboard={setopendashboard}
                    />
                  )}
                  {updateData.modeOfExpense === 3 && (
                    <Journal
                      handleClose={closeEdit}
                      themeColor={colorTheme.journal}
                      handleOpen4={handleOpen4}
                      updateData={updateData}
                      voucher={voucher}
                      openEdit={openEdit}
                      setopendashboard={setopendashboard}
                    />
                  )}
                  {updateData.modeOfExpense === 4 && (
                    <Contra
                      handleClose={closeEdit}
                      themeColor={colorTheme.contra}
                      updateData={updateData}
                      handleOpen4={handleOpen4}
                      voucher={voucher}
                      openEdit={openEdit}
                      setopendashboard={setopendashboard}
                    />
                  )}
                </>
              )}
            </Box>
          </Fade>
        </Modal>
        <div style={{display:'flex' , justifyContent:'space-between'}}>
        <div
          className="search-header "
          style={{ paddingLeft: '5%', paddingRight: '1.3rem', gap: 100, justifyContent: 'space-evenly' }}
        >
          <div className="search-inner-div-reports">
            <form className="search-inner-div-reports" onSubmit={filterdata}>
              <div className="Center_main_dic_filetr">
                <label htmlFor="donation-date">From Date</label>
                <input
                  id="donation-date"
                  style={{ width: '15rem' }}
                  type="date"
                  placeholder="From"
                  value={fromdate}
                  name="datefrom"
                  onChange={(e) => {
                    setfromdate(e.target.value);
                  }}
                />
              </div>
              <div className="Center_main_dic_filetr">
                <label htmlFor="donation-date">To Date</label>
                <input
                  id="donation-date"
                  style={{ width: '15rem' }}
                  type="date"
                  placeholder="From"
                  value={todate}
                  name="todate"
                  onChange={(e) => {
                    settodate(e.target.value);
                  }}
                />
              </div>

              {/* <div className="Center_main_dic_filetr">
                <label>&nbsp;</label>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchvalue}
                    name="searchvalue"
                    onChange={(e) => setsearchvalue(e.target.value)}
                  />
                </Search>
              </div> */}  
             

              <div className="Center_main_dic_filetr">
                <label>&nbsp;</label>
                <button>Search</button>
              </div>
            </form>
          </div>
          
        </div>

        <div className="col-md-1 actionbtn" >
            <Tooltip title="Export Excel File">
              <IconButton>
                <img
                  //   onClick={() => ExportToExcel()}
                  src={ExportExcel}
                  alt="cc"
                  style={{ width: '30px', marginLeft: '' }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Export Pdf File">
              <IconButton>
                <img
                  //   onClick={() => ExportPdfmanul(isData, 'Report')}
                  src={ExportPdf}
                  alt="cc"
                  style={{ width: '30px' }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Print Report">
              <IconButton>
                <img
                  style={{ width: '30px' }}
                  //   onClick={() => handleOpen5()}
                  src={Print}
                  alt=" Print"
                />
              </IconButton>
            </Tooltip>
          </div>

          </div>
        <hr />
        <Expense setopendashboard={setopendashboard} />
        <br />
        <hr />

        <div className="table-div-maain" style={{ marginLeft: '3rem' }}>

          <Table
            sx={{ minWidth: 650, width: '95%' }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>

                <TableCell>S No.</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Voucher No.</TableCell>
                <TableCell>Payment Mode</TableCell>
                <TableCell>Ledger Number</TableCell>
                <TableCell>Ledger Name</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Narration</TableCell>

                <TableCell className="sticky-col first-col" id="acts">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isData && isData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item?.expenseDate}</TableCell>
                    <TableCell>{item?.voucherNo}</TableCell>
                    <TableCell>{item?.paymentMode}</TableCell>
                    <TableCell>{item?.LedgerNo}</TableCell>
                    <TableCell>{item?.LedgerName}</TableCell>
                    <TableCell>{item?.amount}</TableCell>
                    <TableCell>{item?.narration}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <img
                          style={{ width: '20px', marginRight: '1rem' }}
                          onClick={() => handleEdit(item)}
                          src={Edit}
                          alt="Edit"
                        />
                      </Tooltip>

                      <Tooltip title="Delete">
                        <img
                          onClick={() => handleDelete(item?.id)}
                          src={Delete}
                          alt="Delete"
                          style={{ width: '20px' }} />
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
                  rowsPerPageOptions={[50, 100, 200]}
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

      </div>
    </>
  );
}
