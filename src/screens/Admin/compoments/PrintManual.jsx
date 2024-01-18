import React, { useRef } from 'react';
import ManualTotal from '../compoments/ManualTotal';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';
import Moment from 'moment-js';
function PrintManual({ isData, handleClose }) {
  const navigation = useNavigate();
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div style={{ maxHeight: 'calc(80vh - 4rem)', overflowY: 'auto' }}>
        <div ref={componentRef}>
          <div>
            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
              श्री दिगम्बर जैन सिद्धक्षेत्र कुण्डलगिरि कुण्डलपुर दमोह (म.प्र.)
            </p>
          </div>
          <table>
            <tr
              className="margintop_add"
              style={{ borderBottom: '1px solid gray', fontSize: '14px' }}
            >
              <th>Date</th>
              <th>ReceiptNo</th>
              <th>Phone No</th>
              <th>Name</th>
              <th>Address</th>
              <th>Head/Item</th>
              <th>Amount</th>
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

                    <td>{row.phoneNo}</td>
                    <td>{row.name}</td>
                    <td> {row.address}</td>
                    <td style={{ width: '5rem' }}>
                      {row.manualItemDetails.map((row) => {
                        return (
                          <li style={{ listStyle: 'none' }}>{row.type}</li>
                        );
                      })}
                    </td>

                    <td>
                      {row.manualItemDetails.reduce(
                        (n, { amount }) => parseFloat(n) + parseFloat(amount),
                        0,
                      )}
                    </td>
                    <td>
                      {row.manualItemDetails.map((row) => {
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
                <ManualTotal data={isData} />
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

export default PrintManual;
