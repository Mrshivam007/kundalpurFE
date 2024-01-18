import React, { useRef } from 'react';
import Typography from '@mui/material/Typography';
import { useReactToPrint } from 'react-to-print';
import Moment from 'moment-js';

function AllConsolatePrint({ isData, handleClose }) {
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
            Consolidated
          </div>
          <table>
            <tr
              className="margintop_add"
              style={{ borderBottom: '1px solid gray', fontSize: '14px' }}
            >
              <th>Employee Name</th>
              <th>Type </th>
              <th>Amount Cheque</th>
              <th>Amount Electronic </th>
              <th> Amount Item </th>
              <th> Amount Cash</th>
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
                  <td>{row.employeeName ? row.employeeName : '-'}</td>
                  <td style={{ width: '9rem' }}>
                    {row?.donationType == 'manual'
                      ? 'Manual Donation'
                      : 'Donation'}
                  </td>

                  <td>{row?.cheque_TOTAL_AMOUNT}</td>
                  <td>{row?.bank_TOTAL_AMOUNT}</td>
                  <td>{row?.item_TOTAL_AMOUNT}</td>
                  <td>{row?.cash_TOTAL_AMOUNT}</td>

                  <td>
                    {Number(row?.cheque_TOTAL_AMOUNT) +
                      Number(row?.bank_TOTAL_AMOUNT) +
                      Number(row?.item_TOTAL_AMOUNT) +
                      Number(row?.cash_TOTAL_AMOUNT)}
                  </td>
                </tr>
              ))}

            <tr>
              <td> &nbsp;</td>
              <td style={{ fontWeight: 700 }}>Total</td>

              <td style={{ fontWeight: 700 }}>
                {isData &&
                  isData?.reduce(
                    (n, { cheque_TOTAL_AMOUNT }) =>
                      parseFloat(n) + parseFloat(cheque_TOTAL_AMOUNT),
                    0,
                  )}
              </td>

              <td style={{ fontWeight: 700 }}>
                {' '}
                {isData &&
                  isData?.reduce(
                    (n, { bank_TOTAL_AMOUNT }) =>
                      parseFloat(n) + parseFloat(bank_TOTAL_AMOUNT),
                    0,
                  )}
              </td>
              <td style={{ fontWeight: 700 }}>
                {' '}
                {isData &&
                  isData?.reduce(
                    (n, { item_TOTAL_AMOUNT }) =>
                      parseFloat(n) + parseFloat(item_TOTAL_AMOUNT),
                    0,
                  )}
              </td>

              <td style={{ fontWeight: 700 }}>
                {' '}
                {isData &&
                  isData?.reduce(
                    (n, { cash_TOTAL_AMOUNT }) =>
                      parseFloat(n) + parseFloat(cash_TOTAL_AMOUNT),
                    0,
                  )}
              </td>

              <td style={{ fontWeight: 700 }}>
                {' '}
                {isData &&
                  isData?.reduce(
                    (n, { item_TOTAL_AMOUNT }) =>
                      parseFloat(n) + parseFloat(item_TOTAL_AMOUNT),
                    0,
                  ) +
                    isData?.reduce(
                      (n, { cheque_TOTAL_AMOUNT }) =>
                        parseFloat(n) + parseFloat(cheque_TOTAL_AMOUNT),
                      0,
                    ) +
                    isData?.reduce(
                      (n, { bank_TOTAL_AMOUNT }) =>
                        parseFloat(n) + parseFloat(bank_TOTAL_AMOUNT),
                      0,
                    ) +
                    isData?.reduce(
                      (n, { cash_TOTAL_AMOUNT }) =>
                        parseFloat(n) + parseFloat(cash_TOTAL_AMOUNT),
                      0,
                    )}
              </td>
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

export default AllConsolatePrint;
