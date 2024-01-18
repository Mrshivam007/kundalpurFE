
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableHead, TableRow, TableBody, TableCell, TableFooter, TablePagination } from '@mui/material'
import Tooltip from "@mui/material/Tooltip";
import { IconButton } from "@mui/material";
import { serverInstance } from "../../../../../../../API/ServerInstance";
import { Input } from "@mui/material";
import Edit from '../../../../../../../assets/Edit.png';
import Delete from '../../../../../../../assets/Delete.png';
import payimg from '../../../../../../../assets/payimg.png';

import { Modal, Fade, Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import CloseIcon from "@mui/icons-material/Close";

import ExportPdf from '../../../../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../../.././../assets/ExportExcel.png';
import Print from '../../../../../../../assets/Print.png';

import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button'
import Swal from "sweetalert2";
import { Create_Expense } from "../form/Create_Expense";
import Add from "../form/Add";


const style10 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 'auto%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
  borderRadius: '15px',
};

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,

  color: '#FDC99C',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',

  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  zIndex: 2,
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  left: '11px',
  bottom: '0px',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    height: '17px',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function LedgerTable() {

  const navigate = useNavigate()


  const [isData, setIsData] = useState('')
  const [deleteId, setDeleteId] = useState('');
  const [openDelete, setOpenDelete] = useState(false)

  const [searchvalue, setsearchvalue] = useState('');
  const [fromdate, setfromdate] = useState('')
  const [todate, settodate] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [page, setPage] = useState(0);

  const [openEdit, setOpenEdit] = useState(false)
  const [updateData, setupdatedata] = useState('')

  const [open30, setOpen30] = useState(false)
  const [paydata, setpaydata] = useState('')

  const handleClose30 = () => setOpen30(false);

  const [filteredData, setFilteredData] = useState(null);

  const [ledgerNo, setLedgerNo] = useState('');
  const [refresh, setRefresh] = useState(false);

  const handleInputChange = (e) => {
    setLedgerNo(e.target.value);
  }

  const handleSearchClick = () => {
    handleSearch(ledgerNo);
  }


  const handleSearch = (ledgerNo) => {
    if (!ledgerNo) {
      setFilteredData(null);
      return;
    }

    const filtered = isData.filter(row => row.LedgerNo.includes(ledgerNo));
    setFilteredData(filtered);
  }

  const dataToRender = filteredData !== null ? filteredData : isData;


  const handleRowClick = (data) => {
    navigate('/admin-panel/expense/expenseTally', {
      state: {
        data: data,
      },
    });
  };


  const handleRefreshTable = () => {
    setRefresh(!refresh);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));

    setPage(0);
  };

  const handleDelete = (id) => {
    setOpenDelete(true);
    setDeleteId(id);
  }

  const handleDeleteClose = () => {
    setOpenDelete(false)
  }

  const handleEdit = (data) => {
    setOpenEdit(true);
    setupdatedata(data);
  };

  const closeEdit = () => {
    setOpenEdit(false)
  }

  const handleOpen30 = (data) => {
    setOpen30(true);
    setpaydata(data);

    console.log('boli data from boli ledger', data);
  };

  const handleDonation = () => {
    navigate('/admin-panel/donation', {
      state: {
        data: paydata,
      },
    });
  };

  const handleManualDonation = () => {
    navigate('/admin-panel/manualdonation', {
      state: {
        data: paydata,
      },
    });
  };

  const filterdata = async (e) => {
    e.preventDefault();

    try {
      if (fromdate && todate) {

        const response = await serverInstance(
          `expense/get-expenseLedger?fromDate=${fromdate}&toDate=${todate}`,
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



  const getLedger = () => {
    serverInstance('expense/get-expenseLedger', 'get').then((res) => {
      if (res.status) {
        console.log(res.data)
        setIsData(res.data)
      } else {
        Swal.fire('Error', 'something went  wrong', 'error');
      }

    })
  }

  const deleteLedger = () => {

    try {

      serverInstance(`expense/delete-expenseLedger?id=${deleteId}`, 'delete').then((res) => {
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
    getLedger();
  }, [refresh, openDelete, openEdit]);


  return (
    <>


      {/* <div className="bigcontainer">
        <div className="selecttabcontainer1">
          <Input
            placeholder="Ledger No."
            value={ledgerNo}
            onChange={handleInputChange}
          />
          <Input

            placeholder="Supplier Name"
            className="selecttab"

          />
          <Input

            placeholder="Location"
            className="selecttab"

          />
          <button id="srcbtn" onClick={handleSearchClick}>
            Search
          </button>
          <button id="srcbtn" >
            Reset
          </button>
        </div>
        <div className="selecttabcontainer2">
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
          <div className="col-md-1">

          </div>


        </div>

      </div> */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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



      <div  >
        <hr />
        <Add refreshTable={handleRefreshTable} />
        <br />
        <br />
        <hr />
      </div>


      <div className="wrapper_abc" >

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open30}
          onClose={handleClose30}
          closeAfterTransition
        >
          <Fade in={open30}>
            <Box sx={style10}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p>Please Select Donation Option</p>
                <CloseIcon onClick={() => handleClose30()} />
              </div>

              <div className="buttonsdiv">
                <Button
                  sx={{
                    borderRadius: '0.5rem',
                    color: 'black',
                    width: '10vw',
                    backgroundColor: '#fcbb82',
                    margin: '1rem',
                    ':hover': {
                      bgcolor: '#f2ad6f',
                    },
                  }}
                  onClick={() => handleDonation(paydata)}
                >
                  Donation
                </Button>

                <Button
                  sx={{
                    borderRadius: '0.5rem',
                    color: 'black',
                    width: '10vw',
                    backgroundColor: '#fcbb82',
                    margin: '1rem',
                    ':hover': {
                      bgcolor: '#f2ad6f',
                    },
                  }}
                  onClick={() => handleManualDonation(paydata)}
                >
                  Manual Donation
                </Button>
              </div>
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
            <Button onClick={deleteLedger} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>

        <div className="table-div-maain" style={{ marginLeft: '3rem' }}>
          <Table
            sx={{ minWidth: 650, width: '95%' }}
            aria-label="simple table"
          >
            <TableHead style={{ background: '#FFEEE0' }}>
              <TableRow>
                <TableCell>
                  S.No.
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('donation_date')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Ledger No.
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('ReceiptNo')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell sx={{ width: '3rem' }}>
                  Phone No.
                  <i
                    style={{ marginLeft: '0px' }}
                    onClick={() => sortData('voucherNo')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Full Name
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('phoneNo')}
                    class={`fa fa-sort`}
                  />
                </TableCell>

                <TableCell>
                  Address
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('name')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  City
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('phoneNo')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Pincode
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('phoneNo')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  State
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('phoneNo')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Country
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('phoneNo')}
                    class={`fa fa-sort`}
                  />
                </TableCell>

                <TableCell>
                  Email
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('phoneNo')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Aadhar No.
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('phoneNo')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  PAN No.
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('phoneNo')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Total Amount
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('phoneNo')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Deposit Amount
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('phoneNo')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Pending Amount
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('phoneNo')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {
                openEdit && <Add openEdit={openEdit} closeEdit={closeEdit} updateData={updateData} />
              }

              {dataToRender ? (
                <>
                  {(rowsPerPage > 0
                    ? dataToRender.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage,
                    )
                    : dataToRender.reverse()
                  ).map((row, index) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row?.LedgerNo}</TableCell>
                      <TableCell onClick={() => handleRowClick(row)}>
                        {row?.MobileNo}
                      </TableCell>
                      <TableCell onClick={() => handleRowClick(row)}>
                        {row?.Name}
                      </TableCell>
                      <TableCell onClick={() => handleRowClick(row)}>
                        {row?.Address}
                      </TableCell>
                      <TableCell onClick={() => handleRowClick(row)}>
                        {row?.City}
                      </TableCell>
                      <TableCell onClick={() => handleRowClick(row)}>
                        {row?.PinCode}
                      </TableCell>
                      <TableCell onClick={() => handleRowClick(row)}>
                        {row?.State}
                      </TableCell>
                      <TableCell onClick={() => handleRowClick(row)}>
                        {row?.Country}
                      </TableCell>
                      <TableCell onClick={() => handleRowClick(row)}>
                        {row?.Email}
                      </TableCell>
                      <TableCell onClick={() => handleRowClick(row)}>
                        {row?.AadharNo}
                      </TableCell>
                      <TableCell onClick={() => handleRowClick(row)}>
                        {row?.PanNo}
                      </TableCell>
                      <TableCell onClick={() => handleRowClick(row)}>
                        {Number(row?.OpeningBalance) +
                          Number(row?.TotalAmount)}
                      </TableCell>
                      <TableCell onClick={() => handleRowClick(row)}>
                        {row?.DepositedAmount}
                      </TableCell>
                      <TableCell onClick={() => handleRowClick(row)}>
                        {Number(row?.OpeningBalance) +
                          Number(row?.TotalAmount) -
                          Number(row?.DepositedAmount)}
                      </TableCell>

                      <TableCell>
                        <Tooltip title="Edit">
                          <img
                            style={{ width: '20px', marginRight: '1rem' }}
                            onClick={() => handleEdit(row)}
                            src={Edit}
                            alt="Edit"
                          />
                        </Tooltip>

                        <Tooltip title="Delete">
                          <img
                            onClick={() => handleDelete(row?.id)}
                            src={Delete}
                            alt="Delete"
                            style={{ width: '20px' }} />
                        </Tooltip>
                        <Tooltip title="Pay">
                          <img
                            style={{ width: '20px' }}
                            onClick={() => handleOpen30(row)}
                            src={payimg}
                            alt="Pay"
                          />
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <></>
              )}
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
