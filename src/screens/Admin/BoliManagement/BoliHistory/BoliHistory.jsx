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
import Box from '@mui/material/Box';
import Moment from 'moment-js';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Print from '../../../../assets/Print.png';
import payimg from '../../../../assets/payimg.png';
import Edit from '../../../../assets/Edit.png';
import ExportPdf from '../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../assets/ExportExcel.png';
import exportFromJSON from 'export-from-json';
import CircularProgress from '@mui/material/CircularProgress';
import ElectronicTotal from '../../compoments/ElectronicTotal';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import PrintElectronic from '../../compoments/PrintElectronic';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { backendApiUrl } from '../../../../config/config';
import LoadingSpinner1 from '../../../../components/Loading/LoadingSpinner1';
import Addboli from '../Boli/Addboli';
import Saveboli from '../Boli/Saveboli';
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
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
  borderRadius: '15px',
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

const donationColorTheme = {
  cash: '#48a828',
  electronic: '#e96d00',
  cheque: '#1C82AD',
  item: '#d6cb00',
};

const BoliHistory = ({ setopendashboard }) => {
  let filterData;
  const [boliheads, setboliheads] = useState('');
  const [boliunits, setboliunits] = useState('');
  const [resdata, setresdata] = useState('');
  const [loader, setloader] = useState(false);
  const [empid, setempid] = useState('');
  const [emproleid, setemproleid] = useState('');
  const [roleid, setroleid] = useState('');
  const [emplist, setemplist] = useState('');
  const [isData, setisData] = React.useState([]);
  const [isDataDummy, setisDataDummy] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [open, setOpen] = React.useState(true);
  const [open3, setOpen3] = React.useState(false);
  const [donationTypes, setDonationTypes] = useState([]);
  const [donationitem, setdonationitem] = useState([]);
  const [open4, setOpen4] = useState(false);
  const [datefrom, setdatefrom] = useState('');
  const [dateto, setdateto] = useState('');
  const [voucherfrom, setvoucherfrom] = useState('');
  const [voucherto, setvoucherto] = useState('');
  const [open5, setOpen5] = React.useState(false);
  const [searchvalue, setsearchvalue] = useState('');
  const [voucherno, setVoucherno] = useState('');
  const [date, setDate] = useState('');
  const [receiptNo, setReceiptNo] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [remark, setRemark] = useState('');
  const [type, setType] = useState('');
  const [userType, setUserType] = useState('');
  const handleOpen5 = () => setOpen5(true);
  const handleClose5 = () => setOpen5(false);

  const handleOpen4 = () => {
    setOpen4(true);
  };

  const handleOpen3 = () => setOpen3(true);

  const handleOpen = async () => {
    const role = Number(sessionStorage.getItem('userrole'));
    if (emproleid === 0) {
    } else {
      if (role === 3) {
        serverInstance('user/check-voucher', 'get').then((res) => {
          if (res.status === false) {
            handleOpen3();
          }
          if (res.status === true) {
            if (emproleid && roleid) {
              setOpen(true);
            }
          }
        });
      }
    }

    if (role === 1) {
      setOpen(true);
    }

    if (emproleid === 0) {
      setOpen(true);
    }
  };

  console.log('Boli get data is ', isData);
  const handleClose = React.useCallback(() => setOpen(false), []);

  const navigation = useNavigate();

  const ExportToExcel = () => {
    const fileName = 'ElectronicReport';
    const exportType = 'xls';
    var data = [];

    isData.map((item, index) => {
      data.push({
        Date: Moment(item.donation_date).format('DD-MM-YYYY'),
        'Receipt No': item?.ReceiptNo,
        'Voucher No': item?.voucherNo,
        'Phone No': item?.phoneNo,
        name: item?.name,
        Address: item?.address,
        'Head/Item': item?.elecItemDetails
          ? item?.elecItemDetails.map((row) => {
              return row.type;
            })
          : item?.type,
        Amount: item?.elecItemDetails
          ? item?.elecItemDetails.reduce(
              (n, { amount }) => parseFloat(n) + parseFloat(amount),
              0,
            )
          : item?.Amount,
        remark: item?.elecItemDetails
          ? item?.elecItemDetails.map((row) => {
              return row.remark;
            })
          : item?.remark,
        Staff: item?.createdBy,
        'Created Date': Moment(item?.created_at).format('DD-MM-YYYY'),
      });
    });

    exportFromJSON({ data, fileName, exportType });
  };

  const getall_donation = () => {
    setloader(true);
    setdatefrom('');
    setdateto('');
    setvoucherfrom('');
    setvoucherto('');
    setsearchvalue('');
    serverInstance('boli/get-boli', 'get').then((res) => {
      console.log('res get boli ', res);
      if (res.status) {
        setloader(false);
        setisData(res?.data);
        setisDataDummy(res?.data);
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

  const filterdata = async (e) => {
    e.preventDefault();
    setloader(true);

    try {
      if (searchvalue) {
        console.log('clieckwewd');
        serverInstance(`boli/search-boli?search=${searchvalue}`, 'get').then(
          (res) => {
            console.log('search data is by date ', res);
            if (res.status) {
              setloader(false);
              setisData(res?.data);
              setisDataDummy(res?.data);
            }
          },
        );
      } else {
        serverInstance('boli/search-boliByDate', 'POST', {
          fromDate: datefrom,
          toDate: dateto,
        }).then((res) => {
          console.log('search data is by date ', res);
          if (res.status) {
            setloader(false);
            setisData(res?.data);
            setisDataDummy(res?.data);
          }
        });
      }
    } catch (error) {
      setloader(false);
    }
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
  const getVoucher = () => {
    serverInstance('admin/voucher-get', 'get').then((res) => {
      if (res) {
        console.log('voucher', res.voucher);
        setReceiptNo(res.voucher);
      }
    });
  };

  const get_donation_tyeps = () => {
    try {
      Promise.all([serverInstance('admin/donation-type?type=1', 'get')]).then(
        ([res, item]) => {
          if (res.status) {
            setDonationTypes(res.data);
          } else {
            Swal.fire('Error', 'somthing went  wrong', 'error');
          }
        },
      );
    } catch (error) {
      Swal.fire('Error!', error, 'error');
    }
  };

  const get_donation_types = () => {
    try {
      Promise.all([serverInstance('admin/donation-type?type=2', 'get')]).then(
        ([res, item]) => {
          if (res.status) {
            setdonationitem(res.data);
          } else {
            Swal.fire('Error', 'somthing went  wrong', 'error');
          }
        },
      );
    } catch (error) {
      Swal.fire('Error!', error, 'error');
    }
  };

  const [open9, setOpen9] = useState(false);
  const handleOpen9 = () => setOpen9(true);
  const handleClose9 = () => setOpen9(false);

  const [open10, setOpen10] = useState(false);
  const handleOpen10 = () => setOpen10(true);
  const handleClose10 = () => setOpen10(false);

  const [open11, setOpen11] = useState(false);
  const handleOpen11 = () => setOpen11(true);
  const handleClose11 = () => setOpen11(false);

  const getbolihead = () => {
    try {
      serverInstance(`admin/get-boliHead`, 'get').then((res) => {
        if (res.status === true) {
          setboliheads(res.data);
        } else {
          Swal('Error', 'somthing went  wrong', 'error');
        }
      });
    } catch (error) {
      Swal.fire('Error!', error, 'error');
    }
  };

  const getboliunit = () => {
    try {
      serverInstance(`admin/get-boliUnit`, 'get').then((res) => {
        if (res.status === true) {
          setboliunits(res.data);
        } else {
          Swal('Error', 'somthing went  wrong', 'error');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getbolihead();
    getboliunit();
    getVoucher();
    getallemp_list();
    getall_donation();
    get_donation_types();
    setopendashboard(true);
    get_donation_tyeps();
    const role = Number(sessionStorage.getItem('userrole'));
    setemproleid(Number(sessionStorage.getItem('empRoleid')));
    setroleid(Number(sessionStorage.getItem('userrole')));
    setempid(Number(sessionStorage.getItem('empid')));
    if (emproleid === 0) {
    } else {
      if (role === 3) {
        try {
          serverInstance('user/check-voucher', 'get').then((res) => {
            if (res.status === false) {
              handleOpen3();
              setOpen(false);
            }
          });
        } catch (error) {}
      }
    }
  }, [open, empid]);

  const onSearchByOther = (e, type) => {
    if (type === 'Date') {
      setDate(e.target.value);
    }
    if (type === 'Voucher') {
      setVoucherno(e.target.value);
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
      setType(e.target.value);
    }
    if (type === 'Amount') {
      setAmount(e.target.value);
    }
    if (type === 'Remark') {
      setRemark(e.target.value);
    }
    if (type === 'UserType') {
      setUserType(e.target.value.toLowerCase());
    }
  };
  useEffect(() => {
    // var filtered = isDataDummy?.filter(
    //   (dt) =>
    //     dt?.ReceiptNo.toLowerCase().indexOf(receiptNo) > -1 &&
    //     dt?.phoneNo.toLowerCase().indexOf(phone) > -1 &&
    //     Moment(dt?.donation_date).format('YYYY-MM-DD').indexOf(date) > -1 &&
    //     dt?.name.toLowerCase().indexOf(name) > -1 &&
    //     dt?.address.toLowerCase().indexOf(address) > -1 &&
    //     dt?.createdBy?.toLowerCase()?.indexOf(userType) > -1 &&
    //     dt?.voucherNo?.toLowerCase()?.indexOf(voucherno) > -1,
    // );
    // if (type) {
    //   filtered = filtered?.map((item) => {
    //     if (item?.elecItemDetails?.find((typ) => typ.type == type)) {
    //       return item;
    //     } else {
    //       return;
    //     }
    //   });
    //   filtered = filtered?.filter((x) => x !== undefined);
    // }
    // if (amount) {
    //   filtered = filtered?.map((item) => {
    //     if (
    //       item.elecItemDetails.reduce(
    //         (n, { amount }) => parseFloat(n) + parseFloat(amount),
    //         0,
    //       ) == amount
    //     ) {
    //       return item;
    //     } else {
    //       return;
    //     }
    //   });
    //   filtered = filtered?.filter((x) => x !== undefined);
    // }
    // if (remark) {
    //   filtered = filtered?.map((item) => {
    //     if (item?.elecItemDetails?.find((typ) => typ.remark == remark)) {
    //       return item;
    //     } else {
    //       return;
    //     }
    //   });
    //   filtered = filtered?.filter((x) => x !== undefined);
    // }
    // setisData(filtered);
  }, [
    phone,
    receiptNo,
    date,
    name,
    address,
    type,
    amount,
    remark,
    userType,
    voucherno,
  ]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const sortDataAmount = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setisData(
      [...isData].sort((a, b) => {
        if (
          a[key].reduce(
            (n, { amount }) => parseFloat(n) + parseFloat(amount),
            0,
          ) <
          b[key].reduce(
            (n, { amount }) => parseFloat(n) + parseFloat(amount),
            0,
          )
        ) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (
          a[key].reduce(
            (n, { amount }) => parseFloat(n) + parseFloat(amount),
            0,
          ) >
          b[key].reduce(
            (n, { amount }) => parseFloat(n) + parseFloat(amount),
            0,
          )
        ) {
          return direction === 'ascending' ? 1 : -1;
        }
        return 0;
      }),
    );
    setSortConfig({ key: key, direction: direction });
  };
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

  const sortDataHead = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setisData(
      [...isData].sort((a, b) => {
        if (a[key][0]?.type < b[key][0]?.type) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (a[key][0]?.type > b[key][0]?.type) {
          return direction === 'ascending' ? 1 : -1;
        }
        return 0;
      }),
    );
    setSortConfig({ key: key, direction: direction });
  };
  const sortRemark = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setisData(
      [...isData].sort((a, b) => {
        if (a[key][0]?.remark < b[key][0]?.remark) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (a[key][0]?.remark > b[key][0]?.remark) {
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
        open={open5}
        onClose={handleClose5}
        closeAfterTransition
      >
        <Fade in={open5}>
          <Box sx={style5}>
            <PrintElectronic isData={isData} handleClose={handleClose5} />
          </Box>
        </Fade>
      </Modal>

      <div className="dashboarddiv">
        <div>
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
                    style={{ width: '15rem' }}
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
                    style={{ width: '15rem' }}
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
              <div className="Center_main_dic_filetr">
                <label>&nbsp;</label>
                <button onClick={() => handleOpen()}>+Add</button>
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
                    onClick={() => ExportPdfmanul(isData, 'Report')}
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
              &nbsp;&nbsp;
            </div>
          </div>

          <div className="table-div-maain">
            <Table
              sx={{ minWidth: 650, width: '97%' }}
              aria-label="simple table"
            >
              <TableHead style={{ background: '#FFEEE0' }}>
                <TableRow>
                  <TableCell>
                    Date
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortData('donation_date')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell>
                    MobileNo
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortData('ReceiptNo')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell>
                    Name
                    <i
                      style={{ marginLeft: '0px' }}
                      onClick={() => sortData('voucherNo')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell>
                    Address
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortData('phoneNo')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell>
                    Boliheads
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortData('name')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell>
                    BoliAmount
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortData('address')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>

                  <TableCell>
                    PendingAmount
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortDataAmount('elecItemDetails')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>

                  <TableCell>
                    Remark
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortRemark('elecItemDetails')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableCell>
                  <input
                    id="donation-date"
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
                    onChange={(e) => onSearchByOther(e, 'Receipt')}
                    placeholder="Search Mobile"
                  />
                </TableCell>
                <TableCell>
                  <input
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'Voucher')}
                    placeholder="Search Name"
                  />
                </TableCell>
                <TableCell>
                  <input
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'Phone')}
                    placeholder="Search Address"
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    className="cuolms_search"
                    onChange={(e) => onSearchByOther(e, 'Name')}
                    placeholder="Search Head"
                  />
                </TableCell>

                <TableCell>
                  <input
                    style={{ width: '100%' }}
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'Address')}
                    placeholder="Boli Amount"
                  />
                </TableCell>
                <TableCell>
                  <input
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'Amount')}
                    placeholder="Pending Amount"
                  />
                </TableCell>

                <TableCell>
                  <input
                    style={{ width: '100%' }}
                    className="cuolms_search"
                    type="text"
                    placeholder="Remark"
                    onChange={(e) => onSearchByOther(e, 'Remark')}
                  />
                </TableCell>
                <TableCell>&nbsp;</TableCell>

                {isData.length != 0 ? (
                  <>
                    {(rowsPerPage > 0
                      ? isData?.slice(
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
                        <TableCell>
                          {Moment(row?.donation_date).format('DD/MM/YYYY')}
                        </TableCell>
                        <TableCell>{row?.MobileNo}</TableCell>

                        <TableCell>{row?.Name}</TableCell>

                        <TableCell> {row?.Address}</TableCell>
                        <TableCell>
                          {row?.boliItem?.map((row) => {
                            return (
                              <li style={{ listStyle: 'none' }}>{row?.Type}</li>
                            );
                          })}
                        </TableCell>
                        <TableCell>
                          {row?.boliItem.reduce(
                            (n, { BoliAmount }) =>
                              parseFloat(n) + parseFloat(BoliAmount),
                            0,
                          )}
                        </TableCell>
                        <TableCell>
                          {row?.boliItem.reduce(
                            (n, { BoliAmount }) =>
                              parseFloat(n) + parseFloat(BoliAmount),
                            0,
                          ) -
                            row?.boliItem.reduce(
                              (n, { PayAmount }) =>
                                parseFloat(n) + parseFloat(PayAmount),
                              0,
                            )}
                        </TableCell>

                        <TableCell>
                          {row?.boliItem?.map((row) => {
                            return (
                              <li style={{ listStyle: 'none' }}>
                                {row.Remark}
                              </li>
                            );
                          })}
                        </TableCell>
                        <TableCell>
                          <Tooltip title="Print Certificate">
                            <img
                              style={{ width: '20px', marginRight: '4px' }}
                              onClick={() =>
                                navigation('/admin-panel/boli/certificate', {
                                  state: {
                                    data: row,
                                  },
                                })
                              }
                              src={Print}
                              alt=" Print"
                            />
                          </Tooltip>
                          <Tooltip title="Print Certificate">
                            <img
                              style={{ width: '20px' }}
                              onClick={() =>
                                navigation('/admin-panel/boli/certificate', {
                                  state: {
                                    data: row,
                                  },
                                })
                              }
                              src={Edit}
                              alt=" Print"
                            />
                          </Tooltip>

                          <Tooltip title="Print Certificate">
                            <img
                              style={{ width: '20px' }}
                              onClick={() =>
                                navigation('/admin-panel/boli/certificate', {
                                  state: {
                                    data: row,
                                  },
                                })
                              }
                              src={payimg}
                              alt=" Print"
                            />
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell> &nbsp;</TableCell>
                      <TableCell> &nbsp;</TableCell>
                      <TableCell> &nbsp;</TableCell>
                      <TableCell> &nbsp;</TableCell>
                      <TableCell style={{ fontWeight: 700 }}>Amount</TableCell>
                      <TableCell style={{ fontWeight: 700 }}>
                        <ElectronicTotal data={isData} />
                      </TableCell>
                      <TableCell> &nbsp;</TableCell>
                      <TableCell> &nbsp;</TableCell>
                      <TableCell> &nbsp;</TableCell>
                    </TableRow>
                  </>
                ) : (
                  <>
                    {/* <TableRow>
                      <TableCell colSpan={13} align="center">
                        <CircularProgress />
                      </TableCell>
                    </TableRow> */}
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
      </div>

      {loader && <LoadingSpinner1 />}
    </>
  );
};

export default BoliHistory;
