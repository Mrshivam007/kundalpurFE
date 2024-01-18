import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import homee from '../../../../assets/homee.jpeg';
import Rating from '@mui/material/Rating';
import { backendUrl } from '../../../../config/config';
import './RoomCard.css';
function RoomCard1({ data, isData, dhramshalaname }) {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(null > 2);
  const [mainimg, setmainimg] = useState('');

  console.log('data is ', data);

  useEffect(() => {
    setmainimg(data?.roomDetails?.roomImage1);
  }, []);

  return (
    <>
      <div className="room_card_main_div">
        <img
          className="room_card_main_divimg"
          src={`${backendUrl}uploads/images/${mainimg}`}
          alt="dd"
        />
        <div className="main_room_div_deell">
          <p>{dhramshalaname}</p>
          <div className="dharamshal_arc_main_name_div13">
            <img
              className="dharamshal_arc_main_name_div13img"
              src={homee}
              alt="dd"
            />
            <p>Kundalpur</p>
          </div>
          <p className="main_text_deltails">
            <span className="titleText">Category</span> &nbsp;: &nbsp;
            {data?.category_name}
          </p>
          <p className="main_text_deltails">
            <span className="titleText">Facilities</span> &nbsp;: &nbsp;
            {data?.facilities?.map((element) => (
              <> {element}</>
            ))}
          </p>

          <p className="main_text_deltails">
            <span className="titleText">Available rooms</span> &nbsp;: &nbsp;
            {data?.available_rooms}
          </p>
          <p className="main_text_deltails">
            <span className="titleText">Rate</span> &nbsp;: &nbsp;
            {data?.roomDetails?.Rate}
          </p>
          <p className="main_text_deltails">
            <span className="titleText">Advance Rate</span> &nbsp;: &nbsp;
            {data?.roomDetails?.advance}
          </p>
          {/* <p className="main_text_deltails">
            <span className="titleText">Already booked</span> &nbsp;: &nbsp;
            {data?.already_booked}
          </p>
          <p className="main_text_deltails">
            <span className="titleText">Total rooms</span> &nbsp;: &nbsp;
            {data?.total_rooms}
          </p> */}

          {/* <p className="main_text_deltails">
            available_room_numbers
            {data?.available_room_numbers}
          </p>
          <p className="main_text_deltails">
            already_booked_room_numbers
            {data?.already_booked_room_numbers}
          </p> */}
          <div>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </div>
          <button
            onClick={() => {
              sessionStorage.setItem('redirectto', '/roombooking');
              navigate('/room/booking', {
                state: {
                  roomdata: data,
                  checkindata: isData,
                  dhramshalaname: dhramshalaname,
                },
              });
            }}
          >
            {' '}
            Book Now
          </button>
        </div>
      </div>
    </>
  );
}

export default RoomCard1;
