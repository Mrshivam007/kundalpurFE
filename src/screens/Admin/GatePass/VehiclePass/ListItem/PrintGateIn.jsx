import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useReactToPrint } from 'react-to-print';
import moment from 'moment';

function PrintGateIn({ setopendashboard }) {
  const adminName = sessionStorage.getItem('adminName');
  const empName = sessionStorage.getItem('empName');
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
    if (location?.state) {
      setisData(location?.state?.data);
    }
    setTimeout(() => {
      handlePrint();
    }, 10);
    setopendashboard(true);
  }, []);
  console.log('certificate', isData);

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

  var today1 = new Date();
  const currDatecheckout = today1
    .toLocaleDateString('en-IN', options)
    .replace(/-/g, ' ');
  const currTimecheckout = today1.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  let difference = today1.getTime() - today.getTime();
  let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
  let days = TotalDays === 1 ? 1 : TotalDays - 1;

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
            <div>
              <p className="yadda_text lineheight">Vehicle Gate Pass</p>
            </div>
            <div className="innear_div_texx">
              <div className="innear_div_texx_dd">
                <div>
                  <p className="lineheight">Name:</p>
                  <p className="lineheight">Vehicle Name:</p>
                  <p className="lineheight">Vehicle No:</p>
                  <p className="lineheight">Phone Number:</p>
                </div>
                <div className="main_left">
                  <p className="lineheight">{isData && isData?.Name}</p>
                  <p className="lineheight">{isData && isData?.VehicleName}</p>
                  <p className="lineheight">{isData && isData?.VehicleNo}</p>
                  <p className="lineheight">{isData && isData?.MobileNo}</p>
                </div>
              </div>
              <div className="innear_div_texx_dd" style={{ marginLeft: '0px' }}>
                <div>
                  <p className="lineheight">Vehicle In:</p>
                  <p className="lineheight">Vehicle Type:</p>
                  <p className="lineheight">Address:</p>
                  <p className="lineheight">Remark:</p>
                </div>
                <div className="main_left">
                  <p className="lineheight">
                    {currDatecheckout}/
                    {convertTime12to24(
                      moment(new Date(isData?.Date), 'HH:mm:ss').format('hh:mm A'),
                    )}
                  </p>
                <p className="lineheight">{isData?.VehicleType}</p>
                  <p className="lineheight">{isData && isData?.Address}</p>
                  <p className="lineheight">{isData && isData?.Remark}</p>
                </div>
              </div>
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

export default PrintGateIn;
