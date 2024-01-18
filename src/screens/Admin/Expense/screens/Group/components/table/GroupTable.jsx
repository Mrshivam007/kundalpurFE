import React, { useEffect, useRef, useState } from "react";

import { Table, TableHead, TableRow, TableBody, TableCell, TableFooter, TablePagination } from '@mui/material'
import Tooltip from "@mui/material/Tooltip";
import { serverInstance } from "../../../../../../../API/ServerInstance";
import Edit from '../../../../../../../assets/Edit.png';
import Delete from '../../../../../../../assets/Delete.png';
import Typography from '@mui/material/Typography';


import { ReactTransliterate } from 'react-transliterate';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { Input, IconButton } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button'
import Swal from "sweetalert2";
import { Create_Expense } from "../form/Create_Expense";
import Add from "../form/Add";
import ExportPdf from '../../../../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../../.././../assets/ExportExcel.png';
import Print from '../../../../../../../assets/Print.png';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,

  color: '#FDC99C',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',

  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  zIndex: 2,
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  left: '11px',
  bottom: '0px',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    height: '17px',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function GroupTable() {



  const [refresh, setRefresh] = useState(false);


  const [searchvalue, setsearchvalue] = useState('');
  const [isData, setIsData] = useState('')
  const [deleteId, setDeleteId] = useState('');
  const [openDelete, setOpenDelete] = useState(false)

  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [page, setPage] = useState(0);
  const [fromdate, setfromdate] = useState('')
  const [todate, settodate] = useState('')
  const [openEdit, setOpenEdit] = useState(false)
  const [updateData, setupdatedata] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [searchCity, setSearchCity] = useState('');
  const [searchPincode, setSearchPincode] = useState('');
  const [searchState, setSearchState] = useState('');


  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    setSearchCity('');
  };

  const handleRefreshTable = () => {
    setRefresh(!refresh);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));

    setPage(0);
  };

  const handleDelete = (id) => {
    setOpenDelete(true);
    setDeleteId(id);
  }

  const handleDeleteClose = () => {
    setOpenDelete(false)
  }

  const handleEdit = (data) => {
    setOpenEdit(true);
    setupdatedata(data);
  };

  const closeEdit = () => {
    setOpenEdit(false)
  }

  const filterdata = async (e) => {
    e.preventDefault();

    try {
      if (fromdate && todate) {
        
        const response = await serverInstance(
          `expense/get-expenseGroup?fromDate=${fromdate}&toDate=${todate}`,
          'get'
        );
        if (response.data) {
          setIsData(response.data);
         
        }
      }} catch (error) {
      console.log(error)
    }
  };


  const getGroup = () => {
    serverInstance('expense/get-expenseGroup', 'get').then((res) => {
      if (res.status) {
        setIsData(res.data)
      } else {
        Swal.fire('Error', 'something went  wrong', 'error');
      }

    })
  }

  const deleteGroup = () => {

    try {

      serverInstance(`expense/delete-expenseGroup?id=${deleteId}`, 'delete').then((res) => {
        console.log(res)
        if (res.status === true) {
          handleDeleteClose()
          Swal.fire('Deleted!', res.message, 'success');
        }
        if (res.status === false) {
          handleDeleteClose()
          Swal.fire('Error!', res.message, 'failed');

        }
      })
    } catch (err) {
      console.log(err)
    }

  };

  useEffect(() => {
    getGroup();
  }, [refresh, openDelete, openEdit]);


  return (
    <>


      <div style={{display:'flex',justifyContent:'space-between'}}>

        {/* <div className="selecttabcontainer1" style={{ display: 'flex'}}>
          <RadioGroup
            row
            aria-label="language"
            name="language"
            value={selectedLanguage}
            onChange={handleLanguageChange}
            sx={{display:'flex' }}
          >
            <FormControlLabel value="en" control={<Radio />} label="English" />
            <FormControlLabel value="hi" control={<Radio />} label="Hindi" />
          </RadioGroup>

          {selectedLanguage === 'hi' ? (
            <>

              <ReactTransliterate
                style={custumstyle}
                id="full-name"
                required
                value={searchCity}
                onChangeText={(searchCity) => {
                  setSearchCity(searchCity);
                }}
               
                onChange={(e) => setSearchCity(e.target.value)}
                lang="hi"
                placeholder="Search City in Hindi"
              />
            </>

          ) : (
            <Input
              placeholder={`Search ${selectedLanguage === 'en' ? 'City' : 'शहर'}`}
              sx={{marginLeft:'-10rem'}}
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
            />)}

          <Input
            placeholder="Pincode"
            className="selecttab"
            sx={{marginLeft:'-10rem'}}
            value={searchPincode}
            onChange={(e) => setSearchPincode(e.target.value)}
          />

          <Input
            placeholder="State"
            className="selecttab"
            
            value={searchState}
            onChange={(e) => setSearchState(e.target.value)}
          />

        </div> */}

        <div
          className="search-header "
          style={{ paddingLeft: '5%', paddingRight: '1.3rem',gap:100 ,justifyContent:'space-evenly'}}
        >
          <div className="search-inner-div-reports">
            <form className="search-inner-div-reports" onSubmit={filterdata}>
              <div className="Center_main_dic_filetr">
                <label htmlFor="donation-date">From Date</label>
                <input
                  id="donation-date"
                  style={{ width: '15rem' }}
                  type="date"
                  placeholder="From"
                  value={fromdate}
                  name="datefrom"
                  onChange={(e) => {
                    setfromdate(e.target.value);
                  }}
                />
              </div>
              <div className="Center_main_dic_filetr">
                <label htmlFor="donation-date">To Date</label>
                <input
                  id="donation-date"
                  style={{ width: '15rem' }}
                  type="date"
                  placeholder="From"
                  value={todate}
                  name="todate"
                  onChange={(e) => {
                    settodate(e.target.value);
                  }}
                />
              </div>

              {/* <div className="Center_main_dic_filetr">
                <label>&nbsp;</label>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchvalue}
                    name="searchvalue"
                    onChange={(e) => setsearchvalue(e.target.value)}
                  />
                </Search>
              </div> */}

              <div className="Center_main_dic_filetr">
                <label>&nbsp;</label>
                <button>Search</button>
              </div>
            </form>
          </div>
        </div>

        <div className="selecttabcontainer2">
          <div className="col-md-1">

          </div>



          <div className="col-md-1 actionbtn" >
            <Tooltip title="Export Excel File">
              <IconButton>
                <img
                  src={ExportExcel}
                  alt="cc"
                  style={{ width: '30px', marginLeft: '' }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Export Pdf File">
              <IconButton>
                <img
                  //   onClick={() => ExportPdfmanul(isData, 'Report')}
                  src={ExportPdf}
                  alt="cc"
                  style={{ width: '30px' }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Print Report">
              <IconButton>
                <img
                  style={{ width: '30px' }}
                  //   onClick={() => handleOpen5()}
                  src={Print}
                  alt=" Print"
                />
              </IconButton>
            </Tooltip>
          </div>
          <div className="col-md-1">

          </div>
        </div>
      </div>

      <div  >
        <hr />
        <Add refreshTable={handleRefreshTable} />
        <br />
        <br />
        <hr />
      </div>


      <div className="wrapper_abc" >

        <Dialog
          open={openDelete}
          onClose={handleDeleteClose}
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
            <Button onClick={handleDeleteClose}>Disagree</Button>
            <Button onClick={deleteGroup} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>

        <div className="table-div-maain" style={{ marginLeft: '4rem' }}>
          <Table
            sx={{ minWidth: 650, width: '97%' }}
            aria-label="simple table"
          >
            <TableHead style={{ background: '#FFEEE0' }}>
              <TableRow>
                <TableCell>
                  S. No.
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('donation_date')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  City
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('ReceiptNo')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Pincode
                  <i
                    style={{ marginLeft: '0px' }}
                    onClick={() => sortData('voucherNo')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  State
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('phoneNo')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
                <TableCell>
                  Country
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('name')}
                    class={`fa fa-sort`}
                  />
                </TableCell>

                <TableCell>
                  Action
                  <i
                    style={{ marginLeft: '0.5rem' }}
                    onClick={() => sortData('name')}
                    class={`fa fa-sort`}
                  />
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {
                openEdit && <Add openEdit={openEdit} closeEdit={closeEdit} updateData={updateData} />
              }

              {
                isData &&
                isData
                  .filter(item =>
                    item.City.includes(searchCity) &&
                    item.PinCode.includes(searchPincode) &&
                    item.State.includes(searchState)
                  ).map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item?.City}</TableCell>
                      <TableCell>{item?.PinCode}</TableCell>
                      <TableCell>{item?.State}</TableCell>
                      <TableCell>{item?.Country}</TableCell>
                      <TableCell>
                        <Tooltip title="Edit">

                          <img
                            onClick={() => handleEdit(item)}
                            src={Edit} alt="Edit"

                            style={{ width: '20px', marginRight: '0.5rem' }}
                          />
                        </Tooltip>
                        <Tooltip title="Delete">
                          <img
                            onClick={() => handleDelete(item?.id)}
                            src={Delete}
                            alt="Delete"
                            style={{ width: '20px' }} />
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
              }
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={isData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[50, 100, 200]}
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
}
