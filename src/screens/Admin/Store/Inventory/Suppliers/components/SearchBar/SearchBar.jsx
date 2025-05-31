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
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from 'xlsx';
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
    const [filteredData, setFilteredData] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [selectedDropdown, setSelectedDropdown] = useState('');
    const [IssuePersonList, setIssuePersonList] = useState([]);
    const [IssuePerson, setIssuePerson] = useState([]);



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

    const exportToExcel = (data, fileName) => {
        // Define static headers
        const staticHeaders = [
            "Sn",
            "Date",
            "Time",
            "Item Code",
            "Item Name",
            "From Department Code",
            "From Department Name",
            "To Department Code",
            "To Department Name",
            "Supplier Code",
            "Supplier Name",
            "Issue Quantity",
            "Issue Person",
            "Return Quantity",
            "Purchase Quantity",
            "UOM",
            "Opening Stock",
            "Current Stock",
            "Total Amount",
            "Remark",
            "Added By",
        ];

        // Map inventory-specific headers dynamically if available
        const inventoryHeaders = data[0]?.inventoryLists
            ? Object.keys(data[0].inventoryLists)
            : [];

        // Combine static and dynamic headers
        const headers = [...staticHeaders];

        // Create data rows
        const rows = data.map((item, index) => {
            const staticValues = [
                index + 1,
                item?.Date,
                item?.Time,
                item?.inventoryLists?.MaterialCode,
                item?.inventoryLists?.MaterialName,
                item?.FromDepartmentCode,
                item?.FromDepartmentName,
                item?.ToDepartmentCode,
                item?.ToDepartmentName,
                item?.SupplierCode,
                item?.SupplierName,
                item?.inventoryLists?.IssueQuantity,
                item?.StaffName,
                item?.inventoryLists?.ReturnQuantity,
                item?.inventoryLists?.Quantity,
                item?.inventoryLists?.UOM,
                item?.inventoryLists?.OpeningStock,
                item?.inventoryLists?.AdjustStock,
                item?.inventoryLists?.Amount,
                item?.Remark,
                item?.ADDED_BY,
            ];

            // Include dynamic inventory-specific values
            const inventoryValues = inventoryHeaders.map((key) => item?.inventoryLists?.[key] || "");
            return [...staticValues];
        });

        // Generate Excel file
        const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory");
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
    };

    const exportToPdf = (data, fileName) => {
        const staticHeaders = [
            "Sn",
            "Date",
            "Time",
            "Item Code",
            "Item Name",
            "From Dept Code",
            "From Dept Name",
            "To Dept Code",
            "To Dept Name",
            "Supplier Code",
            "Supplier Name",
            "Issue Qty",
            "Return Qty",
            "Purchase Quantity",
            "UOM",
            "Opening Stock",
            "Current Stock",
            "Amount",
            "Remark",
            "Added By",
        ];

        // Extract inventory-specific headers dynamically
        const inventoryHeaders = data[0]?.inventoryLists
            ? Object.keys(data[0].inventoryLists)
            : [];

        const headers = [...staticHeaders];

        // Create table data
        const tableData = data.map((item, index) => {
            const staticValues = [
                index + 1,
                item?.Date || "",
                item?.Time || "",
                item?.inventoryLists?.MaterialCode || "",
                item?.inventoryLists?.MaterialName || "",
                item?.FromDepartmentCode || "",
                item?.FromDepartmentName || "",
                item?.ToDepartmentCode || "",
                item?.ToDepartmentName || "",
                item?.SupplierCode || "",
                item?.SupplierName || "",
                item?.inventoryLists?.IssueQuantity || "",
                item?.inventoryLists?.ReturnQuantity || "",
                item?.inventoryLists?.Quantity || "",
                item?.inventoryLists?.UOM || "",
                item?.inventoryLists?.OpeningStock || "",
                item?.inventoryLists?.AdjustStock || "",
                item?.inventoryLists?.Amount || "",
                item?.Remark || "",
                item?.ADDED_BY || "",
            ];

            const inventoryValues = inventoryHeaders.map((key) => item?.inventoryLists?.[key] || "");
            return [...staticValues];
        });

        // Generate PDF
        const doc = new jsPDF({ orientation: "landscape" }); // Use landscape for more horizontal space

        // Calculate column widths dynamically
        const pageWidth = doc.internal.pageSize.getWidth() - 4; // Total usable width (with 2px margin on both sides)
        const columnCount = headers.length;
        const columnWidth = pageWidth / columnCount;

        doc.setFontSize(7);

        doc.autoTable({
            head: [headers],
            body: tableData,
            startY: 10,
            margin: { left: 2, right: 2 },
            styles: {
                fontSize: 6, // Smaller font for better fit
                cellPadding: 0.5, // Minimized cell padding
                overflow: "linebreak", // Handle long text
            },
            headStyles: {
                fillColor: [220, 220, 220],
                fontSize: 7,
            },
            columnStyles: {
                // Assign calculated width to each column
                ...Array.from({ length: columnCount }, (_, idx) => ({
                    [idx]: { cellWidth: columnWidth },
                })).reduce((a, b) => ({ ...a, ...b }), {}),
            },
        });

        doc.save(`${fileName}.pdf`);
    };

    // const handleSearch = () => {
    //     const filteredData = isData.filter((item) => {
    //         // Convert `inventoryLists` to an array if it's an object
    //         const inventoryLists = Array.isArray(item.inventoryLists) ? item.inventoryLists : [item.inventoryLists];

    //         // Apply selected items filter
    //         const itemNameIncluded =
    //             selectedItems.length === 0 ||
    //             selectedItems.some((selectedItem) =>
    //                 inventoryLists.some((inventoryItem) =>
    //                     inventoryItem.MaterialName
    //                         ?.toLowerCase()
    //                         .includes(selectedItem.item_name.toLowerCase())
    //                 )
    //             );

    //         // Apply date filter (fromDate and toDate)
    //         const itemDate = new Date(item.Date);
    //         const fromDateValid = !fromDate || itemDate >= new Date(fromDate);
    //         const toDateValid = !toDate || itemDate <= new Date(toDate);
    //         const dateIncluded = fromDateValid && toDateValid;

    //         // Apply dropdown filter
    //         const dropdownIncluded =
    //             !selectedDropdown ||
    //             (selectedDropdown === "Purchase Entry" && !item.StaffName) ||
    //             (selectedDropdown === "Purchase Issue" && !!item.StaffName);

    //         // Apply department and supplier filters
    //         const deptCodeIncluded =
    //             !deptCode || item.FromDepartmentCode.toLowerCase().includes(deptCode.toLowerCase());
    //         const supNameIncluded =
    //             !supName || item.SupplierName?.toLowerCase().includes(supName.toLowerCase());

    //         // Return only the values where the filters are applied
    //         return (
    //             (!selectedItems.length || itemNameIncluded) &&
    //             (!fromDate && !toDate || dateIncluded) &&
    //             (!selectedDropdown || dropdownIncluded) &&
    //             (!deptCode || deptCodeIncluded) &&
    //             (!supName || supNameIncluded)
    //         );
    //     });

    //     getInventory(filteredData);
    //     setFilteredData(filteredData); // Update the state with filtered data
    //     console.log("Filtered Data:", filteredData);
    // };

    const handleSearch = () => {
        // Prepare filter object to send to backend
        const filterParams = {
            materialNames: selectedItems.map(item => item.item_name),
            fromDate,
            toDate,
            entryType: selectedDropdown,
            deptCode,
            IssuePerson,
            supName
        };

        // Remove undefined/empty values
        Object.keys(filterParams).forEach(key => {
            if (filterParams[key] === undefined || filterParams[key] === '' ||
                (Array.isArray(filterParams[key]) && filterParams[key].length === 0)) {
                delete filterParams[key];
            }
        });

        getInventory(filterParams);
    };


    const handleReset = () => {
        getInventory(isData);
        setDeptCode('');
        setItemName('');
        setSupCode('')
        setSelectedDate('');
        setFilteredData([]);
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

    const fetchIssuePerson = async () => {
        try {
            const response = await serverInstance("store/get-issuePersonMaster", "get"); // Adjust the endpoint as required
            if (response.status) {
                setIssuePersonList(response.data);  // Store departments in state
            } else {
                console.error("Failed to fetch department data:", response.msg);
            }
        } catch (error) {
            console.error("Error fetching department data:", error);
        }
    };

    var options = { year: 'numeric', month: 'short', day: '2-digit' };
    var today = new Date();
    const currDate = today
        .toLocaleDateString('en-IN', options)
        .replace(/-/g, ' ');

    useEffect(() => {
        getItem();
        getDepartment()
        fetchIssuePerson()
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
                        renderInput={(params) => <TextField {...params} label="Department Code" size="small" />}
                    />

                    <Autocomplete
                        sx={{ width: '18%' }}
                        value={IssuePersonList.find((item) => item.issuePersonName === IssuePerson) || null}
                        onChange={(_, newValue) => setIssuePerson(newValue ? newValue.issuePersonName : '')}
                        options={IssuePersonList}
                        getOptionLabel={(option) => option.issuePersonName || ''}
                        isOptionEqualToValue={(option, value) => option.issuePersonName === value.issuePersonName}
                        renderInput={(params) => <TextField {...params} label="Issue Person" size="small" />}
                    />

                    <Autocomplete
                        sx={{ width: '18%' }}
                        value={supplierList.find((item) => item.supplierName === supName) || null}
                        onChange={(_, newValue) => setSupName(newValue ? newValue.supplierName : '')}
                        options={supplierList}
                        getOptionLabel={(option) => option.supplierName || ''}
                        isOptionEqualToValue={(option, value) => option.supplierName === value.supplierName}
                        renderInput={(params) => <TextField {...params} label="Supplier Name" size="small" />}
                    />

                    <Autocomplete
                        sx={{ width: '18%' }}
                        multiple
                        value={selectedItems}
                        onChange={(_, newValues) => setSelectedItems(newValues)}
                        options={itemList}
                        getOptionLabel={(option) => option.item_name || ''}
                        isOptionEqualToValue={(option, value) => option.item_name === value.item_name}
                        renderInput={(params) => <TextField {...params} label="Select Items" size="small" />}
                    />

                    {/* From Date Picker */}
                    <TextField
                        sx={{ width: '18%' }}
                        label="From Date"
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        size="small"
                    />

                    {/* To Date Picker */}
                    <TextField
                        sx={{ width: '18%' }}
                        label="To Date"
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
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
                                    onClick={() => exportToExcel(filteredData.length ? filteredData : isData, 'Inventory_Report')}
                                    src={ExportExcel}
                                    alt="Excel Export"
                                    style={{ width: '30px', marginLeft: '0rem' }}
                                />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Export Pdf File">
                            <IconButton>
                                <img
                                    onClick={() => exportToPdf(filteredData.length ? filteredData : isData, 'Inventory_Report')}
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