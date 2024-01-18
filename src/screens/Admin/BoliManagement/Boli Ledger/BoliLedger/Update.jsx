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
const Update = ({
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
  const [city, setcity] = useState('');
  const [states, setstates] = useState('');
  const [pincode, setpincode] = useState('');
  const [country, setcountry] = useState('');
  const [groupname, setgroupname] = useState('');
  const [addharno, setaddharno] = useState('');
  const [pancardno, setpancardno] = useState('');
  const [email, setemail] = useState('');
  const [openingbalance, setopeningbalance] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [newMember, setNewMember] = useState(false);
  const [mobileNo, setMobileNo] = useState('');
  const [genderp, setgenderp] = useState('');
  const [genderp1, setgenderp1] = useState('');
  const [fetchuserdetail, setfetchuserdetail] = useState(true);
  const [showloader, setshowloader] = useState(false);
  const [fatherName, setFatherName] = useState('');
  const [donationItems, setDonationItems] = useState([
    {
      type: '',
      amount: '',
      payamount: '',
      remark: '',
      pmode: '',
    },
  ]);

  console.log('from cash ', donationItems, receiptNo);
  function addDonationItem() {
    setDonationItems([
      ...donationItems,
      {
        type: '',
        amount: '',
        payamount: '',
        remark: '',
        pmode: '',
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

  const addCashDonation = async () => {
    console.log('click');
    setshowloader(true);
    try {
      const data = {
        id: updateData?.id,
        MobileNo: mobileNo,
        Name: fullName,
        FatherName: fatherName,
        Address: address,
        City: city,
        PinCode: pincode,
        State: states,
        Country: country,
        Email: email,
        AadharNo: addharno,
        PanNo: pancardno,
        OpeningBalance: openingbalance,
      };
      serverInstance('boli/edit-boliLedger', 'put', data).then((res) => {
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

  const hasHindiCharacters = (str) => {
    return (
      str.split('').filter(function (char) {
        var charCode = char.charCodeAt();
        return charCode >= 2309 && charCode <= 2361;
      }).length > 0
    );
  };

  const [grouplist, setgrouplist] = useState('');
  const getboligroup = () => {
    serverInstance('boli/get-boliGroup', 'get').then((res) => {
      if (res.status) {
        setgrouplist(res?.data);
      }
    });
  };
  useEffect(() => {
    getboligroup();
    if (updateData) {
      setMobileNo(updateData?.MobileNo);
      setFullName(updateData?.Name);
      setFatherName(updateData?.FatherName);
      setAddress(updateData?.Address);
      setcity(updateData?.City);
      setstates(updateData?.State);
      setcountry(updateData?.Country);
      setemail(updateData?.Email);
      setaddharno(updateData?.AadharNo);
      setpancardno(updateData?.PanNo);
      setopeningbalance(updateData?.OpeningBalance);
      setpincode(updateData?.PinCode);

    }

    setrole(Number(sessionStorage.getItem('userrole')));
  }, []);

  console.log('data from boli ledger', updateData);

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <div>
          <Typography variant="h6" color={'#7037ad'} align="center">
            Update Boli Ledger
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
              <CustomInputLabel htmlFor="groupName">
                Group Name
              </CustomInputLabel>
              <Select
                required
                sx={{
                  width: '18vw',
                  height: '2.2rem',
                  borderRadius: '0.5rem',
                  fontSize: 14,
                  '& .MuiSelect-select': {
                    padding: '1px',
                  },
                }}
                value={groupname}
                onChange={(e) => setgroupname(e.target.value)}
                displayEmpty
              >
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={''}
                >
                  Please Select
                </MenuItem>
                {grouplist &&
                  grouplist?.map((item, idx) => {
                    return (
                      <MenuItem
                        sx={{
                          fontSize: 14,
                        }}
                        key={item.id}
                        value={item}
                        onClick={() => {
                          setcity(item?.City);
                          setpincode(item?.PinCode);
                          setstates(item?.State);
                          setcountry(item?.Country);
                        }}
                      >
                        {item?.City}
                      </MenuItem>
                    );
                  })}
              </Select>
            </Grid>

            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="mobileNo">Mobile No</CustomInputLabel>
              <CustomInput
                disabled={role === 3 ? true : false}
                type="text"
                placeholder="Enter Mobile No"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
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

            <Grid item xs={12} md={6}>
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
              <CustomInputLabel htmlFor="pincode">Pincode</CustomInputLabel>
              <CustomInput
                type="text"
                id="PAN"
                required
                placeholder="Enter Pincode"
                onChange={(e) => setpincode(e.target.value)}
                value={pincode}
              />
            </Grid>

            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="State">State</CustomInputLabel>
              <CustomInput
                disabled={role === 3 ? true : false}
                type="text"
                id="donation-date"
                required
                placeholder="Enter State"
                onChange={(e) => setstates(e.target.value)}
                value={states}
              />
            </Grid>

            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="Country">Country</CustomInputLabel>
              <CustomInput
                disabled={role === 3 ? true : false}
                type="text"
                id="donation-date"
                required
                placeholder="Enter Country"
                onChange={(e) => setcountry(e.target.value)}
                value={country}
              />
            </Grid>

            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="donation-date">Email</CustomInputLabel>
              <CustomInput
                disabled={role === 3 ? true : false}
                type="text"
                id="donation-date"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </Grid>

            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="donation-date">
                Aadhar No.
              </CustomInputLabel>
              <CustomInput
                type="text"
                placeholder="Enter Aadhar No."
                value={addharno}
                onChange={(e) => setaddharno(e.target.value)}
              />
            </Grid>

            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="donation-date">
                PAN No.
              </CustomInputLabel>
              <CustomInput
                type="text"
                id="PAN"
                placeholder="Enter PAN No."
                value={pancardno}
                onChange={(e) => setpancardno(e.target.value)}
              />
            </Grid>

            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="openingBalance">
                Opening Balance
              </CustomInputLabel>
              <CustomInput
                type="text"
                id="PAN"
                placeholder="Enter Opening Balance"
                value={openingbalance}
                onChange={(e) => setopeningbalance(e.target.value)}
              />
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
                'Update'
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
export default Update;
