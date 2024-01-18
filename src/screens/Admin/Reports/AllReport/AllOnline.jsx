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
import { Box, } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { ExportPdfmanul } from '../../compoments/ExportPdf';
import Print from '../../../../assets/Print.png';
import ExportPdf from '../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../assets/ExportExcel.png';
import AllReportTap from '../AllReport/AllReportTap';
import 'react-spinning-wheel/dist/style.css';
import { useReactToPrint } from 'react-to-print';
import OnlineTotal from '../AllReport/Totals/OnlineTotal';
import OnlineAllTotal from '../AllReport/Totals/OnlineAllTotal';
import OnlineCHeque from '../AllReport/Totals/OnlineCHeque';
import AllTotal from '../AllReport/Totals/AllTotal';
import Tooltip from '@mui/material/Tooltip';
import { Button } from '@mui/material';
import LoadingSpinner1 from '../../../../components/Loading/LoadingSpinner1';
import { MenuItem, Menu } from '@mui/material';
import AllOnlinePrint from '../AllReport/AllPrint/AllOnlinePrint'
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
const AllOnline = ({ setopendashboard }) => {
  let head = [];
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

  const componentRef3 = useRef();

  const handlePrint3 = useReactToPrint({
    content: () => componentRef3.current,
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
    const fileName = 'OnlineAllReport';
    const exportType = 'xls';
    var data = [];
    isData.map((item, index) => {
      data.push({
        Head: item?.type ? item?.type : item?.TYPE,
        'type of donation': item?.donationType,
        'Amount online': item?.online ? item?.online : '0',
        'Amount cheque': item?.cheque ? item?.cheque : '0',

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
    setpasshead(head);
    serverInstance(
      `admin/get-online-report?fromDate=${datefrom}&toDate=${dateto}`,
      'post',
      {
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
    setdateto('');
    setpasshead('');
    setdatefrom('');
    setSearchHead('');
    settype('');
    filterdata();
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
            <AllOnlinePrint isData={isData} handleClose={handleClose10} />
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
        <p>All Head Report</p>
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
                <div onClick={handleClick} className="select_person_divAllHead">
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

              <button onClick={() => filterdata()}>Search</button>
              <button onClick={() => resetbutn()}>Reset</button>
              <Tooltip title="Print">
                <img
                  onClick={() => handleOepn10 ()}
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
                <TableCell>
                  Head Name 
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('TYPE')}
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
                  Online
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('ONLINE_TOTAL_AMOUNT')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Cheque
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('CHEQUE_TOTAL_AMOUNT')}
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
                      <TableCell onClick={() => filterHead(row.type)}>
                        {row.type ? row.type : row.TYPE}
                      </TableCell>
                      <TableCell>{row?.donationType}</TableCell>
                      <TableCell>{row?.online ? row?.online : '0'}</TableCell>
                      <TableCell>{row?.cheque ? row?.cheque : '0'}</TableCell>
                      <TableCell>
                        {Number(row?.online) + Number(row?.cheque)}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <></>
              )}
              <TableRow>
                <TableCell> &nbsp;</TableCell>
                <TableCell style={{ fontWeight: 700 }}>Total</TableCell>
                <TableCell style={{ fontWeight: 700 }}>
                  {<OnlineCHeque data={isData} />}
                </TableCell>
                <TableCell style={{ fontWeight: 700 }}>
                  {<OnlineTotal data={isData} />}
                </TableCell>

                <TableCell style={{ fontWeight: 700 }}>
                  {<OnlineAllTotal data={isData} />}
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
                  rowsPerPageOptions={[100, 200, 30000]}
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
};

export default AllOnline;
