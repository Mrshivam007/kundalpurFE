import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { serverInstance } from '../../../../API/ServerInstance';
import { useNavigate } from 'react-router-dom';
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
import Print from '../../../../assets/Print.png';
import Checkout21 from '../../../../assets/Checkout21.png';
import ExportPdf from '../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../assets/ExportExcel.png';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { Select, MenuItem } from '@mui/material';
import RoomBookingReportsTab from './RoomBookingReportsTab';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';
import Printcheckin from '../CheckIn/Printcheckin';
import LoadingSpinner1 from '../../../../components/Loading/LoadingSpinner1';
const style = {
  position: 'absolute',
  top: '47%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
  borderRadius: '5px',
};

const Onlinecheckin = ({ setopendashboard }) => {
  const navigation = useNavigate();
  const [loader, setloader] = useState(false);
  const [emplist, setemplist] = useState('');
  const [isData, setisData] = React.useState('');
  const [isDataDummy, setisDataDummy] = React.useState([]);
  const [datefrom, setdatefrom] = useState('');
  const [dateto, setdateto] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [userrole, setuserrole] = useState('');
  const [open, setOpen] = React.useState(false);
  const [optionss, setoptionss] = useState('Currently Stay');
  const handleClose = () => setOpen(false);
  const handleOepn = () => setOpen(true);
  const [open1, setOpen1] = React.useState(false);
  const handleClose1 = () => setOpen1(false);

  const filterdata = async (e) => {
    setloader(true);
    e.preventDefault();
    try {
      serverInstance(
        `room/checkoutHistoryAdmin?fromDate=${datefrom}&toDate=${dateto}`,
        'post',
      ).then((res) => {
        if (res?.data) {
          console.log('res is data is ', res);
          let filterData = res?.data?.filter(
            (item) => item?.modeOfBooking === 2,
          );
          setisData(filterData);
          setisDataDummy(filterData);
          setloader(false);
        }
      });
    } catch (error) {
      setloader(false);
    }
  };
  const handleOepn1 = () => {
    setOpen1(true);
  };
  const [open8, setOpen8] = React.useState(false);
  const [changedata8, setchangedata8] = useState('');
  const handleClose8 = () => setOpen8(false);
  const handleOepn8 = (data) => {
    setOpen8(true);
    setchangedata8(data);
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

    serverInstance('room/checkoutHistoryAdmin', 'post').then((res) => {
      console.log(res);
      if (res.data) {
        setloader(false);
        let filterData = res.data.filter((item) => item.modeOfBooking === 2);
        setisData(filterData);
        setisDataDummy(filterData);
      }
    });
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
        Address: item?.address,
        Dharamshala: item?.dharmasalaName,
        RoomNo: item?.RoomNo,
        Rent: item?.roomAmount,
        Advance: item?.advanceAmount,
        Employee: item?.bookedByName,
        PayMode: item?.paymentMode === 2 ? 'Cash' : 'Online',
      });
    });
    exportFromJSON({ data, fileName, exportType });
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

    // serverInstance('/room/force-checkout', 'POST', {
    //   id: deleteId,
    // }).then((res) => {
    //   console.log(res);
    //   // setOpen(false);
    // });
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
    getall_donation();
    setopendashboard(true);
    setuserrole(Number(sessionStorage.getItem('userrole')));
  }, [open, open1, open3, open4, open8, optionss]);

  const downloadrecept = (row) => {
    navigation('/admin-panel/Room/OnlinePrintReceipt', {
      state: {
        data: row,
      },
    });
  };

  const downloadcheckout = (row) => {
    navigation('/admin-panel/room/Onlinecheckouthistort', {
      state: {
        data: row,
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
  const [checkoutdate, setcheckoutdate] = useState('');

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
    if (type === 'dharmasalaName') {
      setdharamshalanamee(e.target.value.toLowerCase());
    }
    if (type === 'checkoutByName') {
      setcheckoutBy(e.target.value);
    }
    if (type == 'coutDate') {
      setcheckoutdate(e.target.value);
    }
  };

  // dharmasalaData?.name roomAmountSum advanceAmountSum

  useEffect(() => {
    var filtered = isDataDummy?.filter(
      (dt) =>
        dt?.booking_id?.toLowerCase().indexOf(bookid) > -1 &&
        Moment(dt?.date).format('YYYY-MM-DD').indexOf(checkindate) > -1 &&
        Moment(dt?.coutDate).format('YYYY-MM-DD').indexOf(checkoutdate) > -1 &&
        dt?.name?.toLowerCase().indexOf(customername) > -1 &&
        dt?.checkoutByName?.indexOf(checkoutBy) > -1 &&
        dt?.address?.toLowerCase().indexOf(address) > -1 &&
        dt?.dharmasalaName?.toLowerCase().indexOf(dharamshalanamee) > -1 &&
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
    //row?.dharmasala?.name
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

    // if (mobileno) {
    //   filtered = filtered?.map((item) => {
    //     if (item.contactNo == mobileno) {
    //       return item;
    //     } else {
    //       return;
    //     }
    //   });
    //   filtered = filtered?.filter((x) => x !== undefined);
    // }
    setisData(filtered);

    console.log('data is', filtered);
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
    checkoutdate,
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
  return (
    <>
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
              <Printcheckin isData={isData} setOpen1={setOpen1} />;
            </div>
          </Box>
        </Fade>
      </Modal>
      <RoomBookingReportsTab setopendashboard={setopendashboard} />
      <div style={{ marginLeft: '5rem', marginRight: '1rem' }}>
        <div className="search-header " style={{ paddingLeft: '65%' }}>
          <div className="search-inner-div-reports">
            <form className="search-inner-div-reports" onSubmit={filterdata}>
              <div className="Center_main_dic_filetr">
                <label htmlFor="donation-date">From Date</label>
                <input
                  id="donation-date"
                  style={{ width: '100%' }}
                  type="date"
                  placeholder="From"
                  value={datefrom}
                  name="datefrom"
                  onChange={(e) => {
                    setdatefrom(e.target.value);
                  }}
                />
              </div>
              <div className="Center_main_dic_filetr">
                <label htmlFor="donation-date">To Date</label>
                <input
                  id="donation-date"
                  style={{ width: '100%' }}
                  type="date"
                  placeholder="From"
                  value={dateto}
                  name="dateto"
                  onChange={(e) => {
                    setdateto(e.target.value);
                  }}
                />
              </div>

              <div className="Center_main_dic_filetr">
                <label>&nbsp;</label>
                <button>Search</button>
              </div>
            </form>

            <div className="Center_main_dic_filetr">
              <label>&nbsp;</label>
              <button
                onClick={() => {
                  getall_donation();
                  setdateto('');
                  setdatefrom('');
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
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
            {/* <Tooltip title="Print Report">
              <IconButton>
                <img
                  style={{ width: '30px' }}
                  onClick={() => handleOepn1()}
                  src={Print}
                  alt=" Print"
                />
              </IconButton>
            </Tooltip> */}
            &nbsp;&nbsp;
          </div>
        </div>

        <div className="table-div-maain">
          <Table
            sx={{ minWidth: 650, width: '100%' }}
            // style={{ marginLeft: '1rem' }}
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
                  Checkout
                  <i
                    style={{ marginLeft: '0rem' }}
                    onClick={() => sortData('coutDate')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Booking_ID
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
                <TableCell>
                  Emp
                  <i
                    style={{ marginLeft: '0rem' }}
                    onClick={() => sortData('checkoutByName')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>PayMode</TableCell>
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
                    style={{ width: '5rem' }}
                    className="cuolms_search"
                    type="date"
                    onChange={(e) => onSearchByOther(e, 'coutDate')}
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
                    style={{ width: '6rem' }}
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
                    style={{ width: '6rem' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => {
                      onSearchByOther(e, 'dharmasalaName');
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
                    style={{ width: '4rem' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => {
                      onSearchByOther(e, 'roomAmount');
                    }}
                    placeholder="Rent"
                  />
                </TableCell>
                {/* <TableCell>
                  <input
                    style={{ width: '4rem' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => {
                      onSearchByOther(e, 'advanceAmount');
                    }}
                    placeholder="Advance"
                  />
                </TableCell> */}
                <TableCell>
                  <select
                    name="cars"
                    id="cars"
                    style={{ width: '5rem' }}
                    className="cuolms_search"
                    onChange={(e) => {
                      onSearchByOther(e, 'checkoutByName');
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
                    ? isData.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                    : isData
                  ).map((row, index) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        {Moment(row?.date).format('DD-MM-YYYY')}&nbsp;&nbsp;
                      </TableCell>
                      <TableCell>
                        {Moment(row?.coutDate).format('DD-MM-YYYY')}&nbsp;&nbsp;
                      </TableCell>
                      <TableCell>{row?.booking_id}</TableCell>
                      <TableCell>{row?.contactNo}</TableCell>

                      <TableCell>{row?.name}</TableCell>
                      <TableCell>{row?.address}</TableCell>
                      <TableCell> {row?.dharmasalaData?.name}</TableCell>
                      <TableCell>
                        {row?.roomNumbers?.map((item) => (
                          <span>{item},</span>
                        ))}
                      </TableCell>
                      <TableCell> {row?.roomAmountSum}.00</TableCell>
                      {/* <TableCell>{Number(row?.advanceAmountSum)}</TableCell> */}
                      <TableCell>{row?.checkoutByName}</TableCell>
                      <TableCell>
                        {row?.paymentMode === 2 ? 'Cash' : 'Online'}
                      </TableCell>
                      <TableCell style={{ display: 'flex' }}>
                        <img
                          src={Checkout21}
                          style={{ width: '25px', marginRight: '0.5rem' }}
                          onClick={() => downloadcheckout(row)}
                        />

                        <img
                          src={Print}
                          style={{ width: '25px' }}
                          onClick={() => downloadrecept(row)}
                        />
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
                <TableCell>TotalAmount</TableCell>
                <TableCell style={{ fontWeight: 800 }}>
                  {isData &&
                    isData?.reduce(
                      (n, { roomAmountSum }) =>
                        parseFloat(n) + parseFloat(roomAmountSum),
                      0,
                    )}.00
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

export default Onlinecheckin;
