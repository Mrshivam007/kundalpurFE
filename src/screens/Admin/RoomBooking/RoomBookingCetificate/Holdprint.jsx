import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useReactToPrint } from 'react-to-print';
import './RoomBookingCetificate.css';
import moment from 'moment';
function Holdprint({ setopendashboard }) {
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
  var today = new Date(isData && isData?.remain);
  const currDate = today
    .toLocaleDateString('en-IN', options)
    .replace(/-/g, ' ');
  const currTime = today.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  var today1 = new Date(isData && isData?.since);
  const currDatecheckout = today1
    .toLocaleDateString('en-IN', options)
    .replace(/-/g, ' ');
  const currTimecheckout = today1.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  let difference = today.getTime() - today1.getTime();
  let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));

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
            style={{ marginLeft: '0rem', marginTop: '5.2rem' }}
          >
            <div style={{ backgroundColor: '#FE0002' }}>
              <p className="yadda_text lineheight">यात्री आगमन रसीद(होल्ड)</p>
            </div>

            <div className="innear_div_texx">
              <div className="innear_div_texx_ddd">
                <div>
                  <p className="lineheight">मोबाईल न :</p>
                  <p className="lineheight">यात्री का नाम :</p>
                </div>
                <div className="main_left">
                  <p className="lineheight">{isData && isData?.mobile}</p>
                  <p className="lineheight">{isData && isData?.name}</p>
                </div>
              </div>
              <div className="innear_div_texx_ddd">
                <div>
                  <p className="lineheight">होल्ड आगमन दिनांक :</p>
                  <p className="lineheight">होल्ड प्रस्थान दिनाँक :</p>

                  <p className="lineheight">स्टे :</p>
                </div>
                <div className="main_left">
                <p className="lineheight">
                    {currDatecheckout}/{convertTime12to24(currTimecheckout)}
                  </p>
                  <p className="lineheight">
                    {currDate}/{convertTime12to24(currTime)}
                  </p>

                  <p className="lineheight">{TotalDays && TotalDays} Days</p>
                </div>
              </div>
            </div>

            <div>
              <table className="table_ddd">
                <tbody>
                  <tr>
                    <td className="table_tddd lineheight10">धर्मशाला नाम</td>
                    <td className="table_tddd lineheight10">
                      रूम टाईप & रूम न.
                    </td>
                  </tr>
                  <tr>
                    <td className="table_tddd lineheight10">
                      {isData?.dharmasala?.name
                        ? isData?.dharmasala?.name
                        : isData?.dharmashalaName}
                    </td>
                    <td className="table_tddd lineheight10">
                      {isData?.categoryName && isData?.categoryName}(
                      {isData?.roomNo})
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
                {isData && isData?.holdByName}
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

export default Holdprint;
