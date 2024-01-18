import React, { useEffect, useState, useRef } from 'react';
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
import ExportPdf from '../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../assets/ExportExcel.png';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { Select, MenuItem } from '@mui/material';
import RoomBookingReportsTab from './AllReportTap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';
import AlllPrintConsolatedRoom from './AllPrint/AlllPrintConsolatedRoom';
import LoadingSpinner1 from '../../../../components/Loading/LoadingSpinner1';
import { useReactToPrint } from 'react-to-print';
const style = {
  position: 'absolute',
  top: '49%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
  borderRadius: '5px',
};

const Consolided = ({ setopendashboard }) => {
  const navigation = useNavigate();
  const componentRef = useRef();
  const [emplist, setemplist] = useState('');
  const [fromdate, setfromdate] = useState('');
  const [toDate, settoDate] = useState('');
  const [empidsearch, setempidsearch] = useState('');
  const [loader, setloader] = useState(false);
  const [isData, setisData] = React.useState('');
  const [isDataDummy, setisDataDummy] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [userrole, setuserrole] = useState('');
  const [open, setOpen] = React.useState(false);
  const [optionss, setoptionss] = useState('Currently Stay');
  const handleClose = () => setOpen(false);
  const handleOepn = () => setOpen(true);
  const [open1, setOpen1] = React.useState(false);
  const handleClose1 = () => setOpen1(false);
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
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  // "fromDate" : "2023-07-15",
  // "toDate" : "2023-07-16"

  const getall_donation = () => {
    setloader(true);
    serverInstance(`room/consolidated`, 'POST', {
      fromDate: fromdate,
      toDate: toDate,
    }).then((res) => {
      console.log(res);
      if (res.data) {
        setloader(false);
        setisData(res.data);
        setisDataDummy(res.data);
      }
    });
  };
  const ExportPdfmanul = (isData, fileName) => {
    const doc = new jsPDF();

    const tableColumn = [
      'Date',
      'Employee',
      'CheckinAmountCash',
      'CheckinAmountOnline',
      'RentAmount',
      'CheckoutAmount',
      'TotalAmount',
    ];

    const tableRows = [];

    isData.forEach((item) => {
      const ticketData = [
        Moment(item?.date).format('DD-MM-YYYY'),
        item?.Username,
        item?.totalCashCheckinAmount,
        item?.totalOnlineCheckinAmount,
        item?.totalRateAmount,
        item?.totalCheckoutAmount,
        item?.finalAmount,
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
    const fileName = 'Consolidated';
    const exportType = 'xls';
    var data = [];
    // date Username totalCheckinAmount totalRateAmount totalCheckoutAmount finalAmount
    isData.map((item, index) => {
      data.push({
        Date: Moment(item?.date).format('DD-MM-YYYY'),
        Employee: item?.Username,
        CheckinAmountCash: item?.totalCashCheckinAmount,
        CheckinAmountOnline: item?.totalOnlineCheckinAmount,
        RentAmount: item?.totalRateAmount,
        CheckoutAmount: item?.totalCheckoutAmount,
        TotalAmount: item?.finalAmount,
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

  const handledisable = (date) => {
    console.log('date daisble', date);
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

  const reset = () => {
    settoDate('');
    setfromdate('');
    setempidsearch('');
    getall_donation();
  };
  useEffect(() => {
    getallemp_list();
    getall_donation();
    setopendashboard(true);
    setuserrole(Number(sessionStorage.getItem('userrole')));
  }, [open, open1, open3, open4, open8, optionss]);

  const filterdata = (e) => {
    setloader(true);
    e.preventDefault();
    serverInstance(`room/consolidated?employeeName=${empidsearch}`, 'POST', {
      fromDate: fromdate,
      toDate: toDate,
    }).then((res) => {
      if (res?.data) {
        setisData(res?.data);
        setloader(false);
      }
    });
  };

  const [customername, setcustomername] = useState('');
  const [todate, settodate] = useState('');
  const [date, setdate] = useState('');
  const [checkinamount, setcheckinamount] = useState('');
  const [checkinamountonline, setcheckinamountonline] = useState('');
  const [checkoutamount, setcheckoutamount] = useState('');
  const [rentamount, setrentamount] = useState('');
  const [finalamount, setfinalamount] = useState('');
  const [cancledAmount, setcancledAmount] = useState('');

  console.log(checkinamount);
  const onSearchByOther = (e, type) => {
    if (type === 'date') {
      setdate(e.target.value.toLowerCase());
    }
    if (type === 'Username') {
      setcustomername(e.target.value.toLowerCase());
    }
    if (type === 'totalCashCheckinAmount') {
      setcheckinamount(e.target.value);
    }

    if (type === 'totalOnlineCheckinAmount') {
      setcheckinamountonline(e.target.value);
    }
    if (type === 'totalRateAmount') {
      setrentamount(e.target.value);
    }
    if (type === 'totalCheckoutAmount') {
      setcheckoutamount(e.target.value);
    }

    if (type === 'finalAmount') {
      setfinalamount(e.target.value);
    }

    if (type === 'totalCancelledAmount') {
      setcancledAmount(e.target.value);
    }
  };

  useEffect(() => {
    var filtered = isDataDummy?.filter(
      (dt) =>
        Moment(dt?.date).format('YYYY-MM-DD').indexOf(date) > -1 &&
        dt?.Username?.toLowerCase().indexOf(customername) > -1,
    );

    if (cancledAmount) {
      filtered = filtered?.map((item) => {
        if (item?.totalCancelledAmount == Number(cancledAmount)) {
          return item;
        } else {
          return;
        }
      });
      filtered = filtered?.filter((x) => x !== undefined);
    }

    if (checkinamount) {
      filtered = filtered?.map((item) => {
        if (Number(item.totalCashCheckinAmount) == Number(checkinamount)) {
          return item;
        } else {
          return;
        }
      });
      filtered = filtered?.filter((x) => x !== undefined);
    }

    if (checkinamountonline) {
      filtered = filtered?.map((item) => {
        if (
          Number(item.totalOnlineCheckinAmount) == Number(checkinamountonline)
        ) {
          return item;
        } else {
          return;
        }
      });
      filtered = filtered?.filter((x) => x !== undefined);
    }

    if (checkoutamount) {
      filtered = filtered?.map((item) => {
        if (item.totalCheckoutAmount == Number(checkoutamount)) {
          return item;
        } else {
          return;
        }
      });
      filtered = filtered?.filter((x) => x !== undefined);
    }

    if (rentamount) {
      filtered = filtered?.map((item) => {
        if (item.totalRateAmount == Number(rentamount)) {
          return item;
        } else {
          return;
        }
      });
      filtered = filtered?.filter((x) => x !== undefined);
    }

    if (finalamount) {
      filtered = filtered?.map((item) => {
        if (item.finalAmount == Number(finalamount)) {
          return item;
        } else {
          return;
        }
      });
      filtered = filtered?.filter((x) => x !== undefined);
    }
    setisData(filtered);
  }, [
    date,
    customername,
    finalamount,
    checkinamount,
    rentamount,
    checkoutamount,
    cancledAmount,
    checkinamountonline,
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
              < AlllPrintConsolatedRoom  isData={isData} handleClose={handleClose1} />;
            </div>
          </Box>
        </Fade>
      </Modal>
      <RoomBookingReportsTab setopendashboard={setopendashboard} />
      <div style={{ marginLeft: '5rem', marginRight: '1rem' }}>
        <div
          className="search-header "
          style={{ paddingLeft: '1.5%', paddingRight: '1.3rem' }}
        >
          <div className="search-inner-div-reports">
            <form className="search-inner-div-reports" onSubmit={filterdata}>
              <div className="Center_main_dic_filetr">
                <label htmlFor="donation-date">From Date</label>
                <input
                  id="donation-date"
                  style={{ width: '17rem' }}
                  type="date"
                  placeholder="From"
                  value={fromdate}
                  name="fromdate"
                  onChange={(e) => {
                    setfromdate(e.target.value);
                  }}
                />
              </div>

              <div className="Center_main_dic_filetr">
                <label htmlFor="donation-date">To Date</label>
                <input
                  id="donation-date"
                  style={{ width: '17rem' }}
                  type="date"
                  placeholder="From"
                  value={toDate}
                  name="fromdate"
                  onChange={(e) => {
                    settoDate(e.target.value);
                  }}
                />
              </div>

              <div className="Center_main_dic_filetr">
                <label>Employee Name</label>
                <select
                  name="cars"
                  id="cars"
                  className="cuolms_search"
                  onChange={(e) => setempidsearch(e.target.value)}
                >
                  <option value="">All user</option>
                  {emplist &&
                    emplist.map((item, idx) => {
                      return (
                        <option value={item.Username}>{item.Username}</option>
                      );
                    })}
                </select>
              </div>

              <div className="Center_main_dic_filetr">
                <label>&nbsp;</label>
                <button>Search</button>
              </div>
            </form>
            <div className="Center_main_dic_filetr">
              <label>&nbsp;</label>
              <button onClick={() => reset()}>Reset</button>
            </div>
          </div>
        </div>
        <div
          className="search-header-print"
          style={{
            paddingRight: '1.5%',
            paddingBottom: '1rem',
            paddingLeft: '1.5%',
          }}
        >
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
                  onClick={() => ExportPdfmanul(isData, 'Consolidated')}
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
            ref={componentRef}
            sx={{ minWidth: 650, width: '100%' }}
            aria-label="simple table"
          >
            <TableHead style={{ background: '#F1F0F0' }}>
              <TableRow>
                <TableCell>S.No</TableCell>

                <TableCell>
                  Date
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('date')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Employee Name
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('Username')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  CheckIn (Bank)
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('totalOnlineCheckinAmount')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  CheckIn (Cash)
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('totalCashCheckinAmount')}
                    class={`fa fa-sort`}
                  />
                </TableCell>

                <TableCell>
                  Rent (Room)
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('totalRateAmount')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  CheckOut (Return)
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('totalCheckoutAmount')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Cancel Amount
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('totalCancelledAmount')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Total Amount
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('finalAmount')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
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
                    placeholder="Search name"
                  />
                </TableCell>
                <TableCell>
                  <input
                    style={{ width: '5rem' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'Username')}
                    placeholder="Search name"
                  />
                </TableCell>
                <TableCell>
                  <input
                    style={{ width: '7rem' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) =>
                      onSearchByOther(e, 'totalOnlineCheckinAmount')
                    }
                    placeholder="Search  Checkin"
                  />
                </TableCell>
                <TableCell>
                  <input
                    style={{ width: '7rem' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => {
                      onSearchByOther(e, 'totalCashCheckinAmount');

                      console.log(e.target.value);
                    }}
                    placeholder="Search  Checkin"
                  />
                </TableCell>

                <TableCell>
                  <input
                    style={{ width: '7rem' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'totalRateAmount')}
                    placeholder="Search Rate"
                  />
                </TableCell>
                <TableCell>
                  <input
                    style={{ width: '7rem' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'totalCheckoutAmount')}
                    placeholder="Search Checkout"
                  />
                </TableCell>
                <TableCell>
                  <input
                    style={{ width: '7rem' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'totalCancelledAmount')}
                    placeholder="Search Cancel"
                  />
                </TableCell>
                <TableCell>
                  <input
                    style={{ width: '7rem' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'finalAmount')}
                    placeholder="Search Total"
                  />
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
                        {Moment(row?.date).format('DD-MM-YYYY')}
                      </TableCell>
                      <TableCell>{row?.Username}</TableCell>
                      <TableCell>{row?.totalOnlineCheckinAmount}</TableCell>
                      <TableCell>{row?.totalCashCheckinAmount}</TableCell>

                      <TableCell>{row?.totalRateAmount}</TableCell>
                      <TableCell>{row?.totalCheckoutAmount}</TableCell>
                      <TableCell>{row?.totalCancelledAmount}</TableCell>
                      <TableCell>{row?.finalAmount}</TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <></>
              )}
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell style={{ fontWeight: 800 }}>
                  {isData &&
                    isData?.reduce(
                      (n, { totalOnlineCheckinAmount }) =>
                        parseFloat(n) + parseFloat(totalOnlineCheckinAmount),
                      0,
                    )}
                </TableCell>
                <TableCell style={{ fontWeight: 800 }}>
                  {isData &&
                    isData?.reduce(
                      (n, { totalCashCheckinAmount }) =>
                        parseFloat(n) + parseFloat(totalCashCheckinAmount),
                      0,
                    )}
                </TableCell>

                <TableCell style={{ fontWeight: 800 }}>
                  {isData &&
                    isData?.reduce(
                      (n, { totalRateAmount }) =>
                        parseFloat(n) + parseFloat(totalRateAmount),
                      0,
                    )}
                </TableCell>
                <TableCell style={{ fontWeight: 800 }}>
                  {isData &&
                    isData?.reduce(
                      (n, { totalCheckoutAmount }) =>
                        parseFloat(n) + parseFloat(totalCheckoutAmount),
                      0,
                    )}
                </TableCell>

                <TableCell style={{ fontWeight: 800 }}>
                  {isData &&
                    isData?.reduce(
                      (n, { totalCancelledAmount }) =>
                        parseFloat(n) + parseFloat(totalCancelledAmount),
                      0,
                    )}
                </TableCell>
                <TableCell style={{ fontWeight: 800 }}>
                  {isData &&
                    isData?.reduce(
                      (n, { finalAmount }) =>
                        parseFloat(n) + parseFloat(finalAmount),
                      0,
                    )}
                </TableCell>
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

export default Consolided;
