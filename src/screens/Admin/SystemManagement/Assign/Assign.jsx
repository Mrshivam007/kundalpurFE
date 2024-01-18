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
import AcceptRequest from './AcceptRequest';
import SystemTap from '../SystemTap';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './Assign.css';
const style = {
  position: 'absolute',
  top: '27%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
  borderRadius: '5px',
};
const Assign = ({ setopendashboard }) => {
  const navigation = useNavigate();
  const [isData, setisData] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = React.useState(false);
  const [empdata, setempdata] = useState('');
  const [deleteId, setdeleteId] = useState('');
  const [open2, setOpen2] = React.useState(false);
  const handleOpen = (data) => {
    setOpen(true);
    setempdata(data);
  };
  const handleClose = () => setOpen(false);

  const handleClickOpen = (id) => {
    setOpen2(true);
    setdeleteId(id);
  };

  const handleClose2 = () => {
    setOpen2(false);
    serverInstance('admin/delete-voucher', 'DELETE', {
      id: deleteId,
    })
      .then((res) => {
        console.log(res);
        if (res.status) {
          Swal.fire('Great!', res?.data, 'success');
          getall_donation();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClose3 = () => {
    setOpen2(false);
  };

  const getall_donation = () => {
    serverInstance('user/get-req-voucher', 'get').then((res) => {
      if (res.status) {
        setisData(res.data);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
      console.log(res);
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setopendashboard(true);
    getall_donation();
  }, [open]);
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
        open={open2}
        onClose={handleClose2}
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
              <div className="add-div-close-div1222">
                <h2>Generate Voucher</h2>
                <IconButton>
                  <CloseIcon onClick={() => handleClose()} />
                </IconButton>
              </div>

              <AcceptRequest setOpen={setOpen} empdata={empdata} />
            </div>
          </Box>
        </Fade>
      </Modal>
      <SystemTap setopendashboard={setopendashboard} />
      <div style={{ marginLeft: '5rem', marginRight: '1rem' }}>
        <div className="table-div-maain">
          <Table sx={{ width: '100%' }} aria-label="simple table">
            <TableHead style={{ background: '#F1F0F0' }}>
              <TableRow>
                <TableCell>
                  EmpId
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('id')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Name
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('Username')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Role
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('Role')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? isData
                    .reverse()
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : isData
              ).map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell> {row.id}</TableCell>
                  <TableCell>{row.Username}</TableCell>
                  <TableCell> {row.Role}</TableCell>

                  <TableCell>
                    <button
                      onClick={() => handleOpen(row)}
                      className="Accepted_btn"
                    >
                      Accept
                    </button>
                    <button
                      style={{ marginLeft: '1rem', background: 'red' }}
                      onClick={() => handleClickOpen(row.id)}
                      className="Accepted_btn"
                    >
                      Delete
                    </button>
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
    </>
  );
};

export default Assign;
