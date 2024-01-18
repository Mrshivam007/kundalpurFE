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
import AddBoxIcon from '@mui/icons-material/AddBox';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CustomInput, CustomInputLabel, CustomTableInput } from '../common';
import TotalAmountRow from '../common/TotalAmountRow';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { ReactTransliterate } from 'react-transliterate';
import CircularProgress from '@material-ui/core/CircularProgress';

const GateIn = ({
  handleClose,
  themeColor,
  updateData,
  showUpdateBtn,
  setOpen,
  // receiptNo,
  // donationTypes,
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

  const vehicleOptions = [
    {
      id: 1,
      sadsya: 'Light Vehicle',
    },
    {
      id: 2,
      sadsya: 'Heavy Vehicle',
    },
  ];

  const custommStyleInputTable = {
    width: '100%',
    position: 'relative',

    border: '1px solid #C8C6D3',
    fontSize: 14,
    padding: 9.5,
  };
  const [role, setrole] = useState('');
  const [status, setStatus] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [newMember, setNewMember] = useState(false);
  const [mobileNo, setMobileNo] = useState('');
  const [genderp, setgenderp] = useState('');
  const [genderp1, setgenderp1] = useState('');
  const [vehicletypelist, setvehicletypelist] = useState('');
  const [Vehiclename, setVehiclename] = useState('');
  const [Vehicleno, setVehicleno] = useState('');
  const [Vehicletype, setVehicletype] = useState('');
  const [remarks, setremarks] = useState('');
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
  const [time, settime] = useState(
    today.toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }),
  );
  const currDateTime = currDate + ' ' + currTime;

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
    e.preventDefault();
    try {
      const data = {
        Date: new Date(),
        Time: time,
        VehicleName: Vehiclename,
        VehicleNo: Vehicleno,
        Name: fullName,
        MobileNo: mobileNo,
        Address: address,
        VehicleType: Vehicletype,
        Remark: remarks,
      };
      serverInstance('vehicle/add-vehicle', 'post', data).then((res) => {
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

  const getvehicle_list = () => {
    serverInstance('admin/get-vehicleType', 'get').then((res) => {
      if (res.status) {
        setvehicletypelist(res.data);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
    });
  };

  useEffect(() => {
    getvehicle_list();
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
            Vehicle Gate Pass
          </Typography>
          <Typography variant="body2" color="primary" align="right">
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
            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="relationship">
                Gate In Date and Time
              </CustomInputLabel>
              <CustomInput
                id="mobile-no"
                value={currDateTime}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                disabled
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="Vehicle No">
                Vehicle Name*
              </CustomInputLabel>

              {!newMember ? (
                <>
                  <ReactTransliterate
                    style={custumstyle}
                    required
                    id="address"
                    value={Vehiclename}
                    onChangeText={(Vehiclename) => {
                      setVehiclename(Vehiclename);
                    }}
                    onChange={(e) => setVehiclename(e.target.value)}
                    lang="hi"
                    placeholder="Enter Vehicle Name"
                  />
                </>
              ) : (
                <>
                  <CustomInput
                    placeholder="Enter Vehicle Name"
                    id="mobile-no"
                    value={Vehiclename}
                    onChange={(e) => {
                      setVehiclename(e.target.value);
                    }}
                  />
                </>
              )}
            </Grid>

            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="Vehicle No">
                Vehicle No.*
              </CustomInputLabel>
              <CustomInput
                placeholder="Enter Vehicle No."
                id="mobile-no"
                value={Vehicleno}
                onChange={(e) => {
                  setVehicleno(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} md={3}>
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
                    a
                    lang="hi"
                    placeholder="Enter Full Name"
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
                placeholder="Enter Phone No."
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
                    placeholder="Enter Address"
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

            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="Entry">Vehicle Type</CustomInputLabel>

              <Select
                required
                sx={{
                  width: '100%',
                  height: '60%',
                  borderRadius: '1rem',

                  fontSize: 14,
                  '& .MuiSelect-select': {
                    padding: '10px',
                  },
                }}
                style={{ paddingLeft: '1rem' }}
                value={Vehicletype}
                onChange={(e) => setVehicletype(e.target.value)}
              >
                {/* <MenuItem value="">Please Select</MenuItem> */}
                {vehicletypelist &&
                  vehicletypelist?.map((item, idx) => {
                    return (
                      <MenuItem
                        sx={{
                          fontSize: 14,
                        }}
                        key={item.id}
                        value={item?.vehicleType_hi}
                      >
                        {item?.vehicleType_hi}

                        {console.log(item)}
                      </MenuItem>
                    );
                  })}
              </Select>
            </Grid>

            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="relationship">Remark</CustomInputLabel>

              {!newMember ? (
                <>
                  <ReactTransliterate
                    style={custumstyle}
                    required
                    id="relationship"
                    value={remarks}
                    onChangeText={(remarks) => {
                      setremarks(remarks);
                    }}
                    onChange={(e) => setremarks(e.target.value)}
                    lang="hi"
                    placeholder="Enter remark"
                  />
                </>
              ) : (
                <>
                  <CustomInput
                    id="mobile-no"
                    value={remarks}
                    name="remarks"
                    placeholder="Enter remark"
                    onChange={(e) => setremarks(e.target.value)}
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
export default GateIn;
