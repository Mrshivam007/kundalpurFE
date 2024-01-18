import React, { useEffect, useState } from 'react';
import { serverInstance } from '../../../API/ServerInstance';
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
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import Print from '../../../assets/Print.png';
import ExportPdf from '../../../assets/ExportPdf.png';
import ExportExcel from '../../../assets/ExportExcel.png';
import Edit from '../../../assets/Edit.png';
import Delete from '../../../assets/Delete.png';


import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { backendApiUrl } from '../../../config/config';
// import { ExportPdfmanul } from '../../compoments/ExportPdf';
import LoadingSpinner1 from '../../../components/Loading/LoadingSpinner1';
import './UserDirectoryTab.css'
import TrustAddForm from './ListItem/TrustAddForm';
import Update from './ListItem/Update'

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

const colorTheme = {
  cash: '#48a828',
  electronic: '#e96d00',
  cheque: '#1C82AD',
  item: '#d6cb00',
};

const TrustRegistration = ({ setopendashboard }) => {
  let filterData;
  const [loader, setloader] = useState(false);
  const [empid, setempid] = useState('');
  const [emproleid, setemproleid] = useState('');
  const [roleid, setroleid] = useState('');
  const [open1, setOpen1] = useState(false)
  const [isData, setIsData] = React.useState([]);
  const [isDataDummy, setisDataDummy] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [open, setOpen] = React.useState(true);
  const [open3, setOpen3] = React.useState(false);

  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  
  const [open4, setOpen4] = useState(false);
  const [datefrom, setdatefrom] = useState('');
  const [dateto, setdateto] = useState('');
 
  const [open5, setOpen5] = React.useState(false);
  const [searchvalue, setsearchvalue] = useState('');

  const [updatedata, setupdatedata] = useState('')
  const [deleteId, setdeleteId] = useState('')

  const handleOpen5 = () => setOpen5(true);
  const handleClose5 = () => setOpen3(false);


  const handleOpen4 = () => {
    setOpen4(true);
  };

  const handleClose1 = () => setOpen1(false);

  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);

  const handleOpen = async () => {
   
    const role = Number(sessionStorage.getItem('userrole'));
    if (role === 1) {
      setOpen(true);
    }

    if (emproleid === 0) {
      setOpen(true);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClose = React.useCallback(() => setOpen(false), []);

  const navigation = useNavigate();


  const handleOpen1 = (data) => {
    setOpen1(true);
    setupdatedata(data);
  

  };


  const handleClickOpen3 = (id) => {
    setOpen3(true);
    setdeleteId(id);
  };

  const handleClose4 = () => {
    setOpen3(false);
    serverInstance(`trust/delete-trust?id=${deleteId}`, 'delete').then((res) => {
      if (res.data.status === true) {
        setOpen(false);
        Swal.fire('Great!', res.data.message, 'success');
      }
      if (res.data.status === false) {
        setOpen(false);
        Swal.fire('Great!', res.data.message, 'success');
      }
    });
  };

  const handleReset = () => {
    setdatefrom('');
    setdateto('');
  
  
    getTrustDetails();
  };
  

  const getTrustDetails = async () => {
    try {
      const url = datefrom && dateto
        ? `trust/get-trust?fromDate=${datefrom}&toDate=${dateto}`
        : 'trust/get-trust';
  
      const response = await serverInstance(url, 'get');
  
      if (response.status === true) {
        setIsData(response.data.sort((a, b) => a.id - b.id));
      } else {
        console.log(response?.msg);
      }
    } catch (err) {
      console.log(err);
      setloader(false);
    }
  };
  
  


  const filterdata = async (e) => {
    e.preventDefault();
    setloader(true);
    try {
      if (datefrom && dateto) {
        
        const response = await serverInstance(
          `trust/get-trust?fromDate=${datefrom}&toDate=${dateto}`,
          'get'
        );
        if (response.data) {
          setIsData(response.data);
          setloader(false)
        
        }
      }} catch (error) {
      setloader(false);
    }
  };

  useEffect(() => {
    if (sortConfig.key !== null) {
      const sortedData = [...isData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
      setIsData(sortedData);
    }
  }, [sortConfig]);


  useEffect(() => {

    getTrustDetails();
    setopendashboard(true);

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
        } catch (error) { }
      }
    }
  }, [open,open1, open3]);
  let tabs = [];

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
  //{commented out}

  {


    roleid === 1 && emproleid === 0 ? (
      <>
        {

          tabs.push(
            {
              label: 'Trust Details',
              component: (
                <TrustAddForm
                  handleClose={handleClose}
                  themeColor="#e6e600"
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
            label: 'Trust Details',
            component: (
              <TrustAddForm
                handleClose={handleClose}
                themeColor="#00BFFF"
                handleOpen4={handleOpen4}
               
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



  return (
    <>

      <Dialog
        open={open3}
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
          <Button onClick={handleClose5}>Disagree</Button>
          <Button onClick={handleClose4} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>


      <div>
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
                    themeColor={colorTheme}
                  />
                </Box>
              </Fade>
            </Modal>
          </>
        )}

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open1}
          onClose={handleClose1}
          closeAfterTransition
        >
          <Fade in={open1}>
            <Box sx={{
                    ...style,
                    width: {
                      xs: '90%',
                      sm: '70%',
                      md: '70%',
                    },
                  }}>
              <div>
                <div className="add-div-close-div">
                  <div>
                    <h2 style={{ marginBottom: '0.5rem', marginLeft: '1rem' }}>
                      Update Trust Type
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
                <Update setOpen={handleClose1} updatedata={updatedata}  themeColor="#e6e600"/>
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
                  <button onClick={handleReset}>Reset</button>
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
                sx={{ marginLeft: '1rem' }}
                aria-label="simple table"
              >

                <TableHead style={{ background: '#FFEEE0' }}>
                  <TableRow>
                  <TableCell>
                      S. No.

                      <i

                        style={{ marginLeft: '0.1rem' }}
                        class={`fa fa-sort`}
                      />
                    </TableCell>

                    <TableCell>
                      Trust Code

                      <i

                        style={{ marginLeft: '0.1rem' }}
                        class={`fa fa-sort`}
                      />
                    </TableCell>
                    <TableCell>

                      Trust Name

                      <i
                        style={{ marginLeft: '0.1rem' }}

                        class={`fa fa-sort`}
                      />

                    </TableCell>

                    <TableCell>
                      Main Trust Name
                      <i

                        style={{ marginLeft: '0.1rem' }}
                        class={`fa fa-sort`}
                      />
                    </TableCell>

                    <TableCell>
                      Trust Type
                      <i

                        style={{ marginLeft: '0.1rem' }}
                        class={`fa fa-sort`}
                      />
                    </TableCell>


                    <TableCell>
                      Phone Number
                      <i
                        class={`fa fa-sort`}
                        style={{ marginLeft: '0.1rem' }}
                      />
                    </TableCell>

                    <TableCell>
                      Email
                      <i
                        class={`fa fa-sort`}
                        style={{ marginLeft: '0.1rem' }}
                      />
                    </TableCell>

                    <TableCell>
                      Location<i

                        style={{ marginLeft: '0.1rem' }}
                        class={`fa fa-sort`}
                      />
                    </TableCell>

                    <TableCell>
                      Trust Address
                      <i
                        class={`fa fa-sort`}
                        style={{ marginLeft: '0.1rem' }}
                      />
                    </TableCell>

                      <TableCell>
                      State
                      <i
                        class={`fa fa-sort`}
                        style={{ marginLeft: '0.1rem' }}
                      />
                    </TableCell>

                    <TableCell>
                      City
                      <i
                        class={`fa fa-sort`}
                        style={{ marginLeft: '0.1rem' }}
                      />
                    </TableCell>

                    <TableCell>
                      Pincode
                      <i
                        class={`fa fa-sort`}
                        style={{ marginLeft: '0.1rem' }}
                      />
                    </TableCell>


                    <TableCell>
                      Bank Name
                      <i

                        style={{ marginLeft: '0.1rem' }}
                        class={`fa fa-sort`}
                      />
                    </TableCell>

                    <TableCell>
                      Account Details
                      <i

                        style={{ marginLeft: '0.1rem' }}
                        class={`fa fa-sort`}
                      />
                    </TableCell>

                    <TableCell>
                      IFSC Code
                      <i
                        class={`fa fa-sort`}
                        style={{ marginLeft: '0.1rem' }}
                      />
                    </TableCell>

                   

                    <TableCell>
                      Pan Number
                      <i
                        class={`fa fa-sort`}
                        style={{ marginLeft: '0.1rem' }}

                      />
                    </TableCell>

                    <TableCell>
                      GST
                      <i
                        class={`fa fa-sort`}
                        style={{ marginLeft: '0.1rem' }}
                      />
                    </TableCell>

                    <TableCell>
                      Date of Creation
                    </TableCell>

                    <TableCell>
                      Remark
                      <i
                        class={`fa fa-sort`}
                        style={{ marginLeft: '0.1rem' }}
                      />
                    </TableCell>

                    <TableCell>
                      Action
                      <i
                        class={`fa fa-sort`}
                        style={{ marginLeft: '0.1rem' }}
                      />
                    </TableCell>



                  </TableRow>
                </TableHead>
                <TableBody>

                  {isData && isData.map((item, index) => (
                    <TableRow key={index}>
                    <TableCell>{index+1}</TableCell>
                      <TableCell>{item?.TrustCode}</TableCell>
                      <TableCell>{item?.TrustName}</TableCell>
                      <TableCell>{item?.MainTrustName}</TableCell>
                      <TableCell>{item?.TrustType}</TableCell>
                      <TableCell>{item?.MobileNo}</TableCell>
                      <TableCell>{item?.Email}</TableCell>
                      <TableCell>{item?.Location}</TableCell>
                      <TableCell>{item?.TrustAddress}</TableCell>
                      <TableCell>{item?.State}</TableCell>
                      <TableCell>{item?.City}</TableCell>
                      <TableCell>{item?.PinCode}</TableCell>
                      <TableCell>{item?.NameOfBank}</TableCell>
                      <TableCell>{item?.AccountDetails}</TableCell>
                      <TableCell>{item?.IFSC_Code}</TableCell>
                      <TableCell>{item?.PAN_Number}</TableCell>
                      <TableCell>{item?.GST}</TableCell>
                      <TableCell>{item?.Date}</TableCell>
                      <TableCell>{item?.Remark}</TableCell>
                      <TableCell>
                        <Tooltip title="Edit">
                          <img
                            onClick={() => handleOpen1(item)}
                            src={Edit}
                            alt="Edit"
                            style={{ width: '20px', marginRight: '0.5rem' }}
                          />
                        </Tooltip>

                        <Tooltip title="Delete">
                          <img
                            onClick={() => handleClickOpen3(item?.id)}
                            src={Delete}
                            alt="Delete"
                            style={{ width: '20px' }}
                          />
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
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
        </div>
      </div>
      {loader && <LoadingSpinner1 />}
    </>
  );
};

export default TrustRegistration;
