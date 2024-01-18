import React, { useEffect } from 'react';
import logo from '../../../assets/sideimg.jpeg';
import money from '../../../assets/new.jpg';
import slider1 from '../../../assets/slider1.jpg';
import slider2 from '../../../assets/slider2.jpg';
import slider3 from '../../../assets/slider3.jpg';
import { useNavigate } from 'react-router-dom';

import './Map.css';
const Map = () => {
  const navigation = useNavigate();
  return (
    <>
      <div className="main_Map">
        <div className="main_Map_innear">
          <div className="main_Map_innear10">
            <iframe
              className="main_fram_sss"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3645.4521861550134!2d79.72194031490909!3d23.9798042844768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3982181bc452531d%3A0x7952c86dad2b7bb0!2sShri%20Bade%20Baba%20Digambar%20Jain%20Mandir%20Kundalpur!5e0!3m2!1sen!2sin!4v1678363124464!5m2!1sen!2sin"
              // style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="main_Map_innear11">
            <h2>पहुचमार्ग</h2>
            <p>
              कुंडलपुर से दमोह (जिला मुख्यालय) से लगभग 35 किलोमीटर दूर पटेरा
              तहसील में बुन्देखण्ड का शिरर्मोर्य तीर्थ है I कुंडलपुर
              “कुण्डलगिरी” नामक अर्द्धचन्द्राकार पहाड़ियों पर स्थित है
            </p>
          </div>
        </div>

        <div className="main_Map_innear">
          <div className="main_Map_innear12">
            <h2>अतिशय</h2>
            <p>
              “सरोवर का, अन्तरंग छुपा क्यों? तरंग वश !” “– तीर्थंकर क्यों, आदेश
              नहीं देते, सो ज्ञात हुआ
            </p>
          </div>
          <div className="main_Map_innear13">
            <img
              src={money}
              alt="d"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </div>

      <div className="main_text_div_hai_na">
        <div className="main_text_div_hai_na1">
          <h2>नित्य कार्यक्रम</h2>
          <p>” मोक्षमार्ग तो, भीतर अधिक है, बाहर कम</p>
        </div>
        <div className="main_text_div_hai_na12">
          <h2>
            ” :- पूज्य बड़े बाबा जी की नगरी श्री दिगम्बर जैन सिद्ध क्षेत्र
            कुंडलगिरी कुण्डलपुर दमोह म.प्र. में आप सभी साधर्मी बन्धुओं का
            हार्दिक स्वागत, बंदन ,अभिनन्दन है क्षेत्र की बन्दना कर सातिशय
            पुण्यार्जन कर इस मानव जीवन को सफल बनाये सादर……”
          </h2>
        </div>
        <div className="main_bri_aur_pade">
          <button> और पढ़ें</button>
        </div>
        <div className="main_text_div_hai_na1">
          <h2>फोटो गैलरी</h2>
          <p>” मोक्षमार्ग तो, भीतर अधिक है, बाहर कम</p>
        </div>
        <div className="main_gallery">
          <img src={slider1} alt="dd" />
          <img src={slider2} alt="dd" />
          <img src={slider3} alt="dd" />
          <img src={slider1} alt="dd" />
          <img src={slider2} alt="dd" />
          <img src={slider3} alt="dd" />
          <img src={slider1} alt="dd" />
          <img src={slider2} alt="dd" />
        </div>
      </div>
    </>
  );
};

export default Map;
