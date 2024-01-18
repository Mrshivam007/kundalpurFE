import React, { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { ReactTransliterate } from 'react-transliterate';
import { serverInstance } from '../../../../../../../../API/ServerInstance';
import axios from "axios";
import Swal from 'sweetalert2';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

import InputBase from '@mui/material/InputBase';

import { backendApiUrl } from '../../../../../../../../config/config';

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

const Add = ({ addLeaveCallback }) => {

  const custominput = {
    border: '1px solid #B8B8B8',
    marginTop: '0.3rem',
    width: '18rem',
    height: '2rem',
    borderRadius: '8px',
    fontSize: '15px',
    paddingLeft: '0.5rem',
    // marginBottom: '0.5rem',
    color: 'gray',
  };



  const [showloader, setshowloader] = useState(false);

  const [engName, setEngName] = useState('')
  const [empName, setEmpName] = useState('')
  const [hiName, setHiName] = useState('')
  const [EID, setEID] = useState('')
  const [aadharNo, setAadharNo] = useState('')
  const [contactNo, setContactNo] = useState('')
  const [address, setAddress] = useState('')
  const [salary, setSalary] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')

  const [designation, setDesignation] = useState('')
  const [designationList, setDesignationList] = useState([])

  const [email, setEmail] = useState('')

  const [joinDate, setJoinDate] = useState('')

  const [terminationDate, setTerminationDate] = useState('')

  const [empPhoto, setEmpPhoto] = useState('')
  const [bankBranch, setBankBranch] = useState('')
  const [bankAddress, setBankAddress] = useState('')
  const [bankIfsc, setBankIfsc] = useState('')
  const [accNumber, setAccNumber] = useState('')
  const [accHolderName, setAccHolderName] = useState('')

  const [empStatus, setEmpStatus] = useState('')
  const [empStatusList, setEmpStatusList] = useState('')

  const [dept, setDept] = useState('')
  const [deptList, setDeptList] = useState('')

  const [emplType, setEmplType] = useState('')
  const [emplTypeList, setEmplTypeList] = useState('')

  const [bankName, setbankName] = useState('')
  const [bankNameList, setBankNameList] = useState('')

  const [show, setShow] = useState(false);

  const [step, setStep] = useState(1)

  const [lang, setLang] = useState(false)

  const [next, setNext] = useState(false)


  const handleBack = () => {
    setStep(step - 1)

  }

  const handleClose = () => {
    setShow(false);
    setNext(false);
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2)
  }

  const handleShow = () => {
    setStep(1);
    setShow(true);
    setNext(false);
  };




  const [open, setOpen] = useState(false)


  const resetForm = () => {
    setEmpName('');
    setHiName('');
    setEID('');
    setAadharNo('');
    setContactNo('');
    setEmpStatus('');
    setAddress('');
    setTerminationDate('');
    setCity('');
    setState('');
    setDesignation('');
    setSalary('');
    setEmail('');
    setDept('');
    setJoinDate('');
    setEmplType('');
    setbankName('');
    setBankBranch('');
    setBankIfsc('');
    setAccNumber('');
    setAccHolderName('');
  };



  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setshowloader(true);

      const data = {
        employeeName: empName,
        // hi_name: hiName,
        employeeID: EID,
        AadharNo: aadharNo,
        ContactNo: contactNo,
        employeeStatus: empStatus,
        address: address,
        ...(empStatus === "De-Active" && { deactiveDate: terminationDate }),
        city: city,
        state: state,
        designation: designation,
        employeeSalary: salary,
        Email: email,
        department: dept,
        joiningDate: joinDate,
        employeeType: emplType,
        BankName: bankName,
        BankBranch: bankBranch,
        IFSC_Code: bankIfsc,
        AccountNo: accNumber,
        AccountHolderName: accHolderName,
        // employeePhoto: empPhoto,
      };

      const formData = new FormData();

      for (const key in data) {
        formData.append(key, data[key]);
      }


      const res = await axios.post(`${backendApiUrl}hr/add-employee`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });



      if (res.data.status) {
        console.log(res.data.msg);
        setOpen(false);
        setshowloader(false);
        Swal.fire('Great!', res.data.msg, 'success');
        addLeaveCallback();
        handleClose();
        resetForm();
      } else {
        console.log(res.data.message);
        setOpen(false);
        setshowloader(false);
        Swal.fire('Error', res.data.msg, 'error');
      }
    } catch (error) {
      console.log('catch', error.message);
      Swal.fire('Error!', error, 'error');
    }
  };



  const getEmployeeStatus = () => {
    try {
      serverInstance('admin/get-employeeStatus', 'get').then((res) => {
        if (res.status) {
          setEmpStatusList(res.data);

        } else {
          Swal.fire('Error', 'something went  wrong', 'error');
        }
      });
    } catch (err) {
      console.log(err)
    }
  };

  const getDepartment = () => {
    serverInstance('admin/get-department', 'get').then((res) => {
      if (res.status) {
        setDeptList(res.data);

      } else {
        Swal.fire('Error', 'something went  wrong', 'error');
      }
    });
  };

  const getEmployeeType = () => {
    serverInstance('admin/get-employeeType', 'get').then((res) => {
      if (res.status) {
        setEmplTypeList(res.data);
      } else {
        Swal.fire('Error', 'something went wrong', 'error')
      }
    });
  }

  const getDesignation = () => {
    serverInstance('admin/get-designation', 'get').then((res) => {

      if (res.status) {
        setDesignationList(res.data)
      } else {
        Swal.fire('Error', 'Something went wrong', 'Error')
      }
    })
  }

  const getBankName = () => {
    serverInstance('admin/get-bankName', 'get').then((res) => {
      if (res.status) {
        setBankNameList(res.data)
      } else {
        Swal.fire('Error', 'something went wrong', 'error')
      }
    });
  }




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

  useEffect(() => {
    getEmployeeStatus();
    getDepartment();
    getEmployeeType();
    getBankName();
    getDesignation();
  }, [])



  return (
    <div className='mainContainer' style={{}}>


      <button id="srcbtn" onClick={handleShow} style={{ width: '10rem' }}>
        +Add
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
                  <form onSubmit={handleNext} enctype="multipart/form-data">
                    <div className="add-div-close-div">
                      <h2 clssName="add_text_only">Add New Employee</h2>


                      <CloseIcon onClick={() => handleClose()} />

                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>



                      <h3 clssName="add_text_only">Employee Details</h3>
                      <Typography variant="body2" color="primary" align="right" style={{ padding: '1rem' }}>
                        {currDate} / {currTime}
                      </Typography>

                    </div>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        my: 2,
                      }}
                    >
                      <Typography variant="body1">Change language:</Typography>

                      <Button
                        variant={lang ? 'outlined' : 'contained'}
                        sx={{
                          borderColor: '#C8C8C8',
                          fontSize: 12,
                          minWidth: 100,
                          padding: 0.5,
                          color: lang ? '#656565' : '#fff',

                        }}
                        onClick={() => setLang(false)}
                      >
                        Hindi
                      </Button>
                      <Button
                        onClick={() => setLang(true)}
                        variant={lang ? 'contained' : 'outlined'}
                        sx={{
                          borderColor: '#C8C8C8',
                          fontSize: 12,
                          minWidth: 100,
                          padding: 0.5,
                          color: lang ? '#fff' : '#656565',
                        }}
                      >
                        English
                      </Button>
                    </Box>
                    <div className="flex_div_main_add_user">

                      <div className="main-input-div1">
                        <div className="inner-input-divadd">
                          <label >Employee ID*</label>
                          <input

                            id="EID"
                            required

                            placeholder="Enter Employee ID"
                            value={EID}
                            onChange={(e) => setEID(e.target.value)}
                          />

                        </div>

                        <div className="inner-input-divadd">
                          <label >Address*</label>
                          <input

                            id="address"
                            required
                            placeholder="Enter Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />

                        </div>

                        <div className="inner-input-divadd">
                          <label >Designation*</label>
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
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            displayEmpty
                          >
                            <MenuItem disabled value="">Select Designation</MenuItem>

                            {designationList && designationList?.map((item, index) => {
                              return (
                                <MenuItem
                                  sx={{
                                    fontSize: 14,
                                  }}
                                  key={item.id}
                                  value={item?.hi_designation}

                                >
                                  {item?.hi_designation}



                                </MenuItem>
                              )
                            })}

                          </Select>

                        </div>


                        <div className="inner-input-divadd">
                          <label >Employee Status*</label>
                          <Select
                            required
                            sx={{
                              width: '18rem',
                              height: '2rem',
                              borderRadius: '0.5rem',
                              marginTop: '-0.3rem',
                              fontSize: 14,
                              '& .MuiSelect-select': {
                                padding: '1px',
                              },
                            }}

                            style={{ paddingLeft: '1rem' }}
                            value={empStatus}
                            onChange={(e) => setEmpStatus(e.target.value)}
                            displayEmpty
                          >
                            <MenuItem value="" disabled>Select Employee Status</MenuItem>
                            {empStatusList &&
                              empStatusList?.map((item, idx) => {
                                return (

                                  <MenuItem
                                    sx={{
                                      fontSize: 14,
                                    }}
                                    key={item.id}
                                    value={item?.employeeStatus}
                                    onClick={() => {
                                      {


                                      }
                                    }}
                                  >
                                    {item?.employeeStatus}


                                  </MenuItem>
                                );
                              })}


                          </Select>

                        </div>
                      </div>

                      <div className="main-input-div2">
                        <div className="inner-input-divadd">
                          <label >Contact No.*</label>
                          <input

                            type="text"
                            required
                            placeholder='Enter Contact No.'
                            value={contactNo}
                            onChange={(e) => setContactNo(e.target.value)}
                          />

                        </div>

                        <div className="inner-input-divadd">
                          <label >City</label>
                          <input

                            type="text"

                            placeholder='Enter City'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                          />

                        </div>

                        <div className="inner-input-divadd">
                          <label >Department*</label>
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
                            value={dept}
                            onChange={(e) => setDept(e.target.value)}
                            displayEmpty
                          >
                            <MenuItem disabled value="">Select Department</MenuItem>

                            {deptList && deptList?.map((item, index) => {
                              return (
                                <MenuItem
                                  sx={{
                                    fontSize: 14,
                                  }}
                                  key={item.id}
                                  value={item?.departmentName_hi}

                                >
                                  {item?.departmentName_hi}



                                </MenuItem>
                              )
                            })}

                          </Select>
                        </div>

                        <div className="inner-input-divadd" style={{ marginTop: '0.5rem' }}>
                          <label >Joining Date*</label>
                          <input

                            type="date"
                            required

                            value={joinDate}
                            onChange={(e) => setJoinDate(e.target.value)}
                          />
                        </div>

                      </div>

                      <div className="main-input-div3">

                        {lang ? (

                          <div className="inner-input-divadd">
                            <label >Employee Name* (English)</label>
                            <input
                              type="text"
                              id="Name"
                              required
                              name="Name"
                              placeholder="Enter Employee Name"
                              value={empName}


                              onChange={(e) => setEmpName(e.target.value)}
                            />

                          </div>
                        ) : (<div className="inner-input-div2">
                          <label
                            style={{ marginBottom: '0.3rem', marginTop: '1rem' }}
                            htmlFor="categoryname"
                          >
                            Enter Employee Name* (Hindi)
                          </label>
                          <ReactTransliterate
                            placeholder="Enter Employee Name "
                            style={custominput}
                            id="full-name"
                            required
                            value={empName}
                            onChangeText={(empName) => {
                              setEmpName(empName);
                            }}
                            onChange={(e) => setEmpName(e.target.value)}
                            lang="hi"
                          />
                        </div>)}



                        <div className="inner-input-divadd">
                          <label >State</label>
                          <input

                            type="text"

                            placeholder='Enter State'
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                          />

                        </div>


                        <div className="inner-input-divadd">
                          <label >Employee Salary*</label>
                          <input
                            id="salary"
                            type="text"
                            required
                            name="salary"
                            placeholder='Enter Employee Salary'
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                          />


                        </div>

                        <div className="inner-input-divadd" style={{ marginTop: '0.5rem' }}>
                          <label >De-Active Date</label>
                          <input
                            type="date"
                            placeholder='Enter Termination Date'
                            value={terminationDate}
                            onChange={(e) => setTerminationDate(e.target.value)}
                            disabled={empStatus === 'Active'}
                          />
                        </div>

                      </div>

                      <div className="main-input-div4">
                        <div className="inner-input-divadd">
                          <label >Email ID*</label>
                          <input

                            type="email"

                            placeholder='Enter Email ID'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>

                        <div className="inner-input-divadd">
                          <label >Aadhar No.*</label>
                          <input
                            id="payAmt"
                            type="text"
                            required
                            name="payAmt"
                            placeholder='Aadhar No.'
                            value={aadharNo}
                            onChange={(e) => setAadharNo(e.target.value)}
                          />


                        </div>



                        <div className="inner-input-divadd">
                          <label>Employee Type*</label>
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
                            value={emplType}
                            onChange={(e) => setEmplType(e.target.value)}
                            displayEmpty
                          >
                            <MenuItem value="" disabled>Select Employee Type</MenuItem>

                            {emplTypeList && emplTypeList?.map((item, index) => {
                              return (
                                <MenuItem
                                  sx={{
                                    fontSize: 14,
                                  }}
                                  key={item.id}
                                  value={item?.employeeType_hi}
                                  onClick={() => {
                                    {


                                    }
                                  }}
                                >
                                  {item?.employeeType_hi}


                                </MenuItem>
                              )
                            })}


                          </Select>
                        </div>



                        {/* <div className="inner-input-divadd">
                          <label >Upload Employee Photo*</label>
                          <CustomInput
                          
                            type="file"
                            accept="image/*"
                           
                            placeholder="Bank Name"
                            onChange={(e) => {
                              setEmpPhoto(e.target.files[0]);
                              console.log(e.target.files[0]);
                            }}
                          />
                          <input
                            accept="image/*"
                            type="file"
                            name="employeePhoto"
                            onChange={(e) => {
                              setEmpPhoto(e.target.files[0]);
                              console.log(e.target.files[0]);
                            }}
                          />

                        </div> */}



                      </div>
                    </div>

                    <div className="save-div-btn">
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
                          'Next'
                        )}
                      </button>
                      <button
                        onClick={() => handleClose()}
                        className="save-div-btn-btn-cancel"
                        type="button"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )

                :


                (

                  <form onSubmit={handlesubmit} enctype="multipart/form-data">
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




                    <div className="flex_div_main_add_user" style={{ marginTop: '-1%' }}>




                      <div className="main-input-div2">
                        <div className="inner-input-divadd">
                          <label htmlFor="Bank Name">Bank Name*</label>
                          <Select
                            required
                            sx={{
                              width: '95%',
                              height: '2rem',
                              borderRadius: '0.5rem',
                              fontSize: 14,
                              '& .MuiSelect-select': {
                                padding: '1px',
                              },
                            }}
                            value={bankName}
                            onChange={(e) => setbankName(e.target.value)}
                            displayEmpty
                          >
                            <MenuItem value="" disabled> Select Bank Name</MenuItem>
                            {
                              bankNameList && bankNameList?.map((item, index) => {
                                return (
                                  <MenuItem
                                    sx={{ fontSize: 14 }}
                                    key={item.id}
                                    value={item?.bankName}
                                  >
                                    {item?.bankName}
                                  </MenuItem>
                                )
                              })
                            }


                          </Select>
                        </div>

                        <div className="inner-input-divadd">
                          <label htmlFor="IFSC Code">Bank IFSC Code</label>
                          <input

                            type="text"
                            required

                            placeholder="Enter IFSC Code"
                            value={bankIfsc}
                            onChange={(e) => setBankIfsc(e.target.value)}
                          />
                        </div>


                      </div>
                      <div className="main-input-div2">
                        <div className="inner-input-divadd">
                          <label htmlFor="Bank Branch">Bank Branch</label>
                          <input
                            type="text"
                            required
                            placeholder="Enter Bank Branch"
                            value={bankBranch}
                            onChange={(e) => setBankBranch(e.target.value)}
                          />
                        </div>

                        <div className="inner-input-divadd">
                          <label htmlFor="Account Number">Account Number</label>
                          <input
                            type="text"
                            required
                            placeholder="Enter Account Number"
                            value={accNumber}
                            onChange={(e) => setAccNumber(e.target.value)}
                          />
                        </div>


                      </div>
                      <div className="main-input-div2">


                        <div className="inner-input-divadd">
                          <label htmlFor="Account Holder's Name">Account Holder's Name</label>
                          <input

                            type="text"
                            required

                            placeholder="Enter Account Holder's Name"
                            value={accHolderName}
                            onChange={(e) => setAccHolderName(e.target.value)}
                          />
                        </div>


                      </div>
                    </div>



                    <div className="save-div-btn" style={{ marginTop: '5%' }}>
                      <button className="save-div-btn-btn"
                        type='submit'

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