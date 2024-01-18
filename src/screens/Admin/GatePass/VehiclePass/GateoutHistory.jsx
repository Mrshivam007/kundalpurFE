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
import CloseIcon from '@mui/icons-material/Close';
import UnderlinedTab from './common/UnderlinedTab';
import GateIn from './ListItem/GateIn';
import GateOut from './Components/Add/GateOut';
import DownloadIcon from '@mui/icons-material/Download';
import ClearIcon from '@mui/icons-material/Clear';
import Print from '../../../../assets/Print.png';
import Edit from '../../../../assets/Edit.png';
import Checkout from '../../../../assets/Checkout21.png';
import Delete from '../../../../assets/Delete.png';
import ExportPdf from '../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../assets/ExportExcel.png';
import exportFromJSON from 'export-from-json';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import axios from 'axios';
import { backendApiUrl } from '../../../../config/config';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import { ExportPdfmanul } from '../../compoments/ExportPdf';
import LoadingSpinner1 from '../../../../components/Loading/LoadingSpinner1';
import './VehiclePass.css';
import UpdateGateIn from './ListItem/UpdateGateIn';
import TapVehicle from './TapVehicle';

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
  width: '74%',
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
const style2 = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
  borderRadius: '5px',
};

const donationColorTheme = {
  cash: '#48a828',
  electronic: '#e96d00',
  cheque: '#1C82AD',
  item: '#d6cb00',
};

