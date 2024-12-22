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


    const handlesubmit = async () => {
        try {
            setshowloader(true);

            const data = {
                item_name: itemName,
                department_name: departmentName,
                department_code: departmentCode,
                opening_stock: openingStock,
                current_stock: currentStock,
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

    // Call fetchDepartments on component mount
    useEffect(() => {
        fetchDepartments();
    }, []);

    useEffect(() => {
        if (updatedata) {
            setItemName(updatedata?.item_name);
            setDepartmentName(updatedata?.department_name);
            setDepartmentCode(updatedata?.department_code);
            setOpeningStock(updatedata?.opening_stock);
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
                            <label htmlFor="supplierName">Item Opening Stock*</label>
                            <input
                                type="number"
                                id="Department Code"
                                required
                                name="supplierName"
                                placeholder="Enter Supplier Name"
                                value={openingStock}
                                onChange={(e) => setOpeningStock(e.target.value)}
                            />
                        </div>
                        <div className="inner-input-divadd">
                            <label htmlFor="supplierName">Item Current Stock*</label>
                            <input
                                type="number"
                                id="Department Code"
                                required
                                name="supplierName"
                                placeholder="Enter Supplier Name"
                                value={currentStock}
                                onChange={(e) => setCurrentStock(e.target.value)}
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
