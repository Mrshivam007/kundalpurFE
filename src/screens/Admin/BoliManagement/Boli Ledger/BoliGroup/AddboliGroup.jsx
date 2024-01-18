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
  // const [donationTypes, setDonationTypes] = useState([]);
  // const [receiptNo, setReceiptNo] = useState('');
  const [city, setcity] = useState('');
  const [states, setstates] = useState('');
  const [pincode, setpincode] = useState('');
  const [country, setcountry] = useState('');
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
    setshowloader(true);
    try {
      const data = {
        City: city,
        PinCode: pincode,
        State: states,
        Country: country,
      };
      serverInstance('boli/add-boliGroup', 'post', data).then((res) => {
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
        <div>
          <Typography variant="h6" color={'#7037ad'} align="center">
            {showUpdateBtn ? 'Update Boli Group' : 'Add Boli Group'}
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
            <Grid item xs={12} md={4}>
              {!newMember ? (
                <>
                  City
                  <ReactTransliterate
                    style={custumstyle}
                    id="full-name"
                    required
                    value={city}
                    onChangeText={(city) => {
                      setcity(city);
                    }}
                    onChange={(e) => setcity(e.target.value)}
                    lang="hi"
                    placeholder="Enter City"
                  />
                </>
              ) : (
                <>
                  <CustomInputLabel htmlFor="City">City</CustomInputLabel>
                  <CustomInput
                    disabled={role === 3 ? true : false}
                    type="text"
                    id="donation-date"
                    required
                    placeholder="Enter City"
                    value={city}
                    onChange={(e) => setcity(e.target.value)}
                  />
                </>
              )}
            </Grid>

            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="donation-date">
                Pincode
              </CustomInputLabel>
              <CustomInput
                type="text"
                id="PAN"
                required
                placeholder="Enter Pincode"
                value={pincode}
                onChange={(e) => setpincode(e.target.value)}
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
                value={states}
                onChange={(e) => setstates(e.target.value)}
              />
            </Grid>

            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="city">Country</CustomInputLabel>
              <CustomInput
                type="text"
                id="PAN"
                required
                placeholder="Enter Country "
                value={country}
                onChange={(e) => setcountry(e.target.value)}
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
                  backgroundColor: '#7037ad',
                }}
                variant="contained"
                type="submit"
                onClick={()=>addCashDonation()}
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
export default Addboli;
