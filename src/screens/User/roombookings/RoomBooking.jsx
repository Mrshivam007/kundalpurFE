import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import homee from '../../../assets/homee.jpeg';
import DharamshalaCard from './AllAcards/DharamshalaCard';
import ServicesandFacilities from './Services&Facilities/ServicesandFacilities';
import { serverInstance } from '../../../API/ServerInstance';
import Moment from 'moment-js';
import moment from 'moment';
import { MenuItem, Menu, Select, Button } from '@mui/material';
import { backendApiUrl, backendUrl } from '../../../config/config';
import RoomCard1 from '../roombookings/AllAcards/RoomCard1';
import LoadingSpinner from '../../../components/Loading/LoadingSpinner';
import axios from 'axios';
import './RoomBooking.css';
import { width } from '@mui/system';
const styles = {
  height: '26px',
  border: 'none',
  left: '458px',
  top: '163px',
  background: 'linear-gradient(180deg, #F2EEEB 0%, #EDEDED 100%)',
  borderRadius: '3px',
};

export const CustomInput = styled(InputBase)(({ theme }) => ({
  width: '100%',
  height: '26px',
  paddingLeft: '0.5rem',
  background: 'linear-gradient(180deg, #F2EEEB 0%, #EDEDED 100%);',
  fontFamily: 'Poppins',
  backgroundColor: '#fff',
  borderRadius: 6,
  '& .MuiInputBase-input': {
    borderRadius: 6,
    width: '100%',
    height: '26px',
    fontSize: 15,

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

const roomCount = [
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
const AdultsAount = [
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

const Childrencont = [
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

function RoomBooking({ setroomfilterdata }) {
  const [minDateTime, setMinDateTime] = useState(
    new Date()?.toISOString().slice(0, 16),
  );

  const [maxdatecheckin, setmaxdatecheckin] = useState();
  // new Date(5 * 24 * 60 * 60 * 1000)?.toISOString().slice(0, 16),

  console.log('max date is ', new Date()?.toISOString().slice(0, 16));
  const [applyshow, setapplyshow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showresuilt, setshowresuilt] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [filterdata, setfilterdata] = useState('');
  const [dharamshalalist, setdharamshalalist] = useState('');
  const [dharamshalaname, setdharamshalaname] = useState('Select');
  const [chlidremc, setchlidremc] = useState(0);
  const [abcount, setabcount] = useState(0);
  const [roomcount, setroomcount] = useState(0);
  const [checkouttime, setcheckouttime] = useState('');
  const [checkintime, setcheckintime] = useState('');

  const [date, setDate] = useState('');
  
  async function getCorrectTime() {
    try {
      const response = await fetch('https://worldtimeapi.org/api/ip');
      const data = await response.json();
      // return new Date(data.utc_datetime);
      console.log("date is date",data);
      setDate(data);
    } catch (error) {
      console.error('Error fetching time:', error);
      return new Date(); // Return local time if external source is unavailable
    }
  }

  var today = new Date(checkouttime);

  const checkoutcurrDate = Moment(today).format('YYYY-MM-DD');
  const checkoutcurrTime = moment(today, 'HH:mm:ss').format('hh:mm A');

  var today1 = new Date(date);
  const checkincurrDate = Moment(today1).format('YYYY-MM-DD');
  const checkincurrTime = moment(today1, 'HH:mm:ss').format('hh:mm A');

  console.log(checkincurrTime);

  const returnmax = () => {
    let date = new Date();
    date.setDate(date.getDate() + 6);
    let now = new Date(date).toISOString()?.slice(0, 16);
    return now;
  };
  const returnmaxcheckout = () => {
    if (checkintime) {
      let date = new Date(checkintime);
      date.setDate(date.getDate() + 5);
      let now = new Date(date).toISOString()?.slice(0, 16);
      return now;
    } else {
      return '';
    }
  };

  const convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes] = time.split(':');

    if (hours === '12') {
      hours = '00';
    }

    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
  };

  const handleClieck = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!checkintime || !checkouttime || !dharamshalaname) {
      setIsLoading(false);
      return;
    }
    axios.defaults.headers.post[
      'Authorization'
    ] = `Bearer ${sessionStorage.getItem('token')}`;

    const data = {
      hotelName: dharamshalaname,
      checkinDate: checkincurrDate,
      checkinTime: convertTime12to24(checkincurrTime),
      checkoutDate: checkoutcurrDate,
      checkoutTime: convertTime12to24(checkoutcurrTime),
      numAdults: abcount,
      numChildren: chlidremc,
    };
    const res = await axios.post(`${backendApiUrl}room/check-room`, data);

    if (res.status === 200) {
      setfilterdata(res.data.data);
      console.log(res.data.data);
      setshowresuilt(true);
      setIsLoading(false);
    }
  };

  const getALLdharamshala = () => {
    setIsLoading(true);
    serverInstance('room/dharmashala', 'get').then((res) => {
      if (res.data) {
        setIsLoading(false);
        setdharamshalalist(res.data);
      }
    });
  };

  useEffect(() => {
    getALLdharamshala();
    getCorrectTime();
  }, []);
  const data = {
    dharamshalaname: dharamshalaname,
    chlidremc: chlidremc,
    roomcount: roomcount,
    abcount: abcount,
    checkoutcurrDate: checkoutcurrDate,
    checkoutcurrTime: moment(today, 'HH:mm').format('hh:mm'),
    checkincurrDate: checkincurrDate,
    checkincurrTime: moment(today1, 'HH:mm').format('hh:mm'),
    checkintime: checkintime,
    checkouttime: checkouttime,
    dharamshala: filterdata?.dharamshala_name,
    category: filterdata?.availableRooms,
    facility: filterdata?.availableRooms,
  };

  const yesterday = moment().subtract(1, 'day');
  const disablePastDt = (current) => {
    return current.isAfter(yesterday);
  };

  return (
    <>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem>
          <div className="main_slelct_child">
            Rooms
            <Select
              required
              sx={{
                width: '70px',
                height: '26px',
                paddingLeft: '0.5rem',
                background:
                  'linear-gradient(180deg, #F2EEEB 0%, #EDEDED 100%);',
                fontSize: 12,
                '& .MuiSelect-select': {
                  padding: '1px',
                },
              }}
              value={roomcount}
              onChange={(e) => setroomcount(e.target.value)}
            >
              <MenuItem
                sx={{
                  fontSize: 12,
                }}
                value="0"
              >
                0
              </MenuItem>

              {roomCount &&
                roomCount.map((item, idx) => {
                  return (
                    <MenuItem
                      sx={{
                        fontSize: 12,
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
        </MenuItem>
        <MenuItem>
          <div className="main_slelct_child">
            <div>
              Adults
              <p style={{ color: ' #6C6A6A', fontSize: '12px' }}>
                (Above 12 Years)
              </p>
            </div>

            <Select
              required
              sx={{
                width: '70px',
                height: '26px',
                paddingLeft: '0.5rem',
                background:
                  'linear-gradient(180deg, #F2EEEB 0%, #EDEDED 100%);',
                fontSize: 12,
                '& .MuiSelect-select': {
                  padding: '1px',
                },
              }}
              value={abcount}
              onChange={(e) => setabcount(e.target.value)}
            >
              <MenuItem
                sx={{
                  fontSize: 12,
                }}
                value="0"
              >
                0
              </MenuItem>
              {AdultsAount &&
                AdultsAount.map((item, idx) => {
                  return (
                    <MenuItem
                      sx={{
                        fontSize: 12,
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
        </MenuItem>
        <MenuItem>
          <div className="main_slelct_child">
            <div>
              Children{' '}
              <p style={{ color: ' #6C6A6A', fontSize: '12px' }}>
                (Age 12 years & below){' '}
              </p>
            </div>
            <Select
              required
              sx={{
                width: '70px',
                height: '26px',
                paddingLeft: '0.5rem',
                background:
                  'linear-gradient(180deg, #F2EEEB 0%, #EDEDED 100%);',
                fontSize: 12,
                '& .MuiSelect-select': {
                  padding: '1px',
                },
              }}
              value={chlidremc}
              onChange={(e) => setchlidremc(e.target.value)}
            >
              <MenuItem
                sx={{
                  fontSize: 12,
                }}
                value="0"
              >
                0
              </MenuItem>
              {Childrencont &&
                Childrencont.map((item, idx) => {
                  return (
                    <MenuItem
                      sx={{
                        fontSize: 12,
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
        </MenuItem>
        <MenuItem>
          <div>
            <Button
              onClick={() => {
                handleClose();

                setapplyshow(true);
              }}
              className="apply_btnn"
            >
              Apply
            </Button>
          </div>
        </MenuItem>
      </Menu>

      <div className="main_room_availabilty">
        <div className="room_home_main_supper">
          <div className="room_home_main">
            <div className="room_home_main_overlay">
              <div>
                <h2 className="font_text_color">
                  Fresh, quiet and <br /> peaceful Kundalpur Dharamshala &
                  Hotels
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="form_div_absolute">
          <form onSubmit={handleClieck} className="form_btn_div">
            <div className="main_div_select_div">
              <label className="labbelddd">
                <img
                  style={{ width: '8%', marginRight: '1%' }}
                  src={homee}
                  alt="dd"
                />
                Kundalpur
              </label>
              <Select
                required
                sx={{
                  width: '100%',
                  height: '26px',
                  paddingLeft: '0.5rem',

                  background:
                    'linear-gradient(180deg, #F2EEEB 0%, #EDEDED 100%);',
                  fontSize: 14,
                  '& .MuiSelect-select': {
                    padding: '1px',
                  },
                }}
                value={dharamshalaname}
                onChange={(e) => setdharamshalaname(e.target.value)}
              >
                <MenuItem
                  sx={{
                    fontSize: 12,
                  }}
                  value="Select"
                >
                  Select
                </MenuItem>
                {dharamshalalist &&
                  dharamshalalist.map((item, idx) => {
                    return (
                      <MenuItem
                        sx={{
                          fontSize: 12,
                        }}
                        key={item.dharmasala_id}
                        value={item.dharmasala_id}
                      >
                        {item.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </div>
            <div className="main_div_select_div">
              <label className="labbelddd" htmlFor="donation-time">
                <img
                  style={{ width: '8%', marginRight: '1%' }}
                  src={homee}
                  alt="dd"
                />
                Check In
              </label>
              <input
                className="checkouttype"
                min={minDateTime}
                max={returnmax()}
                id="donation-time"
                name="checkintime"
                type="datetime-local"
                onChange={(e) => setcheckintime(e.target.value)}
                value={checkintime}
              />
            </div>

            <div className="main_div_select_div">
              <label className="labbelddd" htmlFor="donation-time">
                <img
                  style={{ width: '8%', marginRight: '1%' }}
                  src={homee}
                  alt="dd"
                />
                Check Out
              </label>
              {console.log('min date is for max', returnmaxcheckout())}
              <input
                className="checkouttype"
                disabled={checkintime ? false : true}
                min={checkintime}
                max={returnmaxcheckout()}
                id="donation-time"
                name="checkouttime"
                type="datetime-local"
                onChange={(e) => setcheckouttime(e.target.value)}
                value={checkouttime}
              />
            </div>
            {/* <div className="main_div_select_div">
              <span className="labbelddd">
                <img
                  style={{ width: '8%', marginRight: '1%' }}
                  src={homee}
                  alt="dd"
                />
                Rooms {applyshow ? roomcount : '0'} Children
                {applyshow ? chlidremc : '0'}, Adults
                {applyshow ? abcount : '0'}
              </span>

              <div onClick={handleClick} className="select_person_div">
                Select
                <svg
                  width="12"
                  height="7"
                  viewBox="0 0 12 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L6 6L11 1"
                    stroke="#333333"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div> */}

            <button className="form_btn_divbutton">
              <SearchIcon />
              Search
            </button>
          </form>
        </div>
      </div>

      {filterdata ? (
        <>
          {filterdata && filterdata?.availableRooms ? (
            <>
              <div className="details-div_dhar">
                <img
                  src={`${backendUrl}uploads/images/${
                    filterdata && filterdata?.dharamshala_img
                  }`}
                  alt=" dharam1"
                />
                <div className="right_div_deta_dhram">
                  <h2>{filterdata && filterdata?.dharamshala_name}</h2>
                  <h2 className="main_text_deltails">Description</h2>
                  <p>{filterdata && filterdata?.dharamshala_desciption}</p>
                  <div className="dharamshal_arc_main_name_div10">
                    <img src={homee} alt="dd" />
                    <p>Kundalpur</p>
                  </div>
                </div>
              </div>

              <div className="details-div_dhar10">
                {filterdata &&
                  filterdata?.availableRooms &&
                  filterdata?.availableRooms.map((item) => {
                    return <RoomCard1 data={item} isData={data} />;
                  })}
              </div>

              <div className="imp_info_super_div">
                <div className="imp_info">
                  <div className="imp_info_ine_p">
                    <p> Important information</p>
                  </div>
                  <div className="imp_info_ine_innear_div_p">
                    <p>. Guests with fever are not allowed</p>
                    <p>
                      . Office ID and Non-Govt IDs are not accepted as ID
                      proof(s) Passport
                    </p>
                    <p>
                      . Passport, Aadhar, Driving License and Govt. ID are
                      accepted as ID proof(s)
                    </p>
                    <p>. Property staff is trained on hygiene guidelines</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {' '}
              <div className="details-div_dhar">
                <p className="details-div_dharcenter">Room Not Available</p>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="sjilder_main_div">
            <div className="view_all_main_div">
              <p>Kundalpur Dharamshala</p>
              {/* <button> View all</button> */}
            </div>
            <div className="center_wrap_hai_na">
              {dharamshalalist &&
                dharamshalalist.map((item, index) => {
                  return <DharamshalaCard data={item} data1={data} />;
                })}
            </div>
          </div>
        </>
      )}
      {isLoading ? <LoadingSpinner /> : <></>}
      {/* <ServicesandFacilities /> */}
    </>
  );
}

export default RoomBooking;
