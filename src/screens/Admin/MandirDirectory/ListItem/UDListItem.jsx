// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { backendApiUrl } from '../../../../config/config';
import { serverInstance } from '../../../../API/ServerInstance';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Swal from 'sweetalert2';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import AddBoxIcon from '@mui/icons-material/AddBox';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CustomInput, CustomInputLabel, CustomTableInput } from '../common';
import TotalAmountRow from '../common/TotalAmountRow';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { ReactTransliterate } from 'react-transliterate';
import CircularProgress from '@material-ui/core/CircularProgress';

const UDListItem = ({
  handleClose,
  themeColor,
  updateData,
  showUpdateBtn,
  // receiptNo,
  // donationTypes,
}) => {
  const navigation = useNavigate();
  const { t, i18n } = useTranslation();

  const relationshipOptions = [
    {
      id: 2,
      relation: 'Mother',
    },
    {
      id: 3,
      relation: 'Wife',
    },
    {
      id: 4,
      relation: 'Son',
    },
    {
      id: 5,
      relation: 'Daughter',
    },
  ];


  const sadsyaOptions = [
    {
      id: 2,
      sadsya: 'Adhyaksh',
    },
    {
      id: 3,
      sadsya: 'Upadhyaksh',
    },
    {
      id: 4,
      sadsya: 'Koshadhyaksh',
    },
    {
      id: 5,
      sadsya: 'Bhakt',
    },
    {
      id: 6,
      sadsya: 'Yatri'
    }
  ];

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

  const custommStyleInputTable = {
    width: '100%',
    position: 'relative',

    border: '1px solid #C8C6D3',
    fontSize: 14,
    padding: 9.5,
  };
  const [role, setrole] = useState('');
  const [hindiremark, sethindiremark] = useState('');
  // const [donationTypes, setDonationTypes] = useState([]);
  // const [receiptNo, setReceiptNo] = useState('');

  const [sadsyaType, setSadsyaType] = useState('')
  const [relationship, setRelationship] = useState('')
  const [email, setEmail] = useState('')
  const [DOB, setDOB] = useState('')
  const [DOA, setDOA] = useState('')
  const [status, setStatus] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [newMember, setNewMember] = useState(false);
  const [mobileNo, setMobileNo] = useState('');
  const [genderp, setgenderp] = useState('');
  const [genderp1, setgenderp1] = useState('');
  const [fetchuserdetail, setfetchuserdetail] = useState(true);
  const [showloader, setshowloader] = useState(false);
  const [donationItems, setDonationItems] = useState([
    {
      type: '',
      amount: '',
      remark: '',
    },
  ]);

  // console.log('from cash ', donationTypes, receiptNo);
  function addDonationItem() {
    setDonationItems([
      ...donationItems,
      {
        type: '',
        amount: '',
        remark: '',
      },
    ]);
  }
  function removeDonationItem(item) {
    setDonationItems(
      donationItems.filter((donationItem) => donationItem !== item),
    );
  }

  function handleDonationItemUpdate(originalDonationItem, key, value) {
    setDonationItems(
      donationItems.map((donationItem) =>
        donationItem === originalDonationItem
          ? {
            ...donationItem,
            [key]: value,
          }
          : donationItem,
      ),
    );
  }

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
  const [donationDate, setDonationDate] = useState(showUpdateBtn ? '' : date);

  const [donationTime, setDonationTime] = useState(
    showUpdateBtn
      ? ''
      : today.toLocaleTimeString('it-IT', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }),
  );
  const getDonatedUserDetails = () => {
    serverInstance(`admin/getuser-by-num?mobile=${mobileNo}`, 'get').then(
      (res) => {
        if (res.status) {
          setFullName(res.data.name);
          setAddress(res.data.address);
          setgenderp(res.data.gender);
        }
      },
    );
  };

  if (showUpdateBtn) {
  } else {
    if (mobileNo.length === 10 && fetchuserdetail === true) {
      getDonatedUserDetails();
      setfetchuserdetail(false);
    }
  }

  const addCashDonation = async (e) => {
    setshowloader(true);
    axios.defaults.headers.post[
      'Authorization'
    ] = `Bearer ${sessionStorage.getItem('token')}`;
    axios.defaults.headers.put[
      'Authorization'
    ] = `Bearer ${sessionStorage.getItem('token')}`;
    e.preventDefault();
    if (showUpdateBtn) {
      if (fullName && donationItems[0].amount && donationItems[0].type) {
        const res = await axios.put(`${backendApiUrl}user/edit-cash-donation`, {
          id: updateData?.id,
          name: fullName,
          gender: newMember ? genderp1 : genderp,
          phoneNo: mobileNo,
          address: address,
          new_member: newMember,
          modeOfDonation: 2,
          donation_date: donationDate,
          donation_time: donationTime,
          donation_item: donationItems,
        });

        if (res.data.status === true) {
          handleClose();
          setshowloader(false);
        } else {
          Swal.fire('Error!', 'Somthing went wrong!!', 'error');
        }
      }
    } else {
      if (fullName && donationItems[0].amount && donationItems[0].type) {
        try {
        } catch (error) { }
        const res = await axios.post(`${backendApiUrl}user/add-elecDonation`, {
          name: fullName,
          gender: newMember ? genderp1 : genderp,
          phoneNo: mobileNo,
          address: address,
          new_member: newMember,
          modeOfDonation: 2,
          donation_date: donationDate,
          donation_time: donationTime,
          donation_item: donationItems,
        });

        let totalamount = donationItems?.amount
          ? donationItems?.amount
          : donationItems &&
          donationItems.reduce(
            (n, { amount }) => parseFloat(n) + parseFloat(amount),
            0,
          );

        if (res.data.status === true) {
          handleClose();
          setshowloader(false);
          navigation('/reciept', {
            state: {
              userdata: res.data.data.message.data,
            },
          });
          console.log(res.data.data.message.data.ReceiptNo);
          sendsms(totalamount, res.data.data.message.data.ReceiptNo);
        } else {
          Swal.fire('Error!', 'Somthing went wrong!!', 'error');
        }
      }
    }
  };

  const sendsms = async (totalamount, ReceiptNo) => {
    try {
      axios.defaults.headers.post[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;
      const res = await axios.post(`${backendApiUrl}user/sms`, {
        mobile: mobileNo,
        amount: totalamount,
        rno: ReceiptNo,
      });
    } catch (error) { }
  };

  // const getall_donatiions = () => {
  //   try {
  //     Promise.all([
  //       serverInstance('admin/donation-type?type=1', 'get'),
  //       serverInstance('admin/voucher-get', 'get'),
  //     ]).then(([res, item]) => {
  //       if (res.status) {
  //         setDonationTypes(res.data);
  //       } else {
  //         Swal.fire('Error', 'somthing went  wrong', 'error');
  //       }
  //       // if (item.status) {
  //       //   setReceiptNo(item.voucher);
  //       // }
  //     });
  //   } catch (error) {
  //     Swal.fire('Error!', error, 'error');
  //   }

  //   serverInstance('admin/voucher-get', 'get').then((res) => {
  //     if (res.status) {
  //     } else {
  //       Swal('Error', 'somthing went  wrong', 'error');
  //     }
  //   });
  // };
  const hasHindiCharacters = (str) => {
    return (
      str.split('').filter(function (char) {
        var charCode = char.charCodeAt();
        return charCode >= 2309 && charCode <= 2361;
      }).length > 0
    );
  };

  useEffect(() => {
    // getall_donatiions();
    if (updateData) {
      setAddress(updateData?.address);
      setFullName(updateData?.name);
      setMobileNo(updateData?.phoneNo);
      setDonationItems(updateData?.elecItemDetails);
      setDonationTime(updateData?.donation_time);
      var today = new Date(updateData?.donation_date);
      var date = today.toISOString().substring(0, 10);

      setDonationDate(date);
    }
    setrole(Number(sessionStorage.getItem('userrole')));
  }, []);

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <form onSubmit={addCashDonation}>
          <Typography variant="h6" color={'primary'} align="center">
            Main Details
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
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              my: 2,
            }}
          >
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
          </Box>

          <Grid container rowSpacing={2} columnSpacing={5}>

            <Grid item xs={12} md={4}>
              {!newMember ? (
                <>
                  Full Name
                  <ReactTransliterate
                    style={custumstyle}
                    id="full-name"
                    required
                    value={fullName}
                    onChangeText={(fullName) => {
                      setFullName(fullName);
                    }}
                    onChange={(e) => setFullName(e.target.value)}
                    a lang="hi"
                  />
                </>
              ) : (
                <>
                  Full Name
                  <CustomInput
                    id="full-name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </>
              )}
            </Grid>

            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="sadasyaType">
                Sadsya Type
              </CustomInputLabel>

              <Select
                required
                sx={{
                  width: '100%',
                  height: '60%',
                  borderRadius: '1rem',
                  fontSize: 14,
                  '& .MuiSelect-select': {
                    padding: '1px',
                  },
                }}
              // value={genderp1}
              // onChange={(e) => setgenderp1(e.target.value)}
              >
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={'Adhyaksh'}
                >

                </MenuItem>
                {sadsyaOptions.map((item, idx) => {
                  return (
                    <MenuItem
                      sx={{
                        fontSize: 14,
                      }}
                      key={item.id}
                      value={item.sadsya}
                    >
                      {item.sadsya}
                    </MenuItem>
                  );
                })}
              </Select>

              {/* <CustomInput
                id="mobile-no"
                value={sadsyaType}
                onChange={(e) => {
                  setSadsyaType(e.target.value);
                }}
              /> */}
            </Grid>

            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="relationship">
                Relationship
              </CustomInputLabel>
              <Select
                required
                sx={{
                  width: '100%',
                  height: '60%',
                  borderRadius: '1rem',
                  fontSize: 14,
                  '& .MuiSelect-select': {
                    padding: '1px',
                  },
                }}
              // value={genderp1}
              // onChange={(e) => setgenderp1(e.target.value)}
              >
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={'Father'}
                >
                  Father
                </MenuItem>
                {relationshipOptions.map((item, idx) => {
                  return (
                    <MenuItem
                      sx={{
                        fontSize: 14,
                      }}
                      key={item.id}
                      value={item.relation}
                    >
                      {item.relation}
                    </MenuItem>
                  );
                })}
              </Select>
              {/* <CustomInput
                id="mobile-no"
                value={relationship}
                onChange={(e) => {
                  setRelationship(e.target.value);
                }}
              /> */}
            </Grid>

            <Grid item xs={12} md={2}>
              <CustomInputLabel htmlFor="phoneNo">
                Phone Number
              </CustomInputLabel>
              <CustomInput
                id="mobile-no"
                value={mobileNo}
                onChange={(e) => {
                  setMobileNo(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <CustomInputLabel htmlFor="email">
                Email
              </CustomInputLabel>
              <CustomInput
                id="mobile-no"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Grid>


            <Grid item xs={12} md={6}>
              <CustomInputLabel required htmlFor="address">
                Address
              </CustomInputLabel>

              {!newMember ? (
                <>
                  <ReactTransliterate
                    style={custumstyle}
                    required
                    id="address"
                    value={address}
                    onChangeText={(address) => {
                      setAddress(address);
                    }}
                    onChange={(e) => setAddress(e.target.value)}
                    lang="hi"
                  />
                </>
              ) : (
                <>
                  <CustomInput
                    required
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </>
              )}


            </Grid>
            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="donation-date">Date Of Birth</CustomInputLabel>
              <CustomInput
                disabled={role === 3 ? true : false}
                type="date"
                id="donation-date"
                value={DOB}
                onChange={(event) => {
                  setDOB(
                    new Date(event.target.value).toISOString().substring(0, 10),
                  );
                }}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="donation-date">Date Of Anniversary</CustomInputLabel>
              <CustomInput
                disabled={role === 3 ? true : false}
                type="date"
                id="donation-date"
                value={DOA}
                onChange={(event) => {
                  setDOA(
                    new Date(event.target.value).toISOString().substring(0, 10),
                  );
                }}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="donation-date">From Date</CustomInputLabel>
              <CustomInput
                disabled={role === 3 ? true : false}
                type="date"
                id="donation-date"
                value={fromDate}
                onChange={(event) => {
                  setFromDate(
                    new Date(event.target.value).toISOString().substring(0, 10),
                  );
                }}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="donation-date">To Date</CustomInputLabel>
              <CustomInput
                disabled={role === 3 ? true : false}
                type="date"
                id="donation-date"
                value={toDate}
                onChange={(event) => {
                  setToDate(
                    new Date(event.target.value).toISOString().substring(0, 10),
                  );
                }}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="relationship">
                Status
              </CustomInputLabel>
              <CustomInput
                id="mobile-no"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              />
            </Grid>
          </Grid>


          <TableContainer
            sx={{
              mt: 4,
            }}
          >

            <Box
              sx={{
                paddingInline: '10px',
                minWidth: 200,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Add Family Members

              <IconButton aria-label="add" size="small">
                <AddBoxIcon color="primary" onClick={addDonationItem} />
              </IconButton>
            </Box>


            <Table
              stickyHeader
              sx={{
                border: '1px solid #C4C4C4',
                '& th': {
                  padding: 0,
                  fontSize: 14,
                  fontWeight: 500,
                  backgroundColor: '#E4E3E3',
                  color: '#05313C',
                  outline: '1px solid #C4C4C4',
                },
                '& td': {
                  padding: 0,
                  fontSize: 14,
                },
              }}
              aria-label="customized table"
            >

              <TableHead>
                <TableRow>
                  <TableCell style={{ width: '15%' }}>
                    <Box
                      sx={{
                        paddingInline: '10px',
                        minWidth: 200,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      Full Name

                    </Box>
                  </TableCell>

                  <TableCell style={{ width: '10%' }} align="center">Mobile No</TableCell>
                  <TableCell style={{ width: '10%' }} align="center">Email</TableCell>
                  <TableCell align="center">Date Of Birth</TableCell>
                  <TableCell align="center">Date Of Anniversary</TableCell>
                  <TableCell style={{ width: '10%' }} align="center">Sadasya Type</TableCell>
                  <TableCell align="center">Relationship</TableCell>
                  <TableCell align="center">Address</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {donationItems.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell
                      style={{
                        paddingInline: 0,
                      }}
                    >
                      <CustomTableInput
                        required
                        type="text"
                        // value={item.amount}
                        onChange={(e) =>
                          handleDonationItemUpdate(
                            item,
                            'amount',
                            e.target.value,
                          )
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      <CustomTableInput
                        required
                        type="text"
                        // value={item.amount}
                        onChange={(e) =>
                          handleDonationItemUpdate(
                            item,
                            'amount',
                            e.target.value,
                          )
                        }
                      />
                    </TableCell>

                    <TableCell>
                      <CustomTableInput
                        required
                        type="text"
                        // value={item.amount}
                        onChange={(e) =>
                          handleDonationItemUpdate(
                            item,
                            'amount',
                            e.target.value,
                          )
                        }
                      />
                    </TableCell>


                    <TableCell>
                      <CustomTableInput
                        required
                        type="date"
                        // value={item.amount}
                        onChange={(e) =>
                          handleDonationItemUpdate(
                            item,
                            'amount',
                            e.target.value,
                          )
                        }
                      />
                    </TableCell>

                    <TableCell>
                      <CustomTableInput
                        required
                        type="date"
                        // value={item.amount}
                        onChange={(e) =>
                          handleDonationItemUpdate(
                            item,
                            'amount',
                            e.target.value,
                          )
                        }
                      />
                    </TableCell>

                    <TableCell>
                      <Select
                        required
                        sx={{
                          width: '100%',
                          
                          borderRadius: '1rem',
                          fontSize: 14,
                          '& .MuiSelect-select': {
                            padding: '1px',
                          },
                        }}
                      // value={genderp1}
                      // onChange={(e) => setgenderp1(e.target.value)}
                      >
                        <MenuItem
                          sx={{
                            fontSize: 14,

                          }}
                          value={'Adhyaksh'}
                        >

                        </MenuItem>
                        {sadsyaOptions.map((item, idx) => {
                          return (
                            <MenuItem
                              sx={{
                                fontSize: 14,
                              }}
                              key={item.id}
                              value={item.sadsya}
                            >
                              {item.sadsya}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </TableCell>

                    <TableCell>
                      <Select
                        required
                        sx={{
                          width: '100%',
                          height: '60%',
                          borderRadius: '1rem',
                          fontSize: 14,
                          '& .MuiSelect-select': {
                            padding: '1px',
                          },
                        }}
                      // value={genderp1}
                      // onChange={(e) => setgenderp1(e.target.value)}
                      >
                        <MenuItem
                          sx={{
                            fontSize: 14,
                          }}
                          value={'Father'}
                        >
                          Father
                        </MenuItem>
                        {relationshipOptions.map((item, idx) => {
                          return (
                            <MenuItem
                              sx={{
                                fontSize: 14,
                              }}
                              key={item.id}
                              value={item.relation}
                            >
                              {item.relation}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </TableCell>

                    <TableCell>
                      <CustomTableInput
                        required
                        type="text"
                        // value={item.amount}
                        onChange={(e) =>
                          handleDonationItemUpdate(
                            item,
                            'amount',
                            e.target.value,
                          )
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}


                {/* <TotalAmountRow donationItems={donationItems} /> */}
              </TableBody>
            </Table>
          </TableContainer>

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
                  'Save'
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
  );
};
export default UDListItem;
