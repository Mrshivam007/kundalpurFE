import React, { useEffect, useState } from 'react';
import { serverInstance } from '../../../../API/ServerInstance';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import { Box, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import exportFromJSON from 'export-from-json';
import Moment from 'moment-js';
import Print from '../../../../assets/Print.png';
import ExportPdf from '../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../assets/ExportExcel.png';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import RoomShiftForm from './RoomShiftForm';
import Typography from '@mui/material/Typography';
import LoadingSpinner1 from '../../../../components/Loading/LoadingSpinner1';
import moment from 'moment';
import Checkoutform from './Checkoutform';

import { Select, MenuItem } from '@mui/material';
import RoomBookingTap from '../RoomBookingTap';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TotalAdvance from '../CheckIn/TotalAdvance';
import Totalguest from '../CheckIn/Totalguest';
import Printcheckin from '../CheckIn/Printcheckin';
import Checkin from '../../../../assets/Checkin.png';
import Checkout from '../../../../assets/Checkout.png';
import forcheckout from '../../../../assets/Checkout2.png';
import roomshift from '../../../../assets/Edit.png';
import Edit from '../../../../assets/Edit.png';
import Checkout21 from '../../../../assets/Checkout21.png';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';
import fordd from '../../../../assets/for.jpeg';
import './RoomShift.css';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  bgcolor: 'background.paper',
  p: 3,
  boxShadow: 24,
  borderRadius: '5px',
};

