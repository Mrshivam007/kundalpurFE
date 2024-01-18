
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { Tooltip } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from "@mui/material/TablePagination";
import Swal from "sweetalert2";
import Edit from '../../../../../../../../assets/Edit.png';
import Delete from '../../../../../../../../assets/Delete.png';
import { serverInstance } from "../../../../../../../../API/ServerInstance";
import { IconButton } from "@mui/material";

import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box'

import Print from '../../../../../../../../assets/Print.png';
import ExportPdf from '../../../../../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../../../../../assets/ExportExcel.png';

import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import { Select, Input, MenuItem } from "@mui/material";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "@mui/material/Button";
// import './Tabl.css'
import UpdateAttd from "../Add/UpdateAttd";
import Add from "../Add/Add";

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

const Table2 = () => {

  const [deptList, setDeptList] = useState('')
  const [isData, setIsData] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  const [deleteId, setDeleteId] = useState('')
  const [openDelete, setOpenDelete] = useState(false)
  const [updateData, setupdatedata] = useState('')
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDepartment, setSearchDepartment] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [page, setPage] = useState(0);

  const handleDelete = (id) => {
    setOpenDelete(true);
    setDeleteId(id);
  }

  const handleDeleteClose = () => {
    setOpenDelete(false)
  }

  const handleClose1 = () => setOpenEdit(false);
  const [openEdit, setOpenEdit] = useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));

    setPage(0);
  };

  const deleteEmpAttd = () => {

    try {

      serverInstance(`hr/delete-employeeAttendance?id=${deleteId}`, 'delete').then((res) => {
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
    }

  };

  const getDepartment = () => {
    serverInstance('admin/get-department', 'get').then((res) => {
      if (res.status) {
        setDeptList(res.data);

      } else {
        Swal.fire('Error', 'something went  wrong', 'error');
      }
    });
  };


  const getEmpAttendance = () => {
    serverInstance('hr/get-employeeAttendance', 'get').then((res) => {
      if (res.status) {
        setIsData(res.data.sort((a, b) => a.id - b.id));
      } else {
        console.log('Cant get empAtd ')
      }
    })
  }



  const handleAddAttd = () => {

    getEmpAttendance();
  };

  const handleEdit = (data) => {
    setOpenEdit(true);
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
    getDepartment();
    getEmpAttendance()
  }, [openDelete, openEdit])

  return (
    <>

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
          <Button onClick={deleteEmpAttd} autoFocus>
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
                <div>
                  <h2 style={{ marginBottom: '0.5rem', marginLeft: '1rem' }}>
                    Update Employee Attendance
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
              <UpdateAttd setOpen={handleClose1} updatedata={updateData} />

            </div>
          </Box>
        </Fade>
      </Modal>

      <div className='mainComponent'>
        <div className="selecttabcontainer1" style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '2rem' }}>


          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Employee ID"
          />
          {/* {console.log(deptList)} */}
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

                  src={ExportExcel}
                  alt="cc"
                  style={{ width: '30px', marginLeft: '0rem' }}
                />
              </IconButton>
            </Tooltip>

            <Tooltip title="Export Pdf File">
              <IconButton>
                <img

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


            <Add addAttdCallback={handleAddAttd} />

            &nbsp;&nbsp;
          </div>
        </div>
      </div>

      <div className="wrapper_abc">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S. No.</TableCell>
              <TableCell>Employee Id</TableCell>
              <TableCell>Employee Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>In Time</TableCell>
              <TableCell>Out Time</TableCell>
              <TableCell>Total Hours</TableCell>
              <TableCell>Remark</TableCell>

              <TableCell className="sticky-col first-col" id="acts">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {isData && isData
              .filter((item) => {
                const matchesEmployeeId = item.employeeId.includes(searchQuery);
                const matchesDepartment = item.department.toLowerCase().includes(searchDepartment.toLowerCase());
                return matchesEmployeeId && matchesDepartment;
              })
              .slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
              .map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item?.employeeId}</TableCell>
                  <TableCell>{item?.employeeName}</TableCell>
                  <TableCell>{item?.department}</TableCell>
                  <TableCell>{item?.designation}</TableCell>
                  <TableCell>{item?.attendanceDate}</TableCell>
                  <TableCell>{item?.inTime}</TableCell>
                  <TableCell>{item?.outTime}</TableCell>
                  <TableCell>{item?.totalHours}</TableCell>
                  <TableCell>{item?.remark}</TableCell>
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
                        onClick={() => handleDelete(item.id)}
                        src={Delete}
                        alt="Delete"
                        style={{ width: '20px' }}
                      />
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            }

          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={isData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[50, 100, 200]}
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
    </>
  );
}

export default Table2
