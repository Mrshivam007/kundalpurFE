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

import { CustomTableInput } from '../common/';
import { serverInstance } from '../../../../../../../API/ServerInstance'


const GateEntry = ({ open, onClose, GEData }) => {


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
    const [supName , setSupName] = useState('')
    const [supCode , setSupCode] = useState('')
    const [show, setShow] = useState(open)
    const [showloader, setshowloader] = useState(false);
    const [step, setStep] = useState(1)
    const [newMember, setNewMember] = useState(false);
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

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;

        setItems((prevItems) =>
            prevItems.map((item, idx) =>
                idx === index ? { ...item, [name]: value } : item
            )
        );
    };

    const [next, setNext] = useState(false)



    const handleClose = () => {
        setShow(false);
        setItems([initialItem]);
        onClose();
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
                date: currDate,
                time: currTime,
                supplierName:supName,
                supplierCode:supCode,
                gateEntryNo: gateEntryNo,
                purchaseOrderNo: purchaseOrderNo,
                gateEntryList: items
            }

            const res = await serverInstance('store/add-gateEntry', 'post', data)
            if (res.status) {
                handleClose();
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

    useEffect(() => {
        setShow(open);

        setPurchaseOrderNo(GEData?.purchaseOrderNo)

        if(GEData){
            setSupName(GEData.supplierName)
            setSupCode(GEData?.supplierCode)
        }
        if (GEData && GEData.purchaseOrderList) {
            setItems(GEData.purchaseOrderList.map((item) => ({
                itemNo: item.itemNo,
                itemName: item.itemName,
                departmentCode: GEData?.departmentCode,
                departmentName: GEData?.departmentName,
                orderQuantity: item.quantity,
                UOM:item.UOM
            })));
        }
    }, [open]);


    return (

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
                                            <input
                                                type="text"
                                                value={currDate}

                                            />
                                        </div>


                                        <div className="inner-input-divadd">
                                            <label htmlFor="supplierCode">Purchase Order No. </label>
                                            <input
                                                type="text"
                                                id="supType"
                                                required
                                                name="supType"
                                                placeholder="Enter Purchase Order No."
                                                value={GEData?.purchaseOrderNo}

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
                                                required
                                                name="supType"
                                                placeholder="Enter Gate Entry No."
                                                value={supCode}
                                                onChange={(e) => setSupCode(e.target.value)}
                                            />
                                        </div>



                                    </div>

                                    <div className="main-input-div4">

                                        <div className="inner-input-divadd">
                                            <label htmlFor="supplierCode">Supplier Name</label>
                                            <input
                                                type="text"
                                                id="supType"
                                                required
                                                name="supType"
                                                placeholder="Enter Supplier Name"
                                                value={supName}
                                                onChange={(e) => setSupName(e.target.value)}
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
                                        Items:

                                        {/* <IconButton aria-label="add" size="small" onClick={addItem}>

                            <AddBoxIcon color="primary" />
                        </IconButton> */}
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
                                                        <TableCell style={{ width: '10rem' }}>
                                                            Item No.
                                                        </TableCell>
                                                        <TableCell align="center">Item Name</TableCell>
                                                        <TableCell align="center">Department Code</TableCell>
                                                        <TableCell align="center">Department Name</TableCell>
                                                        <TableCell>UOM</TableCell>
                                                        <TableCell align="center">Order Quantity</TableCell>
                                                        <TableCell align="center">Accepted Quantity</TableCell>
                                                        <TableCell align="center">Return Quantity</TableCell>
                                                        <TableCell align="center">Remark</TableCell>



                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {GEData && GEData?.purchaseOrderList.map((item, idx) => (
                                                        <TableRow key={idx}>
                                                            <TableCell>
                                                                <CustomTableInput
                                                                    disabled
                                                                    required
                                                                    type="text"
                                                                    value={item.itemNo}

                                                                />
                                                            </TableCell>

                                                            <TableCell>
                                                                <CustomTableInput
                                                                    disabled
                                                                    required
                                                                    type="text"
                                                                    value={item.itemName}

                                                                />
                                                            </TableCell>

                                                            <TableCell>
                                                                <CustomTableInput
                                                                    required
                                                                    type="text"
                                                                    disabled
                                                                    value={GEData?.departmentCode}

                                                                />
                                                            </TableCell>

                                                            <TableCell>
                                                                <CustomTableInput
                                                                    required
                                                                    type="text"
                                                                    value={GEData?.departmentName}
                                                                    disabled
                                                                />
                                                            </TableCell>

                                                            <TableCell>
                                                                <CustomTableInput
                                                                    required
                                                                    type="text"
                                                                    value={item?.UOM}
                                                                    disabled
                                                                />
                                                            </TableCell>


                                                            <TableCell>
                                                                <CustomTableInput
                                                                    disabled
                                                                    required
                                                                    type="text"
                                                                    value={item.quantity}


                                                                />
                                                            </TableCell>


                                                            <TableCell>
                                                                <CustomTableInput
                                                                    required
                                                                    type="text"
                                                                    name="acceptedQuantity"
                                                                    value={item.acceptedQuantity}
                                                                    onChange={(e) => handleInputChange(e, idx)}
                                                                />
                                                            </TableCell>
                                                            <TableCell>
                                                                <CustomTableInput
                                                                    required
                                                                    type="text"
                                                                    name="returnQuantity"
                                                                    value={item.returnQuantity}
                                                                    onChange={(e) => handleInputChange(e, idx)}
                                                                />
                                                            </TableCell>
                                                            <TableCell>
                                                                <CustomTableInput
                                                                    type="text"
                                                                    name="remark"
                                                                    value={item.remark}
                                                                    onChange={(e) => handleInputChange(e, idx)}
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