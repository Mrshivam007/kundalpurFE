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
    const [addedBy, setAddedBy] = useState('')
    const [supName, setSupName] = useState('')
    const [supCode, setSupCode] = useState('')
    const [quantity, setQuantity] = useState('')
    const [amount, setAmount] = useState('')
    const [dbitems, setdbItems] = useState([
        {
            MaterialCode: ' ',
            MaterialName: '',
            Quantity: '',
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


    const handleInputChange = (e, index) => {
        const { name, value } = e.target;

        setdbItems((prevItems) =>
            prevItems.map((item, idx) =>
                idx === index ? { ...item, [name]: value } : item
            )
        );
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

    console.log('inv', inventoryItem.gateEntryList[0])

    useEffect(() => {

        if (inventoryItem) {
            setDate(inventoryItem?.date)
            setTime(inventoryItem?.time)
            setPNo(inventoryItem?.purchaseOrderNo)
            setSupName(inventoryItem?.supplierName)
            setSupCode(inventoryItem?.supplierCode)
            setDeptCode(inventoryItem?.gateEntryList[0].departmentCode)
            setDeptName(inventoryItem?.gateEntryList[0].departmentName)
        }

        if (inventoryItem && inventoryItem?.gateEntryList) {
            setdbItems(inventoryItem?.gateEntryList.map((item) => ({
                MaterialCode: item?.itemNo,
                MaterialName: item?.itemName,
                Quantity: item?.acceptedQuantity,
                Amount: item?.total,
                UOM: item?.UOM

            })));
        }
    }, [])



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
                                        <h2 clssName="add_text_only">Send To Inventory</h2>

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

                                                        <TableCell style={{ width: '10%' }} align="center">Material Code</TableCell>
                                                        <TableCell style={{ width: '25%' }} align="center">Material Name</TableCell>
                                                        <TableCell style={{ width: '15%' }} align="center">Quantity</TableCell>
                                                        <TableCell>UOM</TableCell>
                                                        <TableCell align="center">Price</TableCell>



                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {inventoryItem && inventoryItem?.gateEntryList?.map((item, idx) => (
                                                        <TableRow key={idx}>
                                                            <TableCell
                                                                style={{
                                                                    paddingInline: 0,
                                                                }}
                                                            >
                                                                <CustomTableInput
                                                                    required
                                                                    type="text"
                                                                    value={item.itemNo}

                                                                />
                                                            </TableCell>



                                                            <TableCell>
                                                                <CustomTableInput
                                                                    required
                                                                    type="text"
                                                                    value={item.itemName}

                                                                />
                                                            </TableCell>

                                                            <TableCell>
                                                                <CustomTableInput
                                                                    required
                                                                    type="text"
                                                                    value={item.acceptedQuantity}

                                                                />
                                                            </TableCell>

                                                            <TableCell>
                                                                <CustomTableInput
                                                                    required
                                                                    type="text"
                                                                    value={item.UOM}

                                                                />
                                                            </TableCell>

                                                            <TableCell align="center">
                                                                <CustomTableInput
                                                                    required
                                                                    type="text"
                                                                    value={item.total}

                                                                />

                                                            </TableCell>

                                                            {/*                                                      

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