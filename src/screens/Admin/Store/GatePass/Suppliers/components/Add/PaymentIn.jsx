import React, { useState, useEffect } from 'react'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import CloseIcon from '@mui/icons-material/Close';
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextareaAutosize from '@mui/material/TextareaAutosize'

import Swal from 'sweetalert2'
import { serverInstance } from '../../../../../../../API/ServerInstance'



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


const PaymentIn = ({ paymentShow, paymentItem, onClose }) => {


    const [show, setShow] = useState(paymentShow)
    const [showloader, setshowloader] = useState(false);
    const [PNO, setPNo] = useState('')

    const [supCode, setSupCode] = useState('')
    const [supName, setSupName] = useState('')
    const [deptCode, setDeptCode] = useState('')
    const [deptName, setDeptName] = useState('')
    const [paymentType, setPaymentType] = useState('')
    const [paymentTypeList, setPaymentTypeList] = useState([])
    const [paymentMode, setPaymentMode] = useState('')
    const [paymentModeList, setPaymentModeList] = useState([])
    const [amount, setAmount] = useState('')
    const [paymentDate, setPaymentDate] = useState('')



    const [next, setNext] = useState(false)


    const handleClose = () => {
        setShow(false);
        setNext(false);
        onClose();
    };

    const getPaymentMode = async () => {

        try {
            const res = await serverInstance('admin/get-paymentMode', 'get')

            if (res.status) {
                setPaymentModeList(res.data)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const getPaymentType = async () => {

        try {
            const res = await serverInstance('admin/get-paymentType', 'get')

            if (res.status) {
                setPaymentTypeList(res.data)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {


            const data = {
                purchaseOrderNo: PNO,
                supplierName: supName,
                supplierCode: supCode,
                departmentCode: deptCode,
                departmentName: deptName,
                paymentType: paymentType,
                paymentMode: paymentMode,
                paymentAmount: amount,
                paymentDate: paymentDate
            }

            const res = await serverInstance('/store/add-paymentIn', 'post', data)

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

    useEffect(() => {


        if (paymentItem) {
            setPNo(paymentItem.purchaseOrderNo)
            setSupName(paymentItem.supplierName)
            setSupCode(paymentItem.supplierCode)
            setDeptCode(paymentItem.gateEntryList[0].departmentCode)
            setDeptName(paymentItem.gateEntryList[0].departmentName)
        }
    })

    useEffect(() => {
        getPaymentType();
        getPaymentMode();
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
                                        <h2 clssName="add_text_only">Payment In</h2>

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
                                                <label htmlFor="purchaseOrderNo">Purchase Order No.</label>
                                                <input
                                                    type="text"
                                                    id="supType"
                                                    required
                                                    name="supType"
                                                    placeholder="Enter Purchase Order No."
                                                    value={PNO}
                                                    onChange={(e) => setPNo(e.target.value)}
                                                />
                                            </div>


                                            <div className="inner-input-divadd">


                                                <label htmlFor="deptName">Department Name</label>
                                                <input
                                                    id="deptName"
                                                    type="text"
                                                    required
                                                    placeholder='Enter Department Name '
                                                    value={deptName}
                                                    onChange={(e) => setDeptName(e.target.value)}
                                                />

                                            </div>
                                            <div className="inner-input-divadd">
                                                <label htmlFor="City">Payment Date</label>
                                                <input
                                                    id="city"
                                                    type="date"
                                                    required
                                                    name="voucherDate"
                                                    value={paymentDate}
                                                    onChange={(e) => setPaymentDate(e.target.value)}
                                                />

                                            </div>



                                        </div>

                                        <div className="main-input-div2">
                                            <div className="inner-input-divadd">
                                                <label htmlFor="pincode">Supplier Name</label>
                                                <input
                                                    id="pincode"
                                                    text="text"
                                                    required
                                                    placeholder='Enter Supplier Name'
                                                    value={supName}
                                                    onChange={(e) => setSupName(e.target.value)}
                                                />
                                            </div>


                                            <div className="inner-input-divadd">
                                                <label htmlFor="supplierCode">Payment Type</label>
                                                <Select
                                                    required
                                                    sx={{
                                                        width: '95%',
                                                        height: '2rem',

                                                        fontSize: 14,
                                                        '& .MuiSelect-select': {
                                                            padding: '1px',
                                                        },
                                                    }}
                                                    value={paymentType}
                                                    onChange={(e) => setPaymentType(e.target.value)}
                                                    displayEmpty
                                                >
                                                    <MenuItem value="" disabled>
                                                        Select Payment Type
                                                    </MenuItem>

                                                    {paymentTypeList && paymentTypeList?.map((item, index) => {
                                                        return (
                                                            <MenuItem
                                                                sx={{
                                                                    fontSize: 14,
                                                                }}
                                                                key={item.id}
                                                                value={item?.paymentTypeName}

                                                            >
                                                                {item?.paymentTypeName}
                                                            </MenuItem>
                                                        )
                                                    })}

                                                </Select>
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
                                                <label htmlFor="Company Location">Payment Mode</label>
                                                <Select
                                                    required
                                                    sx={{
                                                        width: '95%',
                                                        height: '2rem',

                                                        fontSize: 14,
                                                        '& .MuiSelect-select': {
                                                            padding: '1px',
                                                        },
                                                    }}
                                                    value={paymentMode}
                                                    onChange={(e) => setPaymentMode(e.target.value)}
                                                    displayEmpty
                                                >
                                                    <MenuItem value="" disabled>
                                                        Select Payment Mode
                                                    </MenuItem>

                                                    {paymentModeList && paymentModeList?.map((item, index) => {
                                                        return (
                                                            <MenuItem
                                                                sx={{
                                                                    fontSize: 14,
                                                                }}
                                                                key={item.id}
                                                                value={item?.paymentMode}

                                                            >
                                                                {item?.paymentMode}
                                                            </MenuItem>
                                                        )
                                                    })}

                                                </Select>
                                            </div>
                                        </div>

                                        <div className="main-input-div3">
                                            <div className="inner-input-divadd">


                                                <label htmlFor="City">Department Code</label>
                                                <input
                                                    id="city"
                                                    type="text"
                                                    required
                                                    name="voucherDate"
                                                    placeholder='Enter Department Code'
                                                    value={deptCode}
                                                    onChange={(e) => setDeptCode(e.target.value)}
                                                />

                                            </div>

                                            <div className="inner-input-divadd">
                                                <label htmlFor="supplierCode">Payment Amount*</label>
                                                <input
                                                    text="text"
                                                    id="supCode"
                                                    required
                                                    value={amount}
                                                    onChange={(e) => setAmount(e.target.value)}
                                                    placeholder="Enter Payment Amount"

                                                />
                                            </div>
                                        </div>


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

export default PaymentIn