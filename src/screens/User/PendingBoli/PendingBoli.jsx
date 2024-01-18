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
function PendingBoli({ setopendashboard, setshowreciept, setHeaderFooter }) {
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
    serverInstance('boli/get-boliLedgerByNum', 'get').then((res) => {
      if (res?.status) {
        setisrow(res?.data);
      }
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
      <div className="DonationHistory-main-div">
        <div className="table-div-maain-donation-table-main">
          <div className="center_search_client">
            <div className="donation-history-text">
              <h2>Boli</h2>
              <p>All Boli History</p>
            </div>
          </div>

          <div className="container">
            <table style={{ borderCollapse: 'collapse' }}>
              <thead style={{ background: '#F1F0F0' }}>
                <tr>
                  <th align="left">DATE</th>
                  <th align="left">Ledger No</th>
                  <th align="left">Mobile No</th>
                  <th align="left">Full Name</th>
                  <th align="left">Address</th>
                  <th align="left">City</th>
                  <th align="left">Pincode</th>
                
                  <th align="left">Aadhar No</th>
                  <th align="left">PAN No</th>
                  <th align="left">Total Amount</th>
                  <th align="left">Deposit Amount</th>
                  <th align="left">Pending Amount</th>
                  <th align="left">Action</th>
                </tr>
              </thead>
              <tbody>
                {isrow && (
                  <>
                    {isrow?.length > 0 &&
                      isrow?.map((row, index) => (
                        <tr key={index}>
                          <div style={{ display: 'none' }}>
                            {(status = row.active)}
                          </div>
                          <td>{row?.LedgerNo}</td>
                          <td>{row?.MobileNo}</td>
                          <td>{row?.Name}</td>
                          <td>{row?.Address}</td>
                          <td>{row?.City}</td>
                          <td>{row?.PinCode}</td>
                          <td>{row?.State}</td>
                          {/* <td >
                          {row?.Country}
                        </td> */}
                          {/* <td >
                          {row?.Email}
                        </td> */}
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
    </>
  );
}

export default PendingBoli;
