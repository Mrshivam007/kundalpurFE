import React, { useState, useEffect } from 'react';
import { backendApiUrl } from '../../../../config/config';
import { serverInstance } from '../../../../API/ServerInstance';
import Swal from 'sweetalert2';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import CheckIcon from '@mui/icons-material/RadioButtonUnchecked';
import CloseIcon from '@mui/icons-material/RadioButtonChecked';
import './ReceiptMater.css';
function ReceiptMater() {
  const [eleReceiptNo, seteleReceiptNo] = useState('');
  const [cacgReceiptNo, setcacgReceiptNo] = useState('');
  const [itemReceiptNo, setitemReceiptNo] = useState('');
  const [chequeReceiptNo, setchequeReceiptNo] = useState('');
  const [onlineReceiptNo, setOnlineReceiptNo] = useState('');
  const [onlineChequeReceiptNo, setOnlineChequeReceiptNo] = useState('');
  const [boliReceiptNo, setboliReceiptNo] = useState('');
  const [eleReceipts, seteleReceipts] = useState([]);
  const [CashReceipts, setCashReceipts] = useState([]);
  const [itemReceipts, setitemReceipts] = useState([]);
  const [chequeReceipts, setchequeReceipts] = useState([]);
  const [onlineReceipts, setonlineReceipts] = useState([]);
  const [onlineChequeReceipts, setonlineChequeReceipts] = useState([]);
  const [boliReceipts, setboliReceipts] = useState([]);

  const [isData, setisData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [manageActivation, setmanageActivation] = useState(false);

  const handleSubmit = async (type) => {
    try {
      axios.defaults.headers.post[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;
      if (type === 'eleReceiptNo') {
        if (eleReceiptNo) {
          const res = await axios.post(`${backendApiUrl}admin/create-receipt`, {
            receipt: eleReceiptNo,
            type: 1,
          });
          if (res.data.status === true) {
            Swal.fire(
              'Great!',
              'Electronic receiptNo. Added Successfully',
              'success',
            );
          }
        } else {
          Swal.fire('Error!', 'Please enter receipt no', 'error');
        }
      }
      if (type === 'cacgReceiptNo') {
        if (cacgReceiptNo) {
          const res = await axios.post(`${backendApiUrl}admin/create-receipt`, {
            receipt: cacgReceiptNo,
            type: 2,
          });
          if (res.data.status === true) {
            Swal.fire(
              'Great!',
              'Cash receiptNo. Added Successfully',
              'success',
            );
          }
        } else {
          Swal.fire('Error!', 'Please enter receipt no', 'error');
        }
      }
      if (type === 'itemReceiptNo') {
        if (itemReceiptNo) {
          const res = await axios.post(`${backendApiUrl}admin/create-receipt`, {
            receipt: itemReceiptNo,
            type: 4,
          });
          if (res.data.status === true) {
            Swal.fire(
              'Great!',
              'Item receiptNo. Added Successfully',
              'success',
            );
          }
        } else {
          Swal.fire('Error!', 'Please enter receipt no', 'error');
        }
      }
      if (type === 'chequeReceiptNo') {
        if (chequeReceiptNo) {
          const res = await axios.post(`${backendApiUrl}admin/create-receipt`, {
            receipt: chequeReceiptNo,
            type: 3,
          });
          if (res.data.status === true) {
            Swal.fire(
              'Great!',
              'Cheque receiptNo. Added Successfully',
              'success',
            );
          }
        } else {
          Swal.fire('Error!', 'Please enter receipt no', 'error');
        }
      }
      if (type === 'onlineReceiptNo') {
        if (onlineReceiptNo) {
          const res = await axios.post(`${backendApiUrl}admin/create-receipt`, {
            receipt: onlineReceiptNo,
            type: 5,
          });
          if (res.data.status === true) {
            Swal.fire(
              'Great!',
              'Online receiptNo. Added Successfully',
              'success',
            );
          }
        } else {
          Swal.fire('Error!', 'Please enter receipt no', 'error');
        }
      }
      if (type === 'boliReceiptNo') {
        if (boliReceiptNo) {
          const res = await axios.post(`${backendApiUrl}admin/create-receipt`, {
            receipt: boliReceiptNo,
            type: 7,
          });
          if (res.data.status === true) {
            Swal.fire(+
              'Great!',
              'Boli receiptNo. Added Successfully',
              'success',
            );
          }
        } else {
          Swal.fire('Error!', 'Please enter receipt no', 'error');
        }
      }
      if (type === 'onlineChequeReceiptNo') {
        if (onlineChequeReceiptNo) {
          const res = await axios.post(`${backendApiUrl}admin/create-receipt`, {
            receipt: onlineChequeReceiptNo,
            type: 6,
          });
          if (res.data.status === true) {
            Swal.fire(
              'Great!',
              'Online Cheque receiptNo. Added Successfully',
              'success',
            );
          }
        } else {
          Swal.fire('Error!', 'Please enter receipt no', 'error');
        }
      }
      getReceiptNo();
    } catch (error) {
      Swal.fire('Error!', error, 'error');
    }
  };

  function getReceiptNo() {
    try {
      serverInstance('admin/get-receipt', 'get').then((res) => {
        if (res.status) {
          setisData(res.data);
          let filterData1 = res.data.filter((item) => item.type === 1);
          seteleReceipts(filterData1);
          let filterData2 = res.data.filter((item) => item.type === 2);
          setCashReceipts(filterData2);
          let filterData3 = res.data.filter((item) => item.type === 3);
          setchequeReceipts(filterData3);
          let filterData4 = res.data.filter((item) => item.type === 4);
          setitemReceipts(filterData4);
          let filterData5 = res.data.filter((item) => item.type === 5);
          setonlineReceipts(filterData5);
          let filterData6 = res.data.filter((item) => item.type === 6);
          setonlineChequeReceipts(filterData6);
          let filterData7 = res.data.filter((item) => item.type === 7);
          setboliReceipts(filterData7);
        }
      });
    } catch (error) {
      Swal.fire('Error', error, 'error');
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deacivateAndactivateuser = async (id, type, status) => {
    try {
      axios.defaults.headers.put[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;
      const { data } = await axios.put(`${backendApiUrl}admin/create-receipt`, {
        id: id,
        status: status,
        type: type,
      });

      console.log(data.data);
      if (data.data.status === true) {
        Swal.fire(
          'Great!',
          !manageActivation
            ? 'Donation Type Deactivate'
            : 'Donation Type Activate',
          'success',
        );
      }
      // console.log("ss", res);
    } catch (error) {
      Swal('Error', error, 'error');
    } finally {
      getReceiptNo();
    }
  };
  useEffect(() => {
    getReceiptNo();
  }, []);

  return (
    <div>
      <div className="main_reciept_master">
        <div className="right_input_label">
          <div className="ineear_dave_receipt_no">
            <label htmlFor="eleReceiptNo">
              Enter reciept no format for electronic donation
            </label>
            <input
              type="text"
              required
              id="eleReceiptNo"
              value={eleReceiptNo}
              name="eleReceiptNo"
              placeholder="reciept no for electronic"
              onChange={(e) => seteleReceiptNo(e.target.value)}
            />
            <button onClick={() => handleSubmit('eleReceiptNo')}>Save</button>
          </div>
          <div className="ineear_dave_receipt_no">
            <label htmlFor="cacgReceiptNo">
              Enter reciept no format for Cash donation
            </label>
            <input
              type="text"
              required
              id="cacgReceiptNo"
              value={cacgReceiptNo}
              name="cacgReceiptNo"
              placeholder=" reciept no for Cash donation"
              onChange={(e) => setcacgReceiptNo(e.target.value)}
            />
            <button onClick={() => handleSubmit('cacgReceiptNo')}>Save</button>
          </div>
          <div className="ineear_dave_receipt_no">
            <label htmlFor="itemReceiptNo">
              Enter reciept no format for Item donation
            </label>
            <input
              type="text"
              required
              id="itemReceiptNo"
              value={itemReceiptNo}
              name="itemReceiptNo"
              placeholder="reciept no for Item donation"
              onChange={(e) => setitemReceiptNo(e.target.value)}
            />
            <button onClick={() => handleSubmit('itemReceiptNo')}>Save</button>
          </div>
          <div className="ineear_dave_receipt_no">
            <label htmlFor="chequeReceiptNo">
              Enter reciept no format for cheque donation
            </label>
            <input
              type="text"
              id="chequeReceiptNo"
              required
              value={chequeReceiptNo}
              name="chequeReceiptNo"
              placeholder="reciept no for cheque donation"
              onChange={(e) => setchequeReceiptNo(e.target.value)}
            />
            <button onClick={() => handleSubmit('chequeReceiptNo')}>
              Save
            </button>
          </div>
          <div className="ineear_dave_receipt_no">
            <label htmlFor="onlineReceiptNo">
              Enter reciept no format for online donation
            </label>
            <input
              type="text"
              id="onlineReceiptNo"
              required
              value={onlineReceiptNo}
              name="onlineReceiptNo"
              placeholder="reciept no for online donation"
              onChange={(e) => setOnlineReceiptNo(e.target.value)}
            />
            <button onClick={() => handleSubmit('onlineReceiptNo')}>
              Save
            </button>
          </div>
          <div className="ineear_dave_receipt_no">
            <label htmlFor="onlineChequeReceiptNo">
              Enter reciept no format for online cheque donation
            </label>
            <input
              type="text"
              id="onlineChequeReceiptNo"
              required
              value={onlineChequeReceiptNo}
              name="onlineChequeReceiptNo"
              placeholder="reciept no for online cheque donation"
              onChange={(e) => setOnlineChequeReceiptNo(e.target.value)}
            />
            <button onClick={() => handleSubmit('onlineChequeReceiptNo')}>
              Save
            </button>
          </div>
          <div className="ineear_dave_receipt_no">
            <label htmlFor="chequeReceiptNo">
              Enter reciept no format for boli
            </label>
            <input
              type="text"
              id="chequeReceiptNo"
              required
              value={boliReceiptNo}
              name="boliReceiptNo"
              placeholder="reciept no for boli"
              onChange={(e) => setboliReceiptNo(e.target.value)}
            />
            <button onClick={() => handleSubmit('boliReceiptNo')}>Save</button>
          </div>
        </div>

        <div className="table_div_recipt">
          <div className="ScrollStyle">
            <div>
              <div>
                <h2>Electronic receipt no</h2>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead style={{ background: '#FFEEE0' }}>
                      <TableRow>
                        <TableCell align="left">Receipt</TableCell>
                        <TableCell align="left">Status</TableCell>
                        <TableCell align="left">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {eleReceipts && (
                        <>
                          {(rowsPerPage > 0
                            ? eleReceipts &&
                              eleReceipts.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage,
                              )
                            : eleReceipts && eleReceipts
                          ).map((row, index) => (
                            <TableRow
                              key={index}
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="left">{row.receipt}</TableCell>
                              <TableCell>
                                {row.status === 1 ? 'Active' : 'Deactivate'}
                              </TableCell>
                              <TableCell>
                                {row.status === 1 ? (
                                  <CloseIcon
                                    sx={{
                                      color: '#e96d00',
                                    }}
                                    onClick={() =>
                                      deacivateAndactivateuser(row.id, 1, 0)
                                    }
                                  />
                                ) : (
                                  <CheckIcon
                                    sx={{
                                      color: '#e96d00',
                                    }}
                                    onClick={() =>
                                      deacivateAndactivateuser(row.id, 1, 1)
                                    }
                                  />
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
                          count={eleReceipts.length}
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
                </TableContainer>
              </div>

              <div>
                <h2>Item receipt no</h2>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead style={{ background: '#FFEEE0' }}>
                      <TableRow>
                        <TableCell align="left">Receipt</TableCell>
                        <TableCell align="left">Status</TableCell>
                        <TableCell align="left">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {itemReceipts && Array.isArray(itemReceipts) && (
                        <>
                          {(rowsPerPage > 0
                            ? itemReceipts &&
                              itemReceipts.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage,
                              )
                            : itemReceipts && itemReceipts
                          ).map((row, index) => (
                            <TableRow
                              key={index}
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="left">{row.receipt}</TableCell>
                              <TableCell>
                                {row.status === 1 ? 'Avtive' : 'Deactivate'}
                              </TableCell>
                              <TableCell>
                                {row.status === 1 ? (
                                  <CloseIcon
                                    sx={{
                                      color: '#e96d00',
                                    }}
                                    onClick={() =>
                                      deacivateAndactivateuser(row.id, 4, 0)
                                    }
                                  />
                                ) : (
                                  <CheckIcon
                                    sx={{
                                      color: '#e96d00',
                                    }}
                                    onClick={() =>
                                      deacivateAndactivateuser(row.id, 4, 1)
                                    }
                                  />
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
                          count={itemReceipts.length}
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
                </TableContainer>
              </div>
            </div>

            <div>
              <div>
                <h2>Cash receipt no</h2>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead style={{ background: '#FFEEE0' }}>
                      <TableRow>
                        <TableCell align="left">Receipt</TableCell>
                        <TableCell align="left">Status</TableCell>
                        <TableCell align="left">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {CashReceipts && (
                        <>
                          {(rowsPerPage > 0
                            ? CashReceipts &&
                              CashReceipts.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage,
                              )
                            : CashReceipts && CashReceipts
                          ).map((row, index) => (
                            <TableRow
                              key={index}
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="left">{row.receipt}</TableCell>
                              <TableCell>
                                {row.status === 1 ? 'Avtive' : 'Deactivate'}
                              </TableCell>
                              <TableCell>
                                {row.status === 1 ? (
                                  <CloseIcon
                                    sx={{
                                      color: '#e96d00',
                                    }}
                                    onClick={() =>
                                      deacivateAndactivateuser(row.id, 2, 0)
                                    }
                                  />
                                ) : (
                                  <CheckIcon
                                    sx={{
                                      color: '#e96d00',
                                    }}
                                    onClick={() =>
                                      deacivateAndactivateuser(row.id, 2, 1)
                                    }
                                  />
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
                          count={CashReceipts.length}
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
                </TableContainer>
              </div>
              <div>
                <h2>Cheque receipt no</h2>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead style={{ background: '#FFEEE0' }}>
                      <TableRow>
                        <TableCell align="left">Receipt</TableCell>
                        <TableCell align="left">Status</TableCell>
                        <TableCell align="left">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {chequeReceipts && (
                        <>
                          {(rowsPerPage > 0
                            ? chequeReceipts &&
                              chequeReceipts.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage,
                              )
                            : chequeReceipts && chequeReceipts
                          ).map((row, index) => (
                            <TableRow
                              key={index}
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="left">{row.receipt}</TableCell>
                              <TableCell>
                                {row.status === 1 ? 'Avtive' : 'Deactivate'}
                              </TableCell>
                              <TableCell>
                                {row.status === 1 ? (
                                  <CloseIcon
                                    sx={{
                                      color: '#e96d00',
                                    }}
                                    onClick={() =>
                                      deacivateAndactivateuser(row.id, 3, 0)
                                    }
                                  />
                                ) : (
                                  <CheckIcon
                                    sx={{
                                      color: '#e96d00',
                                    }}
                                    onClick={() =>
                                      deacivateAndactivateuser(row.id, 3, 1)
                                    }
                                  />
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
                          count={chequeReceipts.length}
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
                </TableContainer>
              </div>
            </div>
            <div>
              <div>
                <h2>Online receipt no</h2>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead style={{ background: '#FFEEE0' }}>
                      <TableRow>
                        <TableCell align="left">Receipt</TableCell>
                        <TableCell align="left">Status</TableCell>
                        <TableCell align="left">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {onlineReceipts && (
                        <>
                          {(rowsPerPage > 0
                            ? onlineReceipts &&
                              onlineReceipts.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage,
                              )
                            : onlineReceipts && onlineReceipts
                          ).map((row, index) => (
                            <TableRow
                              key={index}
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="left">{row.receipt}</TableCell>
                              <TableCell>
                                {row.status === 1 ? 'Avtive' : 'Deactivate'}
                              </TableCell>
                              <TableCell>
                                {row.status === 1 ? (
                                  <CloseIcon
                                    sx={{
                                      color: '#e96d00',
                                    }}
                                    onClick={() =>
                                      deacivateAndactivateuser(row.id, 5, 0)
                                    }
                                  />
                                ) : (
                                  <CheckIcon
                                    sx={{
                                      color: '#e96d00',
                                    }}
                                    onClick={() =>
                                      deacivateAndactivateuser(row.id, 5, 1)
                                    }
                                  />
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
                          count={CashReceipts.length}
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
                </TableContainer>
              </div>
              <div>
                <h2>Online Cheque receipt no</h2>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead style={{ background: '#FFEEE0' }}>
                      <TableRow>
                        <TableCell align="left">Receipt</TableCell>
                        <TableCell align="left">Status</TableCell>
                        <TableCell align="left">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {onlineChequeReceipts && (
                        <>
                          {(rowsPerPage > 0
                            ? onlineChequeReceipts &&
                              onlineChequeReceipts.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage,
                              )
                            : onlineChequeReceipts && onlineChequeReceipts
                          ).map((row, index) => (
                            <TableRow
                              key={index}
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="left">{row.receipt}</TableCell>
                              <TableCell>
                                {row.status === 1 ? 'Avtive' : 'Deactivate'}
                              </TableCell>
                              <TableCell>
                                {row.status === 1 ? (
                                  <CloseIcon
                                    sx={{
                                      color: '#e96d00',
                                    }}
                                    onClick={() =>
                                      deacivateAndactivateuser(row.id, 6, 0)
                                    }
                                  />
                                ) : (
                                  <CheckIcon
                                    sx={{
                                      color: '#e96d00',
                                    }}
                                    onClick={() =>
                                      deacivateAndactivateuser(row.id, 6, 1)
                                    }
                                  />
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
                          count={chequeReceipts.length}
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
                </TableContainer>
              </div>
              <div>
                <h2>Boli receipt no</h2>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead style={{ background: '#FFEEE0' }}>
                      <TableRow>
                        <TableCell align="left">Receipt</TableCell>
                        <TableCell align="left">Status</TableCell>
                        <TableCell align="left">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {boliReceipts && (
                        <>
                          {(rowsPerPage > 0
                            ? boliReceipts &&
                              boliReceipts.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage,
                              )
                            : boliReceipts && boliReceipts
                          ).map((row, index) => (
                            <TableRow
                              key={index}
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="left">{row.receipt}</TableCell>
                              <TableCell>
                                {row.status === 1 ? 'Avtive' : 'Deactivate'}
                              </TableCell>
                              <TableCell>
                                {row.status === 1 ? (
                                  <CloseIcon
                                    sx={{
                                      color: '#e96d00',
                                    }}
                                    onClick={() =>
                                      deacivateAndactivateuser(row.id, 6, 0)
                                    }
                                  />
                                ) : (
                                  <CheckIcon
                                    sx={{
                                      color: '#e96d00',
                                    }}
                                    onClick={() =>
                                      deacivateAndactivateuser(row.id, 6, 1)
                                    }
                                  />
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
                          count={chequeReceipts.length}
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
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReceiptMater;
