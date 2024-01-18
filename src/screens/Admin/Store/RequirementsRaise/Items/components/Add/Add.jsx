import React, { useState } from 'react'
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
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddInventory from './AddInventory'

import { CustomInput, CustomInputLabel, CustomTableInput } from '../common';


import './Add.css'


const Add = ({
    themeColor,
    updateData,
    showUpdateBtn, }) => {


    function addDonationItem() {
        setDonationItems([
            ...donationItems,
            {
                type: '',
                amount: '',
                remark: '',
            },
        ]);
    }
    
    function removeDonationItem(item) {
        setDonationItems(
            donationItems.filter((donationItem) => donationItem !== item),
        );
    }

    function handleDonationItemUpdate(originalDonationItem, key, value) {
        setDonationItems(
            donationItems.map((donationItem) =>
                donationItem === originalDonationItem
                    ? {
                        ...donationItem,
                        [key]: value,
                    }
                    : donationItem,
            ),
        );
    }

    const addCashDonation = async (e) => {
        setshowloader(true);
        axios.defaults.headers.post[
            'Authorization'
        ] = `Bearer ${sessionStorage.getItem('token')}`;
        axios.defaults.headers.put[
            'Authorization'
        ] = `Bearer ${sessionStorage.getItem('token')}`;
        e.preventDefault();
        if (showUpdateBtn) {
            if (fullName && donationItems[0].amount && donationItems[0].type) {
                const res = await axios.put(`${backendApiUrl}user/edit-cash-donation`, {
                    id: updateData?.id,
                    name: fullName,
                    gender: newMember ? genderp1 : genderp,
                    phoneNo: mobileNo,
                    address: address,
                    new_member: newMember,
                    modeOfDonation: 2,
                    donation_date: donationDate,
                    donation_time: donationTime,
                    donation_item: donationItems,
                });

                if (res.data.status === true) {
                    handleClose();
                    setshowloader(false);
                } else {
                    Swal.fire('Error!', 'Somthing went wrong!!', 'error');
                }
            }
        } else {
            if (fullName && donationItems[0].amount && donationItems[0].type) {
                try {
                } catch (error) { }
                const res = await axios.post(`${backendApiUrl}user/add-elecDonation`, {
                    name: fullName,
                    gender: newMember ? genderp1 : genderp,
                    phoneNo: mobileNo,
                    address: address,
                    new_member: newMember,
                    modeOfDonation: 2,
                    donation_date: donationDate,
                    donation_time: donationTime,
                    donation_item: donationItems,
                });

                let totalamount = donationItems?.amount
                    ? donationItems?.amount
                    : donationItems &&
                    donationItems.reduce(
                        (n, { amount }) => parseFloat(n) + parseFloat(amount),
                        0,
                    );

                if (res.data.status === true) {
                    handleClose();
                    setshowloader(false);
                    navigation('/reciept', {
                        state: {
                            userdata: res.data.data.message.data,
                        },
                    });
                    console.log(res.data.data.message.data.ReceiptNo);
                    sendsms(totalamount, res.data.data.message.data.ReceiptNo);
                } else {
                    Swal.fire('Error!', 'Somthing went wrong!!', 'error');
                }
            }
        }
    };

    const sendsms = async (totalamount, ReceiptNo) => {
        try {
            axios.defaults.headers.post[
                'Authorization'
            ] = `Bearer ${sessionStorage.getItem('token')}`;
            const res = await axios.post(`${backendApiUrl}user/sms`, {
                mobile: mobileNo,
                amount: totalamount,
                rno: ReceiptNo,
            });
        } catch (error) { }
    }


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

    const custommStyleInputTable = {
        width: '100%',
        position: 'relative',

        border: '1px solid #C8C6D3',
        fontSize: 14,
        padding: 9.5,
    };


    const [show, setShow] = useState(false)
    const [showloader, setshowloader] = useState(false);
    const [step, setStep] = useState(1)
    const [newMember, setNewMember] = useState(false);
    const [show2, setShow2] = useState(false)
    const [showSecondModal, setShowSecondModal] = useState(false);
    const [departmentName, setDepartmentName] = useState('');

    const handleShowSecondModal = () => {
        setShowSecondModal(true);
    };

    const handleCloseSecondModal = () => {
        setShowSecondModal(false);
    };
    const [donationItems, setDonationItems] = useState([
        {
            type: '',
            amount: '',
            remark: '',
        },
    ]);


    const [next, setNext] = useState(false)


    const handleBack = () => {
        setStep(1)
    }

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
                                    <form>
                                        {/* <form onClick={handlesubmit}> */}
                                        <div className="add-div-close-div">

                                            <h2 clssName="add_text_only">Purchase Requisition</h2>


                                            <CloseIcon onClick={() => handleClose()} />

                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                                            <h3 clssName="add_text_only">Supplier Details</h3>
                                            <Typography variant="body2" color="primary" align="right" style={{ padding: '1rem' }}>
                                                {currDate} / {currTime}
                                            </Typography>

                                        </div>
                                        <div className="flex_div_main_add_user">

                                            <div className="main-input-div1">

                                                <div className="inner-input-divadd">
                                                    <label htmlFor="supplierName">Supplier Name*</label>
                                                    <Select
                                                        required
                                                        sx={{
                                                            width: '15vw',
                                                            height: '2.2rem',
                                                            borderRadius: '0.5rem',
                                                            fontSize: 14,
                                                            '& .MuiSelect-select': {
                                                                padding: '1px',
                                                            },
                                                        }}

                                                    >


                                                    </Select>
                                                </div>

                                                <div className="inner-input-divadd">
                                                    <label htmlFor="Tally Head">Department Code*</label>
                                                    <input
                                                        id="talHead"
                                                        text="text"
                                                        required
                                                        name="talHead"

                                                        onChange={(e) => setname(e.target.value)}
                                                    />
                                                </div>

                                                <div className="inner-input-divadd">
                                                    <label htmlFor="Company Location">State</label>
                                                    <input
                                                        id="payAmt"
                                                        text="text"
                                                        required
                                                        name="payAmt"


                                                    />


                                                </div>




                                            </div>

                                            <div className="main-input-div2">
                                                <div className="inner-input-divadd">
                                                    <label htmlFor="supplierCode">Supplier Code</label>
                                                    <input
                                                        type="text"
                                                        id="supType"
                                                        required
                                                        name="supType"
                                                        placeholder="Enter Supplier Code"
                                                        onChange={(e) => setphone(e.target.value)}
                                                    />
                                                </div>

                                                <div className="inner-input-divadd">
                                                    <label htmlFor="supplierCode">Purchase Order No.</label>
                                                    <input
                                                        type="text"
                                                        id="supType"
                                                        required
                                                        name="supType"
                                                        placeholder="Enter Purchase Order No."
                                                        onChange={(e) => setphone(e.target.value)}
                                                    />
                                                </div>



                                                <div className="inner-input-divadd">
                                                    <label htmlFor="City">City</label>
                                                    <input
                                                        id="city"
                                                        type="text"
                                                        required
                                                        name="voucherDate"

                                                    />

                                                </div>

                                            </div>

                                            <div className="main-input-div3">

                                                <div className="inner-input-divadd">
                                                    <label htmlFor="email">Department Name</label>
                                                    <input
                                                        text="text"
                                                        id="supName"
                                                        required
                                                        name="supName"
                                                        placeholder="Enter Department Name"

                                                    />

                                                </div>
                                                <div className="inner-input-divadd">
                                                    <label htmlFor="Tally Head">Contact No.*</label>
                                                    <input
                                                        id="talHead"
                                                        text="text"
                                                        required
                                                        name="talHead"

                                                        onChange={(e) => setname(e.target.value)}
                                                    />
                                                </div>

                                                <div className="inner-input-divadd">
                                                    <label htmlFor="deliveryDate">Delivery Date*</label>
                                                    <input
                                                        id="tranNumber"
                                                        type="date"
                                                        required
                                                        name="tranNumber"

                                                        onChange={(e) => setname(e.target.value)}
                                                    />
                                                </div>


                                            </div>



                                        </div>
                                        <div className="flex_div_main_add_user" >
                                            <TableContainer
                                                sx={{
                                                    mt: 4,
                                                    width: 1000
                                                }}
                                            >

                                                <Box
                                                    sx={{
                                                        paddingInline: '10px',
                                                        minWidth: 200,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    Add Items to purchase:

                                                    <IconButton aria-label="add" size="small" onClick={addDonationItem}>

                                                        <AddBoxIcon color="primary" />
                                                    </IconButton>
                                                </Box>


                                                <Table
                                                    stickyHeader
                                                    sx={{
                                                        width: 'max-content',
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
                                                        <TableRow>
                                                            <TableCell >
                                                                Item No.
                                                            </TableCell>

                                                            <TableCell align="center">Quantity</TableCell>
                                                            <TableCell align="center">Description</TableCell>
                                                            <TableCell align="center">Code</TableCell>
                                                            <TableCell align="center">Purpose</TableCell>

                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {donationItems.map((item, idx) => (
                                                            <TableRow key={idx}>
                                                                <TableCell
                                                                    style={{
                                                                        paddingInline: 0,
                                                                    }}
                                                                >
                                                                    <CustomTableInput
                                                                        required
                                                                        type="text"
                                                                        // value={item.amount}
                                                                        onChange={(e) =>
                                                                            handleDonationItemUpdate(
                                                                                item,
                                                                                'amount',
                                                                                e.target.value,
                                                                            )
                                                                        }
                                                                    />
                                                                </TableCell>



                                                                <TableCell>
                                                                    <CustomTableInput
                                                                        required
                                                                        type="text"
                                                                        // value={item.amount}
                                                                        onChange={(e) =>
                                                                            handleDonationItemUpdate(
                                                                                item,
                                                                                'amount',
                                                                                e.target.value,
                                                                            )
                                                                        }
                                                                    />
                                                                </TableCell>

                                                                <TableCell>
                                                                    <CustomTableInput
                                                                        required
                                                                        type="text"
                                                                        // value={item.amount}
                                                                        onChange={(e) =>
                                                                            handleDonationItemUpdate(
                                                                                item,
                                                                                'amount',
                                                                                e.target.value,
                                                                            )
                                                                        }
                                                                    />
                                                                </TableCell>

                                                                <TableCell>
                                                                    <CustomTableInput
                                                                        required
                                                                        type="text"
                                                                        // value={item.amount}
                                                                        onChange={(e) =>
                                                                            handleDonationItemUpdate(
                                                                                item,
                                                                                'amount',
                                                                                e.target.value,
                                                                            )
                                                                        }
                                                                    />
                                                                </TableCell>


                                                                <TableCell align="center">
                                                                    <CustomTableInput
                                                                        required
                                                                        type="text"
                                                                        // value={item.amount}
                                                                        onChange={(e) =>
                                                                            handleDonationItemUpdate(
                                                                                item,
                                                                                'amount',
                                                                                e.target.value,
                                                                            )
                                                                        }
                                                                    />

                                                                </TableCell>
                                                                {idx > 0 && (
                                                                    <IconButton
                                                                        sx={{
                                                                            padding: '4px',
                                                                        }}
                                                                        onClick={() => removeDonationItem(item)}
                                                                    >
                                                                        <RemoveCircleOutlineIcon
                                                                            color="primary"
                                                                            fontSize="small"
                                                                        />
                                                                    </IconButton>
                                                                )}
                                                            </TableRow>
                                                        ))}


                                                        {/* <TotalAmountRow donationItems={donationItems} /> */}
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
                                                    'Next'
                                                )}
                                            </button>
                                            <button
                                                onClick={() => handleClose()}
                                                className="save-div-btn-btn-cancel"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                ) : step === 2 ?


                                    (


                                        <form onSubmit={(e)=>e.preventDefault()}>
                                            {/* <form onSubmit={handlesubmit}> */}
                                            <div className="add-div-close-div">
                                                <h2 clssName="add_text_only">Department User </h2>

                                                <CloseIcon sx={{ marginLeft: '20rem' }} onClick={() => handleClose()} />

                                            </div>

                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>


                                                <h3 clssName="add_text_only">Department Approver</h3>

                                                <Typography variant="body2" color="primary" align="right" style={{ padding: '1rem' }}>
                                                    {currDate} / {currTime}
                                                </Typography>

                                            </div>


                                            <div className="flex_div_main_add_user" >
                                                <div className="main-input-div3" style={{ marginRight: '5rem' }}>

                                                    <div className="inner-input-divadd">
                                                        <label htmlFor="email">Department Name</label>
                                                        <input
                                                            type="text"
                                                            
                                                            required
                                                            
                                                            placeholder="Enter Department Name"
                                                            value={departmentName}
                                                            onChange={(e) => setDepartmentName(e.target.value)}
                                                        />

                                                    </div>

                                                </div>

                                            </div>

                                            <div className="save-div-btn" style={{ marginTop: '15%' }}>
                                                <button className="save-div-btn-btn"
                                                    style={{cursor:"pointer"}}
                                                    disabled={!departmentName}
                                                    onClick={() => setStep(step + 1)}
                                                    type="button"
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
                                                        'Next'
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


                                    ) : (
                                        <form onSubmit={(e)=>e.preventDefault()} >
                                            {/* <form onSubmit={handlesubmit}> */}
                                            <div className="add-div-close-div">
                                                <h2 clssName="add_text_only">Approve Report </h2>

                                                <CloseIcon sx={{ marginLeft: '20rem' }} onClick={() => handleClose()} />

                                            </div>

                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>


                                                <h3 clssName="add_text_only">Department Approver</h3>

                                                <Typography variant="body2" color="primary" align="right" style={{ padding: '1rem' }}>
                                                    {currDate} / {currTime}
                                                </Typography>

                                            </div>


                                            <div className="flex_div_main_add_user" >
                                                <div className="main-input-div3" style={{ marginRight: '5rem' }}>

                                                    {/* <div className="inner-input-divadd">
                                                        <label htmlFor="email">Approve Name</label>
                                                        <input
                                                            text="text"
                                                            id="supName"
                                                            required
                                                            name="supName"
                                                            placeholder="Enter Department Name"

                                                        />

                                                    </div> */}

                                                </div>

                                            </div>

                                            <div className="save-div-btn" style={{ marginTop: '15%' , gap:'2%'}}>
                                                <button className="save-div-btn-btn"
                                                // onClick={handlesubmit}

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
                                                    
                                                    className="save-div-btn-btn-cancel"
                                                >
                                                    Send Back
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>handleClose() }
                                                    className="save-div-btn-btn-cancel"
                                                >
                                                    Cancel
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