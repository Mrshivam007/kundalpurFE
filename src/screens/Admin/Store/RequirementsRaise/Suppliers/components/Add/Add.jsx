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
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Selec from 'react-select'
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Swal from 'sweetalert2'
import { ReactTransliterate } from 'react-transliterate';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddInventory from './AddInventory'
import TotalAmountRow from '../common/TotalAmountRow'
import { Converter, hiIN } from 'any-number-to-words';
import { serverInstance } from '../../../../../../../API/ServerInstance'
import { CustomInput, CustomInputLabel, CustomTableInput } from '../common';


import './Add.css'


const Add = ({ getPR }) => {


    function addItem() {
        setdbItems([
            ...dbitems,
            {
                quantity: 0,
                price: 0,
                discount: 0,
                gst: 0,
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



    const [show, setShow] = useState(false)
    const [showloader, setshowloader] = useState(false);
    const [step, setStep] = useState(1)
    const [newMember, setNewMember] = useState(false);
    const [supList, setSupList] = useState([])
    const [supName, setSupName] = useState('')
    const [supCode, setSupCode] = useState('')
    const [PONo, setPONo] = useState('')
    const [purchaseReq, setPurchaseReq] = useState('')
    const [departmentList, setDepartmentList] = useState([])
    const [deptName, setDeptName] = useState('')
    const [deptCode, setDeptCode] = useState('')
    const [itemList, setItemList] = useState([])
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [pincode, setPincode] = useState('')
    const [contactNo, setContactNo] = useState('')
    const [remark, setRemark] = useState('')
    const [deliveryDate, setDeliveryDate] = useState('')
    const [approverList, setApproverList] = useState([])
    const [approver1, setApprover1] = useState('')
    const [approver2, setApprover2] = useState('')
    const [approver3, setApprover3] = useState('')
    const [approver4, setApprover4] = useState('')
    const [dbitems, setdbItems] = useState([
        {
            itemNo: '',
            itemName: '',
            HSN: '',
            UOM: '',
            quantity: '',
        }
    ])

    const [totalAmount, setTotalAmount] = useState(0);


    const handleInputChange = (idx, field, value) => {

        const updatedItems = [...dbitems];
        updatedItems[idx][field] = value;
        setItems(updatedItems);

        if (field === 'itemNo') {
            const selectedItem = itemList.find(item => item.itemCode === value);

            if (selectedItem) {

                updatedItems[idx]['itemName'] = selectedItem.itemNameEnglish || '';

            } else {

                updatedItems[idx]['itemName'] = '';
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
            gst: 0,
            total: 0,
        },
    ]);

    const initialItem = {
        quantity: 0,
        price: 0,
        discount: 0,
        gst: 0,
        total: 0,
    };

    const [Items, setInitialItems] = useState([initialItem]);


    const [next, setNext] = useState(false)


    const getItem = async () => {
        try {
            const res = await serverInstance('admin/get-item', 'get')

            setItemList(res.data)
            console.log(itemList)
        } catch (err) {
            console.log(err)
        }
    }

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


    const getStaff = async () => {
        try {
            const res = await serverInstance('admin/add-employee', 'get')
            console.log('staff', res.data)
            const filteredData = res.data.filter(item => item.approver === true);
            setApproverList(filteredData);

            console.log('list', approverList);
        } catch (err) {
            console.log(err)
        }
    }

    const getDepartment = async () => {
        try {
            const res = await serverInstance('admin/get-department', 'get')

            setDepartmentList(res.data)
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const getSupplier = async () => {
        try {
            const res = await serverInstance('admin/get-supplierName', 'get')

            setSupList(res.data)
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        try {

            console.log(dbitems)

            const data = {
                purchaseRequisitionNo: purchaseReq,
                purchaseOrderNo: PONo,
                supplierCode: supCode,
                supplierName: supName,
                departmentCode: deptCode,
                departmentName: deptName,
                address: address,
                state: state,
                city: city,
                pincode: pincode,
                purchaseRequisitionDate: date,
                deliveryDate: deliveryDate,
                mobileNo: contactNo,
                remark: remark,
                purchaseRequisitionList: dbitems,
                approver1: approver1,
                approver2: approver2,
                approver3: approver3,
                approver4: approver4,
            }

            serverInstance('store/add-purchaseRequisition ', 'post', data).then((res) => {
                if (res.status) {
                    getPR();
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
        getStaff();
        getItem();
        getDepartment();
        getSupplier();
    }, [])


    return (
        <div>

            <Button sx={{
                borderRadius: '0.5rem',
                color: 'black',
                width: '10vw',
                backgroundColor: '#fcbb82',

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

                            {step === 1 ?

                                (
                                    <form >
                                        {/* <form onClick={handlesubmit}> */}
                                        <div className="add-div-close-div">

                                            <h2 clssName="add_text_only">Purchase Requisition</h2>


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
                                                    <label htmlFor="supplierCode">Purchase Requisition No.</label>
                                                    <input
                                                        type="text"
                                                        id="PR"
                                                        required
                                                        placeholder="Enter Purchase Requisition No."
                                                        value={purchaseReq}
                                                        onChange={(e) => setPurchaseReq(e.target.value)}
                                                    />
                                                </div>

                                                <div className="inner-input-divadd">
                                                    <label htmlFor="supplierCode">Department Name</label>
                                                    <input
                                                        type="text"
                                                        id="deptName"
                                                        required
                                                        placeholder="Enter Department Name"
                                                        value={deptName}
                                                        onChange={(e) => setDeptName(e.target.value)}
                                                    />
                                                </div>

                                                <div className="inner-input-divadd">
                                                    <label htmlFor="pincode">Pincode</label>
                                                    <input
                                                        id="pincode"
                                                        text="text"
                                                        required
                                                        onChange={(e) => setPincode(e.target.value)}
                                                        value={pincode}
                                                        placeholder='Enter Pincode'
                                                    />
                                                </div>


                                                <div className="inner-input-divadd">
                                                    <label htmlFor="Company Location">Remark</label>
                                                    <input
                                                        id="Remark"
                                                        text="text"
                                                        required
                                                        onChange={(e) => setRemark(e.target.value)}
                                                        value={remark}
                                                        placeholder='Enter Remark'
                                                    />
                                                </div>

                                            </div>

                                            <div className="main-input-div2">

                                                <div className="inner-input-divadd">
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
                                                        <MenuItem disabled value="">Select Supplier Code</MenuItem>

                                                        {supList && supList?.map((item, index) => {
                                                            return (
                                                                <MenuItem
                                                                    sx={{
                                                                        fontSize: 14,
                                                                    }}
                                                                    key={item.id}
                                                                    value={item?.supplierCode}

                                                                >
                                                                    {item?.supplierCode}

                                                                </MenuItem>
                                                            )
                                                        })}

                                                    </Select>
                                                </div>

                                                <div className="inner-input-divadd">
                                                    <label htmlFor="Company Location">Address</label>
                                                    <input
                                                        id="address"
                                                        text="text"
                                                        required
                                                        onChange={(e) => { setAddress(e.target.value) }}
                                                        value={address}
                                                        placeholder='Enter Address'
                                                    />
                                                </div>

                                                <div className="inner-input-divadd">


                                                    <label htmlFor="City">Purchase Requisition Date</label>
                                                    <input
                                                        id="PRDate"
                                                        type="text"
                                                        required
                                                        name="voucherDate"
                                                        value={date}

                                                    />

                                                </div>

                                            </div>

                                            <div className="main-input-div3">
                                                <div className="inner-input-divadd">
                                                    <label htmlFor="email">Supplier Name</label>

                                                    <input
                                                        id="city"
                                                        type="text"
                                                        required
                                                        onChange={(e) => setSupName(e.target.value)}
                                                        value={supName}
                                                        placeholder='Enter Supplier Name'
                                                    />


                                                </div>

                                                <div className="inner-input-divadd">
                                                    <label htmlFor="City">City</label>
                                                    <input
                                                        id="city"
                                                        type="text"
                                                        required
                                                        onChange={(e) => setCity(e.target.value)}
                                                        value={city}
                                                        placeholder='Enter City'
                                                    />

                                                </div>

                                                <div className="inner-input-divadd">
                                                    <label htmlFor="deliveryDate">Delivery Date*</label>
                                                    <input
                                                        id="deliveryDate"
                                                        type="date"
                                                        required
                                                        onChange={(e) => setDeliveryDate(e.target.value)}
                                                        value={deliveryDate}
                                                    />
                                                </div>

                                            </div>

                                            <div className="main-input-div4">
                                                <div className="inner-input-divadd">
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
                                                        <MenuItem disabled value="">Select Department</MenuItem>

                                                        {departmentList && departmentList?.map((item, index) => {
                                                            return (
                                                                <MenuItem
                                                                    sx={{
                                                                        fontSize: 14,
                                                                    }}
                                                                    key={item.id}
                                                                    value={item?.department_code}

                                                                >
                                                                    {item?.department_code}

                                                                </MenuItem>
                                                            )
                                                        })}

                                                    </Select>
                                                </div>

                                                <div className="inner-input-divadd">
                                                    <label htmlFor="State">State</label>
                                                    <input
                                                        id="state"
                                                        text="text"
                                                        required
                                                        placeholder='Enter State'
                                                        onChange={(e) => setState(e.target.value)}
                                                        value={state}
                                                    />
                                                </div>

                                                <div className="inner-input-divadd">
                                                    <label htmlFor="Tally Head">Contact No.*</label>
                                                    <input
                                                        id="ContactNo"
                                                        text="text"
                                                        required
                                                        placeholder='Enter Contact No.'
                                                        onChange={(e) => setContactNo(e.target.value)}
                                                        value={contactNo}
                                                    />
                                                </div>
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
                                                            <TableCell sx={{ width: '10%' }}>
                                                                Item No.
                                                            </TableCell>
                                                            <TableCell align="center">Item Name</TableCell>
                                                            <TableCell align="center">HSN</TableCell>
                                                            <TableCell align="center">UOM</TableCell>
                                                            <TableCell align="center">Quantity</TableCell>



                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {dbitems.map((item, idx) => (
                                                            <TableRow key={idx}>
                                                                <TableCell
                                                                    style={{
                                                                        paddingInline: 0,
                                                                        position: 'absolute'
                                                                    }}
                                                                >
                                                                    <Selec
                                                                        required
                                                                        isClearable
                                                                        value={itemList.find((item) => item.itemCode === item.itemNo)}
                                                                        onChange={(newValue) => handleInputChange(idx, 'itemNo', newValue ? newValue.itemCode : '')}
                                                                        options={itemList}
                                                                        getOptionLabel={(option) => option.itemCode}
                                                                        getOptionValue={(option) => option.itemCode}
                                                                    />
                                                                </TableCell>



                                                                <TableCell>
                                                                    <CustomTableInput
                                                                        required
                                                                        type="text"
                                                                        value={item.itemName}
                                                                        onChange={(e) => handleInputChange(idx, 'itemName', e.target.value)}
                                                                    />
                                                                </TableCell>

                                                                <TableCell>
                                                                    <CustomTableInput
                                                                        required
                                                                        type="text"
                                                                        value={item.HSN}
                                                                        onChange={(e) => handleInputChange(idx, 'HSN', e.target.value)}

                                                                    />
                                                                </TableCell>

                                                                <TableCell>
                                                                    <CustomTableInput
                                                                        required
                                                                        type="text"
                                                                        value={item.UOM}
                                                                        onChange={(e) => handleInputChange(idx, 'UOM', e.target.value)}
                                                                    />
                                                                </TableCell>


                                                                <TableCell align="center">
                                                                    <CustomTableInput
                                                                        required
                                                                        type="text"
                                                                        value={item.quantity}
                                                                        onChange={(e) => handleInputChange(idx, 'quantity', e.target.value)}
                                                                    />

                                                                </TableCell>


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



                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </div>

                                        <div className="save-div-btn" style={{ marginTop: '5%' }}>
                                            <button className="save-div-btn-btn"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => setStep(step + 1)}

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
                                                    'Send To Approve'
                                                )}
                                            </button>
                                            <button
                                                onClick={() => handleClose()}
                                                type='button'
                                                className="save-div-btn-btn-cancel"
                                            >
                                                Cancel
                                            </button>
                                        </div>

                                    </form>
                                ) :

                                (

                                    <form onSubmit={handleSubmit}>

                                        <div className="add-div-close-div">
                                            <h2 clssName="add_text_only">Purchase Approver </h2>

                                            <CloseIcon sx={{ marginLeft: '20rem' }} onClick={() => handleClose()} />

                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>



                                            <Typography variant="body2" color="primary" align="right" >
                                                {currDate} / {currTime}
                                            </Typography>

                                        </div>


                                        <div className="flex_div_main_add_user" >
                                            <div className="main-input-div2" >

                                                <div className="inner-input-divadd">
                                                    <label htmlFor="approver1">Approver 1</label>
                                                    <Select

                                                        sx={{
                                                            width: '20rem',
                                                            height: '2.2rem',
                                                            borderRadius: '0.5rem',
                                                            fontSize: 14,
                                                            '& .MuiSelect-select': {
                                                                padding: '1px',
                                                            },
                                                        }}

                                                        value={approver1}
                                                        onChange={(e) => setApprover1(e.target.value)}
                                                    >
                                                        <MenuItem disabled value="">Select Approver 1</MenuItem>
                                                        {approverList.map((approver) => (
                                                            <MenuItem key={approver.id} value={approver.id}>
                                                                {approver.Username}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </div>

                                                <div className="inner-input-divadd">
                                                    <label htmlFor="approver1">Approver 2</label>
                                                    <Select

                                                        sx={{
                                                            width: '20rem',
                                                            height: '2.2rem',
                                                            borderRadius: '0.5rem',
                                                            fontSize: 14,
                                                            '& .MuiSelect-select': {
                                                                padding: '1px',
                                                            },
                                                        }}
                                                        value={approver2}
                                                        onChange={(e) => setApprover2(e.target.value)}
                                                    >
                                                        <MenuItem disabled value="">Select Approver 2</MenuItem>
                                                        {approverList.map((approver) => (
                                                            <MenuItem key={approver.id} value={approver.id}>
                                                                {approver.Username}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </div>
                                                <div className="inner-input-divadd">
                                                    <label htmlFor="approver1">Approver 3</label>
                                                    <Select

                                                        sx={{
                                                            width: '20rem',
                                                            height: '2.2rem',
                                                            borderRadius: '0.5rem',
                                                            fontSize: 14,
                                                            '& .MuiSelect-select': {
                                                                padding: '1px',
                                                            },
                                                        }}

                                                        value={approver3}
                                                        onChange={(e) => setApprover3(e.target.value)}
                                                    >
                                                        <MenuItem disabled value="">Select Approver 3</MenuItem>
                                                        {approverList.map((approver) => (
                                                            <MenuItem key={approver.id} value={approver.id}>
                                                                {approver.Username}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </div>
                                                <div className="inner-input-divadd">
                                                    <label htmlFor="approver1">Approver 4</label>
                                                    <Select

                                                        sx={{
                                                            width: '20rem',
                                                            height: '2.2rem',
                                                            borderRadius: '0.5rem',
                                                            fontSize: 14,
                                                            '& .MuiSelect-select': {
                                                                padding: '1px',
                                                            },
                                                        }}
                                                        value={approver4}
                                                        onChange={(e) => setApprover4(e.target.value)}
                                                    >
                                                        <MenuItem disabled value="">Select Approver 4</MenuItem>
                                                        {approverList.map((approver) => (
                                                            <MenuItem key={approver.id} value={approver.id}>
                                                                {approver.Username}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="save-div-btn" style={{ marginTop: '15%' }}>
                                            <button className="save-div-btn-btn"
                                                style={{ cursor: "pointer" }}


                                                type="submit"
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
                                                    'Approve'
                                                )}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setStep(step - 1)}
                                                className="save-div-btn-btn-cancel"
                                            >
                                                Back
                                            </button>
                                        </div>
                                    </form>


                                )}

                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default Add