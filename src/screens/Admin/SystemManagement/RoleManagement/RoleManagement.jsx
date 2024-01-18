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
import './RoleManagement.css';
import AddRoleuser from './AddRoleuser/AddRoleuser';
import Print from '../../../../assets/Print.png';
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
import UpdateRole from './UpdateRole';
import SystemTap from '../SystemTap';
const style = {
  position: 'absolute',
  top: '48%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
  borderRadius: '5px',
};
const RoleManagement = ({ setopendashboard }) => {
  const [isData, setisData] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const navigation = useNavigate();

  useEffect(() => {
    setopendashboard(true);
    getall_donation();
  }, []);

  const getall_donation = () => {
    serverInstance('admin/donation-list', 'get').then((res) => {
      if (res.status) {
        setisData(res.data);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
      console.log(res);
    });
  };

  const downloadrecept = (row) => {
    navigation('/reciept', {
      state: {
        userdata: row,
      },
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
              <div className="add-div-close-div1">
                <h2 clssName="add_text_only"> Add Role</h2>
                <CloseIcon onClick={() => handleClose()} />
              </div>

              <AddRoleuser setOpen={setOpen} />
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
            <div>
              <div className="add-div-close-div1">
                <h2 clssName="add_text_only">Update Role</h2>
                <CloseIcon onClick={() => handleClose1()} />
              </div>

              <UpdateRole setOpen={setOpen} />
            </div>
          </Box>
        </Fade>
      </Modal>
      <SystemTap setopendashboard={setopendashboard} />

      <div style={{ marginLeft: '5rem', marginRight: '1rem' }}>
        <div className="add-btn-user2">
          <p style={{ marginTop: '0.6%' }}>Role Management</p>
          <div className="add_role_icons_div">
            <button
              style={{ height: '40px' }}
              className="addd-role"
              onClick={() => handleOpen()}
            >
              +Add
            </button>
            <Tooltip title="Export Excel File">
              <img
                // onClick={() => ExportToExcel()}
                src={ExportExcel}
                style={{
                  width: '30px',
                  height: '35px',
                  marginRight: '0.2rem',
                }}
              />
            </Tooltip>
            <Tooltip title="Export Pdf File">
              <img
                // onClick={() => ExportPdfmanul('Employee_list')}
                src={ExportPdf}
                style={{
                  width: '30px',
                  height: '35px',
                  marginRight: '0.2rem',
                }}
              />
            </Tooltip>
          </div>
        </div>

        <div className="table-div-maain">
          {/* <TableContainer component={Paper}> */}
          <Table sx={{ width: '100%' }} aria-label="simple table">
            <TableHead style={{ background: '#F1F0F0' }}>
              <TableRow>
                <TableCell>Role Name</TableCell>
                <TableCell>Role Description</TableCell>

                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableCell>ACCOUNTS</TableCell>

              <TableCell>ACCOUNTING</TableCell>

              <TableCell>
                {/* <Tooltip title="View Details">
                    <img
                      src={eye}
                      style={{ width: '20px', marginRight: '0.2rem' }}
                    />
                  </Tooltip> */}
                <Tooltip title="Edit Role">
                  <img
                    onClick={() => handleOpen1()}
                    src={Edit}
                    style={{ width: '20px', marginRight: '0.2rem' }}
                  />
                </Tooltip>
                <Tooltip title="Delete Role">
                  <img
                    src={Delete}
                    style={{ width: '20px', marginRight: '0.2rem' }}
                  />
                </Tooltip>
              </TableCell>
              {/* {(rowsPerPage > 0
                  ? isData.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : isData
                ).map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>

                    <TableCell>{row.NAME}</TableCell>

                    <TableCell>
                      <RemoveRedEyeIcon />
                      <DeleteForeverIcon />
                    </TableCell>
                  </TableRow>
                ))} */}
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
                  // showFirstButton={true}
                  // showLastButton={true}
                  //ActionsComponent={TablePaginationActions}
                  //component={Box}
                  //sx and classes prop discussed in styling section
                />
              </TableRow>
            </TableFooter>
          </Table>
          {/* </TableContainer> */}
        </div>
      </div>
    </>
  );
};

export default RoleManagement;
