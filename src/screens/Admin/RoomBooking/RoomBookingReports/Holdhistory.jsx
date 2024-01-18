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
import Edit from '../../../../assets/Edit.png';
import forcheckout from '../../../../assets/Checkout2.png';
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

const Holdhistory = ({ setopendashboard }) => {
  const navigation = useNavigate();
  const [loader, setloader] = useState([]);
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
  const getall_donation = () => {
    setloader(true);

    serverInstance('room/holdin-history', 'get').then((res) => {
      console.log(res);
      if (res.data?.status === false) {
        setloader(false);
      } else {
        setloader(false);
        setisData(res.data);
        setisDataDummy(res.data);
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
        bookingid: item?.booking_id,
        contactNo: item?.contactNo,
        Customer: item?.name,
        CheckinDate: Moment(item?.date).format('DD-MM-YYYY'),
        CheckinTime: moment(item?.time, 'HH:mm:ss').format('hh:mm:ss'),
        CheckOutDate: Moment(item?.coutDate).format('DD-MM-YYYY'),
        CheckOutTime: moment(item?.coutTime, 'HH:mm:ss').format('hh:mm:ss'),
        Rate: item?.roomAmount,
        Advance: item?.advanceAmount,
        RoomNo: item?.RoomNo,
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

  const handledisable = (date) => {
    console.log('date daisble', date);
  };

  useEffect(() => {
    getall_donation();
    setopendashboard(true);
    setuserrole(Number(sessionStorage.getItem('userrole')));
  }, [open, open1, open3, open4, open8, optionss]);

  const downloadrecept = (row) => {
    navigation('/admin-panel/Room/printReceipt', {
      state: {
        data: row,
      },
    });
  };
  const [mobileno, setmobileno] = useState('');
  const [customername, setcustomername] = useState('');
  const [checkindate, setcheckindate] = useState('');
  const [checkoutdate, setcheckoutdate] = useState('');
  const [roomNo, setroomNo] = useState('');
  const [holdsince, setholdsince] = useState('');
  const [holdremain, setholdremain] = useState('');
  const [holdby, setholdby] = useState('');
  const [remark, setremark] = useState('');

  const onSearchByOther = (e, type) => {
    if (type === 'mobile') {
      setmobileno(e.target.value.toLowerCase());
    }
    if (type === 'name') {
      setcustomername(e.target.value.toLowerCase());
    }
    if (type === 'roomNo') {
      setroomNo(e.target.value);
    }
    if (type === 'since') {
      setcheckindate(e.target.value.toLowerCase());
    }
    if (type === 'remain') {
      setcheckoutdate(e.target.value.toLowerCase());
    }
    if (type === 'approvedBy') {
      setholdby(e.target.value.toLowerCase());
    }
    if (type === 'remarks') {
      setremark(e.target.value.toLowerCase());
    }
  };

  useEffect(() => {
    var filtered = isDataDummy?.filter(
      (dt) =>
        Moment(dt?.since).format('YYYY-MM-DD').indexOf(checkindate) > -1 &&
        Moment(dt?.remain).format('YYYY-MM-DD').indexOf(checkoutdate) > -1 &&
        dt?.name?.toLowerCase().indexOf(customername) > -1&&
        dt?.mobile?.toLowerCase().indexOf(mobileno) > -1,
    );

    if (remark) {
      filtered = filtered?.map((item) => {
        if (item.remarks == remark) {
          return item;
        } else {
          return;
        }
      });
      filtered = filtered?.filter((x) => x !== undefined);
    }
    if (holdby) {
      filtered = filtered?.map((item) => {
        if (item.approvedBy == holdby) {
          return item;
        } else {
          return;
        }
      });
      filtered = filtered?.filter((x) => x !== undefined);
    }
    if (roomNo) {
      filtered = filtered?.map((item) => {
        if (item.roomNo == Number(roomNo)) {
          return item;
        } else {
          return;
        }
      });
      filtered = filtered?.filter((x) => x !== undefined);
    }
    // if (mobileno) {
    //   filtered = filtered?.map((item) => {
    //     if (item.mobile == mobileno) {
    //       return item;
    //     } else {
    //       return;
    //     }
    //   });
    //   filtered = filtered?.filter((x) => x !== undefined);
    // }
    setisData(filtered);
  }, [
    mobileno,
    checkindate,
    checkoutdate,
    customername,
    roomNo,
    holdby,
    holdremain,
    holdsince,
    remark,
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
                  Holder Mobile No
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('mobile')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Room holder Name
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('name')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Room No
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('roomNo')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Hold Since
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('since')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Hold Remain
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('remain')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Hold Approved By
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('approvedBy')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Remarks
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('remarks')}
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
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'mobile')}
                    placeholder="Search mobile"
                  />
                </TableCell>
                <TableCell>
                  <input
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'name')}
                    placeholder="Search name"
                  />
                </TableCell>
                <TableCell>
                  <input
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'roomNo')}
                    placeholder="Search roomNo"
                  />
                </TableCell>
                <TableCell>
                  <input
                    className="cuolms_search"
                    type="date"
                    onChange={(e) => onSearchByOther(e, 'since')}
                    placeholder="Search since"
                  />
                </TableCell>
                <TableCell>
                  <input
                    className="cuolms_search"
                    type="date"
                    onChange={(e) => onSearchByOther(e, 'remain')}
                    placeholder="Search remain"
                  />
                </TableCell>
                <TableCell>
                  <input
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'approvedBy')}
                    placeholder="Search approvedBy"
                  />
                </TableCell>
                <TableCell>
                  <input
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'remarks')}
                    placeholder="Search remarks"
                  />
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => getall_donation()}
                    className="chaneRoom"
                  >
                    Reset
                  </button>
                </TableCell>
              </TableRow>
              {isData ? (
                <>
                  {(rowsPerPage > 0
                    ? isData &&
                      isData
                        ?.reverse()
                        ?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage,
                        )
                    : isData && isData?.reverse()
                  ).map((row, index) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row?.mobile}</TableCell>
                      <TableCell>{row?.name}</TableCell>
                      <TableCell>{row?.roomNo}</TableCell>
                      <TableCell>
                        {Moment(row?.since).format('DD-MM-YYYY')}
                      </TableCell>
                      <TableCell>
                        {Moment(row?.remain).format('DD-MM-YYYY')}
                      </TableCell>

                      <TableCell>{row?.approvedBy}</TableCell>
                      <TableCell> {row?.remarks}</TableCell>

                      <TableCell>
                        <img
                          onClick={() =>
                            navigation('/admin-panel/HoldCertificate', {
                              state: {
                                data: row,
                              },
                            })
                          }
                          src={Print}
                          alt="print"
                          style={{ width: '25px', marginRight: '0.3rem' }}
                        />

                        <Tooltip title="Room Release">
                          <img
                            onClick={() => handleClickOpen3(row?.id)}
                            src={forcheckout}
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

export default Holdhistory;
