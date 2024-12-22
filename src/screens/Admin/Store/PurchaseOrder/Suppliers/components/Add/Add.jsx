import React, { useEffect, useState } from 'react'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import CloseIcon from '@mui/icons-material/Close';
import Select from '@mui/material/Select'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Selec from 'react-select';

import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Swal from 'sweetalert2'
import { ReactTransliterate } from 'react-transliterate';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import TotalAmountRow from '../common/TotalAmountRow'
import { Converter, hiIN } from 'any-number-to-words';

import { CustomInput, CustomInputLabel, CustomTableInput } from '../common';



import './Add.css'
import { serverInstance } from '../../../../../../../API/ServerInstance'



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    background: '#FFFFF',
    borderRadius: '15px',
    boxShadow: 24,
    p: 4,

};

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
const Add = ({ getPO }) => {


    const [departmentList, setDepartmentList] = useState([])


    const [show, setShow] = useState(false)
    const [showloader, setshowloader] = useState(false);
    const [step, setStep] = useState(1)
    const [newMember, setNewMember] = useState(false);
    const [show2, setShow2] = useState(false)
    const [supList, setSupList] = useState([])
    const [supCode, setSupCode] = useState('')
    const [supName, setSupName] = useState('')
    const [itemsCode, setItemsCode] = useState('')
    const [itemNameEnglish, setItemNameEnglish] = useState('');
    const [itemNameHindi, setItemNameHindi] = useState('')
    const [UMOCode, setUMOCode] = useState('')
    const [UMOName, setUMOName] = useState('')
    const [supNameEnglish, setSupNameEnglish] = useState('');
    const [supNameHindi, setSupNameHindi] = useState('')
    const [purchaseReq, setPurchaseReq] = useState('');
    const [PONo, setPONo] = useState('')
    const [deptName, setDeptName] = useState('');
    const [deptCode, setDeptCode] = useState('');
    const [showAddSupplier, setShowAddSupplier] = useState(false);  // State for showing add supplier form
    const [showAddDepartment, setShowAddDepartment] = useState(false);  // State for showing add supplier form
    const [showAddUMO, setShowAddUMO] = useState(false);  // State for showing add supplier form
    const [showAddItem, setShowAddItem] = useState(false);  // State for showing add supplier form
    const [departmentName_en, setDepartmentName_en] = useState('')
    const [departmentName_hi, setDepartmentName_hi] = useState('')
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [contactNoStaff, setContactNoStaff] = useState('')
    const [contactPerson, setContactPerson] = useState('')
    const [contactNo, setContactNo] = useState('');
    const [remark, setRemark] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('')
    const [PODate, setPODate] = useState('')
    const [itemList, setItemList] = useState([])
    const [showLoader, setShowLoader] = useState(false);

    const [dbitems, setdbItems] = useState([
        {
            itemNo: '',
            itemName: '',
            HSN: '',
            UOM: '',
            quantity: '',
            price: '',
            discount: '',
            GST: '',
            total: '',
        }
    ])

    const [UOMList, setUOMList] = useState([])
    const [PRQList, setPRQList] = useState([])




    const [totalAmount, setTotalAmount] = useState(0);



    const tableTotalCellStyles = {
        paddingInline: '10px',
        paddingBlock: '4px',
        outline: '1px solid #C4C4C4',
    };

    const converter = new Converter(hiIN);



    function addItem() {
        setdbItems([
            ...dbitems,
            {
                quantity: 0,
                price: 0,
                discount: 0,
                GST: 0,
                total: 0,
            },
        ]);
    }

    const removeItems = (itemToRemove) => {
        const updatedItems = dbitems.filter(item => item !== itemToRemove);


        const newTotalAmount = updatedItems.reduce((sum, item) => sum + item.total, 0);


        setTotalAmount(newTotalAmount);

        setdbItems(updatedItems);

    };

    const handleSupCodeChange = (e) => {
        const selectedCode = e.target.value;
        setSupCode(selectedCode);

        const selectedSupplier = supList.find(item => item.supplierCode === selectedCode);

        if (selectedSupplier) {
            setSupName(selectedSupplier.supplierName_en);
        } else {
            setSupName('');
        }
    };

    const handleSupNameChange = (e) => {
        const selectedName = e.target.value;
        setSupName(selectedName);
        console.log("getting sup list ", supList, selectedName)

        const selectedSupplier = supList.find(item => item.supplierName === selectedName);

        console.log("geting selected supplier ", selectedSupplier);


        if (selectedSupplier) {
            setSupCode(selectedSupplier.id);
        } else {
            setSupCode('');
        }
    };


    const handleDeptCodeChange = (e) => {
        const selectedCode = e.target.value;
        setDeptCode(selectedCode);


        const selectedDepartment = departmentList.find(item => item.department_code === selectedCode);

        if (selectedDepartment) {
            setDeptName(selectedDepartment.departmentName_en);
        } else {
            setDeptName('');
        }
    };

    const handleDeptNameChange = (e) => {
        const selectedName = e.target.value;
        setDeptName(selectedName);

        const selectedDepartment = departmentList.find(item => item.departmentName_en === selectedName);

        if (selectedDepartment) {
            setDeptCode(selectedDepartment.department_code);
        } else {
            setDeptCode('');
        }
    };

    const handleMasterSupSubmit = async () => {
        try {
            setShowLoader(true);

            const data = {
                supplierCode: supCode,
                supplierName_en: supNameEnglish,
                supplierName_hi: supNameHindi,
            };

            console.log("try 1");

            // Use serverInstance to handle the request
            serverInstance('admin/add-supplierName', 'post', data).then((res) => {
                console.log("try 3", res);

                if (res.status) {
                    // Show success message
                    // Swal.fire('Great!', res.msg, 'success');
                    console.log("getting status");
                    setShowAddSupplier(false);
                    setSupCode("")
                    // Reload supplier list
                    getSupplier();
                    // Close the modal after submitting
                } else {
                    // Handle error case
                    // Swal.fire('Error!', res?.msg || 'Something went wrong!', 'error');
                }

                // Stop the loader
                setShowLoader(false);
            }).catch((error) => {
                // Handle network or server errors
                setShowLoader(false);
                Swal.fire('Error!', error.message || 'Request failed!', 'error');
            });
        } catch (error) {
            // Handle unexpected errors
            setShowLoader(false);
            Swal.fire('Error!', error.message || error, 'error');
        }
    };


    const handleMasterItemSubmit = async () => {
        try {
            setShowLoader(true);

            const data = {
                itemCode: itemsCode,
                itemNameEnglish: itemNameEnglish,
                itemNameHindi: itemNameHindi,
            };

            console.log("try 1");

            // Use serverInstance to handle the request
            serverInstance('admin/add-item', 'post', data).then((res) => {
                console.log("try 3", res);

                if (res.status) {
                    // Show success message
                    // Swal.fire('Great!', res.msg, 'success');
                    console.log("getting status");
                    setShowAddItem(false);
                    setItemsCode("")
                    // Reload supplier list
                    getItem();
                    // Close the modal after submitting
                } else {
                    // Handle error case
                    // Swal.fire('Error!', res?.msg || 'Something went wrong!', 'error');
                }

                // Stop the loader
                setShowLoader(false);
            }).catch((error) => {
                // Handle network or server errors
                setShowLoader(false);
                Swal.fire('Error!', error.message || 'Request failed!', 'error');
            });
        } catch (error) {
            // Handle unexpected errors
            setShowLoader(false);
            Swal.fire('Error!', error.message || error, 'error');
        }
    };

    const handleMasterDeptSubmit = async () => {
        try {
            setShowLoader(true);

            const data = {
                department_code: deptCode,
                departmentName_en: departmentName_en,
                departmentName_hi: departmentName_hi,
            };

            console.log("try 1");

            // Use serverInstance to handle the request
            serverInstance('admin/add-department', 'post', data).then((res) => {
                console.log("try 3", res);

                if (res.status) {
                    // Show success message
                    // Swal.fire('Great!', res.msg, 'success');
                    console.log("getting status");
                    setShowAddDepartment(false);
                    setDeptCode("")
                    // Reload supplier list
                    getDepartment();
                    // Close the modal after submitting
                } else {
                    // Handle error case
                    // Swal.fire('Error!', res?.msg || 'Something went wrong!', 'error');
                }

                // Stop the loader
                setShowLoader(false);
            }).catch((error) => {
                // Handle network or server errors
                setShowLoader(false);
                Swal.fire('Error!', error.message || 'Request failed!', 'error');
            });
        } catch (error) {
            // Handle unexpected errors
            setShowLoader(false);
            Swal.fire('Error!', error.message || error, 'error');
        }
    };

    const handleMasterUMOSubmit = async () => {
        try {
            setShowLoader(true);

            const data = {
                UOM: UMOName,
                UOMCode: UMOCode,
            };

            // Use serverInstance to handle the request
            serverInstance('admin/add-uom', 'post', data).then((res) => {
                console.log("try 3", res);

                if (res.status) {
                    // Show success message
                    // Swal.fire('Great!', res.msg, 'success');
                    console.log("getting status");
                    setShowAddUMO(false);
                    // Reload supplier list
                    getUOM();
                    // Close the modal after submitting
                } else {
                    // Handle error case
                    // Swal.fire('Error!', res?.msg || 'Something went wrong!', 'error');
                }

                // Stop the loader
                setShowLoader(false);
            }).catch((error) => {
                // Handle network or server errors
                setShowLoader(false);
                Swal.fire('Error!', error.message || 'Request failed!', 'error');
            });
        } catch (error) {
            // Handle unexpected errors
            setShowLoader(false);
            Swal.fire('Error!', error.message || error, 'error');
        }
    };



    const handleInputChange = async (idx, field, value) => {
        const updatedItems = [...dbitems];
        updatedItems[idx][field] = value;
        setItems(updatedItems);

        if (field === 'itemName') {
            const selectedItem = itemList.find(item => item.item_name === value);

            if (selectedItem) {
                updatedItems[idx]['itemNo'] = selectedItem.id || '';
                updatedItems[idx]['GST'] = '0';
                updatedItems[idx]['HSN'] = 'HSN';
                updatedItems[idx]['price'] = '0';
                updatedItems[idx]['UOM'] = selectedItem.UOM || ''; // Set UOM if applicable
                updatedItems[idx]['discount'] = '0'; // Set UOM if applicable
                updatedItems[idx]['openingQuantity'] = selectedItem.opening_stock || ''; // Set quantity to opening_stock
                updatedItems[idx]['availableQuantity'] = selectedItem.current_stock || ''; // Set quantity to opening_stock
                setDeptCode(selectedItem.department_code)
                setDeptName(selectedItem.department_name)
            } else {
                updatedItems[idx]['itemNo'] = '';
                updatedItems[idx]['UOM'] = '';
                updatedItems[idx]['quantity'] = '';
                updatedItems[idx]['availableQuantity'] = ''; // Set quantity to opening_stock
            }
        }


        const item = updatedItems[idx];
        const calculatedTotal = (item.quantity * item.price) * (1 - item.discount / 100) * (1 + item.GST / 100);
        item.total = calculatedTotal;

        const newTotalAmount = updatedItems.reduce((sum, item) => sum + item.total, 0);
        setTotalAmount(newTotalAmount);

        setdbItems(updatedItems);
    };



    const [items, setItems] = useState([
        {
            quantity: 0,
            price: 0,
            discount: 0,
            GST: 0,
            total: 0,
        },
    ]);

    const initialItem = {
        quantity: 0,
        price: 0,
        discount: 0,
        GST: 0,
        total: 0,
    };

    const [Items, setInitialItems] = useState([initialItem]);


    const [next, setNext] = useState(false)




    const handleCancel = () => {
        setItems([initialItem]);
    };

    const handleClose = () => {
        setShow(false);
        setNext(false);
        handleCancel();
        setTotalAmount(0);

    };

    const handleShow = () => {
        setStep(1);
        setShow(true);
        setNext(false);
    };


    const getDepartment = async () => {
        try {
            const res = await serverInstance('admin/get-department', 'get')

            setDepartmentList(res.data)
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const getItem = async () => {
        try {
            const res = await serverInstance('store/get-itemMaster', 'get')

            setItemList(res.data)
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }


    const getSupplier = async () => {
        try {
            const res = await serverInstance('store/get-supplierMaster', 'get')

            setSupList(res.data)
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

    const getPRQNo = async () => {
        try {
            const res = await serverInstance('store/get-purchaseRequisitionNo', 'get')
            setPRQList(res.data)
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }




    const handleSubmit = (e) => {
        e.preventDefault();

        try {


            const data = {
                purchaseRequisitonNo: purchaseReq,
                // purchaseOrderNo: PONo,
                supplierCode: supCode,
                supplierName: supName,
                departmentCode: deptCode,
                departmentName: deptName,
                contactPerson: contactPerson,
                contactName: contactNo,
                address: address,
                state: state,
                city: city,
                pincode: pincode,
                purchaseOrderDate: date,
                deliveryDate: date,
                mobileNo: contactNo,
                remark: remark,
                purchaseOrderList: dbitems,
            }

            serverInstance('store/add-purchaseOrder', 'post', data).then((res) => {
                if (res.status) {
                    getPO();
                    handleClose()
                    Swal.fire('Great!', res.msg, 'success')
                }

                if (res.status === false) {
                    Swal.fire('Error!', res?.msg, 'error')
                }
            })
        } catch (err) {
            Swal.fire('Error!', res?.msg, 'error')
            console.log(err)
        }
    }




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
    var date = today.toISOString().substring(0, 10);


    useEffect(() => {
        getDepartment();
        getSupplier();
        getUOM();
        getPRQNo();
        getItem();
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
                title='Add Purchase Order'
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

                            <form onSubmit={handleSubmit}>
                                <div className="add-div-close-div">

                                    <h2 clssName="add_text_only">Purchase Order</h2>


                                    <CloseIcon onClick={() => handleClose()} />

                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>


                                    <Typography variant="body2" color="primary" align="right">
                                        {currDate} / {currTime}
                                    </Typography>

                                </div>
                                <div className="flex_div_main_add_user">

                                    <div className="main-input-div1">

                                        <div className="inner-input-divadd">
                                            <label htmlFor="supplierCode">Purchase Requisiton No.</label>
                                            {/* <input
                                                type="text"
                                                required
                                                placeholder="Enter Purchase Requisition No."
                                                value={purchaseReq}
                                                onChange={(e) => setPurchaseReq(e.target.value)}
                                            /> */}
                                            <Select
                                                sx={{
                                                    width: '18rem',
                                                    height: '2rem',
                                                    borderRadius: '0.5rem',
                                                    fontSize: 14,
                                                    '& .MuiSelect-select': {
                                                        padding: '1px',
                                                    },
                                                }}
                                                value={purchaseReq}
                                                onChange={(e) => setPurchaseReq(e.target.value)}
                                                displayEmpty
                                            >
                                                <MenuItem disabled value="">
                                                    Select Purchase Reqisition No.
                                                </MenuItem>

                                                {PRQList &&
                                                    PRQList?.map((item, index) => (
                                                        <MenuItem
                                                            sx={{
                                                                fontSize: 14,
                                                            }}
                                                            key={item.id}
                                                            value={item?.purchaseRequisitionNo}
                                                        >
                                                            {item?.purchaseRequisitionNo}
                                                        </MenuItem>
                                                    ))}
                                            </Select>

                                        </div>

                                        {/* <div className="inner-input-divadd">
                                            <label htmlFor="supName">Supplier Name</label>
                                            <Select
                                                required
                                                sx={{
                                                    width: '18rem',
                                                    height: '2rem',
                                                    borderRadius: '0.5rem',
                                                    fontSize: 14,
                                                    '& .MuiSelect-select': {
                                                        padding: '1px',
                                                    },
                                                }}
                                                value={supName}
                                                onChange={handleSupNameChange}
                                                displayEmpty
                                            >
                                                <MenuItem disabled value="">Select Supplier Name</MenuItem>

                                                {supList && supList?.map((item, index) => {
                                                    return (
                                                        <MenuItem
                                                            sx={{
                                                                fontSize: 14,
                                                            }}
                                                            key={item.id}
                                                            value={item?.supplierName_en}

                                                        >
                                                            {item?.supplierName_en}

                                                        </MenuItem>
                                                    )
                                                })}

                                            </Select>

                                        </div> */}



                                        {/* <div className="inner-input-divadd">
                                            <label htmlFor="pincode">Pincode</label>
                                            <input
                                                id="pincode"
                                                text="text"
                                                required
                                                name="payAmt"
                                                value={pincode}
                                                onChange={(e) => setPincode(e.target.value)}
                                                placeholder='Enter Pincode'
                                            />
                                        </div> */}




                                        {/* <div className="inner-input-divadd">


                                            <label>Purchase Order Date</label>
                                            <input
                                                type="text"
                                                required

                                                value={date}

                                            />

                                        </div> */}
                                    </div>

                                    <div className="main-input-div2">
                                        {/* <div className="inner-input-divadd">
                                            <label htmlFor="supplierCode">Purchase Order No.</label>
                                            <input
                                                type="text"
                                                id="supType"
                                                required
                                                name="supType"
                                                placeholder="Enter Purchase Order No."
                                                value={PONo}
                                                onChange={(e) => setPONo(e.target.value)}
                                            />
                                        </div> */}

                                        {/* <div className="inner-input-divadd">
                                            <label htmlFor="Tally Head">Department Code*</label>
                                            <Select
                                                required
                                                sx={{
                                                    width: '18rem',
                                                    height: '2rem',
                                                    borderRadius: '0.5rem',
                                                    fontSize: 14,
                                                    '& .MuiSelect-select': {
                                                        padding: '1px',
                                                    },
                                                }}
                                                value={deptCode}
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
                                        </div> */}

                                        <div className="inner-input-divadd">
                                            <label htmlFor="supName">Supplier Name</label>
                                            <Select
                                                required
                                                sx={{
                                                    width: '18rem',
                                                    height: '2rem',
                                                    borderRadius: '0.5rem',
                                                    fontSize: 14,
                                                    '& .MuiSelect-select': {
                                                        padding: '1px',
                                                    },
                                                }}
                                                value={supName}
                                                onChange={handleSupNameChange}
                                                displayEmpty
                                            >
                                                <MenuItem disabled value="">Select Supplier Name</MenuItem>

                                                {supList && supList?.map((item, index) => {
                                                    return (
                                                        <MenuItem
                                                            sx={{
                                                                fontSize: 14,
                                                            }}
                                                            key={item.id}
                                                            value={item?.supplierName}

                                                        >
                                                            {item?.supplierName}

                                                        </MenuItem>
                                                    )
                                                })}

                                            </Select>

                                        </div>

                                        {/* <p style={{ fontSize: '12px' }}>
                                            Don't see your department?{' '}
                                            <a href="#" onClick={() => setShowAddDepartment(true)}>Add a new supplier</a>
                                        </p> */}

                                        <Dialog
                                            open={showAddDepartment}
                                            onClose={() => setShowAddDepartment(false)} // Close the modal on cancel or outside click
                                            aria-labelledby="add-supplier-dialog"
                                        >
                                            <DialogTitle id="add-supplier-dialog">Add New Department</DialogTitle>
                                            <DialogContent>
                                                <div className="inner-input-div2">
                                                    <label htmlFor="supplierCode">Department</label>
                                                    <CustomInput
                                                        id="supplierCode"
                                                        placeholder="Enter Supplier Code"
                                                        value={deptCode}
                                                        onChange={(e) => setDeptCode(e.target.value)}
                                                    />
                                                </div>

                                                <div className="inner-input-div2">
                                                    <label htmlFor="supplierName">Department Name in English</label>
                                                    <CustomInput
                                                        id="supplierName"
                                                        placeholder="Enter Supplier Name"
                                                        value={departmentName_en}
                                                        onChange={(e) => setDepartmentName_en(e.target.value)}
                                                    />
                                                </div>

                                                <div className="inner-input-div2">
                                                    <label htmlFor="supplierNameHindi">Enter Department Name in Hindi</label>
                                                    <ReactTransliterate
                                                        placeholder="Enter Supplier Name in Hindi"
                                                        style={{ ...custominput, width: '32rem' }} // Combine custominput styles with width
                                                        id="supplierNameHindi"
                                                        required
                                                        value={departmentName_hi}
                                                        onChangeText={(supNameHindi) => setDepartmentName_hi(supNameHindi)}
                                                        onChange={(e) => setDepartmentName_hi(e.target.value)}
                                                        lang="hi"
                                                    />
                                                </div>
                                            </DialogContent>

                                            <DialogActions>
                                                <Button onClick={() => setShowAddDepartment(false)} color="secondary">
                                                    Cancel
                                                </Button>
                                                <Button onClick={handleMasterDeptSubmit} color="primary" disabled={showLoader}>
                                                    Submit
                                                </Button>
                                            </DialogActions>
                                        </Dialog>


                                        {/* <div className="inner-input-divadd">
                                            <label htmlFor="State">State</label>
                                            <input
                                                id="state"
                                                text="text"
                                                required
                                                value={state}
                                                placeholder='Enter State'
                                                onChange={(e) => setState(e.target.value)}

                                            />
                                        </div> */}



                                        {/* <div className="inner-input-divadd">
                                            <label htmlFor="Tally Head">Contact No.*</label>
                                            <input
                                                id="talHead"
                                                text="text"
                                                required
                                                placeholder='Enter Contact No.'
                                                value={contactNo}
                                                onChange={(e) => setContactNo(e.target.value)}
                                            />
                                        </div> */}

                                        {/* <div className="inner-input-divadd">
                                            <label htmlFor="deliveryDate">Delivery Date*</label>
                                            <input
                                                id="deliveryDate"
                                                type="date"
                                                required
                                                name="deliveryDate"

                                                onChange={(e) => setDeliveryDate(e.target.value)}
                                            />
                                        </div> */}
                                    </div>
                                    <div className="main-input-div3">



                                        {/* <div className="inner-input-divadd">
                                            <label htmlFor="supplierCode">Department Name</label>
                                            <Select
                                                required
                                                sx={{
                                                    width: '18rem',
                                                    height: '2rem',
                                                    borderRadius: '0.5rem',
                                                    fontSize: 14,
                                                    '& .MuiSelect-select': {
                                                        padding: '1px',
                                                    },
                                                }}
                                                value={deptName}
                                                onChange={handleDeptNameChange}
                                                displayEmpty
                                            >
                                                <MenuItem disabled value="">Select Department</MenuItem>

                                                {departmentList && departmentList?.map((item, index) => {
                                                    return (
                                                        <MenuItem
                                                            sx={{
                                                                fontSize: 14,
                                                            }}
                                                            key={item.id}
                                                            value={item?.departmentName_en}

                                                        >
                                                            {item?.departmentName_en}

                                                        </MenuItem>
                                                    )
                                                })}

                                            </Select>
                                        </div> */}

                                        <div className="inner-input-divadd">
                                            <label>Purchase Order Date</label>
                                            <input
                                                type="text"
                                                required
                                                value={date}
                                            />
                                        </div>
                                        {/* <div className="inner-input-divadd">
                                            <label htmlFor="City">City</label>
                                            <input
                                                id="city"
                                                type="text"
                                                required
                                                placeholder='Enter City'
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}

                                            />
                                        </div> */}

                                        {/* <div className="inner-input-divadd">
                                            <label htmlFor="contactPerson">Contact Person Name(Staff)</label>
                                            <input
                                                id="contactPerson"
                                                text="text"
                                                required
                                                value={contactPerson}
                                                placeholder='Enter Contact Person'
                                                onChange={(e) => setContactPerson(e.target.value)}

                                            />

                                        </div> */}

                                        {/* <div className="inner-input-divadd">
                                            <label htmlFor="Company Location">Remark</label>
                                            <input
                                                id="payAmt"
                                                text="text"
                                                name="payAmt"
                                                value={remark}
                                                onChange={(e) => setRemark(e.target.value)}
                                                placeholder='Enter Remark'
                                            />
                                        </div> */}

                                    </div>

                                    <div className="main-input-div4">


                                        {/* <div className="inner-input-divadd">
                                            <label htmlFor="supplierCode">Supplier Code*</label>
                                            <Select
                                                required
                                                sx={{
                                                    width: '18rem',
                                                    height: '2rem',
                                                    borderRadius: '0.5rem',
                                                    fontSize: 14,
                                                    '& .MuiSelect-select': {
                                                        padding: '1px',
                                                    },
                                                }}
                                                value={supCode}
                                                onChange={handleSupCodeChange}
                                                displayEmpty
                                            >
                                                <MenuItem disabled value="">
                                                    Select Supplier Code
                                                </MenuItem>

                                                {supList &&
                                                    supList?.map((item, index) => (
                                                        <MenuItem
                                                            sx={{
                                                                fontSize: 14,
                                                            }}
                                                            key={item.id}
                                                            value={item?.supplierCode}
                                                        >
                                                            {item?.supplierCode}
                                                        </MenuItem>
                                                    ))}
                                            </Select>
                                        </div> */}

                                        <div className="inner-input-divadd">
                                            <label htmlFor="Company Location">Remark</label>
                                            <input
                                                id="payAmt"
                                                text="text"
                                                name="payAmt"
                                                value={remark}
                                                onChange={(e) => setRemark(e.target.value)}
                                                placeholder='Enter Remark'
                                            />
                                        </div>

                                        {/* <p style={{ fontSize: '12px' }}>
                                            Don't see your supplier?{' '}
                                            <a href="#" onClick={() => setShowAddSupplier(true)}>Add a new supplier</a>
                                        </p> */}

                                        {/* Supplier Form Dialog (Pop-up) */}
                                        <Dialog
                                            open={showAddSupplier}
                                            onClose={() => setShowAddSupplier(false)} // Close the modal on cancel or outside click
                                            aria-labelledby="add-supplier-dialog"
                                        >
                                            <DialogTitle id="add-supplier-dialog">Add New Supplier</DialogTitle>
                                            <DialogContent>
                                                <div className="inner-input-div2">
                                                    <label htmlFor="supplierCode">Supplier Code</label>
                                                    <CustomInput
                                                        id="supplierCode"
                                                        placeholder="Enter Supplier Code"
                                                        value={supCode}
                                                        onChange={(e) => setSupCode(e.target.value)}
                                                    />
                                                </div>

                                                <div className="inner-input-div2">
                                                    <label htmlFor="supplierName">Supplier Name in English</label>
                                                    <CustomInput
                                                        id="supplierName"
                                                        placeholder="Enter Supplier Name"
                                                        value={supNameEnglish}
                                                        onChange={(e) => setSupNameEnglish(e.target.value)}
                                                    />
                                                </div>

                                                <div className="inner-input-div2">
                                                    <label htmlFor="supplierNameHindi">Enter Supplier Name in Hindi</label>
                                                    <ReactTransliterate
                                                        placeholder="Enter Supplier Name in Hindi"
                                                        style={{ ...custominput, width: '32rem' }} // Combine custominput styles with width
                                                        id="supplierNameHindi"
                                                        required
                                                        value={supNameHindi}
                                                        onChangeText={(supNameHindi) => setSupNameHindi(supNameHindi)}
                                                        onChange={(e) => setSupNameHindi(e.target.value)}
                                                        lang="hi"
                                                    />
                                                </div>
                                            </DialogContent>

                                            <DialogActions>
                                                <Button onClick={() => setShowAddSupplier(false)} color="secondary">
                                                    Cancel
                                                </Button>
                                                <Button onClick={handleMasterSupSubmit} color="primary" disabled={showLoader}>
                                                    Submit
                                                </Button>
                                            </DialogActions>
                                        </Dialog>


                                        {/* <div className="inner-input-divadd">
                                            <label htmlFor="Company Location">Address</label>
                                            <input
                                                id="address"
                                                text="text"
                                                required
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                placeholder='Enter Address'

                                            />
                                        </div> */}




                                        {/* <div className="inner-input-divadd">
                                            <label htmlFor="ContactNo">Contact No.(Staff)</label>
                                            <input
                                                id="contactNo"
                                                text="text"
                                                required
                                                name="contactNo"
                                                value={contactNoStaff}
                                                onChange={(e) => setContactNoStaff(e.target.value)}
                                                placeholder='Enter Contact No.'
                                            />
                                        </div> */}



                                    </div>
                                </div>

                                <Box
                                    sx={{
                                        marginBottom: '-1rem',
                                        paddingInline: '10px',
                                        minWidth: 200,
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    Add Items to purchase:

                                    <IconButton aria-label="add" size="small" onClick={addItem}>

                                        <AddBoxIcon color="primary" />
                                    </IconButton>
                                </Box>

                                <div className="flex_div_main_add_user" >
                                    <TableContainer
                                        sx={{

                                            maxHeight: '200px',
                                            overflowY: 'auto',
                                            mt: 4,
                                            width: 1250
                                        }}
                                    >

                                        <Table
                                            stickyHeader
                                            sx={{

                                                border: '1px solid #C4C4C4',
                                                '& th': {
                                                    padding: 0,
                                                    fontSize: 14,
                                                    fontWeight: 500,
                                                    backgroundColor: '#E4E3E3',
                                                    color: '#05313C',
                                                    outline: '1px solid #C4C4C4',
                                                },
                                                '& td': {
                                                    padding: 0,
                                                    fontSize: 14,
                                                },
                                            }}
                                            aria-label="customized table"
                                        >

                                            <TableHead>
                                                <TableRow >
                                                    {/* <TableCell style={{ width: '15%' }}>
                                                        Item No. {" "}
                                                        <a href="#" onClick={() => setShowAddItem(true)}>Add Items</a>
                                                    </TableCell> */}
                                                    <TableCell align="center">Item Name</TableCell>
                                                    <TableCell align="center">UOM {" "}
                                                        <a href="#" onClick={() => setShowAddUMO(true)}>Add UOM</a></TableCell>
                                                    <TableCell align="center">Quantity</TableCell>
                                                    <TableCell align="center">Available Quantity</TableCell>
                                                    {/* <TableCell align="center">Price (Rs.) </TableCell>
                                                    <TableCell align="center">Discount (%)</TableCell>
                                                    <TableCell align="center">GST (%)</TableCell>
                                                    <TableCell align="center">Total</TableCell> */}


                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {dbitems.map((item, idx) => (
                                                    <TableRow key={idx}>
                                                        {/* <TableCell
                                                            style={{
                                                                paddingInline: 0,
                                                            }}
                                                        >
                                                            <Selec
                                                                required
                                                                isClearable
                                                                value={itemList.find((item) => item.itemCode === item.itemNo)}
                                                                onChange={(newValue) => handleInputChange(idx, 'itemNo', newValue ? newValue.itemCode : '')}
                                                                options={itemList}
                                                                getOptionLabel={(option) => option.itemNameEnglish}
                                                                getOptionValue={(option) => option.itemCode}
                                                            />
                                                        </TableCell> */}

                                                        <TableCell>
                                                            <Select
                                                                required
                                                                sx={{
                                                                    width: '100%',
                                                                    fontSize: 14,
                                                                    '& .MuiSelect-select': {
                                                                        padding: '1px',
                                                                    },
                                                                }}
                                                                value={item.itemName || ''} // Use itemName here
                                                                onChange={(e) => handleInputChange(idx, 'itemName', e.target.value)}
                                                                displayEmpty
                                                            >
                                                                <MenuItem value="" disabled>Select Item</MenuItem>
                                                                {Array.isArray(itemList) &&
                                                                    itemList.map((itemOption) => (
                                                                        <MenuItem
                                                                            key={itemOption.id}
                                                                            value={itemOption.item_name} // Use item_name as value
                                                                            sx={{ fontSize: 14 }}
                                                                        >
                                                                            {itemOption.item_name}
                                                                        </MenuItem>
                                                                    ))}
                                                            </Select>
                                                        </TableCell>

                                                        {/* <TableCell>
                                                            <CustomTableInput
                                                                required
                                                                type="text"
                                                                value={item.HSN}
                                                                onChange={(e) => handleInputChange(idx, 'HSN', e.target.value)}
                                                            />
                                                        </TableCell> */}

                                                        <TableCell
                                                            style={{
                                                                paddingInline: 8,
                                                            }}
                                                        >
                                                            <Select
                                                                required
                                                                sx={{
                                                                    width: '100%',
                                                                    fontSize: 14,
                                                                    '& .MuiSelect-select': {
                                                                        padding: '1px',
                                                                    },
                                                                }}
                                                                value={item.UOM}
                                                                onChange={(e) => handleInputChange(idx, 'UOM', e.target.value)}
                                                                displayEmpty
                                                            >
                                                                <MenuItem
                                                                    sx={{
                                                                        fontSize: 14,
                                                                    }}
                                                                    value={''}
                                                                    disabled
                                                                >
                                                                    Please select
                                                                </MenuItem>
                                                                {UOMList &&
                                                                    UOMList.map((item, idx) => {
                                                                        return (
                                                                            <MenuItem
                                                                                sx={{
                                                                                    fontSize: 14,
                                                                                }}
                                                                                key={item.id}
                                                                                value={item.UOM}
                                                                            >
                                                                                {item.UOM}
                                                                            </MenuItem>
                                                                        );
                                                                    })}
                                                            </Select>
                                                        </TableCell>




                                                        <TableCell align="center">
                                                            <CustomTableInput
                                                                required
                                                                type="text"
                                                                value={item.quantity}
                                                                onChange={(e) => handleInputChange(idx, 'quantity', e.target.value)}
                                                            />

                                                        </TableCell>

                                                        <TableCell align="center">
                                                            <CustomTableInput
                                                                required
                                                                disabled
                                                                value={item.availableQuantity}
                                                                onChange={(e) => handleInputChange(idx, 'availableQuantity', e.target.value)}
                                                            />
                                                        </TableCell>

                                                        {/* <TableCell align="center">
                                                            <CustomTableInput
                                                                required
                                                                type="text"
                                                                value={item.price}
                                                                onChange={(e) => handleInputChange(idx, 'price', e.target.value)}
                                                            />

                                                        </TableCell>

                                                        <TableCell align="center">
                                                            <CustomTableInput
                                                                required
                                                                type="text"
                                                                value={item.discount}
                                                                onChange={(e) => handleInputChange(idx, 'discount', e.target.value)}
                                                            />

                                                        </TableCell>

                                                        <TableCell align="center">
                                                            <CustomTableInput
                                                                required
                                                                type="text"
                                                                value={item.GST}
                                                                onChange={(e) => handleInputChange(idx, 'GST', e.target.value)}
                                                            />

                                                        </TableCell>

                                                        <TableCell align="center">
                                                            <CustomTableInput
                                                                required
                                                                type="text"
                                                                value={Number(item.total).toFixed(2)}
                                                            />

                                                        </TableCell> */}
                                                        {idx > 0 && (
                                                            <IconButton
                                                                sx={{
                                                                    padding: '4px',
                                                                }}
                                                                onClick={() => removeItems(item)}
                                                            >
                                                                <RemoveCircleOutlineIcon
                                                                    color="primary"
                                                                    fontSize="small"
                                                                />
                                                            </IconButton>
                                                        )}
                                                    </TableRow>
                                                ))}

                                                {/* <TotalAmountRow totalAmount={totalAmount} /> */}

                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>

                                <div className="save-div-btn" style={{ marginTop: '5%' }}>
                                    <button className="save-div-btn-btn"
                                        style={{ cursor: 'pointer' }}

                                    >
                                        {showloader ? (
                                            <CircularProgress
                                                style={{
                                                    width: '21px',
                                                    height: '21px',
                                                    color: '#FE7600',
                                                }}
                                            />
                                        ) : (
                                            'Submit'
                                        )}
                                    </button>
                                    <button
                                        type='button'
                                        onClick={() => handleClose()}
                                        className="save-div-btn-btn-cancel"
                                    >
                                        Cancel
                                    </button>
                                </div>

                            </form>

                            <Dialog
                                open={showAddItem}
                                onClose={() => setShowAddItem(false)} // Close the modal on cancel or outside click
                                aria-labelledby="add-supplier-dialog"
                            >
                                <DialogTitle id="add-supplier-dialog">Add New Items</DialogTitle>
                                <DialogContent>
                                    <div className="inner-input-div2">
                                        <label htmlFor="supplierCode">Item Code</label>
                                        <CustomInput
                                            id="supplierCode"
                                            placeholder="Enter Supplier Code"
                                            value={itemsCode}
                                            onChange={(e) => setItemsCode(e.target.value)}
                                        />
                                    </div>

                                    <div className="inner-input-div2">
                                        <label htmlFor="supplierName">Itme Name in English</label>
                                        <CustomInput
                                            id="supplierName"
                                            placeholder="Enter Item Name"
                                            value={itemNameEnglish}
                                            onChange={(e) => setItemNameEnglish(e.target.value)}
                                        />
                                    </div>

                                    <div className="inner-input-div2">
                                        <label htmlFor="supplierNameHindi">Enter Item Name in Hindi</label>
                                        <ReactTransliterate
                                            placeholder="Enter Item Name in Hindi"
                                            style={{ ...custominput, width: '32rem' }} // Combine custominput styles with width
                                            id="supplierNameHindi"
                                            required
                                            value={itemNameHindi}
                                            onChangeText={(supNameHindi) => setItemNameHindi(supNameHindi)}
                                            onChange={(e) => setItemNameHindi(e.target.value)}
                                            lang="hi"
                                        />
                                    </div>
                                </DialogContent>

                                <DialogActions>
                                    <Button onClick={() => setShowAddItem(false)} color="secondary">
                                        Cancel
                                    </Button>
                                    <Button onClick={handleMasterItemSubmit} color="primary" disabled={showLoader}>
                                        Submit
                                    </Button>
                                </DialogActions>
                            </Dialog>

                            <Dialog
                                open={showAddUMO}
                                onClose={() => setShowAddUMO(false)} // Close the modal on cancel or outside click
                                aria-labelledby="add-supplier-dialog"
                            >
                                <DialogTitle id="add-supplier-dialog">Add New UMO</DialogTitle>
                                <DialogContent>
                                    <div className="inner-input-div2">
                                        <label htmlFor="supplierCode">UMO Code</label>
                                        <CustomInput
                                            id="supplierCode"
                                            placeholder="Enter Supplier Code"
                                            style={{ width: '32rem' }}
                                            value={UMOCode}
                                            onChange={(e) => setUMOCode(e.target.value)}
                                        />
                                    </div>

                                    <div className="inner-input-div2">
                                        <label htmlFor="supplierName">UMO Name</label>
                                        <CustomInput
                                            id="supplierName"
                                            placeholder="Enter Supplier Name"
                                            value={UMOName}
                                            onChange={(e) => setUMOName(e.target.value)}
                                        />
                                    </div>

                                </DialogContent>

                                <DialogActions>
                                    <Button onClick={() => setShowAddUMO(false)} color="secondary">
                                        Cancel
                                    </Button>
                                    <Button onClick={handleMasterUMOSubmit} color="primary" disabled={showLoader}>
                                        Submit
                                    </Button>
                                </DialogActions>
                            </Dialog>


                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default Add