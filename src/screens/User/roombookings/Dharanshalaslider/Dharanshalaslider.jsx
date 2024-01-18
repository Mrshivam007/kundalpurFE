import React from 'react';
import DharamshalaCard from '../AllAcards/DharamshalaCard';
import Carousel from 'react-multi-carousel';

import 'react-multi-carousel/lib/styles.css';
import './Dharanshalaslider.css';

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
function Dharanshalaslider() {
  return (
    <>
      <div className="sjilder_main_div">
        <div className="view_all_main_div">
          <p>Kundalpur Dharamshala</p>
          <button> View all</button>
        </div>
        <Carousel
          //   swipeable={false}
          //   draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={true}
          //   autoPlaySpeed={1000}
          //   keyBoardControl={true}
          //   customTransition="all .5"
          //   transitionDuration={500}
          //   containerClass="carousel-container"
          //   itemClass="carousel-item-padding-40-px"
        >
          <div>
            <DharamshalaCard />
          </div>
          <div>
            <DharamshalaCard />
          </div>
          <div>
            <DharamshalaCard />
          </div>
          <div>
            <DharamshalaCard />
          </div>
          <div>
            <DharamshalaCard />
          </div>
        </Carousel>
      </div>
    </>
  );
}

export default Dharanshalaslider;
