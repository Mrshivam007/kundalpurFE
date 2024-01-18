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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  CustomInput,
  CustomInputLabel,
  CustomTableInput,
} from '../../Donation/Donation/common';
import TotalAmountRow from './TotalpayAmountRow';
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
import Saveboli from './Saveboli';

const bolistatus = [
  { id: 1, name: 'Pending' },
  { id: 2, name: 'Paid' },
];

const Addboli = ({
  handleClose,
  themeColor,
  showUpdateBtn,
  setOpen,
  setresdata,
  boliheads,
  boliunits,
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
  const [showaftersaveboli, setshowaftersaveboli] = useState(false);
  const [boliamount, setboliamount] = useState('');
  const [polipending, setpolipending] = useState('');
  const [status, setstatus] = useState('Pending');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [newMember, setNewMember] = useState(false);
  const [mobileNo, setMobileNo] = useState('');
  const [email, setemail] = useState('');
  const [fetchuserdetail, setfetchuserdetail] = useState(true);
  const [showloader, setshowloader] = useState(false);

  const [donationItems, setDonationItems] = useState([
    {
      type: '',
      Type: '',
      Unit: 'रुपये',
      amount: '',
      PayAmount: 0,
      remark: '',
      Remark: '',
      pmode: '',
      BoliAmount: '',
    },
  ]);

  function addDonationItem() {
    setDonationItems([
      ...donationItems,
      {
        type: '',
        Type: '',
        Unit: 'रुपये',
        amount: '',
        PayAmount: 0,
        remark: '',
        Remark: '',
        pmode: '',
        BoliAmount: '',
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
    e.preventDefault();
    setshowloader(true);
    axios.defaults.headers.post[
      'Authorization'
    ] = `Bearer ${sessionStorage.getItem('token')}`;

    if (fullName) {
      const res = await axios.post(`${backendApiUrl}boli/add-boli`, {
        Date: donationDate,
        Time: donationTime,
        MobileNo: mobileNo,
        Name: fullName,
        Email: email,
        Address: address,
        BoliAmount: donationItems?.reduce(
          (n, { BoliAmount }) => parseFloat(n) + parseFloat(BoliAmount),
          0,
        )
          ? donationItems?.reduce(
              (n, { BoliAmount }) => parseFloat(n) + parseFloat(BoliAmount),
              0,
            )
          : '0',
        PendingAmount: donationItems?.reduce(
          (n, { BoliAmount }) => parseFloat(n) + parseFloat(BoliAmount),
          0,
        )
          ? donationItems?.reduce(
              (n, { BoliAmount }) => parseFloat(n) + parseFloat(BoliAmount),
              0,
            )
          : '0',
        BoliStatus: status,
        active: '1',
        boli_item: donationItems,
      });

      console.log('add boli res', res?.data?.data?.data);
      if (res?.data?.status === true) {
        handleClose();
        setshowloader(false);
        setOpen(true);
        setresdata(res?.data?.data?.data);
      } else {
        Swal.fire('Error!', 'Somthing went wrong!!', 'error');
      }
    }
  };

  useEffect(() => {
    setrole(Number(sessionStorage.getItem('userrole')));
  }, []);

  return (
    <Box>
      <ThemeProvider theme={theme}>
        {showaftersaveboli ? (
          <>
            <Saveboli />
          </>
        ) : (
          <>
            <form onSubmit={addCashDonation}>
              <Typography variant="h6" color={'primary'} align="center">
                {showUpdateBtn ? 'Update Boli' : 'Add Boli'}
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
                <Grid item xs={6} md={3}>
                  <CustomInputLabel htmlFor="donation-date">
                    Date
                  </CustomInputLabel>
                  <CustomInput
                    disabled={role === 3 ? true : false}
                    type="date"
                    id="donation-date"
                    value={donationDate}
                    onChange={(event) => {
                      setDonationDate(
                        new Date(event.target.value)
                          .toISOString()
                          .substring(0, 10),
                      );
                    }}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <CustomInputLabel htmlFor="donation-time">
                    Time
                  </CustomInputLabel>
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
                  <CustomInputLabel htmlFor="donation-date">
                    Mobile No
                  </CustomInputLabel>
                  <CustomInput
                    type="text"
                    id="donation-date"
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                    placeholder="Enter Mobile No"
                  />
                </Grid>

                <Grid item xs={6} md={3}>
                  <CustomInputLabel htmlFor="donation-date">
                    Email
                  </CustomInputLabel>
                  <CustomInput
                    type="email"
                    id="donation-date"
                    value={email}
                    onChange={(event) => {
                      setemail(event.target.value);
                    }}
                    placeholder="Enter Email"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
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
                        placeholder="Enter Full Name"
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

                <Grid item xs={12} md={6}>
                  <CustomInputLabel required htmlFor="address">
                    Total Boli Amount
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
                    name="boliamount"
                    onChange={(e) => setboliamount(e.target.value)}
                    placeholder="Boli Amount"
                  />
                </Grid>

                <Grid item xs={6} md={3}>
                  <CustomInputLabel required htmlFor="address">
                    Total Pending Amount
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
                    placeholder="Pending Amount"
                  />
                </Grid>

                <Grid item xs={6} md={3}>
                  <CustomInputLabel htmlFor="donation-time">
                    Boli Status
                  </CustomInputLabel>
                  <Select
                    required
                    sx={{
                      width: '100%',
                      fontSize: 14,
                      '& .MuiSelect-select': {
                        padding: '1px',
                      },
                      height: '36px',
                      paddingLeft: '7px',
                    }}
                    value={status}
                    name="status"
                    onChange={(e) => setstatus(e.target.value)}
                    displayEmpty
                  >
                    {bolistatus &&
                      bolistatus.map((item, idx) => {
                        return (
                          <MenuItem
                            sx={{
                              fontSize: 14,
                            }}
                            key={item.id}
                            value={item.name}
                          >
                            {item.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </Grid>
              </Grid>
              <div
                style={{ height: '14rem', overflowX: 'scroll', width: '100%' }}
              >
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
                              <AddBoxIcon
                                color="primary"
                                onClick={addDonationItem}
                              />
                            </IconButton>
                          </Box>
                        </TableCell>
                        <TableCell align="center">Boli Amount*</TableCell>
                        <TableCell align="center">Unit*</TableCell>
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
                                handleDonationItemUpdate(
                                  item,
                                  'Type',
                                  e.target.value,
                                )
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
                              {boliheads &&
                                boliheads?.map((item, idx) => {
                                  return (
                                    <MenuItem
                                      sx={{
                                        fontSize: 14,
                                      }}
                                      key={item.id}
                                      value={item.boliHead_hi}
                                    >
                                      {item.boliHead_hi}
                                    </MenuItem>
                                  );
                                })}
                            </Select>
                          </TableCell>

                          <TableCell align="center">
                            <CustomTableInput
                              required
                              type="number"
                              placeholder="Enter Amount"
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
                              value={item.Unit}
                              onChange={(e) =>
                                handleDonationItemUpdate(
                                  item,
                                  'Unit',
                                  e.target.value,
                                )
                              }
                              displayEmpty
                            >
                              <MenuItem
                                sx={{
                                  fontSize: 14,
                                }}
                                value={'रुपये'}
                              >
                                रुपये
                              </MenuItem>
                              {boliunits &&
                                boliunits?.map((item, idx) => {
                                  return (
                                    <MenuItem
                                      sx={{
                                        fontSize: 14,
                                      }}
                                      key={item.id}
                                      value={item.boliUnit_hi}
                                    >
                                      {item.boliUnit_hi}
                                    </MenuItem>
                                  );
                                })}
                            </Select>
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
                                            onClick={() =>
                                              removeDonationItem(item)
                                            }
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
                                        placeholder="Enter Remark"
                                        style={custommStyleInputTable}
                                        value={item.Remark}
                                        onChangeText={(hindiremark) => {
                                          sethindiremark(hindiremark);
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
                                            onClick={() =>
                                              removeDonationItem(item)
                                            }
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
                                  value={item.Remark}
                                  placeholder="Enter Remark"
                                  onChange={(e) =>
                                    handleDonationItemUpdate(
                                      item,
                                      'Remark',
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
                                          onClick={() =>
                                            removeDonationItem(item)
                                          }
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
                    </TableBody>
                    <TotalAmountRow donationItems={donationItems} />
                  </Table>
                </TableContainer>
              </div>

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
          </>
        )}
      </ThemeProvider>
    </Box>
  );
};
export default Addboli;
