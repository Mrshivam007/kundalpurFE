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
      <div className="cash-donation-container-innser" style={{ width: '100%' }}>
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
    </>
  );
}

export default CheckAvalability;
