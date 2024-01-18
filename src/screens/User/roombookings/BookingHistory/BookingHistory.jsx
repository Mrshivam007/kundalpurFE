import React, { useState, useEffect } from 'react';
import images from '../../../../assets/images.png';
import ChequeSuccessfull from '../../donation/chequeSuccessfull/ChequeSuccessfull';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import moment, { isDate } from 'moment';
import { useNavigate } from 'react-router-dom';
import { serverInstance } from '../../../../API/ServerInstance';
import './BookingHistory.css';
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
function BookingHistory({ setopendashboard, setshowreciept, setHeaderFooter }) {
  const dispatch = useDispatch();
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

  console.log('sss', isrow);
  console.log(isrow);
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
    serverInstance('room/checkin-history-user', 'get').then((res) => {
      if (res.data) {
        setisrow(res?.data?.userCheckinData);

        console.log('room history', res.data);
      }
    });
  };

  const downloadrecept = (row) => {
    console.log("Print")
    navigation('/admin-panel/Room/OnlinePrintReceipt', {
      state: {
        data: row,
      },
    });
    
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
                      Ok
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

      <div className="amin_room_booking">
        <div>
          <div className="center_search_client">
            <div className="donation-history-text">
              <h2>Booking</h2>
              <p>Room Booking History</p>
            </div>
          </div>

          <div className="container">
            <table style={{ borderCollapse: 'collapse' }}>
              <thead style={{ background: '#F1F0F0' }}>
                <tr>
                  <th align="left">DATE</th>
                  <th align="left">MObile NO</th>
                  <th align="left">Name</th>
                  <th align="left">Father's name</th>
                  <th align="left">Address</th>
                  <th align="left">Male</th>
                  <th align="left">Female</th>
                  <th align="left">Children</th>
                  <th align="left">No of Rooom</th>
                  <th align="left">Payment id</th>
                  <th align="left">Status</th>
                  <th align="left">Receipt</th>
                </tr>
              </thead>
              <tbody>
                {isrow && (
                  <>
                    {isrow &&
                      isrow.reverse().map((row, index) => (
                        <tr key={index}>
                          <div style={{ display: 'none' }}>
                            {(status = row.active)}
                          </div>
                          <td align="left">
                            {moment(row?.DATE_OF_DAAN).format('DD/MM/YYYY')}
                          </td>
                          <td align="left">{row?.contactNo}</td>
                          <td align="left"> {row?.name}</td>

                          <td align="left">{row.Fname}</td>
                          <td align="left">{row.address}</td>
                          <td align="left">{row.male}</td>
                          <td align="left">{row.female}</td>
                          <td align="left">{row.child}</td>
                          <td align="left">{row.nRoom}</td>
                          <td align="left">
                            {row.paymentid ? row.paymentid : '-'}
                          </td>
                          <td align="left">
                            {row.paymentStatus === 1
                              ? 'Payment succrssfull'
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
    </>
  );
}

export default BookingHistory;
