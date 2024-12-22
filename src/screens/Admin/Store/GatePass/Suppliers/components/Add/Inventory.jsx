import React, { useState, useEffect } from 'react'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import CloseIcon from '@mui/icons-material/Close';
import Select from '@mui/material/Select'
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextareaAutosize from '@mui/material/TextareaAutosize'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import Swal from 'sweetalert2'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import TotalAmountRow from '../../../../PurchaseOrder/Suppliers/components/common/TotalAmountRow'
import { CustomInput, CustomInputLabel, CustomTableInput } from '../../../../PurchaseOrder/Suppliers/components/common';
import { serverInstance } from '../../../../../../../API/ServerInstance'
import { useAsyncError } from 'react-router-dom'



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


const Inventory = ({ inventoryShow, inventoryItem, onClose }) => {


    const [show, setShow] = useState(inventoryShow)
    const [showloader, setshowloader] = useState(false);
    const [PNO, setPNo] = useState('')
    const [date, setDate] = useState('')
    const [remark, setRemark] = useState('')
    const [time, setTime] = useState('')
    const [materialCode, setMaterialCode] = useState('')
    const [materialName, setMaterialName] = useState('')
    const [deptName, setDeptName] = useState('')
    const [deptCode, setDeptCode] = useState('')
    const [challanNo, setChallanNo] = useState('')
    const [billNo, setBillNo] = useState('')
    const [addedBy, setAddedBy] = useState('')
    const [supName, setSupName] = useState('')
    const [supCode, setSupCode] = useState('')
    const [UOMList, setUOMList] = useState([])
    const [itemList, setItemList] = useState([])
    const [quantity, setQuantity] = useState('')
    const [amount, setAmount] = useState('')
    const [totalAmount, setTotalAmount] = useState(0);
    const [dbitems, setdbItems] = useState([
        {
            MaterialCode: ' ',
            MaterialName: '',
            Quantity: '',
            IssueQuantity: '0',
            Amount: '',
        },
    ]);



    const initialItem = {
        MaterialCode: ' ',
        MaterialName: '',
        Quantity: '',
        Amount: '',
    };

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


        // setTotalAmount(newTotalAmount);

        setdbItems(updatedItems);

    };


    const handleInputChange = async (idx, field, value) => {
        const updatedItems = [...dbitems];
        updatedItems[idx][field] = value;
        // setItems(updatedItems);

        if (field === 'MaterialName') {
            const selectedItem = itemList.find(item => item.item_name === value);

            if (selectedItem) {
                updatedItems[idx]['itemNo'] = selectedItem.id;
                updatedItems[idx]['MaterialCode'] = selectedItem.id;
                updatedItems[idx]['UOM'] = selectedItem.UOM || ''; // Set UOM if applicable
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
            console.log("selected item ", selectedItem);
        }

        
        const item = updatedItems[idx];
        const calculatedTotal = (item.Quantity * item.price) * (1 - item.discount / 100) * (1 + item.GST / 100);
        item.total = calculatedTotal;
        item.Amount = calculatedTotal;
        const newTotalAmount = updatedItems.reduce((sum, item) => sum + item.total, 0);
        setTotalAmount(newTotalAmount);

        setdbItems(updatedItems);
    };

    const [next, setNext] = useState(false)


    const handleClose = () => {
        setShow(false);
        setNext(false);
        onClose();
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {


            const data = {
                Date: date,
                Time: time,

                FromDepartmentCode: deptCode,
                FromDepartmentName: deptName,
                SupplierName: supName,
                SupplierCode: supCode,
                challanNo: challanNo,
                billNo: billNo,
                Remark: remark,
                inventory_list: dbitems
            }

            const res = await serverInstance('/store/add-inventory', 'post', data)

            if (res.status) {
                handleClose();
                Swal.fire('Great!', res?.msg, 'success')
            } if (res.status === false) {
                handleClose();
                Swal.fire('Error!', 'There might be some Error', 'error')
            }

        } catch (err) {
            console.log(err)
            Swal.fire('Error!', 'There might be some Error', 'error')
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

    const getUOM = async () => {
        try {
            const res = await serverInstance('admin/get-UOM', 'get')

            setUOMList(res.data)
            console.log(res.data)
        } catch (err) {
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

    console.log('inv', inventoryItem)

    useEffect(() => {
        if (inventoryItem) {
            setDate(inventoryItem?.date);
            setTime(inventoryItem?.time);
            setPNo(inventoryItem?.purchaseOrderNo);
            setSupName(inventoryItem?.supplierName);
            setSupCode(inventoryItem?.supplierCode);
            setBillNo(inventoryItem?.billNo);
            setChallanNo(inventoryItem?.challanNo);
            setDeptCode(inventoryItem?.gateEntryList[0]?.departmentCode);
            setDeptName(inventoryItem?.gateEntryList[0]?.departmentName);
        }
    
        if (inventoryItem?.gateEntryList) {
            const updatedItems = inventoryItem.gateEntryList.map((item) => {
                // Find the matching item from itemList based on itemName
                const matchedItem = itemList.find(
                    (listItem) => listItem.item_name === item.itemName
                );
    
                return {
                    MaterialCode: item?.itemNo,
                    MaterialName: item?.itemName,
                    Quantity: item?.acceptedQuantity,
                    IssueQuantity: null,
                    Amount: item?.total,
                    UOM: item?.UOM,
                    availableQuantity: matchedItem?.current_stock || '', // Get availableQuantity from matched item
                };
            });
    
            setdbItems(updatedItems);
        }
    }, [inventoryItem, itemList]); // Added itemList as a dependency
    

    useEffect(() => {
        getUOM();
        getItem();
    }, [])

    console.log("db items ", dbitems);

    return (
        <>
            <div>
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
                                        <h2 clssName="add_text_only">Purchase Register Entry</h2>

                                        <CloseIcon onClick={() => handleClose()} />

                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                                        <Typography variant="body2" color="primary" align="right" >
                                            {currDate} / {currTime}
                                        </Typography>

                                    </div>
                                    <div className="flex_div_main_add_user" >
                                        <div className="main-input-div1">

                                            <div className="inner-input-divadd">
                                                <label htmlFor="date">Date</label>
                                                <input
                                                    type="date"
                                                    id="date"
                                                    required
                                                    name="date"
                                                    placeholder="Enter Purchase Order No."
                                                    value={date}
                                                    onChange={(e) => setDate(e.target.value)}
                                                />
                                            </div>

                                            <div className="inner-input-divadd">


                                                <label htmlFor="deptCode">Department Code</label>
                                                <input
                                                    id="deptCode"
                                                    type="text"
                                                    required
                                                    name="deptCode"
                                                    placeholder='Enter Department Code'
                                                    value={deptCode}
                                                    onChange={(e) => setDeptCode(e.target.value)}
                                                />

                                            </div>



                                        </div>

                                        <div className="main-input-div2">

                                            <div className="inner-input-divadd">


                                                <label htmlFor="deptName">Time</label>
                                                <input
                                                    id="deptName"
                                                    type="time"
                                                    required
                                                    placeholder='Enter Time'
                                                    value={time}
                                                    onChange={(e) => setTime(e.target.value)}
                                                />

                                            </div>


                                            <div className="inner-input-divadd">
                                                <label htmlFor="deptName">Department Name</label>
                                                <input
                                                    text="text"
                                                    id="deptName"
                                                    required
                                                    value={deptName}
                                                    onChange={(e) => setDeptName(e.target.value)}
                                                    placeholder="Enter Department Name"

                                                />
                                            </div>
                                        </div>

                                        <div className="main-input-div3">



                                            <div className="inner-input-divadd">
                                                <label htmlFor="supplierCode">Supplier Code*</label>
                                                <input
                                                    text="text"
                                                    id="supCode"
                                                    required
                                                    value={supCode}
                                                    onChange={(e) => setSupCode(e.target.value)}
                                                    placeholder="Enter Supplier Code"

                                                />
                                            </div>
                                            <div className="inner-input-divadd">
                                                <label htmlFor="remark">Remark</label>
                                                <input

                                                    text="text"
                                                    required
                                                    value={remark}
                                                    placeholder='Enter Remark'
                                                    onChange={(e) => setRemark(e.target.value)}

                                                />
                                            </div>

                                        </div>

                                        <div className="main-input-div3">

                                            <div className="inner-input-divadd">
                                                <label htmlFor="Company Location">Supplier Name</label>
                                                <input

                                                    text="text"
                                                    required
                                                    value={supName}
                                                    onChange={(e) => setSupName(e.target.value)}

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
                                                        {/* <TableCell style={{ width: '15%' }}>
                                                        Item No. {" "}
                                                        <a href="#" onClick={() => setShowAddItem(true)}>Add Items</a>
                                                    </TableCell> */}
                                                        <TableCell align="center">Item Name</TableCell>
                                                        <TableCell align="center">UOM {" "}
                                                            <a href="#" onClick={() => setShowAddUMO(true)}>Add UOM</a></TableCell>
                                                        <TableCell align="center">Quantity</TableCell>
                                                        <TableCell align="center">Available Quantity</TableCell>
                                                        <TableCell align="center">Price (Rs.) </TableCell>
                                                        <TableCell align="center">Discount (%)</TableCell>
                                                        <TableCell align="center">GST (%)</TableCell>
                                                        <TableCell align="center">Total</TableCell>


                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {dbitems.map((item, idx) => (
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
                                                                    value={item.MaterialName || ''} // Bind MaterialName here
                                                                    onChange={(e) => handleInputChange(idx, 'MaterialName', e.target.value)}
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
                                                                    value={item.UOM || ''} // Bind UOM here
                                                                    onChange={(e) => handleInputChange(idx, 'UOM', e.target.value)}
                                                                    displayEmpty
                                                                >
                                                                    <MenuItem value="" disabled>Please select</MenuItem>
                                                                    {UOMList.map((uomOption) => (
                                                                        <MenuItem
                                                                            key={uomOption.id}
                                                                            value={uomOption.UOM}
                                                                            sx={{ fontSize: 14 }}
                                                                        >
                                                                            {uomOption.UOM}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </TableCell>

                                                            {/* Quantity */}
                                                            <TableCell align="center">
                                                                <CustomTableInput
                                                                    required
                                                                    type="text"
                                                                    value={item.Quantity || ''} // Bind Quantity here
                                                                    onChange={(e) => handleInputChange(idx, 'Quantity', e.target.value)}
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

        </>
    )
}

export default Inventory