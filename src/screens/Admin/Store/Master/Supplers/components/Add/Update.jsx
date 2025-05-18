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
    const [supplierName, setSupplierName] = useState('');
    const [address, setAddress] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [gstNo, setGstNo] = useState('');
    const [UOMList, setUOMList] = useState([])
    const [UOMName, setUOMName] = useState('');
    const [itemName, setItemName] = useState('');
    const [openingStock, setOpeningStock] = useState(0);
    const [currentStock, setCurrentStock] = useState(0);
    const [showloader, setshowloader] = useState(false);

    console.log("uodated data ", updatedata);

    const handlesubmit = async () => {
        try {
            setshowloader(true);

            const data = {
                supplierName: supplierName, // Name of the supplier
                address: address,           // Supplier address
                mobileNo: mobileNo,         // Supplier contact number
                gstNo: gstNo,
                id: updatedata?.id,
            }
            axios.defaults.headers.put[
                'Authorization'
            ] = `Bearer ${sessionStorage.getItem('token')}`;

            const res = await axios.put(`${backendApiUrl}store/edit-supplierMaster`, data);

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
            setshowloader(false);
            Swal.fire('Error!', error, 'error');
        }
    };

    const handleCloseModal = () => {
        setOpen(false); // Set the state to close the modal
    };

    useEffect(() => {
        if (updatedata) {
            setSupplierName(updatedata?.supplierName);
            setAddress(updatedata?.address);
            setGstNo(updatedata?.gstNo);
            setMobileNo(updatedata?.mobileNo);
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
                            <label htmlFor="supplierName">Supplier Name Name*</label>
                            <input
                                style={{ width: '200px' }}
                                type="text"
                                id="Department Code"
                                name="supplierName"
                                placeholder="Enter Supplier Name"
                                value={supplierName}
                                onChange={(e) => setSupplierName(e.target.value)}
                            />
                        </div>
                        <div className="inner-input-divadd">
                            <label htmlFor="departmentName">Addesss*</label>
                            <input
                                style={{ width: '200px' }}
                                type="text"
                                id="Department Code"
                                name="Address"
                                placeholder="Enter Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        <div className="inner-input-divadd">
                            <label htmlFor="departmentCode">GST No*</label>
                            <input
                                style={{ width: '200px' }}
                                type="text"
                                id="Department Code"
                                required
                                name="GST No"
                                placeholder="Enter GST No"
                                value={gstNo}
                                onChange={(e) => setGstNo(e.target.value)}
                            />
                        </div>

                        <div className="inner-input-divadd">
                            <label htmlFor="departmentName">Mobile Number</label>
                            <input
                                style={{ width: '200px' }}
                                type="text"
                                id="Department Code"
                                required
                                name="mobile"
                                placeholder="Enter Mobile Number"
                                value={mobileNo}
                                onChange={(e) => setMobileNo(e.target.value)}
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
