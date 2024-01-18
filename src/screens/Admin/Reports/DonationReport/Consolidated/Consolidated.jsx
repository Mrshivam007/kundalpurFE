import React, { useEffect, useState, useRef } from 'react';
import Tooltip from '@mui/material/Tooltip';
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
import { DonationConsolated } from '../../../compoments/ExportPdf';
import Print from '../../../../../assets/Print.png';
import ExportPdf from '../../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../../assets/ExportExcel.png';
import DonationReportTap from '../DonationReportTap';
import LoadingSpinner1 from '../../../../../components/Loading/LoadingSpinner1';
import Button from '@mui/material/Button';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
const Consolidated = ({ setopendashboard }) => {
  let filterData;

  const [loader, setloader] = useState(false);
  const [empid, setempid] = useState('');
  const [emproleid, setemproleid] = useState('');
  const [isData, setisData] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [showalert, setshowalert] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openupdate, setopenupdate] = useState(false);
  const [donationTypes, setDonationTypes] = useState([]);
  const [typeid, settypeid] = useState('');
  const [empylist, setempylist] = useState('');
  const [empylist1, setempylist1] = useState('');
  const [userrole, setuserrole] = useState('');
  const [empId, setempId] = useState('');
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const ExportToExcel = () => {
    const fileName = 'Consolidated';
    const exportType = 'xls';
    var data = [];
    empylist.map((item, index) => {
      data.push({
        Date: Moment(item.donation_date).format('DD-MM-YYYY'),
        Staff: item?.name,
        Total: item?.totalDonationAmount,
        'Created Date': Moment(item?.created_at).format('DD-MM-YYYY'),
      });
    });
    exportFromJSON({ data, fileName, exportType });
  };

  const get_donation_tyeps = () => {
    try {
      Promise.all([serverInstance('admin/donation-type?type=1', 'get')]).then(
        ([res, item]) => {
          if (res.status) {
            setDonationTypes(res.data);
            console.log(res.data);
          } else {
            Swal.fire('Error', 'somthing went  wrong', 'error');
          }
        },
      );
    } catch (error) {
      Swal.fire('Error!', error, 'error');
    }
  };

  const getAllEmp = () => {
    serverInstance('admin/add-employee', 'get').then((res) => {
      if (res.status) {
        setempylist1(res.data);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
    });
  };
  const getAllDonationDetails = () => {
    setloader(true);
    serverInstance('admin/user-report  ', 'get').then((res) => {
      if (res.data) {
        setloader(false);
        if (userrole === 3) {
          if (emproleid === 0) {
            setempylist(res.data);
          } else {
            filterData = res.data.filter((item) => item.created_by === empid);
            setempylist(filterData);
          }
        } else {
          setempylist(res.data);
        }
      }
    });
  };
  useEffect(() => {
    getAllDonationDetails();
    getAllEmp();
    setopendashboard(true);
    get_donation_tyeps();
    setuserrole(Number(sessionStorage.getItem('userrole')));
    setemproleid(Number(sessionStorage.getItem('empRoleid')));
    setempid(Number(sessionStorage.getItem('empid')));
  }, [showalert, openupdate, open, empid]);

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
      <DonationReportTap setopendashboard={setopendashboard} />
      <div style={{ marginLeft: '5rem', marginRight: '1rem' }}>
        <div className="search-header">
          <div className="search-inner-div-reports">
            <div style={{ width: '80%' }} />
            <Tooltip title="Print">
              <img
                onClick={() => handlePrint()}
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
                onClick={() =>
                  DonationConsolated(empylist, 'DonationConsolited')
                }
                src={ExportPdf}
                alt="ss"
                style={{ width: '30px' }}
              />
            </Tooltip>
          </div>
          <div></div>
        </div>

        <h2 style={{ marginBottom: '1rem' }}>Donation Details</h2>
      </div>

      <div style={{ marginLeft: '5rem', marginRight: '1rem' }}>
        <Table
          sx={{ width: '100%' }}
          aria-label="simple table"
          ref={componentRef}
        >
          <TableHead style={{ background: '#FFEEE0' }}>
            <TableRow>
              <TableCell>
                S.No
                <i
                  style={{ marginLeft: '0.5rem' }}
                  onClick={() => sortData('created_by')}
                  class={`fa fa-sort`}
                />
              </TableCell>
              <TableCell>
                Date
                <i
                  style={{ marginLeft: '0.5rem' }}
                  onClick={() => sortData('donation_date')}
                  class={`fa fa-sort`}
                />
              </TableCell>
              <TableCell>
                User
                <i
                  style={{ marginLeft: '0.5rem' }}
                  onClick={() => sortData('name')}
                  class={`fa fa-sort`}
                />
              </TableCell>
              <TableCell>
                Amount
                <i
                  style={{ marginLeft: '0.5rem' }}
                  onClick={() => sortData('totalDonationAmount')}
                  class={`fa fa-sort`}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {empylist ? (
              <>
                {(rowsPerPage > 0
                  ? empylist
                      .reverse()
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                  : empylist
                ).map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell>{row.created_by}</TableCell>
                    <TableCell>
                      {Moment(row.donation_date).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.totalDonationAmount}.00</TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <></>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={empylist.length}
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
      {loader && <LoadingSpinner1 />}
    </>
  );
};

export default Consolidated;
