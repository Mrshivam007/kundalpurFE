import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Fade, Box, Radio, RadioGroup, FormControlLabel, Input, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import AddBoxIcon from '@mui/icons-material/AddBox';

import { CustomInputLabel, CustomInput } from '../../../../../Expense/common';
import { serverInstance } from '../../../../../../../API/ServerInstance';
import Swal from 'sweetalert2';
import RSelect from 'react-select';



const style = {
    width: '90%',
    height: 'auto',
    position: 'absolute',
    top: '46%',
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

const Issue = ({ stockData, open, close, getStock, isData, getInventory }) => {



    const [adjustmentType, setAdjustmentType] = useState('add');
    const [stockQuantity, setStockQuantity] = useState('')
    const [showQuantity, setShowQuantity] = useState('')
    const [quantity, setQuantity] = useState('')
    const [ID, setID] = useState('')
    const [invID, setInvID] = useState('')
    const [deptCode, setDeptCode] = useState('')
    const [remark, setRemark] = useState('')
    const [openingQuantity, setOpeningQuantity] = useState('')
    const [issueQuantity, setIssueQuantity] = useState('')
    const [itemName, setItemName] = useState('')
    const [itemCode, setItemCode] = useState('')
    const [deptName, setDeptName] = useState('')
    const [toDepartment, setToDepartment] = useState([]);
    const [toDepartmentName, setToDepartmentName] = useState([]);
    const [toDepartmentCode, setToDepartmentCode] = useState([]);
    const [staffName, setStaffName] = useState('')
    const [itemList, setItemList] = useState([])
    const [UOMList, setUOMList] = useState([])
    const [items, setItems] = useState([]);
    const [UOMName, setUOMName] = useState([])
    const [defaultAdjust, setDefaultAdjust] = useState('')

    console.log("isData ", isData);


    const handleItemChange = (selectedOption) => {
        console.log("item ", selectedOption);
        console.log(selectedOption?.data?.inventoryLists?.AdjustStock)
        setItemName(selectedOption?.data?.item_name)
        setItemCode(selectedOption?.data?.id)
        setShowQuantity(selectedOption?.data.current_stock)
        setDeptName(selectedOption?.data?.department_name)
        setDeptCode(selectedOption?.data?.department_code)
    };

    const handleUOMChange = (selectedOption) => {
        setUOMName(selectedOption?.data?.UOM)
    };

    const handleAdjustment = (e) => {
        e.preventDefault();
        const currentQuantity = parseInt(showQuantity, 10);
        const adjustedQuantity = parseInt(stockQuantity, 10);

        if (adjustmentType == 'add') {
            const newQuantity = Number(defaultAdjust) + Number(adjustedQuantity);

            handleAdjust(e, newQuantity)
            console.log(newQuantity)

        } else if (adjustmentType == 'reduce') {

            const newQuantity = defaultAdjust - adjustedQuantity;
            handleAdjust(e, newQuantity)

        }

    };

    var today = new Date();
    var date = today.toISOString().substring(0, 10);
    const currTime = today.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
    });


    const getItem = async () => {
        try {
            const res = await serverInstance('store/get-itemMaster', 'get')

            setItemList(res.data)
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const getUOM = async () => {
        try {
            const res = await serverInstance('admin/get-UOM', 'get')

            setUOMList(res.data)
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const fetchDepartments = async () => {
        try {
            const response = await serverInstance("store/get-departmentMaster", "get"); // Adjust the endpoint as required
            if (response.status) {
                setToDepartment(response.data);  // Store departments in state
            } else {
                console.error("Failed to fetch department data:", response.msg);
            }
        } catch (error) {
            console.error("Error fetching department data:", error);
        }
    };

    const handleDepartmentChange = (selectedOption) => {
        const departmentObj = selectedOption?.data; // Access the department object from the option's data

        if (departmentObj) {
            setToDepartmentName(departmentObj.departmentName);
            setToDepartmentCode(departmentObj.departmentCode); // Set department code when name is selected
        }
    };

    useEffect(() => {
        if (issueQuantity && showQuantity) {
            let calculatedQuantity = parseInt(showQuantity) - parseInt(issueQuantity);
            setStockQuantity(calculatedQuantity);
        }
    }, [issueQuantity, showQuantity]);

    // Handles adding an item and clearing the fields
    const handleAddItem = () => {
        const newItem = {
            MaterialName: itemName,
            MaterialCode: itemCode,
            UOM: UOMName,
            IssueQuantity: issueQuantity,
            CurrentQuantity: showQuantity,
            StockQuantity: stockQuantity,
            Quantity: "0",
            DepartmentName: deptName,
            DepartmentCode: deptCode,
        };

        setItems([...items, newItem]);
        // Clear input fields after adding
        setItemName('');
        setItemCode('');
        setUOMName('');
        setIssueQuantity('');
        setShowQuantity('');
        setStockQuantity('');
        setDeptName('');
        setDeptCode('');
    };

    // Handles removing an item from the list
    const handleRemoveItem = (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
    };

    const clearItemFields = () => {
        setItemName('');
        setItemCode('');
        setUOMName();
        setUOMList()
        setIssueQuantity('');
    };

    const handleAdjust = async () => {
        try {
            const data = {
                Date: date,
                Time: currTime,
                StaffName: staffName,
                FromDepartmentName: deptName,
                ToDepartmentName: toDepartmentName,
                ToDepartmentCode: toDepartmentCode,
                FromDepartmentCode: deptCode,
                Remark: remark,
                inventory_list: items,
            };

            const res = await serverInstance('store/add-Inventory', 'post', data);
            console.log(res);
            if (res.status) {
                getInventory();
                close();
                Swal.fire('Great', 'Quantity has been Adjusted', 'success');
            } else {
                Swal.fire('Error!', "Quantity Didn't Update", 'error');
            }
        } catch (err) {
            Swal.fire('Error!', "Quantity Didn't Update", 'error');
            console.error(err);
        }
    };




    useEffect(() => {
        getItem();
        getUOM();
        fetchDepartments();
    }, [isData])

    return (
        <ThemeProvider theme={theme}>
            <>
                <div>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open}
                        onClose={close}
                    >
                        <Fade in={open}>
                            <Box sx={style}>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h3>Purchase Issue Register</h3>
                                        <CloseIcon onClick={close} />

                                    </div>
                                    <hr />

                                    <div style={{ marginTop: '1rem' }}>
                                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                                            {/* ITEM NAME */}
                                            <div style={{ flex: 1 }}>
                                                <span><b>ITEM NAME</b></span>
                                                <RSelect
                                                    placeholder="Select Item"
                                                    className="selecttab"
                                                    options={itemList && itemList.map((item) => ({
                                                        label: item?.item_name,
                                                        value: item?.item_name,
                                                        data: item,
                                                    }))}
                                                    onChange={handleItemChange}
                                                />
                                            </div>

                                            {/* DEPARTMENT NAME & CODE */}
                                            <div style={{ flex: 1 }}>
                                                <span><b>DEPARTMENT NAME & CODE</b></span>
                                                <CustomInput
                                                    disabled
                                                    type="text"
                                                    placeholder="Department Name"
                                                    value={`${deptName} (${deptCode})`}
                                                />
                                            </div>

                                            {/* ITEM UOM */}
                                            <div style={{ flex: 1 }}>
                                                <span><b>ITEM UOM</b></span>
                                                <RSelect
                                                    placeholder="Select UOM"
                                                    className="selecttab"
                                                    options={UOMList && UOMList.map((item) => ({
                                                        label: item?.UOM,
                                                        value: item?.UOM,
                                                        data: item,
                                                    }))}
                                                    onChange={(selectedOption) => setUOMName(selectedOption?.value)}
                                                />
                                            </div>

                                            {/* ISSUE QUANTITY */}
                                            <div style={{ flex: 1 }}>
                                                <span><b>ISSUE QUANTITY</b></span>
                                                <CustomInput
                                                    type="text"
                                                    placeholder="Enter Issue Quantity"
                                                    value={issueQuantity}
                                                    onChange={(e) => setIssueQuantity(e.target.value)}
                                                />
                                            </div>

                                            {/* CURRENT STOCK QUANTITY */}
                                            <div style={{ flex: 1 }}>
                                                <span><b>CURRENT STOCK QUANTITY</b></span>
                                                <CustomInput
                                                    type="text"
                                                    placeholder="Current Quantity"
                                                    value={showQuantity}
                                                    disabled
                                                />
                                            </div>

                                            {/* STOCK QUANTITY */}
                                            <div style={{ flex: 1 }}>
                                                <span><b>STOCK QUANTITY</b></span>
                                                <CustomInput
                                                    type="text"
                                                    placeholder="Enter Stock Quantity"
                                                    value={stockQuantity}
                                                    onChange={(e) => setStockQuantity(e.target.value)}
                                                />
                                            </div>

                                            {/* ADD ITEM BUTTON */}
                                        </div>
                                        <div>
                                            <button onClick={handleAddItem}>Add Item</button>
                                        </div>

                                        <div style={{ marginTop: '1rem' }}>
                                            <h4>Added Items</h4>
                                            <div>
                                                {items.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            display: 'flex',
                                                            gap: '1rem',
                                                            alignItems: 'center',
                                                            marginBottom: '0.5rem',
                                                        }}
                                                    >
                                                        <span><b>Item Name:</b> {item.MaterialName}</span>
                                                        <span><b>Dept:</b> {item.DepartmentName} ({item.DepartmentCode})</span>
                                                        <span><b>UOM:</b> {item.UOM}</span>
                                                        <span><b>Issue Quantity:</b> {item.IssueQuantity}</span>
                                                        <span><b>Current Quantity:</b> {item.CurrentQuantity}</span>
                                                        <span><b>Stock Quantity:</b> {item.StockQuantity}</span>
                                                        <button onClick={() => handleRemoveItem(index)}>Remove</button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <form onSubmit={handleAdjustment}>

                                            <div style={{ marginTop: '1rem' }}>
                                                <span><b>Issue Department</b></span> <br />
                                                <div style={{ display: 'flex' }}>
                                                    <RSelect
                                                        placeholder="Select Item"
                                                        className="selecttab"
                                                        options={toDepartment && toDepartment.map((item) => ({
                                                            label: item?.departmentName,
                                                            value: item?.departmentCode,
                                                            data: item,
                                                        }))}
                                                        onChange={handleDepartmentChange}
                                                    />
                                                </div>
                                            </div>
                                            <div style={{ marginTop: '1rem' }}>
                                                <span><b>STAFF NAME</b></span> <br />
                                                <div style={{ display: 'flex' }}>
                                                    <CustomInput
                                                        required
                                                        type="text"
                                                        placeholder="Enter Staff Name"
                                                        value={staffName}
                                                        onChange={(e) => setStaffName(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div style={{ marginTop: '1rem' }}>
                                                <span><b>REMARK</b></span> <br />
                                                <div style={{ display: 'flex' }}>
                                                    <CustomInput
                                                        required
                                                        type="text"
                                                        placeholder="Enter Remark"
                                                        value={remark}
                                                        onChange={(e) => setRemark(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'space-evenly' }}>
                                                <Button sx={{
                                                    color: 'white',
                                                    backgroundColor: '#1dad20',
                                                    width: '10rem',
                                                    '&:hover': {
                                                        backgroundColor: '#178a19'
                                                    }
                                                }}
                                                    type='submit'
                                                >Save</Button>

                                                <Button sx={{
                                                    color: 'white',
                                                    backgroundColor: 'grey',
                                                    width: '10rem',
                                                    '&:hover': {
                                                        backgroundColor: '#404240'
                                                    }
                                                }}
                                                    onClick={close}
                                                >Cancel</Button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </Box>
                        </Fade>
                    </Modal>
                </div>
            </>
        </ThemeProvider>
    );
};

export default Issue;
