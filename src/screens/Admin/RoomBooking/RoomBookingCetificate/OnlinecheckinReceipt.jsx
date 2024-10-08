import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Converter, hiIN } from 'any-number-to-words';
import { backendApiUrl } from '../../../../config/config';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import moment from 'moment';
import '../../../Admin/Reciept/cashrecipt.css';
const converter = new Converter(hiIN);

const OnlinecheckinReceipt = ({ setopendashboard }) => {
  const navigation = useNavigate();
  const location = useLocation();
  const adminName = sessionStorage.getItem('adminName');
  const empName = sessionStorage.getItem('empName');
  const componentRef = useRef();
  const [isData, setisData] = React.useState('');

  const handlesubmit = async () => {
    try {
      axios.defaults.headers.post[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;

      const res = await axios.post(`${backendApiUrl}room/checkOutAll`, {
        id: isData?.booking_id,
        checkoutDate: new Date(),
      });

      if (res.data.data.message) {
        navigation('/admin-panel/Room/OnlinecheckinPrint', {
          state: {
            data: isData,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  function down() {
    console.log('cliii');
    const input = document.getElementById('receipt');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4', false);
      pdf.addImage(imgData, 'PNG', 0, 0, 600, 0, undefined, false);
      pdf.save('download.pdf');
    });
  }

  var options = { year: 'numeric', month: 'short', day: '2-digit' };
  var today = new Date(isData && isData?.date);
  const currDate = today
    .toLocaleDateString('en-IN', options)
    .replace(/-/g, ' ');
  const currTime = today.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  // ******************
  const [date, setDate] = useState('');
  async function getCorrectTime() {
    try {
      const response = await fetch('https://worldtimeapi.org/api/ip');
      const data = await response.json();
      // return new Date(data.utc_datetime);
      console.log(data);
      setDate(data);
    } catch (error) {
      console.error('Error fetching time:', error);
      return new Date(); // Return local time if external source is unavailable
    }
  }
  // ******************

  var today1 = new Date();
  if (Object.keys(date).length > 0) {
    today1 = new Date(date.utc_datetime);
  }

  const currDatecheckout = today1
    .toLocaleDateString('en-IN', options)
    .replace(/-/g, ' ');
  const currTimecheckout = today1.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  let TotalDays;

  const days_diff = Math.floor(
    (today1.getTime() - new Date(isData?.date).getTime()) /
      (1000 * 3600 * Number(isData?.coTime - 3)),
  );

  const hours_difference = Math.floor(
    ((today1.getTime() - new Date(isData?.date).getTime()) / (1000 * 60 * 60)) %
      Number(isData?.coTime - 3),
  );

  if (days_diff === 0) {
    TotalDays = days_diff + 1;
  } else if (days_diff > 0 && hours_difference < 3) {
    TotalDays = days_diff;
  } else if (days_diff > 0 && hours_difference >= 3) {
    TotalDays = days_diff + 1;
  }

  console.log('Online is stays days ', TotalDays);

  useEffect(() => {
    if (location.state) {
      setisData(location?.state?.data);
    }
    console.log('data from certifucate', location?.state?.data);

    setopendashboard(true);
  }, []);

  const convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes] = time.split(':');

    if (hours === '12') {
      hours = '00';
    }

    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
  };
  return (
    <>
      <div>
        <div
          className="button_div_print_download"
          style={{
            marginBottom: '1rem',
            marginTop: '5rem',
            position: 'fixed',
            width: '100%',
          }}
        >
          <button onClick={() => navigation(-1)}>Back</button>
          <button onClick={() => down()}>Download</button>
          <button onClick={() => handlesubmit()}>Checkout</button>
        </div>
        <div style={{ height: '10rem' }} />
        <div style={{ padding: '1rem' }} ref={componentRef}>
          <div className="main-certificate" id="receipt">
            <div className="topinfo-flex">
              <p>E-mail:badebaba.kundalpur@gmail.com</p>
              <p>॥ श्री बड़े बाबा नम:॥</p>
              <p>Web:www.shreebadebaba.com</p>
            </div>
            <div className="main-head">
              <div className="main-head-container">
                <span className="hessaxxd-sn"></span>
                <span className="head-name">
                  <h2>श्री दिगम्बर जैन सिद्धक्षेत्र कुण्डलगिरि</h2>
                  <p>(सार्व, न्यास क्रं. 17 - ह)</p>
                  <h4>पिनकोड - 470773, तहसील पटेरा, जिला-दमोह (म.प्र.)</h4>
                </span>
                <span className="main-headmain-head-containerhead-contact">
                  <p>+91-7771835891</p>
                  <p>+91-7771834880</p>
                </span>
              </div>
            </div>
            <div className="reciptimg">
              <div className="reciptbody" style={{ padding: '0px' }}>
                <div className="bankjankari">
                  <div className="main_room_receipt10">
                    <div
                      className="prinht_ddd"
                      id="receipt"
                      ref={componentRef}
                      style={{ width: '100%' }}
                    >
                      <div className="maxxin_room_receipt_innear">
                        <div style={{ backgroundColor: '#FE0002' }}>
                          <p className="yadda_text lineheight">
                            यात्री प्रस्थान रसीद (ओनलाईन)
                          </p>
                        </div>

                        <div className="innear_div_texx">
                          <div className="innear_div_texx_ddd">
                            <div>
                              <p
                                className="lineheight"
                                style={{ color: 'gray' }}
                              >
                                आवास क्र :
                              </p>
                              <p
                                style={{ color: 'gray' }}
                                className="lineheight"
                              >
                                मोबाईल न :
                              </p>
                              <p
                                style={{ color: 'gray' }}
                                className="lineheight"
                              >
                                यात्री का नाम :
                              </p>
                              <p
                                style={{ color: 'gray' }}
                                className="lineheight"
                              >
                                पिता/पति श्री :
                              </p>
                            </div>
                            <div className="main_left">
                              <p className="lineheight">
                                {isData && isData?.booking_id}
                              </p>
                              <p className="lineheight">
                                {isData && isData?.contactNo}
                              </p>
                              <p className="lineheight">
                                {isData && isData?.name}
                              </p>
                              <p className="lineheight">
                                {isData && isData?.Fname}
                              </p>
                            </div>
                          </div>
                          <div className="innear_div_texx_ddd">
                            <div>
                              <p
                                style={{ color: 'gray' }}
                                className="lineheight"
                              >
                                प्रस्थान दिनाँक :
                              </p>
                              <p
                                style={{ color: 'gray' }}
                                className="lineheight"
                              >
                                आगमन दिनांक :
                              </p>

                              <p
                                style={{ color: 'gray' }}
                                className="lineheight"
                              >
                                स्टे :
                              </p>
                              <p
                                style={{ color: 'gray' }}
                                className="lineheight"
                              >
                                पता :
                              </p>
                            </div>
                            <div className="main_left">
                              <p className="lineheight">
                                {currDatecheckout}/
                                {convertTime12to24(currTimecheckout)}
                              </p>
                              <p className="lineheight">
                                {currDate}/{convertTime12to24(currTime)}
                              </p>

                              <p className="lineheight">{TotalDays} Days</p>
                              <p className="lineheight">
                                {isData && isData?.address}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <table className="table_ddd">
                            <tbody>
                              <tr>
                                <td className="table_tddd lineheight10">
                                  धर्मशाला नाम
                                </td>
                                <td className="table_tddd lineheight10">
                                  रूम टाईप & रूम न.
                                </td>

                                <td className="table_tddd lineheight10">
                                कुल सहयोग राशि
                                </td>

                                <td className="table_tddd lineheight10">
                                जमा सहयोग राशि
                                </td>

                                <td className="table_tddd lineheight10">
                                  सहयोग राशि लेना
                                </td>
                              </tr>
                              <tr>
                                <td className="table_tddd lineheight10">
                                  {isData && isData?.dharamshalaData?.name}
                                </td>
                                <td className="table_tddd lineheight10">
                                  ( {isData && isData?.categoryName}
                                  {isData &&
                                    isData?.facility_name &&
                                    isData?.facility_name.map(
                                      (element, index) => (
                                        <span key={index}> {element}</span>
                                      ),
                                    )}
                                  -{isData && isData?.category_name}
                                  {isData && isData?.facilityName})-
                                  {isData &&
                                    isData?.roomNumbers?.map((item) => (
                                      <span>{item},</span>
                                    ))}
                                </td>

                                <td className="table_tddd lineheight10">
                                  {Number(isData && isData?.roomAmountSum) *
                                    TotalDays}
                                  .00
                                </td>


                                <td className="table_tddd lineheight10">
                                  {Number(isData && isData?.roomAmountSum)}
                                  .00
                                </td>

                                <td className="table_tddd lineheight10">
                                  {Number(isData && isData?.roomAmountSum) *
                                    TotalDays -
                                    Number(isData && isData?.roomAmountSum)}
                                  .00
                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <p
                            style={{
                              textAlign: 'right',
                              marginRight: '2rem',
                              marginTop: '0.5rem',

                              marginBottom: '0.5rem',
                            }}
                          >
                            ऑनलाइन द्वारा सहयोग राशि प्राप्त हुये।
                          </p>
                          <p
                            style={{
                              textAlign: 'right',
                              marginRight: '2rem',
                              marginTop: '0.5rem',
                              marginBottom: '0.5rem',
                            }}
                          >
                            {empName ? empName : adminName}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="note_text">
              <p>
                नोट : रूम चेक आउट समय 24 घंटे के पश्चात दूसरे दिन का चार्ज मान्य
                होगा। रूम केन्सिल एवं बदलने का समय 1 घंटे रहेगा ।
              </p>
            </div>
            <div className="main-certificatenote">
              <h2 className="h2text">
                ऑनलाईन आवास व्यवस्था हेतु नियम/सावधानियां
              </h2>
              <p>
                1. कमरें खुले ना छोड़े, स्वयं के ताले का उपयोग करें, सामान की
                सुरक्षा स्वयं करें ।
              </p>
              <p>
                2. प्रस्थान से 1 घंटे पूर्व अपनी पर्ची (कमरे) कार्यालय में ले
                जाकर उसका पूर्ण हिसाब कर लेवें ।
              </p>
              <p>
                3. आवासीय इकायईयों के सभी कमरों में गैस/स्टोव/सिगड़ी/इंडक्शन का
                प्रयोग वर्जित है ।
              </p>
              <p>
                4. अनजान व्यक्तियों से किसी भी प्रकार की खाद्य सामग्री ना खरीदे
                अधिकृत दुकानों से ही लेवें ।
              </p>
              <p>
                5. कार्यरत कर्मचारियों को किसी भी प्रकार का ईनाम या प्रलोभन
                देकर, व्यवस्था खराब ना करें ।
              </p>
              <p>
                6. यात्रीगण को जारी की गई सामग्री खोने/टूटफूट होने की स्थिति में
                नियमानुसार राशि जमा करानी होगी ।
              </p>
              <p>
                7. आवास (कमरा) खाली करते समय धर्मशाला इंचार्ज (चौकीदार) के
                हस्ताक्षर पर्ची पर लाने का कष्ट करें, उसके पश्चात ही चेकआउट होगा
                ।
              </p>
              <p>
                8. यात्रीगण अपने अमूल्य सुझाव श्री दिगम्बर जैन सिद्धक्षेत्र
                कुण्डलगिरि, कुण्डलपुर के अध्यक्ष/महामंत्री को लिखित में कार्यालय
                में प्रेषित कर सकते हैं ।
              </p>
              <p>
                9. क्षेत्र में 3 दिन से अधिक ठहरने हेतु प्रबंधक एवं 7 दिन से
                अधिक ठहरने हेतु अध्यक्ष/महामंत्री जी से लिखित में स्वीकृति
                आवश्यक है ।
              </p>
              <p>
                10. आवासीय इकाइयों में पॉलीथिन का उपयोग ना करें, साफ-सफाई रखें,
                आवश्यक्तानुसार जल, बिजली एवं अन्य उपकरणों का उपयोग करें, उपयोग
                ना होने पर उपकरणों को बंद कर व्यवस्थाओं में सहयोग प्रदान करें ।
              </p>
              <p>
                11. क्षेत्र पर एवं धर्मशाला/आवास में धर्म विरूद्ध कार्य होते पाए
                जाने पर आवास/कमरा तुरंत खाली करवाने हेतु प्रबंधक को पूर्ण अधिकार
                हैं, यह पवित्र धार्मिक/सिद्धक्षेत्र है इसकी मर्यादा/पवित्रता
                बनाए रखना हम सभी का कर्त्तव्य एवं अधिकर है ।s
              </p>
              <p>
                12. आवासीय इकाइयों (कमरा) में यदि किसी भी प्रकार के
                नल/बिजली/सफाई आदि संबंधित कोई भी समस्या हो तो कमरा बुक करवाने के
                1 घंटे के अंदर ही कार्यालय में जाकर चेंज करा लेवें अन्यथा 1 घंटे
                बाद कमरा चेंज (बदला) नहीं जावेगा एवं नियमानुसार सहयोग राशि देय
                होगी ।
              </p>
              <p>
                13. रूम चेकआउट का समय चेकिन के समय से 24 घंटे तक है उसके पश्चात
                दूसरे दिन की सहयोग राशि मान्य होगी, रूम बदलने (शिफ्ट) का समय 1
                घंटे तक ही रहेगा ।
              </p>
              <div className="absolute_text">
                <p>
                  क्षेत्र में हो रहे निर्माण कार्य की जानकारी आप कार्यालय से
                  प्राप्त । कर सकते है एवं दान राशि क्षेत्र के बैंक खातों में भी
                  जमा करा सकते है।
                </p>
              </div>
            </div>
            <div className="reciept-footer-style">
              <p>
                मोबाईल : +91-7771834880, +91-7771835891 पर कार्यदिवस में संपर्क
                कर सकते हैं।
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnlinecheckinReceipt;
