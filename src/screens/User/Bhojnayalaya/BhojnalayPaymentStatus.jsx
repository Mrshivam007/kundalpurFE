import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BhojnalayPaymentStatus.css'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { serverInstance } from '../../../API/ServerInstance';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from '../../../Redux/redux/action/AuthAction';
import { backendApiUrl } from '../../../config/config';
import axios from 'axios';

export default function BhojnalayPaymentStatusPage({ setHeaderFooter, setpaymentId }) {
    const dispatch = useDispatch();
    const [transactionID, setTransactionID] = useState(false);
    const [bhojnalayDetails, setBhojnalayDetails] = useState(null);
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

        serverInstance(`user/get-bhojnalay`, 'get').then((res) => {
            if (res.status) {
                setBhojnalayDetails(res.data[0]);
            }
        });
    }, [search]);

    //   const sendsms = async (amount, recieptno) => {
    //     try {
    //       axios.defaults.headers.post[
    //         'Authorization'
    //       ] = `Bearer ${sessionStorage.getItem('token')}`;
    //       await axios.post(`${backendApiUrl}user/sms`, {
    //         mobile: user?.mobileNo,
    //         amount: amount,
    //         rno: recieptno,
    //       });
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };

    if (transactionID) {
        if (user) {
            sendsms(bhojnalayDetails?.TotalAmount, bhojnalayDetails?.ReceiptNo);
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
                    {transactionID && <h3>Booked ₹{bhojnalayDetails?.TotalAmount}</h3>}
                    {transactionID ? (
                        <p className="payment-description">
                            Thank you for Booking Bhojnalay. Your transaction has been completed
                            with{' '}
                            {bhojnalayDetails && `Order Number: ${bhojnalayDetails.ReceiptNo}`}
                            <br />
                        </p>
                    ) : (
                        <p className="payment-description">
                            Your payment is failed.Don't worry if its deducted from you bank
                            account then it will refund soon. You can book again by{' '}
                            <span onClick={() => navigate('/bhojnayalay')}>clicking here</span>
                        </p>
                    )}

                    {transactionID && (
                        <>
                            <div className="btns-wrapper">
                                <button
                                    className="btn-donation-status"
                                    onClick={() => navigate('/bhojnalayreceipt')}
                                >
                                    Download Receipt
                                </button>
                                <button
                                    className="btn-donation-status"
                                    onClick={() => navigate('/bhojnalayhistory')}
                                >
                                    Bhojnalay History
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
