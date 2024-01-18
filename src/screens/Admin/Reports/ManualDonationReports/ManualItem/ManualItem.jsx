import React, { useEffect, useState } from 'react';
import { serverInstance } from '../../../../../API/ServerInstance';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
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
import DownloadIcon from '@mui/icons-material/Download';
import ClearIcon from '@mui/icons-material/Clear';
import Moment from 'moment-js';
import exportFromJSON from 'export-from-json';
import { ExportPdfmanulElectronic } from '../../../compoments/ExportPdf';
import UpdateCash from '../../../Donation/ManualDonation/UpdateComponents/UpdateCash';
import UpdateChe from '../../../Donation/ManualDonation/UpdateComponents/UpdateChe';
import UpdateElec from '../../../Donation/ManualDonation/UpdateComponents/UpdateElec';
import UpdateTtem from '../../../Donation/ManualDonation/UpdateComponents/UpdateTtem';
import Print from '../../../../../assets/Print.png';
import ExportPdf from '../../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../../assets/ExportExcel.png';
import Edit from '../../../../../assets/Edit.png';
import { ReactSpinner } from 'react-spinning-wheel';
import 'react-spinning-wheel/dist/style.css';
import ManualTotal from '../../../compoments/ManualTotal';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import PrintManual from '../../../compoments/PrintManual';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { backendApiUrl } from '../../../../../config/config';
import ManualDonationTap from '../ManualDonationTap';
import Delete from '../../../../../assets/Delete.png';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingSpinner1 from '../../../../../components/Loading/LoadingSpinner1';
import { MenuItem, Menu } from '@mui/material';
import PrintContent from '../../../compoments/PrintContentModalManual';
import ModalElecReceipt from '../../../Reciept/ModalMnaulReceipt';
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
  width: '70%',
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

  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
  borderRadius: '5px',
};

const donationColorTheme = {
  cash: '#48a828',
};

