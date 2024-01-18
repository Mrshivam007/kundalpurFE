import React, { useEffect, useState } from 'react';
import { serverInstance } from '../../../../../API/ServerInstance';
import Swal from 'sweetalert2';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import exportFromJSON from 'export-from-json';
import Moment from 'moment-js';
import { backendApiUrl } from '../../../../../config/config';
import axios from 'axios';
import { ExportPdfmanul } from '../../../compoments/ExportPdf';
import Print from '../../../../../assets/Print.png';
import ExportPdf from '../../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../../assets/ExportExcel.png';
import ManualDonationTap from '../ManualDonationTap';
import Tooltip from '@mui/material/Tooltip';
import LoadingSpinner1 from '../../../../../components/Loading/LoadingSpinner1';
import Button from '@mui/material/Button';
const HeadReport = ({ setopendashboard }) => {
  const [loader, setloader] = useState(false);
  const [isData, setisData] = React.useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [empylist, setempylist] = useState('');
  const [userrole, setuserrole] = useState('');
  const [empId, setempId] = useState('');
  const [datefrom, setdatefrom] = useState('');
  const [dateto, setdateto] = useState('');
  const [SearchHead, setSearchHead] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getAllEmp = () => {
    serverInstance('admin/add-employee', 'get').then((res) => {
      if (res.status) {
        setempylist(res.data);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
    });
  };

  const ExportToExcel = () => {
    const fileName = 'HeadReport';
    const exportType = 'xls';
    var data = [];
    isData.map((item, index) => {
      data.push({
        Head: item?.type,
        Count: item?.count,
        'Amount Cheque': item?.cheque_amount ? item?.cheque_amount : '0',
        'Amount Electronic': item?.electric_amount
          ? item?.electric_amount
          : '0',
        'Amount Item': item?.item_amount ? item?.item_amount : '0',
        'Amount Cash': item?.cash_amount ? item?.cash_amount : '0',
        Total: item?.total_amount ? item?.total_amount : '0',
        'Created Date': Moment(item?.created_at).format('DD-MM-YYYY'),
      });
    });
    exportFromJSON({ data, fileName, exportType });
  };

  const ExportToExcel1 = () => {
    const fileName = 'Report';
    const exportType = 'xls';
    var data = [];
    SearchHead &&
      SearchHead.map((item, index) => {
        data.push({
          Date: Moment(item.donation_date).format('DD-MM-YYYY'),
          'Receipt No': item?.ReceiptNo,
          'Voucher No': item?.voucherNo,
          'Phone No': item?.phoneNo,
          name: item?.name,
          Address: item?.address,
          'Head/Item': item?.elecItemDetails
            ? item?.elecItemDetails.map((row) => {
                return row.type;
              })
            : item?.type,
          Amount: item?.elecItemDetails
            ? item?.elecItemDetails.reduce(
                (n, { amount }) => parseFloat(n) + parseFloat(amount),
                0,
              )
            : item?.Amount,
          remark: item?.elecItemDetails
            ? item?.elecItemDetails.map((row) => {
                return row.remark;
              })
            : item?.remark,
          'Created Date': Moment(item?.created_at).format('DD-MM-YYYY'),
        });
      });
    exportFromJSON({ data, fileName, exportType });
  };
  const filterdata = async () => {
    setloader(true);
    axios.defaults.headers.get[
      'Authorization'
    ] = `Bearer ${sessionStorage.getItem('token')}`;

    const res = await axios.get(
      `${backendApiUrl}admin/donation-manual-report?user=${empId}&from=${datefrom}&to=${dateto}`,
    );

    if (res.data.data[0].donations) {
      setloader(false);
      setisData(res.data.data[0].donations);
    }
  };

  const filterHead = async (type) => {
    setloader(true);
    axios.defaults.headers.get[
      'Authorization'
    ] = `Bearer ${sessionStorage.getItem('token')}`;

    const res = await axios.get(
      `${backendApiUrl}user/manual-searchAllDonation?employeeid=${empId}&type=${type}&fromDate=${datefrom}&toDate=${dateto}`,
    );

    if (res.data.status) {
      setloader(false);
      setSearchHead(res.data.data);
    }
  };

  useEffect(() => {
    filterdata();
    setopendashboard(true);
    getAllEmp();

    setuserrole(Number(sessionStorage.getItem('userrole')));
  }, []);

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
      <ManualDonationTap setopendashboard={setopendashboard} />
      <div style={{ marginLeft: '5rem', marginRight: '1rem' }}>
        <p>Electronic Head Report</p>
        <div>
          <div className="search-header">
            <div className="search-inner-div-reports">
              <input
                id="donation-date"
                type="date"
                placeholder="From"
                value={datefrom}
                name="datefrom"
                onChange={(e) => {
                  setdatefrom(e.target.value);
                }}
              />
              <input
                id="donation-date"
                type="date"
                placeholder="From"
                value={dateto}
                name="dateto"
                onChange={(e) => {
                  setdateto(e.target.value);
                }}
              />
              <select
                value={empId}
                name="empId"
                onChange={(e) => setempId(e.target.value)}
              >
                <option>Select User</option>
                {empylist &&
                  empylist.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.Username}
                    </option>
                  ))}
              </select>
              <button onClick={() => filterdata()}>Search</button>
              <button onClick={() => resetbutn()}>Reset</button>
              <Tooltip title="Print">
                <img
                  onClick={() => ExportPdfmanul(isData, 'HeadReport')}
                  src={Print}
                  alt="ss"
                  style={{ width: '30px' }}
                />
              </Tooltip>
              <Tooltip title="Export excel">
                <img
                  onClick={() => ExportToExcel()}
                  src={ExportExcel}
                  alt="s"
                  style={{ width: '30px' }}
                />
              </Tooltip>
              <Tooltip title="Export pdf">
                <img
                  onClick={() => ExportPdfmanul(isData, 'HeadReport')}
                  src={ExportPdf}
                  alt="ss"
                  style={{ width: '30px' }}
                />
              </Tooltip>
            </div>
            <div></div>
          </div>
        </div>

        <div className="table-div-maain">
          <Table
            sx={{ minWidth: 650, width: '100%' }}
            aria-label="simple table"
          >
            <TableHead style={{ background: '#FFEEE0' }}>
              <TableRow>
                <TableCell>
                  Head Name
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('type')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Count
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('count')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Amount Cheque
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('cheque_amount')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Amount Electronic
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('electric_amount')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Amount Item
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('item_amount')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Amount Cash
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('cash_amount')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell style={{ fontWeight: 700 }}>Total</TableCell>
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
                      key={row.id}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell onClick={() => filterHead(row.type)}>
                        {row.type}
                      </TableCell>
                      <TableCell>{row.count}</TableCell>
                      <TableCell>
                        {row.cheque_amount ? row.cheque_amount : '0'}.00
                      </TableCell>
                      <TableCell>
                        {row.electric_amount ? row.electric_amount : '0'}.00
                      </TableCell>
                      <TableCell>
                        {row.item_amount ? row.item_amount : '0'}.00
                      </TableCell>
                      <TableCell>
                        {' '}
                        {row.cash_amount ? row.cash_amount : '0'}.00
                      </TableCell>
                      <TableCell>
                        {row.total_amount ? row.total_amount : '0'}.00
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <>
                  {/* <TableCell colSpan={8} align="center">
                      <CircularProgress />
                    </TableCell> */}
                </>
              )}
              <TableRow>
                <TableCell> &nbsp;</TableCell>

                <TableCell style={{ fontWeight: 700 }}>Total</TableCell>
                <TableCell style={{ fontWeight: 700 }}>
                  {isData
                    ? isData.reduce(
                        (n, { cheque_amount }) => parseFloat(n) + cheque_amount,
                        0,
                      )
                    : '0'}.00
                </TableCell>
                <TableCell style={{ fontWeight: 700 }}>
                  {isData
                    ? isData.reduce(
                        (n, { electric_amount }) =>
                          parseFloat(n) + electric_amount,
                        0,
                      )
                    : '0'}.00
                </TableCell>
                <TableCell style={{ fontWeight: 700 }}>
                  {isData
                    ? isData.reduce(
                        (n, { item_amount }) => parseFloat(n) + item_amount,
                        0,
                      )
                    : '0'}.00
                </TableCell>
                <TableCell style={{ fontWeight: 700 }}>
                  {isData
                    ? isData.reduce(
                        (n, { cash_amount }) => parseFloat(n) + cash_amount,
                        0,
                      )
                    : '0'}.00
                </TableCell>
                <TableCell style={{ fontWeight: 700 }}>
                  {isData
                    ? isData.reduce(
                        (n, { total_amount }) => parseFloat(n) + total_amount,
                        0,
                      )
                    : '0'}.00
                </TableCell>
              </TableRow>
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

        {SearchHead && (
          <>
            <div>
              <p className="Cheque_text">Head Report</p>
              <img
                src={Print}
                alt="jj"
                style={{ width: '25px', marginRight: '2rem' }}
              />
              <img
                onClick={() => ExportToExcel1()}
                src={ExportExcel}
                alt="jj"
                style={{ width: '25px', marginRight: '2rem' }}
              />
              <img
                onClick={() => ExportPdfmanul(isData, 'HeadReport')}
                src={ExportPdf}
                alt="jj"
                style={{ width: '25px', marginRight: '1rem' }}
              />
            </div>
            <div className="table-div-">
              <Table
                sx={{ minWidth: 650, width: '100%' }}
                aria-label="simple table"
              >
                <TableHead style={{ background: '#FFEEE0' }}>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>ReceiptNo</TableCell>

                    <TableCell>Phone No</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Head/Item</TableCell>
                    <TableCell>Amount</TableCell>

                    <TableCell>Remark</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {SearchHead ? (
                    <>
                      {(rowsPerPage > 0
                        ? SearchHead.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage,
                          )
                        : SearchHead
                      ).map((row, index) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell>
                            {Moment(row.donation_date).format('DD/MM/YYYY')}
                          </TableCell>
                          <TableCell>{row.ReceiptNo}</TableCell>

                          <TableCell>{row.phoneNo}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell> {row.address}</TableCell>
                          <TableCell>
                            {row.manualItemDetails.map((row) => {
                              return (
                                <li style={{ listStyle: 'none' }}>
                                  {row.type}
                                </li>
                              );
                            })}
                          </TableCell>
                          <TableCell>
                            {row.manualItemDetails.reduce(
                              (n, { amount }) =>
                                parseFloat(n) + parseFloat(amount),
                              0,
                            )}
                          </TableCell>

                          <TableCell>
                            {row.manualItemDetails.map((row) => {
                              return (
                                <li style={{ listStyle: 'none' }}>
                                  {row.remark}{' '}
                                </li>
                              );
                            })}
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  ) : (
                    <>
                      <TableCell colSpan={8} align="center">
                        <ReactSpinner />
                      </TableCell>
                    </>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      count={SearchHead.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      rowsPerPageOptions={[50, 100, 150]}
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
        )}
      </div>
      {loader && <LoadingSpinner1 />}
    </>
  );
};

export default HeadReport;
