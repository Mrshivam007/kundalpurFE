import React, { useState } from 'react';
import './SearchBar.css';
import Print from '../../../../../../../assets/Print.png';
import ExportPdf from '../../../../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../../../../assets/ExportExcel.png';
import { Tooltip, IconButton, TextField } from '@mui/material';
import Add from '../Add/Add';

const SearchBar = ({ getSupplier, isData }) => {
  const [issuePersonName, setIssuePersonName] = useState(''); // State for Issue Person Name

  const handleSearch = () => {
    const filteredData = isData.filter(item =>
      (!issuePersonName || item.issuePersonName.toLowerCase().includes(issuePersonName.toLowerCase())) // Filter by Issue Person Name
    );
    getSupplier(filteredData);
  };

  const handleReset = () => {
    setIssuePersonName(''); // Reset Issue Person Name filter
    getSupplier(isData); // Reset to the original data
  };

  return (
    <div className='mainComponent'>
      <div className="selecttabcontainer1">
        <TextField
          label="Issue Person Name" // Input field for Issue Person Name
          variant="outlined"
          size="small"
          value={issuePersonName}
          onChange={(e) => setIssuePersonName(e.target.value)}
          style={{ marginRight: '10px' }}
        />

        <button id="srcbtn" onClick={handleSearch}>
          Search
        </button>
        <button id="srcbtn" onClick={handleReset}>
          Reset
        </button>
      </div>
      <div className="search-header-print">
        <Tooltip title="Export Excel File">
          <IconButton>
            <img
              onClick={() => ExportToExcel()}
              src={ExportExcel}
              alt="Excel Export"
              style={{ width: '30px' }}
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
        <Add getSupplier={getSupplier} />
      </div>
    </div>
  );
};

export default SearchBar;
