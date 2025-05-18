import React, { useState, useEffect } from 'react'
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
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { ReactTransliterate } from 'react-transliterate';
import Swal from 'sweetalert2'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { CustomTableInput } from '../../../../PurchaseOrder/Suppliers/components/common';
import { serverInstance } from '../../../../../../../API/ServerInstance'


const GateEntry = ({ getGP }) => {


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

    const [purchaseOrderNo, setPurchaseOrderNo] = useState('')
    const [gateEntryNo, setGateEntryNo] = useState('')
    const [challanNo, setChallanNo] = useState('0')
    const [billNo, setBillNo] = useState('0')
    const [supName, setSupName] = useState('')
    const [supCode, setSupCode] = useState('')
    const [date, setDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
    });
    const [show, setShow] = useState(false)
    const [showloader, setshowloader] = useState(false);
    const [step, setStep] = useState(1)
    const [newMember, setNewMember] = useState(false);
    const [itemList, setItemList] = useState([])
    const [UOMList, setUOMList] = useState([])
    const [supList, setSupList] = useState([])
    const [items, setItems] = useState([
        {
            itemNo: '',
            itemName: '',
            departmentCode: '',
            departmentName: '',
            orderQuantity: '',
            acceptedQuantity: '',
            returnQuantity: '',
            remark: '',
        },
    ]);

    const initialItem = {
        itemNo: '',
        itemName: '',
        departmentCode: '',
        departmentName: '',
        orderQuantity: '',
        acceptedQuantity: '',
        returnQuantity: '',
        remark: ''
    };

    const handleInputChange = (index, fieldName, value) => {
        setItems((prevItems) =>
            prevItems.map((item, idx) => {
                if (idx === index) {
                    if (fieldName === 'itemName') {
                        // Find the selected item in the itemList
                        const selectedItem = itemList.find((itemOption) => itemOption.item_name === value);
                        return {
                            ...item,
                            itemName: value,
                            itemNo: selectedItem?.id || '',
                            departmentCode: selectedItem?.department_code || '', // Update departmentCode
                            departmentName: selectedItem?.department_name || '', // Update departmentName
                        };
                    }
                    return { ...item, [fieldName]: value };
                }
                return item;
            })
        );
        setItems((prevItems) =>
            prevItems.map((item, idx) => {
                if (idx === index) {
                    let updatedItem = { ...item, [fieldName]: value };

                    // Dynamically calculate returnQuantity
                    if (fieldName === 'orderQuantity') {
                        const orderQuantity = parseFloat(updatedItem.orderQuantity) || 0;
                        // const acceptedQuantity = parseFloat(updatedItem.orderQuantity) || 0;
                        updatedItem.acceptedQuantity = parseFloat(updatedItem.orderQuantity) || 0;
                        // Ensure returnQuantity is not negative
                        updatedItem.returnQuantity = 0;
                    }

                    return updatedItem;
                }
                return item;
            })
        );

    };



    const [next, setNext] = useState(false)



    const handleClose = () => {
        setShow(false);
        setItems([initialItem]);
    };

    const handleNext = () => setNext(true)

    const handleShow = () => {

        setShow(true);

    };


    const removeItems = (itemToRemove) => {
        const updatedItems = items.filter(item => item !== itemToRemove);

        setItems(updatedItems);

    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const data = {
                date: date,
                time: currTime,
                supplierName: supName,
                supplierCode: supCode,
                gateEntryNo: gateEntryNo,
                challanNo: challanNo,
                billNo: billNo,
                purchaseOrderNo: purchaseOrderNo,
                gateEntryList: items
            }

            const res = await serverInstance('store/add-gateEntry', 'post', data)
            if (res.status) {
                handleClose();
                getGP();
                Swal.fire("Great!", 'Gate Entry Done', 'success')
            }
            if (res.status === false) {
                handleClose();
                Swal.fire("Error!", res?.msg, 'error')
            }

        } catch (err) {
            console.log(err)
            Swal.fire('Error!', 'Something Went Wrong', 'error')
        }
    }

    function addItem() {
        setItems([
            ...items,
            {
                quantity: 0,
                price: 0,
                discount: 0,
                GST: 0,
                total: 0,
            },
        ]);
    }


    var options = { year: 'numeric', month: 'short', day: '2-digit' };
    var today = new Date();
    const currDate = today
        .toLocaleDateString('en-IN', options)
        .replace(/-/g, ' ');
    const currTime = today.toLocaleTimeString('it-IT', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    })

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

    const getSupplier = async () => {
        try {
            const res = await serverInstance('store/get-supplierMaster', 'get')

            setSupList(res.data)
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }

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

    useEffect(() => {
        getUOM();
        // getPRQNo();
        getSupplier();
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
                                    <h2 clssName="add_text_only">Gate Entry </h2>

                                    <CloseIcon sx={{ marginLeft: '20rem' }} onClick={() => handleClose()} />

                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                                    <Typography variant="body2" color="primary" align="right">
                                        {currDate} / {currTime}
                                    </Typography>

                                </div>

                                <div className="flex_div_main_add_user">

                                    <div className="main-input-div1">
                                        <div className="inner-input-divadd">
                                            <label htmlFor="supplierCode">Date</label>
                                            {/* <input
                                                type="text"
                                                value={currDate}
                                            /> */}
                                            <input
                                                type="date"
                                                id="date"
                                                name="date"
                                                value={date} // Bind to `date` state
                                                required
                                                onChange={(e) => setDate(e.target.value)} // Update state on change
                                            />
                                        </div>

                                        <div className="inner-input-divadd">
                                            <label htmlFor="supplierCode">Purchase Order No. </label>
                                            <input
                                                type="text"
                                                id="supType"
                                                name="supType"
                                                placeholder="Enter Purchase Order No."
                                                value={purchaseOrderNo}
                                                onChange={(e) => setPurchaseOrderNo(e.target.value)}
                                            />
                                        </div>



                                    </div>


                                    <div className="main-input-div2">

                                        <div className="inner-input-divadd">
                                            <label htmlFor="supplierCode">Time</label>
                                            <input
                                                type="text"
                                                value={currTime}
                                            />
                                        </div>


                                        <div className="inner-input-divadd">
                                            <label htmlFor="supplierCode">Gate Entry No.</label>
                                            <input
                                                type="text"
                                                id="supType"
                                                required
                                                name="supType"
                                                placeholder="Enter Gate Entry No."
                                                value={gateEntryNo}
                                                onChange={(e) => setGateEntryNo(e.target.value)}
                                            />
                                        </div>

                                    </div>


                                    <div className="main-input-div3">

                                        <div className="inner-input-divadd">
                                            <label htmlFor="supplierCode">Supplier Code</label>
                                            <input
                                                type="text"
                                                id="supType"
                                                disabled
                                                name="supType"
                                                placeholder="Enter Gate Entry No."
                                                value={supCode}
                                                onChange={(e) => setSupCode(e.target.value)}
                                            />
                                        </div>

                                        <div className="inner-input-divadd">
                                            <label htmlFor="supplierCode">Challan No.</label>
                                            <input
                                                type="text"
                                                id="supType"
                                                required
                                                name="supType"
                                                placeholder="Enter Gate Entry No."
                                                value={challanNo}
                                                onChange={(e) => setChallanNo(e.target.value)}
                                            />
                                        </div>

                                    </div>

                                    <div className="main-input-div4">

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

                                        <div className="inner-input-divadd">
                                            <label htmlFor="supplierCode">Bill No.</label>
                                            <input
                                                type="text"
                                                id="supType"
                                                name="supType"
                                                required
                                                placeholder="Enter Gate Entry No."
                                                value={billNo}
                                                onChange={(e) => setBillNo(e.target.value)}
                                            />
                                        </div>




                                    </div>
                                </div>

                                <div style={{ marginTop: '3rem' }}>

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
                                                        <TableCell align="center">Item Name</TableCell>
                                                        <TableCell align="center">Department Code</TableCell>
                                                        <TableCell align="center">Department Name</TableCell>
                                                        <TableCell>UOM</TableCell>
                                                        <TableCell align="center">Order Quantity</TableCell>
                                                        {/* <TableCell align="center">Accepted Quantity</TableCell> */}
                                                        {/* <TableCell align="center">Return Quantity</TableCell> */}
                                                        <TableCell align="center">Remark</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {items.map((item, idx) => (
                                                        <TableRow key={idx}>

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

                                                            <TableCell align="center">
                                                                <CustomTableInput
                                                                    required
                                                                    type="text"
                                                                    disabled
                                                                    value={item.departmentCode}
                                                                    onChange={(e) => handleInputChange(idx, 'departmentCode', e.target.value)}
                                                                />

                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <CustomTableInput
                                                                    required
                                                                    type="text"
                                                                    disabled
                                                                    value={item.departmentName}
                                                                    onChange={(e) => handleInputChange(idx, 'departmentName', e.target.value)}
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
                                                                    value={item.orderQuantity}
                                                                    onChange={(e) => handleInputChange(idx, 'orderQuantity', e.target.value)}
                                                                />

                                                            </TableCell>

                                                            {/* <TableCell align="center">
                                                                <CustomTableInput
                                                                    required
                                                                    value={item.acceptedQuantity}
                                                                    onChange={(e) => handleInputChange(idx, 'acceptedQuantity', e.target.value)}
                                                                />
                                                            </TableCell> */}

                                                            {/* <TableCell align="center">
                                                                <CustomTableInput
                                                                    required
                                                                    value={item.returnQuantity}
                                                                    disabled
                                                                // onChange={(e) => handleInputChange(idx, 'returnQuantity', e.target.value)}
                                                                />
                                                            </TableCell> */}

                                                            <TableCell align="center">
                                                                <CustomTableInput
                                                                    value={item.remark}
                                                                    onChange={(e) => handleInputChange(idx, 'remark', e.target.value)}
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

                                                    {/* <TotalAmountRow totalAmount={totalAmount} /> */}

                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </div>
                                </div>
                                <div className="save-div-btn" style={{ marginTop: '7%' }}>
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
                                            'Submit'
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleClose}
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

export default GateEntry