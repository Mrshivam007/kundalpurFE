import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import { serverInstance } from '../../../../API/ServerInstance';
import Fade from '@mui/material/Fade';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import { backendApiUrl } from '../../../../config/config';
import UpdateDonationType from './Unitupdate';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';
import axios from 'axios';
import LoadingSpinner1 from '../../../../components/Loading/LoadingSpinner1';
import Delete from '../../../../assets/Delete.png';
import Edit from '../../../../assets/Edit.png';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ReactTransliterate } from 'react-transliterate';
import CircularProgress from '@material-ui/core/CircularProgress';
const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

function Unitboli() {
  const [loader, setloader] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isData, setisData] = React.useState([]);
  const [text, settext] = useState('');
  const [refetch, setrefetch] = useState(false);
  const [donationtype_in_hindi, setdonationtype_in_hindi] = useState('');
  const [donationtype_in_eng, setdonationtype_in_eng] = useState('');
  const [open3, setOpen3] = React.useState(false);
  const [data, setdata] = useState('');
  const [manageActivation, setmanageActivation] = useState(false);
  const [showloader, setshowloader] = useState(false);
  let status;
  const handleOpen3 = (data) => {
    setOpen3(true);
    setdata(data);
  };
  const handleClose3 = () => setOpen3(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlesubmit = async (e) => {
    try {
      setshowloader(true);
      e.preventDefault();
      axios.defaults.headers.post[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;
      const { data } = await axios.post(`${backendApiUrl}admin/add-boliUnit`, {
        boliUnit_hi: donationtype_in_hindi,
        boliUnit_en: donationtype_in_eng,
      });
      if (data.status === true) {
        setshowloader(false);
        Swal.fire('Great!', 'Boli Unit Added Successfully', 'success');
        handleClose();
        setdonationtype_in_eng('');
        setdonationtype_in_hindi('');
      }
    } catch (error) {
      Swal.fire('Error!', error.response.data.message, 'error');
      handleClose();
    }
  };

  const getall_donatiions = () => {
    try {
      setloader(true);
      serverInstance(`admin/get-boliUnit`, 'get').then((res) => {
        if (res.status === true) {
          setisData(res.data);
          setloader(false);
        } else {
          Swal('Error', 'somthing went  wrong', 'error');
          setloader(false);
        }
      });
    } catch (error) {
      Swal.fire('Error!', error, 'error');
    }
  };

  useEffect(() => {
    getall_donatiions();
  }, [refetch, open, open3]);
  const [deleteId, setdeleteId] = useState('');
  const [open4, setOpen4] = React.useState(false);

  const handleClickOpen3 = (id) => {
    setOpen4(true);
    setdeleteId(id);
  };
  const handleClose6 = () => setOpen4(false);
  const handleClose4 = () => {
    setOpen4(false);
    console.log('sd');
    serverInstance('admin/delete-donation-type', 'post', {
      id: deleteId,
      type: 2,
    })
      .then((res) => {
        if (res.data.status) {
          Swal.fire('Great!', res.data.message, 'success');
          getall_donatiions();
        } else {
          Swal('Error', 'somthing went  wrong', 'error');
        }
      })
      .catch((error) => {
        Swal('Error', 'somthing went  wrong', 'error');
      });
  };
  const deacivateAndactivateuser = async (id) => {
    try {
      if (!manageActivation) {
        status = 0;
      } else {
        status = 1;
      }

      setmanageActivation(!manageActivation);
      axios.defaults.headers.post[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;
      await axios
        .post(
          `${backendApiUrl}admin/delete-donation-type
        `,
          {
            id: id,
            type: 2,
          },
        )
        .then((res) => {
          if (res.data.status) {
            alert(res.data.message);
            getall_donatiions();
          } else {
            Swal('Error', 'Something went wrong', 'error');
          }
        });
    } catch (error) {
      Swal('Error', error, 'error');
    }
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
        open={open4}
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
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <div>
              <form onSubmit={handlesubmit}>
                <div className="add-div-close-div">
                  <h2>Add New Boli Unit </h2>
                  <IconButton>
                    <CloseIcon onClick={() => handleClose()} />
                  </IconButton>
                </div>
                <Typography
                  style={{ marginBottom: '1rem' }}
                  variant="body2"
                  color="primary"
                >
                  {currDate} / {currTime}
                </Typography>
                <div className="main_add_Head_hai_na">
                  <div className="inner-input-div1">
                    <label htmlFor="donationtype_in_hindi">
                      Enter Boli Unit in hindi 
                    </label>

                    <ReactTransliterate
                      // style={custumstyle}
                      id="full-name"
                      required
                      value={donationtype_in_hindi}
                      onChangeText={(donationtype_in_hindi) => {
                        setdonationtype_in_hindi(donationtype_in_hindi);
                      }}
                      onChange={(e) => setdonationtype_in_hindi(e.target.value)}
                      lang="hi"
                      placeholder="Please Enter Boli Unit in hindi"
                    />
                  </div>
                  <div className="inner-input-div1">
                    <label htmlFor="donationtype_in_eng">
                      Enter Boli Unit in english 
                    </label>
                    <input
                      className="inner-input-div120"
                      type="text"
                      required
                      id="donationtype_in_eng"
                      value={donationtype_in_eng}
                      name="donationtype_in_eng"
                      onChange={(e) => setdonationtype_in_eng(e.target.value)}
                      placeholder="Please Enter Boli Unit in English"
                    />
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
                      'Add'
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
        open={open3}
        onClose={handleClose3}
        closeAfterTransition
      >
        <Fade in={open3}>
          <Box sx={style}>
            <div>
              <div className="add-div-close-div" style={{ marginLeft: '1rem' }}>
                <h2>Update Boli Unit</h2>
                <CloseIcon onClick={() => handleClose3()} />
              </div>
              <Typography
                style={{ marginLeft: '1rem' }}
                variant="body2"
                color="primary"
              >
                {currDate} / {currTime}
              </Typography>
              <UpdateDonationType data={data} handleClose3={handleClose3} />
            </div>
          </Box>
        </Fade>
      </Modal>
      <div>
        <hr style={{ color: '#e96d00' }} />
        <div className="add-btn-user">
          <Tooltip title="Add new boli head">
            <button onClick={handleOpen}>+Add</button>
          </Tooltip>
        </div>
        <div className="table-div-maain">
          <Table
            sx={{ minWidth: 650, width: '100%' }}
            aria-label="simple table"
          >
            <TableHead style={{ background: '#F1F0F0' }}>
              <TableRow>
                <TableCell>S.No.</TableCell>

                <TableCell>
                  Boli Unit (hindi)
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('itemType_hi')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Boli Unit (english)
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('itemType_en')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                {/* <TableCell>Status</TableCell> */}
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isData &&
                (rowsPerPage > 0
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
                    <TableCell>{row?.boliUnit_hi}</TableCell>
                    <TableCell>{row?.boliUnit_en}</TableCell>
                    {/* <TableCell>
                      {row.status === 1 ? 'Active' : 'Deactive'}
                    </TableCell> */}
                    <TableCell>
                      <Tooltip title="Edit">
                        <img
                          src={Edit}
                          onClick={() => handleOpen3(row)}
                          alt="xx"
                          style={{ width: '20px', marginRight: '1rem' }}
                        />
                      </Tooltip>

                      {row.status === 1 && (
                        <Tooltip title="Print">
                          <img
                            src={Delete}
                            onClick={() => handleClickOpen3(row.id)}
                            alt="xx"
                            style={{ width: '20px' }}
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
                  // count={isData.length}
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

      {loader && <LoadingSpinner1 />}
    </>
  );
}

export default Unitboli;
