import React, { useState, useEffect } from 'react'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import CloseIcon from '@mui/icons-material/Close';
import Select from '@mui/material/Select'
import TextareaAutosize from '@mui/material/TextareaAutosize'




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

const PaymentIn = ({ open, onClose }) => {




    const [show, setShow] = useState(open)
    const [showloader, setshowloader] = useState(false);
 




    const [next, setNext] = useState(false)




    const handleClose = () => {
        setShow(false);
        setNext(false);
        onClose();
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
        setShow(open);
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


                            <form>
                                {/* <form onClick={handlesubmit}> */}
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


                                            <label htmlFor="deptName">Department Name</label>
                                            <input
                                                id="deptName"
                                                type="text"
                                                required

                                            />

                                        </div>
                                        <div className="inner-input-divadd">


                                            <label htmlFor="City">Payment Date</label>
                                            <input
                                                id="city"
                                                type="text"
                                                required
                                                name="voucherDate"
                                                value={currDate}
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

                                            />
                                        </div>


                                        <div className="inner-input-divadd">
                                            <label htmlFor="supplierCode">Payment Type</label>
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
                                    </div>

                                    <div className="main-input-div3">

                                        <div className="inner-input-divadd">
                                            <label htmlFor="supplierCode">Supplier Code*</label>
                                            <input
                                                text="text"
                                                id="supCode"
                                                required

                                                placeholder="Enter Supplier Code"

                                            />
                                        </div>

                                        <div className="inner-input-divadd">
                                            <label htmlFor="Company Location">Payment Mode</label>
                                            <input

                                                text="text"
                                                required

                                            />
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

                                            />

                                        </div>

                                        <div className="inner-input-divadd">
                                            <label htmlFor="supplierCode">Payment Amount*</label>
                                            <input
                                                text="text"
                                                id="supCode"
                                                required

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

export default PaymentIn