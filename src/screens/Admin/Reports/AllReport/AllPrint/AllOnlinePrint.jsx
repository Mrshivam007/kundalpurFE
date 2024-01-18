import React, { useRef } from 'react';
import Typography from '@mui/material/Typography';
import { useReactToPrint } from 'react-to-print';
import Moment from 'moment-js';

function AllOnlinePrint({ isData, handleClose }) {
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
            Online(Donator)
          </div>
          <table>
            <tr
              className="margintop_add"
              style={{ borderBottom: '1px solid gray', fontSize: '14px' }}
            >
              <th>Head Name</th>
              <th>Type</th>
              <th>Online </th>
              <th>Cheque</th>
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
                  <td onClick={() => filterHead(row.type)}>
                    {row.type ? row.type : row.TYPE}
                  </td>
                  <td>{row?.donationType}</td>
                  <td>{row?.online ? row?.online : '0'}</td>
                  <td>{row?.cheque ? row?.cheque : '0'}</td>
                  <td>{Number(row?.online) + Number(row?.cheque)}</td>
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
                    (n, { online }) => parseFloat(n) + parseFloat(online),
                    0,
                  )}
              </td>
              <td style={{ fontWeight: 800 }}>
                {isData &&
                  isData?.reduce(
                    (n, { cheque }) => parseFloat(n) + parseFloat(cheque),
                    0,
                  )}
              </td>
              <td style={{ fontWeight: 800 }}>
                {isData &&
                  isData?.reduce(
                    (n, { online }) => parseFloat(n) + parseFloat(online),
                    0,
                  ) +
                    isData?.reduce(
                      (n, { cheque }) => parseFloat(n) + parseFloat(cheque),
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

export default AllOnlinePrint;
