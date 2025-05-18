import React, { useEffect, useState } from 'react'
import './SearchBar.css'
import Print from '../../../../../../../assets/Print.png';
import ExportPdf from '../../../../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../../../../assets/ExportExcel.png';
import { Tooltip, IconButton } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Button } from '@mui/material';
import { Autocomplete, TextField } from '@mui/material'
import { serverInstance } from '../../../../../../../API/ServerInstance';
import IssueStock from './Issue';
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from 'xlsx';

const IssueSearchBar = ({ getInventory, isData, handlePrint }) => {
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

    const exportToExcel = (data, fileName) => {
        // Define static headers (excluding To Department, Issue Quantity, and Return Quantity)
        const staticHeaders = [
            "Sn",
            "Date",
            "Time",
            "Item Code",
            "Item Name",
            "To Department Code",
            "To Department Name",
            "Supplier Code",
            "Supplier Name",
            "UOM",
            "Opening Stock",
            "Current Stock",
            "Total Amount",
            "Remark",
            "Added By",
        ];
    
        // Filter data where StaffName is null or undefined
        const filteredData = data.filter((item) => item?.StaffName);
    
        // Map inventory-specific headers dynamically, excluding IssueQuantity and ReturnQuantity
        const inventoryHeaders = filteredData[0]?.inventoryLists
            ? Object.keys(filteredData[0].inventoryLists).filter(
                  (key) => key !== "Quantity"
              )
            : [];
    
        // Combine static and dynamic headers
        const headers = [...staticHeaders, ...inventoryHeaders];
    
        // Create data rows
        const rows = filteredData.map((item, index) => {
            const staticValues = [
                index + 1,
                item?.Date || "",
                item?.Time || "",
                item?.inventoryLists?.MaterialCode || "",
                item?.inventoryLists?.MaterialName || "",
                item?.FromDepartmentCode || "",
                item?.FromDepartmentName || "",
                item?.SupplierCode || "",
                item?.SupplierName || "",
                item?.inventoryLists?.UOM || "",
                item?.inventoryLists?.OpeningStock || "",
                item?.inventoryLists?.AdjustStock || "",
                item?.inventoryLists?.Amount || "",
                item?.Remark || "",
                item?.ADDED_BY || "",
            ];
    
            const inventoryValues = inventoryHeaders.map((key) => item?.inventoryLists?.[key] || "");
            return [...staticValues, ...inventoryValues];
        });
    
        // Generate Excel file
        const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory");
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
    };
    
    
    const exportToPdf = (data, fileName) => {
        // Define static headers (excluding To Department, Issue Quantity, and Return Quantity)
        const staticHeaders = [
            "Sn",
            "Date",
            "Time",
            "Item Code",
            "Item Name",
            "To Dept Code",
            "To Dept Name",
            "Supplier Code",
            "Supplier Name",
            "UOM",
            "Opening Stock",
            "Current Stock",
            "Amount",
            "Remark",
            "Added By",
        ];
    
        // Filter data where StaffName is null or undefined
        const filteredData = data.filter((item) => item?.StaffName);
    
        // Extract inventory-specific headers dynamically, excluding IssueQuantity and ReturnQuantity
        const inventoryHeaders = filteredData[0]?.inventoryLists
            ? Object.keys(filteredData[0].inventoryLists).filter(
                  (key) => key !== "Quantity"
              )
            : [];
    
        const headers = [...staticHeaders, ...inventoryHeaders];
    
        // Create table data
        const tableData = filteredData.map((item, index) => {
            const staticValues = [
                index + 1,
                item?.Date || "",
                item?.Time || "",
                item?.inventoryLists?.MaterialCode || "",
                item?.inventoryLists?.MaterialName || "",
                item?.ToDepartmentCode || "",
                item?.ToDepartmentName || "",
                item?.SupplierCode || "",
                item?.SupplierName || "",
                item?.inventoryLists?.UOM || "",
                item?.inventoryLists?.OpeningStock || "",
                item?.inventoryLists?.AdjustStock || "",
                item?.inventoryLists?.Amount || "",
                item?.Remark || "",
                item?.ADDED_BY || "",
            ];
    
            const inventoryValues = inventoryHeaders.map((key) => item?.inventoryLists?.[key] || "");
            return [...staticValues, ...inventoryValues];
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
                                    onClick={() => exportToExcel(isData, 'Inventory_Report')}
                                    src={ExportExcel}
                                    alt="Excel Export"
                                    style={{ width: '30px', marginLeft: '0rem' }}
                                />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Export Pdf File">
                            <IconButton>
                                <img
                                    onClick={() =>
                                        exportToPdf(
                                            isData,
                                            [
                                                "Sn",
                                                "Date",
                                                "Time",
                                                "Item Code",
                                                "Item Name",
                                                "From Dept",
                                                "To Dept",
                                                "Supplier",
                                                "Issue Qty",
                                                "Return Qty",
                                                "UOM",
                                                "Opening Stock",
                                                "Current Stock",
                                                "Amount",
                                                "Remark",
                                            ],
                                            "Inventory_Report"
                                        )
                                    }
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

export default IssueSearchBar