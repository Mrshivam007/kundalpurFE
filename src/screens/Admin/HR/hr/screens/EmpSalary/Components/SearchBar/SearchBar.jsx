import React, { useState } from 'react'
// import './SearchBar.css'
import AddSal from '../Add/AddSal'
import Select from "react-select";
import Print from '../../../../../../../../assets/Print.png';
import ExportPdf from '../../../../../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../../../../../assets/ExportExcel.png';
import { Tooltip, IconButton } from '@mui/material';

const SearchBar = () => {

  const [dateFrom, setDateFrom] = useState('')


  return (

    <div className='mainComponent'>
      <div className="selecttabcontainer1" style={{display:'flex' , justifyContent: 'flex-start' , marginLeft:'2rem'}}>


        <Select

          placeholder="Salary Date"
          className="selecttab"

        />
    

        <Select
          // value={statusValue}

          placeholder="Location"
          className="selecttab"

        />

        <button id="srcbtn" >
          Search
        </button>
        <button id="srcbtn">
          Reset
        </button>

      </div>

      <div className=''>


        <div
          className="search-header-print"
          style={{
            borderBottom: '1px  solid gray',
            width: '100%',
            borderTop: ' 1px solid gray',
            paddingTop: '1%',
            marginTop: '1%'
          }}
        >

        <AddSal />


          &nbsp;&nbsp;
        </div>
      </div>
    </div>
  )
}

export default SearchBar