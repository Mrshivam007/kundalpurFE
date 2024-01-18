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
import CloseIcon from '@mui/icons-material/Close';
import UnderlinedTab from './common/UnderlinedTab';
import SODListItem from './ListItem/SODListItem';


import DownloadIcon from '@mui/icons-material/Download';
import ClearIcon from '@mui/icons-material/Clear';
import Print from '../../../../../assets/Print.png';
import ExportPdf from '../../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../../assets/ExportExcel.png';
import exportFromJSON from 'export-from-json';
import CircularProgress from '@mui/material/CircularProgress';

import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { backendApiUrl } from '../../../../../config/config';
// import { ExportPdfmanul } from '../../compoments/ExportPdf';
import LoadingSpinner1 from '../../../../../components/Loading/LoadingSpinner1';
import './SODTab.css'


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
  const [emproleid, setemproleid] = useState('');
  const [roleid, setroleid] = useState('');
  const [userrole ,setuserrole] = useState('')
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

 
  const handleOpen5 = () => setOpen5(true);
  const handleClose5 = () => setOpen5(false);

  const handleOpen4 = () => {
    setOpen4(true);
  };

  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);

  const handleOpen = async () => {
  
    setOpen(true);


    console.log("clicked",open);
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
        axios.defaults.headers.get[
          'Authorization'
        ] = `Bearer ${sessionStorage.getItem('token')}`;

        const res = await axios.get(
          `${backendApiUrl}admin/search-electric?search=${searchvalue}`,
        );

        if (res.data.status) {
          setloader(false);
          if (emproleid === 7) {
            filterData = res.data.data.filter(
              (item) => item.isActive === true && item.created_by === empid,
            );
          } else {
            setloader(false);
            filterData = res.data.data.filter((item) => item.isActive === true);
          }
          setisData(filterData);
          setisDataDummy(filterData);
        }
      } else {
        serverInstance(
          `user/searchAllDonation?fromDate=${datefrom}&toDate=${dateto}&fromVoucher=${voucherfrom}&toVoucher=${voucherto}',
          'get`,
        ).then((res) => {
          if (res.data) {
            if (emproleid === 7) {
              filterData = res.data.data.filter(
                (item) => item.isActive === true && item.created_by === empid,
                setloader(false),
              );
            } else {
              filterData = res.data.data.filter(
                (item) => item.isActive === true,
              );
              setloader(false);
            }
            setisData(filterData);
            setisDataDummy(filterData);
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
  
  }, [open, empid]);
  let tabs = [];


  //{commented out}

  {
  
   console.log(emproleid)
  
    userrole === 3 && emproleid === 10 ? (
      <>
        {
          
          tabs.push(
          {
            label: 'Special Occasion Members',
            component: (
              <SODListItem
                handleClose={handleClose}
                themeColor="#1a66ff" 
                handleOpen4={handleOpen4}
                
                setopendashboard={setopendashboard}
              
              />
            ),
          },
        )}
      </>
    ) : (
      <>
        {tabs.push(
          {
            label: 'Special Occasion Members',
            component: (
              <SODListItem
                handleClose={handleClose}
                themeColor="#1a66ff" 
                handleOpen4={handleOpen4}
                // getall_donation={getall_donation}
                setopendashboard={setopendashboard}
                // receiptNo={receiptNo}
                // donationTypes={donationTypes}
              />
            ),
          },
        )}
      </>
    );
  }

  
  

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
     

      {userrole && (
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

          <div className="table-div-maain" style={{marginLeft:'1rem'}}>
            <Table
              sx={{ minWidth: 650, width: '100%'}}
              aria-label="simple table"
            >
              <TableHead style={{ background: '#FFEEE0' }}>
                <TableRow>
                  <TableCell style={{width:'10%'}}>
                    Phone Number
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell style={{marginLeft:'1rem'}}>
                    Full Name
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      
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
                    Address
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortData('name')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell style={{width:'10%'}}>
                 Sadsya Type
                    <i
                      style={{ marginLeft: '0.5rem'}}
                      onClick={() => sortData('address')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                 
                  <TableCell style={{marginLeft:'0.5rem'}}>
                   Date of Birth
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortDataAmount('elecItemDetails')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell style={{marginLeft:'0.5rem'}}>
                   Date of Anniversary
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortDataAmount('elecItemDetails')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>

                  <TableCell style={{marginLeft:'0.5rem'}}>
                   Date of Occasion
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortDataAmount('elecItemDetails')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell style={{marginLeft:'1rem'}}>
                    Puny Tithi
                    <i
                      style={{ marginLeft: '0.5rem'}}
                      onClick={() => sortData('address')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell style={{marginLeft:'1rem'}}>
                   Status
                   <i
                      style={{ marginLeft: '0.5rem'}}
                      onClick={() => sortData('address')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell style={{marginLeft:'1rem'}}>
                   Remark
                   <i
                      style={{ marginLeft: '0.5rem'}}
                      onClick={() => sortData('address')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell style={{marginLeft:'0.5rem'}}>
                   Action
                   
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
              

                <TableRow>
                  <TableCell>1</TableCell>
                </TableRow>
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
