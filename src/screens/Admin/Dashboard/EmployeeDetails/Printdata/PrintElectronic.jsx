import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import Typography from '@mui/material/Typography';
import Moment from 'moment-js';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
function PrintElectronic({ handleClose, isData }) {
  const componentRef = useRef();

  const [userName, setuserName] = useState('');
  const [emproleid, setemproleid] = useState('');
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    setuserName(sessionStorage.getItem('empName'));
    setemproleid(Number(sessionStorage.getItem('empRoleid')));
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
                  color: '#FE0000',
                  marginTop: '1rem',
                  marginBottom: '1rem',
                }}
              >
                Donation(दान)
              </p>
              <Table
                sx={{ minWidth: 650, width: '100%' }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell> &nbsp;</TableCell>
                    {emproleid === 7 ? (
                      <>
                        <TableCell>Bank</TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>Cash</TableCell>
                        <TableCell>Bank</TableCell>
                        <TableCell>Cheque</TableCell>
                        <TableCell>Total</TableCell>
                      </>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isData && (
                    <>
                      {isData.map((row, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell> &nbsp;</TableCell>
                          {emproleid === 7 ? (
                            <>
                              <TableCell>{row.bank_amount}.00</TableCell>
                            </>
                          ) : (
                            <>
                              <TableCell>{row.cash_amount}.00</TableCell>

                              <TableCell>{row.bank_amount}.00</TableCell>
                              <TableCell>{row.cheque_amount}.00</TableCell>

                              <TableCell>{row.total}</TableCell>
                            </>
                          )}
                        </TableRow>
                      ))}
                    </>
                  )}
                </TableBody>
              </Table>
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

export default PrintElectronic;