const ManualItem = ({ setopendashboard }) => {
  const navigation = useNavigate();
  let head = [];
  let users = [];
  const [passuser, setpassuser] = useState('');
  const [passhead, setpasshead] = useState('');
  const [loader, setloader] = useState(false);
  const [emplist, setemplist] = useState('');
  const [emproleid, setemproleid] = useState('');
  const [isData, setisData] = React.useState('');
  const [isDataDummy, setisDataDummy] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [showalert, setshowalert] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [updateData, setupdateData] = useState('');
  const [openupdate, setopenupdate] = useState(false);
  const [showUpdateBtn, setshowUpdateBtn] = useState(true);
  const [donationTypes, setDonationTypes] = useState([]);
  const [updateId, setupdateId] = useState('');
  const [datefrom, setdatefrom] = useState('');
  const [dateto, setdateto] = useState('');
  const [userrole, setuserrole] = useState('');
  const [voucherfrom, setvoucherfrom] = useState('');
  const [voucherto, setvoucherto] = useState('');
  const [open5, setOpen5] = React.useState(false);
  const [searchvalue, setsearchvalue] = useState('');
  const handleOpen5 = () => setOpen5(true);
  const handleClose5 = () => setOpen5(false);
  const [date, setDate] = useState('');
  const [receiptNo, setReceiptNo] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [remark, setRemark] = useState('');
  const [type, setType] = useState('');
  const [userType, setUserType] = useState('');
  const [fsize, setfsize] = useState('');
  const [funit, setfunit] = useState('');
  const [fno, setfno] = useState('');
  const [fitem, setfitem] = useState('');
  const [deleteId, setdeleteId] = useState('');
  const [open3, setOpen3] = React.useState(false);
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
  const handleClickOpen3 = (id) => {
    setOpen3(true);
    setdeleteId(id);
  };
  const handleClose6 = () => setOpen3(false);
  const handleClose4 = () => {
    setOpen3(false);
    serverInstance('admin/delete-meanual-donation', 'post', { id: deleteId })
      .then((res) => {
        if (res.data.status) {
          Swal.fire('Great!', res.data.message, 'success');
          getall_donation();
        } else {
          Swal('Error', 'somthing went  wrong', 'error');
        }
      })
      .catch((error) => {
        Swal('Error', 'somthing went  wrong', 'error');
      });
  };

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
    setsearchvalue('');
    setpasshead('');
    setpassuser('');
    setdatefrom('');
    setdateto('');
    setvoucherfrom('');
    setvoucherto('');
    serverInstance('admin/manual-donation', 'get').then((res) => {
      if (res.status) {
        setloader(false);
        // let currentMonth, filterData;
        // (currentMonth = new Date().getMonth() + 1),
        //   (filterData = res?.data?.filter((e) => {
        //     var [_, month] = e.donation_date.split('-'); // Or, var month = e.date.split('-')[1];
        //     return currentMonth === +month && e.modeOfDonation === '4';
        //   }));
        let filterData = res.data.filter((item) => item.modeOfDonation === '4');

        setisData(filterData);
        setisDataDummy(filterData);
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
      navigation('/manualreceipt', {
        state: {
          userdata: row,
        },
      });
    }
  };

  const ExportToExcel = () => {
    const fileName = 'ManaulItem';
    const exportType = 'xls';
    var data = [];
    isData.map((item, index) => {
      data.push({
        Date: Moment(item.donation_date).format('DD-MM-YYYY'),
        'Receipt No': item?.ReceiptNo,

        'Phone No': item?.phoneNo,
        name: item?.name,
        Address: item?.address,
        'Head/Item': item?.manualItemDetails.map((row) => {
          return row.type;
        }),
        Amount: item?.manualItemDetails.reduce(
          (n, { amount }) => parseFloat(n) + parseFloat(amount),
          0,
        ),
        itemtype: item?.manualItemDetails.map((row) => {
          return row?.itemType;
        }),
        Size: item?.manualItemDetails[0]?.size,
        Unit: item?.manualItemDetails[0]?.unit,
        Quantity: item?.manualItemDetails[0]?.quantity,
        remark: item?.manualItemDetails.map((row) => {
          return row.remark;
        }),
        Staff: item?.CreatedBy,
        'Created Date': Moment(item?.created_at).format('DD-MM-YYYY'),
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
          `${backendApiUrl}/admin/search-manual?search=${searchvalue}&type=${4}`,
        );

        if (res.data.status) {
          setloader(false);
          setisData(res.data.data);
          setisDataDummy(res.data.data);
        }
      } else {
        serverInstance(
          `user/manual-search-donation?fromDate=${datefrom}&toDate=${dateto}&fromReceipt=${voucherfrom}&toReceipt=${voucherto}&modeOfDonation=${4}`,
          'post',
          { user: passuser, type: passhead },
        ).then((res) => {
          if (res.status) {
            let filterData = res.data.filter(
              (item) => item.modeOfDonation === '4',
            );
            setloader(false);
            setisData(filterData);
            setisDataDummy(filterData);
          }
        });
      }
    } catch (error) {
      setloader(false);
    }
  };

  const get_donation_tyeps = () => {
    try {
      Promise.all([serverInstance('admin/donation-type?type=2', 'get')]).then(
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
    getall_donation();
    setopendashboard(true);
    get_donation_tyeps();
    setuserrole(Number(sessionStorage.getItem('userrole')));
    setemproleid(Number(sessionStorage.getItem('empRoleid')));
  }, []);
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
    if (type === 'size') {
      setfsize(e.target.value);
    }
    if (type === 'unit') {
      setfunit(e.target.value?.toLowerCase());
    }
    if (type === 'item') {
      setfitem(e.target.value?.toLowerCase());
    }
    if (type === 'no') {
      setfno(e.target.value);
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
        dt?.CreatedBy?.toLowerCase()?.indexOf(userType) > -1,
    );
    console.log(filtered);
    if (type) {
      filtered = filtered?.map((item) => {
        if (item?.manualItemDetails?.find((typ) => typ.type == type)) {
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
          item.manualItemDetails.reduce(
            (n, { amount }) => parseFloat(n) + parseFloat(amount),
            0,
          ),
        );
        if (
          item.manualItemDetails.reduce(
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
        if (item?.manualItemDetails?.find((typ) => typ.remark == remark)) {
          return item;
        } else {
          return;
        }
      });
      filtered = filtered?.filter((x) => x !== undefined);
    }
    if (fsize) {
      filtered = filtered?.map((item) => {
        if (item?.manualItemDetails?.find((typ) => typ.size == fsize)) {
          return item;
        } else {
          return;
        }
      });
      filtered = filtered?.filter((x) => x !== undefined);
    }
    if (funit) {
      filtered = filtered?.map((item) => {
        if (
          item?.manualItemDetails?.find(
            (typ) => typ.unit?.toLowerCase() == funit,
          )
        ) {
          return item;
        } else {
          return;
        }
      });
      filtered = filtered?.filter((x) => x !== undefined);
    }
    if (fno) {
      filtered = filtered?.map((item) => {
        if (item?.manualItemDetails?.find((typ) => typ.quantity == fno)) {
          return item;
        } else {
          return;
        }
      });
      filtered = filtered?.filter((x) => x !== undefined);
    }

    if (fitem) {
      filtered = filtered?.map((item) => {
        if (
          item?.manualItemDetails?.find(
            (typ) => typ.itemType?.toLowerCase() == fitem,
          )
        ) {
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
    fitem,
    fno,
    fsize,
    funit,
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

  const sortDataItemtype = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setisData(
      [...isData].sort((a, b) => {
        if (a[key][0]?.itemType < b[key][0]?.itemType) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (a[key][0]?.itemType > b[key][0]?.itemType) {
          return direction === 'ascending' ? 1 : -1;
        }
        return 0;
      }),
    );
    setSortConfig({ key: key, direction: direction });
  };

  const sortDataSize = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setisData(
      [...isData].sort((a, b) => {
        if (a[key][0]?.size < b[key][0]?.size) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (a[key][0]?.size > b[key][0]?.size) {
          return direction === 'ascending' ? 1 : -1;
        }
        return 0;
      }),
    );
    setSortConfig({ key: key, direction: direction });
  };

  const sortRDataQuantity = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setisData(
      [...isData].sort((a, b) => {
        if (a[key][0]?.quantity < b[key][0]?.quantity) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (a[key][0]?.quantity > b[key][0]?.quantity) {
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
                    head.push(item?.itemType_hi);
                    console.log(head);
                  }}
                />
                <span> {item?.itemType_hi}</span>
              </div>
            </MenuItem>
          ))}
      </Menu>
      <Dialog
        open={open3}
        onClose={handleClose6}
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
          <Button onClick={handleClose6}>Disagree</Button>
          <Button onClick={handleClose4} autoFocus>
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
            <PrintManual isData={isData} handleClose={handleClose5} />
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
            {updateData?.modeOfDonation === '2' && (
              <>
                <UpdateCash
                  handleClose={upadteClose}
                  themeColor={donationColorTheme.cash}
                  updateData={updateData}
                  showUpdateBtn={showUpdateBtn}
                  donationTypes={donationTypes}
                />
              </>
            )}
            {updateData?.modeOfDonation === '3' && (
              <>
                <UpdateChe
                  handleClose={upadteClose}
                  themeColor={donationColorTheme.cash}
                  updateData={updateData}
                  showUpdateBtn={showUpdateBtn}
                  donationTypes={donationTypes}
                />
              </>
            )}
            {updateData?.modeOfDonation === '1' && (
              <>
                <UpdateElec
                  handleClose={upadteClose}
                  themeColor={donationColorTheme.cash}
                  updateData={updateData}
                  showUpdateBtn={showUpdateBtn}
                  donationTypes={donationTypes}
                />
              </>
            )}
            {updateData?.modeOfDonation === '4' && (
              <>
                <UpdateTtem
                  handleClose={upadteClose}
                  themeColor={donationColorTheme.cash}
                  updateData={updateData}
                  showUpdateBtn={showUpdateBtn}
                  donationTypes={donationTypes}
                />
              </>
            )}
          </Box>
        </Fade>
      </Modal>

      <ManualDonationTap setopendashboard={setopendashboard} />
      <div style={{ marginLeft: '5rem', marginRight: '1rem' }}>
        <div className="search-header">
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

        <div className="table-div-maaicn">
          <Table sx={{ width: '100%' }} aria-label="simple table">
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
                    style={{ marginLeft: '0rem' }}
                    onClick={() => sortData('ReceiptNo')}
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
                    onClick={() => sortDataHead('manualItemDetails')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Amount
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortDataAmount('manualItemDetails')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  ItemType{' '}
                  <i
                    style={{ marginLeft: '0rem' }}
                    onClick={() => sortDataItemtype('manualItemDetails')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Size{' '}
                  <i
                    style={{ marginLeft: '0rem' }}
                    onClick={() => sortDataSize('manualItemDetails')}
                    class={`fa fa-sort`}
                  />
                </TableCell>

                <TableCell>
                  Quantity{' '}
                  <i
                    style={{ marginLeft: '0rem' }}
                    onClick={() => sortRDataQuantity('manualItemDetails')}
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
                    onClick={() => sortRemark('manualItemDetails')}
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
                    return (
                      <option value={item.itemType_hi}>
                        {item.itemType_hi}
                      </option>
                    );
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
                <input
                  className="cuolms_search"
                  type="text"
                  onChange={(e) => onSearchByOther(e, 'item')}
                  placeholder="Item"
                />
              </TableCell>
              <TableCell>
                <input
                  className="cuolms_search"
                  type="text"
                  onChange={(e) => onSearchByOther(e, 'size')}
                  placeholder="Size"
                />
              </TableCell>
              {/* <TableCell>
                <input
                  className="cuolms_search"
                  type="text"
                  onChange={(e) => onSearchByOther(e, 'unit')}
                  placeholder="Unit"
                />
              </TableCell> */}
              <TableCell>
                <input
                  className="cuolms_search"
                  type="text"
                  onChange={(e) => onSearchByOther(e, 'no')}
                  placeholder="No"
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
                      <TableCell>
                        {Moment(row.donation_date).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>{row.ReceiptNo}</TableCell>

                      <TableCell>{row.phoneNo}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell> {row.address}</TableCell>
                      <TableCell>
                        {row?.manualItemDetails.map((row) => {
                          return (
                            <li style={{ listStyle: 'none' }}>{row.type}</li>
                          );
                        })}
                      </TableCell>
                      <TableCell>
                        {row?.manualItemDetails.reduce(
                          (n, { amount }) => parseFloat(n) + parseFloat(amount),
                          0,
                        )}.00
                      </TableCell>
                      <TableCell>
                        {row?.manualItemDetails.map((row) => {
                          return (
                            <li style={{ listStyle: 'none' }}>
                              {row.itemType}{' '}
                            </li>
                          );
                        })}
                      </TableCell>
                      <TableCell>
                        {row?.manualItemDetails.map((row) => {
                          return (
                            <li style={{ listStyle: 'none' }}>
                              {row?.size}-{row?.unit}{' '}
                            </li>
                          );
                        })}
                      </TableCell>
                      {/* <TableCell>
                        {row?.manualItemDetails.map((row) => {
                          return (
                            <li style={{ listStyle: 'none' }}>{row?.unit} </li>
                          );
                        })}
                      </TableCell> */}
                      <TableCell>
                        {row?.manualItemDetails.map((row) => {
                          return (
                            <li style={{ listStyle: 'none' }}>
                              {row?.quantity}{' '}
                            </li>
                          );
                        })}
                      </TableCell>
                      <TableCell>{row?.CreatedBy}</TableCell>
                      <TableCell>
                        {row.manualItemDetails.map((row) => {
                          return (
                            <li style={{ listStyle: 'none' }}>{row.remark} </li>
                          );
                        })}
                      </TableCell>
                      <TableCell>
                        {userrole === 1 || emproleid === 0 ? (
                          <Tooltip title="Edit">
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
                          <Tooltip title="Delete">
                            <img
                              src={Delete}
                              style={{ width: '20px' }}
                              onClick={() => handleClickOpen3(row.id)}
                              alt="dd"
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
                    <TableCell style={{ fontWeight: 700 }}>
                      {' '}
                      Total Amount
                    </TableCell>
                    <TableCell style={{ fontWeight: 700 }}>
                      <ManualTotal data={isData} />
                    </TableCell>
                    <TableCell> &nbsp;</TableCell>
                    <TableCell> &nbsp;</TableCell>
                    <TableCell> &nbsp;</TableCell>
                  </TableRow>
                </>
              ) : (
                <>
                  <TableRow>
                    <TableCell colSpan={13} align="center">
                      <ReactSpinner />
                    </TableCell>
                  </TableRow>
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

export default ManualItem;
