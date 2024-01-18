import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { serverInstance } from '../../../../API/ServerInstance';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { backendApiUrl } from '../../../../config/config';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Swal from 'sweetalert2';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import activate from '../../../../assets/activate.png';
import deacivate from '../../../../assets/deacivate.png';
import ExportExcel from '../../../../assets/ExportExcel.png';
import ExportPdf from '../../../../assets/ExportPdf.png';
import Edit from '../../../../assets/Edit.png';
import eye from '../../../../assets/eye.png';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Updateuser from './Updateuser';
import Userinfo from './Userinfo';
import CircularProgress from '@material-ui/core/CircularProgress';
import LoadingSpinner1 from '../../../../components/Loading/LoadingSpinner1';

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  bgcolor: 'background.paper',
  background: '#FFFFF',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
};
import './UserMaster.css';

function UserMaster() {
  const [loader, setloader] = useState(false);
  const [isData, setisData] = React.useState([]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [password, setpassword] = useState('');
  const [refetch, setrefetch] = useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [userdata, setuserdata] = useState('');
  const [manageActivation, setmanageActivation] = useState(false);
  const [searchName, setsearchName] = useState('');
  const [searchPhonne, setsearchPhonne] = useState('');
  const [showloader, setshowloader] = useState(false);
  let status;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpen1 = (data) => {
    setOpen1(true);
    setuserdata(data);
  };
  const handleClose1 = () => setOpen1(false);

  const handleOpen2 = (data) => {
    setOpen2(true);
    setuserdata(data);
  };
  const handleClose2 = () => setOpen2(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setshowloader(true);
      const { data } = await axios.post(`${backendApiUrl}user/create-account`, {
        fullname: name,
        mobileno: phone,
        email: email,
        password: password,
      });
      if (data.status === true) {
        setshowloader(false);
        Swal.fire('Great!', 'User Added Successfully', 'success');
        handleClose();
        setemail('');
        setpassword('');
        setname('');
        setphone('');
      }
    } catch (error) {
      Swal.fire('Error!', error.response.data.message, 'error');
      handleClose();
    }
  };

  const getall_users = () => {
    setloader(true);
    setsearchName('');
    setsearchPhonne('');
    serverInstance('admin/get-users', 'get').then((res) => {
      if (res.status) {
        setisData(res.data);
        setloader(false);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
    });
  };

  const deacivateAndactivateuser = (id) => {
    if (!manageActivation) {
      status = 0;
    } else {
      status = 1;
    }

    setmanageActivation(!manageActivation);
    try {
      serverInstance(
        `admin/change-status-users?id=${id}&status=${status}`,
        'get',
      ).then((res) => {
        console.log('res', res);
        if (res.status) {
          setrefetch(!refetch);
          Swal.fire(
            'Great!',
            !manageActivation ? 'User Deactivate' : 'User Activate',
            'User Activate',
          );
          setrefetch(!refetch);
        }
      });
    } catch (error) {
      Swal('Error', error, 'error');
    }
  };

  const filterdata = async (e) => {
    try {
      e.preventDefault();
      setloader(true);
      serverInstance(
        `admin/get-users?phone=${searchPhonne}&name=${searchName}`,
        'get',
      ).then((res) => {
        if (res?.data) {
          setloader(false);
          setisData(res.data);
        }
      });
    } catch (error) {
      Swal('Error', error, 'error');
      setloader(false);
    }
  };
  useEffect(() => {
    getall_users();
  }, [refetch, open]);
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
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <div>
              <form onSubmit={handlesubmit}>
                <div className="add-div-close-div">
                  <h2 clssName="add_text_only">Add New User</h2>
                  <CloseIcon onClick={() => handleClose()} />
                </div>

                <div className="flex_div_main_add_user">
                  <div className="main-input-div1">
                    <div className="inner-input-divadd">
                      <label htmlFor="name">Full name</label>
                      <input
                        id="name"
                        text="text"
                        required
                        name="name"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                      />
                    </div>
                    <div className="inner-input-divadd">
                      <label htmlFor="phone">Mobile Number</label>
                      <input
                        type="text"
                        id="phone"
                        required
                        name="phone"
                        value={phone}
                        onChange={(e) => setphone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="main-input-div1">
                    <div className="inner-input-divadd">
                      <label htmlFor="email">Email</label>
                      <input
                        text="text"
                        id="email"
                        required
                        name="email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                      />
                    </div>
                    <div className="inner-input-divadd">
                      <label htmlFor="password">Password</label>
                      <input
                        text="password"
                        id="password"
                        required
                        name="password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="save-div-btn">
                  <button className="save-div-btn-btn">
                    {showloader ? (
                      <CircularProgress
                        style={{
                          width: '21px',
                          height: '21px',
                          color: '#FE7600',
                        }}
                      />
                    ) : (
                      'Add User'
                    )}
                  </button>
                  <button
                    onClick={() => handleClose()}
                    className="save-div-btn-btn-cancel"
                  >
                    Cancel
                  </button>
                </div>
              </form>
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
            <Updateuser userdata={userdata} handleClose={handleClose1} />
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open2}
        onClose={handleClose2}
        closeAfterTransition
      >
        <Fade in={open2}>
          <Box sx={style}>
            <Userinfo userdata={userdata} handleClose={handleClose2} />
          </Box>
        </Fade>
      </Modal>

      <div>
        <hr style={{ color: '#e96d00' }} />
        <div className="search-header" style={{ marginTop: '1rem' }}>
          <div className="search-inner-div">
            <form className="search-inner-div" onSubmit={filterdata}>
              <input
                type="text"
                placeholder="Name"
                value={searchName}
                name="searchName"
                onChange={(e) => setsearchName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Phone No"
                value={searchPhonne}
                name="searchPhonne"
                onChange={(e) => setsearchPhonne(e.target.value)}
              />
              <Tooltip title="Search">
                <button>Search</button>
              </Tooltip>
            </form>

            <Tooltip title="Get all donator">
              <button onClick={() => getall_users()}>Reset</button>
            </Tooltip>

            <Tooltip title="Add new donator">
              <button onClick={handleOpen}>+Add</button>
            </Tooltip>
            <div>
              <Tooltip title="Export Excel file">
                <img
                  style={{ width: '25px', marginLeft: '1rem' }}
                  src={ExportExcel}
                  alt=" Print"
                />
              </Tooltip>
              <Tooltip title="Export Pdf file">
                <img
                  style={{ width: '25px', marginLeft: '1rem' }}
                  src={ExportPdf}
                  alt=" Print"
                />
              </Tooltip>
            </div>
          </div>
        </div>
        <hr style={{ color: '#e96d00' }} />

        <div className="table-div-maain">
          <Table
            sx={{ minWidth: 650, width: '100%' }}
            aria-label="simple table"
          >
            <TableHead style={{ background: '#F1F0F0' }}>
              <TableRow>
                <TableCell>Sn</TableCell>
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
                  Contact No
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('mobileNo')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Email-Id
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('email')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Status
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('status')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
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
                  <TableCell>{index + 1}</TableCell>

                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.address ? row.address : '-'}</TableCell>
                  <TableCell>{row.mobileNo}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    {row.status === true ? 'Avtive' : 'Deactivate'}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="View Details">
                      <img
                        onClick={() => handleOpen2(row)}
                        style={{ width: '20px', marginRight: '0.8%' }}
                        src={eye}
                        alt=" Print"
                      />
                    </Tooltip>
                    <Tooltip title="Edit Donator">
                      <img
                        onClick={() => handleOpen1(row)}
                        style={{ width: '20px', marginRight: '0.3%' }}
                        src={Edit}
                        alt=" Print"
                      />
                    </Tooltip>

                    {row.status === true ? (
                      <Tooltip title="Donator deactivated">
                        <img
                          src={deacivate}
                          alt="deacivate"
                          className="activate-icon"
                          onClick={() => deacivateAndactivateuser(row.id)}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Donator active">
                        <img
                          src={activate}
                          alt="deacivate"
                          className="activate-icon"
                          onClick={() => deacivateAndactivateuser(row.id)}
                        />
                      </Tooltip>
                    )}
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
                  rowsPerPageOptions={[50, 100, 250, 300]}
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
}

export default UserMaster;
