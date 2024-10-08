import React, { useEffect, useState } from 'react';
import { serverInstance } from '../../../../../API/ServerInstance';
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
import Print from '../../../../../assets/Print.png';
import Edit from '../../../../../assets/Edit.png';
import Delete from '../../../../../assets/Delete.png';
import ExportPdf from '../../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../../assets/ExportExcel.png';
import exportFromJSON from 'export-from-json';
import payimg from '../../../../../assets/payimg.png';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import PrintElectronic from '../../../compoments/PrintElectronic';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { backendApiUrl } from '../../../../../config/config';
import LoadingSpinner1 from '../../../../../components/Loading/LoadingSpinner1';
import Addboliledger from './Addboliledger';
import Update from './Update';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import BoliTabs from '../BoliTabs';
import CloseIcon from '@mui/icons-material/Close';
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

const style10 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 'auto%',
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

const BoliLedger = ({ setopendashboard }) => {
  const navigate = useNavigate();

  let filterData;
  const navigation = useNavigate();
  const [loader, setloader] = useState(false);
  const [empid, setempid] = useState('');
  const [emproleid, setemproleid] = useState('');
  const [roleid, setroleid] = useState('');
  const [emplist, setemplist] = useState('');
  const [isData, setisData] = React.useState([]);
  const [isDataDummy, setisDataDummy] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [open, setOpen] = useState(false);
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

  const handleRowClick = (data) => {
    navigate('/admin-panel/boli/boliledger/tally', {
      state: {
        data: data,
      },
    });
  };

  const handleOpen4 = () => {
    setOpen4(true);
  };

  const handleOpen3 = () => setOpen3(true);

  const handleOpen = async () => {
    setOpen(true);


  };

  const handleClose = React.useCallback(() => setOpen(false), []);

  const [open20, setOpen20] = useState(false);
  const [updateData, setupdateData] = useState('');
  const handleClose20 = () => setOpen20(false);

  const handleOpen20 = (data) => {
    setOpen20(true);
    setupdateData(data);
  };

  const [paydata, setpaydata] = useState('');
  const [open30, setOpen30] = useState(false);
  const handleClose30 = () => setOpen30(false);
  const handleOpen30 = (data) => {
    setOpen30(true);
    setpaydata(data);

    console.log('boli data from boli ledger', data);
  };
  const handleDonation = () => {
    navigate('/admin-panel/donation', {
      state: {
        data: paydata,
      },
    });
  };

  const handleManualDonation = () => {
    navigate('/admin-panel/manualdonation', {
      state: {
        data: paydata,
      },
    });
  };

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
    serverInstance('boli/get-boliLedger', 'get').then((res) => {
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
    setloader(true);
    e.preventDefault();
    try {
      if (searchvalue) {
        axios.defaults.headers.get[
          'Authorization'
        ] = `Bearer ${sessionStorage.getItem('token')}`;

        const res = await axios.get(
          `${backendApiUrl}boli/search-boliLedger?search=${searchvalue}`,
        );

        if (res?.data?.status) {
          console.log('login drop 1', res);
          setisData(res?.data?.data);
          setisDataDummy(res?.data?.data);
          // setdefaultdata(res?.data);
          setloader(false);
        }
      } else {
        serverInstance(
          `boli/get-boliLedger?fromDate=${datefrom}&toDate=${dateto}`,
          'get',
        ).then((res) => {
          if (res.status) {
            console.log('login drop 2', res);
            setisData(res?.data);
            setisDataDummy(res?.data);
            // setdefaultdata(res?.data);
            setloader(false);
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
        Swal('Error', 'somthing went', 'error');
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

  const [open2, setOpen2] = React.useState(false);
  const [deleteId, setdeleteId] = useState('');
  const handleClickOpen1 = (id) => {
    setOpen2(true);
    setdeleteId(id);
  };
  const handleClose3 = () => {
    setOpen2(false);
  };

  const handleClose2 = () => {
    setOpen2(false);
    serverInstance(`boli/delete-boliLedger?id=${deleteId}`, 'delete').then(
      (res) => {
        if (res.status === true) {
          Swal.fire('Great!', res?.msg, 'success');
          getall_donation();
        } else {
          Swal('Error', res?.msg, 'error');
        }
        console.log(res);
      },
    );
  };
  useEffect(() => {
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

  }, [open, empid, open20]);

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

  // const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // const sortDataAmount = (key) => {
  //   let direction = 'ascending';
  //   if (sortConfig.key === key && sortConfig.direction === 'ascending') {
  //     direction = 'descending';
  //   }
  //   setisData(
  //     [...isData].sort((a, b) => {
  //       if (
  //         a[key].reduce(
  //           (n, { amount }) => parseFloat(n) + parseFloat(amount),
  //           0,
  //         ) <
  //         b[key].reduce(
  //           (n, { amount }) => parseFloat(n) + parseFloat(amount),
  //           0,
  //         )
  //       ) {
  //         return direction === 'ascending' ? -1 : 1;
  //       }
  //       if (
  //         a[key].reduce(
  //           (n, { amount }) => parseFloat(n) + parseFloat(amount),
  //           0,
  //         ) >
  //         b[key].reduce(
  //           (n, { amount }) => parseFloat(n) + parseFloat(amount),
  //           0,
  //         )
  //       ) {
  //         return direction === 'ascending' ? 1 : -1;
  //       }
  //       return 0;
  //     }),
  //   );
  //   setSortConfig({ key: key, direction: direction });
  // };
  // const sortData = (key) => {
  //   let direction = 'ascending';
  //   if (sortConfig.key === key && sortConfig.direction === 'ascending') {
  //     direction = 'descending';
  //   }
  //   setisData(
  //     [...isData].sort((a, b) => {
  //       if (a[key] < b[key]) {
  //         return direction === 'ascending' ? -1 : 1;
  //       }
  //       if (a[key] > b[key]) {
  //         return direction === 'ascending' ? 1 : -1;
  //       }
  //       return 0;
  //     }),
  //   );
  //   setSortConfig({ key: key, direction: direction });
  // };

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
      <Dialog
        open={open2}
        onClose={handleClose3}
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

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open30}
        onClose={handleClose30}
        closeAfterTransition
      >
        <Fade in={open30}>
          <Box sx={style10}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>Please Select Boli Option</p>
              <CloseIcon onClick={() => handleClose30()} />
            </div>

            <div className="buttonsdiv">
              <Button
                sx={{
                  borderRadius: '0.5rem',
                  color: 'black',
                  width: '10vw',
                  backgroundColor: '#BCEDDF',
                  margin: '1rem',
                  ':hover': {
                    bgcolor: '#f2ad6f',
                  },
                }}
                onClick={() => handleDonation(paydata)}
              >
                Donation
              </Button>

              <Button
                sx={{
                  borderRadius: '0.5rem',
                  color: 'black',
                  width: '10vw',
                  backgroundColor: '#BCEDDF',
                  margin: '1rem',
                  ':hover': {
                    bgcolor: '#f2ad6f',
                  },
                }}
                onClick={() => handleManualDonation(paydata)}
              >
                Manual Donation
              </Button>
            </div>
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
          <Box
            sx={{
              ...style,
              width: {
                xs: '80%',
                sm: '80%',
                md: '80%',
              },
            }}
          >
            <Addboliledger
              handleClose={handleClose}
              themeColor='#7037ad'
              handleOpen4={handleOpen4}
              setopendashboard={setopendashboard}
              receiptNo={receiptNo}
              donationTypes={donationTypes}
            />
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open20}
        onClose={handleClose20}
        closeAfterTransition
      >
        <Fade in={open20}>
          <Box
            sx={{
              ...style,
              width: {
                xs: '80%',
                sm: '80%',
                md: '80%',
              },
            }}
          >
            <Update
              handleClose={handleClose20}
              themeColor='#7037ad'
              handleOpen4={handleOpen20}
              setopendashboard={setopendashboard}
              receiptNo={receiptNo}
              donationTypes={donationTypes}
              updateData={updateData}
            />
          </Box>
        </Fade>
      </Modal>

      <div className="dashboarddiv" style={{ marginLeft: '1rem' }}>
        <BoliTabs setopendashboard={setopendashboard} />
        <div style={{ marginLeft: '4rem' }}>
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
                    S. No.
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortData('donation_date')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell>
                    Ledger No.
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortData('ReceiptNo')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell>
                    Mobile No.
                    <i
                      style={{ marginLeft: '0px' }}
                      onClick={() => sortData('voucherNo')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell>
                    Full Name
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortData('phoneNo')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>

                  <TableCell>
                    Address
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortData('name')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell>
                    City
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortData('phoneNo')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell>
                    Pincode
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortData('phoneNo')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell>
                    State
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortData('phoneNo')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell>
                    Country
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortData('phoneNo')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>

                  <TableCell>
                    Email
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortData('phoneNo')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell>
                    Aadhar No.
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortData('phoneNo')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell>
                    PAN No.
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortData('phoneNo')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell>
                    Total Amount
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortData('phoneNo')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell>
                    Deposit Amount
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortData('phoneNo')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell>
                    Pending Amount
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortData('phoneNo')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow></TableRow>

                {isData ? (
                  <>
                    {(rowsPerPage > 0
                      ? isData.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      : isData.reverse()
                    ).map((row, index) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row?.LedgerNo}</TableCell>
                        <TableCell onClick={() => handleRowClick(row)}>
                          {row?.MobileNo}
                        </TableCell>
                        <TableCell onClick={() => handleRowClick(row)}>
                          {row?.Name}
                        </TableCell>
                        <TableCell onClick={() => handleRowClick(row)}>
                          {row?.Address}
                        </TableCell>
                        <TableCell onClick={() => handleRowClick(row)}>
                          {row?.City}
                        </TableCell>
                        <TableCell onClick={() => handleRowClick(row)}>
                          {row?.PinCode}
                        </TableCell>
                        <TableCell onClick={() => handleRowClick(row)}>
                          {row?.State}
                        </TableCell>
                        <TableCell onClick={() => handleRowClick(row)}>
                          {row?.Country}
                        </TableCell>
                        <TableCell onClick={() => handleRowClick(row)}>
                          {row?.Email}
                        </TableCell>
                        <TableCell onClick={() => handleRowClick(row)}>
                          {row?.AadharNo}
                        </TableCell>
                        <TableCell onClick={() => handleRowClick(row)}>
                          {row?.PanNo}
                        </TableCell>
                        <TableCell onClick={() => handleRowClick(row)}>
                          {Number(row?.OpeningBalance) +
                            Number(row?.TotalAmount)}
                        </TableCell>
                        <TableCell onClick={() => handleRowClick(row)}>
                          {row?.DepositedAmount}
                        </TableCell>
                        <TableCell onClick={() => handleRowClick(row)}>
                          {Number(row?.OpeningBalance) +
                            Number(row?.TotalAmount) -
                            Number(row?.DepositedAmount)}
                        </TableCell>

                        <TableCell>
                          <Tooltip title="Print Certificate">
                            <img
                              style={{ width: '20px', marginRight: '1rem' }}
                              onClick={() => handleOpen20(row)}
                              src={Edit}
                              alt="Edit"
                            />
                          </Tooltip>

                          <Tooltip title="Delete">
                            <img
                              style={{ width: '20px' }}
                              onClick={() => handleClickOpen1(row?.id)}
                              src={Delete}
                              alt=" Print"
                            />
                          </Tooltip>
                          <Tooltip title="Pay">
                            <img
                              style={{ width: '20px' }}
                              onClick={() => handleOpen30(row)}
                              src={payimg}
                              alt="Pay"
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

export default BoliLedger;
