import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentStatusPage.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { serverInstance } from '../../../API/ServerInstance';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from '../../../Redux/redux/action/AuthAction';
import { backendApiUrl } from '../../../config/config';
import axios from 'axios';

export default function PaymentStatusPage({ setHeaderFooter, setpaymentId }) {
  const dispatch = useDispatch();
  const [transactionID, setTransactionID] = useState(false);
  const [donationDeatils, setDonationDetails] = useState(null);
  const { user } = useSelector((state) => state.userReducer);
  const { search } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    setHeaderFooter(true);
    dispatch(loadUser());
  }, []);

  useEffect(() => {
    if (search) {
      let value = new URLSearchParams(search).get('t');
      if (value) {
        setTransactionID(value);
        setpaymentId(value);
      }
    } else {
      setTransactionID(false);
    }

    serverInstance(`admin/donation-list`, 'get').then((res) => {
      if (res.status) {
        setDonationDetails(res.data[0]);
      }
    });
  }, [search]);

  const sendsms = async (amount, recieptno) => {
    try {
      axios.defaults.headers.post[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;
      await axios.post(`${backendApiUrl}user/sms`, {
        mobile: user?.mobileNo,
        amount: amount,
        rno: recieptno,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (transactionID) {
    if (user) {
      sendsms(donationDeatils?.AMOUNT, donationDeatils?.RECEIPT_NO);
    }
  }
  return (
    <>
      <div className="payment-status-page">
        <div className="payment-status-container">
          {transactionID ? (
            <CheckCircleIcon className="icon-success icon" />
          ) : (
            <ErrorIcon className="icon-failed icon" />
          )}
          <h2
            className={
              transactionID
                ? 'payment-status'
                : 'payment-status payment-status-failed'
            }
          >
            {transactionID ? 'Payment Success!!' : 'Payment Failed'}
          </h2>
          {transactionID && <h3>Donated ₹{donationDeatils?.AMOUNT}</h3>}
          {transactionID ? (
            <p className="payment-description">
              Thank you for your donation. Your transaction has been completed
              with{' '}
              {donationDeatils && `Order Number: ${donationDeatils.RECEIPT_NO}`}
              <br />
            </p>
          ) : (
            <p className="payment-description">
              Your payment is failed.Don't worry if its deducted from you bank
              account then it will refund soon. You can donate again by{' '}
              <span onClick={() => navigate('/donation')}>clicking here</span>
            </p>
          )}

          {transactionID && (
            <>
              <div className="btns-wrapper">
                <button
                  className="btn-donation-status"
                  onClick={() => navigate('/onlinereceipt')}
                >
                  Download Receipt
                </button>
                <button
                  className="btn-donation-status"
                  onClick={() => navigate('/donationhistory')}
                >
                  Donation History
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
