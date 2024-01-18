import React, { useEffect, useState } from 'react';
import { serverInstance } from '../../../../../API/ServerInstance';
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
import ChangeStatus from './ChangeStatus';
import DownloadIcon from '@mui/icons-material/Download';
import exportFromJSON from 'export-from-json';
import axios from 'axios';
import { backendApiUrl } from '../../../../../config/config';
import Moment from 'moment-js';
import CircularProgress from '@mui/material/CircularProgress';
import { ExportPdfUserCheque } from '../../../compoments/ExportPdf';
import Print from '../../../../../assets/Print.png';
import ExportPdf from '../../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../../assets/ExportExcel.png';
import Edit from '../../../../../assets/Edit.png';
import eye from '../../../../../assets/eye.png';
import { ExportPdfmanulElectronic } from '../../../compoments/ExportPdf';
import OnlineTotal from '../../../compoments/OnlineTotal';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import PrintOnline from '../../../compoments/PrintOnline';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import OnlineTap from '../OnlineTap';
import LoadingSpinner1 from '../../../../../components/Loading/LoadingSpinner1';
import PrintContent from '../../../compoments/PrintElecModalContent';
import ModalElecReceipt from '../../../Reciept/ModalOnlineReceipt';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,

  color: '#FDC99C',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',

  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  zIndex: 2,
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  left: '11px',
  bottom: '0px',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    height: '17px',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
