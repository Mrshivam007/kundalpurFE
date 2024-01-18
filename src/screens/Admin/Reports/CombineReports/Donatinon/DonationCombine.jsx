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
import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import Cancel from '../../../compoments/Cancel';
import DownloadIcon from '@mui/icons-material/Download';
import ClearIcon from '@mui/icons-material/Clear';
import exportFromJSON from 'export-from-json';
import Moment from 'moment-js';
import CashDonation from '../../../Donation/Donation/CashDonation';
import { backendApiUrl } from '../../../../../config/config';
import axios from 'axios';
import { ExportPdfmanul } from '../../../compoments/ExportPdf';
import Print from '../../../../../assets/Print.png';
import ExportPdf from '../../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../../assets/ExportExcel.png';
import eye from '../../../../../assets/eye.png';
import Edit from '../../../../../assets/Edit.png';
import Delete from '../../../../../assets/Delete.png';
import ElectronicTotal from '../../../compoments/ElectronicTotal';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import PrintElectronic from '../../../compoments/PrintElectronic';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DonationReportTap from '../ComBineTap';
import LoadingSpinner1 from '../../../../../components/Loading/LoadingSpinner1';
import { MenuItem, Menu } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import 'react-spinning-wheel/dist/style.css';
import PrintContent from '../../../compoments/PrintElecModalContent';
import ModalElecReceipt from '../../../Reciept/ModalElecReceipt';

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

