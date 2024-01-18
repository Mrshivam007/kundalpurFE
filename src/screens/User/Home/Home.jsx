import React from 'react';
import TopHeader from './TopHeader';
import About from './About';
import Sharamachar from './Sharamachar';
import MoreServices from './MoreServices';
import Map from './Map';
// import Footer from "../../screens/Footer/Footer";
function Home() {
  return (
    <>
      <TopHeader />
      <About />
      <Sharamachar />
      <MoreServices />
      <Map />
      {/* <Footer /> */}
    </>
  );
}

export default Home;
