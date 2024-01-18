import React from 'react';
import lefttop from '../../../assets/lefttop.jpeg';
import innear from '../../../assets/innear.jpeg';
import rightbottom from '../../../assets/rightbottom.jpeg';
import check from '../../../assets/check.jpeg';
import img3 from '../../../assets/img3.jpeg';
import img1 from '../../../assets/img2.jpeg';
import img4 from '../../../assets/img4.jpeg';
import img2 from '../../../assets/img2.jpeg';
import img5 from '../../../assets/img5.jpeg';
import money from '../../../assets/money.jpeg';
import { useNavigate } from 'react-router-dom';
import './Aboutus.css';
function Aboutus() {
  const navigation = useNavigate();
  return (
    <>
      <div className="supper-main-div1">
        <div className="Aboutus-main-div">
          <div className="left-imgs-div">
            <img className="img-1" src={rightbottom} alt="letff" />
            <img className="img-2" src={innear} alt="ss" />
            <img className="img-3" src={lefttop} alt="ss" />
          </div>
          <div className="tex-right-main-div">
            <h2>
              जैन धर्म के सिद्धांत <br />
            </h2>
            <div className="supper-check-main-div">
              <div className="check-main-div">
                <div className="check-inear-div">
                  <img src={check} alt="check" />
                  <p>~अहिंसा</p>
                </div>
                <div className="check-inear-div">
                  <img src={check} alt="check" />
                  <p>~सत्य</p>
                </div>
              </div>
              <div className="check-main-div">
                <div className="check-inear-div">
                  <img src={check} alt="check" style={{ marginLeft: '10px' }} />
                  <p>~अपरिग्रह</p>
                </div>
                <div className="check-inear-div">
                  <img src={check} alt="check" style={{ marginLeft: '10px' }} />
                  <p>~अचौर्य (अस्तेय) </p>
                </div>
                <div className="check-inear-div">
                  <img src={check} alt="check" style={{ marginLeft: '10px' }} />
                  <p>~ ब्रह्मचर्य </p>
                </div>
              </div>
            </div>
            <div className="linnes-outer-div">
              <div className="line-main-div">
                <div className="line-1" />
                <div className="line-2" />
                <div className="line-1" />
              </div>

              <p>
                कुण्डलपुर जी सिद्ध क्षेत्र , बड़े बाबा का अतिशय क्षेत्र प्राचीन
                <br /> मंदिरों का गढ़ है. जहाँ लगभग २४०० वर्ष पुराने श्रीधर केवली
                के चरण
                <br /> विराजमान हैं. पहाड़ एवं तलहटी में लगभग ५०० वर्ष पूर्व के
                ६१ और जिन
                <br /> मंदिर हैं, जिनमे पार्श्वनाथ भगवान और चंद्रप्रभु भगवान के
                दर्शन
                <br />
                बहुतायत में मिलते हैं. यहाँ आस पास के क्षेत्र में गुप्तकाल की
                <br />
                प्रतिमाओं का भी उल्लेख है. इन सबसे ऊपर विराजमान हैं कुंडलपुर के
                <br />
                बड़े बाबा श्री १००८ आदिनाथ भगवान लगभग १५०० वर्ष पुराने मंदिर जी
                एवं
                <br />
                सिंहपीठ आसन पर विराजमान हैं.
              </p>
            </div>
          </div>
        </div>
        <div className="about-bttom-div">
          <h2>सम्यकदर्शन-ज्ञान-चारित्र का दान अनमोल दान है</h2>
        </div>
        <div className="bottom-img-div">
          <img src={img3} alt="img" />
          <img src={img2} alt="img" />
          <img src={img4} alt="img" />
          <img src={img5} alt="img" />
          <img src={img1} alt="img" />
        </div>
        <div className="donation-center">
          <div className="main-start-btn-div">
            <img src={money} alt="money" />
            <button
              className="donation-now-btn"
              onClick={() => navigation('/donation')}
            >
              Donate Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Aboutus;
