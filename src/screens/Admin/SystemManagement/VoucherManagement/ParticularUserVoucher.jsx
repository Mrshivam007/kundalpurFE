import React, { useEffect, useState } from 'react';
import { serverInstance } from '../../../../API/ServerInstance';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import { Box, IconButton } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import './VoucherManagement.css';
import CancelVoucher from './CancelVoucher';
import LoadingSpinner1 from '../../../../components/Loading/LoadingSpinner1';
const style = {
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
const ParticularUserVoucher = ({ setopendashboard }) => {
  const location = useLocation();
  const navigation = useNavigate();
  const [loader, setloader] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [isData, setisData] = useState('');
  const [refetchdata, setrefetchdata] = useState(false);
  const [Data, setData] = useState('');
  const [cancelData, setcancelData] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = (data) => {
    setcancelData(data);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (location.state) {
      setData(location.state?.userdata);
      setloader(true);
      serverInstance(
        `admin/allocated-vouchers?userId=${Number(
          location.state?.userdata?.assign,
        )}&from=${Number(location.state?.userdata?.from)}&to=${Number(
          location.state?.userdata?.to,
        )}`,
        'get',
      ).then((res) => {
        if (res.status) {
          setloader(false);
          setisData(res.data);
        } else {
          Swal('Error', 'somthing went  wrong', 'error');
        }
        console.log(res);
      });
    }

    setopendashboard(true);
  }, [refetchdata]);

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
              <div className="add-div-close-div1">
                <h2>Cancel Voucher no</h2>
                <IconButton>
                  <CloseIcon onClick={() => handleClose()} />
                </IconButton>
              </div>
              <CancelVoucher
                row={cancelData}
                Data={Data}
                handleClose={handleClose}
                setrefetchdata={setrefetchdata}
                refetchdata={refetchdata}
              />
            </div>
          </Box>
        </Fade>
      </Modal>
      <div className="dashboarmain1">
        <div>
          <div className="backebj_voucher">
            <button onClick={() => navigation(-1)}>Back</button>
          </div>

          <div className="table-div-maain">
            <Table
              sx={{ minWidth: 650, width: '97%', marginTop: '3rem' }}
              aria-label="simple table"
            >
              <TableHead style={{ background: '#F1F0F0' }}>
                <TableRow>
                  <TableCell align="center">S.No </TableCell>
                  <TableCell align="center">
                    Empoyee Name
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortData('name')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell align="center">
                    Voucher Number
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortData('voucherNo')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell align="center">
                    Status
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortData('status')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell align="center">
                    Remark
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => sortData('rsn')}
                      class={`fa fa-sort`}
                    />
                  </TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isData && (
                  <>
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
                        <TableCell align="center"> {index + 1}</TableCell>
                        <TableCell align="center">{row?.name}</TableCell>

                        <TableCell align="center">{row?.voucherNo}</TableCell>

                        <TableCell align="center">{row.status}</TableCell>
                        <TableCell align="center">
                          {row?.rsn ? row?.rsn : '-'}
                        </TableCell>
                        <TableCell align="center">
                          {row.status === 'unallocated' && (
                            <>
                              <button
                                onClick={() => handleOpen(row)}
                                className="Cancel_btnN"
                              >
                                Cancel
                              </button>
                            </>
                          )}

                          {row.status === 'cancelled' && (
                            <>
                              <button className="Canceled_btnN">
                                {row.status}
                              </button>
                            </>
                          )}

                          {row.status === 'allocated' && (
                            <>
                              <button className="Accepted_btn">Accepted</button>{' '}
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
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
        </div>
      </div>
      {loader && <LoadingSpinner1 />}
    </>
  );
};

export default ParticularUserVoucher;