const style5 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 'auto',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  p: 2,

  boxShadow: 24,
  borderRadius: '15px',
};
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
const style = {
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

const openupadtestyle = {
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
};
// modeOfDonation = 1 for electronic donation
// modeOfDonation = 2 for cash donation
// modeOfDonation = 3 for cheque donation
// modeOfDonation = 4 for item donation
const dinationTypedata = [
  { id: 1, type: 'electronic donation' },
  { id: 2, type: ' cash donation' },
  { id: 3, type: 'cheque donation' },
  { id: 4, type: 'item donation' },
];

const DonationCombine = ({ setopendashboard }) => {
  const navigation = useNavigate();
  let head = [];
  let users = [];
  const [passuser, setpassuser] = useState('');
  const [passhead, setpasshead] = useState('');
  const [emproleid, setemproleid] = useState('');
  const [loader, setloader] = useState(false);
  const [emplist, setemplist] = useState('');
  const [isData, setisData] = React.useState('');
  const [isDataDummy, setisDataDummy] = React.useState([]);
  const [defaultdata, setdefaultdata] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [showalert, setshowalert] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [updateData, setupdateData] = useState('');
  const [openupdate, setopenupdate] = useState(false);
  const [showUpdateBtn, setshowUpdateBtn] = useState(true);
  const [donationTypes, setDonationTypes] = useState([]);
  const [updateId, setupdateId] = useState('');
  const [userrole, setuserrole] = useState('');
  const [datefrom, setdatefrom] = useState('');
  const [dateto, setdateto] = useState('');
  const [voucherfrom, setvoucherfrom] = useState('');
  const [voucherto, setvoucherto] = useState('');
  const [open5, setOpen5] = React.useState(false);
  const [searchvalue, setsearchvalue] = useState('');
  const handleOpen5 = () => setOpen5(true);
  const handleClose5 = () => setOpen5(false);
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
  const [typeofdonation, settypeofdonation] = useState(0);
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
    setupdateId(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const upadteClose = () => {
    setopenupdate(false);
  };
  const upadteOpen = (row) => {
    setupdateData(row);
    setopenupdate(true);
  };

  const getall_donation = () => {
    setloader(true);
    setdatefrom('');
    setpasshead('');
    setpassuser('');
    setdateto('');
    setvoucherfrom('');
    setvoucherto('');
    setsearchvalue('');
    serverInstance('user/add-elecDonation', 'get').then((res) => {
      if (res.status) {
        let filterData = res.data.filter((item) => item.isActive === true);
        setloader(false);
        setisData(filterData);
        setisDataDummy(filterData);
        setdefaultdata(filterData);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
    });
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open11 = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose11 = () => {
    setAnchorEl(null);
    setpassuser(users);
  };

  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const open1 = Boolean(anchorEl1);
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
    setpasshead(head);
  };

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

  const ExportToExcel = () => {
    const fileName = 'DonationCashReport';
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
        'Head/Item': item?.elecItemDetails.map((row) => {
          return row.type;
        }),
        Amount: item?.elecItemDetails.reduce(
          (n, { amount }) => parseFloat(n) + parseFloat(amount),
          0,
        ),
        remark: item?.elecItemDetails.map((row) => {
          return row.remark;
        }),
        Staff: item?.createdBy,
        'Created Date': Moment(item?.created_at).format('DD-MM-YYYY'),
      });
    });
    exportFromJSON({ data, fileName, exportType });
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
          `${backendApiUrl}admin/search-electric?search=${searchvalue}`,
        );

        if (res.data.status) {
          let filterData = res.data.data.filter(
            (item) => item.isActive === true,
          );
          setisData(filterData);
          setisDataDummy(filterData);
          setdefaultdata(filterData);
          setloader(false);
        }
      } else {
        if (typeofdonation === 0) {
          serverInstance(
            `user/search-donation?fromDate=${datefrom}&toDate=${dateto}&fromVoucher=${voucherfrom}&toVoucher=${voucherto}
            )}`,
            'post',
            { user: passuser, type: passhead },
          ).then((res) => {
            if (res.status) {
              let filterData = res?.data.filter(
                (item) => item?.isActive === true,
              );
              setisData(filterData);
              setisDataDummy(filterData);
              setdefaultdata(filterData);
              setloader(false);
            }
          });
        } else {
          serverInstance(
            `user/search-donation?name=&fromDate=${datefrom}&toDate=${dateto}&fromVoucher=${voucherfrom}&toVoucher=${voucherto}&modeOfDonation=${Number(
              typeofdonation,
            )}`,
            'post',
            { user: passuser, type: passhead },
          ).then((res) => {
            if (res.status) {
              let filterData = res?.data?.filter(
                (item) => item?.isActive === true,
              );
              setisData(filterData);
              setisDataDummy(filterData);
              setdefaultdata(filterData);
              setloader(false);
            }
          });
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
  const getallemp_list = () => {
    serverInstance('admin/add-employee', 'get').then((res) => {
      if (res.status) {
        setemplist(res.data);
        console.log('empl list', res.data);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
      console.log(res);
    });
  };
  useEffect(() => {
    getallemp_list();

    setopendashboard(true);
    get_donation_tyeps();
    setuserrole(Number(sessionStorage.getItem('userrole')));
    setemproleid(Number(sessionStorage.getItem('empRoleid')));
  }, [showalert, openupdate, open]);
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
    var filtered = isDataDummy?.filter(
      (dt) =>
        dt?.ReceiptNo.toLowerCase().indexOf(receiptNo) > -1 &&
        dt?.phoneNo.toLowerCase().indexOf(phone) > -1 &&
        Moment(dt?.donation_date).format('YYYY-MM-DD').indexOf(date) > -1 &&
        dt?.name.toLowerCase().indexOf(name) > -1 &&
        dt?.address.toLowerCase().indexOf(address) > -1 &&
        dt?.createdBy?.toLowerCase()?.indexOf(userType) > -1 &&
        dt?.voucherNo?.toLowerCase()?.indexOf(voucherno) > -1,
    );
    console.log(filtered);
    if (type) {
      filtered = filtered?.map((item) => {
        if (item?.elecItemDetails?.find((typ) => typ.type == type)) {
          return item;
        } else {
          return;
        }
      });
      filtered = filtered?.filter((x) => x !== undefined);
    }

    if (amount) {
      filtered = filtered?.map((item) => {
        console.log(
          item.elecItemDetails.reduce(
            (n, { amount }) => parseFloat(n) + parseFloat(amount),
            0,
          ),
        );
        if (
          item.elecItemDetails.reduce(
            (n, { amount }) => parseFloat(n) + parseFloat(amount),
            0,
          ) == amount
        ) {
          return item;
        } else {
          return;
        }
      });
      filtered = filtered?.filter((x) => x !== undefined);
    }
    if (remark) {
      filtered = filtered?.map((item) => {
        if (item?.elecItemDetails?.find((typ) => typ.remark == remark)) {
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
    serverInstance(`user/delete-elecDonation?id=${deleteId}`, 'delete').then(
      (res) => {
        if (res.status === true) {
          Swal.fire('Great!', 'User delete successfully', 'success');
          getall_donation();
        } else {
          Swal('Error', 'somthing went  wrong', 'error');
        }
        console.log(res);
      },
    );
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
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open11}
        onClose={handleClose11}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <div className="mainuser_item">
          <input
            style={{ marginLeft: '1.2rem', marginRight: '1rem' }}
            type="checkbox"
            onClick={() => {
              setpassuser('');
            }}
          />
          <span>All Users</span>
        </div>
        {emplist &&
          emplist.map((item, index) => (
            <MenuItem key={item?.id}>
              <div className="mainuser_item">
                <input
                  style={{ marginRight: '1rem' }}
                  type="checkbox"
                  onClick={() => {
                    users.push(item?.id);
                    console.log(users);
                  }}
                />
                <span>{item?.Username}</span>
              </div>
            </MenuItem>
          ))}
      </Menu>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl1}
        open={open1}
        onClose={handleClose1}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <div className="mainuser_item">
          <input
            style={{ marginLeft: '1.2rem', marginRight: '1rem' }}
            type="checkbox"
            onClick={() => {
              setpasshead('');
            }}
          />
          <span>All Head</span>
        </div>
        {donationTypes &&
          donationTypes.map((item, index) => (
            <MenuItem key={index} value={item.type_hi}>
              <div className="mainuser_item">
                <input
                  style={{ marginRight: '1rem' }}
                  type="checkbox"
                  onClick={() => {
                    head.push(item.type_hi);
                    console.log(head);
                  }}
                />
                <span> {item.type_hi}</span>
              </div>
            </MenuItem>
          ))}
      </Menu>

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
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <div>
              <div className="add-div-close-div1">
                <h2>Cancel electronic donation </h2>
                <CloseIcon onClick={() => handleClose()} />
              </div>
              <Cancel handleClose={handleClose} updateId={updateId} type={2} />
            </div>
          </Box>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openupdate}
        onClose={upadteClose}
        closeAfterTransition
      >
        <Fade in={openupdate}>
          <Box
            sx={{
              ...openupadtestyle,
              width: {
                xs: '90%',
                sm: '70%',
                md: '60%',
              },
            }}
          >
            <CashDonation
              handleClose={upadteClose}
              themeColor={donationColorTheme.cash}
              updateData={updateData}
              showUpdateBtn={showUpdateBtn}
              setopendashboard={setopendashboard}
            />
          </Box>
        </Fade>
      </Modal>
      <DonationReportTap setopendashboard={setopendashboard} />
      <div style={{ marginLeft: '5rem', marginRight: '1rem' }}>
        <div className="search-header ">
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
                <label>Donation Type</label>

                <select
                  style={{ width: '100%' }}
                  onChange={(e) => {
                    settypeofdonation(e.target.value);
                  }}
                >
                  <option value={0}>All Donations</option>
                  {dinationTypedata?.map((item) => {
                    return <option value={item?.id}>{item?.type}</option>;
                  })}
                </select>
              </div>
              <div className="Center_main_dic_filetr">
                <label>&nbsp;</label>
                <div
                  className="main_div_selectAllhed"
                  style={{ width: '9rem' }}
                >
                  <div
                    onClick={handleClick1}
                    className="select_person_divAllHead"
                    style={{ width: '9rem' }}
                  >
                    {passhead.length > 0
                      ? `Selected head ${passhead.length}`
                      : ' All Head'}
                    <svg
                      width="12"
                      height="7"
                      viewBox="0 0 12 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L6 6L11 1"
                        stroke="#333333"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="Center_main_dic_filetr">
                <label>&nbsp;</label>
                <div
                  className="main_div_selectAllhed"
                  style={{ width: '9rem' }}
                >
                  <div
                    onClick={handleClick}
                    className="select_person_divAllHead"
                    style={{ width: '9rem' }}
                  >
                    {passuser.length > 0
                      ? `Selected user ${passuser.length}`
                      : 'All User '}
                    <svg
                      width="12"
                      height="7"
                      viewBox="0 0 12 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L6 6L11 1"
                        stroke="#333333"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
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

            {/* <div className="Center_main_dic_filetr">
              <label>&nbsp;</label>
              <button onClick={() => getall_donation()}>Reset</button>
            </div> */}
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
            sx={{ minWidth: 650, width: '100%' }}
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
                  ReceiptNo
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('ReceiptNo')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  VoucherNo
                  <i
                    style={{ marginLeft: '0px' }}
                    onClick={() => sortData('voucherNo')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Phone No
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
                  Address
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('address')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Head
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortDataHead('elecItemDetails')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Amount
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortDataAmount('elecItemDetails')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  User
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('CreatedBy')}
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
                  placeholder="Search Receipt"
                />
              </TableCell>
              <TableCell>
                <input
                  className="cuolms_search"
                  type="text"
                  onChange={(e) => onSearchByOther(e, 'Voucher')}
                  placeholder="Search Voucher"
                />
              </TableCell>
              <TableCell>
                <input
                  className="cuolms_search"
                  type="text"
                  onChange={(e) => onSearchByOther(e, 'Phone')}
                  placeholder="Search Phone"
                />
              </TableCell>
              <TableCell>
                <input
                  type="text"
                  className="cuolms_search"
                  onChange={(e) => onSearchByOther(e, 'Name')}
                  placeholder="Name"
                />
              </TableCell>
              <TableCell>
                <input
                  className="cuolms_search"
                  type="text"
                  onChange={(e) => onSearchByOther(e, 'Address')}
                  placeholder="Search Address"
                />
              </TableCell>
              <TableCell>
                <select
                  className="cuolms_search"
                  onChange={(e) => onSearchByOther(e, 'Type')}
                >
                  <option value="">All Head</option>

                  {donationTypes.map((item, idx) => {
                    return <option value={item.type_hi}>{item.type_hi}</option>;
                  })}
                </select>
              </TableCell>
              <TableCell>
                <input
                  className="cuolms_search"
                  type="text"
                  onChange={(e) => onSearchByOther(e, 'Amount')}
                  placeholder="Search Amount"
                />
              </TableCell>

              <TableCell>
                <select
                  name="cars"
                  id="cars"
                  className="cuolms_search"
                  onChange={(e) => onSearchByOther(e, 'UserType')}
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

              <TableCell>
                <input
                  className="cuolms_search"
                  type="text"
                  placeholder="Remark"
                  onChange={(e) => onSearchByOther(e, 'Remark')}
                />
              </TableCell>
              <TableCell>&nbsp;</TableCell>
              {isData ? (
                <>
                  {(rowsPerPage > 0
                    ? isData
                        ?.reverse()
                        ?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage,
                        )
                    : isData
                  )
                    ?.reverse()
                    ?.map((row, index) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell>
                          {Moment(row?.donation_date).format('DD/MM/YYYY')}
                        </TableCell>
                        <TableCell>{row?.ReceiptNo}</TableCell>
                        <TableCell>{row?.voucherNo}</TableCell>
                        <TableCell>{row?.phoneNo}</TableCell>
                        <TableCell>{row?.name}</TableCell>
                        <TableCell> {row?.address}</TableCell>
                        <TableCell>
                          {row.elecItemDetails.map((row) => {
                            return (
                              <li style={{ listStyle: 'none' }}>{row?.type}</li>
                            );
                          })}
                        </TableCell>
                        <TableCell>
                          {row.elecItemDetails.reduce(
                            (n, { amount }) =>
                              parseFloat(n) + parseFloat(amount),
                            0,
                          )}.00
                        </TableCell>

                        <TableCell>{row?.createdBy}</TableCell>
                        <TableCell>
                          {row.elecItemDetails.map((row) => {
                            return (
                              <li style={{ listStyle: 'none' }}>
                                {row?.remark}{' '}
                              </li>
                            );
                          })}
                        </TableCell>

                        <TableCell>
                          {/* <Tooltip title="Vew Details">
                          <img
                            onClick={() =>
                              navigation(
                                `/admin-panel/infoElectronic/${row?.id}`,
                              )
                            }
                            src={eye}
                            alt="print"
                            style={{ width: '20px', marginRight: '2px' }}
                          />
                        </Tooltip> */}

                          {userrole === 1 || emproleid === 0 ? (
                            <Tooltip title="Edit Donation">
                              <img
                                onClick={() => upadteOpen(row)}
                                src={Edit}
                                alt="print"
                                style={{ width: '20px', marginRight: '2px' }}
                              />
                            </Tooltip>
                          ) : (
                            ''
                          )}

                          <Tooltip title="Print Certificate">
                            <img
                              onClick={() => handleOpen50(row)}
                              src={Print}
                              alt="print"
                              style={{ width: '20px', marginRight: '2px' }}
                            />
                          </Tooltip>

                          {row.isActive ? (
                            <DownloadIcon
                              onClick={() => {
                                handleOpen60(row);
                              }}
                            />
                          ) : (
                            <ClearIcon />
                          )}
                          
                          {userrole === 1 || emproleid === 0 ? (
                            <Tooltip title="Cancel Certificate">
                              <CancelIcon onClick={() => handleOpen(row?.id)} />
                            </Tooltip>
                          ) : (
                            ''
                          )}
                          {userrole === 1 || emproleid === 0 ? (
                            <Tooltip title="Delete Certificate">
                              <img
                                onClick={() => handleClickOpen1(row.id)}
                                src={Delete}
                                alt="delete"
                                style={{ width: '20px', marginRight: '2px' }}
                              />
                            </Tooltip>
                          ) : (
                            ''
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  <TableRow>
                    <TableCell> &nbsp;</TableCell>
                    <TableCell> &nbsp;</TableCell>
                    <TableCell> &nbsp;</TableCell>
                    <TableCell> &nbsp;</TableCell>
                    <TableCell> &nbsp;</TableCell>
                    <TableCell> &nbsp;</TableCell>
                    <TableCell style={{ fontWeight: 700 }}>
                      Total Amount
                    </TableCell>
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
                    <TableCell colSpan={12} align="center">
                      <ReactSpinner />
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
      {loader && <LoadingSpinner1 />}
    </>
  );
};

export default DonationCombine;
