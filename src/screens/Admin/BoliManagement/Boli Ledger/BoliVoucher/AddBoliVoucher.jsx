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
import Swal from 'sweetalert2';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  CustomInput,
  CustomInputLabel,
  CustomTableInput,
} from '../../../Donation/Donation/common';
import TotalAmountRow from '../../../Donation/Donation/common/TotalAmountRow';
import TotalpayAmountRow from './TotalpayAmountRow';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { ReactTransliterate } from 'react-transliterate';
import CircularProgress from '@material-ui/core/CircularProgress';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
const paymode = [
  {
    id: 1,
    type: 'online',
  },
  {
    id: 2,
    type: 'offline',
  },
];
const Addboli = ({
  handleClose,
  themeColor,
  updateData,
  showUpdateBtn,
  receiptNo,
  donationTypes,
}) => {
  const navigation = useNavigate();
  const { t, i18n } = useTranslation();
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
  const [fullName, setFullName] = useState('');
  const [ledgerno, setledgerno] = useState('');
  const [city, setcity] = useState('');
  const [pincode, setpincode] = useState('');
  const [states, setstates] = useState('');
  const [country, setcountry] = useState('');
  const [email, setemail] = useState('');
  const [boliamount, setboliamount] = useState('');
  const [address, setAddress] = useState('');
  const [newMember, setNewMember] = useState(false);
  const [mobileNo, setMobileNo] = useState('');
  const [phonono, setphonono] = useState('');
  const [genderp, setgenderp] = useState('');
  const [genderp1, setgenderp1] = useState('');
  const [fetchuserdetail, setfetchuserdetail] = useState(true);
  const [showloader, setshowloader] = useState(false);
  const [fatherName, setFatherName] = useState('');

  const [ledgerData, setLedgerData] = useState('')

  const [donationItems, setDonationItems] = useState([
    {
      Type: '',
      BoliAmount: '',
      Remark: '',
    },
  ]);

  console.log('from cash ', donationItems, receiptNo);
  function addDonationItem() {
    setDonationItems([
      ...donationItems,
      {
        Type: '',
        BoliAmount: '',
        Remark: '',
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

  const getBoliLedger = async () => {
    try {
      const res = await serverInstance('boli/get-boliLedger', 'get');
      console.log('BL', res.data)
      setLedgerData(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleLedger = (ledger) => {
    const existingLedger = ledgerData.find(item => item.LedgerNo === ledger);

    if (existingLedger) {

      setphonono(existingLedger.MobileNo);
      console.log('phone', existingLedger.MobileNo);
    }
  };



  const addCashDonation = async (e) => {
    setshowloader(true);
    try {
      const data = {
        Date: donationDate,
        Time: donationTime,
        LedgerNo: ledgerno,
        MobileNo: phonono,
        Name: fullName,
        FatherName: fatherName,
        Address: address,
        City: city,
        PinCode: pincode,
        State: states,
        Country: country,
        Email: email,
        BoliAmount: donationItems?.reduce(
          (n, { BoliAmount }) => parseFloat(n) + parseFloat(BoliAmount),
          0,
        )
          ? donationItems?.reduce(
            (n, { BoliAmount }) => parseFloat(n) + parseFloat(BoliAmount),
            0,
          )
          : '',
        boliVoucherList: donationItems,
      };
      serverInstance('boli/add-boliVoucher', 'post', data).then((res) => {
        if (res?.status) {
          handleClose();
          setshowloader(false);
          Swal.fire('Great!', res?.msg, 'success');
        }
        if (res?.status === false) {
          handleClose();
          setshowloader(false);
          Swal.fire('Great!', res?.msg, 'success');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // getall_donatiions();
    getBoliLedger()
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
        <div>
          <Typography variant="h6" color={'#7037ad'} align="center">
            {showUpdateBtn ? 'Update Boli Voucher' : 'Add Boli Voucher'}
          </Typography>
          <Typography variant="body2" color="#7037ad" align="right">
            {currDate} / {currTime}
          </Typography>

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
              English
            </Button>
          </Box>
          <Grid container rowSpacing={2} columnSpacing={5}>
            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="donation-date">Date</CustomInputLabel>
              <CustomInput
                disabled={role === 3 ? true : false}
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
                disabled={role === 3 ? true : false}
                type="time"
                id="donation-time"
                value={donationTime}
                onChange={(event) => {
                  setDonationTime(event.target.value);
                }}
              />
            </Grid>

            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="ledger">Ledger No.</CustomInputLabel>
              <CustomInput
                disabled={role === 3 ? true : false}
                type="text"
                id="donation-date"
                required
                placeholder="Enter Ledger No."
                name="ledgerno"
                value={ledgerno}
                onChange={(e) => {
                  handleLedger(e.target.value);
                  setledgerno(e.target.value)
                }
                }
              />

            </Grid>

            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="mobile">Mobile No</CustomInputLabel>
              <CustomInput
                type="text"
                id="mobile"
                required
                placeholder="Enter Mobile No"
                name="phonono"
                value={phonono}
                onChange={(e) => setphonono(e.target.value)}
              />
            </Grid>

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
                    lang="hi"
                    placeholder="Enter Name"
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
                    placeholder="Enter Name"
                  />
                </>
              )}
            </Grid>

            <Grid item xs={12} md={4}>
              {!newMember ? (
                <>
                  Father's Name
                  <ReactTransliterate
                    style={custumstyle}
                    id="father-name"
                    required
                    value={fatherName}
                    onChangeText={(fatherName) => {
                      setFatherName(fatherName);
                    }}
                    onChange={(e) => setFatherName(e.target.value)}
                    lang="hi"
                    placeholder="Enter Father Name"
                  />
                </>
              ) : (
                <>
                  Father's Name
                  <CustomInput
                    id="father-name"
                    required
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                    placeholder="Enter Father Name"
                  />
                </>
              )}
            </Grid>

            <Grid item xs={12} md={4}>
              {!newMember ? (
                <>
                  Address
                  <ReactTransliterate
                    style={custumstyle}
                    id="full-name"
                    required
                    value={address}
                    onChangeText={(address) => {
                      setAddress(address);
                    }}
                    onChange={(e) => setAddress(e.target.value)}
                    lang="hi"
                    placeholder="Enter Address"
                  />
                </>
              ) : (
                <>
                  Address
                  <CustomInput
                    id="full-name"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter Address"
                  />
                </>
              )}
            </Grid>

            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="city">City</CustomInputLabel>
              <CustomInput
                required
                type="text"
                placeholder="Enter City"
                name="city"
                value={city}
                onChange={(e) => setcity(e.target.value)}
              />
            </Grid>

            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="Pincode">Pincode</CustomInputLabel>
              <CustomInput
                type="text"
                placeholder="Enter Pincode"
                name="pincode"
                value={pincode}
                onChange={(e) => setpincode(e.target.value)}
              />
            </Grid>

            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="State">State</CustomInputLabel>
              <CustomInput
                type="text"
                placeholder="Enter State"
                name="states"
                value={states}
                onChange={(e) => setstates(e.target.value)}
              />
            </Grid>

            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="country">Country</CustomInputLabel>
              <CustomInput
                type="text"
                placeholder="Enter Country"
                name="country"
                value={country}
                onChange={(e) => setcountry(e.target.value)}
              />
            </Grid>

            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="donation-date">Email</CustomInputLabel>
              <CustomInput
                disabled={role === 3 ? true : false}
                type="text"
                id="donation-date"
                placeholder="Enter Email"
                name="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomInputLabel required htmlFor="address">
                Boli Amount
              </CustomInputLabel>

              <CustomInput
                required
                disabled={true}
                id="address"
                value={
                  donationItems?.reduce(
                    (n, { BoliAmount }) =>
                      parseFloat(n) + parseFloat(BoliAmount),
                    0,
                  )
                    ? donationItems?.reduce(
                      (n, { BoliAmount }) =>
                        parseFloat(n) + parseFloat(BoliAmount),
                      0,
                    )
                    : ''
                }
                onChange={(e) => setboliamount(e.target.value)}
                placeholder="Enter Initail Amount"
              />
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
                  <TableCell style={{ width: '20%' }}>
                    <Box
                      sx={{
                        paddingInline: '10px',
                        minWidth: 200,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      Boli Head*
                      <IconButton aria-label="add" size="small">
                        <AddBoxIcon color="primary" onClick={addDonationItem} />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell align="center">Boli Amount*</TableCell>

                  <TableCell align="center">Remark</TableCell>
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
                        value={item.Type}
                        onChange={(e) =>
                          handleDonationItemUpdate(item, 'Type', e.target.value)
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
                        {donationTypes &&
                          donationTypes.map((item, idx) => {
                            return (
                              <MenuItem
                                sx={{
                                  fontSize: 14,
                                }}
                                key={item.id}
                                value={item?.boliHead_hi}
                              >
                                {item?.boliHead_hi}
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </TableCell>

                    <TableCell align="center">
                      <CustomTableInput
                        required
                        type="number"
                        value={item.BoliAmount}
                        onChange={(e) =>
                          handleDonationItemUpdate(
                            item,
                            'BoliAmount',
                            e.target.value,
                          )
                        }
                      />
                    </TableCell>

                    <TableCell align="center">
                      {!newMember ? (
                        <>
                          {showUpdateBtn ? (
                            <>
                              <div
                                className="centerMain_remove_item"
                                style={{ width: '35%' }}
                              >
                                <ReactTransliterate
                                  style={custommStyleInputTable}
                                  value={item.Remark}
                                  onChangeText={(item) => {
                                    handleDonationItemUpdate(
                                      item,
                                      'Remark',
                                      e.target.value,
                                    );
                                  }}
                                  onChange={(e) =>
                                    handleDonationItemUpdate(
                                      item,
                                      'Remark',
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
                              <div className="centerMain_remove_item">
                                <ReactTransliterate
                                  style={custommStyleInputTable}
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
                          )}
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
            <Button
              sx={{
                textTransform: 'none',
                paddingX: 5,
                boxShadow: 'none',
                backgroundColor: '#7037ad',
              }}
              variant="contained"
              type="button"
              onClick={() => addCashDonation()}
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
export default Addboli;
