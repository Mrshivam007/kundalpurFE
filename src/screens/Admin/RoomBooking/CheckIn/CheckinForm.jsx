import React, { useState, useEffect } from 'react';
import { serverInstance } from '../../../../API/ServerInstance';
import InputBase from '@mui/material/InputBase';
import Swal from 'sweetalert2';
import { MenuItem, Select, Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import CheckAvalability from './CheckAvalability';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ReactTransliterate } from 'react-transliterate';
import { useNavigate, useLocation } from 'react-router-dom';
const addressinput = {
  width: '600px',
  height: '35px',
  fontSize: '15px',
  background: '#ffffff',
  border: '1px solid #c4bfbf',
  paddingLeft: '0.8rem',
};
const custominput = {
  width: '280px',
  padding: '10px 0px 10px 10px',
  background: '#fff',
  border: '1px solid #B8B8B8',
  height: '39px',
  borderRadius: '5px',
  fontSize: '15px',
  paddingLeft: '0.5rem',
};
const custumstyle = {
  width: '280px',
  borderRadius: 6,
  position: 'relative',
  backgroundColor: '#fcfcfb',
  border: '1px solid #C8C6D3',
  fontSize: 14,
  padding: 9.5,
};
const style = {
  position: 'absolute',
  top: '47%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
  borderRadius: '5px',
};

