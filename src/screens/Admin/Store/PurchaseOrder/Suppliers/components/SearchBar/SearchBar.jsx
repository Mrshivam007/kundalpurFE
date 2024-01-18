import React, { useEffect, useState } from 'react'
import './SearchBar.css'

import Print from '../../../../../../../assets/Print.png';
import ExportPdf from '../../../../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../../../../assets/ExportExcel.png';
import { Tooltip, IconButton } from '@mui/material';
import Add from '../Add/Add'
import GateEntry from '../GateEntry/GateEntry'
import PaymentIn from '../Add/PaymentIn'
import { Input } from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { serverInstance } from '../../../../../../../API/ServerInstance';

const SearchBar = ({ isData, getPO, handlePrint }) => {

    const navigate = useNavigate();

    const [poCode, setPoCode] = useState('');
    const [supCode, setSupCode] = useState('');
    const [dateFrom, setDateFrom] = useState('')
    const [supList, setSupList] = useState([])
    const [deptCode, setDeptCode] = useState('')
    const [deptList, setDeptList] = useState([])

    const getSupplier = async () => {
        try {
            const res = await serverInstance('admin/get-supplierName', 'get')

            setSupList(res.data)

        } catch (err) {
            console.log(err)
        }
    }

    const getDept = async () => {
        try {
            const res = await serverInstance('admin/get-Department', 'get')

            setDeptList(res.data)
            console.log('dept', deptList)
        } catch (err) {
            console.log(err)
        }
    }


    const handleReset = () => {
        getPO(isData)
        setSupCode('')
        setDeptCode('')
        setPoCode('')
    }

    const handleSearch = () => {

        const filteredData = isData.filter(item => {

            return (

                item.purchaseOrderNo.includes(poCode) &&
                item.supplierCode.toLowerCase().includes(supCode.toLowerCase()) &&
                item.departmentCode.toLowerCase().includes(deptCode.toLowerCase())
            );
        });
        console.log('filteredData', filteredData)


        getPO(filteredData);
    };

    useEffect(() => {
        getDept();
        getSupplier();
    }, [])

    return (

        <div className='mainComponent'>
            <div className="selecttabcontainer1">


                <Input
                    placeholder="PO Code"
                    className="selecttab"
                    value={poCode}
                    onChange={(e) => setPoCode(e.target.value)}
                />
                <Select
                    required
                    sx={{
                        width: '18rem',
                        height: '2rem',
                        borderRadius: '0.5rem',
                        fontSize: 14,
                        '& .MuiSelect-select': {
                            padding: '1px',
                        },
                    }}
                    value={supCode}
                    onChange={(e) => setSupCode(e.target.value)}
                    displayEmpty
                >
                    <MenuItem disabled value="">
                        Select Supplier Code
                    </MenuItem>

                    {supList &&
                        supList?.map((item, index) => (
                            <MenuItem
                                sx={{
                                    fontSize: 14,
                                }}
                                key={item.id}
                                value={item?.supplierCode}
                            >
                                {item?.supplierCode}
                            </MenuItem>
                        ))}
                </Select>


                <Select
                    required
                    sx={{
                        width: '18rem',
                        height: '2rem',
                        borderRadius: '0.5rem',
                        fontSize: 14,
                        '& .MuiSelect-select': {
                            padding: '1px',
                        },
                    }}
                    value={deptCode}
                    onChange={(e) => setDeptCode(e.target.value)}
                    displayEmpty
                >
                    <MenuItem disabled value="">
                        Select Department Code
                    </MenuItem>

                    {deptList &&
                        deptList?.map((item, index) => (
                            <MenuItem
                                sx={{
                                    fontSize: 14,
                                }}
                                key={item.id}
                                value={item?.department_code}
                            >
                                {item?.department_code}
                            </MenuItem>
                        ))}
                </Select>
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
                                onClick={() => handlePrint()} 
                                src={Print}
                                alt=" Print"
                            />
                        </IconButton>
                    </Tooltip>



                    <Add getPO={getPO} />

                    <PaymentIn />

                    <GateEntry />


                    &nbsp;&nbsp;
                </div>
            </div>
        </div>
    )
}

export default SearchBar