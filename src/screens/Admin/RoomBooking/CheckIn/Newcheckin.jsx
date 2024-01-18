import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { serverInstance } from '../../../../API/ServerInstance';
import { useNavigate, useLocation } from 'react-router-dom';
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
import moment from 'moment';
import ExportPdf from '../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../assets/ExportExcel.png';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CheckinForm from './CheckinForm';
import RoomBookingTap from '../RoomBookingTap';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import RoomShiftForm from '../RoomShift/RoomShiftForm';
import Printcheckin from './Printcheckin';
import LoadingSpinner1 from '../../../../components/Loading/LoadingSpinner1';
import ForceCheckoutOptions from './ForceCheckoutOptions';
import Print from '../../../../assets/Print.png';
import Print1 from '../../../../assets/Print1.png';
import Edit from '../../../../assets/Edit.png';
import Checkout21 from '../../../../assets/Checkout21.png';
import allforceCheckout from '../../../../assets/allforcecheckout.jpeg';
import allcancel from '../../../../assets/allcancel.png';
import fordd from '../../../../assets/for.jpeg';
import Allcheckout from './Allcheckout';
import Allforcecheckout from './Allforcecheckout';
import Allcancel from './Allcancel';
import multiple1 from '../../../../assets/multiple1.png';
import ShowAllRooms from './ShowAllRooms';
import './Checkin.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
  borderRadius: '5px',
};

const style1 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
  borderRadius: '5px',
};

const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
  borderRadius: '5px',
};

