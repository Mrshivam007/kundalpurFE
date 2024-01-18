import React, { useState } from 'react'
import { Box,Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import axios from "axios";
// import {
//   createExpenseOrder,
//   expenseOrderSelector,
//   fetchExpenseOrderList,
//   fetchExpenseOrderSearchList,
// } from "../../../../../../expense_order/reducers/ExpenseOrderSlice";

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

const Add = () => {

  const [file_1, setFile_1] = useState();
  /* Selectors */
  // const auth = useSelector(authSelector);
  // const transport = useSelector(transportSelector);
  const [showloader, setshowloader] = useState(false);
  const [email, setemail] = useState('');
  const [name, setname] = useState('')
  const [phone, setphone] = useState('');
  const [password, setpassword] = useState('');
  // const supplier = useSelector(supplierSelector);
  // const paymentMode = useSelector(paymentmodeSelector);
  // const tallyData = useSelector(tallySelector);
  // const department = useSelector(departmentSelector);
  const [inAction, setAction] = useState(false);
  const [expense, setExpense] = useState([]);
  const [suppliers, setSupplier] = useState([]);
  const [isLoad, setPlaceHolderLoader] = useState("");
  const [isLoads, setPlaceHolderLoaders] = useState("");
  // const stock = useSelector(stockSelector);
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showValue, setShowValue] = useState(false);
  const [locationData, setLocationData] = useState("");
  const [step, setStep] = useState(1)

  const [next, setNext] = useState(false)


  const handleBack = () => {
    setStep(1)
  }

  const handleClose = () => {
    setShow(false);
    setNext(false);
  };

  const handleNext = () => setNext(true)

  const handleShow = () => {
    setStep(1);
    setShow(true);
    setNext(false);
  };


    

  const [open, setOpen] = useState(false)

    const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setshowloader(true);
      const { data } = await axios.post(`${backendApiUrl}user/create-account`, {
        fullname: name,
        mobileno: phone,
        email: email,
        password: password,
      });
      if (data.status === true) {
        setshowloader(false);
        Swal.fire('Great!', 'User Added Successfully', 'success');
        handleClose();
        setemail('');
        setpassword('');
        setname('');
        setphone('');
      }
    } catch (error) {
      Swal.fire('Error!', error.response.data.message, 'error');
      handleClose();
    }
  };




  const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  

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
    <div className='mainContainer' style={{ }}>


      <button id="srcbtn" onClick={handleShow} style={{width:'10rem'}}>
        Gate Out
      </button>

     
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
                    <div className="add-div-close-div">
                      <h2 clssName="add_text_only">Gate Out Details</h2>
                      


                      <CloseIcon onClick={() => handleClose()} />

                    </div>
                    <Typography variant="body2" color="primary" align="right" style={{ padding: '1rem' }}>
                        {currDate} / {currTime}
                      </Typography>

                   
                    <div className="flex_div_main_add_user">

                      <div className="main-input-div1">

                        <div className="inner-input-divadd">
                          <label htmlFor="Company Location">Gate Out Date*</label>
                          <input
                            id="compLoc"
                            type="text"
                            disabled
                            value={currDate}
                            name="compLoc"
                            placeholder="Select Company Location"
                            onChange={(e) => setname(e.target.value)}
                          />
                        </div>
                        
                      </div>

                      <div className="main-input-div2">
                        <div className="inner-input-divadd">
                          <label htmlFor="Supplier Type">Gate Out Time*</label>
                          <input
                            type="text"
                            id="supType"
                            required
                            name="supType"
                            disabled
                            value={currTime}
                            placeholder=""
                            onChange={(e) => setphone(e.target.value)}
                          />
                        </div>

                      </div>
                      <div className="main-input-div2">
                        <div className="inner-input-divadd">
                          <label htmlFor="Supplier Type">Remark</label>
                          <input
                            type="text"
                            id="supType"
                            required
                            name="supType"
                            placeholder=""
                            onChange={(e) => setphone(e.target.value)}
                          />
                        </div>

                      </div>

        
                    </div>

                    <div className="save-div-btn">
                      <button className="save-div-btn-btn"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setStep(2)}
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
                ) 
                
                :


                (

                  <form onSubmit={handlesubmit}>
                    <div className="add-div-close-div">
                      <h2 clssName="add_text_only">Add New Employee</h2>

                      <CloseIcon onClick={() => handleClose()} />

                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>


                      <h3 clssName="add_text_only">Employee Account Details</h3>

                      <Typography variant="body2" color="primary" align="right" style={{ padding: '1rem' }}>
                        {currDate} / {currTime}
                      </Typography>

                    </div>

                 
                  
                   
                    <div className="flex_div_main_add_user" style={{marginTop:'-1%'}}>

                
                     

                      <div className="main-input-div2">
                        <div className="inner-input-divadd">
                          <label htmlFor="Bank Name">Bank Name*</label>
                          <input
                            id="compLoc"
                            type="text"
                            required
                            name="compLoc"
                            placeholder="Select Bank Name"
                            onChange={(e) => setname(e.target.value)}
                          />
                        </div>

                        <div className="inner-input-divadd">
                          <label htmlFor="IFSC Code">Bank IFSC Code</label>
                          <input
                            id="compLoc"
                            type="text"
                            required
                            name="compLoc"
                            placeholder="Enter IFSC Code"
                            onChange={(e) => setname(e.target.value)}
                          />
                        </div>


                      </div>
                      <div className="main-input-div2">
                        <div className="inner-input-divadd">
                          <label htmlFor="Bank Branch">Bank Branch</label>
                          <input
                            id="compLoc"
                            type="text"
                            required
                            name="compLoc"
                            placeholder="Enter Bank Branch"
                            onChange={(e) => setname(e.target.value)}
                          />
                        </div>

                        <div className="inner-input-divadd">
                          <label htmlFor="Account Number">Account Number</label>
                          <input
                            id="compLoc"
                            type="text"
                            required
                            name="compLoc"
                            placeholder="Enter Account Number"
                            onChange={(e) => setname(e.target.value)}
                          />
                        </div>


                      </div>
                      <div className="main-input-div2">
                        <div className="inner-input-divadd">
                          <label htmlFor="Bank Address">Bank Address</label>
                          <input
                            id="compLoc"
                            type="text"
                            required
                            name="compLoc"
                            placeholder="Enter Bank Address"
                            onChange={(e) => setname(e.target.value)}
                          />
                        </div>

                        <div className="inner-input-divadd">
                          <label htmlFor="Account Holder's Name">Account Holder's Name</label>
                          <input
                            id="compLoc"
                            type="text"
                            required
                            name="compLoc"
                            placeholder="Enter Account Holder's Name"
                            onChange={(e) => setname(e.target.value)}
                          />
                        </div>


                      </div>
                    </div>



                    <div className="save-div-btn" style={{marginTop:'5%'}}>
                      <button className="save-div-btn-btn"
                        onClick={handleNext}
                        
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
                        onClick={handleBack}
                        className="save-div-btn-btn-cancel"
                        type="button"
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