const GateoutHistory = ({ setopendashboard }) => {
  let filterData;
  const [loader, setloader] = useState(false);
  const [empid, setempid] = useState('');
  const [emproleid, setemproleid] = useState('');
  const [roleid, setroleid] = useState('');
  const [emplist, setemplist] = useState('');
  const [isData, setisData] = React.useState([]);
  const [isDataDummy, setisDataDummy] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [open, setOpen] = React.useState(false);
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

  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [remark, setRemark] = useState('');
  const [type, setType] = useState('');
  const [userType, setUserType] = useState('');
  const handleOpen5 = () => setOpen5(true);
  const handleClose5 = () => setOpen5(false);
  const [showGateOutForm, setShowGateOutForm] = useState(false);

  const handleOpen4 = () => {
    setOpen4(true);
  };

  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);

  const handleGateOutClick = () => {
    setShowGateOutForm(true);
  };
  const [updatedata, setupdatedata] = useState('');
  const [open1, setOpen1] = React.useState(false);
  const handleClose1 = () => setOpen1(false);
  const handleOepn1 = (data) => {
    setOpen1(true);
    setupdatedata(data);
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
  const handleOpen = async () => {
    // const role = 1
    const role = Number(sessionStorage.getItem('userrole'));

    // if (emproleid === 0) {
    // } else {
    //   if (role === 3) {
    //     serverInstance('user/check-voucher', 'get').then((res) => {
    //       if (res.status === false) {
    //         handleOpen3();
    //       }
    //       if (res.status === true) {
    //         if (emproleid && roleid) {
    //           setOpen(true);
    //         }
    //       }
    //     });
    //   }
    // }

    if (role === 1) {
      setOpen(true);
    }

    if (emproleid === 0) {
      setOpen(true);
    }
  };

  const handleClose = React.useCallback(() => setOpen(false), []);

  const navigation = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const printreceipt = (row) => {
    if (row.active === '0') {
    } else {
      navigation('/reciept', {
        state: {
          userdata: row,
        },
      });
    }
  };
  const getallemp_list = () => {
    serverInstance('vehicle/vehicle-history', 'get').then((res) => {
      if (res.status) {
        setemplist(res.data);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
    });
  };

  const filterdata = async (e) => {
    e.preventDefault();
    setloader(true);
    try {
      if (searchvalue) {
        serverInstance(
          `vehicle/search-vehicleHistory?search=${searchvalue}`,
          'get',
        ).then((res) => {
          if (res?.status) {
            setemplist(res?.data);
            setisDataDummy(res?.data);
            setloader(false);
          } else {
            Swal('Error', 'somthing went  wrong', 'error');
          }
        });
      } else {
        serverInstance(
          `vehicle/vehicle-history?fromDate=${datefrom}&toDate=${dateto}`,
          'get',
        ).then((res) => {
          if (res?.status) {
            setemplist(res?.data);
            setisDataDummy(res?.data);
            setloader(false);
          } else {
            Swal('Error', 'somthing went  wrong', 'error');
          }
        });
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
  useEffect(() => {
    // getVoucher();
    getallemp_list();
    // getall_donation();
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
  let tabs = [];

  //{commented out}

  {
    console.log(roleid);
    console.log(emproleid);

    roleid === 1 && emproleid === 0 ? (
      <>
        {tabs.push({
          label: 'Vehicle Gate Pass',
          component: (
            <GateIn
              handleClose={handleClose}
              themeColor="#15bfae"
              handleOpen4={handleOpen4}
              setOpen={setOpen4}
              setopendashboard={setopendashboard}
            />
          ),
        })}
      </>
    ) : (
      <>
        {tabs.push({
          label: 'Vehicle Gate Pass',
          component: (
            <GateIn
              handleClose={handleClose}
              themeColor="#15bfae'"
              handleOpen4={handleOpen4}
              setOpen={setOpen4}
              // getall_donation={getall_donation}
              setopendashboard={setopendashboard}
              // receiptNo={receiptNo}
              // donationTypes={donationTypes}
            />
          ),
        })}
      </>
    );
  }

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
  // useEffect(() => {
  //   var filtered = isDataDummy?.filter(
  //     (dt) =>
  //       dt?.ReceiptNo.toLowerCase().indexOf(receiptNo) > -1 &&
  //       dt?.phoneNo.toLowerCase().indexOf(phone) > -1 &&
  //       Moment(dt?.donation_date).format('YYYY-MM-DD').indexOf(date) > -1 &&
  //       dt?.name.toLowerCase().indexOf(name) > -1 &&
  //       dt?.address.toLowerCase().indexOf(address) > -1 &&
  //       dt?.createdBy?.toLowerCase()?.indexOf(userType) > -1 &&
  //       dt?.voucherNo?.toLowerCase()?.indexOf(voucherno) > -1,
  //   );

  //   if (type) {
  //     filtered = filtered?.map((item) => {
  //       if (item?.elecItemDetails?.find((typ) => typ.type == type)) {
  //         return item;
  //       } else {
  //         return;
  //       }
  //     });
  //     filtered = filtered?.filter((x) => x !== undefined);
  //   }

  //   if (amount) {
  //     filtered = filtered?.map((item) => {
  //       if (
  //         item.elecItemDetails.reduce(
  //           (n, { amount }) => parseFloat(n) + parseFloat(amount),
  //           0,
  //         ) == amount
  //       ) {
  //         return item;
  //       } else {
  //         return;
  //       }
  //     });
  //     filtered = filtered?.filter((x) => x !== undefined);
  //   }
  //   if (remark) {
  //     filtered = filtered?.map((item) => {
  //       if (item?.elecItemDetails?.find((typ) => typ.remark == remark)) {
  //         return item;
  //       } else {
  //         return;
  //       }
  //     });
  //     filtered = filtered?.filter((x) => x !== undefined);
  //   }

  //   setisData(filtered);
  // }, [
  //   phone,
  //   receiptNo,
  //   date,
  //   name,
  //   address,
  //   type,
  //   amount,
  //   remark,
  //   userType,
  //   voucherno,
  // ]);

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

  const [deleteId, setdeleteId] = useState('');
  const [open6, setOpen6] = React.useState(false);

  const handleClickOpen3 = (id) => {
    setOpen6(true);
    setdeleteId(id);
  };

  const handleClose6 = () => setOpen6(false);
  const handleClose4 = () => {
    setOpen6(false);
    serverInstance('vehicle/gateout', 'post', { id: deleteId })
      .then((res) => {
        if (res?.status) {
          Swal.fire('Great!', res?.msg, 'success');
          getallemp_list();
        } else {
          Swal('Error', 'somthing went  wrong', 'error');
        }
      })
      .catch((error) => {
        Swal('Error', 'somthing went  wrong', 'error');
      });
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
  return (
    <>
      <Dialog
        open={open6}
        onClose={handleClose6}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Gate Our Vehicle'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do You Want Vehicle Gate Out
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose6}>Disagree</Button>
          <Button onClick={handleClose4} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      {roleid && (
        <>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
          >
            <Fade in={open}>
              <Box
                sx={{
                  ...style,
                  width: {
                    xs: '90%',
                    sm: '70%',
                    md: '70%',
                  },
                }}
              >
                <UnderlinedTab
                  tabs={tabs}
                  handleClose={handleClose}
                  themeColor={donationColorTheme}
                />
              </Box>
            </Fade>
          </Modal>
        </>
      )}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open3}
        onClose={handleClose3}
        closeAfterTransition
      >
        <Fade in={open3}>
          <Box sx={style2}>
            <div>
              <div className="add-div-close-div1">
                <h2 style={{ textAlign: 'center', marginLeft: '24%' }}>
                  Request Vouchers
                </h2>
                <CloseIcon onClick={() => handleClose3()} />
              </div>
              <Request handleClose={handleClose3} />
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
                <div>
                  <h2 style={{ marginBottom: '0.5rem', marginLeft: '1rem' }}>
                    Update Vehicle
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
                  <CloseIcon onClick={() => handleClose1()} />
                </IconButton>
              </div>
              <UpdateGateIn
                updateData={updatedata}
                handleClose={handleClose1}
                themeColor="#15bfae"
                handleOpen4={handleOpen4}
                setOpen={setOpen1}
                setopendashboard={setopendashboard}
              />
            </div>
          </Box>
        </Fade>
      </Modal>
      {/* <TapVehicle setopendashboard={setopendashboard} /> */}
      <div style={{ paddingLeft: '4rem' }}>
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
                <button
                  onClick={() => {
                    getallemp_list();
                    setdatefrom('');
                    setdateto('');
                    setsearchvalue('');
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
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
                <button
                  onClick={() => {
                    getallemp_list();
                    setdateto('');
                    setdatefrom('');
                    setsearchvalue('');
                  }}
                >
                  Reset
                </button>
              </div>
              {/* <div className="Center_main_dic_filetr">
                <label>&nbsp;</label>
                <button onClick={() => handleOpen()}>GateIn</button>
              </div> */}

              {/* <div className="Center_main_dic_filetr">
                <label>&nbsp;</label>
                <GateOut />
              </div> */}
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
              sx={{
                minWidth: 650,
                width: '100%',
                marginRight: '1.5rem',
                marginLeft: '1.2rem',
              }}
              aria-label="simple table"
            >
              <TableHead style={{ background: '#FFEEE0' }}>
                <TableRow>
                  <TableCell style={{ width: '10%' }}>
                    Gate Date
                    <i style={{ marginLeft: '0.5rem' }} class={`fa fa-sort`} />
                  </TableCell>
                  <TableCell style={{ width: '10%' }}>
                    GateOut Date
                    <i style={{ marginLeft: '0.5rem' }} class={`fa fa-sort`} />
                  </TableCell>
                  <TableCell style={{ marginLeft: '1rem' }}>
                    VehicleName
                    <i style={{ marginLeft: '0.5rem' }} class={`fa fa-sort`} />
                  </TableCell>

                  <TableCell>
                    VehicleNo
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortData('phoneNo')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell>
                    Name
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortData('name')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell>
                    MobileNo
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortData('address')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>

                  <TableCell>
                    Address
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortDataAmount('elecItemDetails')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell>
                    VehicleType
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortDataAmount('elecItemDetails')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell style={{ marginLeft: '0.5rem' }}>
                    Remark
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortDataAmount('elecItemDetails')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell style={{ marginLeft: '1rem' }}>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {/* <TableCell>
                  <input
                    id="donation-date"
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'Full Name')}
                    placeholder="Full Name"
                  />
                </TableCell>

                <TableCell>
                  <input
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'Sadsay Type')}
                    placeholder="Sadsay Type"
                  />
                </TableCell>
                <TableCell>
                  <input
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'Phone Number')}
                    placeholder="Phone Number"
                  />
                </TableCell>
                <TableCell>
                  <input
                    className="cuolms_search"
                    type="date"
                    onChange={(e) => onSearchByOther(e, 'Phone')}
                    placeholder="Date Of Birth"
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="date"
                    className="cuolms_search"
                    onChange={(e) => onSearchByOther(e, 'Name')}
                    placeholder="Date Of Anniversary"
                  />
                </TableCell>
                <TableCell>
                  <input
                   
                    className="cuolms_search"
                    type="date"
                    onChange={(e) => onSearchByOther(e, 'Address')}
                    placeholder="Puny Tithi"
                  />
                </TableCell>

                <TableCell>
                  <input
                   
                    className="cuolms_search"
                    type="text"
                    onChange={(e) => onSearchByOther(e, 'Address')}
                    placeholder="Puny Tithi"
                  />
                </TableCell> */}

                {/*    */}

                {emplist.length > 0 ? (
                  <>
                    {(rowsPerPage > 0
                      ? emplist?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage,
                        )
                      : emplist?.reverse()
                    ).map((row, index) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell>
                          {Moment(row?.Date).format('DD/MM/YYYY')}:
                          {/* {convertTime12to24(row?.Time)} */}
                          {row?.Time}
                        </TableCell>
                        <TableCell>
                          {Moment(row?.GateOutDate).format('DD/MM/YYYY')}:
                          {/* {convertTime12to24(row?.Time)} */}
                          {row?.GateOutTime}
                        </TableCell>
                        <TableCell>{row?.VehicleName}</TableCell>
                        <TableCell>{row?.VehicleNo}</TableCell>
                        <TableCell> {row?.Name}</TableCell>
                        <TableCell>{row?.MobileNo}</TableCell>
                        <TableCell> {row?.Address}</TableCell>
                        <TableCell>{row?.VehicleType}</TableCell>
                        <TableCell>{row?.Remark}</TableCell>
                        <TableCell>
                          {/* <Tooltip title="Edit">
                            <img
                              style={{ width: '20px', marginRight: '0.5rem' }}
                              onClick={() => handleOepn1(row)}
                              src={Edit}
                              alt=" Print"
                            />
                          </Tooltip> */}
                          <Tooltip title="Print Certificate">
                            <img
                              style={{ width: '20px', marginRight: '0.5rem' }}
                              onClick={() =>
                                navigation('/admin-panel/vehicle/PrintGateIn', {
                                  state: {
                                    data: row,
                                  },
                                })
                              }
                              src={Print}
                              alt=" Print"
                            />
                          </Tooltip>
                          {/* <Tooltip title="Gate Out">
                            <img
                              style={{ width: '20px', marginRight: '0.5rem' }}
                              onClick={() => handleClickOpen3(row?.id)}
                              src={Checkout}
                              alt=" Print"
                            />
                          </Tooltip> */}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow></TableRow>
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

export default GateoutHistory;
