// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { backendApiUrl } from '../../../../config/config';
import { serverInstance } from '../../../../API/ServerInstance';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Modal, Box, Fade, TableHead, TableCell, TableRow, Table, Tooltip, TableBody, TableFooter } from '@mui/material'
import Typography from '@mui/material/Typography';
import _ from 'lodash';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Checkbox } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CustomInput, CustomInputLabel, CustomTableInput } from '../common';
import TotalAmountRow from '../common/TotalAmountRow';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { ReactTransliterate } from 'react-transliterate';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import * as XLSX from 'xlsx';
import { TablePagination, InputAdornment, TextField } from '@mui/material';
import { IconButton } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Close from '@mui/icons-material/Close';



const style = {

  position: 'absolute',
  width: '70%',
  height: '75%',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  background: '#FFFFF',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
};



const Form = ({
  handleClose,
  themeColor,
  updateData,
  showUpdateBtn,
  // receiptNo,
  // donationTypes,
}) => {

  const navigation = useNavigate();



  const theme = createTheme({
    typography: {
      fontFamily: 'Poppins',
    },
    palette: {
      primary: {
        main: themeColor,
      },
    },
  });

  const custumstyle = {
    width: '100%',

    borderRadius: 6,
    position: 'relative',
    backgroundColor: '#fcfcfb',
    border: '1px solid #C8C6D3',
    fontSize: 14,
    padding: 9.5,
  };

  const [role, setrole] = useState('');

  const [rbData, setRbData] = useState('')
  const [donation, setDonation] = useState('')
  const [manualDonation, setManualDonation] = useState('')
  const [whatsappNo, setWhatsappNo] = useState([])
  const [attachment, setAttachment] = useState([])
  const [msg, setMsg] = useState('')
  const [open, setOpen] = useState(false)
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [newMember, setNewMember] = useState(false);
  const [mobileNo, setMobileNo] = useState('');
  const [genderp, setgenderp] = useState('');
  const [activeTab, setActiveTab] = useState('roomBooking');
  const [showloader, setshowloader] = useState(false);
  const [message, setMessage] = useState('')
  const [contacts, setContacts] = useState([]);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [page, setPage] = useState(0);
  const [jumpToPage, setJumpToPage] = useState(1);
  // Add state variables for search criteria

  const [filteredData, setFilteredData] = useState('')
  const [nameSearch, setNameSearch] = useState('');
  const [contactPersonSearch, setContactPersonSearch] = useState('');
  const [addressSearch, setAddressSearch] = useState('');


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleJumpToPage = () => {
    setPage(jumpToPage - 1);
  };

  const phoneNo = contacts.map(item => String(Object.values(item)[0]));

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {


      const data = {
        phoneNumbers: JSON.stringify(phoneNo.concat(whatsappNo, selectedNumbers)),
        message: message,
        media: attachment

      };

      console.log(JSON.stringify(contacts), message, attachment)

      const formData = new FormData();

      for (const key in data) {
        formData.append(key, data[key]);
      }


      const res = await axios.post(`${backendApiUrl}admin/custom-whatsapp`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });



      if (res.data.status) {
        console.log(res.data.msg);


        Swal.fire('Great!', res.data.msg, 'success');

        handleClose();

      } else {
        console.log(res.msg);
        handleClose()

        Swal.fire('Error!', res.data.msg, 'error');
      }
    } catch (error) {
      console.log(error);
      handleClose();
      Swal.fire('Error!', error, 'error');
    }
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

  var date = today.toISOString().substring(0, 10);

  const handleTable = () => {
    setOpen(true)
  }

  const handleCloseTable = () => {
    setOpen(false)
  }


  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        const contactNumbers = XLSX.utils.sheet_to_json(sheet, { header: 'A', defval: '' });

        setContacts(contactNumbers.filter(contact => contact !== ''));
      };

      reader.readAsArrayBuffer(file);
    }


  }

  const getRoomBooking = async () => {
    try {
      const res = await serverInstance('room/getRoomBooking-mobileNo', 'get')
      setRbData(res.data)
      console.log(res)

    } catch (err) {
      console.log('Room booking not fetched', err)
    }
  }

  const getDonations = async () => {
    try {
      const res = await serverInstance('user/getDonation-mobileNo ', 'get')
      setDonation(res.data)
      console.log('donations ', res)

    } catch (err) {
      console.log('Room booking not fetched', err)
    }
  }


  const getManualDonations = async () => {
    try {
      const res = await serverInstance('user/getManualDonation-mobileNo ', 'get')
      setManualDonation(res.data)
      console.log('manual doation', res)

    } catch (err) {
      console.log('Room booking not fetched', err)
    }
  }

  const handleCheckboxChange = (number) => {
    const fullPhoneNumber = '91' + String(number);

    if (selectedNumbers.includes(fullPhoneNumber)) {
      setSelectedNumbers((prevNumbers) =>
        prevNumbers.filter((selectedNumber) => selectedNumber !== fullPhoneNumber)
      );
    } else {
      setSelectedNumbers((prevNumbers) => [...prevNumbers, fullPhoneNumber]);
    }
  };

  const calculateSerialNumber = (index) => {
    return index + 1 + page * rowsPerPage;
  };

  // const filteredData = rbData
  //   ? rbData
  //     .filter((item) =>
  //       String(item?.contactNo).includes(phoneNoSearch) ||
  //       item?.address.includes(addressSearch) ||
  //       item?.name.toLowerCase().includes(nameSearch.toLowerCase())
  //     )
  //     .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
  //   : [];

  const handleSearch = () => {
    const filteredData = rbData && rbData.filter((item) =>
      item?.name.toLowerCase().includes(nameSearch.toLowerCase()) &&
      item?.contactNo.toLowerCase().includes(contactPersonSearch.toLowerCase()) &&
      item?.address.toLowerCase().includes(addressSearch.toLowerCase())
    );

    // Update filteredData state
    setRbData(filteredData);
    // Reset pagination to the first page
    setPage(0);

    console.log('fil', filteredData)
  };

  const donationSearch = () => {
    const filteredData = donation && donation.filter((item) =>
      item?.name.toLowerCase().includes(nameSearch.toLowerCase()) &&
      item?.phoneNo.toLowerCase().includes(contactPersonSearch.toLowerCase()) &&
      item?.address.toLowerCase().includes(addressSearch.toLowerCase())
    );

    // Update filteredData state
    setDonation(filteredData);
    // Reset pagination to the first page
    setPage(0);

    console.log('fil', filteredData)
  };

  const manualSearch = () => {
    const filteredData = manualDonation && manualDonation.filter((item) =>
      item?.name.toLowerCase().includes(nameSearch.toLowerCase()) &&
      item?.phoneNo.toLowerCase().includes(contactPersonSearch.toLowerCase()) &&
      item?.address.toLowerCase().includes(addressSearch.toLowerCase())
    );

    // Update filteredData state
    setManualDonation(filteredData);
    // Reset pagination to the first page
    setPage(0);

    console.log('fil', filteredData)
  };




  const handleReset = () => {
    getManualDonations();
    getDonations();
    getRoomBooking();
    setAddressSearch('')
    setContactPersonSearch('')
    setNameSearch('')
  }
  const delayedSearch = _.debounce(handleSearch, 300);


  useEffect(() => {

    getManualDonations();
    getDonations();
    getRoomBooking();
  }, [activeTab]);


  return (

    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleCloseTable}
      >
        <Fade in={open}>
          <Box sx={style} >
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Close onClick={handleCloseTable} />
            </div>

            {/* Navigation Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '1rem' }}>
              <Button
                onClick={() => setActiveTab('roomBooking')}
                sx={{
                  backgroundColor: activeTab === 'roomBooking' ? '#00a884' : 'transparent',
                  color: activeTab === 'roomBooking' ? '#fff' : '#00a884',
                  '&:hover': {
                    backgroundColor: '#007d62',
                    color: '#fff',
                  },
                }}
                variant="contained"
              >
                Room Booking
              </Button>
              <Button
                onClick={() => setActiveTab('donations')}
                sx={{
                  backgroundColor: activeTab === 'donations' ? '#00a884' : 'transparent',
                  color: activeTab === 'donations' ? '#fff' : '#00a884',
                  '&:hover': {
                    backgroundColor: '#007d62',
                    color: '#fff',
                  },
                }}
                variant="outlined"
              >
                Donations
              </Button>

              <Button
                onClick={() => setActiveTab('manualDonation')}
                sx={{
                  backgroundColor: activeTab === 'manualDonation' ? '#00a884' : 'transparent',
                  color: activeTab === 'manualDonation' ? '#fff' : '#00a884',
                  '&:hover': {
                    backgroundColor: '#00a884',
                    color: '#fff',
                  },
                }}
                variant="outlined"
              >
                Manual Donation
              </Button>



            </div>


            {activeTab === 'roomBooking' && (


              <div style={{ overflowY: 'auto', maxHeight: '60vh' }}>
                <div style={{ margin: '1rem', alignItems: 'center', display: 'flex', justifyContent: 'space-around' }}>

                  <div>

                  <TextField
                      InputProps={{
                        style: {
                          borderRadius: "5rem",
                        }
                      }}
                      label="Search by Name"
                      variant="outlined"
                      value={nameSearch}
                      onChange={(e) => {
                        delayedSearch();
                        setNameSearch(e.target.value)
                      }}
                      style={{ marginRight: '1rem', width: '10rem' }}
                    />
                    <TextField
                      InputProps={{
                        style: {
                          borderRadius: "5rem",
                        }
                      }}
                      label="Search by Phone No."
                      variant="outlined"
                      value={contactPersonSearch}
                      onChange={(e) => {
                        delayedSearch();
                        setContactPersonSearch(e.target.value)
                      }}
                      style={{ marginRight: '1rem', width: '10rem' }}
                    />
                    <TextField
                      InputProps={{
                        style: {
                          borderRadius: "5rem",
                          width: '10rem'
                        }
                      }}
                      label="Search by Address"
                      variant="outlined"
                      value={addressSearch}
                      onChange={(e) => {
                        delayedSearch();
                        setAddressSearch(e.target.value)
                      }}
                    />
                  </div>
                  <div style={{ marginLeft: '1rem' }}>
                    <Button

                      onClick={handleSearch}
                      variant="contained"
                      sx={{
                        borderRadius: '8px',
                        backgroundColor: '#e8812c',
                        '&:hover': {
                          backgroundColor: '#c26b23'
                        }
                      }}
                    >
                      Search
                    </Button>
                    <Button

                      onClick={handleReset}
                      variant="contained"
                      sx={{ borderRadius: '8px', margin: '1rem' }}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
                <Table
                >
                  <TableHead >
                    <TableCell sx={{ width: '3%' }}></TableCell>
                    <TableCell>
                      S No.
                    </TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>
                      Numbers
                    </TableCell>
                    <TableCell>Address</TableCell>
                  </TableHead>
                  <TableBody>
                    {
                      rbData && rbData.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      ).map((item, index) => (
                        <TableRow key={index}>
                          <TableCell >
                            <Checkbox
                              checked={selectedNumbers.includes('91' + String(item?.contactNo))}
                              onChange={() => handleCheckboxChange(item?.contactNo)}
                            />
                          </TableCell>

                          <TableCell>
                            {calculateSerialNumber(index)}
                          </TableCell>
                          <TableCell>{item?.name}</TableCell>
                          <TableCell>{item?.contactNo}</TableCell>
                          <TableCell>{item?.address}</TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>

                  <TableFooter>

                    <TablePagination
                      sx={{ display: 'flex', justifyContent: 'flex-end' }}
                      rowsPerPageOptions={[100]}
                      component="div"
                      count={rbData.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      labelRowsPerPage={<span>Rows:</span>}
                      labelDisplayedRows={({ from, to, count }) =>
                        `${from}-${to} of ${count}`
                      }
                      backIconButtonProps={{
                        color: 'secondary',
                      }}
                      nextIconButtonProps={{ color: 'secondary' }}
                      SelectProps={{
                        inputProps: {
                          'aria-label': 'rows per page',
                        },
                        native: true,
                      }}

                      ActionsComponent={() => (
                        <div style={{ display: 'flex' }}>
                          <TextField
                            sx={{

                              width: '10rem',

                            }}
                            variant="outlined"
                            label="Jump to Page"
                            InputProps={{
                              inputProps: {
                                min: 1,
                                max: Math.ceil(rbData.length / rowsPerPage),
                              },
                              endAdornment: (
                                <InputAdornment position="end" >
                                  <IconButton
                                    onClick={handleJumpToPage}
                                    disabled={jumpToPage < 1 || jumpToPage > Math.ceil(rbData.length / rowsPerPage)}
                                  >
                                    <ArrowRightAltIcon />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                            value={jumpToPage}
                            onChange={(e) => setJumpToPage(e.target.value)}
                          />
                        </div>
                      )}
                    />

                  </TableFooter>
                </Table>

              </div>
            )}

            {activeTab === 'donations' && (

              <div style={{ overflowY: 'auto', maxHeight: '60vh' }}>

                <div style={{ margin: '1rem', alignItems: 'center', display: 'flex', justifyContent: 'space-around' }}>
                  <div>
                    <TextField
                      InputProps={{
                        style: {
                          borderRadius: "5rem",
                        }
                      }}
                      label="Search by Name"
                      variant="outlined"
                      value={nameSearch}
                      onChange={(e) => {
                        delayedSearch();
                        setNameSearch(e.target.value)
                      }}

                      style={{ marginRight: '1rem', width: '10rem' }}
                    />
                    <TextField
                      InputProps={{
                        style: {
                          borderRadius: "5rem",
                          width: '10rem'
                        }
                      }}
                      label="Search by Contact Person"
                      variant="outlined"
                      value={contactPersonSearch}
                      onChange={(e) => {
                        delayedSearch();
                        setContactPersonSearch(e.target.value)
                      }}
                      style={{ marginRight: '1rem' }}
                    />
                    <TextField
                      InputProps={{
                        style: {
                          borderRadius: "5rem",
                          width: '10rem'
                        }
                      }}
                      label="Search by Address"
                      variant="outlined"
                      value={addressSearch}
                      onChange={(e) => {
                        delayedSearch();
                        setAddressSearch(e.target.value)
                      }}
                    />
                  </div>
                  <div style={{ marginLeft: '1rem' }}>
                    <Button variant="contained"
                      sx={{
                        borderRadius: '8px', marginRight: '1rem',
                        backgroundColor: '#e8812c',
                        '&:hover': {
                          backgroundColor: '#c26b23'
                        }
                      }}
                      onClick={donationSearch}>Search</Button>
                    <Button
                      variant="contained"
                      sx={{ borderRadius: '8px' }}
                      onClick={handleReset}>Reset</Button>
                  </div>
                </div>
                <Table>
                  <TableHead >
                    <TableCell sx={{ width: '3%' }}></TableCell>
                    <TableCell>
                      S No.
                    </TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>
                      Numbers
                    </TableCell>
                    <TableCell>Address</TableCell>
                  </TableHead>
                  <TableBody>
                    {
                      donation && donation.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      ).map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Checkbox
                              checked={selectedNumbers.includes('91' + String(item?.phoneNo))}
                              onChange={() => handleCheckboxChange(item?.phoneNo)}
                            />
                          </TableCell>

                          <TableCell>
                            {calculateSerialNumber(index)}
                          </TableCell>
                          <TableCell>{item?.name}</TableCell>
                          <TableCell>{item?.phoneNo}</TableCell>
                          <TableCell>{item?.address}</TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>

                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        sx={{ display: 'flex', justifyContent: 'flex-end' }}
                        rowsPerPageOptions={[100]}
                        component="div"
                        count={donation.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage={<span>Rows:</span>}
                        labelDisplayedRows={({ from, to, count }) =>
                          `${from}-${to} of ${count}`
                        }
                        backIconButtonProps={{
                          color: 'secondary',
                        }}
                        nextIconButtonProps={{ color: 'secondary' }}
                        SelectProps={{
                          inputProps: {
                            'aria-label': 'rows per page',
                          },
                          native: true,
                        }}

                        ActionsComponent={() => (
                          <div style={{ display: 'flex' }}>
                            <TextField
                              sx={{
                                width: '10rem'
                              }}
                              variant="outlined"
                              label="Jump to Page"
                              InputProps={{
                                inputProps: {
                                  min: 1,
                                  max: Math.ceil(donation.length / rowsPerPage),
                                },
                                endAdornment: (
                                  <InputAdornment position="end" >
                                    <IconButton
                                      onClick={handleJumpToPage}
                                      disabled={jumpToPage < 1 || jumpToPage > Math.ceil(donation.length / rowsPerPage)}
                                    >
                                      <ArrowRightAltIcon />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                              value={jumpToPage}
                              onChange={(e) => setJumpToPage(e.target.value)}
                            />
                          </div>
                        )}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            )}

            {
              activeTab === 'manualDonation' &&
              (

                <div style={{ overflowY: 'auto', maxHeight: '60vh', overflowX: 'auto' }}>
                  <div style={{ margin: '1rem', alignItems: 'center', display: 'flex', justifyContent: 'space-around' }}>
                    <div>
                      <TextField
                        InputProps={{
                          style: {
                            borderRadius: "5rem",
                          }
                        }}
                        label="Search by Name"
                        variant="outlined"
                        value={nameSearch}
                        onChange={(e) => {
                          delayedSearch();
                          setNameSearch(e.target.value)
                        }}

                        style={{ marginRight: '1rem', width: '10rem' }}
                      />
                      <TextField
                        InputProps={{
                          style: {
                            borderRadius: "5rem",
                          }
                        }}
                        label="Search by Contact Person"
                        variant="outlined"
                        value={contactPersonSearch}
                        onChange={(e) => {
                          delayedSearch();
                          setContactPersonSearch(e.target.value)
                        }}
                        style={{ marginRight: '1rem', width: '10rem' }}
                      />
                      <TextField
                        InputProps={{
                          style: {
                            borderRadius: "5rem",
                            width: '12rem'
                          }
                        }}
                        label="Search by Address"
                        variant="outlined"
                        value={addressSearch}
                        onChange={(e) => {
                          delayedSearch();
                          setAddressSearch(e.target.value)
                        }}
                      />
                    </div>
                    <div style={{ marginLeft: '1rem' }}>
                      <Button
                        variant="contained"
                        sx={{
                          borderRadius: '8px', marginRight: '1rem',
                          backgroundColor: '#e8812c',
                          '&:hover': {
                            backgroundColor: '#c26b23'
                          }
                        }}
                        onClick={manualSearch}>Search</Button>
                      <Button
                        variant="contained"
                        sx={{ borderRadius: '8px' }}
                        onClick={handleReset}>Reset</Button>
                    </div>
                  </div>
                  <Table>
                    <TableHead >
                      <TableCell sx={{ width: '3%' }}></TableCell>
                      <TableCell>
                        S No.
                      </TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>
                        Numbers
                      </TableCell>
                      <TableCell>Address</TableCell>
                    </TableHead>
                    <TableBody>
                      {
                        manualDonation && manualDonation.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Checkbox
                                checked={selectedNumbers.includes('91' + String(item?.phoneNo))}
                                onChange={() => handleCheckboxChange(item?.phoneNo)}
                              />
                            </TableCell>
                            <TableCell>
                              {calculateSerialNumber(index)}
                            </TableCell>
                            <TableCell>{item?.name}</TableCell>
                            <TableCell>{item?.phoneNo}</TableCell>
                            <TableCell>{item?.address}</TableCell>
                          </TableRow>
                        ))
                      }
                    </TableBody>

                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          sx={{ display: 'flex' }}
                          rowsPerPageOptions={[100]}
                          component="div"
                          count={manualDonation.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                          labelRowsPerPage={<span>Rows:</span>}
                          labelDisplayedRows={({ from, to, count }) =>
                            `${from}-${to} of ${count}`
                          }
                          backIconButtonProps={{
                            color: 'secondary',
                          }}
                          nextIconButtonProps={{ color: 'secondary' }}
                          SelectProps={{
                            inputProps: {
                              'aria-label': 'rows per page',
                            },
                            native: true,
                          }}

                          ActionsComponent={() => (
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                              <TextField
                                sx={{
                                  width: '10rem'
                                }}
                                variant="outlined"
                                label="Jump to Page"
                                InputProps={{
                                  inputProps: {
                                    min: 1,
                                    max: Math.ceil(manualDonation.length / rowsPerPage),
                                  },
                                  endAdornment: (
                                    <InputAdornment position="end" >
                                      <IconButton
                                        onClick={handleJumpToPage}
                                        disabled={jumpToPage < 1 || jumpToPage > Math.ceil(manualDonation.length / rowsPerPage)}
                                      >
                                        <ArrowRightAltIcon />
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                                value={jumpToPage}
                                onChange={(e) => setJumpToPage(e.target.value)}
                              />
                            </div>
                          )}
                        />
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>
              )
            }
          </Box>
        </Fade>
      </Modal>


      <Box>
        <ThemeProvider theme={theme}>
          <form onSubmit={handlesubmit} encType='multipart/form-data'>
            <Typography variant="h6" color={'primary'} align="center">
              Custom Whatsapp Notification
            </Typography>
            <Typography variant="body2" color="primary" align="right">
              {currDate} / {currTime}
            </Typography>
            {/* <Typography variant="body2" my={1}>
              {updateData?.ReceiptNo ? 'Receipt No :' : ' Voucher No :'}
              {updateData?.ReceiptNo ? updateData?.ReceiptNo : receiptNo}
              &nbsp;&nbsp;
              {updateData ? 'Voucher No : ' : ''}
              {updateData ? updateData?.voucherNo : ''}
            </Typography> */}
            <Box
              sx={{
                marginBottom: '1rem',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <div style={{
                display: 'flex', alignItems: 'center',
                gap: 2,
                my: 2,
              }}>
                <Typography variant="body1">Change language:</Typography>

                <Button
                  variant={newMember ? 'outlined' : 'contained'}
                  sx={{
                    borderColor: '#C8C8C8',
                    fontSize: 12,
                    minWidth: 100,
                    padding: 0.5,
                    color: newMember ? '#656565' : '#fff',
                  }}
                  onClick={() => setNewMember(false)}
                >
                  {' '}
                  Hindi
                </Button>
                <Button
                  onClick={() => setNewMember(true)}
                  variant={newMember ? 'contained' : 'outlined'}
                  sx={{
                    borderColor: '#C8C8C8',
                    fontSize: 12,
                    minWidth: 100,
                    padding: 0.5,
                    color: newMember ? '#fff' : '#656565',
                  }}
                >
                  {' '}
                  English
                </Button>
              </div>
              <div>
                <Button
                  onClick={handleTable}
                  sx={{
                    backgroundColor: '#c3ebe2',
                    '&:hover': {
                      backgroundColor: '#93e6d4'
                    }
                  }}
                >Upload Number From Table
                  <Tooltip title="Upload From Table">
                    <FileUploadIcon
                    />
                  </Tooltip>
                </Button>


              </div>
            </Box>



            <Grid container rowSpacing={2} columnSpacing={5}>


              <Grid item xs={12} md={2}>
                <CustomInputLabel htmlFor="Whatsapp Number">
                  Whatsapp Number
                </CustomInputLabel>
                <CustomInput
                  id="mobile-no"
                  value={whatsappNo}
                  onChange={(e) => {
                    setWhatsappNo(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <CustomInputLabel htmlFor="Location">
                  Upload Number from Excel
                </CustomInputLabel>
                <CustomInput
                  type="file"
                  onChange={handleFileUpload}
                  accept=".xlsx, .xls" />
                <CustomInputLabel style={{ color: 'red' }}>
                  *Excel file only
                </CustomInputLabel>
              </Grid>

              <Grid item xs={12} md={4}>
                <CustomInputLabel htmlFor="attachment">
                  Attachment
                </CustomInputLabel>
                <CustomInput
                  type="file"
                  accept="image/*"
                  id="attachment"
                  onChange={(e) => setAttachment(e.target.files[0])}
                />


                <CustomInputLabel style={{ color: 'red' }}>
                  *png and img file only
                </CustomInputLabel>
              </Grid>

              {/* <Grid item xs={12} md={3}>
                <CustomInputLabel htmlFor="Location">
                  Upload  From Table
                </CustomInputLabel>
                <CustomInput


                  accept=".xlsx, .xls" />
                <CustomInputLabel style={{ color: 'red' }}>
                  *Excel file only
                </CustomInputLabel>
              </Grid> */}

              <Grid item xs={12} md={4}>
                {!newMember ? (
                  <>
                    Message

                    <ReactTransliterate
                      style={custumstyle}
                      id="full-name"
                      required
                      value={message}
                      onChangeText={(message) => {
                        setMessage(message);
                      }}
                      onChange={(e) => setMessage(e.target.value)}
                      a lang="hi"
                    />

                  </>
                ) : (
                  <>
                    Message
                    <TextareaAutosize
                      aria-label="message"
                      minRows={3}

                      placeholder="Type your message here"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      style={{ height: '25rem', width: '75rem', maxBlockSize: '100rem', maxWidth: '40rem', fontSize: 14, padding: 9.5, borderRadius: 6 }}
                    />
                  </>
                )}
              </Grid>


            </Grid>




            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 3,
                mt: 2,
              }}
            >
              {showUpdateBtn ? (
                <Button
                  sx={{
                    textTransform: 'none',
                    paddingX: 5,
                    boxShadow: 'none',
                  }}
                  variant="contained"
                  type="submit"
                >
                  {showloader ? (
                    <CircularProgress
                      style={{
                        width: '21px',
                        height: '21px',
                        color: 'white',
                      }}
                    />
                  ) : (
                    'Update'
                  )}
                </Button>
              ) : (
                <Button
                  sx={{
                    textTransform: 'none',
                    paddingX: 5,
                    boxShadow: 'none',
                  }}
                  variant="contained"
                  type="submit"
                >
                  {showloader ? (
                    <CircularProgress
                      style={{
                        width: '21px',
                        height: '21px',
                        color: 'white',
                      }}
                    />
                  ) : (
                    'Send'
                  )}
                </Button>
              )}

              <Button
                sx={{
                  textTransform: 'none',
                  paddingX: 5,
                }}
                variant="contained"
                color="error"
                onClick={handleClose}
                type="button"
              >
                Cancel
              </Button>
            </Box>
          </form>
        </ThemeProvider>
      </Box>
    </>
  );
};
export default Form;
