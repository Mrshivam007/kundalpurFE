import React, { useState, useEffect } from 'react'
import './SearchBar.css'
import Select from "react-select";
import { Autocomplete, TextField } from '@mui/material'
import { serverInstance } from '../../../../../../../API/ServerInstance';
import Print from '../../../../../../../assets/Print.png';
import ExportPdf from '../../../../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../../../../assets/ExportExcel.png';
import { Tooltip, IconButton } from '@mui/material';

const SearchBar = ({ isData, getApprover }) => {

    const [dateFrom, setDateFrom] = useState('')
    const [supplierList, setSupplierList] = useState([])
    const [departmentList, setDepartmentList] = useState([])
    const [PRNo, setPRNo] = useState('')
    const [deptCode, setDeptCode] = useState('')
    const [supCode, setSupCode] = useState('')


    const getSupplier = async () => {
        try {
            const res = await serverInstance('admin/get-supplierName', 'get');
            setSupplierList(res.data);
        } catch (err) {
            console.log(err);
        }
    };



    const getDepartment = async () => {
        try {
            const res = await serverInstance('admin/get-department', 'get')

            setDepartmentList(res.data)
            console.log(departmentList)
        } catch (err) {
            console.log(err)
        }
    }

    const handleReset = () => {
        setSupCode('')
        setPRNo('')
        setDeptCode('')
        getApprover();
    }

    const handleSearch = () => {
        console.log('deptCode:', deptCode);
        console.log('supCode:', supCode);

        const filteredData = isData.filter(
            (item) => item.departmentCode === deptCode || item.supplierCode === supCode || item.purchaseRequisitionNo === PRNo
        );

        getApprover(filteredData);
        console.log(filteredData);

    };

    useEffect(() => {
        getSupplier();
        getDepartment();
    }, [])


    return (

        <div className='mainComponent'>
            <div className="selecttabcontainer1">


                <Autocomplete
                    sx={{
                        width: '18%',

                    }}
                    value={isData && isData.find((item) => item.purchaseRequisitionNo === PRNo) || null}
                    onChange={(_, newValue) => setPRNo(newValue ? newValue.purchaseRequisitionNo : '')}
                    options={isData}
                    getOptionLabel={(option) => option.purchaseRequisitionNo || ''}
                    isOptionEqualToValue={(option, value) => option.purchaseRequisitionNo === value.purchaseRequisitionNo}
                    renderInput={(params) => <TextField {...params} label="Select PR No." size='small' />}
                />


                <Autocomplete
                    sx={{
                        width: '18%',

                    }}
                    value={departmentList.find((item) => item.department_code === deptCode) || null}
                    onChange={(_, newValue) => setDeptCode(newValue ? newValue.department_code : '')}
                    options={departmentList}
                    getOptionLabel={(option) => option.department_code || ''}
                    isOptionEqualToValue={(option, value) => option.department_code === value.department_code}
                    renderInput={(params) => <TextField {...params} label="Select Department Code" size='small' />}
                />

                <Autocomplete
                    sx={{ width: '18%' }}
                    value={supplierList.find((item) => item.supplierCode === supCode) || null}
                    onChange={(_, newValue) => setSupCode(newValue ? newValue.supplierCode : '')}
                    options={supplierList}
                    getOptionLabel={(option) => option.supplierCode || ''}
                    isOptionEqualToValue={(option, value) => option.supplierCode === value.supplierCode}
                    renderInput={(params) => <TextField {...params} label="Select Supplier Code" size='small' />}
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
{/* 
                    <button id="srcbtn">
                        +Add
                    </button> */}
                    &nbsp;&nbsp;
                </div>
            </div>
        </div>
    )
}

export default SearchBar