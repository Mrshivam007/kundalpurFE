import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material';
import moment, { isDate } from 'moment';
import Modal from '@mui/material/Modal';
import Select from 'react-select'
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import Selec from '@mui/material/Select';
import { Typography, MenuItem } from '@mui/material';
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

const Add = ({ addAttdCallback }) => {


  const [open, setOpen] = useState(false)


  const [inTime, setInTime] = useState('')
  const [outTime, setOutTime] = useState('')
  const [date, setDate] = useState('')
  const [totalHours, setTotalHours] = useState('')
  const [EID, setEID] = useState('')
  const [empName, setEmpName] = useState('')
  const [isData, setIsData] = useState('')
  const [showloader, setshowloader] = useState(false)

  const [remark, setRemark] = useState('')

  const [dept, setDept] = useState('')
  const [deptList, setDeptList] = useState([])

  const [des, setDes] = useState('')
  const [desList, setDesList] = useState([])

  function resetForm() {
    setDate(''),
      setInTime(''),
      setOutTime(''),
      setTotalHours(''),
      setEmpName(''),
      setDept(''),
      setDes(''),
      setRemark(''),
      setEID('')
  }

  console.log(inTime)
  console.log(outTime)

  var time = inTime - outTime;
  const hours_difference = Math.floor((time / (1000 * 60 * 60)) % 24)



  console.log(time)
  console.log('rara6', hours_difference)


  const calculateTotalHours = () => {
    const inTimeObj = moment(inTime, 'HH:mm');
    const outTimeObj = moment(outTime, 'HH:mm');
    const diff = outTimeObj.diff(inTimeObj, 'hours', true);
    return diff.toFixed(2);
  };

  const handleOutTimeChange = (e) => {
    setOutTime(e.target.value);
    setTotalHours(calculateTotalHours());
  };


  const handleInTimeChange = (e) => {
    setInTime(e.target.value);
    setTotalHours(calculateTotalHours());
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetForm();
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setshowloader(true);

      const data = {

        employeeId: EID,
        employeeName: empName,
        department: dept,
        designation: des,
        attendanceDate: date,
        inTime: inTime,
        outTime: outTime,
        totalHours: totalHours,
        remark: remark,
      };

      serverInstance('hr/add-employeeAttendance ', 'post', data).then((res) => {
        if (res?.status) {
          console.log(res);
          setOpen(false);
          setshowloader(false);
          Swal.fire('Great!', res?.msg, 'success');
          console.log("THis is" + data)
          handleClose()
          addAttdCallback();
          resetForm();
        }
        if (res?.status === false) {
          setOpen(false);
          setshowloader(false);
          Swal.fire('Error!', res?.msg, 'error');
        }
      });
    } catch (error) {

      Swal.fire('Error!', error, 'error');
      handleClose()
    }
  };



  const getDepartment = () => {
    serverInstance('admin/get-department', 'get').then((res) => {
      if (res.status) {
        setDeptList(res.data);

      } else {
        Swal('Error', 'something went  wrong', 'error');
      }
    });
  };

  const getDesignation = () => {
    serverInstance('admin/get-designation', 'get').then((res) => {

      if (res.status) {
        setDesList(res.data)
      } else {
        Swal.fire('Error', 'Something went wrong', 'Error')
      }
    })
  }

  const getEmployee = () => {

    try {

      serverInstance('hr/get-employee', 'get').then((res) => {
        if (res.data) {
          setIsData(res.data)
          console.log(isData)

        }
      })
    } catch (err) {
      console.log(err)
    }
  }




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
      setDes(selectedEmployee.designation);
      setDept(selectedEmployee.department);
    }
    //  else{
    //   handleClose();
    //   Swal.fire("Employee Doesn't Exist ")

    // }
  };

  const handleEID = (e) => {
    const selectedEID = e.target.value;
    setEID(selectedEID);

    getEmployeeDetails(selectedEID);
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
    getEmployee();
    getDepartment();
    getDesignation();

  }, [])


  useEffect(() => {
    if (inTime && outTime) {
      setTotalHours(calculateTotalHours());
    }
  }, [inTime, outTime]);


  return (
    <div className='mainContainer' style={{}}>


      <button id="srcbtn" onClick={handleOpen} style={{ width: '10rem' }}>
        +Add
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
                  <h2 clssName="add_text_only">Create Employee Attendance</h2>
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
                      <label htmlFor="startDate">Date</label>
                      <input
                        type="date"
                        id="startDate"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}

                      />

                    </div>


                    <div className="inner-input-divadd">
                      <label htmlFor="startDate">Remark</label>
                      <input
                        type="text"
                        id="startDate"
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                        placeholder='Enter Remark'
                      />

                    </div>

                  </div>
                  <div className="main-input-div2">

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
                      <label htmlFor="endDate">In Time</label>
                      <input
                        type="time"
                        id="endDate"
                        required
                        value={inTime}
                        onChange={handleInTimeChange}

                      />
                    </div>
                  </div>


                  <div className="main-input-div3">

                    <div className="inner-input-divadd">
                      <label >Select Department*</label>
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

                    <div className="inner-input-divadd">
                      <label htmlFor="endDate">Out Time</label>
                      <input
                        type="time"
                        id="endDate"
                        required
                        value={outTime}
                        onChange={handleOutTimeChange}

                      />
                    </div>


                  </div>

                  <div className="main-input-div4">

                    <div className="inner-input-divadd">
                      <label >Select Designation*</label>
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
                        value={des}
                        onChange={(e) => setDes(e.target.value)}
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          Select Designation
                        </MenuItem>

                        {desList && desList?.map((item, index) => {
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


                      </Selec>
                    </div>


                    <div className="inner-input-divadd">
                      <label htmlFor="employeeName">Total Hours</label>
                      <input
                        type="text"
                        placeholder='Total Hours'
                        required
                        value={totalHours}
                        onChange={(e) => setTotalHours(e.target.value)}
                      />
                    </div>

                  </div>

                </div>

                <div className="save-div-btn">
                  <button className="save-div-btn-btn" >

                    Add Attendance

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

export default Add