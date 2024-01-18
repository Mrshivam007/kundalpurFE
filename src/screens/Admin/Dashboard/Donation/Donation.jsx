import React, { useRef, useState, useEffect } from 'react';
import { serverInstance } from '../../../../API/ServerInstance';
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
import PrintDonation from './Printdata/PrintDonation';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import exportFromJSON from 'export-from-json';
import Tooltip from '@mui/material/Tooltip';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useReactToPrint } from 'react-to-print';
import './DonationStyle.css';
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
const Donation = ({ setloader }) => {
  const [isData, setisData] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [showacres, setshowacres] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const ExportToExcel = () => {
    const fileName = 'TodayElectronicDonation';
    const exportType = 'xls';
    var data = [];
    isData.map((item, index) => {
      data.push({
        employee_name: item?.employee_name,
        cash_amount: item?.cash_amount,
        bank_amount: item?.bank_amount,
        cheque_amount: item?.cheque_amount,
        total: item?.total,
      });
    });
    exportFromJSON({ data, fileName, exportType });
  };

  const ExportPdff = (isData, fileName) => {
    const doc = new jsPDF();

    const tableColumn = ['Staff name', 'Cash', 'bank', 'Cheque', 'Total'];

    const tableRows = [];

    isData.forEach((item) => {
      const ticketData = [
        item?.employee_name,
        item?.cash_amount,
        item?.bank_amount,
        item?.cheque_amount,
        item?.total,
      ];

      tableRows.push(ticketData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    const date = Date().split(' ');

    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

    doc.text(`Report of ${fileName}`, 8, 9);
    doc.setFont('Lato-Regular', 'normal');
    doc.setFontSize(28);
    doc.save(`${fileName}_${dateStr}.pdf`);
  };

  const getalldata = () => {
    setloader(true);
    serverInstance('admin/dash-admin-total-elec', 'get').then((res) => {
      if (res.data.data) {
        setloader(false);
        setisData(res.data.data);
      }
    });
  };

  useEffect(() => {
    getalldata();
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
            <PrintDonation handleClose={handleClose} isData={isData} />
          </Box>
        </Fade>
      </Modal>
      <div className="main_dash_daily_main">
        <div className="main_dash_daily">
          <Tooltip title="Export Excel File">
            <img
              onClick={() => ExportToExcel()}
              src={ExportExcel}
              alt="cc"
              style={{ width: '30px' }}
            />
          </Tooltip>
          &nbsp;&nbsp;
          <Tooltip title="Export Pdf File">
            <img
              onClick={() => ExportPdff(isData, 'TodayElectronic')}
              src={ExportPdf}
              alt="cc"
              style={{ width: '30px', marginRight: '2rem' }}
            />
          </Tooltip>
          <Tooltip title="Print">
            <img
              onClick={() => {
                handleOpen();
              }}
              src={Print}
              alt="cc"
              style={{ width: '30px', marginRight: '2rem' }}
            />
          </Tooltip>
          <div
            style={{
              width: '95%',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <p
              style={{
                color: '#FE0000',
                marginTop: '0px',
                marginBottom: '0px',
              }}
            >
              Donation(दान)
            </p>
          </div>
        </div>

        <div className="table-div-maai" ref={componentRef}>
          {showacres ? (
            <>
              <p
                style={{
                  textAlign: 'center',
                  marginBottom: '1rem',
                  marginTop: '1rem',
                }}
              >
                श्री दिगम्बर जैन सिद्धक्षेत्र कुण्डलगिरि कुण्डलपुर दमोह (म.प्र.)
              </p>
            </>
          ) : (
            <></>
          )}

          <Table
            sx={{ minWidth: 650, width: '100%' }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Staff Name</TableCell>
                <TableCell>Cash</TableCell>
                <TableCell>Bank</TableCell>
                <TableCell>Cheque</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isData && (
                <>
                  {(rowsPerPage > 0
                    ? isData &&
                      isData.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                    : isData && isData
                  ).map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell>{row?.employee_name}</TableCell>

                      <TableCell>{row?.cash_amount}.00</TableCell>
                      <TableCell>{row?.bank_amount}.00</TableCell>
                      <TableCell>{row?.cheque_amount}.00</TableCell>
                      <TableCell>{row?.total}.00</TableCell>
                    </TableRow>
                  ))}
                </>
              )}
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
                  {isData
                    ? isData.reduce(
                        (n, { cash_amount }) =>
                          parseFloat(n) + parseFloat(cash_amount),
                        0,
                      )
                    : '0'}.00 
                </TableCell>
                <TableCell
                  style={{
                    fontSize: '15px',
                    color: '#05313C',
                    fontWeight: 700,
                  }}
                >
                  {isData
                    ? isData.reduce(
                        (n, { bank_amount }) =>
                          parseFloat(n) + parseFloat(bank_amount),
                        0,
                      )
                    : '0'}.00 
                </TableCell>
                <TableCell
                  style={{
                    fontSize: '15px',
                    color: '#05313C',
                    fontWeight: 700,
                  }}
                >
                  {isData
                    ? isData.reduce(
                        (n, { cheque_amount }) =>
                          parseFloat(n) + parseFloat(cheque_amount),
                        0,
                      )
                    : '0'}.00 
                </TableCell>
                <TableCell
                  style={{
                    fontSize: '15px',
                    color: '#05313C',
                    fontWeight: 700,
                  }}
                >
                  {isData
                    ? isData.reduce(
                        (n, { total }) => parseFloat(n) + parseFloat(total),
                        0,
                      )
                    : '0'}.00 
                </TableCell>
              </TableRow>
              <TableRow>
                <TablePagination
                  count={isData?.length}
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
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Donation;
