import React, { useEffect, useRef, useState } from "react";


import Tooltip from "@mui/material/Tooltip";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from "@mui/material/TablePagination";
import { Box, Button, Input } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Print from '../../../../../../../../assets/Print.png';
import ExportPdf from '../../../../../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../../../../../assets/ExportExcel.png';
import { Select } from "@mui/material";
import Swal from "sweetalert2";
import { serverInstance } from "../../../../../../../../API/ServerInstance";


import { backendUrl } from "../../../../../../../../config/config";
import Edit from '../../../../../../../../assets/Edit.png';
import Delete from '../../../../../../../../assets/Delete.png';
import LoadingSpinner1 from "../../../../../../../../components/Loading/LoadingSpinner1";

import { MenuItem } from '@mui/material'
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Add from "../Add/Add";
import UpdateEmployee from '../Add/UpdateEmployee'

const Tabl = React.memo(() => {

  const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    p: 2,
    boxShadow: 24,
    borderRadius: '5px',
  };

  const [deptList, setDeptList] = useState('')
  const [isData, setIsData] = useState('')
  const [loader, setLoader] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);
  const [deleteId, setDeleteId] = useState('')
  const [openDelete, setOpenDelete] = useState('')
  const [openEdit, setOpenEdit] = useState(false)
  const [updateData, setUpdateData] = useState('')

  const [searchEmployeeId, setSearchEmployeeId] = useState('');
  const [searchEmployeeName, setSearchEmployeeName] = useState('');
  const [searchDepartment, setSearchDepartment] = useState('');

  const [selectedImage, setSelectedImage] = useState(null);



  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });


  const handleDeleteClose = () => {
    setOpenDelete(false)
  }

  const handleDelete = (id) => {
    setOpenDelete(true);
    setDeleteId(id);
  }

  const handleEdit = (data) => {
    setOpenEdit(true);
    setUpdateData(data);
  };

  const handleClose1 = () => setOpenEdit(false);


  const getEmployee = async () => {

    try {

      serverInstance('hr/get-employee', 'get').then((res) => {
        if (res.data) {
          setIsData(res.data.sort((a, b) => a.id - b.id));

        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  const getDepartment = () => {
    serverInstance('admin/get-department', 'get').then((res) => {
      if (res.status) {
        setDeptList(res.data);

      } else {
        Swal.fire('Error', 'something went  wrong', 'error');
      }
    });
  };

  const deleteEmployee = () => {

    try {

      serverInstance(`hr/delete-employee?id=${deleteId}`, 'delete').then((res) => {
        console.log(res)
        if (res.status === true) {
          handleDeleteClose()
          Swal.fire('Deleted!', res.message, 'success');
        }
        if (res.status === false) {
          handleDeleteClose()
          Swal.fire('Error!', res.message, 'failed');

        }
      })
    } catch (err) {
      console.log(err)
      setLoader(false);
    }

  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 25));

    setPage(0);
  };

  const handleAddLeave = () => {

    getEmployee();
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
    getEmployee();
    getDepartment();

  }, [openDelete, openEdit]);




  useEffect(() => {
    getEmployee();
  }, [])


  return (
    <>

      <div className="selecttabcontainer1" style={{ marginLeft: '4rem', display: 'flex', justifyContent: 'start' }}>



        <Input
          type="text"
          value={searchEmployeeId}
          onChange={(e) => setSearchEmployeeId(e.target.value)}
          placeholder="Search by Employee ID"
        />

        <Input
          type="text"
          value={searchEmployeeName}
          onChange={(e) => setSearchEmployeeName(e.target.value)}
          placeholder="Search by Employee Name"
        />


        <Select
          sx={{
            width: '18rem',
            height: '2rem',
            borderRadius: '0.5rem',
            fontSize: 14,
            '& .MuiSelect-select': {
              padding: '1px',
            },
          }}
          value={searchDepartment}
          onChange={(e) => setSearchDepartment(e.target.value)}
          displayEmpty
        >

          <MenuItem displayEmpty value="">
            Show all Department
          </MenuItem>

          {deptList && deptList?.map((item, index) => {
            return (
              <MenuItem
                sx={{
                  fontSize: 14,
                }}
                key={item.id}
                value={item?.departmentName_hi}

              >
                {item?.departmentName_hi}



              </MenuItem>
            )
          })}

        </Select>


      </div>

      <div className=''>


        <div
          className="search-header-print"
          style={{
            borderBottom: '1px  solid gray',
            width: '100%',
            borderTop: ' 1px solid gray',
            paddingTop: '1%',
            marginTop: '1%'
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

          <Add addLeaveCallback={handleAddLeave} />

          &nbsp;&nbsp;
        </div>
      </div>

      <Dialog
        open={openDelete}
        onClose={handleDeleteClose}
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
          <Button onClick={handleDeleteClose}>Disagree</Button>
          <Button onClick={deleteEmployee} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openEdit}
        onClose={handleClose1}
        closeAfterTransition
      >
        <Fade in={openEdit}>
          <Box sx={style}>
            <div>
              <div className="add-div-close-div">
                <div >
                  <h2 style={{ marginBottom: '0.5rem', marginLeft: '1rem' }}>
                    Update Employee Details
                  </h2>
                  {/* <Typography variant="body2" color="primary" align="right" style={{ padding: '1rem' }}>
                        {currDate} / {currTime}
                      </Typography> */}
                </div>
                <IconButton>
                  <CloseIcon onClick={() => handleClose1()} />
                </IconButton>
              </div>
              <UpdateEmployee setOpen={handleClose1} updatedata={updateData} />

            </div>
          </Box>
        </Fade>
      </Modal>

      <div style={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>

              <TableCell>Sn</TableCell>
              <TableCell>Employee ID</TableCell>
              <TableCell>Contact No.</TableCell>
              <TableCell>Employee Name</TableCell>
              {/* <TableCell>Employee Hindi Name</TableCell> */}
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>

              <TableCell>State</TableCell>
              <TableCell>Email ID</TableCell>
              <TableCell>Aadhar No.</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Joining Date</TableCell>

              <TableCell>Employee Salary</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Employee Type</TableCell>
              
              <TableCell>Employee Status</TableCell>
              <TableCell>Deactive Date</TableCell>
              <TableCell>Bank Name</TableCell>
              <TableCell>Bank Branch</TableCell>
              <TableCell>Bank IFSC Code</TableCell>
              <TableCell>Account Number</TableCell>
              <TableCell>Account Holder Name</TableCell>
              {/* <TableCell>Employee Photo</TableCell> */}



              <TableCell className="sticky-col first-col" id="acts">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isData && isData.filter((item) => {
              const matchesEmployeeId = item?.employeeID.includes(searchEmployeeId);
              const matchesEmployeeName = item.employeeName.toLowerCase().includes(searchEmployeeName.toLowerCase());
              const matchesDepartment = item.department.toLowerCase().includes(searchDepartment.toLowerCase());
              return matchesEmployeeId && matchesEmployeeName && matchesDepartment;
            }).slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )
              .map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item?.employeeID}</TableCell>
                  <TableCell>{item?.ContactNo}</TableCell>
                  <TableCell>{item?.employeeName}</TableCell>
                  {/* <TableCell>{item?.hi_name}</TableCell> */}
                  <TableCell>{item?.address}</TableCell>
                  <TableCell>{item?.city}</TableCell>
                  <TableCell>{item?.state}</TableCell>
                  <TableCell>{item?.Email}</TableCell>
                  <TableCell>{item?.AadharNo}</TableCell>
                  <TableCell>{item?.department}</TableCell>
                  <TableCell>{item?.joiningDate}</TableCell>


                  <TableCell>{item?.employeeSalary}</TableCell>
                  <TableCell>{item?.designation}</TableCell>
                  <TableCell>{item?.employeeType}</TableCell>
                  <TableCell>{item?.employeeStatus}</TableCell>
                  <TableCell>{item?.deactiveDate}</TableCell>
                  <TableCell>{item?.BankName}</TableCell>
                  <TableCell>{item?.BankBranch}</TableCell>
                  <TableCell>{item?.IFSC_Code}</TableCell>
                  <TableCell>{item?.AccountNo}</TableCell>
                  <TableCell>{item?.AccountHolderName}</TableCell>

                  {/* {selectedImage && (
                    <Modal
                      open={selectedImage}
                      onClose={() => setSelectedImage(null)}
                    >
                      <div style={style}>
                        <img
                          src={selectedImage}
                          alt="Selected Employee Photo"
                          style={{ width: '100%' }}
                        />
                      </div>
                    </Modal>
                  )}

                  {console.log(item?.employeePhoto)}
                  <TableCell>
                    {item?.employeePhoto && (
                      <img
                        src={`${backendUrl}images/${item?.employeePhoto}`}
                        alt={`Employee Photo of ${item?.en_name}`}
                        style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                        onClick={() =>
                          setSelectedImage(`${backendUrl}images/${item?.employeePhoto}`)
                        }
                      />
                    )}
                  </TableCell> */}

                  <TableCell>
                    <Tooltip title="Edit">
                      <img
                        onClick={() => handleEdit(item)}
                        src={Edit}
                        alt="Edit"
                        style={{ width: '20px', marginRight: '0.5rem' }}
                      />
                    </Tooltip>

                    <Tooltip title="Delete">
                      <img
                        onClick={() => handleDelete(item?.id)}
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
                rowsPerPageOptions={[25, 50, 100]}
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
      {loader && <LoadingSpinner1 />}
    </>
  );
})


export default Tabl