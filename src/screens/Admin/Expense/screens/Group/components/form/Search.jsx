import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
// import "../../../../../assets/styles/Search.css";
import './Search.css'
import { Box, Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ExportPdf from '../../../../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../../.././../assets/ExportExcel.png';
import Print from '../../../../../../../assets/Print.png';
import PDF from '../../../../../../../assets/ExportPdf.png';




export default function Search() {

  

  return (
    <>
    
        <div className="bigcontainer">
          <div className="selecttabcontainer1">
            <Select
             
              placeholder="Expense Code"
              
              
            />
            <Select
              
              placeholder="Supplier Name"
              className="selecttab"
            
            />
           <Select
            
              placeholder="Location"
              className="selecttab"
              
            />
            <button id="srcbtn" >
              Search
            </button>
            <button id="srcbtn" >
              Reset
            </button>
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
      {/* )} */
      
      }
      
    </>
  );
}
