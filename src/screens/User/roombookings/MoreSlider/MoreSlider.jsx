import React, { useState, useEffect } from 'react';
import DharamshalaCard from '../AllAcards/DharamshalaCard';
import { serverInstance } from '../../../../API/ServerInstance';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './MoreSlider.css';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

function MoreSlider() {
  const [dharamshalalist, setdharamshalalist] = useState('');
  const getALLdharamshala = () => {
    serverInstance('room/dharmashala', 'get').then((res) => {
      console.log('dharanmjhfkjhd', res.data);
      setdharamshalalist(res.data);
    });
  };
  useEffect(() => {
    getALLdharamshala();
  }, []);
  return (
    <>
      <div className="sjilder_main_div">
        <div className="view_all_main_div">
          <p>Other Dharmshala</p>
          <button> View all</button>
        </div>
        <div className="center_wrap_hai_na">
          {dharamshalalist &&
            dharamshalalist.map((item, index) => {
              return <DharamshalaCard data={item} />;
            })}
        </div>
      </div>
    </>
  );
}

export default MoreSlider;
