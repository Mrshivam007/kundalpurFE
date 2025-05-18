import React, { useState } from 'react';
import './SearchBar.css';
import Select from "react-select";
import Print from '../../../../../../../assets/Print.png';
import ExportPdf from '../../../../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../../../../assets/ExportExcel.png';
import { Tooltip, IconButton, TextField } from '@mui/material';
import Add from '../Add/Add';

const SearchBar = ({ getDepartment, isData }) => {
  const [departmentName, setDepartmentName] = useState(''); // Updated state for departmentName
  const [departmentAddress, setDepartmentAddress] = useState(''); // Updated state for departmentAddress

  const handleSearch = () => {
    const filteredData = isData.filter(item =>
      (!departmentName || item.departmentName.toLowerCase().includes(departmentName.toLowerCase())) && // Updated filter logic
      (!departmentAddress || item.departmentAddress.toLowerCase().includes(departmentAddress.toLowerCase())) // Updated filter logic
    );
    console.log(filteredData);
    getDepartment(filteredData);
  };

  const handleReset = () => {
    setDepartmentName('');
    setDepartmentAddress('');
    getDepartment(isData); // Reset to the original data
  };

  return (
    <div className='mainComponent'>
      <div className="selecttabcontainer1">
        <TextField
          type="text"
          placeholder="Department Name" // Updated placeholder
          className="selecttab"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)} // Updated onChange handler
        />
        <TextField
          type="text"
          placeholder="Department Address" // Updated placeholder
          className="selecttab"
          value={departmentAddress}
          onChange={(e) => setDepartmentAddress(e.target.value)} // Updated onChange handler
        />
        <button id="srcbtn" onClick={handleSearch}>
          Search
        </button>
        <button id="srcbtn" onClick={handleReset}>
          Reset
        </button>
      </div>
      <div className=''>
        <div
          className="search-header-print"
          style={{
            borderBottom: '1px solid gray',
            width: '100%',
            borderTop: '1px solid gray',
            paddingTop: '1%',
            marginTop: '1%'
          }}
        >
          <Tooltip title="Export Excel File">
            <IconButton>
              <img
                onClick={() => ExportToExcel()}
                src={ExportExcel}
                alt="Excel Export"
                style={{ width: '30px', marginLeft: '0rem' }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Export Pdf File">
            <IconButton>
              <img
                onClick={() => ExportPdfmanul(isData, 'Report')}
                src={ExportPdf}
                alt="PDF Export"
                style={{ width: '30px' }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Print Report">
            <IconButton>
              <img
                style={{ width: '30px' }}
                onClick={() => handleOpen5()}
                src={Print}
                alt="Print"
              />
            </IconButton>
          </Tooltip>
          <Add getDepartment={getDepartment} />
          &nbsp;&nbsp;
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
