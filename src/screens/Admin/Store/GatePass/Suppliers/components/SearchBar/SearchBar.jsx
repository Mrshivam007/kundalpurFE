import React, { useState } from 'react'
import './SearchBar.css'
import Select from "react-select";
import Print from '../../../../../../../assets/Print.png';
import ExportPdf from '../../../../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../../../../assets/ExportExcel.png';
import { Tooltip, IconButton } from '@mui/material';
import { Autocomplete, TextField } from '@mui/material';


const SearchBar = ({ isData, getGP , handlePrint}) => {

    const [dateFrom, setDateFrom] = useState('')
    const [GENo, setGENo] = useState('')
    const [PONo, setPONo] = useState('')
    console.log('isData', isData)

    const dataArray = Array.isArray(isData) ? isData : [];

    const handleReset = () => {
        setGENo('')
        setPONo('')
        getGP();
    }

    const handleSearch = () => {

        const filteredData = dataArray.filter(
            (item) =>
                (GENo && item.gateEntryNo === GENo) || (PONo && item.purchaseOrderNo === PONo)
        );

        console.log('Filtered Data:', filteredData);

        getGP(filteredData);
    };


    return (

        <div className='mainComponent'>
            <div className="selecttabcontainer1">


                <Autocomplete
                    sx={{
                        width: '18%',

                    }}
                    value={dataArray.find((item) => item.gateEntryNo === GENo) || null}
                    onChange={(_, newValue) => setGENo(newValue ? newValue.gateEntryNo : '')}
                    options={dataArray}
                    getOptionLabel={(option) => option.gateEntryNo || ''}
                    isOptionEqualToValue={(option, value) => option.gateEntryNo === value.gateEntryNo}
                    renderInput={(params) => <TextField {...params} label="Search Gate Entry No" size='small' />}
                />

                <Autocomplete
                    sx={{
                        width: '18%'
                    }}
                    value={dataArray.find((item) => item.purchaseOrderNo === PONo) || null}
                    onChange={(_, newValue) => setPONo(newValue ? newValue.purchaseOrderNo : '')}
                    options={dataArray}
                    getOptionLabel={(option) => option.purchaseOrderNo || ''}
                    isOptionEqualToValue={(option, value) => option.purchaseOrderNo === value.purchaseOrderNo}
                    renderInput={(params) => <TextField {...params} label="Search Purchase Order No" size='small' />}
                />


                <button id="srcbtn" onClick={handleSearch} >
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
                                onClick={handlePrint}
                                src={Print}
                                alt=" Print"
                            />
                        </IconButton>
                    </Tooltip>

                    {/* <button id="srcbtn">
                        +Add
                    </button> */}
                    &nbsp;&nbsp;
                </div>
            </div>
        </div>
    )
}

export default SearchBar