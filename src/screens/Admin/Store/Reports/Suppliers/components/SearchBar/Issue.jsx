import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Fade, Box, Radio, RadioGroup, FormControlLabel, Input, Button, Select } from '@mui/material';
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
    // const [UOMName, setUOMName] = useState([]);
    const [toDepartmentCode, setToDepartmentCode] = useState([]);
    const [staffName, setStaffName] = useState('')
    const [itemList, setItemList] = useState([])
    const [UOMList, setUOMList] = useState([])
    const [UOMName, setUOMName] = useState([])
    const [defaultAdjust, setDefaultAdjust] = useState('')

    console.log("isData ", isData);


    // const handleItemChange = (selectedOption) => {
    //     console.log("item ", selectedOption);
    //     console.log(selectedOption?.data?.inventoryLists?.AdjustStock)
    //     setItemName(selectedOption?.data?.item_name)
    //     setItemCode(selectedOption?.data?.id)
    //     setShowQuantity(selectedOption?.data.current_stock)
    //     setDeptName(selectedOption?.data?.department_name)
    //     setDeptCode(selectedOption?.data?.department_code)
    // };

    // const handleUOMChange = (selectedOption) => {
    //     setUOMName(selectedOption?.data?.UOM)
    // };

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

    const [items, setItems] = useState([]);
    const [currentRow, setCurrentRow] = useState({
        MaterialName: '',
        MaterialCode: '',
        UOM: '',
        IssueQuantity: '',
        CurrentQuantity: '',
        StockQuantity: '',
        DepartmentName: '',
        DepartmentCode: '',
    });

    const [selectedItem, setSelectedItem] = useState(null); // For Item Name
    const [selectedUOM, setSelectedUOM] = useState(null);   // For UOM

    const handleAddRow = () => {
        // Validate if all fields in the current row are filled
        const isValid = Object.values(currentRow).every((value) => {
            if (typeof value === 'string') {
                return value.trim() !== '';
            }
            return value !== null && value !== undefined; // Check for non-string values
        });

        if (!isValid) {
            alert('Please fill all fields before adding a new row.');
            return;
        }

        // Add the current row to the items list and clear the inputs
        setItems([...items, currentRow]);
        setCurrentRow({
            MaterialName: '',
            MaterialCode: '',
            UOM: '',
            Quantity: '0',
            IssueQuantity: '',
            CurrentQuantity: '',
            StockQuantity: '',
            DepartmentName: '',
            DepartmentCode: '',
        });

        // Clear the select values
        setSelectedItem(null);
        setSelectedUOM(null);
    };

    const handleItemChange = (selectedOption) => {
        console.log("item ", selectedOption);
        setSelectedItem(selectedOption); // Update the selected item
        setCurrentRow((prev) => ({
            ...prev,
            MaterialName: selectedOption?.data?.item_name || '',
            MaterialCode: selectedOption?.data?.id || '',
            Quantity: '0',
            CurrentQuantity: selectedOption?.data?.current_stock === 0 ? '0' : selectedOption?.data?.current_stock || '', // Ensure '0' is handled
            DepartmentName: selectedOption?.data?.department_name || '',
            DepartmentCode: selectedOption?.data?.department_code || '',
            UOM: selectedOption?.data?.UOM || '', // Pre-fill UOM
        }));
        setSelectedUOM({ label: selectedOption?.data?.UOM, value: selectedOption?.data?.UOM }); // Set UOM for RSelect
    };


    const handleUOMChange = (selectedOption) => {
        setSelectedUOM(selectedOption); // Update the selected UOM
        setCurrentRow((prev) => ({
            ...prev,
            UOM: selectedOption?.value || '',
        }));
    };


    const handleInputChange = (field, value) => {
        setCurrentRow((prevState) => {
            const updatedRow = { ...prevState, [field]: value };

            // Automatically update StockQuantity if IssueQuantity changes
            if (field === 'IssueQuantity' && !isNaN(Number(value))) {
                updatedRow.StockQuantity = Number(updatedRow.CurrentQuantity) - Number(value);
            }

            return updatedRow;
        });
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
                                    <div>
                                        <div
                                            style={{
                                                maxHeight: items.length > 3 ? '240px' : 'none', // Scroll only if more than 3 items
                                                overflowY: items.length > 3 ? 'auto' : 'visible', // Allow scrolling only if more than 3 items
                                            }}
                                        >
                                            <table style={{ width: '100%', border: '1px solid black', borderCollapse: 'collapse' }}>
                                                <thead>
                                                    <tr>
                                                        <th>Item Name</th>
                                                        <th>Department Name & Code</th>
                                                        <th>UOM</th>
                                                        <th>Issue Quantity</th>
                                                        <th>Current Stock Quantity</th>
                                                        <th>Stock Quantity</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {items.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{item.MaterialName}</td>
                                                            <td>{`${item.DepartmentName} (${item.DepartmentCode})`}</td>
                                                            <td>{item.UOM}</td>
                                                            <td>{item.IssueQuantity}</td>
                                                            <td>{item.CurrentQuantity}</td>
                                                            <td>{item.StockQuantity}</td>
                                                            <td>
                                                                <button
                                                                    style={{
                                                                        background: 'none',
                                                                        border: 'none',
                                                                        color: 'red',
                                                                        cursor: 'pointer',
                                                                        fontSize: '1.2rem',
                                                                    }}
                                                                    onClick={() => handleRemoveItem(index)}
                                                                    title="Remove Item"
                                                                >
                                                                    &#8722; {/* Unicode for minus symbol */}
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    {/* Current input row */}
                                                    <tr>
                                                        <td>
                                                            <RSelect
                                                                placeholder="Select Item"
                                                                className="selecttab"
                                                                value={selectedItem} // Bind value to state
                                                                options={itemList?.map((item) => ({
                                                                    label: item?.item_name,
                                                                    value: item?.item_name,
                                                                    data: item,
                                                                }))}
                                                                onChange={handleItemChange}
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                style={{ height: '40px', width: '70%' }}
                                                                type="text"
                                                                placeholder="Department Name & Code"
                                                                value={
                                                                    currentRow.DepartmentName && currentRow.DepartmentCode
                                                                        ? `${currentRow.DepartmentName} (${currentRow.DepartmentCode})`
                                                                        : ''
                                                                }
                                                                disabled
                                                            />
                                                        </td>
                                                        <td>
                                                            <RSelect
                                                                placeholder="Select or Modify UOM"
                                                                className="selecttab"
                                                                value={selectedUOM} // Bind value to state
                                                                options={[
                                                                    { label: currentRow.UOM, value: currentRow.UOM }, // Default UOM from item data
                                                                    ...(UOMList || []).map((item) => ({
                                                                        label: item?.UOM,
                                                                        value: item?.UOM,
                                                                    })),
                                                                ]}
                                                                onChange={(selectedOption) => {
                                                                    setSelectedUOM(selectedOption); // Update selected UOM in state
                                                                    setCurrentRow((prev) => ({
                                                                        ...prev,
                                                                        UOM: selectedOption?.value || '', // Update current row with new UOM
                                                                    }));
                                                                }}
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                style={{ height: '40px', width: '70%' }}
                                                                type="text"
                                                                placeholder="Enter Issue Quantity"
                                                                value={currentRow.IssueQuantity}
                                                                onChange={(e) => handleInputChange('IssueQuantity', e.target.value)}
                                                                onKeyDown={(e) => {
                                                                    if (e.key === 'Enter') {
                                                                        handleAddRow(); // Add item when Enter is pressed
                                                                    }
                                                                }}
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                style={{ height: '40px', width: '70%' }}
                                                                type="text"
                                                                placeholder="Current Quantity"
                                                                value={currentRow.CurrentQuantity}
                                                                disabled
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                style={{ height: '40px', width: '70%' }}
                                                                type="text"
                                                                placeholder="Enter Stock Quantity"
                                                                value={currentRow.StockQuantity}
                                                                onChange={(e) => handleInputChange('StockQuantity', e.target.value)}
                                                            />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <button onClick={handleAddRow} style={{ marginTop: '1rem' }}>
                                                Add Row
                                            </button>
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
