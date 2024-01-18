import React, { useState, useEffect } from 'react';
import images from '../../../assets/images.png';
import ChequeSuccessfull from '../donation/chequeSuccessfull/ChequeSuccessfull';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useDispatch, useSelector } from 'react-redux';
import payicon from '../../../assets/payicon.png';
import { useNavigate } from 'react-router-dom';
import { serverInstance } from '../../../API/ServerInstance';
import { Container } from '@mui/system';
import styles from '../donationHistory/DonationHistory1.module.css';
import moment, { isDate } from 'moment';
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

function PendingBoli1({ setopendashboard, setshowreciept, setHeaderFooter }) {
  const [fromdate, setfromdate] = useState('');
  const [todate, settodate] = useState('');
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [donationdate, setdonationdate] = useState('');
  const [paymentstatus, setpaymentstatus] = useState('');
  const [showpaymentfailed, setshowpaymentfailed] = useState(false);
  const navigation = useNavigate();
  const [isrow, setisrow] = useState([]);
  const [page, setPage] = useState(0);
  const [open1, setOpen1] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [useindonationhistory, setuseindonationhistory] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const { user } = useSelector((state) => state.userReducer);

  React.useEffect(() => {
    setopendashboard(false),
      setshowreciept(false),
      setHeaderFooter(false),
      gettable();
  }, []);
  useEffect(() => {
    // setshowreciept(false);
  }, []);

  const gettable = () => {
    serverInstance('boli/get-boliLedgerByNum', 'get').then((res) => {
      if (res?.status) {
        setisrow(res?.data);
      }
    });
  };

  const filterdata = () => {
    serverInstance(
      `boli/get-boliLedgerByNum?createdAt=${donationdate}&fromDate=${fromdate}&toDate=${todate}`,
      'get',
    ).then((res) => {
      if (res?.status) {
        setisrow(res?.data);
      }
    });
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
                {/* <select
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
                    ALL Status
                  </option>
                  <option
                    sx={{
                      fontSize: 14,
                    }}
                    value={1}
                  >
                    Completed Boli
                  </option>
                  <option
                    sx={{
                      fontSize: 14,
                    }}
                    value={0}
                  >
                    Pending Boli
                  </option>
                </select> */}
                <button onClick={() => filterdata()}>Search</button>
              </div>
              <button onClick={() => reset()}>Reset</button>
            </div>
            <div className={styles.imgdivformat}>
              <h>Pending Boli</h>
            </div>
          </div>

          <div className={styles.add_divmarginn10}>
            <div className={styles.tablecontainer}>
              <table className={styles.tabletable}>
                <tbody>
                  <tr className={styles.tabletr}>
                    {/* <th align="left">DATE</th> */}
                    <th align="left">Ledger_No</th>
                    <th align="left">Mobile_No</th>
                    <th align="left">Full_Name</th>
                    <th align="left">Address</th>

                    <th align="left">City</th>
                    <th align="left">State</th>
                    <th align="left">Pincode</th>
                    <th align="left">Aadhar_No</th>
                    <th align="left">PAN_No</th>
                    <th align="left">Total_Amount</th>
                    <th align="left">Deposit_Amount</th>
                    <th align="left">Pending_Amount</th>
                    <th align="left">Action</th>
                  </tr>
                  {isrow && (
                    <>
                      {isrow?.length > 0 &&
                        isrow?.map((row, index) => (
                          <tr key={index}>
                            <div style={{ display: 'none' }}>
                              {(status = row.active)}
                            </div>
                            {/* <td align="left">
                              {moment(row?.date).format('DD/MM/YYYY')}
                            </td> */}

                            <td>{row?.LedgerNo}</td>
                            <td>{row?.MobileNo}</td>
                            <td>{row?.Name}</td>
                            <td>{row?.Address}</td>

                            <td>{row?.City}</td>
                            <td>{row?.State}</td>
                            <td>{row?.PinCode}</td>

                            <td>{row?.AadharNo}</td>
                            <td>{row?.PanNo}</td>
                            <td>
                              {Number(row?.OpeningBalance) +
                                Number(row?.TotalAmount)}
                            </td>
                            <td>{row?.DepositedAmount}</td>
                            <td>
                              {Number(row?.OpeningBalance) +
                                Number(row?.TotalAmount) -
                                Number(row?.DepositedAmount)}
                            </td>
                            <td
                              onClick={() =>
                                navigation('/donation', {
                                  state: {
                                    bolidata: row,
                                  },
                                })
                              }
                            >
                              <img
                                src={payicon}
                                alt="imgd"
                                style={{ width: '2rem', height: '2rem' }}
                              />
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

export default PendingBoli1;
