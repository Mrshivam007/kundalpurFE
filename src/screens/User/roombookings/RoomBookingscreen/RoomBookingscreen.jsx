import React, { useState, useEffect } from 'react';
import InputBase from '@mui/material/InputBase';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Moment from 'moment-js';
import { serverInstance } from '../../../../API/ServerInstance';
import { MenuItem, Select } from '@mui/material';
import LoadingSpinner from '../../../../components/Loading/LoadingSpinner';
import Swal from 'sweetalert2';
import './RoomBookingscreen.css';

const roomCount = [
  { id: 0, type: 0 },
  { id: 1, type: 1 },
  { id: 2, type: 2 },
  { id: 3, type: 3 },
  { id: 4, type: 4 },
  { id: 5, type: 5 },
  { id: 6, type: 6 },
  { id: 7, type: 7 },
  { id: 8, type: 8 },
  { id: 9, type: 9 },
  { id: 10, type: 10 },
  { id: 11, type: 11 },
  { id: 12, type: 12 },
  { id: 13, type: 13 },
  { id: 14, type: 14 },
  { id: 15, type: 15 },
  { id: 16, type: 16 },
  { id: 17, type: 17 },
];

const Childrencont = [
  { id: 0, type: 0 },
  { id: 1, type: 1 },
  { id: 2, type: 2 },
  { id: 3, type: 3 },
  { id: 4, type: 4 },
  { id: 5, type: 5 },
  { id: 6, type: 6 },
  { id: 7, type: 7 },
  { id: 8, type: 8 },
  { id: 9, type: 9 },
];

const malecont = [
  { id: 0, type: 0 },
  { id: 1, type: 1 },
  { id: 2, type: 2 },
  { id: 3, type: 3 },
  { id: 4, type: 4 },
  { id: 5, type: 5 },
  { id: 6, type: 6 },
  { id: 7, type: 7 },
  { id: 8, type: 8 },
  { id: 9, type: 9 },
];

const femalecont = [
  { id: 0, type: 0 },
  { id: 1, type: 1 },
  { id: 2, type: 2 },
  { id: 3, type: 3 },
  { id: 4, type: 4 },
  { id: 5, type: 5 },
  { id: 6, type: 6 },
  { id: 7, type: 7 },
  { id: 8, type: 8 },
  { id: 9, type: 9 },
];

