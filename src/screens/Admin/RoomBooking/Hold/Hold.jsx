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
import moment from 'moment';
import Print from '../../../../assets/Print.png';
import Edit from '../../../../assets/Edit.png';
import ExportPdf from '../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../assets/ExportExcel.png';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Holdfrom from './Holdfrom';
import Typography from '@mui/material/Typography';
import RoomBookingTap from '../RoomBookingTap';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingSpinner1 from '../../../../components/Loading/LoadingSpinner1';
import forcheckout from '../../../../assets/Checkout2.png';
import UpdateHoldForm from './UpdateHoldForm';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';
import PrintHold from './PrintHold';

const style = {
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

const Hold = ({ setopendashboard }) => {
  const navigate = useNavigate();
  const [Dharamshala, setDharamshala] = useState('');
  const [isData, setisData] = React.useState('');
  const [isDataDummy, setisDataDummy] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userrole, setuserrole] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOepn = () => setOpen(true);
  const [loader, setloader] = useState(false);
  const [open1, setOpen1] = React.useState(false);
  const handleClose1 = () => setOpen1(false);
  const handleOepn1 = () => {
    setOpen1(true);
  };

  console.log('data is', isData);
  const [deleteId, setdeleteId] = useState('');
  const [open3, setOpen3] = React.useState(false);

  const handleClickOpen3 = (id) => {
    setOpen3(true);
    setdeleteId(id);
  };
  const handleClose5 = () => setOpen3(false);

  const handleClose4 = () => {
    setOpen3(false);
    setloader(true);
    serverInstance('room/update-holdin', 'PUT', {
      id: deleteId,
    }).then((res) => {
      if (res?.data?.status === true) {
        Swal.fire('Great!', res?.data?.message, 'success');

        setTimeout(() => {
          getall_donation();
        }, 1000);
        setloader(false);
      }
    });
  };

  const [updatedata, setupdatedata] = useState('');
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen2 = (data) => {
    setOpen2(true);
    setupdatedata(data);
  };
  const handleClose2 = () => setOpen2(false);

  const getall_donation = () => {
    setloader(true);
    serverInstance('room/hold', 'get').then((res) => {
      if (res.data) {
        setisData(res?.data);
        setisDataDummy(res?.data);
        setloader(false);
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
        Mobile: item?.mobile,
        Holdername: item?.name,
        RoomNo: item?.roomNo,
        Since: Moment(item?.since).format('DD-MM-YYYY'),
        Remain: Moment(item?.remain).format('DD-MM-YYYY'),
        approvedBy: item?.approvedBy,
        remarks: item?.remarks,
      });
    });
    exportFromJSON({ data, fileName, exportType });
  };
  const ExportPdfmanul = (isData, fileName) => {
    const doc = new jsPDF();

    const tableColumn = [
      'Mobile',
      'Name',
      'RoomNo',
      'Since',
      'Remain',
      'ApprovedBy',
      'Remarks',
    ];

    const tableRows = [];

    isData.forEach((item) => {
      const ticketData = [
        item?.mobile,
        item?.name,
        item?.roomNo,
        Moment(item?.since).format('DD-MM-YYYY'),
        Moment(item?.remain).format('DD-MM-YYYY'),
        item?.approvedBy,
        item?.remarks,
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

  const getalldharamshala = () => {
    serverInstance('room/get-dharmasalas', 'get').then((res) => {
      if (res.data) {
        setDharamshala(res.data);
      }
    });
  };
  useEffect(() => {
    getalldharamshala();
    getall_donation();
    setopendashboard(true);
    setuserrole(Number(sessionStorage.getItem('userrole')));
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

  const [mobileno, setmobileno] = useState('');
  const [customername, setcustomername] = useState('');
  const [checkindate, setcheckindate] = useState('');
  const [checkoutdate, setcheckoutdate] = useState('');
  const [roomNo, setroomNo] = useState('');
  const [holdsince, setholdsince] = useState('');
  const [holdremain, setholdremain] = useState('');
  const [holdby, setholdby] = useState('');
  const [remark, setremark] = useState('');
  const [dharamshalaname, setdharamshalaname] = useState('');
  const [categoryname, setcategoryname] = useState('');
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

    if (type === 'dharamshala') {
      setdharamshalaname(e.target.value.toLowerCase());
    }

    if (type === 'category') {
      setcategoryname(e.target.value);
    }
  };

  useEffect(() => {
    var filtered = isDataDummy?.filter(
      (dt) =>
        Moment(dt?.since).format('YYYY-MM-DD').indexOf(checkindate) > -1 &&
        Moment(dt?.remain).format('YYYY-MM-DD').indexOf(checkoutdate) > -1 &&
        dt?.name?.toLowerCase().indexOf(customername) > -1 &&
        dt?.dharmasala?.name?.toLowerCase().indexOf(dharamshalaname) > -1 &&
        dt?.mobile?.toLowerCase().indexOf(mobileno) > -1,
    );

    if (categoryname) {
      filtered = filtered?.map((item) => {
        if (item?.category_name === categoryname) {
          return item;
        } else {
          return;
        }
      });
      filtered = filtered?.filter((x) => x !== undefined);
    }
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
    dharamshalaname,
    categoryname,
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
      <Dialog
        open={open3}
        onClose={handleClose5}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Release'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you want to release this room
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose5}>Disagree</Button>
          <Button onClick={handleClose4} autoFocus>
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
                    Hold Room
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
              <Holdfrom setOpen={setOpen} />
            </div>
          </Box>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open2}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open2}>
          <Box sx={style}>
            <div>
              <div className="add-div-close-div">
                <div>
                  <h2 style={{ marginBottom: '0.5rem', marginLeft: '1rem' }}>
                    Update Hold Room
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
                  <CloseIcon onClick={() => handleClose2()} />
                </IconButton>
              </div>
              <UpdateHoldForm setOpen={setOpen2} data={updatedata} />
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
              <PrintHold setOpen1={setOpen1} isData={isData} />
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
                  onClick={() => ExportPdfmanul(isData, 'HoldRoomData')}
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
            <Tooltip title="Hold Room">
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

        <div className="table-div-maain">
          <Table
            sx={{ minWidth: 650, width: '100%' }}
            aria-label="simple table"
          >
            <TableHead style={{ background: '#F1F0F0' }}>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>
                  Mobile No
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('mobile')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  holder Name
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('name')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Dharamshala
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('tbl_dharmasala')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Category
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('Category')}
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
                  Hold By
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
                  <select
                    name="cars"
                    id="cars"
                    className="cuolms_search"
                    onChange={(e) => onSearchByOther(e, 'dharamshala')}
                  >
                    <option value="">All Dharamshala</option>
                    {Dharamshala &&
                      Dharamshala.map((item, idx) => {
                        return <option value={item?.name}>{item?.name}</option>;
                      })}
                  </select>
                </TableCell>
                <TableCell>
                  <input
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'category')}
                    placeholder="Category"
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
              {isData && isData ? (
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
                      <TableCell>{row?.mobile}</TableCell>
                      <TableCell>{row?.name}</TableCell>
                      <TableCell>{row?.dharmasala?.name}</TableCell>
                      <TableCell>{row?.facility_name}</TableCell>
                      <TableCell>{row?.roomNo}</TableCell>
                      <TableCell>
                        {Moment(row?.since).format('DD-MM-YYYY')}/
                        {convertTime12to24(
                          moment(row?.since, 'HH:mm:ss').format('hh:mm A'),
                        )}
                      </TableCell>
                      <TableCell>
                        {Moment(row?.remain).format('DD-MM-YYYY')}/
                        {convertTime12to24(
                          moment(row?.remain, 'HH:mm:ss').format('hh:mm:A'),
                        )}
                      </TableCell>

                      <TableCell>{row?.approvedBy}</TableCell>
                      <TableCell> {row?.remarks}</TableCell>
                      <TableCell>
                        {userrole === 1 ? (
                          <>
                            <img
                              onClick={() =>
                                navigate('/admin-panel/HoldCertificate', {
                                  state: {
                                    data: row,
                                  },
                                })
                              }
                              src={Print}
                              alt="print"
                              style={{ width: '25px', marginRight: '0.3rem' }}
                            />
                            <img
                              onClick={() => handleClickOpen2(row)}
                              src={Edit}
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
                          </>
                        ) : (
                          <>
                            <img
                              onClick={() =>
                                navigate('/admin-panel/HoldCertificate', {
                                  state: {
                                    data: row,
                                  },
                                })
                              }
                              src={Print}
                              alt="print"
                              style={{ width: '25px', marginRight: '0.3rem' }}
                            />
                          </>
                        )}
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
                  rowsPerPageOptions={[5, 10, 25]}
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

export default Hold;
