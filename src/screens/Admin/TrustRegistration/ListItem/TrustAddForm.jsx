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

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import AddBoxIcon from '@mui/icons-material/AddBox';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CustomInput, CustomInputLabel, CustomTableInput } from '../common';

import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { ReactTransliterate } from 'react-transliterate';
import CircularProgress from '@material-ui/core/CircularProgress';

const TrustAddForm = ({
  handleClose,
  themeColor,
  updateData,
  showUpdateBtn,

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

  


  const [pincode, setPincode] = useState('')
  const [email, setEmail] = useState('')

  const [createDate , setCreateDate] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')

  const [bankNameList, setBankNameList] = useState([])
  const [bankName, setBankName] = useState('')

  const [location, setLocation] = useState('')
  const [IFSCCode, setIFSCCode] = useState('')
  const [trustCode, setTrustCode] = useState('')
  const [panNo, setPanNo] = useState('')
  const [GST, setGST] = useState('')
  const [accountDetails, setAccountDetails] = useState('')
  const [remark, setRemark] = useState('')
  const [trustName, setTrustName] = useState('');
  const [mainTrustName, setMainTrustName] = useState('')



  const [trustType, setTrustType] = useState('')
  const [trustTypeList, setTrustTypeList] = useState([])

  const [address, setAddress] = useState('');
  const [newMember, setNewMember] = useState(false);
  const [mobileNo, setMobileNo] = useState('');


  const [showloader, setshowloader] = useState(false);





  const handleSubmit = async (e) => {

    e.preventDefault()
    try {

      setshowloader(true)
      const data = {
        Date: new Date(),
        TrustCode: trustCode,
        TrustName: trustName,
        MainTrustName: mainTrustName,
        TrustType: trustType,
        MobileNo: mobileNo,
        Email: email,
        Location: location,
        TrustAddress: address,
        State: state,
        City: city,
        PinCode: pincode,
        NameOfBank: bankName,
        AccountDetails: accountDetails,
        IFSC_Code: IFSCCode,
        PAN_Number: panNo,
        GST: GST,
        Remark: remark
      }

      serverInstance('trust/add-trust', 'post', data).then((res) => {
        if (res.status) {
          handleClose()
          setshowloader(false)
          Swal.fire('Great!', res?.msg, 'success');
        }
        if (res?.status === false) {
          setOpen(false);
          handleClose();
          setshowloader(false);
          Swal.fire('Error', res?.msg, 'error');
        }
      })
    } catch (err) {
      console.log(err)
    }

  }


  const getTrustType = () => {
    try {
      serverInstance('admin/get-trustType', 'get').then((res) => {
        console.log(res.data)
        if (res.status) {
          setTrustTypeList(res.data)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  const getBankName = () => {
    try {
      serverInstance('admin/get-bankName', 'get').then((res) => {
        console.log(res)
        if (res.status) {

          setBankNameList(res.data)

        }
      })
    } catch (err) {
      console.log(err)
    }
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
  console.log(date)


  useEffect(() => {
    getTrustType();
    getBankName()
  }, [])


  return (
    <Box>
      <ThemeProvider theme={theme}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" color={'primary'} align="center">
            Trust Registration Details
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
          <Grid item xs={12} md={2}>
              <CustomInputLabel htmlFor="date">
                Date
              </CustomInputLabel>
              <CustomInput
              disabled
                required
                placeholder='date'
                value={date}
                
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <CustomInputLabel htmlFor="trustCode">
                Trust Code
              </CustomInputLabel>
              <CustomInput
                required
                placeholder='Enter Trust Code'
                value={trustCode}
                onChange={(e) => {
                  setTrustCode(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              {!newMember ? (
                <>
                  Trust Name
                  <ReactTransliterate
                    style={custumstyle}

                    required
                    placeholder='Enter Trust Name'
                    value={trustName}
                    onChangeText={(trustName) => {
                      setTrustName(trustName);
                    }}
                    onChange={(e) => setTrustName(e.target.value)}
                    a lang="hi"
                  />
                </>
              ) : (
                <>
                  Trust Name
                  <CustomInput

                    required
                    value={trustName}
                    onChange={(e) => setTrustName(e.target.value)}
                  />
                </>
              )}
            </Grid>

            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="mainTrustName">
                Main Trust Name
              </CustomInputLabel>
              <CustomInput
                required
                placeholder='Enter Main Trust Name'
                value={mainTrustName}
                onChange={(e) => setMainTrustName(e.target.value)}
              />
            </Grid>



            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="trustType">
                Trust Type
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
                value={trustType}
                onChange={(e) => setTrustType(e.target.value)}
                displayEmpty
              >
                <MenuItem value="" disabled> Select Trust Type </MenuItem>

                {trustTypeList && trustTypeList?.map((item) => {
                  return (
                    <MenuItem
                      sx={{
                        fontSize: 14,
                      }}
                      key={item?.id}
                      value={item?.trustType_hi}

                    >
                      {item?.trustType_hi}

                    </MenuItem>
                  )
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

            <Grid item xs={12} md={2}>
              <CustomInputLabel htmlFor="phoneNumber">
                Phone Number
              </CustomInputLabel>
              <CustomInput
                required
                placeholder='Enter Phone Number'
                value={mobileNo}
                onChange={(e) => {
                  setMobileNo(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="email">
                Email
              </CustomInputLabel>
              <CustomInput
                placeholder='Enter Email'
                value={email}
                type='email'
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Grid>


            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="Location">
                Location
              </CustomInputLabel>
              <CustomInput
                required
                placeholder='Location'
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <CustomInputLabel htmlFor="trustAddress">
                Trust Address
              </CustomInputLabel>
              <CustomInput
                required
                placeholder='Enter Trust Address'
                id="mobile-no"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="state">
                State
              </CustomInputLabel>
              <CustomInput
                required
                placeholder='Enter State'
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="city">
                City
              </CustomInputLabel>
              <CustomInput
                required
                placeholder='Enter City'
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <CustomInputLabel htmlFor="pincode">
                Pin Code
              </CustomInputLabel>
              <CustomInput
                required
                placeholder='Enter Pincode'
                value={pincode}
                onChange={(e) => {
                  setPincode(e.target.value);
                }}
              />
            </Grid>


            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="BankName">
                Bank Name
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
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                displayEmpty
              >
                <MenuItem value="" disabled> Select Bank Name</MenuItem>

                {bankNameList && bankNameList?.map((item) => {
                  return (
                    <MenuItem
                      sx={{
                        fontSize: 14,
                      }}
                      key={item?.id}
                      value={item?.bankName}

                    >
                      {item?.bankName}

                    </MenuItem>
                  )
                })}
              </Select>
            </Grid>


            <Grid item xs={12} md={6}>
              <CustomInputLabel htmlFor="accDetails">
                Account Details
              </CustomInputLabel>
              <CustomInput
                required
                placeholder='Enter Account Details'
                value={accountDetails}
                onChange={(e) => {
                  setAccountDetails(e.target.value);
                }}
              />
            </Grid>


            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="IFSCCode">
                IFSC Code
              </CustomInputLabel>
              <CustomInput
                required
                id="mobile-no"
                placeholder='Enter IFSC Code'
                value={IFSCCode}
                onChange={(e) => {
                  setIFSCCode(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <CustomInputLabel htmlFor="email">
                PAN Number
              </CustomInputLabel>
              <CustomInput
                required
                placeholder='Enter PAN Number'
                value={panNo}
                onChange={(e) => {
                  setPanNo(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <CustomInputLabel htmlFor="email">
                GST
              </CustomInputLabel>
              <CustomInput
                required
                placeholder='Enter GST'
                value={GST}
                onChange={(e) => {
                  setGST(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <CustomInputLabel htmlFor="email">
                Remark
              </CustomInputLabel>
              <CustomInput
               
                placeholder='Enter Remark'
                id="mobile-no"
                value={remark}
                onChange={(e) => {
                  setRemark(e.target.value);
                }}
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
export default TrustAddForm;
