import React, { useEffect, useState, useRef } from 'react';
import { serverInstance } from '../../../../API/ServerInstance';
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
import { backendApiUrl } from '../../../../config/config';
import axios from 'axios';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { ExportPdfmanul } from '../../compoments/ExportPdf';
import Print from '../../../../assets/Print.png';
import ExportPdf from '../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../assets/ExportExcel.png';
import AllReportTap from '../AllReport/AllReportTap';
import { ReactSpinner } from 'react-spinning-wheel';
import 'react-spinning-wheel/dist/style.css';
import { useReactToPrint } from 'react-to-print';
import OnlineTotal from '../AllReport/Totals/OnlineTotal';
import ChequeTotal from '../AllReport/Totals/ChequeTotal';
import Chequestotal from '../AllReport/Totals/ChequeTotal';
import Cashtotal from '../AllReport/Totals/Cashtotal';
import ElecTotal from '../AllReport/Totals/ElecTotal';
import Itemtotal from '../AllReport/Totals/Itemtotal';
import OnlineCHeque from '../AllReport/Totals/OnlineCHeque';
import AllTotal from '../AllReport/Totals/AllTotal';
import Tooltip from '@mui/material/Tooltip';
import { Button } from '@mui/material';
import LoadingSpinner1 from '../../../../components/Loading/LoadingSpinner1';
import { MenuItem, Menu } from '@mui/material';
import AllConsolatePrint from './AllPrint/AllConsolatePrint';
import Consolided from './OnlyAllRoomConsolatid';
const style = {
  position: 'absolute',
  top: '49%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
  borderRadius: '5px',
};
const AllConsolidedReport = ({ setopendashboard }) => {
  let users = [];
  let head = [];
  const [passuser, setpassuser] = useState('');
  const [passhead, setpasshead] = useState('');
  const [loader, setloader] = useState(false);
  const [isData, setisData] = React.useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [empylist, setempylist] = useState('');
  const [headlist, setheadlist] = useState('');
  const [userrole, setuserrole] = useState('');
  const [empId, setempId] = useState('');
  const [type, settype] = useState('');
  const [datefrom, setdatefrom] = useState('');
  const [dateto, setdateto] = useState('');
  const [SearchHead, setSearchHead] = useState('');
  const componentRef2 = useRef();

  const handlePrint2 = useReactToPrint({
    content: () => componentRef2.current,
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setpassuser(users);
  };

  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const open1 = Boolean(anchorEl1);
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
    setpasshead(head);
  };
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

  const gettypehead = () => {
    serverInstance('admin/donation-type?type=1', 'get').then((res) => {
      if (res.status) {
        setheadlist(res.data);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
    });
  };

  const ExportToExcel = () => {
    const fileName = 'ConsolidatedAllReport';
    const exportType = 'xls';
    var data = [];
    isData.map((item, index) => {
      data.push({
        'Type of Donation':
          item?.donationType == 'manual' ? 'Manual Donation' : 'Donation',
        'Amount Cheque': item?.cheque_TOTAL_AMOUNT
          ? item?.cheque_TOTAL_AMOUNT
          : '0',
        'Amount Bank': item?.bank_TOTAL_AMOUNT ? item?.bank_TOTAL_AMOUNT : '0',
        ' Amount Cash': item?.item_TOTAL_AMOUNT ? item?.item_TOTAL_AMOUNT : '0',
        ' Cheque': item?.cheque_TOTAL_AMOUNT ? item?.cheque_TOTAL_AMOUNT : '0',
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
    serverInstance(
      `admin/get-cons-report?fromDate=${datefrom}&toDate=${dateto}`,
      'post',
      {
        user: passuser,
        type: passhead,
      },
    ).then((res) => {
      console.log('consolatred');
      if (res.status) {
        setloader(false);
        setisData(res.data);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
    });
  };

  // const filterHead = async (type) => {
  //   setloader(true);
  //   axios.defaults.headers.get[
  //     'Authorization'
  //   ] = `Bearer ${sessionStorage.getItem('token')}`;

  //   const res = await axios.get(
  //     `${backendApiUrl}user/searchAllDonation?employeeid=${empId}&type=${type}&fromDate=${datefrom}&toDate=${dateto}`,
  //   );

  //   if (res.data.status) {
  //     setloader(false);
  //     setSearchHead(res.data.data);
  //   }
  // };

  const [open10, setOpen10] = React.useState(false);
  const handleClose10 = () => setOpen10(false);
  const handleOepn10 = () => {
    setOpen10(true);
  };

  useEffect(() => {
    filterdata();
    setopendashboard(true);
    getAllEmp();
    gettypehead();
    setuserrole(Number(sessionStorage.getItem('userrole')));
  }, []);

  const resetbutn = () => {
    setpasshead('');
    setpassuser('');
    setdatefrom('');
    setdateto('');
    setempId('');
    setSearchHead('');
    filterdata();

    console.log('client reset');
  };

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
        open={open10}
        onClose={handleClose10}
        closeAfterTransition
      >
        <Fade in={open10}>
          <Box sx={style}>
            <AllConsolatePrint isData={isData} handleClose={handleClose10} />
          </Box>
        </Fade>
      </Modal>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <div className="mainuser_item">
          <input
            style={{ marginLeft: '1.2rem' }}
            type="checkbox"
            onClick={() => {
              setpassuser('');
            }}
          />
          <span>All Users</span>
        </div>
        {empylist &&
          empylist.map((item, index) => (
            <MenuItem key={item?.id}>
              <div className="mainuser_item">
                <input
                  style={{ marginRight: '1rem' }}
                  type="checkbox"
                  onClick={() => {
                    users.push(item?.id);
                    console.log(users);
                  }}
                />
                <span>{item?.Username}</span>
              </div>
            </MenuItem>
          ))}
      </Menu>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl1}
        open={open1}
        onClose={handleClose1}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <div className="mainuser_item">
          <input
            style={{ marginLeft: '1.3rem' }}
            type="checkbox"
            onClick={() => {
              setpasshead('');
            }}
          />
          <span>All Head</span>
        </div>
        {headlist &&
          headlist.map((item, index) => (
            <MenuItem key={index} value={item.type_hi}>
              <div className="mainuser_item">
                <input
                  style={{ marginRight: '1rem' }}
                  type="checkbox"
                  onClick={() => {
                    head.push(item.type_hi);
                    console.log(head);
                  }}
                />
                <span> {item.type_hi}</span>
              </div>
            </MenuItem>
          ))}
      </Menu>
      <AllReportTap setopendashboard={setopendashboard} />

      <div style={{ marginLeft: '5rem', marginRight: '1rem' }}>
        <p>All Consolidated Report</p>
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
              <div className="main_div_selectAllhed">
                <div
                  onClick={handleClick1}
                  className="select_person_divAllHead"
                >
                  {passhead.length > 0
                    ? `Selected head ${passhead.length}`
                    : ' All Head'}
                  <svg
                    width="12"
                    height="7"
                    viewBox="0 0 12 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L6 6L11 1"
                      stroke="#333333"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="main_div_selectAllhed">
                <div onClick={handleClick} className="select_person_divAllHead">
                  {passuser.length > 0
                    ? `Selected user ${passuser.length}`
                    : 'All User '}
                  <svg
                    width="12"
                    height="7"
                    viewBox="0 0 12 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L6 6L11 1"
                      stroke="#333333"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <button onClick={() => filterdata()}>Search</button>
              <button onClick={() => resetbutn()}>Reset</button>
              <Tooltip title="Print">
                <img
                  onClick={() => handleOepn10()}
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

        <div className="table-div-maain" ref={componentRef2}>
          <Table
            sx={{ minWidth: 650, width: '100%' }}
            aria-label="simple table"
          >
            <TableHead style={{ background: '#FFEEE0' }}>
              <TableRow>
                <TableCell>&nbsp; </TableCell>
                <TableCell>
                  Employee Name Type
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('employeeName')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Type
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('MODE_OF_DONATION')}
                    class={`fa fa-sort`}
                  />
                </TableCell>

                <TableCell>
                  Amount Cheque{' '}
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('cheque_TOTAL_AMOUNT')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Amount Electronic{' '}
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('bank_TOTAL_AMOUNT')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Amount Item{' '}
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('item_TOTAL_AMOUNT')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Amount Cash
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('cash_TOTAL_AMOUNT')}
                    class={`fa fa-sort`}
                  />
                </TableCell>

                <TableCell>Total Amount</TableCell>
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
                      {' '}
                      <TableCell>&nbsp;</TableCell>
                      {/* <TableCell onClick={() => filterHead(row.type)}> */}
                      <TableCell>
                        {row.employeeName ? row.employeeName : '-'}
                      </TableCell>
                      <TableCell style={{ width: '9rem' }}>
                        {row?.donationType == 'manual'
                          ? 'Manual Donation'
                          : 'Donation'}
                      </TableCell>
                      {/* <TableCell>
                        {row.ONLINE_TOTAL_AMOUNT ? row.ONLINE_TOTAL_AMOUNT : ''}
                      </TableCell>
                      <TableCell>
                        {row.CHEQUE_TOTAL_AMOUNT ? row.CHEQUE_TOTAL_AMOUNT : ''}
                      </TableCell> */}
                      <TableCell>{row?.cheque_TOTAL_AMOUNT}</TableCell>
                      <TableCell>{row?.bank_TOTAL_AMOUNT}</TableCell>
                      <TableCell>{row?.item_TOTAL_AMOUNT}</TableCell>
                      <TableCell>{row?.cash_TOTAL_AMOUNT}</TableCell>
                      <TableCell>
                        <TableCell>
                          {Number(row?.cheque_TOTAL_AMOUNT) +
                            Number(row?.bank_TOTAL_AMOUNT) +
                            Number(row?.item_TOTAL_AMOUNT) +
                            Number(row?.cash_TOTAL_AMOUNT)}
                        </TableCell>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <></>
              )}
              <TableRow>
                <TableCell> &nbsp;</TableCell>
                <TableCell> &nbsp;</TableCell>
                <TableCell style={{ fontWeight: 700 }}>Total</TableCell>
                {/* <TableCell style={{ fontWeight: 700 }}>
                  {<OnlineTotal data={isData} />}
                </TableCell>
                <TableCell style={{ fontWeight: 700 }}>
                  {<OnlineCHeque data={isData} />}
                </TableCell> */}
                <TableCell style={{ fontWeight: 700 }}>
                  {<Chequestotal data={isData} />}
                </TableCell>

                <TableCell style={{ fontWeight: 700 }}>
                  {<ElecTotal data={isData} />}
                </TableCell>
                <TableCell style={{ fontWeight: 700 }}>
                  {<Itemtotal data={isData} />}
                </TableCell>

                <TableCell style={{ fontWeight: 700 }}>
                  {<Cashtotal data={isData} />}
                </TableCell>

                <TableCell style={{ fontWeight: 700 }}>
                  {<AllTotal data={isData} />}
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

                    <TableCell>VoucherNo</TableCell>
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

                          <TableCell>{row.voucherNo}</TableCell>
                          <TableCell>{row.phoneNo}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell> {row.address}</TableCell>
                          <TableCell>
                            {row.elecItemDetails.map((row) => {
                              return (
                                <li style={{ listStyle: 'none' }}>
                                  {row.type}
                                </li>
                              );
                            })}
                          </TableCell>
                          <TableCell>
                            {row.elecItemDetails.reduce(
                              (n, { amount }) =>
                                parseFloat(n) + parseFloat(amount),
                              0,
                            )}
                          </TableCell>

                          <TableCell>
                            {row.elecItemDetails.map((row) => {
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
                      rowsPerPageOptions={[100, 200, 300000]}
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
      <Consolided setopendashboard={setopendashboard} />
      {loader && <LoadingSpinner1 />}
    </>
  );
};

export default AllConsolidedReport;
