import React, { useRef } from 'react';
import Typography from '@mui/material/Typography';
import { useReactToPrint } from 'react-to-print';
import Moment from 'moment-js';

function AlllPrintConsolatedRoom({ isData, handleClose }) {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  var options = { year: 'numeric', month: 'short', day: '2-digit' };
  var today = new Date();
  const currDate = today
    .toLocaleDateString('en-IN', options)
    .replace(/-/g, ' ');
  const currTime = today.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return (
    <>
      <div style={{ maxHeight: 'calc(80vh - 4rem)', overflowY: 'auto' }}>
        <div ref={componentRef}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <p>
              श्री दिगम्बर जैन सिद्धक्षेत्र कुण्डलगिरि कुण्डलपुर दमोह (म.प्र.)
            </p>

            <Typography variant="body2" color="primary" align="right">
              {currDate} / {currTime}
            </Typography>
            Consolidated(Room Booking)
          </div>
          <table>
            <tr
              className="margintop_add"
              style={{ borderBottom: '1px solid gray', fontSize: '14px' }}
            >
              <th>Date</th>
              <th>Employee Name</th>
              <th>CheckIn (Bank)</th>
              <th> CheckIn (Cash)</th>
              <th>Rent (Room)</th>
              <th>CheckOut (Return)</th>
              <th> Cancel Amount</th>
              <th>Total Amount</th>
            </tr>
            {isData &&
              isData?.map((row, index) => (
                <tr
                  key={row.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <td>{Moment(row?.date).format('DD-MM-YYYY')}</td>
                  <td>{row?.Username}</td>
                  <td>{row?.totalOnlineCheckinAmount}</td>
                  <td>{row?.totalCashCheckinAmount}</td>

                  <td>{row?.totalRateAmount}</td>
                  <td>{row?.totalCheckoutAmount}</td>
                  <td>{row?.totalCancelledAmount}</td>
                  <td>{row?.finalAmount}</td>
                </tr>
              ))}

            <tr
            //   className="margintop_add"
            //   style={{ borderBottom: '1px solid gray', fontSize: '14px' }}
            >
              <td></td>
           
              <td>Total Amount</td>
              <td style={{ fontWeight: 800 }}>
                {isData &&
                  isData?.reduce(
                    (n, { totalOnlineCheckinAmount }) =>
                      parseFloat(n) + parseFloat(totalOnlineCheckinAmount),
                    0,
                  )}
              </td>
              <td style={{ fontWeight: 800 }}>
                {isData &&
                  isData?.reduce(
                    (n, { totalCashCheckinAmount }) =>
                      parseFloat(n) + parseFloat(totalCashCheckinAmount),
                    0,
                  )}
              </td>

              <td style={{ fontWeight: 800 }}>
                {isData &&
                  isData?.reduce(
                    (n, { totalRateAmount }) =>
                      parseFloat(n) + parseFloat(totalRateAmount),
                    0,
                  )}
              </td>
              <td style={{ fontWeight: 800 }}>
                {isData &&
                  isData?.reduce(
                    (n, { totalCheckoutAmount }) =>
                      parseFloat(n) + parseFloat(totalCheckoutAmount),
                    0,
                  )}
              </td>

              <td style={{ fontWeight: 800 }}>
                {isData &&
                  isData?.reduce(
                    (n, { totalCancelledAmount }) =>
                      parseFloat(n) + parseFloat(totalCancelledAmount),
                    0,
                  )}
              </td>
              <td style={{ fontWeight: 800 }}>
                {isData &&
                  isData?.reduce(
                    (n, { finalAmount }) =>
                      parseFloat(n) + parseFloat(finalAmount),
                    0,
                  )}
              </td>
              <td></td>
            </tr>
          </table>
        </div>
      </div>

      <div className="save-div-btn">
        <button onClick={() => handlePrint()} className="save-div-btn-btn">
          Print
        </button>
        <button
          onClick={() => handleClose()}
          className="save-div-btn-btn-cancel"
        >
          Cancel
        </button>
      </div>
    </>
  );
}

export default AlllPrintConsolatedRoom;
