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

const GateIn = ({
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

  const vehicleOptions = [
    {
      id: 2,
      sadsya: 'Light Vehicle',
    },
    {
      id: 3,
      sadsya: 'Heavy Vehicle',
    },
  ];

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
  const [status, setStatus] = useState('');
  const [Vehicletype, setVehicletype] = useState('');
  const [vehiclename, setvehiclename] = useState('');
  const [vehicleNO, setvehicleNO] = useState('');
  const [remark, setremark] = useState('');
  const [orderNo, setorderNo] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [newMember, setNewMember] = useState(false);
  const [mobileNo, setMobileNo] = useState('');
  const [genderp, setgenderp] = useState('');
  const [fetchuserdetail, setfetchuserdetail] = useState(true);
  const [showloader, setshowloader] = useState(false);

  const [donationItems, setDonationItems] = useState([
    {
      ItemName: '',
      ItemNo: '',
      Quantity: '',
      Amount: '',
      SupplierCode: '',
      SupplierName: '',
      OrderNo: '',
      Remark: '',
    },
  ]);

  // console.log('from cash ', donationTypes, receiptNo);
  function addDonationItem() {
    setDonationItems([
      ...donationItems,
      {
        ItemName: '',
        ItemNo: '',
        Quantity: '',
        Amount: '',
        SupplierCode: '',
        SupplierName: '',
        OrderNo: '',
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
    serverInstance(`committee/getCommitteeByNum?MobileNo=${mobileNo}`, 'get').then(
      (res) => {
        if (res.status) {
          setFullName(res.data.name);
          setAddress(res.data.address);
          setgenderp(res.data.gender);
        }

        console.log("get detals by mobile no",res);

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
        Time:currTime,
        VehicleName: vehiclename,
        VehicleNo: vehicleNO,
        Name: fullName,
        MobileNo: mobileNo,
        Address: address,
        VehicleType: vehiclename,
        OrderNo: orderNo,
        Remark: remark,
        materialItem: donationItems,
      };
      serverInstance('vehicle/add-material', 'post', data).then((res) => {
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

  const [vehicletypelist, setvehicletypelist] = useState([]);
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
            Material Gate Pass
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

              <CustomInput
                placeholder="Enter Vehicle Name"
                id="mobile-no"
                value={vehiclename}
                onChange={(e) => {
                  setvehiclename(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="Vehicle No">
                Vehicle No.*
              </CustomInputLabel>

              <CustomInput
                placeholder="Enter Vehicle No."
                id="mobile-no"
                value={vehicleNO}
                onChange={(e) => {
                  setvehicleNO(e.target.value);
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
                    placeholder="Enter Full Names."
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
                    placeholder="Enter Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </>
              )}
            </Grid>

            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="vehicleType">
                Vehicle Type
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
                value={Vehicletype}
                onChange={(e) => setVehicletype(e.target.value)}
              >
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={'Please Select'}
                >
                  Please Select
                </MenuItem>
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

              {/* <CustomInput
                id="mobile-no"
                value={sadsyaType}
                onChange={(e) => {
                  setSadsyaType(e.target.value);
                }}
              /> */}
            </Grid>

            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="OrderNo">Order No.</CustomInputLabel>
              <CustomInput
                id="mobile-no"
                name="orderNo"
                value={orderNo}
                placeholder='Enter Order No'
                onChange={(e) => setorderNo(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="OrderNo">Remark</CustomInputLabel>
              <CustomInput
                id="mobile-no"
                name="remark"
                value={remark}
                placeholder='Enter Remark'
                onChange={(e) => setremark(e.target.value)}
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
              Add Items
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
                    Item Name
                  </TableCell>
                  <TableCell style={{ width: '10%' }} align="center">
                    Item No.
                  </TableCell>
                  <TableCell style={{ width: '10%' }} align="center">
                    Quantity
                  </TableCell>
                  <TableCell style={{ width: '10%' }} align="center">
                    Amount
                  </TableCell>
                  <TableCell style={{ width: '10%' }} align="center">
                    Supplier Code
                  </TableCell>
                  <TableCell style={{ width: '10%' }} align="center">
                    Supplier Name
                  </TableCell>

                  <TableCell style={{ width: '10%' }} align="center">
                    Order No.
                  </TableCell>
                  <TableCell align="center">Remark</TableCell>
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
                        value={item.ItemName}
                        onChange={(e) =>
                          handleDonationItemUpdate(
                            item,
                            'ItemName',
                            e.target.value,
                          )
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      <CustomTableInput
                        required
                        type="text"
                        value={item.ItemNo}
                        onChange={(e) =>
                          handleDonationItemUpdate(
                            item,
                            'ItemNo',
                            e.target.value,
                          )
                        }
                      />
                    </TableCell>

                    <TableCell>
                      <CustomTableInput
                        required
                        type="number"
                        value={item.Quantity}
                        onChange={(e) =>
                          handleDonationItemUpdate(
                            item,
                            'Quantity',
                            e.target.value,
                          )
                        }
                      />
                    </TableCell>

                    <TableCell>
                      <CustomTableInput
                        required
                        type="text"
                        value={item.Amount}
                        onChange={(e) =>
                          handleDonationItemUpdate(
                            item,
                            'Amount',
                            e.target.value,
                          )
                        }
                      />
                    </TableCell>

                    <TableCell>
                      <CustomTableInput
                        required
                        type="text"
                        value={item.SupplierCode}
                        onChange={(e) =>
                          handleDonationItemUpdate(
                            item,
                            'SupplierCode',
                            e.target.value,
                          )
                        }
                      />
                    </TableCell>

                    <TableCell>
                      <CustomTableInput
                        required
                        type="text"
                        value={item.SupplierName}
                        onChange={(e) =>
                          handleDonationItemUpdate(
                            item,
                            'SupplierName',
                            e.target.value,
                          )
                        }
                      />
                    </TableCell>

                    <TableCell>
                      <CustomTableInput
                        required
                        type="text"
                        value={item.OrderNo}
                        onChange={(e) =>
                          handleDonationItemUpdate(
                            item,
                            'OrderNo',
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
                            value={item.Remark}
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
