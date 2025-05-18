import React, { useState } from 'react';
import './SearchBar.css';
import Select from "react-select";
import Print from '../../../../../../../assets/Print.png';
import ExportPdf from '../../../../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../../../../assets/ExportExcel.png';
import { Tooltip, IconButton, TextField } from '@mui/material';
import Add from '../Add/Add';

const SearchBar = ({ getSupplier, isData }) => {
  const [supplierName, setSupplierName] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNo, setMobileNo] = useState('');

  const handleSearch = () => {
    const filteredData = isData.filter(item =>
      (!supplierName || item.supplierName.toLowerCase().includes(supplierName.toLowerCase())) &&
      (!address || item.address.toLowerCase().includes(address.toLowerCase())) &&
      (!mobileNo || item.mobileNo.includes(mobileNo))
    );
    console.log(filteredData);
    getSupplier(filteredData);
  };

  const handleReset = () => {
    setSupplierName('');
    setAddress('');
    setMobileNo('');
    getSupplier(isData); // Reset to the original data
  };

  return (
    <div className='mainComponent'>
      <div className="selecttabcontainer1">
        <TextField
          type="text"
          placeholder="Supplier Name"
          className="selecttab"
          value={supplierName}
          onChange={(e) => setSupplierName(e.target.value)}
        />
        <TextField
          type="text"
          placeholder="Address"
          className="selecttab"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          type="text"
          placeholder="Mobile No"
          className="selecttab"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
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
          <Add getSupplier={getSupplier} />
          &nbsp;&nbsp;
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
