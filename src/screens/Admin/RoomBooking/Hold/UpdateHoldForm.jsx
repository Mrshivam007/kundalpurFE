import React, { useState, useEffect } from 'react';
import { serverInstance } from '../../../../API/ServerInstance';
import InputBase from '@mui/material/InputBase';
import { backendApiUrl } from '../../../../config/config';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ReactTransliterate } from 'react-transliterate';
import axios from 'axios';
import Swal from 'sweetalert2';
import Moment from 'moment-js';
import moment from 'moment';
import { Box, Button, MenuItem, Select, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import './Holdform.css';
const custominput = {
  width: '280px',
  padding: '10px 0px 10px 10px',
  background: '#fff',
  border: '1px solid #B8B8B8',
  height: '39px',
  borderRadius: '5px',
  fontSize: '15px',
  paddingLeft: '0.5rem',
  color: 'gray',
};
export const CustomInput = styled(InputBase)(({ theme }) => ({
  width: '280px',
  fontFamily: 'Poppins',
  backgroundColor: '#fff',
  borderRadius: 6,
  '& .MuiInputBase-input': {
    border: '1px solid #B8B8B8',
    borderRadius: 6,
    width: '265',
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
function UpdateHoldForm({ setOpen, data }) {
  const [isdata, setisdata] = useState('');
  const [lan, setlan] = useState(false);
  const [roomnumber, setroomnumber] = useState('');
  const [roomlist, setroomlist] = useState('');
  const [Dharamshala, setDharamshala] = useState('');
  const [category, setcategory] = useState('');
  const [dharamshalaname, setdharamshalaname] = useState('');
  const [holdername, setholdername] = useState('');
  const [holdermobile, setholdermobile] = useState('');
  const [holdsince, setholdsince] = useState('');
  const [holdremain, setholdremain] = useState('');
  const [holdaprodeBy, setholdaprodeBy] = useState('');
  const [remarks, setremarks] = useState('');
  const [categoryname, setcategoryname] = useState('');
  const [showloader, setshowloader] = useState(false);
  const [upid, setupid] = useState('');
  const [showloader1, setshowloader1] = useState(false);
  var today = new Date(holdremain);
  const remainDate = Moment(today).format('YYYY/DD/MM');
  const remainTime = moment(today, 'HH:mm').format('hh:mm');

  var today1 = new Date(holdsince);
  const sinceDate = Moment(today1).format('YYYY/DD/MM');
  const sinceTime = moment(today1, 'HH:mm').format('hh:mm');
  const handlesubmit = async () => {
    try {
      axios.defaults.headers.put[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;
      const data = {
        id: upid,
        name: holdername,
        mobile: holdermobile,
        since: holdsince,
        sinceTime: sinceTime,
        remainTime: remainTime,
        remain: holdremain,
        approvedBy: holdaprodeBy,
        remarks: remarks,
      };

      const res = await axios.put(`${backendApiUrl}room/hold`, data);
      if (res.data.data.status) {
        setOpen(false);
        setshowloader(false);
        Swal.fire('Great!', res.data.data.message, 'success');
      }

      if (res.data.data.status === false) {
        setOpen(false);
        setshowloader(false);
        Swal.fire('Error!', res.data.data.message, 'success');
      }
      console.log(res);
    } catch (error) {
      setOpen(false);
      setshowloader(false);
      Swal.fire('Error!', error, 'error');

      console.log(error);
    }
  };
  const getalldharamshala = () => {
    serverInstance('room/get-dharmasalas', 'get').then((res) => {
      if (res.data) {
        setDharamshala(res.data);
      }
    });
  };

  const getallcategory = (id) => {
    serverInstance('room/get-avail-categories', 'post', {
      id: id,
    }).then((res) => {
      if (res.data) {
        setcategory(res.data);
      }
    });
  };

  const checkavailability = async () => {
    setshowloader1(true);
    serverInstance(
      `room/check-room-catg?hotelName=${dharamshalaname}&category=${categoryname}&fromDate=${holdsince}&ToDate=${holdremain}`,
      'get',
    ).then((res) => {
      console.log('roooms list', res.data);

      if (res.data) {
        setroomlist(res.data);
        setshowloader1(false);
      }
    });
  };

  console.log('room no', roomnumber);
  useEffect(() => {
    getalldharamshala();
    getallcategory();

    if (data) {
      setholdermobile(data?.mobile);
      setholdername(data?.name);
      setholdaprodeBy(data?.approvedBy);
      setholdremain(new Date(data?.remain).toISOString().slice(0, 16));

      setholdsince(new Date(data?.since).toISOString().slice(0, 16));
      setremarks(data?.remarks);
      setupid(data?.id);
      console.log('ss', data);
    }
  }, []);

  return (
    <>
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
      <div className="cash-donation-div">
        <div className="cash-donation-container-innser">
          <div className="form-div" style={{ marginBottom: '1rem' }}>
            <div className="form-input-div_add_user">
              <div className="inner-input-div2">
                <label
                  style={{ marginBottom: '0.3rem' }}
                  htmlFor="holdermobile"
                >
                  Holder Mobile No.
                </label>
                <CustomInput
                  id="holdermobile"
                  name="holdermobile"
                  placeholder="Enter  Holder Mobile No."
                  value={holdermobile}
                  onChange={(e) => setholdermobile(e.target.value)}
                />
              </div>
              {lan ? (
                <>
                  <div className="inner-input-div2">
                    <label
                      style={{ marginBottom: '0.3rem' }}
                      htmlFor="holdername"
                    >
                      Room holder Name
                    </label>
                    <CustomInput
                      id="holdername"
                      name="holdername"
                      placeholder="Enter Room holder Name"
                      value={holdername}
                      onChange={(e) => setholdername(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="inner-input-div2">
                    <label
                      style={{ marginBottom: '0.3rem' }}
                      htmlFor="holdername"
                    >
                      Room holder Name
                    </label>
                    <ReactTransliterate
                      placeholder="Enter Room holder Name"
                      style={custominput}
                      id="full-name"
                      required
                      value={holdername}
                      onChangeText={(holdername) => {
                        setholdername(holdername);
                      }}
                      onChange={(e) => setholdername(e.target.value)}
                      lang="hi"
                    />
                  </div>
                </>
              )}

              <div className="inner-input-div2">
                <label
                  style={{ marginBottom: '0.3rem' }}
                  htmlFor="donation-time"
                >
                  Hold Since
                </label>
                <CustomInput
                  id="donation-time"
                  name="holdsince"
                  type="datetime-local"
                  placeholder="Hold Remain"
                  value={holdsince}
                  onChange={(e) => setholdsince(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="form-div" style={{ marginBottom: '1rem' }}>
            <div className="form-input-div_add_user">
              <div className="inner-input-div2">
                <label
                  style={{ marginBottom: '0.3rem' }}
                  htmlFor="donation-time"
                >
                  Hold Remain
                </label>
                <CustomInput
                  id="donation-time"
                  name="holdremain"
                  type="datetime-local"
                  placeholder="Hold Remain"
                  value={holdremain}
                  onChange={(e) => {
                    setholdremain(e.target.value);
                    console.log(e.target.value);
                  }}
                />
              </div>

              {lan ? (
                <>
                  <div className="inner-input-div2">
                    <label
                      style={{ marginBottom: '0.3rem' }}
                      htmlFor="holdaprodeBy"
                    >
                      Hold Approved By
                    </label>
                    <CustomInput
                      id="holdaprodeBy"
                      name="holdaprodeBy"
                      type="text"
                      placeholder="Hold Approved By"
                      value={holdaprodeBy}
                      onChange={(e) => setholdaprodeBy(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="inner-input-div2">
                    <label
                      style={{ marginBottom: '0.3rem' }}
                      htmlFor="holdername"
                    >
                      Hold Approved By
                    </label>
                    <ReactTransliterate
                      placeholder="Hold Approved By"
                      style={custominput}
                      id="full-name"
                      required
                      value={holdaprodeBy}
                      onChangeText={(holdaprodeBy) => {
                        setholdaprodeBy(holdaprodeBy);
                      }}
                      onChange={(e) => setholdaprodeBy(e.target.value)}
                      lang="hi"
                    />
                  </div>
                </>
              )}

              {lan ? (
                <>
                  <div className="inner-input-div2">
                    <label style={{ marginBottom: '0.3rem' }} htmlFor="remarks">
                      Remarks
                    </label>
                    <CustomInput
                      id="remarks"
                      name="remarks"
                      type="text"
                      placeholder="Remarks"
                      value={remarks}
                      onChange={(e) => setremarks(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="inner-input-div2">
                    <label
                      style={{ marginBottom: '0.3rem' }}
                      htmlFor="holdername"
                    >
                      Remarks
                    </label>
                    <ReactTransliterate
                      placeholder="Remarks"
                      style={custominput}
                      id="full-name"
                      required
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
                          <tr>
                            <td className="table_tddd">
                              <input
                                type="radio"
                                name="anil"
                                onClick={() => setroomnumber(item?.RoomNo)}
                              />
                            </td>
                            <td className="table_tddd">{item?.RoomNo}</td>
                            <td className="table_tddd">{item?.Rate}</td>
                            <td className="table_tddd">{item?.advance}</td>
                            <td className="table_tddd">
                              {item?.dharmasala && item?.dharmasala.name}
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
          <div className="save-div-btn">
            <button onClick={() => handlesubmit()} className="save-div-btn-btn">
              {showloader ? (
                <CircularProgress style={{ width: '21px', height: '21px' }} />
              ) : (
                'Save'
              )}
            </button>
            <button
              onClick={() => setOpen(false)}
              className="save-div-btn-btn-cancel"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateHoldForm;
