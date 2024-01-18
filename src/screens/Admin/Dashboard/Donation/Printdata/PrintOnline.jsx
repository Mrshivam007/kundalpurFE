import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import Typography from '@mui/material/Typography';
import Moment from 'moment-js';
function PrintOnline({ handleClose, isData }) {
  const componentRef = useRef();

  const [userName, setuserName] = useState('');

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  useEffect(() => {
    setuserName(sessionStorage.getItem('empName'));
  }, []);

  var today = new Date();

  const currTime = today.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return (
    <>
      <div style={{ maxHeight: 'calc(80vh - 4rem)', overflowY: 'auto' }}>
        <div ref={componentRef} style={{ padding: '1rem' }}>
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
              {Moment(today).format('DD-MM-YYYY')}/ {currTime}
              {userName && <>({userName})</>}
            </Typography>
          </div>
          <div style={{ width: '100%' }}>
            <div
              style={{
                // display: 'flex',
                // justifyContent: 'space-between',
                marginBottom: '1rem',
                marginTop: '1rem',
              }}
            >
              <p
                style={{
                  color: '#009430',
                  marginTop: '1rem',
                  marginBottom: '1rem',
                }}
              >
                Online Donation(दान)
              </p>
              <table>
                <tr
                  className="margintop_add"
                  style={{ borderBottom: '1px solid gray' }}
                >
                  {' '}
                  <th>&nbsp;</th>
                  <th>Bank</th>
                  <th>Cheque</th>
                  <th>Total</th>
                </tr>
                {isData && (
                  <>
                    {isData &&
                      isData.map((row, index) => (
                        <tr key={index} className="margintop_add">
                          <td>&nbsp;</td>
                          <td>{row?.Online_amount}</td>

                          <td>{row?.Cheque_amount}</td>
                          <td>{row?.total}</td>
                        </tr>
                      ))}
                  </>
                )}
                <tr
                  className="margintop_add"
                  style={{ borderBottom: '1px solid gray' }}
                >
                  <th>&nbsp;</th>
                  <th>
                    {' '}
                    {isData
                      ? isData.reduce(
                          (n, { Online_amount }) =>
                            parseFloat(n) + parseFloat(Online_amount),
                          0,
                        )
                      : '0'}
                  </th>
                  <th>
                    {isData
                      ? isData.reduce(
                          (n, { Cheque_amount }) =>
                            parseFloat(n) + parseFloat(Cheque_amount),
                          0,
                        )
                      : '0'}
                  </th>
                  <th>
                    {isData
                      ? isData.reduce(
                          (n, { total }) => parseFloat(n) + parseFloat(total),
                          0,
                        )
                      : '0'}
                  </th>
                </tr>
              </table>
            </div>
          </div>
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
