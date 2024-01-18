import React, { useState, useEffect } from 'react';
import { serverInstance } from '../../../../API/ServerInstance';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import { MenuItem, Select, Box, Typography } from '@mui/material';
function CheckAvalability({ facility, Dharamshala, setOpen1 }) {
  const [isData, setisData] = React.useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [facilityname, setfacilityname] = useState('');
  const [dharamshalaname, setdharamshalaname] = useState('');
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <div className="cash-donation-div">
        <div
          className="cash-donation-container-innser"
          style={{ width: '100%' }}
        >
          <div className="form-div" style={{ marginBottom: '1rem' }}>
            <div className="form-input-div_add_user">
              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="fromNo">
                  Dharamshala
                </label>
                <Select
                  id="donation-type"
                  required
                  sx={{
                    width: '280px',
                    fontSize: 14,
                    '& .MuiSelect-select': {
                      // borderColor: !!formerror.donationtype ? 'red' : '',
                      padding: '10px 0px 10px 10px',
                      background: '#fff',
                    },
                  }}
                  value={dharamshalaname}
                  name="dharamshalaname"
                  onChange={(e) => setdharamshalaname(e.target.value)}
                  displayEmpty
                >
                  <MenuItem
                    sx={{
                      fontSize: 14,
                    }}
                    value={''}
                  >
                    Please select
                  </MenuItem>
                  {Dharamshala
                    ? Dharamshala.map((item) => {
                        return (
                          <MenuItem
                            sx={{
                              fontSize: 14,
                            }}
                            key={item.name}
                            value={item.name}
                          >
                            {item.name}
                          </MenuItem>
                        );
                      })
                    : ''}
                </Select>
              </div>

              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="toNo">
                  Facilities
                </label>
                <Select
                  id="donation-type"
                  required
                  sx={{
                    width: '280px',
                    fontSize: 14,
                    '& .MuiSelect-select': {
                      // borderColor: !!formerror.donationtype ? 'red' : '',
                      padding: '10px 0px 10px 10px',
                      background: '#fff',
                    },
                  }}
                  value={facilityname}
                  name="facilityname"
                  onChange={(e) => setfacilityname(e.target.value)}
                  displayEmpty
                >
                  <MenuItem
                    sx={{
                      fontSize: 14,
                    }}
                    value={''}
                  >
                    Please select
                  </MenuItem>
                  {facility
                    ? facility.map((item) => {
                        return (
                          <MenuItem
                            sx={{
                              fontSize: 14,
                            }}
                            key={item.name}
                            value={item.name}
                          >
                            {item.name}
                          </MenuItem>
                        );
                      })
                    : ''}
                </Select>
              </div>

              <div className="inner-input-div2">
                <label style={{ marginBottom: '0.3rem' }} htmlFor="fromNo">
                  &nbsp;
                </label>
                <button className="main_amin_gain1">check availability</button>
              </div>
            </div>
          </div>
          <div className="table-div-maain">
            <Table sx={{ width: '100%' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Booked</TableCell>
                  <TableCell>Room no</TableCell>
                  <TableCell style={{ width: '5rem' }}>Room rate</TableCell>
                  <TableCell>Advance rate</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Dharamshala</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{
                    '&:last-child td, &:last-child th': {
                      border: 0,
                    },
                  }}
                >
                  <TableCell>
                    <input type="checkbox" />
                  </TableCell>
                  <TableCell>Room no</TableCell>
                  <TableCell style={{ width: '5rem' }}>Room rate</TableCell>
                  <TableCell>Advance rate</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Dharamshala</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    '&:last-child td, &:last-child th': {
                      border: 0,
                    },
                  }}
                >
                  <TableCell>
                    <input type="checkbox" />
                  </TableCell>
                  <TableCell>Room no</TableCell>
                  <TableCell style={{ width: '5rem' }}>Room rate</TableCell>
                  <TableCell>Advance rate</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Dharamshala</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    '&:last-child td, &:last-child th': {
                      border: 0,
                    },
                  }}
                >
                  <TableCell>
                    <input type="checkbox" />
                  </TableCell>
                  <TableCell>Room no</TableCell>
                  <TableCell style={{ width: '5rem' }}>Room rate</TableCell>
                  <TableCell>Advance rate</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Dharamshala</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    '&:last-child td, &:last-child th': {
                      border: 0,
                    },
                  }}
                >
                  <TableCell>
                    <input type="checkbox" />
                  </TableCell>
                  <TableCell>Room no</TableCell>
                  <TableCell style={{ width: '5rem' }}>Room rate</TableCell>
                  <TableCell>Advance rate</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Dharamshala</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    '&:last-child td, &:last-child th': {
                      border: 0,
                    },
                  }}
                >
                  <TableCell>
                    <input type="checkbox" />
                  </TableCell>
                  <TableCell>Room no</TableCell>
                  <TableCell style={{ width: '5rem' }}>Room rate</TableCell>
                  <TableCell>Advance rate</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Dharamshala</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>

                {isData ? (
                  <>
                    {(rowsPerPage > 0
                      ? isData.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage,
                        )
                      : isData
                    ).map((row, index) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          '&:last-child td, &:last-child th': {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell>{row.ReceiptNo}</TableCell>
                        <TableCell>{row.voucherNo}</TableCell>
                        <TableCell>{row.phoneNo}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell> {row.address}</TableCell>
                        <TableCell> {row.address}</TableCell>
                        <TableCell>
                          <Tooltip title="View">
                            <img
                              src={eye}
                              alt="eye"
                              style={{
                                width: '20px',
                                marginRight: '0.5rem',
                              }}
                            />
                          </Tooltip>

                          <Tooltip title="Edit">
                            <img
                              src={Edit}
                              alt="eye"
                              style={{
                                width: '20px',
                                marginRight: '0.5rem',
                              }}
                            />
                          </Tooltip>

                          <Tooltip title="Delete">
                            <img
                              src={Delete}
                              alt="eye"
                              style={{ width: '20px' }}
                            />
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ) : (
                  <>
                    {/* <TableRow>
                    <TableCell colSpan={12} align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow> */}
                  </>
                )}
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
          <div className="save-div-btn">
            <button onClick={() => handlesubmit()} className="save-div-btn-btn">
              Save
            </button>
            <button
              onClick={() => setOpen1(false)}
              className="save-div-btn-btn-cancel"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckAvalability;
