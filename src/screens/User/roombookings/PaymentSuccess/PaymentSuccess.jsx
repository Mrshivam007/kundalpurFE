import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { serverInstance } from '../../../../API/ServerInstance';
import Swal from 'sweetalert2';
import './PaymentSuccess.css';

function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = useLocation();
  const [isData, setisData] = useState('');
  const [dharamshalaname, setdharamshalaname] = useState('');
  const [checkinda, setcheckinda] = useState('');
  const [transactionID, setTransactionID] = useState('');
  const [bookdetails, setbookdetails] = useState(null);
  const [paymentid, setpaymentid] = useState('');
  const [bookingid, setbookingid] = useState('');
  useEffect(() => {
    if (search) {
      let value = new URLSearchParams(search).get('t');
      let bookingId = new URLSearchParams(search).get('booking_id');
      if (value) {
        setTransactionID(true);

        setpaymentid(value);
        setbookingid(bookingId);
        serverInstance(`/room/booking-info/${bookingId}`, 'GET').then((res) => {
          if (res?.data) {
            setisData(res?.data);
          }
        });
      } else {
        let bookingId = new URLSearchParams(search).get('booking_id');
        if (bookingId) {
          serverInstance('/room/cancel-checkin', 'DELETE', {
            bookingId: bookingId,
          }).then((res) => {});
        }
      }
    } else {
      setTransactionID(false);
    }
  }, [search]);

  useEffect(() => {
    if (location.state) {
      setcheckinda(location?.state?.checkindata);
      setdharamshalaname(location?.state?.categoryname);
    }
  }, []);

  var options = { year: 'numeric', month: 'short', day: '2-digit' };
  var today = new Date(checkinda?.checkouttime);
  const currDate = today
    .toLocaleDateString('en-IN', options)
    .replace(/-/g, ' ');
  const currTime = today.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  var today1 = new Date(checkinda?.checkintime);
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

  console.log('days from siuccedfull scvrens ', TotalDays);
  return (
    <>
      <div className="main_div_head_tyopeeeebook">
        <div className="form_div_absolutebook_payment">
          <div className="centerdivhh">
            {transactionID ? (
              <p style={{ color: '#11b411' }}> Payment successful</p>
            ) : (
              <p style={{ color: 'red' }}> Payment Failed</p>
            )}
            {transactionID ? (
              <CheckCircleIcon
                className="icon-success icon"
                style={{ color: '#11b411' }}
              />
            ) : (
              <ErrorIcon
                className="icon-failed icon"
                style={{ color: 'red' }}
              />
            )}
          </div>
          {transactionID ? (
            <>
              <div className="name_of_divvsssssv">
                <div className="name_of_divvsssssv10">
                  <p>Payment type</p>
                  <p>Bank</p>
                  <p>Mobile number</p>
                  <p>Email</p>
                  <p>Amount Paid</p>
                  <p>Transaction id</p>
                </div>
                <div className="name_of_divvsssssv10">
                  <p>UPI</p>
                  <p>HDFC</p>
                  <p>{isData[0]?.contactNo}</p>
                  <p>{isData[0]?.email}</p>
                  <p>
                    {Number(isData[0]?.roomAmount) * Number(isData[0]?.nRoom) +
                      Number(isData[0]?.advanceAmount) *
                        Number(isData[0]?.nRoom)}
                  </p>
                  <p>{paymentid}</p>
                </div>
              </div>
              <div className="payment_btn_duvvvvvv">
                <button
                  onClick={() =>
                    navigate('/room/ReceiptBookingy', {
                      state: {
                        data: isData,
                        dharamshala: dharamshalaname,
                        checkindata: checkinda,
                      },
                    })
                  }
                  className="payment_btn_duvvvvvv10"
                >
                  Confirmation
                </button>
                <button
                  onClick={() => navigate('/bookinghistory')}
                  className="payment_btn_duvvvvvv11"
                >
                  Booking history
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="mainFail_div">
                <p className="payment-description">
                  Your payment is failed.Don't worry if its deducted from Your
                  bank account then it will refund soon. You can try again
                  by&nbsp;&nbsp;
                  <span
                    style={{ color: 'blue' }}
                    onClick={() => navigate('/roombooking')}
                  >
                    clicking here
                  </span>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default PaymentSuccess;
