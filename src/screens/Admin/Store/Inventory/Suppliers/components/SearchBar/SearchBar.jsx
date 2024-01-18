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


const SearchBar = ({ getInventory, isData , handlePrint}) => {

    const [dateFrom, setDateFrom] = useState('')
    const [open, setOpen] = useState(false)

    const [selectedItem, setSelectedItem] = useState(null);
    const [supCode, setSupCode] = useState('')
    const [supName, setSupName] = useState('')
    const [deptCode, setDeptCode] = useState('');
    const [deptName, setDeptName] = useState('');
    const [departmentList, setDepartmentList] = useState([])
    const [invID, setInvID] = useState('')
    const [quantity, setQuantity] = useState('')
    const [ID, setID] = useState('')
    const [toDeptName, setToDeptName] = useState('')
    const [toDeptCode, setToDeptCode] = useState('')
    const [stockOpen, setStockOpen] = useState(false)
    const [openingStock, setOpeningStock] = useState('')
    const [adjust, setAdjust] = useState('')
    const [openStock, setOpenStock] = useState('')
    const [selectedItems, setSelectedItems] = useState([]);
    const [itemList, setItemList] = useState([])
    const [itemName, setItemName] = useState('')


    const [supplierList, setSupplierList] = useState([]);


    const getItem = async () => {
        try {
            const res = await serverInstance('admin/get-Item', 'get');
            setItemList(res.data);
        } catch (err) {
            console.log(err);
        }
    };
    const [qObject, setQObject] = useState([
        {
            Quantity: ''
        }
    ])

    // setQObject([{ Quantity: 1 }])



    const [dbitems, setdbItems] = useState([
        {
            MaterialCode: ' ',
            MaterialName: '',
            Quantity: '',
            Amount: '',
        },
    ]);

    const [totalQuantity, setTotalQuantity] = useState('')

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleAdjustStock = () => {
        setStockOpen(true)
    }

    const closeAdjustStock = () => {
        setStockOpen(false)
    }

    const handleOpeningStock = () => {
        setOpeningStock(true)
    }

    const closeOpeningStock = () => {
        setOpeningStock(false)
    }




    const handleDeptCodeChange = (e) => {
        const selectedCode = e.target.value;
        setToDeptCode(selectedCode);


        const selectedDepartment = departmentList.find(item => item.department_code === selectedCode);
        console.log('log', selectedDepartment)
        if (selectedDepartment) {
            setToDeptName(selectedDepartment.departmentName_en);
        }
    };

    const handleSearch = () => {
        const filteredData = isData.filter((item) => {
            const itemNameIncluded = selectedItems.length === 0 || selectedItems.some(
                (selectedItem) =>
                    item.inventoryLists.MaterialName.toLowerCase().includes(selectedItem.itemNameEnglish.toLowerCase())
            );

            return (
                itemNameIncluded &&
                item.FromDepartmentCode.toLowerCase().includes(deptCode.toLowerCase()) &&
                item.SupplierCode.toLowerCase().includes(supCode.toLowerCase())
            );
        });

        getInventory(filteredData);
        console.log('fil', filteredData);
    };



    const handleReset = () => {
        getInventory(isData);
        setDeptCode('');
        setItemName('');
        setSupCode('')
        setSelectedItems([]);
    };

    const handleItemChange = (selectedOption) => {

        setSelectedItem(selectedOption);

        setAdjust(selectedOption?.data?.inventoryLists?.AdjustStock || '')
        setOpenStock(selectedOption?.data?.inventoryLists?.OpeningStock || '')

        setInvID(selectedOption?.data?.inventoryLists?.InventoryId)
        setID(selectedOption?.data?.inventoryLists?.id)
        setSupCode(selectedOption?.data?.SupplierCode || '');
        setSupName(selectedOption?.data?.SupplierName || '');
        setDeptCode(selectedOption?.data?.FromDepartmentCode || '');
        setDeptName(selectedOption?.data?.FromDepartmentName || '');
        setTotalQuantity(selectedOption?.data?.inventoryLists?.Quantity || '');


        setdbItems()

    };

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




    const stockTransfer = async (e) => {
        e.preventDefault();
        try {

            const newQuantity = adjust - quantity;

            const data = {
                Date: currDate,
                Time: currTime,
                DepartmentCode: toDeptCode,
                DepartmentName: toDeptName,
                SupplierCode: supCode,
                SupplierName: supName,
                ItemCode: selectedItem?.data?.inventoryLists?.MaterialCode,
                ItemName: selectedItem?.data?.inventoryLists?.MaterialName,
                UOM: selectedItem?.data?.inventoryLists?.UOM,
                Quantity: quantity,
                Amount: selectedItem?.data?.inventoryLists?.Amount,


            }


            const res = await serverInstance('store/add-stock', 'post', data)

            if (res.status) {
                const editData = {
                    id: invID,

                    FromDepartmentCode: deptCode,
                    FromDepartmentName: deptName,

                    SupplierCode: supCode,
                    SupplierName: supName,
                    inventory_list: [
                        {
                            id: ID,
                            InventoryId: invID,
                            MaterialCode: selectedItem?.data?.inventoryLists?.MaterialCode || "",
                            MaterialName: selectedItem?.data?.inventoryLists?.MaterialName || "",
                            UOM: selectedItem?.data?.inventoryLists?.UOM || "",
                            AdjustStock: newQuantity,
                            Amount: selectedItem?.data?.inventoryLists?.Amount || "",
                        },
                    ],
                };


                const response = await serverInstance('store/edit-inventory', 'put', editData)

                getInventory();
                handleClose()
                Swal.fire("Great!", response?.msg, 'success')

            } if (res.status === false) {
                handleClose()
                Swal.fire("Error!", res?.msg, 'error')
            }


        } catch (err) {
            console.log(err)

        }
    }




    var options = { year: 'numeric', month: 'short', day: '2-digit' };
    var today = new Date();
    const currDate = today
        .toLocaleDateString('en-IN', options)
        .replace(/-/g, ' ');

    const date = moment(currDate).format("DD/MM/YYYY")

    const currTime = today.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
    });


    useEffect(() => {
        getItem();
        getDepartment()
        getSupplier()

    }, [])


    return (
        <>
            {stockOpen && <AdjustStock open={stockOpen} close={closeAdjustStock} isData={isData} getInventory={getInventory} />}
            {openingStock && <OpeningStock open={openingStock} close={closeOpeningStock} isData={isData} getInventory={getInventory} />}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3>Stock Transfer</h3>
                                <CloseIcon onClick={handleClose} />

                            </div>
                            <hr />

                            <div >
                                <form onSubmit={stockTransfer}>
                                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                                        <div>
                                            <span style={{ color: 'black' }}><b>ITEM NAME </b></span> < br />
                                            <RSelect

                                                placeholder="Select Item"
                                                className="selecttab"
                                                options={isData && isData.map((item) => ({
                                                    label: item.inventoryLists?.MaterialName,
                                                    value: item.inventoryLists?.MaterialName,
                                                    data: item,
                                                }))}
                                                onChange={(selectedOption) => {
                                                    handleItemChange(selectedOption);
                                                    // displaySelectedItemDetails();
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <span>Available Quantity : {Number(totalQuantity) + Number(adjust) + Number(openStock) < 0 ? 0 : Number(totalQuantity) + Number(adjust) + Number(openStock)}</span>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '1rem' }}>
                                        <span style={{ color: 'black' }}><b>Transfer Department </b></span> <br />
                                        <div style={{ display: 'flex' }}>
                                            <div style={{ marginTop: '1rem', alignItems: 'center' }}>
                                                <u><span>From</span></u>

                                                <div style={{ display: 'flex', marginTop: '1rem' }}>
                                                    <div>
                                                        <CustomInputLabel>Dept Code</CustomInputLabel>
                                                        <CustomInput disabled sx={{ width: '10rem' }} value={deptCode} readOnly />
                                                    </div>
                                                    <div style={{ marginLeft: '1rem' }}>
                                                        <CustomInputLabel>Dept Name</CustomInputLabel>
                                                        <CustomInput disabled sx={{ width: '8rem' }} value={deptName} readOnly />
                                                        <ArrowForwardIcon />
                                                    </div>
                                                </div>

                                            </div>

                                            <div style={{ marginTop: '1rem' }}>
                                                <div>
                                                    <u> <span>To</span> </u>
                                                    <div style={{ display: 'flex', marginTop: '1rem' }}>
                                                        <div>
                                                            <CustomInputLabel>Dept Code</CustomInputLabel>
                                                            <Select
                                                                required
                                                                sx={{
                                                                    width: '10rem',
                                                                    height: '2.5rem',

                                                                }}
                                                                value={toDeptCode}
                                                                onChange={handleDeptCodeChange}
                                                                displayEmpty
                                                            >
                                                                <MenuItem disabled value="">
                                                                    Select Department
                                                                </MenuItem>

                                                                {departmentList &&
                                                                    departmentList?.map((item, index) => (
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

                                                        </div>
                                                        <div style={{ marginLeft: '1rem' }}>
                                                            <CustomInputLabel >Dept Name</CustomInputLabel>
                                                            <CustomInput sx={{ width: '8rem' }}
                                                                value={toDeptName}
                                                            />


                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ marginTop: '1rem' }}>
                                            <span style={{ color: 'black' }}><b>Transfer Quantity </b></span> <br />
                                            <CustomInput
                                                type='number'
                                                max={Number(totalQuantity) + Number(adjust) + Number(openStock)}
                                                required
                                                sx={{ width: '12rem', marginTop: '1rem' }}
                                                placeholder='Enter Quantity to Transfer'
                                                value={quantity}
                                                onChange={(e) => {
                                                    const quant = Math.min(e.target.value, Number(totalQuantity) + Number(adjust) + Number(openStock));
                                                    setQuantity(quant)

                                                }}
                                            >

                                            </CustomInput>
                                        </div>

                                        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                                            <Button
                                                sx={{
                                                    width: '8rem',
                                                    color: 'white',
                                                    backgroundColor: '#2359b0',
                                                    '&:hover': {
                                                        backgroundColor: '#194182'
                                                    }
                                                }}
                                                type='submit'
                                            >Save</Button>

                                            <Button
                                                sx={{
                                                    width: '8rem',
                                                    marginLeft: '1rem',
                                                    color: 'white',
                                                    backgroundColor: '#d91414',
                                                    '&:hover': {
                                                        backgroundColor: '#b30e0e'
                                                    }
                                                }}
                                                onClick={() => setOpen(false)}
                                            >Cancel</Button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </Box>
                </Fade >
            </Modal >

            <div className='mainComponent'>
                <div className="selecttabcontainer1">
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

                    <Autocomplete
                        sx={{ width: '18%' }}
                        multiple
                        value={selectedItems}
                        onChange={(_, newValues) => setSelectedItems(newValues)}
                        options={itemList}
                        getOptionLabel={(option) => option.itemNameEnglish || ''}
                        isOptionEqualToValue={(option, value) =>
                            option.itemNameEnglish === value.itemNameEnglish
                        }
                        renderInput={(params) => <TextField {...params} label="Select Item" size='small' />}
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
                            onClick={handleOpen}
                            sx={{
                                borderRadius: '0.5rem',
                                color: 'black',
                                width: '10vw',
                                backgroundColor: '#fcbb82',

                                ":hover": {
                                    bgcolor: '#f2ad6f'
                                }
                            }}
                        >
                            Stock Transfer
                        </Button>

                        <Button
                            id="srcbtn"
                            onClick={handleAdjustStock}
                            sx={{
                                borderRadius: '0.5rem',
                                color: 'black',
                                width: '10vw',
                                marginRight: '1rem',
                                backgroundColor: '#fcbb82',

                                ":hover": {
                                    bgcolor: '#f2ad6f'
                                }
                            }}
                        >
                            Adjust Stock
                        </Button>



                        &nbsp;&nbsp;
                    </div>
                </div>
            </div>

        </>
    )
}

export default SearchBar