const RoomShift = ({ setopendashboard }) => {
  const navigation = useNavigate();
  const [loader, setloader] = useState(false);
  const [isData, setisData] = React.useState('');
  const [isDataDummy, setisDataDummy] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [userrole, setuserrole] = useState('');
  const [open, setOpen] = React.useState(false);
  const [optionss, setoptionss] = useState('Currently Stay');
  const [changedata, setchangedata] = useState('');
  const handleClose = () => setOpen(false);
  const handleOepn = (data) => {
    setOpen(true);
    setchangedata(data);
  };

  const [open1, setOpen1] = React.useState(false);
  const handleClose1 = () => setOpen1(false);
  const handleOepn1 = () => {
    setOpen1(true);
  };

  const getall_donation = () => {
    setloader(true);

    if (optionss === 'Currently Stay') {
      serverInstance('room/onlineCheckin', 'get').then((res) => {
        if (res.data) {
          setloader(false);
          let filterData = res.data.filter((item) => item.modeOfBooking === 2);
          setisData(filterData);
          setisDataDummy(filterData);
          setisData(filterData);
          setisDataDummy(filterData);
        }
      });
    }
    if (optionss === 'History') {
      serverInstance('room/get-room-history-admin', 'post').then((res) => {
        console.log(res);
        if (res.data) {
          setloader(false);
          let filterData = res.data.filter((item) => item.modeOfBooking === 2);
          setisData(filterData);
          setisDataDummy(filterData);
        }
      });
    }
  };

  const downloadrecept = (row) => {
    navigation('/admin-panel/Room/OnlinePrintReceipt', {
      state: {
        data: row,
      },
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
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

  const ExportToExcel = () => {
    const fileName = 'CheckinGuest';
    const exportType = 'xls';
    var data = [];

    isData.map((item, index) => {
      data.push({
        Checkin: Moment(item?.date).format('DD-MM-YYYY'),
        CheckinTime: moment(item?.time, 'HH:mm:ss').format('hh:mm:ss'),
        Booking_Id: item?.booking_id,
        Mobile: item?.contactNo,
        Customer: item?.name,
        TotalGuest:
          Number(item?.female) + Number(item?.child) + Number(item?.male),
        Address: item?.address,
        Dharamshala: item?.dharmasala?.name,
        RoomNo: item?.RoomNo,
        Rent: item?.roomAmount,
        Advance: item?.advanceAmount,
        Employee: item?.bookedByName,
        PayMode: 'Online',
      });
    });
    exportFromJSON({ data, fileName, exportType });
  };
  const ExportPdfmanul = (isData, fileName) => {
    const doc = new jsPDF();

    const tableColumn = [
      'booking_id',
      'contactNo',
      'name',
      'date',
      'time',
      'coutDate',
      'coutTime',
      'roomAmount',
      'advanceAmount',
      'RoomNo',
    ];

    const tableRows = [];

    isData.forEach((item) => {
      const ticketData = [
        item?.booking_id,
        item?.contactNo,
        item?.name,
        Moment(item?.date).format('DD-MM-YYYY'),
        moment(item?.time, 'HH:mm:ss').format('hh:mm:ss'),
        Moment(item?.coutDate).format('DD-MM-YYYY'),
        moment(item?.coutTime, 'HH:mm:ss').format('hh:mm:ss'),
        item?.roomAmount,
        item?.advanceAmount,
        item?.RoomNo,
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
  const [cancelid, setcancelid] = useState('');
  const [open3, setOpen3] = React.useState(false);

  const handleClickOpen3 = (id) => {
    setOpen3(true);
    setcancelid(id);
  };
  const handleClose5 = () => setOpen3(false);

  const handleClose4 = () => {
    setOpen3(false);
    setloader(true);
    serverInstance('/room/cancel-checkin', 'DELETE', {
      id: cancelid,
    }).then((res) => {
      console.log(res);
      if (res?.data?.status === true) {
        Swal.fire('Great!', res?.data?.message, 'success');

        setTimeout(() => {
          getall_donation();
          setloader(false);
        }, 1000);
      }
      if (res?.data?.status === false) {
        Swal.fire(
          'Great!',
          'Room failed to checkout (Time Limit Elapsed)',
          'success',
        );
      }
    });
  };

  const [checkforceid, setcheckforceid] = useState('');
  const [open4, setOpen4] = React.useState(false);

  const handleClickOpen4 = (id) => {
    setOpen4(true);
    setcheckforceid(id);
  };
  const handleClose6 = () => setOpen4(false);

  const handleClose7 = () => {
    setOpen4(false);

    serverInstance('/room/force-checkout', 'POST', {
      id: checkforceid,
    }).then((res) => {
      console.log(res);
      if (res.data?.status === true) {
        getall_donation();
        Swal.fire('Great!', res?.data?.message, 'success');
      }
    });
  };

  useEffect(() => {
    getall_donation();
    setopendashboard(true);
    setuserrole(Number(sessionStorage.getItem('userrole')));
  }, [open, open1, open4, optionss]);

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

  const [bookid, setbookid] = useState('');
  const [mobileno, setmobileno] = useState('');
  const [customername, setcustomername] = useState('');
  const [checkindate, setcheckindate] = useState('');
  const [dharamshalanamee, setdharamshalanamee] = useState('');
  const [roomNo, setroomNo] = useState('');
  const [rate, setrate] = useState('');
  const [advanceRate, setadvanceRate] = useState('');
  const [address, setaddress] = useState('');
  const onSearchByOther = (e, type) => {
    if (type === 'roomAmount') {
      setrate(e.target.value);
    }
    if (type === 'advanceAmount') {
      setadvanceRate(e.target.value);
    }
    if (type === 'booking_id') {
      setbookid(e.target.value.toLowerCase());
    }
    if (type === 'contactNo') {
      setmobileno(e.target.value.toLowerCase());
    }
    if (type === 'name') {
      setcustomername(e.target.value.toLowerCase());
    }
    if (type === 'date') {
      setcheckindate(e.target.value.toLowerCase());
    }
    if (type === 'address') {
      setaddress(e.target.value.toLowerCase());
    }
    if (type === 'RoomNo') {
      setroomNo(e.target.value);
    }
    if (type === 'dharmasala') {
      setdharamshalanamee(e.target.value.toLowerCase());
    }
  };

  useEffect(() => {
    var filtered = isDataDummy?.filter(
      (dt) =>
        dt?.booking_id?.toLowerCase().indexOf(bookid) > -1 &&
        Moment(dt?.date).format('YYYY-MM-DD').indexOf(checkindate) > -1 &&
        dt?.name?.toLowerCase().indexOf(customername) > -1 &&
        dt?.address?.toLowerCase().indexOf(address) > -1 &&
        // dt?.dharmasala?.name?.toLowerCase().indexOf(dharamshalanamee) > -1
        dt?.contactNo?.toLowerCase().indexOf(mobileno) > -1,
    );

    if (roomNo) {
      filtered = filtered?.map((item) => {
        if (item.RoomNo == Number(roomNo)) {
          return item;
        } else {
          return;
        }
      });
      filtered = filtered?.filter((x) => x !== undefined);
    }

    if (rate) {
      filtered = filtered?.map((item) => {
        if (item.roomAmount == Number(rate)) {
          return item;
        } else {
          return;
        }
      });
      filtered = filtered?.filter((x) => x !== undefined);
    }

    if (advanceRate) {
      filtered = filtered?.map((item) => {
        if (item.advanceAmount == Number(advanceRate)) {
          return item;
        } else {
          return;
        }
      });
      filtered = filtered?.filter((x) => x !== undefined);
    }

    setisData(filtered);
  }, [
    bookid,
    checkindate,
    roomNo,
    mobileno,
    customername,
    rate,
    advanceRate,
    address,
    dharamshalanamee,
  ]);

  const convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes] = time.split(':');

    if (hours === '12') {
      hours = '00';
    }

    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
  };
  const retruetime = (date) => {
    var options = { year: 'numeric', month: 'short', day: '2-digit' };
    var today = new Date(date);

    const currTime = today.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    return currTime;
  };
  return (
    <>
      <Dialog
        open={open3}
        onClose={handleClose5}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Cancel'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you want to cancel
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose5}>Disagree</Button>
          <Button onClick={handleClose4} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open4}
        onClose={handleClose6}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Force check out'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you want to force check out
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose6}>Disagree</Button>
          <Button onClick={handleClose7} autoFocus>
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
              <div className="add-div-close-div">
                <div>
                  <h2 style={{ marginBottom: '0.5rem', marginLeft: '1rem' }}>
                    Room Shift
                  </h2>
                  <Typography
                    style={{ marginLeft: '1rem' }}
                    variant="body2"
                    color="primary"
                  >
                    {currDate} / {currTime}
                  </Typography>
                </div>
                <IconButton>
                  <CloseIcon onClick={() => handleClose()} />
                </IconButton>
              </div>
              <RoomShiftForm setOpen={setOpen} changedata={changedata} />
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
              <div className="add-div-close-div">
                <IconButton>
                  <CloseIcon onClick={() => handleClose1()} />
                </IconButton>
              </div>
              <Printcheckin isData={isData} setOpen1={setOpen1} />;
            </div>
          </Box>
        </Fade>
      </Modal>

      <RoomBookingTap setopendashboard={setopendashboard} />
      <div style={{ marginLeft: '5rem', marginRight: '1.2rem' }}>
        <div className="search-header-print">
          <div
            className="search-header-print"
            style={{
              borderBottom: '1px  solid gray',
              width: '100%',
              borderTop: ' 1px solid gray',
              paddingTop: '1%',
            }}
          >
            <Tooltip title="Export Excel File">
              <IconButton>
                <img
                  onClick={() => ExportToExcel()}
                  src={ExportExcel}
                  alt="cc"
                  style={{ width: '30px', marginLeft: '0rem' }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Export Pdf File">
              <IconButton>
                <img
                  onClick={() => ExportPdfmanul(isData, 'OnlineCheckinData')}
                  src={ExportPdf}
                  alt="cc"
                  style={{ width: '30px' }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Print Report">
              <IconButton>
                <img
                  style={{ width: '30px' }}
                  onClick={() => handleOepn1()}
                  src={Print}
                  alt=" Print"
                />
              </IconButton>
            </Tooltip>
            &nbsp;&nbsp;
          </div>
        </div>

        <div className="table-div-maain">
          <Table
            sx={{ minWidth: 650, width: '100%' }}
            aria-label="simple table"
          >
            <TableHead style={{ background: '#F1F0F0' }}>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>
                  Checkin
                  <i
                    style={{ marginLeft: '0rem' }}
                    onClick={() => sortData('date')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  B_Id
                  <i
                    style={{ marginLeft: '0rem' }}
                    onClick={() => sortData('booking_id')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Mobile
                  <i
                    style={{ marginLeft: '0rem' }}
                    onClick={() => sortData('contactNo')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Customer
                  <i
                    style={{ marginLeft: '0rem' }}
                    onClick={() => sortData('name')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell style={{ width: '6rem' }}>
                  Guest
                  <i
                    style={{ marginLeft: '0rem' }}
                    onClick={() => sortData('name')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Address
                  <i
                    style={{ marginLeft: '0rem' }}
                    onClick={() => sortData('address')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Dharamshala
                  <i
                    style={{ marginLeft: '0rem' }}
                    onClick={() => sortData('dharmasala?.name')}
                    class={`fa fa-sort`}
                  />
                </TableCell>

                <TableCell>
                  RoomNo
                  <i
                    style={{ marginLeft: '0rem' }}
                    onClick={() => sortData('RoomNo')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Rent
                  <i
                    style={{ marginLeft: '0rem' }}
                    onClick={() => sortData('roomAmount')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                {/* <TableCell>
                  Advance
                  <i
                    style={{ marginLeft: '0rem' }}
                    onClick={() => sortData('advanceAmount')}
                    class={`fa fa-sort`}
                  />
                </TableCell> */}

                <TableCell>PayMode</TableCell>

                <TableCell style={{ width: '5rem' }}>Add_at</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>&nbsp;</TableCell>
                <TableCell>
                  <input
                    style={{ width: '5rem' }}
                    className="cuolms_search"
                    type="date"
                    onChange={(e) => onSearchByOther(e, 'date')}
                  />
                </TableCell>
                <TableCell>
                  <input
                    style={{ width: '4rem' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'booking_id')}
                    placeholder="BookingId"
                  />
                </TableCell>
                <TableCell>
                  <input
                    style={{ width: '7rem' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'contactNo')}
                    placeholder="Mobile No"
                  />
                </TableCell>
                <TableCell>
                  <input
                    style={{ width: '6rem' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'name')}
                    placeholder="Name"
                  />
                </TableCell>
                <TableCell>&nbsp;</TableCell>
                <TableCell>
                  <input
                    style={{ width: '6rem' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'address')}
                    placeholder="Address"
                  />
                </TableCell>
                <TableCell>
                  <input
                    style={{ width: '9rem' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => {
                      onSearchByOther(e, 'dharmasala');
                    }}
                    placeholder="Dharamshala Name"
                  />
                </TableCell>
                <TableCell>
                  <input
                    style={{ width: '5rem' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => {
                      onSearchByOther(e, 'RoomNo');
                    }}
                    placeholder="Room No"
                  />
                </TableCell>
                <TableCell>
                  <input
                    style={{ width: '5rem' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => {
                      onSearchByOther(e, 'roomAmount');
                    }}
                    placeholder="Rent"
                  />
                </TableCell>

                <TableCell>&nbsp;</TableCell>

                <TableCell>&nbsp;</TableCell>
                <TableCell>
                  <button
                    style={{
                      width: '5rem',
                    }}
                    className="chaneRoom"
                    onClick={() => getall_donation()}
                  >
                    Reset
                  </button>
                </TableCell>
              </TableRow>
              {isData ? (
                <>
                  {(rowsPerPage > 0
                    ? isData
                        ?.reverse()
                        ?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage,
                        )
                    : isData?.reverse()
                  ).map((row, index) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        {Moment(row?.date).format('DD-MM-YYYY')}: /
                        {convertTime12to24(retruetime(row?.date))}
                        &nbsp;&nbsp;
                      </TableCell>
                      <TableCell>{row?.booking_id}</TableCell>
                      <TableCell>{row?.contactNo}</TableCell>
                      <TableCell>{row?.name}</TableCell>
                      <TableCell>
                        <div style={{ width: '2rem' }}>
                          <p style={{ fontWeight: 300 }}>
                            {Number(row?.female) +
                              Number(row?.child) +
                              Number(row?.male)}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{row?.address}</TableCell>
                      <TableCell> {row?.dharamshalaData?.name}</TableCell>
                      <TableCell>
                        {row?.roomNumbers?.map((item) => (
                          <span>{item},</span>
                        ))}
                      </TableCell>
                      <TableCell> {row?.roomAmountSum}.00</TableCell>
                      {/* <TableCell>
                        {Number(row?.roomAmount) + Number(row?.advanceAmount)}
                      </TableCell> */}
                      <TableCell>
                        {row?.paymentMode === 2 ? 'Cash' : 'Online'}
                      </TableCell>
                      <TableCell style={{ width: '5rem' }}>
                        {Moment(row?.createdAt).format('DD-MM-YYYY')}
                      </TableCell>
                      <TableCell>
                        {optionss === 'History' ? (
                          <>
                            <Tooltip title="Print">
                              <img
                                onClick={() => downloadrecept(row)}
                                src={Print}
                                alt="print"
                                style={{ width: '25px', marginRight: '0.3rem' }}
                              />
                            </Tooltip>
                          </>
                        ) : (
                          <>
                            <Tooltip title="Print">
                              <img
                                onClick={() => downloadrecept(row)}
                                src={Print}
                                alt="print"
                                style={{ width: '25px', marginRight: '0.3rem' }}
                              />
                            </Tooltip>

                            {userrole === 1 && (
                              <>
                                <Tooltip title="Force Checkout">
                                  <img
                                    onClick={() =>
                                      navigation(
                                        '/admin-panel/Room/OnlineForce',
                                        {
                                          state: {
                                            data: row,
                                          },
                                        },
                                      )
                                    }
                                    src={fordd}
                                    alt="print"
                                    style={{
                                      width: '25px',
                                      // marginRight: '0.3rem',
                                    }}
                                  />
                                </Tooltip>
                              </>
                            )}

                            <Tooltip title="Checkout">
                              <img
                                onClick={() =>
                                  navigation(
                                    '/admin-panel/Room/OnlinecheckinReceipt',
                                    {
                                      state: {
                                        data: row,
                                      },
                                    },
                                  )
                                }
                                src={Checkout21}
                                alt="print"
                                style={{ width: '25px', marginRight: '0.3rem' }}
                              />
                            </Tooltip>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <></>
              )}
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>TotalAmount</TableCell>
                <TableCell style={{ fontWeight: 800 }}>
                  {isData &&
                    isData?.reduce(
                      (n, { roomAmountSum }) =>
                        parseFloat(n) + parseFloat(roomAmountSum),
                      0,
                    )}
                  .00
                </TableCell>

                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={isData && isData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[50, 100, 250]}
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
      {loader && <LoadingSpinner1 />}
    </>
  );
};

export default RoomShift;
