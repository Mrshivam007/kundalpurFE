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
function PrintHold({ isData, setOpen1 }) {
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
                <TableCell>MobileNO</TableCell>
                <TableCell>HolderName</TableCell>
                <TableCell>RoomNo</TableCell>
                <TableCell>Since</TableCell>
                <TableCell>Remain</TableCell>
                <TableCell>ApprovedBy</TableCell>
                <TableCell>remarks</TableCell>
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
                      <TableCell>{row?.mobile}</TableCell>
                      <TableCell>{row?.name}</TableCell>
                      <TableCell>{row?.roomNo}</TableCell>
                      <TableCell>
                        {Moment(row?.since).format('YYYY-MM-DD')}&nbsp;&nbsp;
                        {moment(row?.since, 'HH:mm:ss').format('hh:mm:ss')}
                      </TableCell>

                      <TableCell>
                        {Moment(row?.remain).format('DD-MM-YYYY')}&nbsp;&nbsp;
                        {moment(row?.remain, 'HH:mm:ss').format('hh:mm:ss')}
                      </TableCell>

                      <TableCell> {row?.approvedBy}</TableCell>
                      <TableCell> {row?.remarks}</TableCell>
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

export default PrintHold;
