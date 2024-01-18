import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useReactToPrint } from 'react-to-print';
import './RoomBookingCetificate.css';
import moment from 'moment';
function PrintOnlysetup({ setopendashboard }) {
  const navigate = useNavigate();
  const location = useLocation();
  const componentRef = useRef();
  const [isData, setisData] = useState('');
  const [checkindata, setcheckindata] = useState('');
  console.log('data from certifucate', isData);

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
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  useEffect(() => {
    if (location.state) {
      setisData(location.state?.data);
      console.log('ddddddddddddddd', location?.state?.data);
    }
    setopendashboard(true);
    setTimeout(() => {
      handlePrint();
    }, 10);
  }, []);

  var options = { year: 'numeric', month: 'short', day: '2-digit' };
  var today = new Date(isData && isData[0]?.date);
  const currDate = today
    .toLocaleDateString('en-IN', options)
    .replace(/-/g, ' ');
  const currTime = today.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  var today1 = new Date(isData && isData?.coutDate);
  const currDatecheckout = today1
    .toLocaleDateString('en-IN', options)
    .replace(/-/g, ' ');
  const currTimecheckout = today1.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  let days;

  const days_diff = Math.floor(
    (today1.getTime() - new Date(isData?.date).getTime()) /
      (1000 * 3600 * Number(isData?.coTime - 3)),
  );

  const hours_difference = Math.floor(
    ((today1.getTime() - new Date(isData?.date).getTime()) / (1000 * 60 * 60)) %
      Number(isData?.coTime - 3),
  );

  if (days_diff === 0) {
    days = days_diff + 1;
  } else if (days_diff > 0 && hours_difference < 3) {
    days = days_diff;
  } else if (days_diff > 0 && hours_difference >= 3) {
    days = days_diff + 1;
  }

 

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
      <div
        className="button_div_print_download10"
        style={{ marginBottom: '-10rem' }}
      >
        <button onClick={() => navigate(-1)}>Back</button>

        <div />
      </div>
      <div className="main_room_receipt">
        <div className="print_ddd" id="receipt">
          <div
            className="main_room_receipt_innear"
            ref={componentRef}
            style={{ marginLeft: '0rem', marginTop: '5.6rem' }}
          >
            <div>
              <p className="yadda_text lineheight">
                यात्री आगमन रसीद{' '}
                <span style={{ fontSize: '13px' }}>
                  ({isData[0]?.paymentMode === 2 ? 'Cash' : 'Online'})
                </span>
              </p>
            </div>

            <div className="innear_div_texx">
              <div className="innear_div_texx_dd">
                <div>
                  <p className="lineheight">आवास क्र :</p>

                  <p className="lineheight">यात्री का नाम :</p>
                  <p className="lineheight">पिता/पति श्री :</p>
                  <p className="lineheight">&nbsp;</p>
                </div>
                <div className="main_left">
                  <p className="lineheight">
                    {isData && isData[0]?.booking_id ? (
                      isData && isData[0]?.booking_id
                    ) : (
                      <>
                        <p>&nbsp;</p>
                      </>
                    )}
                  </p>

                  <p className="lineheight">
                    {isData && isData[0]?.name ? (
                      isData && isData[0]?.name
                    ) : (
                      <>
                        <p>&nbsp;</p>
                      </>
                    )}
                  </p>
                  <p className="lineheight">
                    {isData && isData[0]?.Fname ? (
                      isData && isData[0]?.Fname
                    ) : (
                      <>
                        <p>&nbsp;</p>
                      </>
                    )}
                  </p>
                  <p style={{ color: 'gray' }} className="lineheight">
                    &nbsp;
                  </p>
                </div>
              </div>
              <div className="innear_div_texx_dd" style={{ marginLeft: '0px' }}>
                <div>
                  <p className="lineheight">आगमन दिनांक:</p>
                  <p className="lineheight">मोबाईल न :</p>
                  {/* <p className="lineheight">स्टे :</p> */}
                  <p className="lineheight">पता :</p>
                </div>
                <div className="main_left">
                  <p className="lineheight">
                    {currDate}/{convertTime12to24(currTime)}
                  </p>
                  <p className="lineheight">
                    {isData && isData[0]?.contactNo ? (
                      isData && isData[0]?.contactNo
                    ) : (
                      <>
                        <p>&nbsp;</p>
                      </>
                    )}
                  </p>
                  {/* <p className="lineheight">{days} Days</p> */}
                  <p className="lineheight">
                    {isData && isData[0]?.address ? (
                      isData && isData[0]?.address
                    ) : (
                      <>
                        <p>&nbsp;</p>
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="yyy_text_div">
              <p className="lineheight">यात्री संख्या </p>
              <p className="lineheight">Male: {isData[0]?.male}</p>
              <p className="lineheight">Female: {isData[0]?.female}</p>
              <p className="lineheight">Child: {isData[0]?.child}</p>
              <p className="lineheight">
                Total:
                {Number(isData[0]?.male) +
                  Number(isData[0]?.female) +
                  Number(isData[0]?.child)}
              </p>
            </div>

            <div>
              <table className="table_ddd">
                <tbody>
                  <tr>
                    <td className="table_tddd lineheight10">धर्मशाला नाम</td>
                    <td className="table_tddd lineheight10">
                      रूम टाईप & फेसिलिटी
                    </td>
                    <td className="table_tddd lineheight10">रूम न</td>

                    <td className="table_tddd lineheight10">सहयोग राशि</td>
                    <td className="table_tddd lineheight10">अमानत राशि</td>
                  </tr>
                  <tr>
                    <td className="table_tddd lineheight10">
                      {isData && isData[0]?.dharmasalaData?.name}
                    </td>
                    <td className="table_tddd lineheight10">
                      {isData && isData[0]?.categoryName}
                      {isData &&
                        isData[0]?.facility_name &&
                        isData &&
                        isData[0]?.facility_name.map((element, index) => (
                          <span key={index}>{element}</span>
                        ))}
                      -{isData && isData[0]?.category_name}
                      {isData && isData[0]?.facilityName}
                    </td>

                    <td className="table_tddd lineheight10">
                      {isData &&
                        isData[0]?.roomNumbers?.map((item) => (
                          <span>{item}, </span>
                        ))}
                    </td>
                    {/* roomAmountSum advanceAmountSum */}
                    <td className="table_tddd lineheight10">
                      {Number(isData && isData[0]?.roomAmountSum)}
                      .00
                    </td>
                    <td className="table_tddd lineheight10">
                      {Number(isData && isData[0]?.advanceAmountSum)}
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
                {isData[0]?.bookedByName}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="button_div_print_download">
        <button onClick={() => handlePrint()}>Print</button>
      </div>
    </>
  );
}

export default PrintOnlysetup;
