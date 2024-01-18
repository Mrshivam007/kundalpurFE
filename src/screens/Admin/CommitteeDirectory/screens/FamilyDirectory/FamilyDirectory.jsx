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
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import UnderlinedTab from './common/UnderlinedTab';
import FamilyDirListItem from './ListItem/FamilyDirListItem';
import Print from '../../../../../assets/Print.png';
import Edit from '../../../../../assets/Edit.png';
import Delete from '../../../../../assets/Delete.png';
import ExportPdf from '../../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../../assets/ExportExcel.png';
import exportFromJSON from 'export-from-json';
import CircularProgress from '@mui/material/CircularProgress';
import Moment from 'moment-js';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { backendApiUrl } from '../../../../../config/config';
// import { ExportPdfmanul } from '../../compoments/ExportPdf';
import LoadingSpinner1 from '../../../../../components/Loading/LoadingSpinner1';
import './FamilyDirectoryTab.css';
import UpdateFamiliy from './ListItem/UpdateFamiliy';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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

const FamilyDirectory = ({ setopendashboard }) => {
  let filterData;
  const [loader, setloader] = useState(false);
  const [empid, setempid] = useState('');
  const [userrole, setuserrole] = useState('');
  const [emproleid, setemproleid] = useState('');

  const [emplist, setemplist] = useState([]);
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

  const [open5, setOpen5] = React.useState(false);
  const [searchvalue, setsearchvalue] = useState('');
  const [voucherno, setVoucherno] = useState('');
  const [date, setDate] = useState('');

  const [open10, setOpen10] = React.useState(false);
  const [dirUpdatedata, setdirUpdatedata] = useState('');

  const handleOpen10 = (data) => {
    setdirUpdatedata(data);
    setOpen10(true);
  };
  const handleClose10 = () => setOpen10(false);
  const [open30, setOpen30] = React.useState(false);
  const handleOpen5 = () => setOpen5(true);
  const handleClose5 = () => setOpen5(false);

  const handleOpen4 = () => {
    setOpen4(true);
  };

  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);

  const handleOpen = async () => {
    setOpen(true);

    console.log('clicked', open);
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

  const filterdata = async (e) => {
    e.preventDefault();
    setloader(true);
    try {
      if (searchvalue) {
        serverInstance(
          `committee/search-family?search=${searchvalue}',
          'get`,
        ).then((res) => {
          console.log('jhchdshjdxv', res);
          if (res?.status) {
            setloader(false);
            setisData(res?.data);
            setisDataDummy(res?.data);
          }
        });
      } else {
        serverInstance(
          `committee/get-family?fromDate=${datefrom}&toDate=${dateto}',
          'get`,
        ).then((res) => {
          if (res?.status) {
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
    serverInstance('committee/get-family', 'get').then((res) => {
      if (res.status) {
        setemplist(res.data);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
    });
  };

  const reset = () => {
    setdatefrom('');
    l;
    setdateto('');
    setsearchvalue('');
    getallemp_list();
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
    setuserrole(Number(sessionStorage.getItem('userrole')));
    setempid(Number(sessionStorage.getItem('empid')));
  }, [open, empid, open10 , open30]);
  let tabs = [];

  //{commented out}
  tabs.push({
    label: 'Family Directory',
    component: (
      <FamilyDirListItem
        handleClose={handleClose}
        themeColor="#1a66ff"
        handleOpen4={handleOpen4}
        setopendashboard={setopendashboard}
      />
    ),
  });

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
  const handleOpen50 = (id) => {
    setdeleteId(id);
    setOpen30(true);
  };


  const handleClose50 = () => setOpen30(false);
  const handleClose4 = () => {
    setOpen30(false);
    serverInstance(`committee/delete-family?id=${deleteId}`, 'delete').then((res) => {
      if (res.data.status === true) {
        setOpen30(false);
        Swal.fire('Great!', res.data.message, 'success');
      }
      if (res.data.status === false) {
        setOpen30(false);
        Swal.fire('Great!', res.data.message, 'success');
      }
    });
  };
  return (
    <>
      <Dialog
        open={open30}
        onClose={handleClose5}
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
          <Button onClick={handleClose50}>Disagree</Button>
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

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open10}
        onClose={handleClose10}
        closeAfterTransition
      >
        <Fade in={open10}>
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
            <div>
              <UpdateFamiliy
                handleClose={handleClose10}
                themeColor="#1a66ff"
                handleOpen4={handleOpen10}
                setopendashboard={setopendashboard}
                updateData={dirUpdatedata}
              />
            </div>
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
                <button onClick={() => reset()}>Reset</button>
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

          <div className="table-div-maain" style={{ marginLeft: '1rem' }}>
            <Table
              sx={{ minWidth: 650, width: '100%' }}
              aria-label="simple table"
            >
              <TableHead style={{ background: '#FFEEE0' }}>
                <TableRow>
                  <TableCell style={{ width: '10%' }}>
                    Mobile
                    <i style={{ marginLeft: '0.5rem' }} class={`fa fa-sort`} />
                  </TableCell>

                  <TableCell>
                    Name
                    <i onClick={() => sortData('name')} class={`fa fa-sort`} />
                  </TableCell>
                  <TableCell style={{ width: '9rem' }}>
                    Father's
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortData('address')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>

                  <TableCell style={{ marginLeft: '0.5rem' }}>
                    Address
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortDataAmount('elecItemDetails')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>

                  <TableCell>
                    Age
                    <i
                      onClick={() => sortDataAmount('elecItemDetails')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell>
                    Aadhar_No.
                    <i
                      onClick={() => sortDataAmount('elecItemDetails')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell>
                    PAN_No.
                    <i
                      onClick={() => sortDataAmount('elecItemDetails')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell>
                    Email
                    <i
                      onClick={() => sortDataAmount('elecItemDetails')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell>
                    Sadsya
                    <i
                      onClick={() => sortDataAmount('elecItemDetails')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell>
                    DOB
                    <i
                      onClick={() => sortDataAmount('elecItemDetails')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell>
                    DOA
                    <i
                      onClick={() => sortDataAmount('elecItemDetails')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>

                  <TableCell>
                    Status
                    <i
                      onClick={() => sortDataAmount('elecItemDetails')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>

                  <TableCell>
                    Remark
                    <i
                      onClick={() => sortDataAmount('elecItemDetails')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>

                  <TableCell style={{ marginLeft: '1rem' }}>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {console.log(emplist)}
                {emplist && emplist?.map((row) => {

                  return (
                    <TableRow
                      key={row.id}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell>{row?.MobileNo}</TableCell>
                      <TableCell>{row?.Name}</TableCell>

                      <TableCell>{row?.FathersName}</TableCell>
                      <TableCell>{row?.Address}</TableCell>
                      <TableCell>{row?.Age}</TableCell>
                      <TableCell>{row?.AadharNo}</TableCell>
                      <TableCell>{row?.PanNo}</TableCell>
                      <TableCell>{row?.Email}</TableCell>
                      <TableCell>{row?.SadsyaType}</TableCell>

                      <TableCell>
                        {Moment(row?.DateOfBirth).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>
                        {Moment(row?.DateOfAnniversary).format('DD/MM/YYYY')}
                      </TableCell>

                      {/* <TableCell>
                        {Moment(row?.FromDate).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>
                        {Moment(row?.ToDate).format('DD/MM/YYYY')}
                      </TableCell> */}

                      <TableCell>
                        {row?.Status == '1' ? 'Active' : 'Disabled'}
                      </TableCell>

                      <TableCell> {row?.Remark}</TableCell>

                      <TableCell>
                        <Tooltip title="Edit">
                          <img
                            style={{ width: '20px', marginRight: '1rem' }}
                            onClick={() => handleOpen10(row)}
                            src={Edit}
                            alt=" Edit"
                          />
                        </Tooltip>

                        <Tooltip title="Delete">
                          <img
                            style={{ width: '20px' }}
                            onClick={() => handleOpen50(row?.id)}
                            src={Delete}
                            alt="Delete"
                          />
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
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

export default FamilyDirectory;
