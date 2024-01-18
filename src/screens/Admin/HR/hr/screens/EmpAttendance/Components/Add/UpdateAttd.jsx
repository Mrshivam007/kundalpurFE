import React, { useState, useEffect } from 'react';
import InputBase from '@mui/material/InputBase';

import { serverInstance } from '../../../../../../../../API/ServerInstance';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import {
  Box, Menu,

} from '@mui/material';

import Select from '@mui/material/Select'

import MenuItem from '@mui/material/MenuItem';

import { styled } from '@mui/material/styles';

const custominput = {
  border: '1px solid #B8B8B8',
  width: '21rem',
  height: '39px',
  borderRadius: '5px',
  fontSize: '15px',
  paddingLeft: '0.5rem',
  marginBottom: '0.5rem',
  color: 'gray',
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
function UpdateAttd({ setOpen, updatedata }) {
  const [lan, setlan] = useState(false);


  const [showloader, setshowloader] = useState(false);
  const [inTime, setInTime] = useState('')
  const [outTime, setOutTime] = useState('')
  const [date, setDate] = useState('')
  const [totalHours, setTotalHours] = useState('')
  const [EID, setEID] = useState('')
  const [empName, setEmpName] = useState('')

  const [remark, setRemark] = useState('')

  const [dept, setDept] = useState('')
  const [deptList, setDeptList] = useState([])

  const [des, setDes] = useState('')
  const [desList, setDesList] = useState([])

  const handleUpdate = async (e) => {
    e.preventDefault()
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
        id: updatedata?.id
      };

      serverInstance('hr/edit-employeeAttendance', 'put', data).then((res) => {
        console.log(res)
        if (res?.status) {
          setOpen(false);
          setshowloader(false);
          Swal.fire('Updated!', res?.msg, 'success');
        }
        if (res?.status === false) {
          setOpen(false);
          setshowloader(false);
          Swal.fire('Great!', res?.msg, 'success');
        }
      });
    } catch (error) {
      setOpen(false);
      Swal.fire('Error!', error, 'error');
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


  const handleClose = () => {
    setOpen(false)
  }

  const handleCloseModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    getDesignation();
    getDepartment();

    if (updatedata) {
      setEmpName(updatedata?.employeeName)
      setEID(updatedata?.employeeId)
      setDept(updatedata?.department)
      setDes(updatedata?.designation)
      setDate(updatedata?.attendanceDate)
      setInTime(updatedata?.inTime)
      setOutTime(updatedata?.outTime)
      setTotalHours(updatedata?.totalHours)
      setRemark(updatedata?.remark)
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
      <form onSubmit={handleUpdate}>

        <div className="flex_div_main_add_user">

          <div className="main-input-div1">

            <div className="inner-input-divadd">
              <label htmlFor="empID">Employee ID*</label>
              <input
                type="text"
                placeholder='Enter Employee ID'
                required
                value={EID}
                onChange={(e) => setEID(e.target.value)}
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
                onChange={(e) => setInTime(e.target.value)}

              />
            </div>
          </div>


          <div className="main-input-div3">

            <div className="inner-input-divadd">
              <label >Select Department*</label>
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

              </Select>
            </div>

            <div className="inner-input-divadd">
              <label htmlFor="endDate">Out Time</label>
              <input
                type="time"
                id="endDate"
                required
                value={outTime}
                onChange={(e) => setOutTime(e.target.value)}

              />
            </div>


          </div>

          <div className="main-input-div4">

            <div className="inner-input-divadd">
              <label >Select Designation*</label>
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


              </Select>
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
    </>
  );
}

export default UpdateAttd;
