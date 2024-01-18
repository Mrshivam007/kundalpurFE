import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
// import "../../../../../assets/styles/Search.css";
import './Search.css'
import { Input } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ExportPdf from '../../../../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../../.././../assets/ExportExcel.png';
import Print from '../../../../../../../assets/Print.png';


export default function Search({ setopendashboard }) {
  const dispatch = useDispatch();

  
  const [ledgerNo, setLedgerNo] = useState('');

  const handleInputChange = (e) => {
    setLedgerNo(e.target.value);
  }

  const handleSearchClick = () => {
    handleSearch(ledgerNo);
  }
 


  return (
    <>

    

      <div className="bigcontainer">
        <div className="selecttabcontainer1">
        <Input
            placeholder="Ledger No."
            value={ledgerNo}
            onChange={handleInputChange}
          />
          <Select

            placeholder="Supplier Name"
            className="selecttab"

          />
          <Select

            placeholder="Location"
            className="selecttab"

          />
         <button id="srcbtn" onClick={handleSearchClick}>
            Search
          </button>
          <button id="srcbtn" >
            Reset
          </button>
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
     
     

    </>
  );
}
