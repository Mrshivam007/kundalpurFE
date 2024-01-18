import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
// import "../../../css/jobseeker/WhatClientSays.css";
import slider1 from '../../../assets/slider1.jpg';
import slider2 from '../../../assets/slider2.jpg';
import slider3 from '../../../assets/slider3.jpg';
import './TopHeader.css';
export default function TopHeader() {
  return (
    <div className="main_slider">
      <Carousel
        infiniteLoop={true}
        autoPlay={true}
        showIndicators={true}
        stopOnHover={true}
        autoFocus={true}
        showStatus={false}
        showThumbs={false}
        showArrows={true}
        dots={true}
      >
        <div>
          <img src={slider1} />
        </div>
        <div>
          <img src={slider2} />
        </div>
        <div>
          <img src={slider3} />
        </div>
      </Carousel>
    </div>
  );
}
