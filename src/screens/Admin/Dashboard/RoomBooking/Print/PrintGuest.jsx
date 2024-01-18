import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import Typography from '@mui/material/Typography';
import Moment from 'moment-js';
function PrintGuest({ handleClose, isData }) {
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
          <p
            style={{
              color: 'rgb(128, 128, 128)',
              marginTop: '1rem',
              marginBottom: '1rem',
            }}
          >
            Guest In Room(यात्री संख्या)
          </p>
          <div style={{ width: '100%' }}>
            <div
              style={{
                // display: 'flex',
                // justifyContent: 'space-between',
                marginBottom: '1rem',
                marginTop: '1rem',
              }}
            >
              <table>
                <tr
                  className="margintop_add"
                  style={{ borderBottom: '1px solid gray' }}
                >
                  <th>Gender</th>
                  <th>Quantity</th>
                </tr>
                {isData && (
                  <>
                    <tr
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <td>male</td>
                      <td>
                        {isData[0]?.male === null ? '0' : isData[0]?.male}
                      </td>
                    </tr>
                    <tr
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <td>female</td>
                      <td>
                        {isData[0]?.female === null ? '0' : isData[0]?.female}
                      </td>
                    </tr>
                    <tr
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <td>child</td>
                      <td>
                        {isData[0]?.child === null ? '0' : isData[0]?.child}
                      </td>
                    </tr>
                  </>
                )}
                <tr
                  className="margintop_add"
                  style={{ borderBottom: '1px solid gray' }}
                >
                  <th>Total</th>
                  <th>
                    {Number(isData[0]?.male) +
                      Number(isData[0]?.female) +
                      Number(isData[0]?.child)}
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

export default PrintGuest;