const Newcheckin = ({ setopendashboard }) => {
  const navigation = useNavigate();
  const location = useLocation();
  const [Dharamshala, setDharamshala] = useState('');
  const [emplist, setemplist] = useState('');
  const [loader, setloader] = useState(false);
  const [isData, setisData] = React.useState('');
  const [isDataDummy, setisDataDummy] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [userrole, setuserrole] = useState('');
  const [open, setOpen] = useState(false);
  const [optionss, setoptionss] = useState('Currently Stay');
  const handleClose = () => setOpen(false);
  const handleOepn = () => setOpen(true);
  const [open1, setOpen1] = React.useState(false);
  const handleClose1 = () => setOpen1(false);
  const handleOepn1 = () => {
    setOpen1(true);
  };
  const [row, setrow] = useState('');
  const [open2, setOpen2] = React.useState(false);
  const handleClose2 = () => setOpen1(false);
  const handleOepn2 = (row) => {
    setrow(row);
    setOpen2(true);
  };

  const [open8, setOpen8] = React.useState(false);
  const [changedata8, setchangedata8] = useState('');
  const handleClose8 = () => setOpen8(false);
  const handleOepn8 = async (data) => {
    serverInstance('room/checkRoomShift', 'POST', {
      bookingId: data?.booking_id,
    }).then((res) => {
      if (res.data?.status === false) {
        Swal.fire('Error', res?.data?.message, 'error');
      }

      if (res.data?.status === true) {
        setOpen8(true);
        setchangedata8(data);
      }
    });
  };

  console.log('data is', isData);
  const [open9, setOpen9] = React.useState(false);
  const [changedata9, setchangedata9] = useState('');
  const [bookingid, setbookingid] = useState();
  const handleClose9 = () => setOpen9(false);
  const handleOepn9 = async (data, id) => {
    setOpen9(true);
    setchangedata9(data);
    setbookingid(id);
  };

  const [open10, setOpen10] = React.useState(false);
  const [changedata10, setchangedata10] = useState('');
  const handleClose10 = () => setOpen10(false);
  const handleOepn10 = async (data, id) => {
    setOpen10(true);
    setchangedata10(data);
    setbookingid(id);
  };

  const [open11, setOpen11] = React.useState(false);
  const [changedata11, setchangedata11] = useState('');
  const handleClose11 = () => setOpen11(false);
  const handleOepn11 = async (data) => {
    serverInstance('room/checkCancel', 'POST', {
      bookingId: data?.booking_id,
    }).then((res) => {
      if (res.data?.status === false) {
        Swal.fire('Error', res?.data?.message, 'error');
      }

      if (res.data?.status === true) {
        setOpen11(true);
        setchangedata11(data);
      }
    });
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
  const getall_donation = () => {
    setloader(true);
    setcheckindate('');
    if (optionss === 'Currently Stay') {
      serverInstance('room/checkinReport', 'get').then((res) => {
        if (res.data) {
          setloader(false);
          let filterData = res.data.filter((item) => item.modeOfBooking === 1);
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
          let filterData = res.data.filter((item) => item.modeOfBooking === 1);
          setisData(filterData);
          setisDataDummy(filterData);
        }
      });
    }
  };
  const ExportPdfmanul = (isData, fileName) => {
    const doc = new jsPDF();

    const tableColumn = [
      'booking_id',
      'contactNo',
      'name',
      'checkindate',
      'checkintime',
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
        Number(item?.advanceAmount) + Number(item?.roomAmount),
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
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
        Staydays: Math.floor(
          (new Date(item?.coutDate).getTime() -
            new Date(item?.date).getTime()) /
            (1000 * 3600 * 24),
        ),
        TotalGuest:
          Number(item?.female) + Number(item?.child) + Number(item?.male),
        Address: item?.address,
        Dharamshala: item?.dharmasalaData?.name,
        RoomNo: item?.roomNumbers?.map((item) => item),
        Rent: item?.rroomAmountSum,
        Advance: item?.advanceAmountSum,
        Employee: item?.bookedByName,
        PayMode: item?.paymentMode === 2 ? 'Cash' : 'Online',
      });
    });
    exportFromJSON({ data, fileName, exportType });
  };
  const [cancelid, setcancelid] = useState('');
  const [open3, setOpen3] = React.useState(false);

  const handleClickOpen3 = (data) => {
    serverInstance('room/checkCancel', 'POST', {
      bookingId: data?.booking_id,
    }).then((res) => {
      if (res.data?.status === false) {
        Swal.fire('Error', res?.data?.message, 'error');
      }

      if (res.data?.status === true) {
        navigation('/admin-panel/ACancel', {
          state: {
            data: data,
          },
        });
      }
    });
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

  const getalldharamshala = () => {
    serverInstance('room/get-dharmasalas', 'get').then((res) => {
      if (res.data) {
        setDharamshala(res.data);
      }
    });
  };

  const getallemp_list = () => {
    serverInstance('admin/add-employee', 'get').then((res) => {
      if (res.status) {
        setemplist(res.data);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
    });
  };
  useEffect(() => {
    getallemp_list();
    getalldharamshala();
    getall_donation();
    setopendashboard(true);
    setuserrole(Number(sessionStorage.getItem('userrole')));
  }, [open, open1, open3, open4, open8, optionss]);
  const [roomDetails, setroomDetails] = useState('');
  const [dharamId, setdharamId] = useState('');
  const [dDetails, setdDetails] = useState('');
  const [cateDetails, setcateDetails] = useState('');
  useEffect(() => {
    if (location.state) {
      console.log(
        'room no for get room details',
        location?.state?.dharamshalaDetails?.dharamshala_id,
      );
      setdharamId(location?.state?.dharamshalaDetails?.dharamshala_id);
      setdDetails(location?.state?.dharamshalaDetails);
      setcateDetails(location.state?.item);
      serverInstance(
        `room/getRoomDetailsByRoomNo?roomNo=${location?.state?.roomNo}&dharamshalaId=${location?.state?.dharamshalaDetails?.dharamshala_id}&categoryId=${location.state?.item?.category_id[0]}`,
        'get',
      ).then((res) => {
        if (res.data) {
          setroomDetails(res?.data);
          setOpen(true);
        }
      });
    }
  }, []);

  const downloadrecept = (row) => {
    navigation('/admin-panel/Room/printReceipt', {
      state: {
        data: row,
        roomdata: isData,
      },
    });
  };

  const downloadallrecept = (row) => {
    navigation('/admin-panel/AllReceipt', {
      state: {
        data: row,
        roomdata: isData,
      },
    });
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
  const [checkoutBy, setcheckoutBy] = useState('');
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
    if (type === 'bookedByName') {
      setcheckoutBy(e.target.value);
    }
  };

  // dharmasalaData?.name roomAmountSum advanceAmountSum
  useEffect(() => {
    var filtered = isDataDummy?.filter(
      (dt) =>
        dt?.booking_id?.toLowerCase().indexOf(bookid) > -1 &&
        // Moment(dt?.date).format('YYYY-MM-DD').indexOf(checkindate) > -1 &&
        // Moment(dt?.coutDate).format('YYYY-MM-DD').indexOf(checkindate) > -1 &&
        dt?.name?.toLowerCase().indexOf(customername) > -1 &&
        dt?.bookedByName?.indexOf(checkoutBy) > -1 &&
        dt?.address?.toLowerCase().indexOf(address) > -1 &&
        dt?.dharmasalaData?.name?.toLowerCase().indexOf(dharamshalanamee) >
          -1 &&
        dt?.contactNo?.toLowerCase().indexOf(mobileno) > -1,
    );

    if (checkindate) {
      filtered = filtered?.map((item) => {
        if (Moment(item?.date).format('YYYY-MM-DD') == checkindate) {
          return item;
        } else {
          return;
        }
      });
      filtered = filtered?.filter((x) => x !== undefined);
    }
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
        if (item.roomAmountSum == Number(rate)) {
          return item;
        } else {
          return;
        }
      });
      filtered = filtered?.filter((x) => x !== undefined);
    }
    //row?.dharmasala?.name
    if (advanceRate) {
      filtered = filtered?.map((item) => {
        if (item.advanceAmountSum == Number(advanceRate)) {
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
    checkoutBy,
  ]);
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
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open8}
        onClose={handleClose8}
        closeAfterTransition
      >
        <Fade in={open8}>
          <Box sx={style1}>
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
                  <CloseIcon onClick={() => handleClose8()} />
                </IconButton>
              </div>

              <ShowAllRooms setOpen={setOpen8} changedata={changedata8} />
            </div>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open9}
        onClose={handleClose9}
        closeAfterTransition
      >
        <Fade in={open9}>
          <Box sx={style2}>
            <div>
              <div className="add-div-close-div">
                <div>
                  <h2 style={{ marginBottom: '0.5rem', marginLeft: '1rem' }}>
                    All Checkout
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
                  <CloseIcon onClick={() => handleClose9()} />
                </IconButton>
              </div>
              <Allcheckout setOpen={setOpen9} changedata={changedata9} />
            </div>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open10}
        onClose={handleClose10}
        closeAfterTransition
      >
        <Fade in={open10}>
          <Box sx={style2}>
            <div>
              <div className="add-div-close-div">
                <div>
                  <h2 style={{ marginBottom: '0.5rem', marginLeft: '1rem' }}>
                    All Force Checkout
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
                  <CloseIcon onClick={() => handleClose10()} />
                </IconButton>
              </div>
              <Allforcecheckout data={changedata10} bookingid={bookingid} />
            </div>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open11}
        onClose={handleClose11}
        closeAfterTransition
      >
        <Fade in={open11}>
          <Box sx={style2}>
            <div>
              <div className="add-div-close-div">
                <div>
                  <h2 style={{ marginBottom: '0.5rem', marginLeft: '1rem' }}>
                    All Cancel
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
                  <CloseIcon onClick={() => handleClose11()} />
                </IconButton>
              </div>
              <Allcancel changedata={changedata11} bookingid={bookingid} />
            </div>
          </Box>
        </Fade>
      </Modal>

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
                <div style={{ marginLeft: '1rem', marginBottom: '0rem' }}>
                  <h2 style={{ marginBottom: '0.5rem' }}>Check In</h2>
                  <Typography variant="body2" color="primary">
                    {currDate} / {currTime}
                  </Typography>
                </div>

                <IconButton>
                  <CloseIcon onClick={() => handleClose()} />
                </IconButton>
              </div>
              <CheckinForm
                setOpen={setOpen}
                roomDetails={roomDetails}
                dharamId={dharamId}
                dDetails={dDetails}
                cateDetails={cateDetails}
              />
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
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div style={{ width: '100%' }} />
                <IconButton>
                  <CloseIcon onClick={() => handleClose1()} />
                </IconButton>
              </div>
              <Printcheckin isData={isData} setOpen1={handleClose1} row={row} />
              ;
            </div>
          </Box>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open2}
        onClose={handleClose2}
        closeAfterTransition
      >
        <Fade in={open2}>
          <Box sx={style}>
            <div>
              <div className="add-div-close-div">
                <div style={{ marginLeft: '0rem', marginBottom: '1rem' }}>
                  <h2 style={{ marginBottom: '0rem' }}>
                    force Checkout option
                  </h2>
                  <Typography variant="body2" color="primary">
                    {currDate} / {currTime}
                  </Typography>
                </div>
                <IconButton>
                  <CloseIcon
                    // style={{ marginBottom: '3rem' }}
                    onClick={() => setOpen2(false)}
                  />
                </IconButton>
              </div>
              <ForceCheckoutOptions setOpen={setOpen2} row={row} />
            </div>
          </Box>
        </Fade>
      </Modal>
      <RoomBookingTap setopendashboard={setopendashboard} />
      <div style={{ marginLeft: '5rem', marginRight: '1rem' }}>
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
                  onClick={() => ExportPdfmanul(isData, 'CheckinData')}
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
            <Tooltip title="Add Dharamshala">
              <Button
                onClick={() => handleOepn()}
                className="add_btn_main_dhara"
              >
                + Add
              </Button>
            </Tooltip>
            &nbsp;&nbsp;
          </div>
        </div>

        <div
          style={{
            width: '100%',
          }}
        >
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
                  Book_ID
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
                  Client
                  <i
                    style={{ marginLeft: '0rem' }}
                    onClick={() => sortData('name')}
                    class={`fa fa-sort`}
                  />
                </TableCell>

                <TableCell style={{ width: '0.2rem' }}>
                  Guest
                  <i
                    style={{ marginLeft: '0rem' }}
                    onClick={() => sortData('dharmasala?.name')}
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
                  Days
                  <i
                    style={{ marginLeft: '0rem' }}
                    onClick={() => sortData('name')}
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
                <TableCell>
                  Advance
                  <i
                    style={{ marginLeft: '0rem' }}
                    onClick={() => sortData('advanceAmount')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Employee
                  <i
                    style={{ marginLeft: '0rem' }}
                    onClick={() => sortData('bookedByName')}
                    class={`fa fa-sort`}
                  />
                </TableCell>

                <TableCell>
                  Pay
                  <i
                    style={{ marginLeft: '0rem' }}
                    onClick={() => sortData('paymentMode')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>&nbsp;</TableCell>
                <TableCell>
                  <input
                    style={{ width: '4rem' }}
                    className="cuolms_search"
                    type="date"
                    onChange={(e) => {
                      onSearchByOther(e, 'date');
                      console.log(e.target.value);
                    }}
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
                    style={{ width: '4rem' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'contactNo')}
                    placeholder="Mobile No"
                  />
                </TableCell>

                <TableCell>
                  <input
                    style={{ width: '4rem' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'name')}
                    placeholder="Name"
                  />
                </TableCell>
                <TableCell>
                  <div style={{ width: '3rem' }} />
                </TableCell>

                <TableCell>
                  <input
                    style={{ width: '2rem' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'address')}
                    placeholder="Address"
                  />
                </TableCell>
                <TableCell>
                  <div style={{ width: '3rem' }} />
                </TableCell>
                <TableCell>
                  <input
                    style={{ width: '6rem' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => {
                      onSearchByOther(e, 'dharmasala');
                    }}
                    placeholder="Dharamshala"
                  />
                </TableCell>

                <TableCell>
                  <input
                    style={{ width: '3rem' }}
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
                    style={{ width: '3rem' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => {
                      onSearchByOther(e, 'roomAmount');
                    }}
                    placeholder="Rent"
                  />
                </TableCell>
                <TableCell>
                  <input
                    style={{ width: '3rem' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => {
                      onSearchByOther(e, 'advanceAmount');
                    }}
                    placeholder="Advance"
                  />
                </TableCell>
                <TableCell>
                  <select
                    name="cars"
                    id="cars"
                    style={{ width: '5rem' }}
                    className="cuolms_search"
                    onChange={(e) => {
                      onSearchByOther(e, 'bookedByName');
                      console.log(e.target.value);
                    }}
                  >
                    <option value="">All user</option>
                    {emplist &&
                      emplist.map((item, idx) => {
                        return (
                          <option value={item.Username}>{item.Username}</option>
                        );
                      })}
                  </select>
                </TableCell>
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
                        {Moment(row?.date)?.format('DD-MM-YYYY')}&nbsp;&nbsp;
                        {convertTime12to24(retruetime(row?.date))}
                        &nbsp;&nbsp;
                      </TableCell>
                      <TableCell>{row?.booking_id}</TableCell>
                      <TableCell>{row?.contactNo}</TableCell>

                      <TableCell>
                        <div style={{ width: '2rem' }}>
                          <p style={{ fontWeight: 300 }}>{row?.name}</p>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div style={{ width: '2rem' }}>
                          <p style={{ fontWeight: 300 }}>
                            {Number(row?.female) +
                              Number(row?.child) +
                              Number(row?.male)}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div style={{ width: '2rem' }}>
                          <p style={{ fontWeight: 300 }}>{row?.address}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div style={{ width: '2rem' }}>
                          <p style={{ fontWeight: 300 }}>
                            {Math.floor(
                              (new Date(isData[0]?.coutDate).getTime() -
                                new Date(isData[0]?.date).getTime()) /
                                (1000 * 3600 * 27),
                            ) != 0
                              ? Math.floor(
                                  (new Date(isData[0]?.coutDate).getTime() -
                                    new Date(isData[0]?.date).getTime()) /
                                    (1000 * 3600 * 27),
                                )
                              : 1}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div style={{ width: '2rem' }}>
                          <p style={{ fontWeight: 300 }}>
                            {row?.dharmasalaData?.name}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div style={{ width: '4rem',wordWrap:"break-word" }}>
                          <p style={{ fontWeight: 300 }}>
                            {row?.roomNumbers?.map((item) => (
                              <span>{item},</span>
                            ))}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div style={{ width: '2rem' }}>
                          <p style={{ fontWeight: 300 }}>
                            {row?.roomAmountSum}.00
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div style={{ width: '2rem' }}>
                          <p style={{ fontWeight: 300 }}>
                            {Number(row?.advanceAmountSum)}.00
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div style={{ width: '2rem' }}>
                          <p style={{ fontWeight: 300 }}>{row?.bookedByName}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {row?.paymentMode === 2 ? 'Cash' : 'Bank'}
                      </TableCell>
                      <TableCell>
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
                                    '/admin-panel/Room/ForceRoomChequeOut',
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
                                  marginRight: '0.3rem',
                                }}
                              />
                            </Tooltip>
                          </>
                        )}
                        <Tooltip title="Room Shift">
                          <img
                            onClick={() => handleOepn8(row)}
                            src={Edit}
                            alt="print"
                            style={{
                              width: '25px',
                              marginRight: '0.3rem',
                            }}
                          />
                        </Tooltip>
                        <Tooltip title="All Cancel">
                          <CloseIcon onClick={() => handleClickOpen3(row)} />
                        </Tooltip>

                        <Tooltip title="Cancel">
                          <img
                            onClick={() => handleOepn11(row)}
                            src={allforceCheckout}
                            alt="print"
                            style={{
                              width: '25px',
                              marginRight: '0.3rem',
                            }}
                          />
                        </Tooltip>
                        <Tooltip title="Checkout">
                          <img
                            onClick={() =>
                              navigation('/admin-panel/Room/CheckoutReceipt', {
                                state: {
                                  data: row,
                                },
                              })
                            }
                            src={Checkout21}
                            alt="print"
                            style={{ width: '25px', marginRight: '0.3rem' }}
                          />
                        </Tooltip>
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
                <TableCell style={{ fontWeight: 800 }}>
                  {isData &&
                    isData?.reduce(
                      (n, { advanceAmountSum }) =>
                        parseFloat(n) + parseFloat(advanceAmountSum),
                      0,
                    )}
                  .00
                </TableCell>
                <TableCell></TableCell>
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

export default Newcheckin;
