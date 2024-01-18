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
    const [purchaseReq, setPurchaseReq] = useState('');
    const [PONo, setPONo] = useState('')
    const [deptName, setDeptName] = useState('');
    const [deptCode, setDeptCode] = useState('');
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



    const handleInputChange = async (idx, field, value) => {
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
            const res = await serverInstance('admin/get-item', 'get')

            setItemList(res.data)
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

    const getUOM = async () => {
        try {
            const res = await serverInstance('admin/get-UOM', 'get')

            setUOMList(res.data)
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
                purchaseOrderNo: PONo,
                supplierCode: supCode,
                supplierName: supName,
                departmentCode: deptCode,
                departmentName: deptName,
                contactPerson: contactNoStaff,
                contactName: contactPerson,
                address: address,
                state: state,
                city: city,
                pincode: pincode,
                purchaseOrderDate: date,
                deliveryDate: deliveryDate,
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
        getItem();
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
                                            <input
                                                type="text"
                                                required
                                                placeholder="Enter Purchase Requisition No."
                                                value={purchaseReq}
                                                onChange={(e) => setPurchaseReq(e.target.value)}
                                            />
                                        </div>

                                        <div className="inner-input-divadd">
                                            <label htmlFor="Tally Head">Contact No.*</label>
                                            <input
                                                id="talHead"
                                                text="text"
                                                required
                                                placeholder='Enter Contact No.'
                                                value={contactNo}
                                                onChange={(e) => setContactNo(e.target.value)}
                                            />
                                        </div>

                                        <div className="inner-input-divadd">
                                            <label htmlFor="City">City</label>
                                            <input
                                                id="city"
                                                type="text"
                                                required
                                                placeholder='Enter City'
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}

                                            />

                                        </div>


                                        <div className="inner-input-divadd">


                                            <label>Purchase Order Date</label>
                                            <input
                                                type="text"
                                                required

                                                value={date}

                                            />

                                        </div>
                                    </div>

                                    <div className="main-input-div2">
                                        <div className="inner-input-divadd">
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
                                        </div>

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


                                        <div className="inner-input-divadd">
                                            <label htmlFor="State">State</label>
                                            <input
                                                id="state"
                                                text="text"
                                                required
                                                value={state}
                                                placeholder='Enter State'
                                                onChange={(e) => setState(e.target.value)}

                                            />
                                        </div>

                                        <div className="inner-input-divadd">
                                            <label htmlFor="contactPerson">Contact Person Name(Staff)</label>
                                            <input
                                                id="contactPerson"
                                                text="text"
                                                required
                                                value={contactPerson}
                                                placeholder='Enter Contact Person'
                                                onChange={(e) => setContactPerson(e.target.value)}

                                            />
                                        </div>



                                    </div>

                                    <div className="main-input-div3">

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
                                        </div>

                                        <div className="inner-input-divadd">
                                            <label htmlFor="supplierCode">Department Name</label>
                                            <input
                                                type="text"
                                                id="supType"
                                                required
                                                name="supType"
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
                                                name="payAmt"
                                                value={pincode}
                                                onChange={(e) => setPincode(e.target.value)}
                                                placeholder='Enter Pincode'
                                            />
                                        </div>




                                        <div className="inner-input-divadd">
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
                                        </div>

                                    </div>

                                    <div className="main-input-div4">

                                        <div className="inner-input-divadd">
                                            <label htmlFor="supName">Supplier Name</label>
                                            <input
                                                id="address"
                                                type="text"
                                                required
                                                value={supName}
                                                onChange={(e) => setSupName(e.target.value)}
                                                placeholder="Enter Supplier Name"
                                            />

                                        </div>

                                        <div className="inner-input-divadd">
                                            <label htmlFor="Company Location">Address</label>
                                            <input
                                                id="address"
                                                text="text"
                                                required
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                placeholder='Enter Address'

                                            />
                                        </div>


                                        <div className="inner-input-divadd">
                                            <label htmlFor="deliveryDate">Delivery Date*</label>
                                            <input
                                                id="deliveryDate"
                                                type="date"
                                                required
                                                name="deliveryDate"

                                                onChange={(e) => setDeliveryDate(e.target.value)}
                                            />
                                        </div>

                                        <div className="inner-input-divadd">
                                            <label htmlFor="Company Location">Remark</label>
                                            <input
                                                id="payAmt"
                                                text="text"
                                                required
                                                name="payAmt"
                                                value={remark}
                                                onChange={(e) => setRemark(e.target.value)}
                                                placeholder='Enter Remark'
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
                                                    <TableCell style={{ width: '15%' }}>
                                                        Item No.
                                                    </TableCell>
                                                    <TableCell style={{ width: '15%' }} align="center">Item Name</TableCell>
                                                    <TableCell style={{ width: '10%' }} align="center">HSN</TableCell>
                                                    <TableCell style={{ width: '10%' }} align="center">UOM</TableCell>
                                                    <TableCell align="center">Quantity</TableCell>
                                                    <TableCell align="center">Price (Rs.) </TableCell>
                                                    <TableCell align="center">Discount (%)</TableCell>
                                                    <TableCell align="center">GST (%)</TableCell>
                                                    <TableCell align="center">Total</TableCell>


                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {dbitems.map((item, idx) => (
                                                    <TableRow key={idx}>
                                                        <TableCell
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

                                                <TotalAmountRow totalAmount={totalAmount} />

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


                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default Add