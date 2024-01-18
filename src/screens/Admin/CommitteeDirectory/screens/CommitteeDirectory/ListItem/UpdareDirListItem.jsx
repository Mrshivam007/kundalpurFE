// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { backendApiUrl } from '../../../../../../config/config';
import { serverInstance } from '../../../../../../API/ServerInstance';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Swal from 'sweetalert2';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CustomInput, CustomInputLabel, CustomTableInput } from '../common';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { ReactTransliterate } from 'react-transliterate';
import CircularProgress from '@material-ui/core/CircularProgress';

const UpdareDirListItem = ({
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
      sadsya: 'Yatri',
    },
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

  const [sadsyaType, setSadsyaType] = useState('');
  const [relationship, setRelationship] = useState('');
  const [email, setEmail] = useState('');
  const [DOB, setDOB] = useState('');
  const [DOA, setDOA] = useState('');
  const [status, setStatus] = useState(true);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [remark, setRemark] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [newMember, setNewMember] = useState(false);
  const [mobileNo, setMobileNo] = useState('');
  const [genderp, setgenderp] = useState('');
  const [genderp1, setgenderp1] = useState('');
  const [fetchuserdetail, setfetchuserdetail] = useState(true);
  const [showloader, setshowloader] = useState(false);
  const [ANo, setANo] = useState('');
  const [pan, setPan] = useState('');
  const [age, setAge] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [donationItems, setDonationItems] = useState([
    {
      type: '',
      amount: '',
      remark: '',
    },
  ]);


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


  const updateCD = (e) => {

    setshowloader(true)
    e.preventDefault();


    try {

      const data = {
        Name: fullName,
        FathersName: fatherName,
        Age: age,
        SadsyaType: sadsyaType,
        MobileNo: mobileNo,
        Email: email,
        AadharNo: ANo,
        PanNo: pan,
        Address: address,
        DateOfBirth: DOB,
        DateOfAnniversary: DOA,
        FromDate: fromDate,
        ToDate: toDate,
        Status: status,
        Remark: remark,
        id:updateData?.id
      }
      serverInstance('committee/edit-committee', 'put', data).then((res) => {
        if (res.status) {
          handleClose();
          setshowloader(false);
          Swal.fire("Great!", res?.msg, 'success')
        } if (res.status === false) {
          handleClose();
          setshowloader(false);
          Swal.fire("Error!", res?.msg, 'error')
        }
      })
    } catch (err) {
      console.log(err)
      Swal.fire("Error!", res?.msg, 'error')
    }
  }




  const [sdasyalist, setsdasyalist] = useState([]);
  const getall_sadsyatypes = () => {
    serverInstance('admin/get-sadsyaType', 'get').then((res) => {
      if (res?.data) {
        setsdasyalist(res?.data);
      }
    });
  };

  const [relationlist, setrelationlist] = useState([]);
  const getall_relationship = () => {
    serverInstance('admin/get-relationshipType', 'get').then((res) => {
      if (res?.data) {
        setrelationlist(res?.data);
      }
    });
  };

  useEffect(() => {
    getall_relationship();
    getall_sadsyatypes();
    if (updateData) {
      setFatherName(updateData?.FathersName)
      setFullName(updateData?.Name);
      setAddress(updateData?.Address)
      setEmail(updateData?.Email);
      setDOB(updateData?.DateOfBirth);
      setPan(updateData?.PanNo)
      setAge(updateData?.Age)
      setANo(updateData?.AadharNo)
      setDOA(updateData?.DateOfAnniversary);
      setSadsyaType(updateData?.SadsyaType);
      setFromDate(updateData?.FromDate)
      setToDate(updateData?.ToDate)
      setRemark(updateData?.Remark)
      setRelationship(updateData?.RelationshipType);
      setMobileNo(updateData?.MobileNo);
      setStatus(updateData?.Status)
 
    }
    setrole(Number(sessionStorage.getItem('userrole')));
  }, []);

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <form onSubmit={updateCD}>
          <Typography variant="h6" color={'primary'} align="center">
            Update Committee Directory
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


            <Grid item xs={12} md={2}>
              <CustomInputLabel htmlFor="phoneNo">
                Phone Number*
              </CustomInputLabel>
              <CustomInput
                placeholder="Enter Phone Number"
                id="mobile-no"
                value={mobileNo}
                onChange={(e) => {
                  setMobileNo(e.target.value);
                }}
              />
            </Grid>


            <Grid item xs={12} md={3}>
              {!newMember ? (
                <>
                  Full Name*
                  <ReactTransliterate
                    style={custumstyle}
                    id="full-name"
                    required
                    placeholder="Enter Full Name"
                    value={fullName}
                    onChangeText={(fullName) => {
                      setFullName(fullName);
                    }}
                    onChange={(e) => setFullName(e.target.value)}
                    a
                    lang="hi"
                  />
                </>
              ) : (
                <>
                  Full Name*
                  <CustomInput
                    id="full-name"
                    required
                    placeholder="Enter Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </>
              )}
            </Grid>

            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="FatherName">
                Father's Name*
              </CustomInputLabel>
              <CustomInput
                id="mobile-no"
                value={fatherName}
                placeholder="Enter Fathers Name"
                onChange={(e) => {
                  setFatherName(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
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
                    placeholder="Enter Address"
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
                    placeholder="Enter Address"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </>
              )}
            </Grid>



            <Grid item xs={12} md={1}>
              <CustomInputLabel htmlFor="phoneNo">Age*</CustomInputLabel>
              <CustomInput
                id="mobile-no"
                placeholder="Age"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="email">Aadhar No.</CustomInputLabel>
              <CustomInput
                id="mobile-no"
                placeholder="Enter your Aadhar No."
                value={ANo}
                onChange={(e) => {
                  setANo(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="email">PAN No.</CustomInputLabel>
              <CustomInput
                id="mobile-no"
                placeholder="Enter PAN No."
                value={pan}
                onChange={(e) => {
                  setPan(e.target.value);
                }}
              />
            </Grid>



            <Grid item xs={12} md={2}>
              <CustomInputLabel htmlFor="email">Email</CustomInputLabel>
              <CustomInput
                id="mobile-no"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="Sadsya Type">
                Sadsya Type*
              </CustomInputLabel>

              <Select
                required
                sx={{
                  width: '100%',
                  height: '60%',
                  borderRadius: '1rem',
                  paddingLeft: '1rem',
                  fontSize: 14,
                  '& .MuiSelect-select': {
                    padding: '1px',
                  },
                }}
                value={sadsyaType}
                onChange={(e) => setSadsyaType(e.target.value)}
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
                {sdasyalist &&
                  sdasyalist.map((item, idx) => {
                    return (
                      <MenuItem
                        sx={{
                          fontSize: 14,
                        }}
                        key={item.id}
                        value={item?.sadsyaType_hi}
                      >
                        {item?.sadsyaType_hi}
                      </MenuItem>
                    );
                  })}
              </Select>
            </Grid>


            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="DOB">Date Of Birth*</CustomInputLabel>
              <CustomInput
                disabled={role === 3 ? true : false}
                type="date"
                id="donation-date"
                placeholder="Enter your Date Of Birth"
                value={DOB}
                onChange={(event) => {
                  setDOB(
                    new Date(event.target.value).toISOString().substring(0, 10),
                  );
                }}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="DOA">
                Date Of Anniversary*
              </CustomInputLabel>
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
              <CustomInputLabel htmlFor="fromDAte">From Date</CustomInputLabel>
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
              <CustomInputLabel htmlFor="toDate">To Date</CustomInputLabel>
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
              <CustomInputLabel htmlFor="relationship">Status</CustomInputLabel>

              <Select
                required
                sx={{
                  width: '100%',
                  height: '60%',
                  borderRadius: '1rem',
                  paddingLeft: '1rem',
                  fontSize: 14,
                  '& .MuiSelect-select': {
                    padding: '1px',
                  },
                }}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                displayEmpty
              >
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={true}
                >
                  Active
                </MenuItem>
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={false}
                >
                  Disable
                </MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="relationship">Remark</CustomInputLabel>
              <CustomInput
                id="mobile-no"
                value={remark}
                placeholder='Remark'
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
                  'Update'
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
export default UpdareDirListItem;
