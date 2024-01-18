import React, { useState, useEffect } from 'react';
import { serverInstance } from '../../../../API/ServerInstance';
import InputBase from '@mui/material/InputBase';
import { backendApiUrl } from '../../../../config/config';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MenuItem, Select, Box, Typography } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import moment from 'moment';
const style = {
  position: 'absolute',
  top: '47%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  bgcolor: 'background.paper',
  p: 3,
  boxShadow: 24,
  borderRadius: '5px',
};

export const CustomInput = styled(InputBase)(({ theme }) => ({
  width: '100%',
  fontFamily: 'Poppins',
  backgroundColor: '#fff',
  borderRadius: 6,
  '& .MuiInputBase-input': {
    border: '1px solid #B8B8B8',
    borderRadius: 6,
    width: '245px',
    fontSize: 15,
    padding: 8,
    paddingLeft: 12,
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:focus': {
      // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const statelist = [
  { id: 1, state: 'Andhra Pradesh' },
  { id: 2, state: 'Arunachal Pradesh' },
  { id: 3, state: 'Assam' },
  { id: 4, state: 'Bihar' },
  { id: 5, state: 'Chhattisgarh' },
  { id: 6, state: 'Goa' },
  { id: 7, state: 'Gujarat' },
  { id: 8, state: 'Haryana' },
  { id: 9, state: 'Himachal Pradesh' },
  { id: 10, state: 'Jammu and Kashmir' },
  { id: 11, state: 'Jharkhand' },
  { id: 12, state: 'Karnataka' },
  { id: 13, state: 'Kerala' },
  { id: 14, state: 'Madhya Pradesh' },
  { id: 15, state: 'Maharashtra' },
  { id: 16, state: 'Manipur' },
  { id: 17, state: 'Meghalaya' },
  { id: 18, state: 'Mizoram' },
  { id: 19, state: 'Nagaland' },
  { id: 20, state: 'Odisha' },
  { id: 21, state: 'Punjab' },
  { id: 22, state: 'Rajasthan' },
  { id: 23, state: 'Sikkim' },
  { id: 24, state: 'Tamil Nadu' },
  { id: 25, state: 'Telangana' },
  { id: 26, state: 'Tripura' },
  { id: 27, state: 'Uttar Pradesh' },
  { id: 28, state: 'Uttarakhand' },
  { id: 29, state: 'West Bengal' },
];

const idproff = [
  { id: 1, doc: 'Voter ID' },
  { id: 2, doc: 'Driving Licence' },
  { id: 3, doc: 'Aadhar Card' },
  { id: 4, doc: 'PAN Card' },
  { id: 5, doc: 'Other' },
];

function RoomShiftForm({ setOpen, changedata }) {
  const [dharamshalid, setdharamshalid] = useState('');
  const [dateTime, setDateTime] = useState(getCurrentDateTime());
  const [dharamshalanameroom, setdharamshalanameroom] = useState('');
  const [categoryroom, setcategoryroom] = useState('');
  const [rate, setrate] = useState('');
  const [advancerate, setadvancerate] = useState('');
  const [facilityname, setfacilityname] = useState('');
  const [bookingid, setbookingid] = useState('');
  const [roomnumber, setroomnumber] = useState('');
  const [roomlist, setroomlist] = useState('');
  const [showchangeroom, setshowchangeroom] = useState(false);
  const [category, setcategory] = useState('');
  const [categoryname, setcategoryname] = useState('');
  const [dharamshalaname, setdharamshalaname] = useState('');
  const [showloader, setshowloader] = useState(false);
  const [showloader1, setshowloader1] = useState(false);
  const [fullname, setfullname] = useState('');
  const [email, setemail] = useState('');
  const [phoneno, setphoneno] = useState('');
  const [address, setaddress] = useState('');
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');
  const [idproffname, setidproffname] = useState('');
  const [idproffnumber, setidproffnumber] = useState('');
  const [Dharamshala, setDharamshala] = useState('');
  const [open1, setOpen1] = React.useState(false);
  const handleClose1 = () => setOpen1(false);
  const handleOepn1 = () => setOpen1(true);

  console.log('changes data', changedata);

  var options = { year: 'numeric', month: 'short', day: '2-digit' };
  var today = new Date();

  var datee = today.toISOString().substring(0, 10);

  var checkindate = moment(changedata?.date).format('DD');
  var checkoutdate = moment(changedata?.coutDate).format('DD');
  var days = checkoutdate - checkindate;
  // if (days > 1) {
  //   room.roomAmount = room.roomAmount * days;
  // }

  const handlesubmit = async () => {
    try {
      console.log('click');

      const data = {
        id: changedata?.id,
        contactNo: phoneno,
        name: fullname,
        email: email,
        address: address,
        stayD: 3,
        pin: 555555,
        city: city,
        state: state,
        proof: idproffname,
        idNumber: idproffnumber,
        male: changedata?.male,
        female: changedata?.female,
        child: changedata?.child,
        dharmasala: dharamshalid ? dharamshalid : dharamshalanameroom,
        modeOfBooking: changedata?.modeOfBooking,
        RoomNo: roomnumber,
        roomAmount: Number(rate),
        advanceAmount: advancerate,
      };

      axios.defaults.headers.put[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;

      const res = await axios.put(`${backendApiUrl}room/checkin`, data);

      console.log('room shift', res);
      if (res?.data?.data?.status) {
        setOpen(false);

        Swal.fire('Great!', res.data.data.message, 'success');
      }

      if (res?.data?.data?.status === false) {
        setOpen(false);
        Swal.fire(
          'Great!',
          'Room failed to checkout (Time Limit Elapsed)',
          'success',
        );
      }
    } catch (error) {
      // Swal.fire('Error!', error, 'error');
    }
  };

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
  function getCurrentDateTime() {
    const currentDate = new Date().toISOString().substr(0, 10);
    const currentTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    return `${currentDate}  ${currentTime}`;
  }
  const getalldharamshala = () => {
    serverInstance('room/get-dharmasalas', 'get').then((res) => {
      console.log('dharmshala', res.data);
      if (res.data) {
        setDharamshala(res.data);
      }
    });
  };

  const getallcategory = (id) => {
    serverInstance('room/get-avail-categories', 'post', {
      id: id,
    }).then((res) => {
      console.log('category', res.data);
      if (res.data) {
        setcategory(res.data);
      }
    });
  };

  const checkavailability = async () => {
    setshowloader1(true);
    serverInstance(
      `room/check-room-catg?hotelName=${dharamshalaname}&category=${categoryname}&fromDate=${changedata?.date}&ToDate=${changedata?.coutDate}`,
      'get',
    ).then((res) => {
      console.log('roooms list', res.data);

      if (res.data) {
        setroomlist(res.data);
        setshowloader1(false);
      }
    });
  };

  useEffect(() => {
    getalldharamshala();
    getallcategory();
    if (changedata) {
      setbookingid(changedata?.booking_id);
      setphoneno(changedata?.contactNo);
      setfullname(changedata?.name);
      setemail(changedata?.email);
      setidproffnumber(changedata?.idNumber);
      setaddress(changedata?.address);
      setstate(changedata?.state);
      setcity(changedata?.city);
      setroomnumber(changedata?.RoomNo);
      setdharamshalanameroom(changedata?.dharmasala?.id);
      setcategoryroom(changedata?.category_name);
      setfacilityname(changedata?.facility_name);
      setrate(changedata?.roomAmount);
      setadvancerate(changedata?.advanceAmount);
    }
  }, []);

  console.log('change data ', changedata);
  return (
    <>
      {showchangeroom ? (
        <>
          <div className="cash-donation-div">
            <div className="cash-donation-container-innser10">
              <div className="form-div" style={{ marginBottom: '1rem' }}>
                <div className="form-input-div_add_user">
                  <div className="inner-input-div2">
                    <label
                      style={{ marginBottom: '0.3rem' }}
                      htmlFor="dharamshalanameroom"
                    >
                      Dharamshala
                    </label>
                    <CustomInput
                      id="dharamshalanameroom"
                      name="dharamshalanameroom"
                      placeholder="Enter Room holder Name"
                      value={dharamshalanameroom}
                      onChange={(e) => setdharamshalanameroom(e.target.value)}
                    />
                  </div>

                  <div className="inner-input-div2">
                    <label
                      style={{ marginBottom: '0.3rem' }}
                      htmlFor="roomnumber"
                    >
                      Room No
                    </label>
                    <CustomInput
                      id="roomnumber"
                      name="roomnumber"
                      placeholder="Enter  Holder Mobile No."
                      value={roomnumber}
                      onChange={(e) => setroomnumber(e.target.value)}
                    />
                  </div>

                  <div className="inner-input-div2">
                    <label
                      style={{ marginBottom: '0.3rem' }}
                      htmlFor="categoryroom"
                    >
                      Category
                    </label>
                    <CustomInput
                      id="categoryroom"
                      name="categoryroom"
                      placeholder="Enter  Hold Since"
                      value={categoryroom}
                      onChange={(e) => setcategoryroom(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="form-div" style={{ marginBottom: '1rem' }}>
                <div className="form-input-div_add_user">
                  <div className="inner-input-div2">
                    <label
                      style={{ marginBottom: '0.3rem' }}
                      htmlFor="facilityname"
                    >
                      Facility
                    </label>
                    <CustomInput
                      id="facilityname"
                      name="facilityname"
                      type="text"
                      placeholder="   Hold Remain"
                      value={facilityname}
                      onChange={(e) => setfacilityname(e.target.value)}
                    />
                  </div>

                  <div className="inner-input-div2">
                    <label style={{ marginBottom: '0.3rem' }} htmlFor="rate">
                      Room Rent
                    </label>
                    <CustomInput
                      id="rate"
                      name="rate"
                      type="text"
                      placeholder="Hold Approved By"
                      value={rate}
                      onChange={(e) => setrate(e.target.value)}
                    />
                  </div>

                  <div className="inner-input-div2">
                    <label
                      style={{ marginBottom: '0.3rem' }}
                      htmlFor="advancerate"
                    >
                      Advance Deposit
                    </label>
                    <CustomInput
                      id="advancerate"
                      name="advancerate"
                      type="text"
                      placeholder="Remarks"
                      value={advancerate}
                      onChange={(e) => setadvancerate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <p>Room Shift to</p>

              <div className="form-div" style={{ marginBottom: '1rem' }}>
                <div className="form-input-div_add_user">
                  <div className="inner-input-div2">
                    <label style={{ marginBottom: '0.3rem' }} htmlFor="rate">
                      Dharamshala
                    </label>
                    <Select
                      id="donation-type"
                      required
                      sx={{
                        width: '266px',
                        fontSize: 14,
                        '& .MuiSelect-select': {
                          // borderColor: !!formerror.donationtype ? 'red' : '',
                          padding: '10px 0px 10px 10px',
                          background: '#fff',
                        },
                      }}
                      value={dharamshalaname}
                      name="dharamshalaname"
                      onChange={(e) => {
                        setdharamshalaname(e.target.value);
                        getallcategory(e.target.value);
                      }}
                      displayEmpty
                    >
                      <MenuItem
                        sx={{
                          fontSize: 14,
                        }}
                        value=""
                      >
                        Please select
                      </MenuItem>
                      {Dharamshala
                        ? Dharamshala.map((item, index) => {
                            return (
                              <MenuItem
                                sx={{
                                  fontSize: 14,
                                }}
                                key={item?.dharmasala_id}
                                value={item?.dharmasala_id}
                              >
                                {item?.name}
                              </MenuItem>
                            );
                          })
                        : ''}
                    </Select>
                  </div>

                  <div className="inner-input-div2">
                    <label
                      style={{ marginBottom: '0.3rem' }}
                      htmlFor="advncerate"
                    >
                      Category
                    </label>
                    <Select
                      id="donation-type"
                      required
                      sx={{
                        width: '266px',
                        fontSize: 14,
                        '& .MuiSelect-select': {
                          // borderColor: !!formerror.donationtype ? 'red' : '',
                          padding: '10px 0px 10px 10px',
                          background: '#fff',
                        },
                      }}
                      value={categoryname}
                      name="categoryname"
                      onChange={(e) => setcategoryname(e.target.value)}
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
                      {category &&
                        category.map((item) => {
                          return (
                            <MenuItem
                              sx={{
                                fontSize: 14,
                              }}
                              key={item?.category_id}
                              value={item?.category_id}
                            >
                              {item?.name}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </div>

                  <div className="inner-input-div2">
                    <label style={{ marginBottom: '0.3rem' }} htmlFor="toNo">
                      &nbsp;
                    </label>
                    <button
                      onClick={() => checkavailability()}
                      className="check_babbs_btn"
                    >
                      {showloader1 ? (
                        <CircularProgress
                          style={{ width: '21px', height: '21px' }}
                        />
                      ) : (
                        ' Check Availability'
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {roomlist ? (
                <>
                  <div className="tablescrollbarss">
                    <table className="table_ddd">
                      <tbody>
                        <tr>
                          <td className="table_tddd">Booked</td>
                          <td className="table_tddd">Room No</td>
                          <td className="table_tddd">Room Rent</td>
                          <td className="table_tddd">Advance Deposit</td>
                          <td className="table_tddd">Dharamshala</td>
                          <td className="table_tddd">Category</td>
                          <td className="table_tddd">Facility</td>
                          <td className="table_tddd">Time</td>
                        </tr>
                        {roomlist &&
                          roomlist.map((item, index) => {
                            return (
                              <tr key={item?.id}>
                                <td className="table_tddd">
                                  <input
                                    type="radio"
                                    name="ssss"
                                    onClick={() => {
                                      setroomnumber(item?.RoomNo);
                                      setdharamshalanameroom(item?.name);
                                      setcategoryroom(item?.category_name);
                                      setfacilityname(item?.facility_name);
                                      setrate(item?.Rate);
                                      setadvancerate(item?.advance);
                                      setdharamshalid(item?.dharmasala_id);
                                      setdharamshalanameroom(
                                        item?.dharmasala?.name,
                                      );
                                      setcategoryroom(item?.category_name);
                                    }}
                                  />
                                </td>
                                <td className="table_tddd">{item?.RoomNo}</td>
                                <td className="table_tddd">{item?.Rate}</td>
                                <td className="table_tddd">{item?.advance}</td>
                                {item?.dharmasala && item?.dharmasala.name}
                                <td className="table_tddd">
                                  {item?.category_name}
                                </td>
                                <td className="table_tddd">
                                  {item?.facility_name.map((element) => (
                                    <span style={{ marginRight: '5px' }}>
                                      {element}
                                    </span>
                                  ))}
                                </td>
                                <td className="table_tddd">Auto</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                ''
              )}

              <div className="save-div-btn">
                <button
                  onClick={() => handlesubmit()}
                  className="save-div-btn-btn"
                >
                  Save
                </button>
                <button
                  onClick={() => setshowchangeroom(false)}
                  className="save-div-btn-btn-cancel"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="cash-donation-div">
            <div className="cash-donation-container-innser10">
              <div className="form-div" style={{ marginBottom: '1rem' }}>
                <div className="form-input-div_add_user">
                  <div className="inner-input-div2">
                    <label
                      style={{ marginBottom: '0.3rem' }}
                      htmlFor="bookingid"
                    >
                      Booking Id
                    </label>
                    <CustomInput
                      disabled={true}
                      id="bookingid"
                      name="bookingid"
                      value={bookingid}
                      onChange={(e) => setbookingid(e.target.value)}
                    />
                  </div>

                  <div className="inner-input-div2">
                    <label style={{ marginBottom: '0.3rem' }} htmlFor="toNo">
                      Check in Time
                    </label>
                    <CustomInput
                      type="text"
                      id="categoryname"
                      name="categoryname"
                      placeholder="Enter  Holder Mobile No."
                      value={dateTime}
                    />
                  </div>

                  <div className="inner-input-div2">
                    <label style={{ marginBottom: '0.3rem' }} htmlFor="phoneno">
                      Mobile number
                    </label>
                    <CustomInput
                      id="phoneno"
                      name="phoneno"
                      value={phoneno}
                      onChange={(e) => setphoneno(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="form-div" style={{ marginBottom: '1rem' }}>
                <div className="form-input-div_add_user">
                  <div className="inner-input-div2">
                    <label
                      style={{ marginBottom: '0.3rem' }}
                      htmlFor="fullname"
                    >
                      Name
                    </label>
                    <CustomInput
                      id="fullname"
                      name="fullname"
                      value={fullname}
                      onChange={(e) => setfullname(e.target.value)}
                    />
                  </div>

                  <div className="inner-input-div2">
                    <label style={{ marginBottom: '0.3rem' }} htmlFor="email">
                      Email id
                    </label>
                    <CustomInput
                      type="text"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                    />
                  </div>

                  <div className="inner-input-div2">
                    <label
                      style={{ marginBottom: '0.3rem' }}
                      htmlFor="idproffnumber"
                    >
                      Id Proof number
                    </label>
                    <CustomInput
                      type="text"
                      id="idproffnumber"
                      name="idproffnumber"
                      value={idproffnumber}
                      onChange={(e) => setidproffnumber(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="form-div" style={{ marginBottom: '1rem' }}>
                <div className="form-input-div_add_user">
                  <div className="inner-input-div2">
                    <label style={{ marginBottom: '0.3rem' }} htmlFor="address">
                      Address
                    </label>
                    <CustomInput
                      type="text"
                      id="address"
                      name="address"
                      value={address}
                      onChange={(e) => setaddress(e.target.value)}
                    />
                  </div>

                  <div className="inner-input-div2">
                    <label style={{ marginBottom: '0.3rem' }} htmlFor="state">
                      State
                    </label>
                    <CustomInput
                      type="text"
                      id="state"
                      name="state"
                      value={state}
                      onChange={(e) => setstate(e.target.value)}
                    />
                  </div>

                  <div className="inner-input-div2">
                    <label style={{ marginBottom: '0.3rem' }} htmlFor="city">
                      City
                    </label>
                    <CustomInput
                      type="text"
                      id="city"
                      name="city"
                      value={city}
                      onChange={(e) => setcity(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="save-div-btn">
                <button
                  style={{ marginRight: '2rem' }}
                  onClick={() => setOpen(false)}
                  className="save-div-btn-btn-cancel"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setshowchangeroom(true)}
                  className="save-div-btn-btn"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default RoomShiftForm;
