import React, { useEffect } from 'react';
import logo from '../../../assets/sideimg.jpeg';
import money from '../../../assets/money.jpeg';
import { useNavigate } from 'react-router-dom';
import './About.css';
const About = () => {
  const navigation = useNavigate();
  return (
    <>
      <div>
        <div className="mainbghomediv">
          <div className="home-left-img">
            <iframe
              className="home-left-img-video-ifram"
              src="https://www.youtube.com/embed/NG7S0IZB4qg"
            ></iframe>
          </div>
          <div className="home-right-text">
            <div>
              <h2>
                श्री दिगम्बर जैन सिद्धक्षेत्र
                <br />
                (कुण्डलपुर) कुण्डलगिरि
              </h2>
              <div className="linnes-outer-div-main">
                <p>
                  भारतवर्ष का ह्रदय स्थल मध्य प्रदेश का एक जिला है “दमोह”
                  <br />
                  I दमोह (जिला मुख्यालय) से लगभग ३५ किलोमीटर दूर पटेरा तहसील में
                  <br />
                  बुन्देखण्ड का शिरर्मोर्य तीर्थ है I “कुंडलपुर” जो की
                  <br /> “कुण्डलगिरी” नामक अर्द्धचन्द्राकार पहाड़ियों पर स्थित है
                </p>
              </div>
              <div className="main-start-btn-div">
                <button
                  onClick={() => navigation('/donation')}
                  className="donation-now-btn"
                >
                  और पढ़ें
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
