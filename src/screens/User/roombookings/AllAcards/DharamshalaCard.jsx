import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dharam1 from '../../../../assets/dharam1.jpeg';
import homee from '../../../../assets/homee.jpeg';
import Rating from '@mui/material/Rating';
import { backendUrl } from '../../../../config/config';
import './DharamshalaCard.css';
function DharamshalaCard({ data, data1 }) {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(null > 2);
  console.log(value);

  return (
    <>
      <div className="dharamshal_arc_main">
        <img src={`${backendUrl}uploads/images/${data?.image1}`} alt="hh" />
        <div className="dharamshal_arc_main_name_div_content">
          <div className="dharamshal_arc_main_name_div">
            <img src={homee} alt="dd" />
            <p>Kundalpur</p>
          </div>
          <p>{data?.name}</p>
          <div className="rating_div">
            {/* <p>₹850 Per Night</p> */}
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </div>
          <button
            onClick={() =>
              navigate(`/Dharamshala/Details/${data?.dharmasala_id}`, {
                state: {
                  checkindata: data1,
                },
              })
            }
            className="detail_more_btn"
          >
            Details
          </button>
        </div>
      </div>
    </>
  );
}

export default DharamshalaCard;
