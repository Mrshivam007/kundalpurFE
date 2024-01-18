import React, { useEffect, useState, useRef } from 'react';
import OnlineTotal from '../compoments/OnlineTotal';
import { useReactToPrint } from 'react-to-print';

import moment from 'moment';
function PrintOnline({ isData, handleClose }) {
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
              <th>Receipt No</th>
              <th>Name </th>
              <th>Donation Type</th>
              <th>Amount</th>
              <th>Cheque No.</th>
              <th>Date Of submission</th>
              <th>Name of Bank</th>
            </tr>
            {isData &&
              isData.map((row) => {
                return (
                  <tr
                    className="margintop_add"
                    style={{ borderBottom: '1px solid gray', fontSize: '14px' }}
                  >
                    <td> {moment(row?.DATE_OF_DAAN).format('DD/MM/YYYY')}</td>
                    <td>{row?.RECEIPT_NO}</td>

                    <td>{row.NAME}</td>
                    <td> {row.MODE_OF_DONATION}</td>
                    <td> {row.AMOUNT}</td>
                    <td> {row.CHEQUE_NO ? row.CHEQUE_NO : '-'}</td>
                    <td> {row.DATE_OF_CHEQUE ? row.DATE_OF_CHEQUE : '-'}</td>
                    <td> {row.NAME_OF_BANK ? row.NAME_OF_BANK : '-'}</td>
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
              <td>Total Amount</td>
              <td>
                <OnlineTotal data={isData} />
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

export default PrintOnline;
