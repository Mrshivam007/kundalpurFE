import React, { useEffect, useState } from 'react'
import './SearchBar.css'
import RSelect from "react-select";
import { Select, MenuItem } from '@mui/material';
import Print from '../../../../../../../assets/Print.png';
import ExportPdf from '../../../../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../../../../assets/ExportExcel.png';
import { Tooltip, IconButton } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Fade, Box, Radio, RadioGroup, FormControlLabel, Input, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import Swal from 'sweetalert2';
import { Autocomplete, TextField } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox';
import { CustomInput } from '../../../../../Expense/common';
import { CustomInputLabel } from '../../../../PurchaseOrder/Suppliers/components/common';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { serverInstance } from '../../../../../../../API/ServerInstance';
import AdjustStock from './Adjust';
import IssueStock from './Issue';
import OpeningStock from './Opening Stock';

const style = {

    position: 'absolute',
    width: 'auto',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    background: '#FFFFF',
    borderRadius: '15px',
    boxShadow: 24,
    p: 4,
};

const theme = createTheme({
    typography: {
        fontFamily: 'Poppins, sans-serif',
    },
});


const SearchBar = ({ getInventory, isData, handlePrint }) => {

    const [supCode, setSupCode] = useState('')
    const [supName, setSupName] = useState('')
    const [deptCode, setDeptCode] = useState('');
    const [departmentList, setDepartmentList] = useState([])
    const [issueOpen, setIssueOpen] = useState(false)
    const [selectedItems, setSelectedItems] = useState([]);
    const [itemList, setItemList] = useState([])
    const [itemName, setItemName] = useState('')
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedDropdown, setSelectedDropdown] = useState('');



    const [supplierList, setSupplierList] = useState([]);


    const getItem = async () => {
        try {
            const res = await serverInstance('store/get-itemMaster', 'get');
            setItemList(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleIssueStock = () => {
        setIssueOpen(true)
    }

    const closeIssueStock = () => {
        setIssueOpen(false)
    }


    const handleSearch = () => {
        const filteredData = isData.filter((item) => {
            // Convert `inventoryLists` to an array if it's an object
            const inventoryLists = Array.isArray(item.inventoryLists) ? item.inventoryLists : [item.inventoryLists];
    
            // Apply selected items filter
            const itemNameIncluded =
                selectedItems.length === 0 ||
                selectedItems.some((selectedItem) =>
                    inventoryLists.some((inventoryItem) =>
                        inventoryItem.MaterialName
                            ?.toLowerCase()
                            .includes(selectedItem.item_name.toLowerCase())
                    )
                );
    
            // Apply date filter
            const dateIncluded =
                !selectedDate || new Date(item.Date).toISOString().split('T')[0] === selectedDate;
    
            // Apply dropdown filter
            const dropdownIncluded =
                !selectedDropdown ||
                (selectedDropdown === "Purchase Entry" && !item.StaffName) ||
                (selectedDropdown === "Purchase Issue" && !!item.StaffName);
    
            // Apply department and supplier filters
            const deptCodeIncluded =
                !deptCode || item.FromDepartmentCode.toLowerCase().includes(deptCode.toLowerCase());
            const supNameIncluded =
                !supName || item.SupplierName?.toLowerCase().includes(supName.toLowerCase());
    
            // Return only the values where the filters are applied
            return (
                (!selectedItems.length || itemNameIncluded) &&
                (!selectedDate || dateIncluded) &&
                (!selectedDropdown || dropdownIncluded) &&
                (!deptCode || deptCodeIncluded) &&
                (!supName || supNameIncluded)
            );
        });
    
        getInventory(filteredData);
        console.log('Filtered Data:', filteredData);
    };
    

    const handleReset = () => {
        getInventory(isData);
        setDeptCode('');
        setItemName('');
        setSupCode('')
        setSelectedDate('');
        setSelectedDropdown('');
        setSelectedItems([]);
    };

    const getSupplier = async () => {
        try {
            const res = await serverInstance('store/get-supplierMaster', 'get');
            setSupplierList(res.data);
        } catch (err) {
            console.log(err);
        }
    };



    const getDepartment = async () => {
        try {
            const res = await serverInstance('store/get-departmentMaster', 'get')

            setDepartmentList(res.data)
            console.log(departmentList)
        } catch (err) {
            console.log(err)
        }
    }

    var options = { year: 'numeric', month: 'short', day: '2-digit' };
    var today = new Date();
    const currDate = today
        .toLocaleDateString('en-IN', options)
        .replace(/-/g, ' ');

    useEffect(() => {
        getItem();
        getDepartment()
        getSupplier()

    }, [])


    return (
        <>
            {issueOpen && <IssueStock open={issueOpen} close={closeIssueStock} isData={isData} getInventory={getInventory} />}

            <div className='mainComponent'>
                <div className="selecttabcontainer1">
                    <Autocomplete
                        sx={{ width: '18%' }}
                        value={departmentList.find((item) => item.departmentCode === deptCode) || null}
                        onChange={(_, newValue) => setDeptCode(newValue ? newValue.departmentCode : '')}
                        options={departmentList}
                        getOptionLabel={(option) => option.departmentCode || ''}
                        isOptionEqualToValue={(option, value) => option.departmentCode === value.departmentCode}
                        renderInput={(params) => <TextField {...params} label="Select Department Code" size="small" />}
                    />

                    <Autocomplete
                        sx={{ width: '18%' }}
                        value={supplierList.find((item) => item.supplierName === supName) || null}
                        onChange={(_, newValue) => setSupName(newValue ? newValue.supplierName : '')}
                        options={supplierList}
                        getOptionLabel={(option) => option.supplierName || ''}
                        isOptionEqualToValue={(option, value) => option.supplierName === value.supplierName}
                        renderInput={(params) => <TextField {...params} label="Select Supplier Name" size="small" />}
                    />

                    <Autocomplete
                        sx={{ width: '18%' }}
                        multiple
                        value={selectedItems}
                        onChange={(_, newValues) => setSelectedItems(newValues)}
                        options={itemList}
                        getOptionLabel={(option) => option.item_name || ''}
                        isOptionEqualToValue={(option, value) => option.item_name === value.item_name}
                        renderInput={(params) => <TextField {...params} label="Select Item" size="small" />}
                    />

                    {/* Date Picker */}
                    <TextField
                        sx={{ width: '18%' }}
                        label="Select Date"
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        size="small"
                    />

                    {/* Dropdown */}
                    <Autocomplete
                        sx={{ width: '18%' }}
                        value={selectedDropdown || null}
                        onChange={(_, newValue) => setSelectedDropdown(newValue)}
                        options={["Purchase Entry", "Purchase Issue"]}
                        renderInput={(params) => <TextField {...params} label="Select Type" size="small" />}
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
                                    onClick={() => handlePrint()}
                                    src={Print}
                                    alt=" Print"
                                />
                            </IconButton>
                        </Tooltip>

                        <Button
                            id="srcbtn"
                            onClick={handleIssueStock}
                            sx={{
                                borderRadius: '0.5rem',
                                color: 'black',
                                width: '10vw',
                                marginRight: '1rem',
                                backgroundColor: '#BCEDDF',

                                ":hover": {
                                    bgcolor: '#f2ad6f'
                                }
                            }}
                        >
                            Purchase Issue
                        </Button>


                        &nbsp;&nbsp;
                    </div>
                </div>
            </div>

        </>
    )
}

export default SearchBar