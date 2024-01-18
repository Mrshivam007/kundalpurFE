import React, { useEffect, useState } from "react";

import Select from "react-select";
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import './Search.css'
import { Box, Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
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

export default function SearchBar() {

  const [searchvalue, setsearchvalue] = useState('');
  const [fromdate, setfromdate] = useState('')
  const [todate, settodate] = useState('')
  const [isData , setIsData] = useState('')

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




  return (
    <>
      {/* {purchaseOrder?.poLocation?.company_master?.length && ( */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div
          className="search-header "
          style={{ paddingLeft: '5%', paddingRight: '1.3rem', gap: 100, justifyContent: 'space-evenly' }}
        >
          <div className="search-inner-div-reports">
            <form className="search-inner-div-reports">
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

              <div className="Center_main_dic_filetr">
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
              </div>

              <div className="Center_main_dic_filetr">
                <label>&nbsp;</label>
                <button>Search</button>
              </div>
            </form>
          </div>
        </div>

        <div className="selecttabcontainer2">
       
          <div className="col-md-1 actionbtn" >
            <Tooltip title="Export Excel File">
              <IconButton>
                <img
                  //   onClick={() => ExportToExcel()}
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
      {/* )} */

      }

    </>
  );
}
