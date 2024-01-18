import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Moment from 'moment-js';
function Printguest({ handleClose, isData }) {
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
                  color: '#FE0000',
                  marginTop: '1rem',
                  marginBottom: '1rem',
                }}
              >
                GUEST IN ROOM(दान)
              </p>
              <Table
                sx={{ minWidth: 650, width: '100%' }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Gender</TableCell>
                    <TableCell>Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell>0</TableCell>
                  <TableCell>0</TableCell>

                  {/* {(rowsPerPage > 0
                  ? isData.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : isData
                ).map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>

                    <TableCell>{row.NAME}</TableCell>

                    <TableCell>
                      <RemoveRedEyeIcon />
                      <DeleteForeverIcon />
                    </TableCell>
                  </TableRow>
                ))} */}
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

export default Printguest;
