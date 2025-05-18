import React, { useState } from 'react';
import './SearchBar.css';
import Select from "react-select";
import Print from '../../../../../../../assets/Print.png';
import ExportPdf from '../../../../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../../../../assets/ExportExcel.png';
import { Tooltip, IconButton, TextField } from '@mui/material';
import { jsPDF } from "jspdf";
import * as XLSX from 'xlsx';
import Add from '../Add/Add';

const SearchBar = ({ getItem, isData }) => {
  const [itemName, setItemName] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [uom, setUom] = useState('');

  const handleSearch = () => {
    const filteredData = isData.filter(item =>
      (!itemName || item.item_name?.toLowerCase().includes(itemName.toLowerCase())) &&
      (!departmentName || item.department_name?.toLowerCase().includes(departmentName.toLowerCase())) &&
      (!uom || (item.UOM && item.UOM.toLowerCase().includes(uom.toLowerCase())))
    );
    console.log(filteredData);
    getItem(filteredData);
  };

  const handleReset = () => {
    setItemName('');
    setDepartmentName('');
    setUom('');
    getItem(isData); // Reset to the original data
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(isData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "Report.xlsx");
  };

  const exportToPdf = () => {
    const doc = new jsPDF();
    const headers = [["Item Name", "Department Name", "UOM"]];
    const data = isData.map(item => [
      item.item_name || "N/A",
      item.department_name || "N/A",
      item.UOM || "N/A"
    ]);

    doc.autoTable({
      head: headers,
      body: data,
    });

    doc.save("Report.pdf");
  };

  return (
    <div className='mainComponent'>
      <div className="selecttabcontainer1">
        <TextField
          type="text"
          placeholder="Item Name"
          className="selecttab"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <TextField
          type="text"
          placeholder="Department Name"
          className="selecttab"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
        />
        <TextField
          type="text"
          placeholder="UOM"
          className="selecttab"
          value={uom}
          onChange={(e) => setUom(e.target.value)}
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
            <IconButton onClick={exportToExcel}>
              <img
                src={ExportExcel}
                alt="Excel Export"
                style={{ width: '30px', marginLeft: '0rem' }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Export Pdf File">
            <IconButton onClick={exportToPdf}>
              <img
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
          <Add getItem={getItem} />
          &nbsp;&nbsp;
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
