import React, { useRef } from 'react';
import Typography from '@mui/material/Typography';
import ElectronicTotal from '../compoments/ElectronicTotal';
import { useReactToPrint } from 'react-to-print';
import Moment from 'moment-js';

function PrintElectronicEle({ isData, handleClose }) {
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
          </div>
          <table>
            <tr
              className="margintop_add"
              style={{ borderBottom: '1px solid gray', fontSize: '14px' }}
            >
              <th>Date</th>
              <th>ReceiptNo</th>
              <th>VoucherNo</th>
              <th>Phone No</th>
              <th>Name</th>
              <th>Address</th>
              <th>Head/Item</th>
              <th>Amount</th>
              <th>Bank</th>
              <th>Transaction</th>
              <th>Remark</th>
            </tr>
            {isData &&
              isData.map((row) => {
                return (
                  <tr
                    className="margintop_add"
                    style={{ borderBottom: '1px solid gray', fontSize: '14px' }}
                  >
                    <td>{Moment(row.donation_date).format('DD/MM/YYYY')}</td>
                    <td>{row.ReceiptNo}</td>

                    <td>{row.voucherNo}</td>
                    <td>{row.phoneNo}</td>
                    <td>{row.name}</td>
                    <td> {row.address}</td>
                    <td style={{ width: '5rem' }}>
                      {row.elecItemDetails.map((row) => {
                        return (
                          <li style={{ listStyle: 'none' }}>{row.type}</li>
                        );
                      })}
                    </td>

                    <td>
                      {row.elecItemDetails.reduce(
                        (n, { amount }) => parseFloat(n) + parseFloat(amount),
                        0,
                      )}
                    </td>
                    <td>{row?.elecItemDetails[0]?.BankName}</td>
                    <td>{row.elecItemDetails[0]?.transactionNo}</td>
                    <td>
                      {row.elecItemDetails.map((row) => {
                        return (
                          <li style={{ listStyle: 'none' }}>{row.remark} </li>
                        );
                      })}
                    </td>
                  </tr>
                );
              })}
            <tr
              className="margintop_add"
              style={{ borderBottom: '1px solid gray', fontSize: '14px' }}
            >
              <td> &nbsp;</td>
              <td> &nbsp;</td>
              <td> &nbsp;</td>
              <td> &nbsp;</td>
              <td> &nbsp;</td>
              <td> &nbsp;</td>
              <td>Amount</td>
              <td>
                <ElectronicTotal data={isData} />{' '}
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

export default PrintElectronicEle;
