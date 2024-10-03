// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { backendApiUrl } from '../../../../../config/config';
import { serverInstance } from '../../../../../API/ServerInstance';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
import { ReactTransliterate } from 'react-transliterate';
import CircularProgress from '@material-ui/core/CircularProgress';
import Moment from 'moment-js';
import { Tooltip } from '@mui/material';
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
const ChequeDonation = ({
  setshowalert,
  handleClose,
  themeColor,
  updateData,
  showUpdateBtn,
  setopendashboard,
  bolidatasss
  // donationTypes,
}) => {
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
  const navigation = useNavigate();
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const [receipterror, setreceipterror] = useState('');
  const [hindiremark, sethindiremark] = useState('');
  const [donationTypes, setDonationTypes] = useState([]);
  const [receiptNo, setReceiptNo] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [fetchuserdetail, setfetchuserdetail] = useState(true);
  const [newMember, setNewMember] = useState(false);
  const [mobileNo, setMobileNo] = useState('');
  const [countryCode, setCountryCode] = useState('+91'); // Default country code
  const [isCustomCode, setIsCustomCode] = useState(false); // Track if custom code is selected
  const [customCode, setCustomCode] = useState(''); // Custom country code input

  const handleCountryCodeChange = (event) => {
    const value = event.target.value;
    if (value === 'custom') {
      setIsCustomCode(true); // Enable custom input field
    } else {
      setIsCustomCode(false);
      setCountryCode(value);
    }
  };

  const handleCustomCodeChange = (event) => {
    setCustomCode(event.target.value);
  };  const [genderp, setgenderp] = useState('श्री');
  const [genderp1, setgenderp1] = useState('SHRI');
  const [showloader, setshowloader] = useState(false);
  const [donationItems, setDonationItems] = useState([
    {
      type: '',
      amount: '',
      remark: '',
      ChequeNo: '',
      BankName: '',
      ChequeDate: '',
    },
  ]);
  const genderoptiins = [
    {
      id: 2,
      gender: 'श्रीमति',
    },
    {
      id: 3,
      gender: 'मे.',
    },
    {
      id: 4,
      gender: 'कु.',
    },
  ];
  const genderoptiins1 = [
    {
      id: 2,
      gender: 'SMT',
    },
    {
      id: 3,
      gender: 'M/s',
    },
  ];
  function addDonationItem() {
    setDonationItems([
      ...donationItems,
      {
        type: '',
        amount: '',
        remark: '',
        ChequeNo: '',
        BankName: '',
        ChequeDate: '',
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
  const getDonatedUserDetails = () => {
    serverInstance(
      `admin/getuser-by-num-manual?mobile=${mobileNo}`,
      'get',
    ).then((res) => {
      if (res.status) {
        setFullName(res.data.name);
        setAddress(res.data.address);
        setgenderp(res.data.gender);
      }
    });
  };

  if (mobileNo.length === 10 && fetchuserdetail === true) {
    getDonatedUserDetails();
    setfetchuserdetail(false);
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
  var date = Moment(today).format('YYYY-MM-DD');
  const [donationDate, setDonationDate] = useState(date);

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

  const [amountError, setAmountError] = useState('');
  const [donationTypeError, setDonationTypeError] = useState('');
  const [numberError, setNumberError] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [bankError, setBankError] = useState('');
  const [chequeError, setChequeError] = useState('');


  const addChequeDonation = async () => {
    try {
      setSaveButtonDisabled(true);
      setshowloader(true);
      axios.defaults.headers.post[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;

      if (!mobileNo) {
        setNumberError("Number is required");
        setSaveButtonDisabled(false);
        setshowloader(false);
        return;
      } else if (countryCode === '+91' && mobileNo.length < 10) {
        setNumberError("Number must be at least 10 digits for India");
        setSaveButtonDisabled(false);
        setShowLoader(false);
        return;
      } else {
        setNumberError('');
      }

      if (!fullName) {
        setFullNameError("FullName is required");
        setSaveButtonDisabled(false);
        setshowloader(false);
        return;
      } else {
        setFullNameError('');
      }

      if (!address) {
        setAddressError("Address is required");
        setSaveButtonDisabled(false);
        setshowloader(false);
        return;
      } else {
        setAddressError('');
      }
      if (!donationItems[0].type) {
        setDonationTypeError("Donation Type is required");
        setSaveButtonDisabled(false);
        setshowloader(false);
        return;
      } else {
        setDonationTypeError('');
      }
      
      if (!donationItems[0].amount || donationItems[0].amount <= 0) {
        setAmountError('Amount is required and must be greater than 0');
        setSaveButtonDisabled(false);
        setshowloader(false);
        return;
      } else {
        setAmountError(''); // Clear the error if validation passes
      }
      
      if (!donationItems[0].ChequeNo) {
        setChequeError("Check Number is required");
        setSaveButtonDisabled(false);
        setshowloader(false);
        return;
      } else {
        setChequeError('');
      }
      
      if (!donationItems[0].BankName) {
        setBankError("bank name is required");
        setSaveButtonDisabled(false);
        setshowloader(false);
        return;
      } else {
        setBankError('');
      }

      // e.preventDefault();

      if (
        fullName &&
        donationItems[0].amount &&
        donationItems[0].type &&
        mobileNo
      ) {
        const res = await axios.post(`${backendApiUrl}admin/manual-donation`, {
          name: fullName,
          gender: newMember ? genderp1 : genderp,
          phoneNo: `${isCustomCode ? customCode : countryCode}${mobileNo}`, // Use customCode if custom is selected
          address: address,
          ReceiptNo: receiptNo,
          new_member: newMember,
          LedgerNo: bolidatasss?.LedgerNo,
          modeOfDonation: 3,
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
          setshowalert(true);
          setshowloader(false);
          handleClose();
          sendsms(totalamount, res.data.data.data.ReceiptNo);
          navigation('/admin-panel/OnlyAddManulReceipt', {
            state: {
              userdata: res.data.data.data,
            },
          });
        } else {
          handleClose();
          setshowloader(false);
          Swal.fire('Error!', 'Somthing went wrong!!', 'error');
        }
      }

      setTimeout(() => {
        
        setSaveButtonDisabled(false);
      }, 5000);

    } catch (error) {
      console.log(error.response.data.message);
      setreceipterror(error.response.data.message);
      setshowloader(false);
    }
  };

  const getall_donatiions = () => {
    serverInstance('admin/donation-type?type=1', 'get').then((res) => {
      if (res.status) {
        setDonationTypes(res.data);
      } else {
        Swal.fire('Error', 'somthing went  wrong', 'error');
      }
    });
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
    } catch (error) {}
  };
  useEffect(() => {
    getall_donatiions();
    if (updateData) {
      setAddress(updateData?.address);
      setFullName(updateData?.name);
      setMobileNo(updateData?.phoneNo);
      setDonationItems(updateData?.elecItemDetails);
    }
    setopendashboard(true);
  }, []);

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <div>
          <Typography variant="h6" color={'primary'} align="center">
            {showUpdateBtn
              ? 'Upadte Manual Cheque Donation'
              : 'Add Manual Cheque Donation'}
          </Typography>
          <Typography variant="body2" color="primary" align="right">
            {currDate} / {currTime}
          </Typography>
          {bolidatasss?.LedgerNo ? (
            <>
              <Typography variant="body2" color="primary" align="right">
                {bolidatasss?.LedgerNo}
              </Typography>
            </>
          ) : (
            <></>
          )}
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
            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="receiptNoo">
                Receipt No
              </CustomInputLabel>
              <CustomInput
                required
                type="text"
                id="receiptNoo"
                value={receiptNo}
                onChange={(event) => {
                  setReceiptNo(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="receiptNo">&nbsp;</CustomInputLabel>
              <Typography variant="body2" style={{ color: 'red' }} align="left">
                {receipterror && receipterror}
              </Typography>
            </Grid>
          </Grid>
          <Grid container rowSpacing={2} columnSpacing={5}>
            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="donation-date">Date</CustomInputLabel>
              <CustomInput
                type="date"
                id="donation-date"
                value={donationDate}
                onChange={(event) => {
                  setDonationDate(
                    new Date(event.target.value).toISOString().substring(0, 10),
                  );
                }}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="donation-time">Time</CustomInputLabel>
              <CustomInput
                type="time"
                id="donation-time"
                value={donationTime}
                onChange={(event) => {
                  setDonationTime(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={8} md={2}>
              <CustomInputLabel>Country Code</CustomInputLabel>
              {!isCustomCode ? (
                <Select
                  value={countryCode}
                  onChange={handleCountryCodeChange}
                  fullWidth
                  variant="outlined"
                  style={{ height: '36px' }}
                >
                  <MenuItem value="+1">+1 (USA)</MenuItem>
                  <MenuItem value="+91">+91 (India)</MenuItem>
                  <MenuItem value="+44">+44 (UK)</MenuItem>
                  <MenuItem value="+61">+61 (Australia)</MenuItem>
                  <MenuItem value="+81">+81 (Japan)</MenuItem>
                  <MenuItem value="+86">+86 (China)</MenuItem>
                  <MenuItem value="+49">+49 (Germany)</MenuItem>
                  <MenuItem value="+33">+33 (France)</MenuItem>
                  <MenuItem value="+39">+39 (Italy)</MenuItem>
                  <MenuItem value="+55">+55 (Brazil)</MenuItem>
                  <MenuItem value="+7">+7 (Russia)</MenuItem>
                  <MenuItem value="+27">+27 (South Africa)</MenuItem>
                  <MenuItem value="+34">+34 (Spain)</MenuItem>
                  <MenuItem value="+52">+52 (Mexico)</MenuItem>
                  <MenuItem value="+62">+62 (Indonesia)</MenuItem>
                  <MenuItem value="custom">Enter Custom Code</MenuItem>
                </Select>
              ) : (
                <CustomInput
                  value={customCode}
                  onChange={handleCustomCodeChange}
                  placeholder="Enter custom code"
                  fullWidth
                  variant="outlined"
                  style={{ height: '36px' }}
                />
              )}
            </Grid>
            
            <Grid item xs={12} md={4}>
              <CustomInputLabel required htmlFor="mobile-no">
                <Tooltip
                  title={numberError ? numberError : ''}
                  arrow
                  open={!!numberError} // Open only if there's an error
                  disableHoverListener={!numberError} // Disable hover when there's no error
                  placement="top" // Display the tooltip on the upper side
                >
                  <span>
                    Mobile Number
                  </span>
                </Tooltip>
                </CustomInputLabel>
              <CustomInput
           
                id="mobile-no"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
            <Tooltip
                title={fullNameError ? fullNameError : ''}
                arrow
                open={!!fullNameError} // Open only if there's an error
                disableHoverListener={!fullNameError} // Disable hover when there's no error
                placement="top" // Display the tooltip on the upper side
              >
                <CustomInputLabel required htmlFor="full-name">
                  {!newMember ? (
                    <>
                      <Select
                        required
                        sx={{
                          width: '20%',
                          fontSize: 14,
                          '& .MuiSelect-select': {
                            padding: '1px',
                          },
                        }}
                        value={genderp}
                        onChange={(e) => setgenderp(e.target.value)}
                      >
                        <MenuItem
                          sx={{
                            fontSize: 14,
                          }}
                          value={'श्री'}
                        >
                          श्री
                        </MenuItem>
                        {genderoptiins.map((item, idx) => {
                          return (
                            <MenuItem
                              sx={{
                                fontSize: 14,
                              }}
                              key={item.id}
                              value={item.gender}
                            >
                              {item.gender}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </>
                  ) : (
                    <>
                      <Select
                        required
                        sx={{
                          width: '20%',
                          fontSize: 14,
                          '& .MuiSelect-select': {
                            padding: '1px',
                          },
                        }}
                        value={genderp1}
                        onChange={(e) => setgenderp1(e.target.value)}
                      >
                        <MenuItem
                          sx={{
                            fontSize: 14,
                          }}
                          value={'SHRI'}
                        >
                          SHRI
                        </MenuItem>
                        {genderoptiins1.map((item, idx) => {
                          return (
                            <MenuItem
                              sx={{
                                fontSize: 14,
                              }}
                              key={item.id}
                              value={item.gender}
                            >
                              {item.gender}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </>
                  )}
                  Full Name

                </CustomInputLabel>
              </Tooltip>
              {!newMember ? (
                <>
                  <ReactTransliterate
                    style={custumstyle}
                    id="full-name"
                    required
                    value={fullName}
                    onChangeText={(fullName) => {
                      setFullName(fullName);
                    }}
                    onChange={(e) => setFullName(e.target.value)}
                    lang="hi"
                  />
                </>
              ) : (
                <>
                  <CustomInput
                    id="full-name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </>
              )}
            </Grid>

            <Grid item xs={12} md={6}>
            <Tooltip
                title={addressError ? addressError : ''}
                arrow
                open={!!addressError} // Open only if there's an error
                disableHoverListener={!addressError} // Disable hover when there's no error
                placement="top" // Display the tooltip on the upper side
              >
                <CustomInputLabel required htmlFor="address">
                  Address
                </CustomInputLabel>
              </Tooltip>

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
          </Grid>
          <TableContainer
            sx={{
              mt: 4,
            }}
          >
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
                  <TableCell>
                    <Box
                      sx={{
                        paddingInline: '10px',
                        minWidth: 200,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Tooltip
                        title={donationTypeError ? 'Type is required' : ''}
                        arrow
                        open={!!donationTypeError} // Open only if there's an error
                        disableHoverListener={!donationTypeError} // Disable hover when there's no error
                        placement="top" // Display the tooltip on the upper side
                      >
                        <span>Type of donation*</span>
                      </Tooltip>                      <IconButton aria-label="add" size="small">
                        <AddBoxIcon color="primary" onClick={addDonationItem} />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      minWidth: 100,
                    }}
                  >
                    <Tooltip
                      title={amountError ? 'Amount is required and must be greater than 0' : ''}
                      arrow
                      open={!!amountError} // Open only if there's an error
                      disableHoverListener={!amountError} // Disable hover when there's no error
                      placement="top" // Display the tooltip on the upper side
                    ><span>Amount*</span>
                    </Tooltip>
                    </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      minWidth: 100,
                    }}
                  >
<Tooltip
                      title={chequeError ? chequeError : ''}
                      arrow
                      open={!!chequeError} // Open only if there's an error
                      disableHoverListener={!chequeError} // Disable hover when there's no error
                      placement="top" // Display the tooltip on the upper side
                    ><span>Cheque No*</span>
                    </Tooltip>                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      minWidth: 100,
                    }}
                  >
<Tooltip
                      title={bankError ? bankError : ''}
                      arrow
                      open={!!bankError} // Open only if there's an error
                      disableHoverListener={!bankError} // Disable hover when there's no error
                      placement="top" // Display the tooltip on the upper side
                    ><span>Bank Name*</span>
                    </Tooltip>   
                    </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      minWidth: 100,
                    }}
                  >
                    Cheque Date*
                  </TableCell>
                  <TableCell
                    sx={{
                      minWidth: 100,
                    }}
                    align="center"
                  >
                    Remark
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {donationItems.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell
                      style={{
                        paddingInline: 8,
                      }}
                    >
                      <Select
                        required
                        sx={{
                          width: '100%',
                          fontSize: 14,
                          '& .MuiSelect-select': {
                            padding: '1px',
                          },
                        }}
                        value={item.type}
                        onChange={(e) =>
                          handleDonationItemUpdate(item, 'type', e.target.value)
                        }
                        displayEmpty
                      >
                        <MenuItem
                          sx={{
                            fontSize: 14,
                          }}
                          value={''}
                        >
                          Please select
                        </MenuItem>
                        {donationTypes.map((item, idx) => {
                          return (
                            <MenuItem
                              sx={{
                                fontSize: 14,
                              }}
                              key={item.id}
                              value={item.type_hi}
                            >
                              {item.type_hi}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </TableCell>
                    <TableCell align="center">
                      <CustomTableInput
                        required
                        type="number"
                        value={item.amount}
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
                        value={item.ChequeNo}
                        onChange={(e) =>
                          handleDonationItemUpdate(
                            item,
                            'ChequeNo',
                            e.target.value,
                          )
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      <CustomTableInput
                        required
                        value={item.BankName}
                        onChange={(e) =>
                          handleDonationItemUpdate(
                            item,
                            'BankName',
                            e.target.value,
                          )
                        }
                      />
                    </TableCell>

                    <TableCell align="center">
                      <CustomTableInput
                        required
                        value={item.ChequeDate}
                        onChange={(e) =>
                          handleDonationItemUpdate(
                            item,
                            'ChequeDate',
                            e.target.value,
                          )
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      {!newMember ? (
                        <>
                          <div className="centerMain_remove_item">
                            <ReactTransliterate
                              style={custommStyleInputTable}
                              required
                              value={item.remark}
                              onChangeText={(hindiremark) => {
                                sethindiremark(hindiremark);
                              }}
                              onChange={(e) =>
                                handleDonationItemUpdate(
                                  item,
                                  'remark',
                                  e.target.value,
                                )
                              }
                              lang="hi"
                            />
                            <div className="centerMain_remove_item_overLay">
                              {idx > 0 && (
                                <IconButton
                                  sx={{
                                    padding: '4px',
                                  }}
                                  onClick={() => removeDonationItem(item)}
                                >
                                  <RemoveCircleOutlineIcon
                                    color="primary"
                                    fontSize="small"
                                  />
                                </IconButton>
                              )}
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <CustomTableInput
                            value={item.remark}
                            onChange={(e) =>
                              handleDonationItemUpdate(
                                item,
                                'remark',
                                e.target.value,
                              )
                            }
                            endAdornment={
                              idx > 0 && (
                                <InputAdornment position="start">
                                  <IconButton
                                    sx={{
                                      padding: '4px',
                                    }}
                                    onClick={() => removeDonationItem(item)}
                                  >
                                    <RemoveCircleOutlineIcon
                                      color="primary"
                                      fontSize="small"
                                    />
                                  </IconButton>
                                </InputAdornment>
                              )
                            }
                          />
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                <TotalAmountRow donationItems={donationItems} />
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
                onClick={()=>addChequeDonation()}
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
                disabled={saveButtonDisabled} 
                onClick={()=>addChequeDonation()}
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
        </div>
      </ThemeProvider>
    </Box>
  );
};
export default ChequeDonation;
