import React, { useEffect, useState } from 'react'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2'


import './Add.css'
import { serverInstance } from '../../../../../../../API/ServerInstance'
import { MenuItem, Select } from '@mui/material'


const Add = ({
    themeColor,
    updateData,
    showUpdateBtn, }) => {

    const style = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',

        bgcolor: 'background.paper',
        background: '#FFFFF',
        borderRadius: '15px',
        boxShadow: 24,
        p: 4,
    };

    const [supplierName, setSupplierName] = useState('');
    const [department, setDepartment] = useState([]);  // Stores department data
    const [departmentName, setDepartmentName] = useState('');
    const [departmentCode, setDepartmentCode] = useState('');
    const [itemName, setItemName] = useState('');
    const [openingStock, setOpeningStock] = useState(0);
    const [address, setAddress] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [gstNo, setGstNo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            // Prepare the data to be sent to the server
            const data = {
                departmentCode: departmentCode, // Name of the supplier
                departmentName: departmentName,           // Supplier address
                itemName: itemName,         // Supplier contact number
                openingStock: openingStock,               // Supplier GST number
            };

            // Send a POST request to the backend to add the supplier
            serverInstance('store/add-itemMaster', 'post', data)
                .then((res) => {
                    console.log("getting status ", res);
                    if (res.status) {
                        console.log("getting status true");
                        // Handle success: Show success message and close the modal
                        Swal.fire('Great!', res.msg, 'success');
                        handleClose();
                    } else {
                        // Handle failure: Show error message
                        Swal.fire('Error!', res?.msg, 'error');
                    }
                })
                .catch((err) => {
                    // Catch and handle any errors during the request
                    Swal.fire('Error!', 'Something went wrong!', 'error');
                    console.log(err);
                });
        } catch (err) {
            // Catch any unexpected errors
            Swal.fire('Error!', 'Something went wrong!', 'error');
            console.log(err);
        }
    };

    // Fetch department data from API
    const fetchDepartments = async () => {
        try {
            const response = await serverInstance("store/get-departmentMaster", "get"); // Adjust the endpoint as required
            if (response.status) {
                setDepartment(response.data);  // Store departments in state
            } else {
                console.error("Failed to fetch department data:", response.msg);
            }
        } catch (error) {
            console.error("Error fetching department data:", error);
        }
    };

    // Call fetchDepartments on component mount
    useEffect(() => {
        fetchDepartments();
    }, []);

    console.log("getting department data ", department);

    // Handle department selection from dropdown
    const handleDepartmentChange = (e) => {
        const selectedDepartment = e.target.value;
        const departmentObj = department.find(dept => dept.departmentName === selectedDepartment);

        if (departmentObj) {
            setDepartmentName(departmentObj.departmentName);
            setDepartmentCode(departmentObj.departmentCode);  // Set department code when name is selected
        }
    };

    const [show, setShow] = useState(false)
    const [step, setStep] = useState(1)

    const [supList, setSupList] = useState([])

    const getSupplier = async () => {
        try {
            const res = await serverInstance('admin/get-supplierName', 'get')

            setSupList(res.data)
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const [next, setNext] = useState(false)

    const handleClose = () => {
        setShow(false);
        setNext(false);
    };

    const handleShow = () => {
        setStep(1);
        setShow(true);
        setNext(false);
    };


    var options = { year: 'numeric', month: 'short', day: '2-digit' };
    var today = new Date();
    const currDate = today
        .toLocaleDateString('en-IN', options)
        .replace(/-/g, ' ');
    const currTime = today.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

    useEffect(() => {
        // getStaff();
        // getItem();
        // getDepartment();
        getSupplier();
    }, [])



    return (
        <div>

            <Button sx={{
                borderRadius: '0.5rem',
                color: 'black',
                width: '10vw',
                backgroundColor: '#BCEDDF',

                ":hover": {
                    bgcolor: '#f2ad6f'
                }
            }}
                onClick={handleShow}
            >
                +Add
            </Button>


            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={show}
                onClose={handleClose}


            >
                <Fade in={show}>
                    <Box sx={style}>
                        <div>

                            <form>
                                {/* <form onClick={handlesubmit}> */}
                                <div className="add-div-close-div">

                                    <h2 clssName="add_text_only">Add Itmes</h2>
                                    <CloseIcon onClick={() => handleClose()} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                                    <h3 clssName="add_text_only">Item Details</h3>
                                    <Typography variant="body2" color="primary" align="right" style={{ padding: '1rem' }}>
                                        {currDate} / {currTime}
                                    </Typography>

                                </div>
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
                                            {department.map((dept) => (
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

                                </div>
                                <div className="save-div-btn" style={{ marginTop: '5%' }}>
                                    <button
                                        className="save-div-btn-btn"
                                        style={{ cursor: 'pointer' }}
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                    </button>
                                    <button
                                        onClick={() => handleClose()}
                                        className="save-div-btn-btn-cancel"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}
export default Add