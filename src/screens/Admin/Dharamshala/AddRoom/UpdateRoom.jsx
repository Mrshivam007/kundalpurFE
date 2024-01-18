import React, { useState, useEffect } from 'react';
import { serverInstance } from '../../../../API/ServerInstance';
import InputBase from '@mui/material/InputBase';
import { backendApiUrl, backendUrl } from '../../../../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';
import camera from '../../../../assets/camera.png';
import './AddRoom.css';
import { MenuItem, Select } from '@mui/material';
import { styled } from '@mui/material/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
const formData = new FormData();

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
function UpdateRoom({ setOpen, updatedata }) {
  const [showprocess, setshowprocess] = useState(false);
  const [showsaveimg, setshowsaveimg] = useState(false);
  const [facility, setfacility] = useState('');
  const [Dharamshala, setDharamshala] = useState('');
  const [category, setcategory] = useState('');
  const [dharamshalaname, setdharamshalaname] = useState('');
  const [facilityname, setfacilityname] = useState([]);
  const [rate, setrate] = useState('');
  const [advncerate, setadvncerate] = useState('');
  const [checkout, setcheckout] = useState('');
  const [roomtype, setroomtype] = useState(0);
  const [categroyname, setcategroyname] = useState([]);
  const [fromroomno, setfromroomno] = useState('');
  const [toroomno, settoroomno] = useState('');
  const [img1, setimg1] = useState('');
  const [img2, setimg2] = useState('');
  const [img3, setimg3] = useState('');
  const [img4, setimg4] = useState('');
  const [previewprofile1, setpreviewprofile1] = useState('');
  const [previewprofile2, setpreviewprofile2] = useState('');
  const [previewprofile3, setpreviewprofile3] = useState('');
  const [previewprofile4, setpreviewprofile4] = useState('');

  console.log('updated data is now ', updatedata);
  const handlesubmit = async () => {
    try {
      setshowprocess(true);
      formData.set('id', updatedata?.room_id);
      formData.set('Rate', rate);
      formData.set(
        'dharmasala_id',
        dharamshalaname
          ? dharamshalaname
          : updatedata?.dharmasala?.dharmasala_id,
      );
      formData.set('category_id', JSON.stringify(categroyname));
      formData.set('FroomNo', fromroomno);
      formData.set('TroomNo', toroomno);
      formData.set('advance', advncerate);
      formData.set('type', roomtype);
      formData.set('facility_id', JSON.stringify(facilityname));
      formData.set('coTime', parseInt(checkout));
      formData.set('image1', img1);
      formData.set('image2', img2);
      formData.set('image3', img3);
      formData.set('image4', img4);

      axios.defaults.headers.put[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;

      const res = await axios.put(`${backendApiUrl}room`, formData);

      if (res.data.data.status === true) {
        setOpen(false);
        setshowprocess(false);
        Swal.fire('Great!', res.data.data.message, 'success');
      }
      if (res.data.data.status === false) {
        setOpen(false);
        setshowprocess(false);
        Swal.fire('Great!', res.data.data.message, 'success');
      }
    } catch (error) {
      setOpen(false);
      setshowprocess(false);
      Swal.fire('Error!', error, 'error');
    }
  };

  const getalldharamshala = () => {
    serverInstance('room/dharmashala', 'get').then((res) => {
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

  const getallcategory = () => {
    serverInstance('room/category', 'get').then((res) => {
      if (res.data) {
        setcategory(res.data);
      }
    });
  };

  useEffect(() => {
    getalldharamshala();
    getallfacility();
    getallcategory();
    if (updatedata) {
      setfromroomno(updatedata?.FroomNo);
      settoroomno(updatedata?.TroomNo);
      setrate(updatedata?.Rate);
      setadvncerate(updatedata?.advance);
      setimg1(updatedata?.image1);
      setimg2(updatedata?.image2);
      setimg3(updatedata?.image3);
      setimg4(updatedata?.image4);
      setcheckout(updatedata?.coTime);
      setroomtype(updatedata?.roomType);
      setcheckout(updatedata?.coTime);
      setcategroyname(updatedata?.category_id),
        setfacilityname(updatedata?.facility_id);
      // setdharamshalaname(updatedata?.dharmasala?.dharmasala_id);
      console.log(updatedata?.dharmasala?.name);
    }
  }, []);

  return (
    <>
      <div className="cash-donation-div">
        <div className="cash-donation-container-innser">
          {showsaveimg ? (
            <>
              <div>
                <p>Add room image</p>
                <div className="man_imgsss_div">
                  <div>
                    <div className="man_imgsss_div_inearr">
                      <div className="main_img_divvvvrooomimgs">
                        <img
                          className="dharamshala_imgggg"
                          src={
                            previewprofile1
                              ? previewprofile1
                              : img1
                              ? `${backendUrl}uploads/images/${img1}`
                              : camera
                          }
                        />
                      </div>
                    </div>
                    <div className="seee_dhhfdsh">
                      <label>Image 1</label>
                      <input
                        type="file"
                        onChange={(e) => {
                          setimg1(e.target.files[0]);
                          setpreviewprofile1(
                            URL.createObjectURL(e.target.files[0]),
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="man_imgsss_div_inearr">
                      <div className="main_img_divvvvrooomimgs">
                        <img
                          className="dharamshala_imgggg"
                          src={
                            previewprofile2
                              ? previewprofile2
                              : img2
                              ? `${backendUrl}uploads/images/${img2}`
                              : camera
                          }
                        />
                      </div>
                    </div>
                    <div className="seee_dhhfdsh">
                      <label>Image 2</label>
                      <input
                        type="file"
                        onChange={(e) => {
                          setimg2(e.target.files[0]);
                          setpreviewprofile2(
                            URL.createObjectURL(e.target.files[0]),
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="man_imgsss_div_inearr">
                      <div className="main_img_divvvvrooomimgs">
                        <img
                          className="dharamshala_imgggg"
                          src={
                            previewprofile3
                              ? previewprofile3
                              : img3
                              ? `${backendUrl}uploads/images/${img3}`
                              : camera
                          }
                        />
                      </div>
                    </div>
                    <div className="seee_dhhfdsh">
                      <label>Image 3</label>
                      <input
                        type="file"
                        onChange={(e) => {
                          setimg3(e.target.files[0]);
                          setpreviewprofile3(
                            URL.createObjectURL(e.target.files[0]),
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="man_imgsss_div_inearr">
                      <div className="main_img_divvvvrooomimgs">
                        <img
                          className="dharamshala_imgggg"
                          src={
                            previewprofile4
                              ? previewprofile4
                              : img4
                              ? `${backendUrl}uploads/images/${img4}`
                              : camera
                          }
                        />
                      </div>
                    </div>

                    <div className="seee_dhhfdsh">
                      <label>Image 4</label>
                      <input
                        type="file"
                        onChange={(e) => {
                          setimg4(e.target.files[0]);
                          setpreviewprofile4(
                            URL.createObjectURL(e.target.files[0]),
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="save-div-btn">
                <button
                  style={{ marginRight: '1rem' }}
                  onClick={() => setshowsaveimg(false)}
                  className="save-div-btn-btn-cancel"
                >
                  Back
                </button>
                <button
                  onClick={() => handlesubmit()}
                  className="save-div-btn-btn"
                >
                  {showprocess ? (
                    <CircularProgress
                      style={{ width: '21px', height: '21px' }}
                    />
                  ) : (
                    'Update'
                  )}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="form-div" style={{ marginBottom: '1rem' }}>
                <div className="form-input-div_add_user">
                  <div className="inner-input-div2">
                    <label style={{ marginBottom: '0.3rem' }} htmlFor="fromNo">
                      Dharamshala
                    </label>
                    <Select
                      id="donation-type"
                      required
                      sx={{
                        width: '280px',
                        fontSize: 14,
                        '& .MuiSelect-select': {
                          padding: '10px 0px 10px 10px',
                          background: '#fff',
                        },
                      }}
                      value={dharamshalaname}
                      name="dharamshalaname"
                      onChange={(e) => setdharamshalaname(e.target.value)}
                      displayEmpty
                    >
                      <MenuItem
                        sx={{
                          fontSize: 14,
                        }}
                        value={''}
                      >
                        {updatedata?.dharmasala?.name}
                      </MenuItem>
                      {Dharamshala &&
                        Dharamshala.map((item) => {
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
                        })}
                    </Select>
                  </div>
                  <div className="inner-input-div2">
                    <label style={{ marginBottom: '0.3rem' }} htmlFor="toNo">
                      Facilities
                    </label>
                    <Select
                      multiple
                      id="donation-type"
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
                      value={facilityname}
                      name="facilityname[]"
                      onChange={(e) => setfacilityname(e.target.value)}
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
                      {facility &&
                        facility.map((item) => {
                          return (
                            <MenuItem
                              sx={{
                                fontSize: 14,
                              }}
                              key={item.facility_id}
                              value={item.facility_id}
                            >
                              {item.name}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </div>

                  <div className="inner-input-div2">
                    <label
                      style={{ marginBottom: '0.3rem' }}
                      htmlFor="categroyname"
                    >
                      Category
                    </label>
                    <Select
                      multiple
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
                      value={categroyname}
                      name="categroyname[]"
                      onChange={(e) => setcategroyname(e.target.value)}
                      displayEmpty
                    >
                      <MenuItem
                        sx={{
                          fontSize: 14,
                        }}
                        value={'Please select'}
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
                              key={item.category_id}
                              value={item.category_id}
                            >
                              {item.name}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </div>
                </div>
              </div>
              <div className="form-div" style={{ marginBottom: '1rem' }}>
                <div className="form-input-div_add_user">
                  <div className="inner-input-div2">
                    <label
                      style={{ marginBottom: '0.3rem' }}
                      htmlFor="fromroomno"
                    >
                      From Room Range
                    </label>
                    <CustomInput
                      id="fromroomno"
                      name="fromroomno"
                      placeholder="Enter the from range"
                      value={fromroomno}
                      onChange={(e) => setfromroomno(e.target.value)}
                    />
                  </div>
                  <div className="inner-input-div2">
                    <label
                      style={{ marginBottom: '0.3rem' }}
                      htmlFor="toroomno"
                    >
                      To Room Range
                    </label>
                    <CustomInput
                      id="toroomno"
                      name="toroomno"
                      placeholder="Enter the to room range"
                      value={toroomno}
                      onChange={(e) => settoroomno(e.target.value)}
                    />
                  </div>
                  <div className="inner-input-div2">
                    <label
                      style={{ marginBottom: '0.3rem' }}
                      htmlFor="donation-time"
                    >
                      Check Out Time
                    </label>
                    <CustomInput
                      type="Text"
                      id="donation-time"
                      name="checkout"
                      placeholder="Enter Check Out Time "
                      value={checkout}
                      onChange={(e) => setcheckout(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="form-div" style={{ marginBottom: '1rem' }}>
                <div className="form-input-div_add_user">
                  <div className="inner-input-div2">
                    <label style={{ marginBottom: '0.3rem' }} htmlFor="toNo">
                      Room Price
                    </label>
                    <CustomInput
                      id="rate"
                      name="rate"
                      placeholder="Enter the rate"
                      value={rate}
                      onChange={(e) => setrate(e.target.value)}
                    />
                  </div>

                  <div className="inner-input-div2">
                    <label
                      style={{ marginBottom: '0.3rem' }}
                      htmlFor="advncerate"
                    >
                      Advance Amount
                    </label>
                    <CustomInput
                      id="advncerate"
                      name="advncerate"
                      placeholder="Enter the rate"
                      value={advncerate}
                      onChange={(e) => setadvncerate(e.target.value)}
                    />
                  </div>
                  <div className="inner-input-div2">
                    <label
                      style={{ marginBottom: '0.3rem' }}
                      htmlFor="roomtype"
                    >
                      Mode
                    </label>
                    <Select
                      id="roomtype"
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
                      value={roomtype}
                      name="roomtype"
                      onChange={(e) => setroomtype(e.target.value)}
                      displayEmpty
                    >
                      <MenuItem
                        sx={{
                          fontSize: 14,
                        }}
                        value={0}
                      >
                        Online
                      </MenuItem>
                      <MenuItem
                        sx={{
                          fontSize: 14,
                        }}
                        value={1}
                      >
                        Offline
                      </MenuItem>
                      <MenuItem
                        sx={{
                          fontSize: 14,
                        }}
                        value={2}
                      >
                        Both
                      </MenuItem>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="save-div-btn">
                <button
                  style={{ marginRight: '1rem' }}
                  onClick={() => setOpen(false)}
                  className="save-div-btn-btn-cancel"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setshowsaveimg(true)}
                  className="save-div-btn-btn"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default UpdateRoom;
