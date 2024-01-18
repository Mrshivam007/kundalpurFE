import React, { useEffect, useState } from 'react';
import { serverInstance } from '../../../../API/ServerInstance';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import './VoucherManagement.css';
import AddVoucherToUser from './AddVoucherToUser/AddVoucherToUser';
import ExportPdf from '../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../assets/ExportExcel.png';
import Edit from '../../../../assets/Edit.png';
import eye from '../../../../assets/eye.png';
import Delete from '../../../../assets/Delete.png';
import exportFromJSON from 'export-from-json';
import Tooltip from '@mui/material/Tooltip';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';
import SystemTap from '../SystemTap';
import UpdateVoucher from './AddVoucherToUser/UpdateVoucher';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingSpinner1 from '../../../../components/Loading/LoadingSpinner1';

const style = {
  position: 'absolute',
  top: '27%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  background: '#FFFFFF',
  borderRadius: '15px',
  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
};
const VoucherManagement = ({ setopendashboard }) => {
  const navigate = useNavigate();
  const [loader, setloader] = useState(false);
  const [isData, setisData] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [data, setdata] = useState('');
  const [deleteId, setdeleteId] = useState('');
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen = (id) => {
    setOpen2(true);
    setdeleteId(id);
  };

  const handleClose2 = () => {
    setloader(true);
    setOpen2(false);
    serverInstance(`admin/add-voucher?id=${deleteId}`, 'delete').then((res) => {
      if (res.status === true) {
        setloader(false);
        Swal.fire('Great!', 'Voucher deleted successfully', 'success');
        setrefetch(true);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
    });
  };

  const handleClose3 = () => {
    setOpen2(false);
  };

  const [showAnPartularEmpVoucher, setshowAnPartularEmpVoucher] =
    useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpen1 = (data) => {
    setOpen1(true);

    setdata(data);
  };
  const handleClose1 = () => setOpen1(false);
  const navigation = useNavigate();
  console.log('asss', isData);

  const getall_donation = () => {
    setloader(true);
    serverInstance('user/add-voucher-user', 'get').then((res) => {
      if (res.status) {
        setloader(false);
        setisData(res.data);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const ExportPdfUVocher = (fileName) => {
    const doc = new jsPDF();

    const tableColumn = [
      'EmpoyeeName',
      'VoucherFrom',
      'voucherTo',
      'voucherNumber',
    ];

    const tableRows = [];

    isData.forEach((item) => {
      const ticketData = [
        item?.name,
        item?.from,
        item?.to,
        item?.voucher,
        format(new Date(item.createdAt), 'yyyy-MM-dd'),
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
  const ExportToExcel = () => {
    const fileName = 'voucherreport';
    const exportType = 'xls';
    var data = [];

    isData.map((item, index) => {
      data.push({
        EmpoyeeName: item?.name,
        VoucherFrom: item?.from,
        voucherTo: item?.to,
        voucherNumber: item?.voucher,
      });
    });

    exportFromJSON({ data, fileName, exportType });
  };
  useEffect(() => {
    setopendashboard(true);
    getall_donation();
  }, [open, open1, open2]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const sortData = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setisData(
      [...isData].sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === 'ascending' ? 1 : -1;
        }
        return 0;
      }),
    );
    setSortConfig({ key: key, direction: direction });
  };
  return (
    <>
      <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Do you want to delete'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            After delete you cannot get again
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose3}>Disagree</Button>
          <Button onClick={handleClose2} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <div>
              <div className="add-div-close-div-user-add">
                <h2 clssName="add_text_only">Generate Voucher</h2>
                <IconButton>
                  <CloseIcon onClick={() => handleClose()} />
                </IconButton>
              </div>

              <AddVoucherToUser setOpen={setOpen} />
            </div>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open1}
        onClose={handleClose1}
        closeAfterTransition
      >
        <Fade in={open1}>
          <Box sx={style}>
            <div>
              <div className="add-div-close-div-user-add">
                <h2 clssName="add_text_only">Update Voucher</h2>
                <IconButton>
                  <CloseIcon onClick={() => handleClose1()} />
                </IconButton>
              </div>

              <UpdateVoucher setOpen={setOpen1} data={data} />
            </div>
          </Box>
        </Fade>
      </Modal>
      <SystemTap setopendashboard={setopendashboard} />
      <div style={{ marginLeft: '5rem', marginRight: '1rem' }}>
        {showAnPartularEmpVoucher ? (
          <>
            <h2>view</h2>
          </>
        ) : (
          <>
            <div className="main_center_header">
              <div className="add-btn-user2">
                <p style={{ marginTop: '0.6%' }}>Voucher Management</p>
                <div className="add_role_icons_div" style={{ width: '30%' }}>
                  <button
                    style={{ height: '40px' }}
                    onClick={() => handleOpen()}
                  >
                    +Generate Voucher
                  </button>

                  <Tooltip title="Export Excel File">
                    <img
                      onClick={() => ExportToExcel()}
                      src={ExportExcel}
                      style={{
                        width: '30px',
                        height: '35px',
                        marginRight: '0.2rem',
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="Export Pdf File">
                    <img
                      onClick={() => ExportPdfUVocher('VoucherReport')}
                      src={ExportPdf}
                      style={{
                        width: '30px',
                        height: '35px',
                        marginRight: '0.2rem',
                      }}
                    />
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className="main_center_header"></div>

            <div className="table-div-maain">
              <Table sx={{ width: '100%' }} aria-label="simple table">
                <TableHead style={{ background: '#F1F0F0' }}>
                  <TableRow>
                    <TableCell align="center">S.No</TableCell>
                    <TableCell align="center">
                      Empoyee Name
                      <i
                        style={{ marginLeft: '0.5rem' }}
                        onClick={() => sortData('name')}
                        class={`fa fa-sort`}
                      />
                    </TableCell>
                    <TableCell align="center">
                      Book No
                      <i
                        style={{ marginLeft: '0.5rem' }}
                        onClick={() => sortData('to')}
                        class={`fa fa-sort`}
                      />
                    </TableCell>
                    <TableCell align="center">
                      Voucher No
                      <i
                        style={{ marginLeft: '0.5rem' }}
                        onClick={() => sortData('from')}
                        class={`fa fa-sort`}
                      />
                    </TableCell>
                    <TableCell align="center">
                      Voucher No start{' '}
                      <i
                        style={{ marginLeft: '0.5rem' }}
                        onClick={() => sortData('voucher')}
                        class={`fa fa-sort`}
                      />
                    </TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isData ? (
                    <>
                      {(rowsPerPage > 0
                        ? isData
                            .reverse()
                            .slice(
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
                          <TableCell align="center"> {index + 1}</TableCell>
                          <TableCell align="center">{row?.name}</TableCell>
                          <TableCell align="center">{row?.to / 100}</TableCell>
                          <TableCell align="center">
                            {`${row.from} -- ${row.to}`}
                          </TableCell>
                          <TableCell align="center">
                            {row?.to === row?.voucher ? '0' : row?.voucher}
                          </TableCell>
                          {row?.status === 2 && (
                            <>
                              <TableCell
                                style={{
                                  background:
                                    row?.status === 2 ? 'green' : '#FFC000',
                                  color: row?.status === 2 ? 'black' : 'black',
                                }}
                                align="center"
                              >
                                Upcoming
                              </TableCell>
                            </>
                          )}
                          {row?.status === false && (
                            <>
                              <TableCell
                                style={{
                                  background:
                                    row?.status === false
                                      ? '#08ACF0'
                                      : '#FFC000',
                                  color:
                                    row?.status === false ? 'black' : 'black',
                                }}
                                align="center"
                              >
                                {row?.status === false ? 'Used' : 'exhausted'}
                              </TableCell>
                            </>
                          )}

                          {row?.status === true && (
                            <>
                              <TableCell
                                style={{
                                  background:
                                    row?.status === false
                                      ? '#08ACF0'
                                      : '#FFC000',
                                  color:
                                    row?.status === false ? 'black' : 'black',
                                }}
                                align="center"
                              >
                                {row?.status === false ? 'Used' : 'Running'}
                              </TableCell>
                            </>
                          )}

                          <TableCell align="center">
                            <Tooltip title="View">
                              <img
                                onClick={() =>
                                  navigate('/admin-panel/uservoucher', {
                                    state: {
                                      userdata: row,
                                    },
                                  })
                                }
                                src={eye}
                                alt="s"
                                style={{ width: '20px', marginRight: '0.3rem' }}
                              />
                            </Tooltip>

                            <Tooltip title="Edit">
                              <img
                                onClick={() => handleOpen1(row)}
                                src={Edit}
                                alt="s"
                                style={{ width: '20px', marginRight: '0.3rem' }}
                              />
                            </Tooltip>

                            <Tooltip title="Delete">
                              <img
                                onClick={() => handleClickOpen(row.id)}
                                src={Delete}
                                alt="s"
                                style={{ width: '20px' }}
                              />
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      count={isData.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      rowsPerPageOptions={[25, 50, 100]}
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
          </>
        )}
      </div>

      {loader && <LoadingSpinner1 />}
    </>
  );
};

export default VoucherManagement;
