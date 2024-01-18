import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Print from '../../../../assets/Print.png';
import ExportPdf from '../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../assets/ExportExcel.png';
import Tooltip from '@mui/material/Tooltip';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import PrintGuest from '../RoomBooking/Print/PrintGuest';
import { serverInstance } from '../../../../API/ServerInstance';
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
const EmployeeGuestInRoom = () => {
  const [isData, setisData] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const getAllguest = () => {
    serverInstance('room/employee-get-guests', 'GET').then((res) => {
      setisData(res.data);

      console.log(res.data);
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
            <PrintGuest handleClose={handleClose} isData={isData} />
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
                color: '#808080',
                marginTop: '0px',
                marginBottom: '0px',
              }}
            >
              GUEST IN ROOM(दान)
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
                <TableCell>Gender</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell>male</TableCell>
                <TableCell>
                  {isData[0]?.male === null ? '0' : isData[0]?.male}
                </TableCell>
              </TableRow>
              <TableRow
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell>female</TableCell>
                <TableCell>
                  {isData[0]?.female === null ? '0' : isData[0]?.female}
                </TableCell>
              </TableRow>
              <TableRow
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell>child</TableCell>
                <TableCell>
                  {isData[0]?.child === null ? '0' : isData[0]?.child}
                </TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell
                  style={{
                    fontSize: '15px',
                    color: '#05313C',
                  }}
                >
                  Total
                </TableCell>

                <TableCell
                  style={{
                    fontSize: '15px',
                    color: '#05313C',
                  }}
                >
                  {Number(isData[0]?.male) +
                    Number(isData[0]?.female) +
                    Number(isData[0]?.child)}
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

export default EmployeeGuestInRoom;
