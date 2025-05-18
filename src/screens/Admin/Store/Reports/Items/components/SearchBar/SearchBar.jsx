import React, { useState } from 'react'
import './SearchBar.css'
import Select from "react-select";
import Print from '../../../../../../../assets/Print.png';
import ExportPdf from '../../../../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../../../../assets/ExportExcel.png';
import { Tooltip, IconButton } from '@mui/material';

const SearchBar = () => {

    const [dateFrom, setDateFrom] = useState('')


    return (

        <div className='mainComponent'>
            <div className="selecttabcontainer1">


                <Select

                    placeholder="PO Code"
                    className="selecttab"

                />
                <Select

                    placeholder="Branch Name"
                    className="selecttab"

                />
                <Select
                    // value={statusValue}

                    placeholder="Status"
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



                    <Tooltip title="Export Excel File">
                        <IconButton>
                            <img
                                onClick={() => ExportToExcel()}
                                src={ExportExcel}
                                alt="cc"
                                style={{ width: '30px', marginLeft: '0rem' }}
                            />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Export Pdf File">
                        <IconButton>
                            <img
                                onClick={() => ExportPdfmanul(isData, 'Report')}
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
                                onClick={() => handleOpen5()}
                                src={Print}
                                alt=" Print"
                            />
                        </IconButton>
                    </Tooltip>

                    <button id="srcbtn">
                        +Add
                    </button>
                    &nbsp;&nbsp;
                </div>
            </div>
        </div>
    )
}

export default SearchBar