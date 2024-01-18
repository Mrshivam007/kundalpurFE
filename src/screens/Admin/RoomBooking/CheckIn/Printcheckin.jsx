import React, { useRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useReactToPrint } from 'react-to-print';
import moment from 'moment';
import Moment from 'moment-js';
//date  booking_id contactNo name address dharmasala?.name RoomNo roomAmount advanceAmount
function Printcheckin({ isData, setOpen1 }) {
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
    <div>
      <div style={{ maxHeight: 'calc(80vh - 4rem)', overflowY: 'auto' }}>
        <div ref={componentRef} style={{ marginTop: '1rem' }}>
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

          <Table
            sx={{ minWidth: 650, width: '100%' }}
            aria-label="simple table"
          >
            <TableHead style={{ background: '#F1F0F0' }}>
              <TableRow>
                <TableCell>Checkin</TableCell>
                <TableCell>Booking_Id</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Guest</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Dharamshala</TableCell>
                <TableCell>RoomNo</TableCell>
                <TableCell>Rent</TableCell>
                <TableCell>Advance</TableCell>
                <TableCell>Employee</TableCell>
                <TableCell>PayMode</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isData ? (
                <>
                  {isData?.map((row, index) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell>
                        {Moment(row?.date)?.format('DD-MM-YYYY')}
                        {moment(row?.time, 'HH:mm:ss').format('hh:mm:ss')}
                        &nbsp;&nbsp;
                      </TableCell>
                      <TableCell>{row?.booking_id}</TableCell>
                      <TableCell>{row?.contactNo}</TableCell>
                      <TableCell>{row?.name}</TableCell>
                      <TableCell>
                        {Number(row?.female) +
                          Number(row?.child) +
                          Number(row?.male)}
                      </TableCell>
                      <TableCell>{row?.address}</TableCell>
                      <TableCell> {row?.dharamshalaData?.name}</TableCell>
                      <TableCell>
                        {row?.roomNumbers?.map((item) => (
                          <span>{item},</span>
                        ))}
                      </TableCell>
                      <TableCell> {row?.roomAmountSum}.00</TableCell>
                      <TableCell>{Number(row?.advanceAmountSum)}.00</TableCell>
                      <TableCell>{row?.bookedByName}</TableCell>
                      <TableCell>
                        {row?.paymentMode === 2 ? 'Cash' : 'Online'}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="save-div-btn">
        <button onClick={() => handlePrint()} className="save-div-btn-btn">
          Print
        </button>
        <button
          onClick={() => setOpen1(false)}
          className="save-div-btn-btn-cancel"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Printcheckin;
