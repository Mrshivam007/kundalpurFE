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
import TotalAmountRow from '../common/TotalAmountRow';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { ReactTransliterate } from 'react-transliterate';
import CircularProgress from '@material-ui/core/CircularProgress';

const Form = ({
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


  const trustTypeOptions = [
    {
      id: 2,
      type: 'Samiti',
    },
    {
      id: 3,
      type: 'Upsamiti',
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


  const [pincode , setPincode] = useState('')
  const [email, setEmail] = useState('')

  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [ city , setCity] = useState('')
  const [state , setState] = useState('')
  const [bankName , setBankName] = useState('')
  const [location , setLocation] = useState('')
  const [IFSCCode , setIFSCCode] = useState('')
  const [trustCode , setTrustCode] = useState('')
  const [panNo , setPanNo] = useState('')
  const [GST , setGST] = useState('')
  const [accountDetails , setAccountDetails] = useState('')

  const [trustName, setTrustName] = useState('');
  const [address, setAddress] = useState('');
  const [newMember, setNewMember] = useState(false);
  const [mobileNo, setMobileNo] = useState('');


  const [showloader, setshowloader] = useState(false);


 

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


  return (
    <Box>
      <ThemeProvider theme={theme}>
        <form>
          <Typography variant="h6" color={'primary'} align="center">
            Trust Registration Details
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

            <Grid item xs={12} md={2}>
              <CustomInputLabel htmlFor="trustCode">
                Trust Code
              </CustomInputLabel>
              <CustomInput
                
                placeholder='Enter Trust Code'
                value={trustCode}
                onChange={(e) => {
                  setTrustCode(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="sadasyaType">
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
                {trustTypeOptions.map((item, idx) => {
                  return (
                    <MenuItem
                      sx={{
                        fontSize: 14,
                      }}
                      key={item.id}
                      value={item.type}
                    >
                      {item.type}
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
              <CustomInputLabel htmlFor="trustName">
                Main Trust Name
              </CustomInputLabel>
              <CustomInput
                id="mobile-no"
                placeholder='Enter Main Trust Name'
                
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="Location">
                Location
              </CustomInputLabel>
              <CustomInput
                placeholder='Location'
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
            </Grid>

         
            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="BankName">
                Bank Name
              </CustomInputLabel>
              <CustomInput
                placeholder='Enter Name'
                value={bankName}
                onChange={(e) => {
                  setBankName(e.target.value);
                }}
              />
            </Grid>


            <Grid item xs={12} md={6}>
              <CustomInputLabel htmlFor="accDetails">
                Account Details
              </CustomInputLabel>
              <CustomInput
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
                id="mobile-no"
                placeholder='Enter IFSC Code'
                value={IFSCCode}
                onChange={(e) => {
                  setIFSCCode(e.target.value);
                }}
              />
            </Grid>
            

            <Grid item xs={12} md={6}>
              <CustomInputLabel htmlFor="trustAddress">
                Trust Address
              </CustomInputLabel>
              <CustomInput
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
                placeholder='Enter Pincode'
                value={pincode}
                onChange={(e) => {
                  setPincode(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <CustomInputLabel htmlFor="phoneNumber">
                Phone Number 
              </CustomInputLabel>
              <CustomInput
                placeholder='Enter Phone Number'
                value={mobileNo}
                onChange={(e) => {
                  setMobileNo(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="relationship">
                Email
              </CustomInputLabel>
              <CustomInput
                placeholder='Enter Email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <CustomInputLabel htmlFor="email">
                PAN Number
              </CustomInputLabel>
              <CustomInput
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
                value={GST}
                onChange={(e) => {
                  setGST(e.target.value);
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
export default Form;