export const CustomInput = styled(InputBase)(({ theme }) => ({
  width: '280px',
  fontFamily: 'Poppins',
  backgroundColor: '#fff',
  borderRadius: 6,

  '& .MuiInputBase-input': {
    border: '1px solid #B8B8B8',
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

function CheckinForm({
  setOpen,
  roomDetails,
  dharamId,
  dDetails,
  cateDetails,
}) {
  const navigate = useNavigate();

  const [bankname, setbankname] = useState('');
  const [transactionid, settransactionid] = useState('');
  const [remarks, setremarks] = useState('');
  const [fetchuserdetail, setfetchuserdetail] = useState(true);
  const [formerror, setFormerror] = useState({});
  const [mainRate, setmainRate] = useState('');
  const [mainAvanceRate, setmainAvanceRate] = useState('');
  const [showprocess, setshowprocess] = useState(false);
  const [lan, setlan] = useState(false);
  const [showPayDetails, setshowPayDetails] = useState(false);
  const [Paymode, setPaymode] = useState('Cash');
  const [paymentmode, setpaymentmode] = useState(2);
  const [roomno, setroomno] = useState([]);
  const [fathers, setfathers] = useState('');
  const [showloader1, setshowloader1] = useState(false);
  const [fullname, setfullname] = useState('');
  const [email, setemail] = useState('');
  const [phoneno, setphoneno] = useState('');
  const [address, setaddress] = useState('');
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');
  const [pincode, setpincode] = useState('');
  const [idproffname, setidproffname] = useState('');
  const [idproffno, setidproffno] = useState('');
  const [staydays, setstaydays] = useState(1);
  const [maleno, setmaleno] = useState('');
  const [femaleno, setfemaleno] = useState('');
  const [Children, setChildren] = useState('');
  const [TotalMember, setTotalMember] = useState();
  const [facility, setfacility] = useState('');
  const [roomlist, setroomlist] = useState('');
  const [category, setcategory] = useState('');
  const [categoryname, setcategoryname] = useState('');
  const [dharamshalaname, setdharamshalaname] = useState('');
  const [Dharamshala, setDharamshala] = useState('');
  const [showavailability, setshowavailability] = useState(false);

  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);

  const [open1, setOpen1] = React.useState(false);
  const handleClose1 = () => setOpen1(false);
  const handleOepn1 = () => setOpen1(true);
  var options = { year: 'numeric', month: 'short', day: '2-digit' };
  var today = new Date();

  var datee = today.toISOString().substring(0, 10);
  const [date, setdate] = useState(datee);

  const [time, settime] = useState(
    today.toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }),
  );

  let currentTime = new Date(
    today.getTime() + staydays * 24 * 60 * 60 * 1000,
  ).getTime();
  let updatedTIme = new Date(currentTime + 3 * 60 * 60 * 1000);

  let result = [];
  const handlesubmit = async () => {
    setSaveButtonDisabled(true);

    try {
      let dataa = {
        dharamshalaname: dharamshalaname,
        chlidremc: Children,
        roomcount: roomno,
        cateDetails: cateDetails,
        dDetails: dDetails,
        memale: maleno,
        checkincurrDate: date,
        checkincurrTime: time,
        checkindate: new Date(today.getTime() + staydays * 24 * 60 * 60 * 1000),
        checkouttime: new Date(
          today.getTime() + staydays * 24 * 60 * 60 * 1000,
        ).toLocaleTimeString('it-IT', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }),
        dharamshala: roomlist,
        nRoom: result.length,
        roomList: result,
        days: staydays,
      };
      if (fullname && phoneno && address && idproff && idproffname) {
        setshowprocess(true);
        serverInstance('room/checkin', 'post', {
          bankName: bankname,
          transactionId: transactionid,
          remarks: remarks,
          date: today,
          time: time,
          contactNo: phoneno,
          name: fullname,
          Fname: fathers,
          email: email,
          address: address,
          city: city,
          advanceAmount: Number(mainAvanceRate)
            ? Number(staydays) > 1
              ? (Number(staydays) > 1
                  ? roomno.length * mainAvanceRate +
                    roomno.length * Number(mainRate) * Number(staydays - 1)
                  : roomno.length * mainAvanceRate) / roomno.length
              : (roomno.length * mainAvanceRate) / roomno.length
            : 0,
          state: state,
          proof: idproffname,
          idNumber: idproffno,
          male: maleno ? Number(maleno) : 0,
          female: femaleno ? Number(femaleno) : 0,
          child: Children ? Number(Children) : 0,
          dharmasala: dId ? dId : dharamshalaname,
          paymentMode: paymentmode,
          paymentStatus: paymentmode === 1 ? 1 : 0,
          modeOfBooking: 1,
          coutDate: new Date(today.getTime() + staydays * 24 * 60 * 60 * 1000),
          coutTime: new Date(updatedTIme).toLocaleTimeString('it-IT', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          }),
          nRoom: roomno.length,
          roomList: roomno,
          extraM: '',
        }).then((res) => {
          if (res.data && res.data.status === true) {
            setOpen(false);
            setshowprocess(false);
            navigate('/admin-panel/room/roombookingcetificate', {
              state: {
                data: res?.data,
                checkindata: dataa,
              },
            });
          }
          if (res.message) {
            Swal.fire('Error!', res.message, 'error');
            setshowprocess(false);
          }
        });
      }

      setTimeout(() => {
        setSaveButtonDisabled(false);
      }, 5000);
    } catch (error) {
      // Swal.fire('Error!', error, 'error');
    }
  };

  const getDonatedUserDetails = () => {
    serverInstance(`room/checkin-history-by-num/${phoneno}`, 'get').then(
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
          setidproffno(res?.data[0]?.idNumber);
        }
      },
    );
  };

  if (phoneno?.length === 10 && fetchuserdetail === true) {
    getDonatedUserDetails();
    setfetchuserdetail(false);
  }

  const [checked, setChecked] = useState([]);

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

  const getalldharamshala = () => {
    serverInstance('room/get-dharmasalas', 'get').then((res) => {
      if (res.data) {
        setDharamshala(res.data);
      }
    });
  };

  const getallfacility = () => {
    serverInstance('room/facility', 'get').then((res) => {
      if (res.data) {
        setfacility(res.data);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
    });
  };

  const getallcategory = (id) => {
    serverInstance('room/get-avail-categories', 'Post', {
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
      `room/check-room-catg?hotelName=${dharamshalaname}&category=${categoryname}&fromDate=${today}&ToDate=${new Date(
        today.getTime() + staydays * 24 * 60 * 60 * 1000,
      )}`,
      'get',
    ).then((res) => {
      console.log('roooms list', res.data);

      if (res.data) {
        setroomlist(res.data);
        setshowloader1(false);
      }
    });
  };

  const handleclick = async () => {
    setFormerror(validate());
  };

  const validate = (values) => {
    const errors = {};

    if (!fullname) {
      errors.name = 'Full name is required';
    }

    if (!phoneno) {
      errors.mobile = 'Mobile is required';
    }

    if (!address) {
      errors.address = 'Address is required';
    }

    if (!idproffno) {
      errors.idproffno = 'ID proof is required';
    }

    if (!idproffname) {
      errors.idproffname = 'ID proof name is required';
    }

    return errors;
  };

  useEffect(() => {
    getalldharamshala();
    getallfacility();
    getallcategory();
  }, [fetchuserdetail]);
  const [dId, setdId] = useState('');
  useEffect(() => {
    if (roomDetails) {
      console.log('data from checkin fomr', roomDetails);
      setdId(dharamId);
      setmainRate(roomDetails[0]?.Rate);
      setmainAvanceRate(roomDetails[0]?.advance);
      setroomno([roomDetails[0]?.RoomNo]);
    }
  }, []);

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open1}
        onClose={handleClose1}
        closeAfterTransition
      >
        <Fade in={open1}>
          <Box sx={style}>
            <div>
              <div className="add-div-close-div">
                <div>
                  <h2 style={{ marginBottom: '0.5rem' }}>Room Availability</h2>
                  <Typography variant="body2" color="primary">
                    {currDate} / {currTime}
                  </Typography>
                </div>

                <IconButton>
                  <CloseIcon onClick={() => handleClose1()} />
                </IconButton>
              </div>
              <CheckAvalability
                facility={facility}
                Dharamshala={Dharamshala}
                setOpen1={setOpen1}
              />
            </div>
          </Box>
        </Fade>
      </Modal>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          my: 2,
          ml: 2,
        }}
      >
        <Typography variant="body1">Change language:</Typography>
        <Button
          variant={lan ? 'outlined' : 'contained'}
          sx={{
            borderColor: '#C8C8C8',
            fontSize: 12,
            minWidth: 100,
            padding: 0.5,
            color: lan ? '#656565' : '#fff',
          }}
          onClick={() => setlan(false)}
        >
          Hindi
        </Button>
        <Button
          onClick={() => setlan(true)}
          variant={lan ? 'contained' : 'outlined'}
          sx={{
            borderColor: '#C8C8C8',
            fontSize: 12,
            minWidth: 100,
            padding: 0.5,
            color: lan ? '#fff' : '#656565',
          }}
        >
          English
        </Button>
      </Box>
      <div
        className="cash-donation-div"
        style={{ height: '33rem', overflowY: 'scroll', paddingTop: '32rem' }}
      >
        <>
          <div className="cash-donation-contddainer-innser">
            <div className="main_div_checkindddd_div">
              <div className="cash-donation-container-innser10">
                <>
                  <div className="date_and_time_div">
                    <div className="inpur_div_room">
                      <label htmlFor="donation-time">Date</label>
                      <CustomInput
                        disabled={true}
                        style={{ width: '80%' }}
                        type="date"
                        required
                        id="donation-time"
                        name="date"
                        value={date}
                        onChange={(e) => setdate(e.target.value)}
                      />
                    </div>

                    <div className="inpur_div_room">
                      <label htmlFor="donation-time">Time</label>
                      <CustomInput
                        disabled={true}
                        style={{ width: '100%' }}
                        id="donation-time"
                        type="time"
                        required
                        name="time"
                        value={time}
                        onChange={(e) => settime(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-div" style={{ marginBottom: '1rem' }}>
                    <div className="form-input-div_add_user">
                      <div className="inner-input-div2">
                        <label
                          style={{ marginBottom: '0.3rem' }}
                          htmlFor="rate"
                        >
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
                            value={''}
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
                        <label
                          style={{ marginBottom: '0.3rem' }}
                          htmlFor="toNo"
                        >
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
                                        type="checkbox"
                                        value={item?.RoomNo}
                                        onClick={() => {
                                          setmainRate(item?.Rate);
                                          setmainAvanceRate(item?.advance);
                                        }}
                                        onChange={(e) => {
                                          let updatedList = [...roomno];
                                          if (e.target.checked) {
                                            updatedList = [
                                              ...roomno,
                                              e.target.value,
                                            ];
                                          } else {
                                            updatedList.splice(
                                              checked.indexOf(e.target.value),
                                              1,
                                            );
                                          }
                                          setroomno(updatedList);
                                          console.log('eddd', updatedList);
                                        }}
                                      />
                                    </td>
                                    <td className="table_tddd">
                                      {item?.RoomNo}
                                    </td>
                                    <td className="table_tddd">{item?.Rate}</td>
                                    <td className="table_tddd">
                                      {item?.advance}
                                    </td>
                                    <td className="table_tddd">
                                      {item?.dharmasala &&
                                        item?.dharmasala.name}
                                    </td>

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
                </>
              </div>
              <div style={{ padding: '1rem' }}>
                <div className="minddle_div_room">
                  <div className="minddle_div_room_innear">
                    <label htmlFor="phoneno">Mobile Number</label>
                    <CustomInput
                      id="phoneno"
                      type="text"
                      name="phoneno"
                      required
                      placeholder="Enter the mobile number"
                      value={phoneno}
                      onChange={(e) => setphoneno(e.target.value)}
                    />
                    {formerror.mobile && (
                      <>
                        <p style={{ color: 'red', marginTop: '1rem' }}>
                          {formerror.mobile}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="minddle_div_room_innear">
                    {lan ? (
                      <>
                        <label htmlFor="fullname">Full Name</label>
                        <CustomInput
                          id="fullname"
                          type="text"
                          name="fullname"
                          required
                          placeholder="Enter the full name"
                          value={fullname}
                          onChange={(e) => setfullname(e.target.value)}
                        />
                        {formerror.name && (
                          <>
                            <p style={{ color: 'red', marginTop: '1rem' }}>
                              {formerror.name}
                            </p>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <label htmlFor="fullname">Full Name</label>
                        <ReactTransliterate
                          placeholder="Enter the full name"
                          style={custominput}
                          id="full-name"
                          required
                          value={fullname}
                          onChangeText={(fullname) => {
                            setfullname(fullname);
                          }}
                          onChange={(e) => setfullname(e.target.value)}
                          lang="hi"
                        />
                        {formerror.name && (
                          <>
                            <p style={{ color: 'red', marginTop: '1rem' }}>
                              {formerror.name}
                            </p>
                          </>
                        )}
                      </>
                    )}
                  </div>

                  <div className="minddle_div_room_innear">
                    {lan ? (
                      <>
                        <label htmlFor="fathers">Father's Name</label>
                        <CustomInput
                          id="fathers"
                          type="fathers"
                          name="fathers"
                          required
                          placeholder="Enter the Father's Name"
                          value={fathers}
                          onChange={(e) => setfathers(e.target.value)}
                        />
                      </>
                    ) : (
                      <>
                        <label htmlFor="fathers">Father's Name</label>
                        <ReactTransliterate
                          placeholder="Enter the Father's Name"
                          style={custominput}
                          id="full-name"
                          required
                          value={fathers}
                          onChangeText={(fathers) => {
                            setfathers(fathers);
                          }}
                          onChange={(e) => setfathers(e.target.value)}
                          lang="hi"
                        />
                      </>
                    )}
                  </div>
                </div>

                <div className="minddle_div_room">
                  <div
                    className="minddle_div_room_innear_adddress"
                    style={{ width: '100%' }}
                  >
                    {lan ? (
                      <>
                        <label htmlFor="address">Address</label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          required
                          placeholder="Enter the Address"
                          value={address}
                          onChange={(e) => setaddress(e.target.value)}
                        />

                        {formerror.address && (
                          <>
                            <p style={{ color: 'red', marginTop: '1rem' }}>
                              {formerror.address}
                            </p>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <label htmlFor="address">Address</label>

                        <ReactTransliterate
                          placeholder="Enter the Address"
                          style={addressinput}
                          id="full-name"
                          required
                          value={address}
                          onChangeText={(address) => {
                            setaddress(address);
                          }}
                          onChange={(e) => setaddress(e.target.value)}
                          lang="hi"
                        />
                        {formerror.address && (
                          <>
                            <p style={{ color: 'red', marginTop: '1rem' }}>
                              {formerror.address}
                            </p>
                          </>
                        )}
                      </>
                    )}
                  </div>

                  <div className="date_and_time_div_add">
                    <div
                      className="inpur_div_room_add"
                      style={{ marginRight: '1.1rem' }}
                    >
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        required
                        placeholder="City"
                        value={city}
                        onChange={(e) => setcity(e.target.value)}
                      />
                    </div>

                    <div
                      className="inpur_div_room_add"
                      style={{ marginRight: '1.1rem' }}
                    >
                      <label>State</label>
                      <select
                        value={state}
                        onChange={(e) => setstate(e.target.value)}
                      >
                        {statelist &&
                          statelist.map((item) => {
                            return (
                              <option
                                // sx={{
                                //   fontSize: 14,
                                // }}
                                key={item.id}
                                value={item.state}
                              >
                                {item.state}
                              </option>
                            );
                          })}
                      </select>
                    </div>

                    <div className="inpur_div_room_add">
                      <label htmlFor="pincode">Pincode</label>
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        required
                        placeholder="pincode"
                        value={pincode}
                        onChange={(e) => setpincode(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="minddle_div_room">
                  <div className="minddle_div_room_innear">
                    <label>Id Proof</label>
                    <Select
                      id="categroyname"
                      required
                      sx={{
                        width: '280px',
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
                    {formerror.idproffname && (
                      <>
                        <p style={{ color: 'red', marginTop: '1rem' }}>
                          {formerror.idproffname}
                        </p>
                      </>
                    )}
                  </div>

                  <div className="minddle_div_room_innear">
                    <label htmlFor="idproffno">Id Proof Number</label>
                    <CustomInput
                      id="idproffno"
                      type="text"
                      name="idproffno"
                      required
                      placeholder="Enter the idproff no"
                      value={idproffno}
                      onChange={(e) => setidproffno(e.target.value)}
                    />
                    {formerror.idproffno && (
                      <>
                        <p style={{ color: 'red', marginTop: '1rem' }}>
                          {formerror.idproffno}
                        </p>
                      </>
                    )}
                  </div>

                  <div className="minddle_div_room_innear">
                    <label>Stay Days</label>
                    <CustomInput
                      id="staydays"
                      type="text"
                      name="staydays"
                      required
                      placeholder="Enter the stay days"
                      value={staydays}
                      onChange={(e) => {
                        setstaydays(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="main_div_checkin_div1">
              <p>Member Details</p>
              <div className="main_Btotn_check_div">
                <div className="main_ddsh_div">
                  <div className="main_Btotn_check_div_input">
                    <label htmlFor='"maleno'>Male</label>
                    <input
                      style={{ color: 'black' }}
                      id="maleno"
                      type="text"
                      name="maleno"
                      required
                      placeholder="Male member "
                      value={maleno}
                      onChange={(e) => {
                        setmaleno(e.target.value);
                      }}
                    />
                  </div>
                  <div className="main_Btotn_check_div_input">
                    <label htmlFor="femaleno">Female</label>
                    <input
                      id="femaleno"
                      type="text"
                      name="femaleno"
                      required
                      placeholder="Female member"
                      value={femaleno}
                      onChange={(e) => setfemaleno(e.target.value)}
                    />
                  </div>
                  <div className="main_Btotn_check_div_input">
                    <label htmlFor="Children">Children</label>
                    <input
                      id="Children"
                      type="text"
                      name="Children"
                      required
                      placeholder="Children member"
                      value={Children}
                      onChange={(e) => setChildren(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <div className="number_inera_div">
                    <label htmlFor="TotalMember">Total Member</label>
                    <input
                      id="TotalMember"
                      type="text"
                      name="TotalMember"
                      required
                      placeholder="Total members"
                      value={
                        Number(Children) + Number(maleno) + Number(femaleno)
                      }
                      onChange={(e) =>
                        setTotalMember(
                          Number(Children) + Number(maleno) + Number(femaleno),
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <>
              <div style={{ marginTop: '1rem' }}>
                <span style={{ marginRight: '1rem' }}>Payment mode</span>

                <button
                  className={
                    Paymode === 'Cash'
                      ? 'cash_div_room_book'
                      : 'cash_div_room_book_disable'
                  }
                  onClick={() => {
                    setpaymentmode('');
                    setPaymode('Cash');
                    setpaymentmode(2);
                  }}
                >
                  Cash
                </button>
                <button
                  className={
                    Paymode === 'Online'
                      ? 'online_div_room_book'
                      : 'cash_div_room_book_disable'
                  }
                  onClick={() => {
                    setpaymentmode('');
                    setPaymode('Online');
                    setpaymentmode(1);
                  }}
                >
                  online
                </button>
              </div>

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
                    Room No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :
                    &nbsp;&nbsp;
                    <span className="main_show_details_divs_inear_text">
                      {roomno}
                    </span>
                  </p>
                  {/* <p>
                        Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                        <span className="main_show_details_divs_inear_text">
                          {email}
                        </span>
                      </p> */}
                  <p>
                    Mobile
                    number&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                    <span className="main_show_details_divs_inear_text">
                      {phoneno}
                    </span>
                  </p>
                  <p>
                    ID
                    Proof&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;:&nbsp;&nbsp;{' '}
                    <span className="main_show_details_divs_inear_text">
                      {idproffname}
                    </span>
                  </p>
                  <p>
                    No of
                    room&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                    <span className="main_show_details_divs_inear_text">
                      {roomno.length}
                    </span>
                  </p>
                  <p>
                    Total
                    Member&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                    <span className="main_show_details_divs_inear_text">
                      {Number(Children) + Number(maleno) + Number(femaleno)}
                    </span>
                  </p>
                </div>
                <div className="main_show_details_divs_inear10">
                  <h2>Price Summary</h2>
                  <div className="main_div_test22222">
                    <p>Rate</p>
                    <p>₹ {mainRate}.00</p>
                  </div>
                  <div className="main_div_test22222">
                    <p>Advance</p>
                    <p>₹{roomno.length * mainAvanceRate}.00</p>
                  </div>
                  <div className="main_div_test22222">
                    <p>
                      {roomno.length} Room x {staydays} Days
                    </p>
                    <p>
                      ₹
                      {Number(staydays) > 1
                        ? roomno.length *
                          Number(mainRate) *
                          Number(staydays - 1)
                        : '0'}
                      .00
                    </p>
                  </div>

                  <div className="main_div_test22222">
                    <p>Total Advance</p>

                    <input
                      style={{ width: '4rem' }}
                      type="text"
                      value={
                        Number(staydays) > 1
                          ? roomno.length * mainAvanceRate +
                            roomno.length *
                              Number(mainRate) *
                              Number(staydays - 1)
                          : roomno.length * mainAvanceRate
                      }
                      name="mainAvanceRate"
                      onChange={(e) =>
                        setmainAvanceRate(
                          e.target.value / Number(roomno.length),
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              {Paymode === 'Online' ? (
                <>
                  <div className="minddle_div_room">
                    <div className="minddle_div_room_innear">
                      <label htmlFor="phoneno">Bank Name</label>
                      <CustomInput
                        id="phoneno"
                        type="text"
                        name="phoneno"
                        required
                        placeholder="Enter the bank name"
                        value={bankname}
                        onChange={(e) => setbankname(e.target.value)}
                      />
                    </div>
                    <div className="minddle_div_room_innear">
                      <label htmlFor="phoneno">Transaction Id</label>
                      <CustomInput
                        id="phoneno"
                        type="text"
                        name="phoneno"
                        required
                        placeholder="Enter the transaction id"
                        value={transactionid}
                        onChange={(e) => settransactionid(e.target.value)}
                      />
                    </div>
                    {lan ? (
                      <>
                        <div className="minddle_div_room_innear">
                          <label htmlFor="phoneno">Remark</label>
                          <CustomInput
                            id="phoneno"
                            type="text"
                            name="phoneno"
                            required
                            placeholder="Enter the remark"
                            value={remarks}
                            onChange={(e) => setremarks(e.target.value)}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="minddle_div_room_innear">
                          <label htmlFor="phoneno">Remark</label>
                          {/* <CustomInput
                                id="phoneno"
                                type="text"
                                name="phoneno"
                                required
                                placeholder="Enter the remark"
                                value={remarks}
                                onChange={(e) => setremarks(e.target.value)}
                              /> */}
                          <ReactTransliterate
                            style={custumstyle}
                            placeholder="Enter the remark"
                            value={remarks}
                            onChangeText={(remarks) => {
                              setremarks(remarks);
                            }}
                            onChange={(e) => setremarks(e.target.value)}
                            lang="hi"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <></>
              )}
              <div
                style={{
                  marginTop: '1rem',
                  display: 'flex',
                  justifyContent: 'right',
                }}
              >
                <button
                  onClick={() => {
                    handlesubmit();

                    handleclick();
                  }}
                  className="online_div_room_bookContinue"
                  disabled={saveButtonDisabled}
                >
                  {showprocess ? (
                    <CircularProgress
                      style={{ width: '21px', height: '21px' }}
                    />
                  ) : (
                    'Save'
                  )}
                </button>
              </div>
            </>
          </div>
        </>
      </div>
    </>
  );
}

export default CheckinForm;
