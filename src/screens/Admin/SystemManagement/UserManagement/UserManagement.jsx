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
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Adduser from './Adduser/Adduser';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import UpdateEmployee from './Adduser/UpdateEmployee';
import ExportPdf from '../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../assets/ExportExcel.png';
import Edit from '../../../../assets/Edit.png';
import eye from '../../../../assets/eye.png';
import Delete from '../../../../assets/Delete.png';
import exportFromJSON from 'export-from-json';
import Tooltip from '@mui/material/Tooltip';
import Moment from 'moment-js';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';
import SystemTap from '../SystemTap';
import LoadingSpinner1 from '../../../../components/Loading/LoadingSpinner1';
import './UserManagement.css';

const style = {
  position: 'absolute',
  top: '48%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: '#FFFFFF',
  borderRadius: '15px',
  bgcolor: 'background.paper',
  p: 1,
  boxShadow: 24,
};

const UserManagement = ({ setopendashboard }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isDataDummy, setisDataDummy] = React.useState([]);
  const [isData, setisData] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [open, setOpen] = React.useState(false);
  const [refetch, setrefetch] = useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [deleteId, setdeleteId] = useState('');
  const [empdata, setempdata] = useState('');
  const [open3, setOpen3] = React.useState(false);
  const [name, setname] = useState('');
  const [phoneno, setphoneno] = useState('');
  const handleClickOpen3 = (data) => {
    setOpen3(true);
    setempdata(data);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };
  const handleClickOpen1 = (id) => {
    setOpen1(true);
    setdeleteId(id);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClose2 = () => {
    setOpen1(false);
    serverInstance(`admin/add-employee?id=${deleteId}`, 'delete').then(
      (res) => {
        if (res.status === true) {
          Swal.fire('Great!', 'User delete successfully', 'success');
          setrefetch(true);
        } else {
          Swal('Error', 'somthing went  wrong', 'error');
        }
        console.log(res);
      },
    );
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getall_donation = () => {
    setIsLoading(true);
    setname('');
    setphoneno('');
    serverInstance('admin/add-employee', 'get').then((res) => {
      if (res.status) {
        setisData(res.data);
        setisDataDummy(res.data);
        setIsLoading(false);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
        setIsLoading(false);
      }
      console.log(res);
    });
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
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const ExportToExcel = () => {
    const fileName = 'EmployeeList';
    const exportType = 'xls';
    var data = [];

    isData.map((item, index) => {
      data.push({
        userid: item?.id,
        Username: item?.Username,
        Email: item?.Email,
        'Phone No': item?.Mobile,
        Role: item?.Role,
        Address: item?.Address,

        'Created Date': Moment(item?.created_at).format('DD-MM-YYYY'),
      });
    });

    exportFromJSON({ data, fileName, exportType });
  };

  const ExportPdfmanul = (fileName) => {
    const doc = new jsPDF();

    const tableColumn = [
      'Userid',
      'UserName',
      'Email',
      'Phone No',
      'Role',
      'Address',
    ];

    const tableRows = [];

    isData.forEach((item) => {
      const ticketData = [
        item?.id,
        item?.Username,
        item?.Email,
        item?.Mobile,
        item?.Role,
        item?.Address,
      ];

      tableRows.push(ticketData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    const date = Date().split(' ');

    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

    doc.text(`Report of ${fileName}`, 8, 9);
    doc.setFont('Lato-Regular', 'normal');
    doc.setFontSize(28);
    doc.save(`${fileName}_${dateStr}.pdf`);
  };
  const onSearchByOther = (e, type) => {
    if (type === 'name') {
      setname(e.target.value.toLowerCase());
    }
    if (type === 'phone') {
      setphoneno(e.target.value.toLowerCase());
    }
  };
  const filterdata = (e) => {
    e.preventDefault();
    var filtered = isDataDummy?.filter(
      (dt) =>
        dt?.Mobile.toLowerCase().indexOf(phoneno) > -1 &&
        dt?.Username.toLowerCase().indexOf(name) > -1,
    );
    setisData(filtered);
  };

  useEffect(() => {
    setopendashboard(true);
    getall_donation();
  }, [open, open1, open3]);
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
      <Dialog
        open={open1}
        onClose={handleClose1}
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
          <Button onClick={handleClose1}>Disagree</Button>
          <Button onClick={handleClose2} autoFocus>
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
          <Box sx={style}>
            <div>
              <div className="add-div-close-div-user-add">
                <div>
                  <h2 clssName="add_text_only"> Add Employee</h2>
                  <Typography
                    style={{ marginTop: '0.5rem' }}
                    variant="body2"
                    color="primary"
                    align="right"
                  >
                    {currDate} / {currTime}
                  </Typography>
                </div>
                <IconButton>
                  <CloseIcon onClick={() => handleClose()} />
                </IconButton>
              </div>

              <Adduser setOpen={setOpen} />
            </div>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open3}
        onClose={handleClose3}
        closeAfterTransition
      >
        <Fade in={open3}>
          <Box sx={style}>
            <div>
              <div className="add-div-close-div-user-add">
                <div>
                  <h2 clssName="add_text_only"> Update Employee</h2>
                  <Typography
                    style={{ marginTop: '0.5rem' }}
                    variant="body2"
                    color="primary"
                    align="right"
                  >
                    {currDate} / {currTime}
                  </Typography>
                </div>
                <IconButton>
                  <CloseIcon onClick={() => handleClose3()} />
                </IconButton>
              </div>

              <UpdateEmployee setOpen={setOpen3} empdata={empdata} />
            </div>
          </Box>
        </Fade>
      </Modal>
      <SystemTap setopendashboard={setopendashboard} />
      <div style={{ marginLeft: '5rem', marginRight: '1rem' }}>
        <div className="search-header-employee">
          <div className="search-inner-div">
            <form className="search-inner-div" onSubmit={filterdata}>
              <input
                type="text"
                value={name}
                placeholder="Name"
                onChange={(e) => onSearchByOther(e, 'name')}
              />
              <input
                type="text"
                placeholder="Phone No"
                onChange={(e) => onSearchByOther(e, 'phone')}
              />

              <button>Search</button>
            </form>

            <button onClick={() => getall_donation()}>Reset</button>
            <button onClick={() => handleOpen()}>+Add</button>
            <Tooltip title="Export Excel File">
              <img
                onClick={() => ExportToExcel()}
                src={ExportExcel}
                style={{ width: '30px', marginRight: '0.2rem' }}
              />
            </Tooltip>
            <Tooltip title="Export Pdf File">
              <img
                onClick={() => ExportPdfmanul('Employee_list')}
                src={ExportPdf}
                style={{ width: '30px', marginRight: '0.2rem' }}
              />
            </Tooltip>
          </div>
        </div>

        <div>
          <div className="table-div-maain">
            <Table
              sx={{ minWidth: 650, width: '100%' }}
              aria-label="simple table"
            >
              <TableHead style={{ background: '#F1F0F0' }}>
                <TableRow>
                  <TableCell>Sr No.</TableCell>
                  <TableCell>
                    Mobil
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortData('Mobile')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell>
                    Username
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortData('Username')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell>
                    Address
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortData('Address')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell>
                    Email
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortData('Email')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  {/* <TableCell>
                    Role
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortData('Role')}
                      class={`fa fa-sort`}
                    />
                  </TableCell> */}
                  <TableCell>
                    Status
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortData('Status')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell>
                    Action <Button>&nbsp;</Button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isData ? (
                  <>
                    {(rowsPerPage > 0
                      ? isData
                          .reverse()
                          .slice(
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
                        <TableCell> {row?.Mobile}</TableCell>
                        <TableCell>{row?.Username}</TableCell>
                        <TableCell> {row?.Address}</TableCell>
                        <TableCell>{row?.Email}</TableCell>
                        {/* <TableCell>{row.Role}</TableCell> */}
                        <TableCell>
                          {row.Status ? 'Active' : 'De-Active'}
                        </TableCell>

                        <TableCell>
                          <Tooltip title="View Details">
                            <img
                              onClick={() =>
                                navigate(
                                  '/admin-panel/masters/employeeUserInfo',
                                  {
                                    state: {
                                      userdata: row,
                                    },
                                  },
                                )
                              }
                              src={eye}
                              style={{ width: '20px', marginRight: '0.2rem' }}
                            />
                          </Tooltip>
                          <Tooltip title="Edit Employee">
                            <img
                              onClick={() => handleClickOpen3(row)}
                              src={Edit}
                              style={{ width: '20px', marginRight: '0.2rem' }}
                            />
                          </Tooltip>
                          <Tooltip title="Delete Employee">
                            <img
                              onClick={() => handleClickOpen1(row?.id)}
                              src={Delete}
                              style={{ width: '20px', marginRight: '0.2rem' }}
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
                    rowsPerPageOptions={[50, 100, 250]}
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
      {isLoading ? <LoadingSpinner1 /> : <></>}
    </>
  );
};

export default UserManagement;
