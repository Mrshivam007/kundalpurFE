import React, { useState, useEffect } from 'react';
import images from '../../../../assets/images.png';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useDispatch, useSelector } from 'react-redux';
import payicon from '../../../../assets/payicon.png';
import { useNavigate } from 'react-router-dom';
import { serverInstance } from '../../../../API/ServerInstance';
import { Container } from '@mui/system';
import styles from '../../donationHistory/DonationHistory1.module.css';
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

function BookingHistory1({
  setopendashboard,
  setshowreciept,
  setHeaderFooter,
}) {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [donationdate, setdonationdate] = useState('');
  const [paymentstatus, setpaymentstatus] = useState('');
  const [fromdate, setfromdate] = useState('');
  const [todate, settodate] = useState('');
  const [showpaymentfailed, setshowpaymentfailed] = useState(false);
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

  React.useEffect(() => {
    setopendashboard(false),
      setshowreciept(false),
      setHeaderFooter(false),
      gettable();
  }, []);
  const gettable = () => {
    serverInstance('room/checkin-history-user', 'get').then((res) => {
      if (res?.data) {
        let filteredData = res?.data?.userCheckinData.filter(
          (item) => item?.paymentStatus === 1,
        );
        setisrow(filteredData);
        setisDataDummy(filteredData);
        console.log('room history', res.data);
      }
    });
  };

  const downloadrecept = (row) => {
    console.log('Print');
    navigation('/admin-panel/Room/OnlinePrintReceipt', {
      state: {
        data: row,
      },
    });
  };

  const filterdata = () => {
    serverInstance(
      `room/checkin-history-user?fromDate=${fromdate}&toDate=${todate}&paymentStatus=${paymentstatus}`,
      'get',
    ).then((res) => {
      if (res?.data) {
        setisrow(res?.data?.userCheckinData);
        setisDataDummy(res?.data?.userCheckinData);
        console.log('room history', res.data);
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
                Payment Status
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
              <h>Room Booking History</h>
            </div>
          </div>

          <div className={styles.add_divmarginn10}>
            <div className={styles.tablecontainer}>
              <table className={styles.tabletable}>
                <tbody>
                  <tr className={styles.tabletr}>
                    <th align="left">CHECKIN DATE</th>
                    <th align="left">CHECKOUT DATE</th>
                    <th align="left">MObile_No</th>
                    <th align="left">Name</th>
                    <th align="left">Father's_name</th>
                    <th align="left">Address</th>
                    <th align="left">Male</th>
                    <th align="left">Female</th>
                    <th align="left">Children</th>
                    <th align="left">No_of_Rooom</th>
                    <th align="left">Payment_Id</th>
                    <th align="left">Status</th>
                    <th align="left">Receipt</th>
                  </tr>
                  {isrow && (
                    <>
                      {isrow &&
                        isrow.reverse().map((row, index) => (
                          <tr key={index}>
                            <div style={{ display: 'none' }}>
                              {(status = row.active)}
                            </div>
                            <td align="left">
                              {moment(row?.date).format('DD/MM/YYYY')}
                            </td>
                            <td align="left">
                              {moment(row?.coutDate).format('DD/MM/YYYY')}
                            </td>
                            <td align="left">{row?.contactNo}</td>
                            <td align="left"> {row?.name}</td>

                            <td align="left">{row?.Fname}</td>
                            <td align="left">{row?.address}</td>
                            <td align="left">{row?.male}</td>
                            <td align="left">{row?.female}</td>
                            <td align="left">{row?.child}</td>
                            <td align="left">{row?.nRoom}</td>
                            <td align="left">
                              {row?.paymentid ? row?.paymentid : '-'}
                            </td>
                            <td align="left">
                              {row?.paymentStatus === 1
                                ? 'Payment successful'
                                : 'Payment failed'}
                            </td>
                            <td
                              onClick={() => {
                                downloadrecept(row);
                              }}
                              align="left"
                              // style={{
                              //   cursor: 'pointer',
                              //   color: row.paymentStatus === '1' ? '' : 'red',
                              // }}
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

export default BookingHistory1;
