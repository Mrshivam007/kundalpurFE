import React, { useState, useEffect } from 'react';
import images from '../../../assets/images.png';
import ChequeSuccessfull from '../donation/chequeSuccessfull/ChequeSuccessfull';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import moment, { isDate } from 'moment';
import './DonationHistory.css';
import { useNavigate } from 'react-router-dom';
import { serverInstance } from '../../../API/ServerInstance';
import { Container } from '@mui/system';
import styles from './DonationHistory1.module.css';
import LoadingSpinner from '../../../components/Loading/LoadingSpinner';
const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '12px',
  bgcolor: 'background.paper',

  boxShadow: 24,
  p: 2,
};
let status;

function DonationHistory1({
  setopendashboard,
  setshowreciept,
  setHeaderFooter,
}) {
  const [fromdate, setfromdate] = useState('');
  const [todate, settodate] = useState('');
  const [loading, setloading] = useState(false);
  const [showpaymentfailed, setshowpaymentfailed] = useState(false);
  const [donationdate, setdonationdate] = useState('');
  const [paymentstatus, setpaymentstatus] = useState('');
  const navigation = useNavigate();
  const [isrow, setisrow] = useState([]);
  const [isDataDummy, setisDataDummy] = useState([]);
  const [page, setPage] = useState(0);
  const [open1, setOpen1] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [useindonationhistory, setuseindonationhistory] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const { user } = useSelector((state) => state.userReducer);

  useEffect(() => {
    setopendashboard(false), setshowreciept(false), setHeaderFooter(false);
  }, []);

  const downloadrecept = (row) => {
    if (row.active === '0') {
      handleOpen1();
      setuseindonationhistory(true);
    } else if (row.PAYMENT_ID === '') {
      handleOpen1();
      setshowpaymentfailed(true);
    } else {
      navigation('/onlinereceipt', {
        state: {
          userdata: row,
        },
      });
    }
  };
  const gettable = () => {
    try {
      setloading(true);
      serverInstance('user/donation-list', 'get').then((res) => {
        let filteredData = res?.donation.filter(
          (item) => item?.PAYMENT_STATUS === true,
        );
        setisrow(filteredData);
        setisDataDummy(filteredData);
        setloading(false);
      });
    } catch (error) {
      setloading(false);
    }
  };

  useEffect(() => {
    gettable();
  }, []);

  const filterdata = () => {
    try {
      setloading(true);
      serverInstance(
        `user/donation-list?PAYMENT_STATUS=${paymentstatus}&fromDate=${fromdate}&toDate=${todate}`,
        'get',
      ).then((res) => {
        if (res?.donation) {
          setisrow(res?.donation);
          setisDataDummy(res?.donation);
          setloading(false);
        }
      });
    } catch (error) {
      setloading(false);
    }
  };

  const reset = () => {
    setdonationdate('');
    setpaymentstatus('');
    gettable();
  };
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open1}
        onClose={handleClose1}
        closeAfterTransition
      >
        <Fade in={open1}>
          <Box sx={style}>
            {showpaymentfailed ? (
              <>
                <div className="PaymentSuccessfull-main-div">
                  <div className="PaymentSuccessfull-main-div-innear">
                    <img src={images} alt=" images " />
                    <p style={{ textAlign: 'center' }}>
                      Your payment has been not done
                    </p>

                    <button
                      onClick={() => {
                        handleClose1();
                      }}
                      className="ok_btn"
                    >
                      Ok!!
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <ChequeSuccessfull
                  handleClose={handleClose1}
                  useindonationhistory={useindonationhistory}
                />
              </>
            )}
          </Box>
        </Fade>
      </Modal>
      <div className="mainContainer">
        <div>
          <div className={styles.topmenubar}>
            <div className={styles.searchoptiondiv}>
              <div className={styles.searchoptiondiv}>
                <label>From Date</label>
                <input
                  className={styles.opensearchinput}
                  type="date"
                  value={fromdate}
                  name="fromdate"
                  onChange={(e) => setfromdate(e.target.value)}
                />
                <label>To Date</label>
                <input
                  className={styles.opensearchinput}
                  type="date"
                  value={todate}
                  name="todate"
                  onChange={(e) => settodate(e.target.value)}
                />
                <label>Payment Status</label>
                <select
                  className={styles.opensearchinput}
                  sx={{
                    width: '18.8rem',
                    fontSize: 14,
                    '& .MuiSelect-select': {
                      paddingTop: '0.6rem',
                      paddingBottom: '0.6em',
                    },
                  }}
                  value={paymentstatus}
                  name="paymentstatus"
                  onChange={(e) => setpaymentstatus(e.target.value)}
                  displayEmpty
                >
                  <option
                    sx={{
                      fontSize: 14,
                    }}
                    value={''}
                  >
                    ALL
                  </option>
                  <option
                    sx={{
                      fontSize: 14,
                    }}
                    value={1}
                  >
                    Succrssfull
                  </option>
                  <option
                    sx={{
                      fontSize: 14,
                    }}
                    value={0}
                  >
                    Failed
                  </option>
                </select>
                <button onClick={() => filterdata()}>Search</button>
              </div>
              <button onClick={() => reset()}>Reset</button>
            </div>
            <div className={styles.imgdivformat}>
              <h>Donation History</h>
            </div>
          </div>

          <div className={styles.add_divmarginn10}>
            <div className={styles.tablecontainer}>
              <table className={styles.tabletable}>
                <tbody>
                  <tr className={styles.tabletr}>
                    <th align="left">DATE</th>
                    <th align="left">Receipt_No</th>
                    <th align="left">Mobile_No</th>
                    <th align="left">NAME</th>
                    <th align="left">Address</th>
                    <th align="left">Donation_Type</th>
                    <th align="left">Amount</th>
                    <th align="left">Cheque_No.</th>
                    <th align="left">Date_Of_submission</th>
                    <th align="left">Name_Of_Bank</th>
                    <th align="left">Payment_iId</th>
                    <th align="left">Status</th>
                    <th align="left">Certificate</th>
                  </tr>
                  {isrow && (
                    <>
                      {isrow &&
                        isrow?.reverse()?.map((row, index) => (
                          <tr key={index}>
                            <div style={{ display: 'none' }}>
                              {(status = row.active)}
                            </div>
                            <td align="left">
                              {moment(row?.DATE_OF_DAAN).format('DD/MM/YYYY')}
                            </td>
                            <td align="left">{row.RECEIPT_NO}</td>
                            <td align="left"> {user?.mobileNo}</td>

                            <td align="left">{row.NAME}</td>
                            <td align="left">{row.ADDRESS}</td>
                            <td align="left">{row.MODE_OF_DONATION}</td>
                            <td align="left">{row.AMOUNT}</td>
                            <td align="left">
                              {row.CHEQUE_NO ? row.CHEQUE_NO : '-'}
                            </td>
                            <td align="left">
                              {row.DATE_OF_CHEQUE ? row.DATE_OF_CHEQUE : '-'}
                            </td>
                            <td align="left">
                              {row.NAME_OF_BANK ? row.NAME_OF_BANK : '-'}
                            </td>
                            <td align="left">
                              {row.PAYMENT_ID ? row.PAYMENT_ID : '-'}
                            </td>
                            <td align="left">
                              {row.PAYMENT_STATUS === true
                                ? 'Payment Successful'
                                : 'Payment failed'}
                            </td>
                            <td
                              onClick={() => {
                                downloadrecept(row);
                              }}
                              align="left"
                              style={{
                                cursor: 'pointer',
                                color: status === '0' ? 'red' : '',
                              }}
                            >
                              download
                            </td>
                          </tr>
                        ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {loading && <LoadingSpinner />}
    </>
  );
}

export default DonationHistory1;