const style50 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '80%',
  height: '95%',
  overflow: 'auto',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  p: 2,

  boxShadow: 24,
  borderRadius: '0px',
};
const style5 = {
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

import './Cheque.css';
const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
  borderRadius: '5px',
};
const Cheque = ({ setopendashboard }) => {
  const [loader, setloader] = useState(false);
  const [isData, setisData] = React.useState('');
  const [isDataDummy, setisDataDummy] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [refetch, setrefetch] = useState(false);
  const navigation = useNavigate();
  const [deleteId, setdeleteId] = useState('');
  const [open, setOpen] = React.useState(false);
  const [datefrom, setdatefrom] = useState('');
  const [dateto, setdateto] = useState('');
  const [searchvalue, setsearchvalue] = useState('');
  const [userrole, setuserrole] = useState('');
  const [voucherfrom, setvoucherfrom] = useState('');
  const [voucherto, setvoucherto] = useState('');
  const [open5, setOpen5] = React.useState(false);
  const handleOpen5 = () => setOpen5(true);
  const handleClose5 = () => setOpen5(false);
  const [donationTypes, setDonationTypes] = useState([]);
  const [date, setDate] = useState('');
  const [receiptNo, setReceiptNo] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [remark, setRemark] = useState('');
  const [type, setType] = useState('');
  const [payment, setpayment] = useState('');
  const [fdate, setfdate] = useState('');
  const [fcheque, setfcheque] = useState('');
  const [fbank, setfbank] = useState('');
  const [datasend, setdatasend] = useState('');
  const [open50, setOpen50] = React.useState(false);
  const handleOpen50 = (data) => {
    setOpen50(true);
    setdatasend(data);
  };
  const handleClose50 = () => setOpen50(false);

  const [open60, setOpen60] = React.useState(false);
  const handleOpen60 = (data) => {
    setOpen60(true);
    setdatasend(data);
  };
  const handleClose60 = () => setOpen60(false);
  const handleOpen = (id) => {
    setOpen(true);
    setdeleteId(id);
  };

  const handleClose = () => setOpen(false);

  const getall_donation = () => {
    setloader(true);
    setdatefrom('');
    setdateto('');
    setvoucherfrom('');
    setvoucherto('');
    setsearchvalue('');
    serverInstance('admin/donation-list', 'get').then((res) => {
      if (res.status) {
        setloader(false);
        let filterData = res.data.filter(
          (item) => item.MODE_OF_DONATION === 'CHEQUE',
        );
        setisData(filterData);
        setisDataDummy(filterData);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
      console.log(res);
    });
  };

  const downloadrecept = (row) => {
    navigation('/admin-panel/room/online/recipt', {
      state: {
        userdata: row,
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

  const ExportToExcel = () => {
    const fileName = 'OnlineChequeReport';
    const exportType = 'xls';
    var data = [];
    isData.map((item, index) => {
      data.push({
        Date: Moment(item?.DATE_OF_DAAN).format('DD/MM/YYYY'),
        'Receipt No': item?.RECEIPT_NO,
        Name: item?.NAME,
        'Phone No': item?.MobileNo,

        Address: item?.ADDRESS,
        'Head/Item': item?.TYPE,
        Amount: item?.AMOUNT,
        Remark: item?.REMARK,
        MODE_OF_DONATION: item?.MODE_OF_DONATION,
        CHEQUE_NO: item?.CHEQUE_NO,
        DATE_OF_CHEQUE: item?.DATE_OF_CHEQUE,

        'Created Date': Moment(item?.created_at).format('DD-MM-YYYY hh:mm'),
      });
    });
    exportFromJSON({ data, fileName, exportType });
  };

  const filterdata = async (e) => {
    setloader(true);
    e.preventDefault();
    try {
      axios.defaults.headers.get[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;
      if (searchvalue) {
        const res = await axios.get(
          `${backendApiUrl}admin/search-online-cheque?search=${searchvalue}&type=Cheque`,
        );

        if (res.data.status) {
          setloader(false);
          setisData(res.data.data);
          setisDataDummy(res.data.data);
        }
      } else {
        const res = await axios.get(
          `${backendApiUrl}admin/filter-online-cheque?fromDate=${datefrom}&toDate=${dateto}&fromRec=${voucherfrom}&toRec=${voucherto}&type=${2}`,
        );

        if (res.data.status) {
          setloader(false);
          setisData(res.data.data);
          setisDataDummy(res.data.data);
        }
      }
    } catch (error) {
      setloader(false);
    }
  };
  const get_donation_tyeps = () => {
    try {
      Promise.all([serverInstance('admin/donation-type?type=1', 'get')]).then(
        ([res, item]) => {
          if (res.status) {
            setDonationTypes(res.data);
            console.log(res.data);
          } else {
            Swal.fire('Error', 'somthing went  wrong', 'error');
          }
        },
      );
    } catch (error) {
      Swal.fire('Error!', error, 'error');
    }
  };
  useEffect(() => {
    get_donation_tyeps();
    getall_donation();
    get_donation_tyeps;
    setopendashboard(true);
  }, [refetch]);
  const onSearchByOther = (e, type) => {
    if (type === 'Date') {
      setDate(e.target.value);
    }
    if (type === 'Receipt') {
      setReceiptNo(e.target.value.toLowerCase());
    }
    if (type === 'Phone') {
      setPhone(e.target.value.toLowerCase());
    }
    if (type === 'Name') {
      setName(e.target.value.toLowerCase());
    }
    if (type === 'Address') {
      setAddress(e.target.value.toLowerCase());
    }
    if (type === 'Type') {
      setType(e.target.value.toLowerCase());
    }
    if (type === 'Amount') {
      setAmount(e.target.value.toLowerCase());
    }
    if (type === 'Remark') {
      setRemark(e.target.value.toLowerCase());
    }
    if (type === 'bank') {
      setfbank(e.target.value.toLowerCase());
    }
    if (type === 'subdate') {
      setfdate(e.target.value);
    }
    if (type === 'cheque') {
      setfcheque(e.target.value.toLowerCase());
    }
  };
  useEffect(() => {
    var filtered = isDataDummy?.filter(
      (dt) =>
        dt?.RECEIPT_NO?.toLowerCase().indexOf(receiptNo) > -1 &&
        dt?.MobileNo?.toLowerCase().indexOf(phone) > -1 &&
        Moment(dt?.DATE_OF_DAAN).format('YYYY-MM-DD').indexOf(date) > -1 &&
        dt?.NAME?.toLowerCase().indexOf(name) > -1 &&
        dt?.ADDRESS?.toLowerCase().indexOf(address) > -1 &&
        dt?.TYPE?.toLowerCase().indexOf(type) > -1 &&
        dt?.REMARK?.toLowerCase()?.indexOf(fbank) > -1 &&
        dt?.REMARK?.toLowerCase()?.indexOf(fcheque) > -1 &&
        Moment(dt?.DATE_OF_DAAN).format('YYYY-MM-DD').indexOf(fdate) > -1,
    );

    if (amount) {
      filtered = isDataDummy?.map((item) => {
        if (item.AMOUNT == amount) {
          return item;
        } else {
          return;
        }
      });
      filtered = filtered?.filter((x) => x !== undefined);
    }

    setisData(filtered);
  }, [
    phone,
    receiptNo,
    date,
    name,
    address,
    type,
    amount,
    remark,
    fbank,
    fcheque,
    fdate,
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
        open={open50}
        onClose={handleClose50}
        closeAfterTransition
      >
        <Fade in={open50}>
          <Box sx={style50}>
            <PrintContent
              setopendashboard={setopendashboard}
              handleClose50={handleClose50}
              datasend={datasend}
              // setshowreciept={setshowreciept}
            />
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open60}
        onClose={handleClose60}
        closeAfterTransition
      >
        <Fade in={open60}>
          <Box sx={style50}>
            <ModalElecReceipt
              setopendashboard={setopendashboard}
              handleClose60={handleClose60}
              datasend={datasend}
              // setshowreciept={setshowreciept}
            />
          </Box>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open5}
        onClose={handleClose5}
        closeAfterTransition
      >
        <Fade in={open5}>
          <Box sx={style5}>
            <PrintOnline isData={isData} handleClose={handleClose5} />
          </Box>
        </Fade>
      </Modal>
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
              <div className="add-div-close-div1">
                <h2>Update cheque status</h2>
                <CloseIcon onClick={() => handleClose()} />
              </div>
              <ChangeStatus id={deleteId} handleClose={handleClose} />
            </div>
          </Box>
        </Fade>
      </Modal>
      <OnlineTap setopendashboard={setopendashboard} />
      <div style={{ marginLeft: '5rem', marginRight: '1rem' }}>
        <div className="search-header">
          <div className="search-inner-div-reports">
            <form className="search-inner-div-reports" onSubmit={filterdata}>
              <div className="Center_main_dic_filetr">
                <label htmlFor="donation-date">From Date</label>
                <input
                  id="donation-date"
                  style={{ width: '250px' }}
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
                <label>To Date</label>
                <input
                  style={{ width: '250px' }}
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
                <label>From Voucher</label>
                <input
                  style={{ width: '100%' }}
                  type="text"
                  placeholder="From"
                  value={voucherfrom}
                  name="voucherfrom"
                  onChange={(e) => {
                    setvoucherfrom(e.target.value);
                  }}
                />
              </div>
              <div className="Center_main_dic_filetr">
                <label>To Voucher</label>
                <input
                  style={{ width: '100%' }}
                  type="text"
                  placeholder="From"
                  value={voucherto}
                  name="voucherto"
                  onChange={(e) => {
                    setvoucherto(e.target.value);
                  }}
                />
              </div>
              <div className="Center_main_dic_filetr">
                <label>&nbsp;</label>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchvalue}
                    name="searchvalue"
                    onChange={(e) => setsearchvalue(e.target.value)}
                  />
                </Search>
              </div>

              <div className="Center_main_dic_filetr">
                <label>&nbsp;</label>
                <button>Search</button>
              </div>
            </form>

            <div className="Center_main_dic_filetr">
              <label>&nbsp;</label>
              <button onClick={() => getall_donation()}>Reset</button>
            </div>
          </div>
          {/* <div></div> */}
        </div>
        <div
          className="search-header-prin"
          style={{
            paddingBottom: '1rem',
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
                  style={{ width: '30px' }}
                />
              </IconButton>
            </Tooltip>
            &nbsp;&nbsp;
            <Tooltip title="Export Pdf File">
              <IconButton>
                <img
                  onClick={() =>
                    ExportPdfmanulElectronic(isData, 'ManualCashReport')
                  }
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
                  onClick={() => handleOpen5()}
                  src={Print}
                  alt=" Print"
                />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        <div className="table-div-maain">
          {/* <TableContainer component={Paper}> */}
          <Table
            sx={{ minWidth: 650, width: '100%' }}
            aria-label="simple table"
          >
            <TableHead style={{ background: '#F1F0F0' }}>
              <TableRow>
                <TableCell>
                  Date{' '}
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('DATE_OF_DAAN')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  ReceiptNo{' '}
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('RECEIPT_NO')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Name{' '}
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('NAME')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Address{' '}
                  <i
                    style={{ marginLeft: '0rem' }}
                    onClick={() => sortData('ADDRESS')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Mobile{' '}
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('MobileNo')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  head{' '}
                  <i
                    style={{ marginLeft: '0rem' }}
                    onClick={() => sortData('MODE_OF_DONATION')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Amount{' '}
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('AMOUNT')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  ChequeNo{' '}
                  <i
                    style={{ marginLeft: '0rem' }}
                    onClick={() => sortData('CHEQUE_NO')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  DateOfsub{' '}
                  <i
                    style={{ marginLeft: '0rem' }}
                    onClick={() => sortData('DATE_OF_CHEQUE')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Bank{' '}
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('NAME_OF_BANK')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Remark{' '}
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('REMARK')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>Action </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <input
                    style={{ width: '100%' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => {
                      onSearchByOther(e, 'Receipt');
                    }}
                    placeholder="Search Receipt No"
                  />
                </TableCell>
                <TableCell>
                  <input
                    id="donation-date"
                    style={{ width: '100%' }}
                    className="cuolms_search"
                    type="date"
                    onChange={(e) => onSearchByOther(e, 'Date')}
                    placeholder="Search Date"
                  />
                </TableCell>
                <TableCell>
                  <input
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'Name')}
                    placeholder="Search name"
                  />
                </TableCell>
                <TableCell>
                  <input
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'Address')}
                    placeholder="Search Address "
                  />
                </TableCell>
                <TableCell>
                  <input
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'Phone')}
                    placeholder="Search Phone "
                  />
                </TableCell>
                <TableCell>
                  <select
                    className="cuolms_search"
                    onChange={(e) => onSearchByOther(e, 'Type')}
                  >
                    <option value="">All Head</option>
                    {donationTypes.map((item, idx) => {
                      return (
                        <option value={item.type_hi}>{item.type_hi}</option>
                      );
                    })}
                  </select>
                </TableCell>
                <TableCell>
                  <input
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'Amount')}
                    placeholder="amount"
                  />
                </TableCell>
                <TableCell>
                  <input
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'cheque')}
                    placeholder="Search cheque"
                  />
                </TableCell>
                <TableCell>
                  <input
                    id="donation-date"
                    className="cuolms_search"
                    type="date"
                    onChange={(e) => onSearchByOther(e, 'subdate')}
                    placeholder="Search date"
                  />
                </TableCell>
                <TableCell>
                  <input
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'bank')}
                    placeholder="Bank name"
                  />
                </TableCell>
                <TableCell>
                  <input
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'Remark')}
                    placeholder="Remark"
                  />
                </TableCell>
                <TableCell>&nbsp;</TableCell>
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
                      key={index}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell>
                        {moment(row?.DATE_OF_DAAN).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>{row?.RECEIPT_NO}</TableCell>
                      <TableCell>{row.NAME}</TableCell>
                      <TableCell>{row?.ADDRESS}</TableCell>
                      <TableCell>{row?.MobileNo}</TableCell>
                      <TableCell> {row.MODE_OF_DONATION}</TableCell>
                      <TableCell> {row.AMOUNT}.00</TableCell>
                      <TableCell>
                        {row.CHEQUE_NO ? row.CHEQUE_NO : '-'}
                      </TableCell>
                      <TableCell>
                        {row.DATE_OF_CHEQUE ? row.DATE_OF_CHEQUE : '-'}
                      </TableCell>
                      <TableCell>
                        {row.NAME_OF_BANK ? row.NAME_OF_BANK : '-'}
                      </TableCell>
                      <TableCell>{row?.REMARK}</TableCell>
                      <TableCell>
                        <img
                          onClick={() =>
                            navigation(`/admin-panel/reports/chequeinfo`, {
                              state: {
                                data: row,
                              },
                            })
                          }
                          src={eye}
                          alt="print"
                          style={{ width: '20px', marginRight: '2px' }}
                        />
                        <img
                          onClick={() => handleOpen(row.id)}
                          src={Edit}
                          alt="print"
                          style={{ width: '20px', marginRight: '2px' }}
                        />
                        <Tooltip title="Print Certificate">
                          <img
                            onClick={() => handleOpen50(row)}
                            src={Print}
                            alt="print"
                            style={{ width: '20px', marginRight: '2px' }}
                          />
                        </Tooltip>

                        <DownloadIcon
                          onClick={() => {
                            handleOpen60(row);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell> &nbsp;</TableCell>
                    <TableCell> &nbsp;</TableCell>
                    <TableCell> &nbsp;</TableCell>
                    <TableCell> &nbsp;</TableCell>
                    <TableCell> &nbsp;</TableCell>
                    <TableCell style={{ fontWeight: 700 }}>
                      Total Amount
                    </TableCell>
                    <TableCell style={{ fontWeight: 700 }}>
                      <OnlineTotal data={isData} />
                    </TableCell>
                    <TableCell> &nbsp;</TableCell>
                    <TableCell> &nbsp;</TableCell>
                    <TableCell> &nbsp;</TableCell>
                    <TableCell> &nbsp;</TableCell>
                    <TableCell> &nbsp;</TableCell>
                  </TableRow>
                </>
              ) : (
                <>
                  <TableCell colSpan={9} align="center">
                    <CircularProgress />
                  </TableCell>
                </>
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
      {loader && <LoadingSpinner1 />}
    </>
  );
};

export default Cheque;
