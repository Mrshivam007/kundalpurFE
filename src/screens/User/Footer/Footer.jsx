import React from 'react';
import Typography from '@mui/material/Typography';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom';

import Logo from '../../../assets/croppedlogo.png';
import './Footer.css';
const Footer = () => {
  return (
    <>
      <div className="mainfooter">
        <div className="footercontent">
          <div className="phonecon">
            <img src={Logo} alt="Logo" />
            <div className="mardivcontentlink">
              <p>
                श्री "बड़ेबाबा" आदिनाथ (वृषभनाथ) भगवान का जन्म- तृतीय काल में
                <br />
                चौरासी लाख वर्ष पूर्व, तीन वर्ष साढ़े आठ महीने प्रमाण काल शेष रह
                <br />
                गया था तब हुआ था। यहाँ अतिशयकारी ‘‘बड़ेबाबा’’ (श्री आदिनाथ
                <br />
                भगवान) की 1500 वर्ष प्राचीन प्रतिमा है साथ ही 63 भव्य जिनालय हैं
                <br />
                व अंतिम अन्नुबुद्ध केवली श्रीधर स्वामी की निर्वाण स्थली भी है।
                <br />
              </p>
              <p>
                <LocationOnIcon /> श्री दिगम्बर जैन सिद्धक्षेत्र कुण्डलगिरि{' '}
                <br />
                (सार्व, न्यास क्रं. 17 - ह) <br /> ग्राम- कुण्डलपुर, तह-पटेरा,
                जिला दमोह 470772 (म.प्र.)
              </p>
            </div>
          </div>

          <div className="phonecon">
            <Typography
              variant="h6"
              style={{ fontWeight: '400', marginBottom: '20px' }}
            >
              हमसे जुड़ें
            </Typography>
            <div className="mardivcontentlink">
              <Link to="/rental">facebook</Link>
              <Link to="/rental"> twitter </Link>
              <Link to="/rental"> google</Link>
              <Link
                to="https://instagram.com/shreebadebaba?igshid=OGQ2MjdiOTE="
                target="_blank"
              ></Link>
              <Link to="/https://www.youtube.com/c/ShreeBadeBaba">Youtube</Link>
            </div>
          </div>
          <div className="phonecon">
            <Typography
              variant="h6"
              style={{ fontWeight: '400', marginBottom: '20px' }}
            >
              पृष्ठ
            </Typography>
            <div className="mardivcontentlink">
              <Link to="/#">≈ श्री बड़े बाबा</Link>
              <Link to="/#">≈ आचार्य श्री</Link>
              <Link to="/#">≈ कुण्डलपुर</Link>
              <Link to="/#">≈ जैन धर्म</Link>
              <Link to="/#">≈ संपर्क</Link>
            </div>
          </div>
          <div className="phonecon">
            <Typography
              variant="h6"
              style={{ fontWeight: '400', marginBottom: '20px' }}
            >
              हमसे संपर्क करें​
            </Typography>
            <div className="mardivcontentlink">
              <p>
                {' '}
                <CallIcon />
                +91-7771834880 (आवास एवं कार्यालय)
              </p>
              <p>
                {' '}
                <CallIcon />
                +91-7771835891 (दान एवं कबूलियत)
              </p>
              <p>
                <EmailIcon />
                badebaba.kundalpur@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
