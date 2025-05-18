import React, { useState, useEffect } from 'react';
import InputBase from '@mui/material/InputBase';
import { backendApiUrl } from '../../../../../../../config/config';
import { ReactTransliterate } from 'react-transliterate';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
    Box,
    Button,
    ButtonBase,
    FormControlLabel,
    Grid,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Typography,
} from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { serverInstance } from '../../../../../../../API/ServerInstance';
// import '../SupplierName/Form.css';
const custominput = {
    border: '1px solid #B8B8B8',
    width: '37rem',
    height: '39px',
    borderRadius: '5px',
    fontSize: '15px',
    paddingLeft: '0.5rem',
    marginBottom: '0.5rem',
    color: 'gray',
};
export const CustomInput = styled(InputBase)(({ theme }) => ({
    width: '37.2rem',
    fontFamily: 'Poppins',
    backgroundColor: '#fff',
    borderRadius: 6,
    '& .MuiInputBase-input': {
        border: '1px solid #B8B8B8',
        borderRadius: 6,
        width: '100%',
        fontSize: 15,
        padding: 8,
        paddingLeft: 12,
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        '&:focus': {
            // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}));
function UDAddForm({ setOpen, updatedata }) {
    const [lan, setlan] = useState(false);
    const [UOM, setUOM] = useState('')
    const [UOMCode, setUOMCode] = useState('')
    const [department, setDepartment] = useState([]);  // Stores department data
    const [departmentName, setDepartmentName] = useState('');
    const [departmentCode, setDepartmentCode] = useState('');
    const [UOMList, setUOMList] = useState([])
    const [UOMName, setUOMName] = useState('');
    const [itemName, setItemName] = useState('');
    const [openingStock, setOpeningStock] = useState(0);
    const [currentStock, setCurrentStock] = useState(0);
    const [showloader, setshowloader] = useState(false);

    console.log("uodated data ", updatedata);

    const fetchDepartments = async () => {
        try {
            const response = await serverInstance("store/get-departmentMaster", "get");
            if (response.status) {
                if (Array.isArray(response.data)) {
                    setDepartment(response.data);  // Store departments in state
                } else {
                    console.error("Expected array but received:", response.data);
                }
            } else {
                console.error("Failed to fetch department data:", response.msg);
            }
        } catch (error) {
            console.error("Error fetching department data:", error);
        }
    };

    const getUOM = async () => {
        try {
            const res = await serverInstance('admin/get-UOM', 'get')

            setUOMList(res.data)
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleUOMChange = (e) => {
        const selectedUOM = e.target.value;
        const departmentObj = UOMList.find(dept => dept.UOM === selectedUOM);

        if (departmentObj) {
            setUOMName(departmentObj.UOM);
        }
    };


    const handlesubmit = async () => {
        try {
            setshowloader(true);

            const data = {
                item_name: itemName,
                department_name: departmentName,
                department_code: departmentCode,
                opening_stock: openingStock,
                current_stock: currentStock,
                UOM: UOMName,
                id: updatedata?.id,
            }
            axios.defaults.headers.put[
                'Authorization'
            ] = `Bearer ${sessionStorage.getItem('token')}`;

            const res = await axios.put(`${backendApiUrl}store/edit-itemMaster`, data);

            if (res.data.status) {
                setOpen();
                setshowloader(false);
                Swal.fire('Great!', res.data.message, 'success');
            }

            if (res.data.status === false) {
                setOpen();
                setshowloader(false);
                Swal.fire('Great!', res.data.message, 'success');
            }
        } catch (error) {
            Swal.fire('Error!', error, 'error');
        }
    };

    const handleCloseModal = () => {
        setOpen(false); // Set the state to close the modal
    };

    const handleDepartmentChange = (e) => {
        const selectedDepartment = e.target.value;
        const departmentObj = department.find(dept => dept.departmentName === selectedDepartment);

        if (departmentObj) {
            setDepartmentName(departmentObj.departmentName);
            setDepartmentCode(departmentObj.departmentCode);  // Set department code when name is selected
        }
    };

    const handleOpeningStockChange = (e) => {
        const newOpeningStock = parseFloat(e.target.value) || 0; // Handle NaN gracefully for decimal numbers
        const changeInStock = newOpeningStock - openingStock; // Calculate the stock change
        setOpeningStock(newOpeningStock); // Update the opening stock
        // setCurrentStock((prevCurrentStock) => prevCurrentStock + changeInStock); // Adjust current stock
    };

    const handleCurrentStockChange = (e) => {
        const newOpeningStock = parseFloat(e.target.value) || 0; // Handle NaN gracefully for decimal numbers
        const changeInStock = newOpeningStock - openingStock; // Calculate the stock change
        setCurrentStock(newOpeningStock); // Update the opening stock
        // setCurrentStock((prevCurrentStock) => prevCurrentStock + changeInStock); // Adjust current stock
    };

    // Call fetchDepartments on component mount
    useEffect(() => {
        fetchDepartments();
        getUOM();
    }, []);

    useEffect(() => {
        if (updatedata) {
            setItemName(updatedata?.item_name);
            setDepartmentName(updatedata?.department_name);
            setDepartmentCode(updatedata?.department_code);
            setOpeningStock(updatedata?.opening_stock);
            setUOMName(updatedata?.UOM)
            setCurrentStock(updatedata?.current_stock);
        }
    }, []);

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    my: 2,
                    ml: 2,
                }}
            >
            </Box>
            <div className="cash-donation-div">
                <div className="cash-donation-container-innser10">


                    <div className="flex_div_main_add_user">
                        <div className="inner-input-divadd">
                            <label htmlFor="supplierName">Item Name*</label>
                            <input
                                style={{ width: '200px' }}
                                type="text"
                                id="Department Code"
                                required
                                name="supplierName"
                                placeholder="Enter Supplier Name"
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                            />
                        </div>
                        <div className="inner-input-divadd">
                            <label htmlFor="departmentName">Department Name*</label>
                            <Select
                                labelId="department-select-label"
                                id="departmentName"
                                value={departmentName}
                                onChange={handleDepartmentChange}
                                displayEmpty
                                sx={{
                                    paddingRight: '50px', marginRight: '20px'
                                }}
                            >
                                <MenuItem value="" disabled>Select Department</MenuItem>
                                {Array.isArray(department) && department.map((dept) => (
                                    <MenuItem key={dept.id} value={dept.departmentName} sx={{ fontSize: 14 }}>
                                        {dept.departmentName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>

                        <div className="inner-input-divadd">
                            <label htmlFor="departmentCode">Department Code*</label>
                            <input
                                style={{ width: '200px' }}
                                type="text"
                                id="departmentCode"
                                required
                                name="departmentCode"
                                placeholder="Enter Department Code"
                                value={departmentCode}
                                readOnly // Optional: Make it read-only as it is auto-filled based on department name
                            />
                        </div>

                        <div className="inner-input-divadd">
                            <label htmlFor="departmentName">Item UOM*</label>
                            <Select
                                labelId="department-select-label"
                                id="departmentName"
                                value={UOMName}
                                onChange={handleUOMChange}
                                displayEmpty
                                sx={{
                                    paddingRight: '50px', marginRight: '20px'
                                }}
                            >
                                <MenuItem value="" disabled>Select UOM</MenuItem>
                                {UOMList.map((dept) => (
                                    <MenuItem key={dept.id} value={dept.UOM} sx={{ fontSize: 14 }}>
                                        {dept.UOM}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>

                        <div className="inner-input-divadd">
                            <label htmlFor="openingStock">Item Opening Stock*</label>
                            <input
                                style={{ width: "200px" }}
                                type="number"
                                id="openingStock"
                                required
                                name="openingStock"
                                placeholder="Enter Opening Stock"
                                value={openingStock}
                                onChange={handleOpeningStockChange}
                                />
                        </div>
                        <div className="inner-input-divadd">
                            <label htmlFor="currentStock">Item Current Stock*</label>
                            <input
                                style={{ width: "200px" }}
                                type="number"
                                id="currentStock"
                                required
                                name="currentStock"
                                placeholder="Enter Current Stock"
                                value={currentStock}
                                onChange={handleCurrentStockChange}
                                // disabled // Make this input field read-only
                            />
                        </div>
                    </div>

                    <div className="save-div-btn">
                        <button onClick={() => handlesubmit()} className="save-div-btn-btn">
                            Save
                        </button>
                        <button
                            onClick={() => setOpen(false)}
                            className="save-div-btn-btn-cancel"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UDAddForm;
