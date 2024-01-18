import React, { useState, useEffect } from 'react'

import Swal from 'sweetalert2'
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import Selec from '@mui/material/Select'
import Select from 'react-select'
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';

import { serverInstance } from '../../../../../../../../API/ServerInstance';

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

const AddLeaves = ({ addLeaveCallback }) => {


  const [open, setOpen] = useState(false)

  const [EID, setEID] = useState('')
  const [empName, setEmpName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [showloader, setshowloader] = useState(false)
  const [endDate, setEndDate] = useState('')
  const [remark, setRemark] = useState('')
  const [isData , setIsData] =useState('')
  const [dept, setDept] = useState('')
  const [deptList, setDeptList] = useState('')

  const [leaveTypeList, setLeaveTypeList] = useState('')
  const [leaveType, setLeaveType] = useState('')

  const [empList, setEmpList] = useState('')

  const resetForm = () => {
    setEID('');
    setEmpName('');
    setStartDate('');
    setEndDate('');
    setRemark('');
    setDept('');
    setLeaveType('');
  };



  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setshowloader(true);

      const data = {
        employeeId: EID,
        employeeName: empName,
        startDate: startDate,
        endDate: endDate,
        department: dept,
        leaveType: leaveType,
        remark: remark
      };

      serverInstance('hr/add-employeeLeave', 'post', data).then((res) => {
        if (res?.status) {
          console.log(res);
          setOpen(false);

          Swal.fire('Great!', res?.msg, 'success');

          handleClose()
          addLeaveCallback();
          resetForm();
        }
        if (res?.status === false) {
          setOpen(false);

          Swal.fire('Error!', res?.msg, 'error');
        }
      });
    } catch (error) {

      Swal.fire('Error!', error, 'error');
      handleClose()
    }
  };

  const getEmployee = () => {
    serverInstance('hr/get-employee', 'get').then((res) => {
      console.log(res.data)
      if (res.status) {
        setIsData(res.data)
      } else {
        console.log("error")
      }
    })
  }

  const getDepartment = () => {
    serverInstance('admin/get-department', 'get').then((res) => {
      if (res.status) {
        setDeptList(res.data);

      } else {
        Swal('Error', 'something went  wrong', 'error');
      }
    });
  };

  const handleEmployeeIDChange = (selectedOption) => {

    setEmpName(selectedOption.label);
    getEmployeeDetails(selectedOption.value);
  };


  const getEmployeeDetails = (selectedEID) => {
    const selectedEmployee = (isData && isData.find((emp) => emp.employeeID === selectedEID));
    console.log(selectedEmployee)
    if (selectedEmployee) {
      setEID(selectedEmployee.employeeID);
      setEmpName(selectedEmployee.employeeName);
      // setDes(selectedEmployee.designation);
      setDept(selectedEmployee.department);
    }
    //  else{
    //   handleClose();
    //   Swal.fire("Employee Doesn't Exist ")

    // }
  };

  const getLeaveType = () => {
    serverInstance('admin/get-leaveType', 'get').then((res) => {
      if (res.status) {
        setLeaveTypeList(res.data)
      } else {
        Swal('Error', 'something went  wrong', 'error');
      }
    })
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

    getDepartment();
    getLeaveType();
    getEmployee();

  }, []);

  return (
    <div className='mainContainer' style={{}}>


      <button id="srcbtn" onClick={handleOpen} style={{ width: '10rem' }}>
        + Add Employee Leaves
      </button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="add-div-close-div">
                  <h2 clssName="add_text_only">Create Employee Leaves</h2>
                  <CloseIcon onClick={() => handleClose()} />
                </div>

                <Typography variant="body2" color="primary" align="right" style={{ padding: '1rem' }}>
                  {currDate} / {currTime}
                </Typography>


                <div className="flex_div_main_add_user">

                  <div className="main-input-div1">

                    <div className="inner-input-divadd">
                      <label htmlFor="empID">Employee ID*</label>
                      <Select

                        styles={{ control: (base) => ({ ...base, width: '17.8rem', height: '1rem', borderRadius: '0.6rem' }) }}
                        options={(isData || []).map((employee) => ({
                          label: employee.employeeID,
                          value: employee.employeeID,
                        }))}
                        value={{ label: EID, value: EID }}
                        onChange={handleEmployeeIDChange}
                        placeholder="Select Employee Name"
                      />
                    </div>



                    <div className="inner-input-divadd">


                      <label htmlFor="Department">Select Department</label>
                      <Selec
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

                        <MenuItem value="" disabled>
                          Select Department
                        </MenuItem>

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

                      </Selec>
                    </div>

                  </div>
                  <div className="main-input-div1">

                    <div className="inner-input-divadd">
                      <label htmlFor="employeeName">Employee Name*</label>
                      <input
                        type="text"
                        placeholder='Enter Employee Name'
                        required
                        value={empName}
                        onChange={(e) => setEmpName(e.target.value)}
                      />
                    </div>

                    <div className="inner-input-divadd">


                      <label htmlFor="leaveType">Select Leave Type</label>
                      <Selec
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
                        value={leaveType}
                        onChange={(e) => setLeaveType(e.target.value)}
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          Select Leave Type
                        </MenuItem>



                        {leaveTypeList && leaveTypeList?.map((item, index) => {
                          return (
                            <MenuItem
                              sx={{
                                fontSize: 14,
                              }}
                              key={item.id}
                              value={item?.leaveType_hi}

                            >

                              {item?.leaveType_hi}


                            </MenuItem>
                          )
                        })}

                      </Selec>
                    </div>

                  </div>

                  <div className="main-input-div1">
                    <div className="inner-input-divadd">
                      <label htmlFor="startDate">Start Date</label>
                      <input
                        type="date"
                        id="startDate"
                        required
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}

                      />

                      <div className="inner-input-divadd">
                        <label htmlFor="employeeName">Remark</label>
                        <input
                          type="text"
                          placeholder='Enter Remark'
                          value={remark}
                          onChange={(e) => setRemark(e.target.value)}
                        />
                      </div>


                    </div>

                  </div>

                  <div className="main-input-div1">
                    <div className="inner-input-divadd">
                      <label htmlFor="endDate">End Date</label>
                      <input
                        type="date"
                        id="endDate"
                        required
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}

                      />
                    </div>

                  </div>
                </div>

                <div className="save-div-btn">
                  <button className="save-div-btn-btn" >

                    Add Leave

                  </button>
                  <button
                    onClick={() => handleClose()}
                    className="save-div-btn-btn-cancel"
                    type='button'
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

export default AddLeaves