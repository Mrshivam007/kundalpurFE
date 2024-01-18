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
function DonationHistory({
  setopendashboard,
  setshowreciept,
  setHeaderFooter,
}) {
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
    serverInstance('user/donation-list', 'get').then((res) => {
      setisrow(res.donation);
    });
  };

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
      <div className="DonationHistory-main-div">
        <div className="table-div-maain-donation-table-main">
          <div className="center_search_client">
            <div className="donation-history-text">
              <h2>DONATIONS</h2>
              <p>All Donations History</p>
            </div>
          </div>

          <div className="container">
            <table style={{ borderCollapse: 'collapse' }}>
              <thead style={{ background: '#F1F0F0' }}>
                <tr>
                  <th align="left">DATE</th>
                  <th align="left">Receipt No</th>
                  <th align="left">Mobile No</th>
                  <th align="left">NAME</th>
                  <th align="left">Address</th>
                  <th align="left">Donation Type</th>
                  <th align="left">Amount</th>
                  <th align="left">Cheque No.</th>
                  <th align="left">Date_Of_submission</th>
                  <th align="left">Name_of_Bank</th>
                  <th align="left">Payment_Id</th>
                  <th align="left">Status</th>
                  <th align="left">certificate</th>
                </tr>
              </thead>
              <tbody>
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
                              ? 'Payment succrssfull'
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
    </>
  );
}

export default DonationHistory;
