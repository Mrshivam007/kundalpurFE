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
import Moment from 'moment-js';
const CashDonation = ({
  handleClose,
  themeColor,
  updateData,
  showUpdateBtn,
  receiptNo,
  donationTypes,
  showhdtext,
  bolidata,
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
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [newMember, setNewMember] = useState(false);
  const [mobileNo, setMobileNo] = useState('');
  const [genderp, setgenderp] = useState('');
  const [genderp1, setgenderp1] = useState('');
  const [fetchuserdetail, setfetchuserdetail] = useState(true);
  const [showloader, setshowloader] = useState(false);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const [donationItems, setDonationItems] = useState([
    {
      type: '',
      amount: '',
      remark: '',
    },
  ]);

  console.log('from cash ', donationTypes, receiptNo);
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

  var date = Moment(today).format('YYYY-MM-DD');
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
    setSaveButtonDisabled(true);
    axios.defaults.headers.post[
      'Authorization'
    ] = `Bearer ${sessionStorage.getItem('token')}`;
    axios.defaults.headers.put[
      'Authorization'
    ] = `Bearer ${sessionStorage.getItem('token')}`;
    // e.preventDefault();
    if (showUpdateBtn) {
      if (fullName && donationItems[0].amount && donationItems[0].type) {
        if (updateData?.modeOfDonation === '1') {
          const res = await axios.put(`${backendApiUrl}user/add-elecDonation`, {
            id: updateData?.id,
            name: fullName,
            gender: newMember ? genderp1 : genderp,
            phoneNo: mobileNo,
            address: address,
            new_member: newMember,
            LedgerNo: bolidata?.LedgerNo,
            modeOfDonation: 1,
            donation_date: donationDate,
            donation_time: donationTime,
            donation_item: donationItems,
          });

          if (res.data.status === true) {
            handleClose();
            setshowloader(false);
          } else {
            Swal.fire('Error!', 'Somthing went wrong!!', 'error');
          }
        }
        if (updateData?.modeOfDonation === '2') {
          const res = await axios.put(
            `${backendApiUrl}user/edit-cash-donation`,
            {
              id: updateData?.id,
              name: fullName,
              gender: newMember ? genderp1 : genderp,
              phoneNo: mobileNo,
              address: address,
              new_member: newMember,
              LedgerNo: bolidata?.LedgerNo,
              modeOfDonation: 2,
              donation_date: donationDate,
              donation_time: donationTime,
              donation_item: donationItems,
            },
          );

          if (res.data.status === true) {
            handleClose();
            setshowloader(false);
          } else {
            Swal.fire('Error!', 'Somthing went wrong!!', 'error');
          }
        }

        if (updateData?.modeOfDonation === '3') {
          const res = await axios.put(
            `${backendApiUrl}user/edit-cheque-donation`,
            {
              id: updateData?.id,
              name: fullName,
              gender: newMember ? genderp1 : genderp,
              phoneNo: mobileNo,
              address: address,
              new_member: newMember,
              LedgerNo: bolidata?.LedgerNo,
              modeOfDonation: 3,
              donation_date: donationDate,
              donation_time: donationTime,
              donation_item: donationItems,
            },
          );

          if (res.data.status === true) {
            handleClose();
            setshowloader(false);
          } else {
            Swal.fire('Error!', 'Somthing went wrong!!', 'error');
          }
        }

        if (updateData?.modeOfDonation === '4') {
          const modifiedDonationItems = donationItems.map((donationItem) => {
            return {
              ...donationItem,
              amount: donationItem.approxValue,
            };
          });
          const res = await axios.put(
            `${backendApiUrl}user/edit-item-donation`,
            {
              id: updateData?.id,
              name: fullName,
              gender: newMember ? genderp1 : genderp,
              phoneNo: mobileNo,
              address: address,
              new_member: newMember,
              LedgerNo: bolidata?.LedgerNo,
              modeOfDonation: 1,
              donation_date: donationDate,
              donation_time: donationTime,
              donation_item: modifiedDonationItems,
            },
          );

          if (res.data.status === true) {
            handleClose();
            setshowloader(false);
          } else {
            Swal.fire('Error!', 'Somthing went wrong!!', 'error');
          }
        }
      }
    } else {
      if (fullName && donationItems[0].amount && donationItems[0].type) {
        try {
        } catch (error) {}

        const res = await axios.post(`${backendApiUrl}user/add-elecDonation`, {
          name: fullName,
          gender: newMember ? genderp1 : genderp,
          phoneNo: mobileNo,
          address: address,
          new_member: newMember,
          modeOfDonation: 2,
          donation_date: donationDate,
          LedgerNo: bolidata?.LedgerNo,
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
          handleClose();
          setshowloader(false);
          navigation('/admin-panel/OnlyElectronicAdd', {
            state: {
              userdata: res.data.data.message.data,
            },
          });
          console.log(res.data.data.message.data.ReceiptNo);
          sendsms(totalamount, res.data.data.message.data.ReceiptNo);
        } else {
          Swal.fire('Error!', 'Somthing went wrong!!', 'error');
        }
      }
    }

    setTimeout(() => {
      setSaveButtonDisabled(false);
    }, 5000);
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
          <Typography variant="h6" color={'primary'} align="center">
            {showUpdateBtn ? (
              <>
                {updateData?.modeOfDonation === '1' && (
                  <>Update Electronic Donation</>
                )}
                {updateData?.modeOfDonation === '2' && (
                  <>Update Cash Donation</>
                )}
                {updateData?.modeOfDonation === '3' && (
                  <>Update Cheque Donation</>
                )}
                {updateData?.modeOfDonation === '4' && (
                  <>Update Item Donation</>
                )}
              </>
            ) : (
              'Add Cash Donation'
            )}
          </Typography>

          <Typography variant="body2" color="primary" align="right">
            {currDate} / {currTime}
          </Typography>
          {bolidata?.LedgerNo ? (
            <>
              <Typography variant="body2" color="primary" align="right">
                {bolidata?.LedgerNo}
              </Typography>
            </>
          ) : (
            <></>
          )}

          <Typography variant="body2" my={1}>
            {updateData?.ReceiptNo ? 'Receipt No :' : ' Voucher No :'}
            {updateData?.ReceiptNo ? updateData?.ReceiptNo : receiptNo}
            &nbsp;&nbsp;
            {updateData ? 'Voucher No : ' : ''}
            {updateData ? updateData?.voucherNo : ''}
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
            <Grid item xs={12} md={6}>
              <CustomInputLabel htmlFor="mobile-no">
                Mobile Number
              </CustomInputLabel>
              <CustomInput
                id="mobile-no"
                value={mobileNo}
                onChange={(e) => {
                  setMobileNo(e.target.value);
                }}
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
                  <TableCell style={{ width: '35%' }}>
                    <Box
                      sx={{
                        paddingInline: '10px',
                        minWidth: 200,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      Type of donation*
                      <IconButton aria-label="add" size="small">
                        <AddBoxIcon color="primary" onClick={addDonationItem} />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell align="center">Amount*</TableCell>
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
                        {donationTypes &&
                          donationTypes.map((item, idx) => {
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
                                  value={item.remark}
                                  onChangeText={(item) => {
                                    handleDonationItemUpdate(
                                      item,
                                      'remark',
                                      e.target.value,
                                    );
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
            {showUpdateBtn ? (
              <Button
                sx={{
                  textTransform: 'none',
                  paddingX: 5,
                  boxShadow: 'none',
                }}
                variant="contained"
                type="submit"
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
export default CashDonation;
