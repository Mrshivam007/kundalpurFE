import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { serverInstance } from '../../../../API/ServerInstance';
import './PaymentSuccess.css';
function PaymentSuccess({ setopendashboard }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = useLocation();
  const [isData, setisData] = useState('');
  const [checkindata, setcheckindata] = useState('');
  const [transactionID, setTransactionID] = useState(true);
  const [paymentmode, setpaymentmode] = useState(false);
  const [bookdetails, setbookdetails] = useState(null);

  // useEffect(() => {
  //   if (search) {
  //     let value = new URLSearchParams(search).get('t');
  //     if (value) {
  //       setTransactionID(value);
  //     }
  //   } else {
  //     setTransactionID(false);
  //   }

  //   serverInstance(`room/checkin`, 'get').then((res) => {
  //     if (res?.data) {
  //       setbookdetails(res?.data);
  //     }

  //     console.log(res?.data.pop());
  //   });
  // }, [search]);

  useEffect(() => {
    if (location.state) {
      setisData(location?.state?.data);
      setcheckindata(location?.state?.checkindata);
    }
    setopendashboard(true);
  }, []);

  var options = { year: 'numeric', month: 'short', day: '2-digit' };
  var today = new Date(isData && isData.data[0]?.date);
  const currDate = today
    .toLocaleDateString('en-IN', options)
    .replace(/-/g, ' ');
  const currTime = today.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  var today1 = new Date(isData && isData.data[0]?.coutDate);
  const currDate1 = today1
    .toLocaleDateString('en-IN', options)
    .replace(/-/g, ' ');
  const currTime1 = today1.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return (
    <>
      <div style={{ marginLeft: '5rem', marginRight: '1.2rem' }}>
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
                    <p>Mobile number</p>
                    <p>Amount Paid</p>
                    <p>Advance Rate</p>
                    <p>Booking id</p>
                    <p>Room No</p>
                    <p>Check in date time</p>
                    <p>Check out date time</p>
                    <p>Transaction id</p>
                  </div>
                  <div className="name_of_divvsssssv10">
                    <p>{transactionID ? 'UPI' : 'Cash'}</p>
                    {/* <p>HDFC</p> */}
                    <p>{isData.data && isData.data[0]?.contactNo}</p>

                    <p>
                      {checkindata &&
                        checkindata?.roomcount?.length *
                          Number(
                            checkindata?.dharamshala &&
                              checkindata?.dharamshala[0]?.advance,
                          )}
                    </p>
                    <p>
                      {checkindata?.dharamshala &&
                        checkindata?.dharamshala[0]?.advance}
                    </p>
                    <p>{isData.data && isData.data[0]?.booking_id}</p>
                    <p>
                      {isData &&
                        isData?.data &&
                        isData?.data?.map((item) => {
                          return <span> {item?.RoomNo}</span>;
                        })}
                    </p>
                    <p>
                      {currDate} / {currTime}
                    </p>
                    <p>
                      {currDate1} / {currTime1}
                    </p>
                    <p>125362547859</p>
                  </div>
                </div>
                <div className="payment_btn_duvvvvvv">
                  <button
                    onClick={() =>
                      navigate('/admin-panel/room/roombookingcetificate', {
                        state: {
                          data: isData,
                          checkindata: checkindata,
                        },
                      })
                    }
                    className="payment_btn_duvvvvvv10"
                  >
                    Confirmation
                  </button>
                  <button
                    onClick={() => navigate('/admin-panel/room/checkin')}
                    className="payment_btn_duvvvvvv11"
                  >
                    Booking report
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mainFail_div">
                  <p className="payment-description">
                    Your payment is failed.Don't worry if its deducted from you
                    bank account then it will refund soon. You can try again
                    by&nbsp;&nbsp;
                    <span
                      style={{ color: 'blue' }}
                      onClick={() => navigate('/admin-panel/room/checkin')}
                    >
                      clicking here
                    </span>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentSuccess;
