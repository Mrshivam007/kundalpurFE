// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { serverInstance } from '../../../../../../API/ServerInstance';
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

const FamilyDirListItem = ({
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

  const custommStyleInputTable = {
    width: '100%',
    position: 'relative',

    border: '1px solid #C8C6D3',
    fontSize: 14,
    padding: 9.5,
  };
  const [role, setrole] = useState('');
  const [email, setEmail] = useState('');
  const [DOB, setDOB] = useState('');
  const [DOA, setDOA] = useState('');
  const [remark, setRemark] = useState('');
  const [aadharNo, setAadharNo] = useState('');
  const [pan, setPan] = useState('');
  const [status, setStatus] = useState(true);
  const [fatherName, setFatherName] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [newMember, setNewMember] = useState(false);
  const [mobileNo, setMobileNo] = useState('');
  const [age, setage] = useState('');
  const [panNo, setpanNo] = useState('');
  const [dateofOccasion, setdateofOccasion] = useState('');
  const [showloader, setshowloader] = useState(false);
  const [donationItems, setDonationItems] = useState([
    {
      MobileNo: '',
      Name: '',
      RelationshipType: '',
      Address: '',
      Email: '',
      DateOfBirth: '',
      DateOfOccasion: '',
    },
  ]);

  function addDonationItem() {
    setDonationItems([
      ...donationItems,
      {
        MobileNo: '',
        Name: '',
        RelationshipType: '',
        Address: '',
        Email: '',
        DateOfBirth: '',
        DateOfOccasion: '',
      },
    ]);
  }

  console.log("only check",donationItems);

  function removeItem(item) {
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

  const addFamilyDirectory = () => {
    setshowloader(true);
    try {
      const data = {
        MobileNo: mobileNo,
        Name: fullName,
        FathersName: fatherName,
        Address: address,
        Age: age,
        AadharNo: aadharNo,
        PanNo: panNo,
        Email: email,
        SadsyaType: sadsyaname,
        DateOfBirth: DOB,
        DateOfOccasion: DOA,
        OccasionType: Ocassionname,
        Status: status,
        Remark: remark,
        familyMember: donationItems,
      };
      serverInstance('committee/add-family', 'post', data).then((res) => {
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

  const [relationList, setrelationList] = useState([]);
  const [relationname, setrelationname] = useState('');
  const getrelationship = () => {
    serverInstance('admin/get-relationshipType', 'get').then((res) => {
      if (res?.data) {
        setrelationList(res?.data);
      }
    });
  };
  const [Ocassionlist, setOcassionlist] = useState([]);
  const [Ocassionname, setOcassionname] = useState('');
  const getoccasion = () => {
    serverInstance('admin/get-occasionType', 'get').then((res) => {
      if (res?.data) {
        setOcassionlist(res?.data);
      }
    });
  };
  const [sadsyalist, setsadsyalist] = useState([]);
  const [sadsyaname, setsadsyaname] = useState('');
  const getsadsya = () => {
    serverInstance('admin/get-sadsyaType', 'get').then((res) => {
      if (res?.data) {
        setsadsyalist(res?.data);

        console.log('sadsyalist', res?.data);
      }
    });
  };

  useEffect(() => {
    getoccasion();
    getsadsya();
    getrelationship();
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
          <Typography variant="h6" color={'primary'} align="center">
            Family Directory
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
              <CustomInputLabel htmlFor="phoneNo">
                Phone Number
              </CustomInputLabel>
              <CustomInput
                required
                placeholder="Enter Phone Number"
                id="mobile-no"
                value={mobileNo}
                onChange={(e) => {
                  setMobileNo(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              {!newMember ? (
                <>
                  Full Name
                  <ReactTransliterate
                    style={custumstyle}
                    placeholder="Enter Full Name"
                    id="full-name"
                    required
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
                  Full Name
                  <CustomInput
                    id="full-name"
                    placeholder="Enter Full Name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </>
              )}
            </Grid>

            <Grid item xs={12} md={2}>
              {!newMember ? (
                <>
                  Father Name
                  <ReactTransliterate
                    style={custumstyle}
                    id="full-name"
                    placeholder="Enter Father Name"
                    required
                    value={fatherName}
                    onChangeText={(fatherName) => {
                      setFatherName(fatherName);
                    }}
                    onChange={(e) => setFatherName(e.target.value)}
                    a
                    lang="hi"
                  />
                </>
              ) : (
                <>
                  Father Name
                  <CustomInput
                    id="full-name"
                    placeholder="Enter Father Name"
                    required
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                  />
                </>
              )}
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
                    placeholder="Enter Address"
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
                    placeholder="Enter Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </>
              )}
            </Grid>

            <Grid item xs={12} md={2}>
              <CustomInputLabel htmlFor="email">Age</CustomInputLabel>
              <CustomInput
                id="mobile-no"
                type="text"
                placeholder="Enter Age"
                value={age}
                onChange={(e) => {
                  setage(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <CustomInputLabel htmlFor="email">Aadhar No.</CustomInputLabel>
              <CustomInput
                placeholder="Enter Aadhar No."
                required
                id="aadhar"
                value={aadharNo}
                onChange={(e) => {
                  setAadharNo(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <CustomInputLabel htmlFor="email">PAN No.</CustomInputLabel>
              <CustomInput
                required
                placeholder="Enter PAN No."
                id="panNo"
                value={panNo}
                onChange={(e) => {
                  setpanNo(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <CustomInputLabel htmlFor="email">Email</CustomInputLabel>
              <CustomInput
                placeholder="Enter Email"
                id="mobile-no"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="Entry">Sadsya Type</CustomInputLabel>

              <Select
                required
                sx={{
                  width: '100%',
                  height: '60%',
                  borderRadius: '1rem',
                  fontSize: 14,
                  paddingLeft: '1rem',
                  '& .MuiSelect-select': {
                    padding: '1px',
                  },
                }}
                value={sadsyaname}
                name=""
                onChange={(e) => setsadsyaname(e.target.value)}
              >
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={'Adhyaksh'}
                ></MenuItem>
                {sadsyalist &&
                  sadsyalist?.map((item, idx) => {
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
              <CustomInputLabel htmlFor="DOB">Date Of Birth</CustomInputLabel>
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
              <CustomInputLabel htmlFor="DOA">
                Date Of Occassion
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
              <CustomInputLabel htmlFor="donation-date">
                Ocassion Type
              </CustomInputLabel>
              <Select
                required
                sx={{
                  width: '100%',
                  height: '60%',
                  borderRadius: '1rem',
                  fontSize: 14,
                  paddingLeft: '1rem',
                  '& .MuiSelect-select': {
                    padding: '1px',
                  },
                }}
                value={Ocassionname}
                name="Ocassionname"
                onChange={(e) => setOcassionname(e.target.value)}
              >
                {Ocassionlist &&
                  Ocassionlist?.map((item, idx) => {
                    return (
                      <MenuItem
                        sx={{
                          fontSize: 14,
                        }}
                        key={item.id}
                        value={item?.occasionType_hi}
                      >
                        {item?.occasionType_hi}
                      </MenuItem>
                    );
                  })}
              </Select>
            </Grid>
            <Grid item xs={6} md={3}>
              <CustomInputLabel htmlFor="DOO">
                Date Of Ocassion
              </CustomInputLabel>
              <CustomInput
                type="date"
                id="donation-date"
                value={dateofOccasion}
                onChange={(event) => {
                  setdateofOccasion(
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
                  fontSize: 14,
                  paddingLeft: '1rem',
                  '& .MuiSelect-select': {
                    padding: '1px',
                  },
                }}
                value={status}
                name="status"
                onChange={(e) => setstatus(e.target.value)}
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
                  DeActive
                </MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="relationship">Remark</CustomInputLabel>
              <CustomInput
                id="mobile-no"
                placeholder="Enter Remark"
                value={remark}
                onChange={(e) => {
                  setRemark(e.target.value);
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
                  <TableCell style={{ width: '10%' }} align="center">
                    Mobile No
                  </TableCell>
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
                  <TableCell align="center">Relationship</TableCell>
                  <TableCell align="center">Address</TableCell>
                  <TableCell style={{ width: '10%' }} align="center">
                    Email
                  </TableCell>
                  <TableCell align="center">Date Of Birth</TableCell>
                  <TableCell align="center">Date Of Ocassion</TableCell>
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
                        value={item.MobileNo}
                        onChange={(e) =>
                          handleDonationItemUpdate(
                            item,
                            'MobileNo',
                            e.target.value,
                          )
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      <CustomTableInput
                        required
                        type="text"
                        value={item.Name}
                        onChange={(e) =>
                          handleDonationItemUpdate(item, 'Name', e.target.value)
                        }
                      />
                    </TableCell>

                    <TableCell>
                      <Select
                        required
                        sx={{
                          width: '100%',
                          height: '60%',
                          borderRadius: '1rem',
                          fontSize: 14,
                          paddingLeft: '0.5rem',
                          '& .MuiSelect-select': {
                            padding: '1px',
                          },
                        }}
                        value={item.RelationshipType}
                        onChange={(e) =>
                          handleDonationItemUpdate(
                            item,
                            'RelationshipType',
                            e.target.value,
                          )
                        }
                      >
                        <MenuItem
                          sx={{
                            fontSize: 14,
                          }}
                          value={'Father'}
                        >
                          Father
                        </MenuItem>
                        {relationList &&
                          relationList.map((item, idx) => {
                            return (
                              <MenuItem
                                sx={{
                                  fontSize: 14,
                                }}
                                key={item.id}
                                value={item?.relationshipType_hi}
                              >
                                {item?.relationshipType_hi}
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </TableCell>

                    <TableCell>
                      <CustomTableInput
                        required
                        type="text"
                        value={item.Address}
                        onChange={(e) =>
                          handleDonationItemUpdate(
                            item,
                            'Address',
                            e.target.value,
                          )
                        }
                      />
                    </TableCell>

                    <TableCell
                      style={{
                        paddingInline: 0,
                      }}
                    >
                      <CustomTableInput
                        required
                        type="text"
                        value={item.Email}
                        onChange={(e) =>
                          handleDonationItemUpdate(
                            item,
                            'Email',
                            e.target.value,
                          )
                        }
                      />
                    </TableCell>

                    <TableCell>
                      <CustomTableInput
                        required
                        type="date"
                        value={item.DateOfBirth}
                        onChange={(e) =>
                          handleDonationItemUpdate(
                            item,
                            'DateOfBirth',
                            e.target.value,
                          )
                        }
                      />
                    </TableCell>

                    <TableCell>
                      <CustomTableInput
                        required
                        type="date"
                        value={item.DateOfOccasion}
                        onChange={(e) =>
                          handleDonationItemUpdate(
                            item,
                            'DateOfOccasion',
                            e.target.value,
                          )
                        }
                      />
                    </TableCell>

                    {!newMember && (
                      <TableCell sx={{ width: '2rem' }}>
                        <CustomTableInput
                          disabled
                          value={item.remark}
                          endAdornment={
                            idx > 0 && (
                              <InputAdornment position="start">
                                <IconButton
                                  sx={{
                                    padding: '4px',
                                  }}
                                  onClick={() => removeItem(item)}
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
                      </TableCell>
                    )}
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
                onClick={() => addFamilyDirectory()}
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
export default FamilyDirListItem;