export const CustomInput = styled(InputBase)(({ theme }) => ({
  width: '95%',
  fontFamily: 'Poppins',
  backgroundColor: '#fff',
  borderRadius: 6,
  '& .MuiInputBase-input': {
    border: '2px solid #B8B8B8',
    borderRadius: 6,
    width: '100%',
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
  { id: 5, doc: 'Other' },
];
function RoomBookingscreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const [Paymode, setPaymode] = useState('Cash');
  const [isLoading, setIsLoading] = useState(false);
  const [fetchuserdetail, setfetchuserdetail] = useState(true);
  const [formerror, setFormerror] = useState({});
  const [isData, setisData] = useState('');
  const [dharamshala, setdharamshala] = useState('');
  const [checkindata, setcheckindata] = useState('');
  const [showdata, setshowdata] = useState(false);
  const [fullname, setfullname] = useState('');
  const [fathers, setfathers] = useState('');
  const [email, setemail] = useState('');
  const [mobile, setmobile] = useState('');
  const [address, setaddress] = useState('');
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');
  const [idproffname, setidproffname] = useState('');
  const [idproffnumber, setidproffnumber] = useState('');
  const [maleno, setmaleno] = useState(0);
  const [femaleno, setfemaleno] = useState(0);
  const [childrenno, setchildrenno] = useState(0);
  const [roomno, setroomno] = useState(1);
  const [extraMattress, setextraMattress] = useState(0);

  let totalofmattress = extraMattress * 150;
  let totalRoomAmount = roomno * isData?.Rate;
  let alltotalamount = totalRoomAmount + totalofmattress;
  let totalmember = femaleno;
  let result;

  let currentTime = new Date(checkindata.checkouttime).getTime();
  let updatedTIme = new Date(currentTime + 3 * 60 * 60 * 1000);

  console.log("dddaa",checkindata)
  const savedataIntodb = async () => {
    handleclick();
    result = isData && isData?.available_room_numbers.slice(0, 1);

    if (mobile && address && fullname) {
      setIsLoading(true);
      serverInstance('room/checkin-user', 'post', {
        date: checkindata.checkintime,
        time: checkindata.checkincurrTime,
        contactNo: mobile,
        name: fullname,
        Fname: fathers,
        email: email,
        address: address,
        city: city,
        roomAmount: isData?.roomDetails?.Rate,
        state: state,
        proof: idproffname,
        idNumber: idproffnumber,
        paymentMode: 1,
        male: maleno ? Number(maleno) : 0,
        female: femaleno ? Number(femaleno) : 0,
        child: childrenno ? Number(childrenno) : 0,
        dharmasala: checkindata.dharamshalaname,
        modeOfBooking: 2,
        RoomNo: isData?.roomNumber,
        coutDate: checkindata.checkouttime,
        coutTime: new Date(updatedTIme).toLocaleTimeString('it-IT', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }),
        nRoom: roomno,
        roomList: result,
        extraM: extraMattress,
      }).then((res) => {
        if (res.data && res.data.status === true) {
          if (res.data?.data[0]?.booking_id) {
            window.location.href =
              'http://paymentkundalpur.techjainsupport.co.in/room?booking_id=' +
              res.data?.data[0]?.booking_id;
          } else {
            Swal.fire('Error!', 'Somthing went wrong!!', 'error');
          }

          if (res.message) {
            setIsLoading(false);
            Swal.fire('Error!', res.message, 'error');
          }
        }

        if (res?.code) {
          setIsLoading(false);
          Swal.fire('Error!', res.message, 'error');
        }
      });
    }
  };
  const getDonatedUserDetails = () => {
    serverInstance(`room/checkin-history-by-num/${mobile}`, 'get').then(
      (res) => {
        if (res?.data[0]) {
          setfullname(res?.data[0]?.name);
          setfathers(res?.data[0]?.Fname);
          setaddress(res?.data[0]?.address);
          setcity(res?.data[0]?.city);
          setstate(res?.data[0]?.state);
          setpincode(res?.data[0]?.state);
          setemail(res?.data[0]?.email);
          setidproffname(res?.data[0]?.proof);
        }
      },
    );
  };

  if (mobile?.length === 10 && fetchuserdetail === true) {
    getDonatedUserDetails();
    setfetchuserdetail(false);
  }
  const handleclick = async () => {
    setFormerror(validate());
    if (fullname && mobile && city && state && roomno) {
      setshowdata(true);
    }
  };
  const validate = (values) => {
    const errors = {};

    if (!fullname) {
      errors.name = 'Full name is required';
    }

    if (!mobile) {
      errors.mobile = 'Mobile is required';
    }

    if (!roomno) {
      errors.roomno = 'No of rooms is required';
    }

    if (roomno <= Number(isData?.available_rooms)) {
    } else {
      errors.roomno = `no of rooms should be less than or equal to available rooms (${isData?.available_rooms})`;
    }

    return errors;
  };

  useEffect(() => {
    if (location.state) {
      setisData(location?.state?.roomdata);
      setcheckindata(location?.state?.checkindata);
      setdharamshala(location?.state?.dhramshalaname);
    }

    if (isData?.available_rooms) {
      for (var i = 0; i < isData?.available_rooms; i++) {
        console.log(i);
      }
    }
  }, []);
  var options = { year: 'numeric', month: 'short', day: '2-digit' };
  var today = new Date(checkindata?.checkouttime);
  const currDate = today
    .toLocaleDateString('en-IN', options)
    .replace(/-/g, ' ');
  const currTime = today.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  var today1 = new Date(checkindata?.checkintime);
  const currDatecheckout = today1
    .toLocaleDateString('en-IN', options)
    .replace(/-/g, ' ');
  const currTimecheckout = today1.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  let difference = today.getTime() - today1.getTime();
  let TotalDays =
    Math.floor((today.getTime() - today1.getTime()) / (1000 * 3600 * 27)) != 0
      ? Math.floor((today.getTime() - today1.getTime()) / (1000 * 3600 * 27)) +
        1
      : 1;

  return (
    <>
      <div className="main_div_head_tyopeeeebook">
        <div className="form_div_absolutebook">
          <marquee width="100%" height="100%" style={{ color: 'red' }}>
            Room checkout Time 24 hours then per day charges applicable, Booking
            amount is not refundable - रूम चेकआउट का समय 24 घंटे रहेगा, रूम
            बुकिंग होने के पश्चात सहयोग राशि वापसी योग्य नहीं है ।
          </marquee>
          <div className="main_details_bro">
            <div>
              <p className="main_details_bro_text"> Dharamshala </p>
              <p className="main_details_bro_text1">
                {checkindata?.dharamshala}
              </p>
            </div>
            <div>
              <p className="main_details_bro_text">Room type </p>
              <p className="main_details_bro_text1">
                {isData && isData?.category_name}
              </p>
            </div>
            <div>
              <p className="main_details_bro_text">Check In </p>
              <p className="main_details_bro_text1">
                {checkindata &&
                  Moment(new Date(checkindata?.checkintime)).format(
                    'DD-MM-YYYY',
                  )}
              </p>
            </div>
            <div>
              <p className="main_details_bro_text"> Check Out </p>
              <p className="main_details_bro_text1">
                {checkindata &&
                  Moment(new Date(checkindata?.checkouttime)).format(
                    'DD-MM-YYYY',
                  )}
              </p>
            </div>
            <div>
              <p className="main_details_bro_text">Rooms For</p>
              <p className="main_details_bro_text1">
                {checkindata?.abcount} Adults , {checkindata?.roomcount} Room
              </p>
            </div>
          </div>

          <>
            <form>
              <div className="main_book_form_input_div">
                <div className="main_book_form_input_div_innear">
                  <label htmlFor="mobile">Mobile number</label>
                  <CustomInput
                    className="width_ffull"
                    type="text"
                    id="mobile"
                    name="mobile"
                    placeholder="Enter Mobile No"
                    value={mobile}
                    onChange={(e) => setmobile(e.target.value)}
                  />
                  <p style={{ color: 'red' }}>{formerror.mobile}</p>
                </div>
                <div className="main_book_form_input_div_innear">
                  <label htmlFor="fullname"> Full Name</label>
                  <CustomInput
                    className="width_ffull"
                    type="text"
                    id="fullname"
                    name="fullname"
                    placeholder="Full Name"
                    onChange={(e) => setfullname(e.target.value)}
                    value={fullname}
                  />
                  <p style={{ color: 'red' }}>{formerror.name}</p>
                </div>
                <div className="main_book_form_input_div_innear">
                  <label htmlFor="fathers">Father's name</label>
                  <CustomInput
                    className="width_ffull"
                    type="text"
                    id="fathers"
                    name="fathers"
                    placeholder="Enter Father's Name"
                    value={fathers}
                    onChange={(e) => setfathers(e.target.value)}
                  />
                  <p style={{ color: 'red' }}>{formerror.fathers}</p>
                </div>
              </div>

              <div className="main_book_form_input_div">
                <div className="main_book_form_input_div_innear">
                  <label htmlFor="address">Address</label>
                  <CustomInput
                    className="width_ffull"
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Enter Address"
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                  />
                  <p style={{ color: 'red' }}>{formerror.address}</p>
                </div>
                <div className="main_book_form_input_div_innear">
                  <label htmlFor="city">City</label>
                  <CustomInput
                    className="width_ffull"
                    type="text"
                    id="city"
                    placeholder="Enter City"
                    name="city"
                    value={city}
                    onChange={(e) => setcity(e.target.value)}
                  />
                  <p style={{ color: 'red' }}>{formerror.city}</p>
                </div>
                <div className="main_book_form_input_div_innear">
                  <label htmlFor="state">State</label>
                  <Select
                    className="width_ffull"
                    id="state"
                    required
                    sx={{
                      width: '95%',
                      fontSize: 14,
                      '& .MuiSelect-select': {
                        // borderColor: !!formerror.donationtype ? 'red' : '',
                        padding: '10px 0px 10px 10px',
                        background: '#fff',
                      },
                    }}
                    value={state}
                    name="state"
                    onChange={(e) => setstate(e.target.value)}
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
                    {statelist &&
                      statelist.map((item) => {
                        return (
                          <MenuItem
                            sx={{
                              fontSize: 14,
                            }}
                            key={item.id}
                            value={item.state}
                          >
                            {item.state}
                          </MenuItem>
                        );
                      })}
                  </Select>
                  <p style={{ color: 'red' }}>{formerror.state}</p>
                </div>
              </div>

              <div className="main_book_form_input_div">
                {/* <div className="main_book_form_input_div_innear">
                  <label htmlFor="email">Email</label>
                  <CustomInput
                    className="width_ffull"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                  <p style={{ color: 'red' }}>{formerror.email}</p>
                </div> */}

                <div className="main_book_form_input_div_innear10">
                  <div className="inpur_div_room_add">
                    <label htmlFor="city">Male</label>
                    <select
                      name="maleno"
                      value={maleno}
                      onChange={(e) => setmaleno(e.target.value)}
                    >
                      {malecont &&
                        malecont.map((item) => {
                          return (
                            <option
                              // sx={{
                              //   fontSize: 14,
                              // }}
                              key={item.id}
                              value={item.type}
                            >
                              {item.type}
                            </option>
                          );
                        })}
                    </select>
                    <p style={{ color: 'red' }}>{formerror.maleno}</p>
                  </div>
                  <div
                    className="inpur_div_room_add"
                    style={{ marginLeft: '13%' }}
                  >
                    <label>Female</label>
                    <select
                      name="femaleno"
                      value={femaleno}
                      onChange={(e) => setfemaleno(e.target.value)}
                    >
                      {femalecont &&
                        femalecont.map((item) => {
                          return (
                            <option key={item.id} value={item.type}>
                              {item.type}
                            </option>
                          );
                        })}
                    </select>
                    <p style={{ color: 'red' }}>{formerror.femaleno}</p>
                  </div>
                  <div
                    style={{ marginLeft: '13%' }}
                    className="inpur_div_room_add"
                  >
                    <label htmlFor="pincode">Children</label>
                    <select
                      name="childrenno"
                      value={childrenno}
                      onChange={(e) => setchildrenno(e.target.value)}
                    >
                      {Childrencont &&
                        Childrencont.map((item) => {
                          return (
                            <option key={item.id} value={item.type}>
                              {item.type}
                            </option>
                          );
                        })}
                    </select>
                    <p style={{ color: 'red' }}>{formerror.childrenno}</p>
                  </div>
                </div>

                {console.log(isData?.available_rooms)}
                <div className="main_book_form_input_div_innear">
                  {/* <label htmlFor="roomno">No of room</label> */}
                  {/* <input
                      type="number"
                      value={roomno}
                      name="roomno"
                      disabled={true}
                    /> */}
                  {/* <CustomInput
                    className="width_ffull"
                    id="city"
                    placeholder="Enter city"
                    type="number"
                    value={roomno}
                    name="roomno"
                    disabled={true}
                  /> */}
                  {/* <Select
                      className="width_ffull"
                      id="roomno"
                      required
                      sx={{
                        width: '95%',
                        fontSize: 14,
                        '& .MuiSelect-select': {
                          // borderColor: !!formerror.donationtype ? 'red' : '',
                          padding: '10px 0px 10px 10px',
                          background: '#fff',
                        },
                      }}
                      value={roomno}
                      name="roomno"
                      onChange={(e) => setroomno(e.target.value)}
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

                      {roomCount &&
                        roomCount.map((item) => {
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
                    </Select> */}
                  <p style={{ color: 'red' }}>{formerror.roomno}</p>
                </div>
              </div>

              <div className="main_book_form_input_div">
                <div className="main_book_form_input_div_innear">
                  <label>ID Proof</label>
                  <Select
                    className="width_ffull"
                    id="categroyname"
                    required
                    sx={{
                      width: '95%',
                      fontSize: 14,
                      '& .MuiSelect-select': {
                        // borderColor: !!formerror.donationtype ? 'red' : '',
                        padding: '10px 0px 10px 10px',
                        background: '#fff',
                      },
                    }}
                    value={idproffname}
                    name="idproffname"
                    onChange={(e) => setidproffname(e.target.value)}
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
                    {idproff &&
                      idproff.map((item) => {
                        return (
                          <MenuItem
                            sx={{
                              fontSize: 14,
                            }}
                            key={item.id}
                            value={item.doc}
                          >
                            {item.doc}
                          </MenuItem>
                        );
                      })}
                  </Select>
                  <p style={{ color: 'red' }}>{formerror.idproffname}</p>
                </div>
                <div className="main_book_form_input_div_innear">
                  <label htmlFor="idproffnumber">ID Number</label>
                  <CustomInput
                    className="width_ffull"
                    type="text"
                    id="idproffnumber"
                    name="idproffnumber"
                    placeholder="Enter Id Number"
                    value={idproffnumber}
                    onChange={(e) => setidproffnumber(e.target.value)}
                  />
                  <p style={{ color: 'red' }}>{formerror.idproffnumber}</p>
                </div>

                <div style={{ width: '30%' }}>&nbsp;</div>
              </div>
            </form>

            {/* <div className="Mattress_main_div">
                <h2> Extra Mattress</h2>
                <p>Exter charge (₹150 per mattress) </p>

                <div className="main_div_need_mattress">
                  <p>Need extra mattress</p>
                  <Select
                    id="extraMattress"
                    required
                    sx={{
                      width: '60px',
                      fontSize: 14,
                      '& .MuiSelect-select': {
                        // borderColor: !!formerror.donationtype ? 'red' : '',
                        padding: '10px 0px 10px 10px',
                        background: '#fff',
                      },
                    }}
                    value={extraMattress}
                    name="extraMattress"
                    onChange={(e) => setextraMattress(e.target.value)}
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
                    {roomCount &&
                      roomCount.map((item) => {
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
                </div>
              </div> */}
            {/* 
              <div className="proces_btn_main_div">
                <div>
                  <button onClick={() => handleclick()} className="Proceed_btn">
                    Proceed To Check
                  </button>
                  <button
                    onClick={() => navigate(-1)}
                    className="Proceed_btn_go"
                  >
                    Go Back
                  </button>
                </div>
              </div> */}
          </>

          <>
            <div className="main_show_details_divs">
              <div className="main_show_details_divs_inear">
                <h2>Guest Details</h2>

                <p>
                  Full Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :
                  &nbsp;&nbsp;
                  <span className="main_show_details_divs_inear_text">
                    {fullname}
                  </span>
                </p>
                <p>
                  Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                  <span className="main_show_details_divs_inear_text main_show_details_divs_inear_text10">
                    {email}
                  </span>
                </p>
                <p>
                  Mobile
                  number&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                  <span className="main_show_details_divs_inear_text">
                    {mobile}
                  </span>
                </p>
                <p>
                  ID
                  Proof&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;:&nbsp;&nbsp;{' '}
                  <span className="main_show_details_divs_inear_text">
                    {idproffname}
                  </span>
                </p>
                <p>
                  No of
                  room&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                  <span className="main_show_details_divs_inear_text">
                    {roomno}
                  </span>
                </p>
                <p>
                  Total
                  Member&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                  <span className="main_show_details_divs_inear_text">
                    {Number(femaleno) + Number(maleno) + Number(childrenno)}
                  </span>
                </p>
              </div>
              <div className="main_show_details_divs_inear10">
                <h2>Price Summary</h2>
                <div className="main_div_test22222">
                  <p>rate</p>
                  <p> ₹ {isData?.roomDetails?.Rate} </p>
                </div>

                <div className="main_div_test22222">
                  <p>
                    {roomno} Room x {TotalDays} days
                  </p>

                  <p> ₹ {roomno * isData?.roomDetails?.Rate * TotalDays} </p>
                </div>
                <div className="main_div_test22222">
                  <p>Payable Amount</p>

                  <p> ₹ {roomno * isData?.roomDetails?.Rate * TotalDays} </p>
                </div>

                <div className="now_payment_gateway_div">
                  <button onClick={() => savedataIntodb()}>
                    Proceed To Payment Options
                  </button>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
      {isLoading ? <LoadingSpinner /> : <></>}
    </>
  );
}

export default RoomBookingscreen;
