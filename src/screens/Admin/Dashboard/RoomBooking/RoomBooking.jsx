import React, { useEffect, useState } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { serverInstance } from '../../../../API/ServerInstance';
import Swal from 'sweetalert2';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import Print from '../../../../assets/Print.png';
import ExportPdf from '../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../assets/ExportExcel.png';
import Edit from '../../../../assets/Edit.png';
import eye from '../../../../assets/eye.png';
import Delete from '../../../../assets/Delete.png';
import exportFromJSON from 'export-from-json';
import Tooltip from '@mui/material/Tooltip';
import Moment from 'moment-js';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';
import f1 from '../../../../assets/f4.png';
import PrintRoomBooking from '../RoomBooking/Print/PrintRoomBooking';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '70%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
  borderRadius: '15px',
};
const RoomBooking = ({ setopendashboard }) => {
  const [isData, setisData] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const getAllguest = () => {
    serverInstance('room/room-booking-stats-1', 'GET').then((res) => {
      setisData(res.data);
    });
  };
  useEffect(() => {
    getAllguest();
  }, []);

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <PrintRoomBooking handleClose={handleClose} isData={isData} />
          </Box>
        </Fade>
      </Modal>
      <div className="main_dash_daily_main">
        <div
          className="search-header-print"
          style={{
            width: '100%',

            paddingTop: '1%',
          }}
        >
          <Tooltip title="Export Excel File">
            <img
              // onClick={() => ExportToExcel()}
              src={ExportExcel}
              alt="cc"
              style={{ width: '30px' }}
            />
          </Tooltip>
          &nbsp;&nbsp;
          <Tooltip title="Export Pdf File">
            <img
              // onClick={() => ExportPdfmanul(isData, 'ManualCashReport')}
              src={ExportPdf}
              alt="cc"
              style={{ width: '30px', marginRight: '2rem' }}
            />
          </Tooltip>
          <Tooltip title="Print">
            <img
              onClick={() => handleOpen()}
              src={Print}
              alt="cc"
              style={{ width: '30px', marginRight: '2rem' }}
            />
          </Tooltip>
          <div style={{ width: '95%', display: 'flex', alignItems: 'center' }}>
            <p
              style={{
                color: '#3C5FFE',
                marginTop: '0px',
                marginBottom: '0px',
              }}
            >
              Room Booking(आवास)
            </p>
          </div>
        </div>

        <div className="table-div-maai">
          {/* <TableContainer component={Paper}> */}
          <Table
            sx={{ minWidth: 650, width: '100%' }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Online</TableCell>
                <TableCell>Cash</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? isData.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage,
                  )
                : isData
              ).map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell>{row?.Username}</TableCell>
                  <TableCell>{row?.online}.00</TableCell>
                  <TableCell>{row?.cash}.00</TableCell>

                  <TableCell>
                    {Number(row?.cash) + Number(row?.online)}.00
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell
                  style={{
                    fontSize: '15px',
                    color: '#05313C',
                    fontWeight: 700,
                  }}
                >
                  Total
                </TableCell>
                <TableCell
                  style={{
                    fontSize: '15px',
                    color: '#05313C',
                    fontWeight: 700,
                  }}
                >
                  {isData &&
                    isData?.reduce(
                      (n, { online }) => parseFloat(n) + parseFloat(online),
                      0,
                    )}.00
                </TableCell>
                <TableCell
                  style={{
                    fontSize: '15px',
                    color: '#05313C',
                    fontWeight: 700,
                  }}
                >
                  {isData &&
                    isData?.reduce(
                      (n, { cash }) => parseFloat(n) + parseFloat(cash),
                      0,
                    )}.00
                </TableCell>
                <TableCell
                  style={{
                    fontSize: '15px',
                    color: '#05313C',
                    fontWeight: 700,
                  }}
                >
                  {isData &&
                    isData?.reduce(
                      (n, { online }) => parseFloat(n) + parseFloat(online),
                      0,
                    ) +
                      isData?.reduce(
                        (n, { cash }) => parseFloat(n) + parseFloat(cash),
                        0,
                      )}.00
                </TableCell>
              </TableRow>
              <TableRow>
                <TablePagination
                  count={isData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[50, 100, 150]}
                  labelRowsPerPage={<span>Rows:</span>}
                  labelDisplayedRows={({ page }) => {
                    return `Page: ${page}`;
                  }}
                  backIconButtonProps={{
                    color: 'secondary',
                  }}
                  nextIconButtonProps={{ color: 'secondary' }}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'page number',
                    },
                  }}
                  // showFirstButton={true}
                  // showLastButton={true}
                  //ActionsComponent={TablePaginationActions}
                  //component={Box}
                  //sx and classes prop discussed in styling section
                />
              </TableRow>
            </TableFooter>
          </Table>
          {/* </TableContainer> */}
        </div>
      </div>
    </>
  );
};

export default RoomBooking;
