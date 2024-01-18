import React, { useState, useEffect } from 'react';
import InputBase from '@mui/material/InputBase';
import { Box, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { ReactTransliterate } from 'react-transliterate';
import { backendApiUrl } from '../../../../../../../../config/config';
import { serverInstance } from '../../../../../../../../API/ServerInstance';
import axios from 'axios';
import Swal from 'sweetalert2';
import CircularProgress from '@mui/material/CircularProgress';


import { styled } from '@mui/material/styles';
import { useStateManager } from 'react-select';

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

export const CustomInput = styled(InputBase)(({ theme }) => ({
  width: '37.2rem',
  fontFamily: 'Poppins',
  backgroundColor: '#fff',
  borderRadius: 6,
  '& .MuiInputBase-input': {
    border: '1px solid #B8B8B8',
    borderRadius: 6,
    width: '100%',
    fontSize: 15,
    padding: 8,
    paddingLeft: 12,
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:focus': {
      // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));
function UpdateEmployee({ setOpen, updatedata }) {
  const [lan, setlan] = useState(false);
  const [show, setShow] = useState(true);
  const [step, setStep] = useState(1)
  const [showloader, setshowloader] = useState(false);

  const [empName, setEmpName] = useState('')
  // const [engName, setEngName] = useState('')
  // const [hiName, setHiName] = useState('')
  const [EID, setEID] = useState('')
  const [aadharNo, setAadharNo] = useState('')
  const [contactNo, setContactNo] = useState('')
  const [address, setAddress] = useState('')
  const [salary, setSalary] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')

  const [lang, setLang] = useState('')
  const [terminationDate, setTerminationDate] = useState('')

  const [designation, setDesignation] = useState('')
  const [designationList, setDesignationList] = useState([])

  const [email, setEmail] = useState('')

  const [joinDate, setJoinDate] = useState('')

  const [empPhoto, setEmpPhoto] = useState('')
  const [bankBranch, setBankBranch] = useState('')
  const [bankAddress, setBankAddress] = useState('')
  const [bankIfsc, setBankIfsc] = useState('')
  const [accNumber, setAccNumber] = useState('')
  const [accHolderName, setAccHolderName] = useState('')

  const [empStatus, setEmpStatus] = useState('')
  const [empStatusList, setEmpStatusList] = useState([])

  const [dept, setDept] = useState('')
  const [deptList, setDeptList] = useState([])

  const [emplType, setEmplType] = useState('')
  const [emplTypeList, setEmplTypeList] = useState([])

  const [bankName, setBankName] = useState('')
  const [bankNameList, setBankNameList] = useState([])

  const handlesubmit = async (e) => {
    e.preventDefault()
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

        id: updatedata?.id
      };
      console.log('empPhot ' + updatedata?.employeePhoto)
      const formData = new FormData();

      for (const key in data) {
        formData.append(key, data[key]);
      }

      const res = await axios.put(`${backendApiUrl}hr/edit-employee`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });

      if (res.data.status) {
        setOpen(false);
        setshowloader(false);
        Swal.fire('Updated!', res?.msg, 'success');
      }
      if (res?.status === false) {
        setOpen(false);
        setshowloader(false);
        handleClose();
        Swal.fire('Error!', res?.msg, 'error');
      }

    } catch (error) {
      setOpen(false);
      Swal.fire('Error!', error, 'error');
    }
  };


  const getEmployeeStatus = () => {
    try {
      serverInstance('admin/get-employeeStatus', 'get').then((res) => {
        if (res.status) {
          setEmpStatusList(res.data);
          console.log(res.message)

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
        Swal.fire('setEmpPhoto(updatedata?.employeePhoto)Error', 'something went  wrong', 'error');
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



  const handleBack = () => {
    setStep(step - 1)

  }

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCloseModal = () => {
    setOpen(false);
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

    getDepartment();
    getBankName();
    getDesignation();
    getEmployeeStatus();
    getEmployeeType()


    if (updatedata) {
      // setEngName(updatedata?.en_name)
      // setHiName(updatedata?.hi_name)
      setEmpName(updatedata?.employeeName)
      setAadharNo(updatedata?.AadharNo)
      setEID(updatedata?.employeeID)
      setContactNo(updatedata?.ContactNo)
      setEmpStatus(updatedata?.employeeStatus)
      setAddress(updatedata?.address)
      setDesignation(updatedata?.designation)
      setCity(updatedata?.city)
      setTerminationDate(updatedata?.deactiveDate)
      setEmplType(updatedata?.employeeType)
      setState(updatedata?.state)
      setSalary(updatedata?.employeeSalary)
      setEmail(updatedata?.Email)
      setDept(updatedata?.department)
      setJoinDate(updatedata?.joiningDate)
      setBankName(updatedata?.BankName)
      setBankBranch(updatedata?.BankBranch)
      setBankIfsc(updatedata?.IFSC_Code)
      setAccNumber(updatedata?.AccountNo)
      setAccHolderName(updatedata?.AccountHolderName)
      setEmpPhoto(updatedata?.employeePhoto)

    }


  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          my: 2,
          ml: 2,
        }}
      >

      </Box>

      <div>

        {step === 1 ?


          (
            <form onSubmit={handleNext} enctype="multipart/form-data">
              <div className="add-div-close-div">


              </div>

              <Box

              >

                <Typography variant="body2" color="primary" align="right" style={{ padding: '1rem' }}>
                  {currDate} / {currTime}
                </Typography>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  my: 2,
                }}>
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
                      marginLeft:'1rem',
                      padding: 0.5,
                      color: lang ? '#fff' : '#656565',
                    }}
                  >
                    English
                  </Button>
                </div>

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
                      }}terminationDate
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

            <form onSubmit={handlesubmit}>
              <div className="add-div-close-div">


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
                      onChange={(e) => setBankName(e.target.value)}
                      displayEmpty
                    >
                      <MenuItem>Select Bank Name</MenuItem>
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
                    'Update'
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

    </>
  );
}

export default UpdateEmployee;
