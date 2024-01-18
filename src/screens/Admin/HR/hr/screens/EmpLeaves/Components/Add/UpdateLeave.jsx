import React, { useState, useEffect } from 'react';
import InputBase from '@mui/material/InputBase';

import { serverInstance } from '../../../../../../../../API/ServerInstance';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  Box, Menu,

} from '@mui/material';

import Select from '@mui/material/Select'

import MenuItem from '@mui/material/MenuItem';

import { styled } from '@mui/material/styles';


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
function UpdateLeave({ setOpen, updatedata }) {
  const [lan, setlan] = useState(false);


  const [showloader, setshowloader] = useState(false);
  const [EID, setEID] = useState('')
  const [empName, setEmpName] = useState('')
  const [startDate, setStartDate] = useState('')

  const [endDate, setEndDate] = useState('')
  const [remark, setRemark] = useState('')

  const [dept, setDept] = useState('')
  const [deptList, setDeptList] = useState([])

  const [leaveTypeList, setLeaveTypeList] = useState([])
  const [leaveType, setLeaveType] = useState('')

  const handlesubmit = async (e) => {
    e.preventDefault()
    try {
      setshowloader(true);
      const data = {
        employeeId: EID,
        employeeName: empName,
        startDate: startDate,
        endDate: endDate,
        department: dept,
        leaveType: leaveType,
        remark: remark,
        id: updatedata?.id
      };

      serverInstance('hr/edit-employeeLeave', 'put', data).then((res) => {
        console.log(res)
        if (res?.status) {
          setOpen(false);
          setshowloader(false);
          Swal.fire('Great!', res?.msg, 'success');
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


  const getLeaveType = () => {
    serverInstance('admin/get-leaveType', 'get').then((res) => {
      if (res.status) {
        setLeaveTypeList(res.data)
      } else {
        Swal('Error', 'something went  wrong', 'error');
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

    getDepartment();
    getLeaveType();

    if (updatedata) {
      setEID(updatedata?.employeeId)
      setEmpName(updatedata?.employeeName)
      setStartDate(updatedata?.startDate)
      setEndDate(updatedata?.endDate)
      setDept(updatedata?.department)
      setLeaveType(updatedata?.leaveType)
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
      <form onSubmit={handlesubmit}>
        <div className="cash-donation-div">
          <div className="cash-donation-container-innser10s">
            <div className="form-div" style={{ marginBottom: '1rem' }}>
              <div className="form-input-div_add_user">
                <div className="main-input-div1">

                  <div className="inner-input-divadd">
                    <label
                      style={{ marginBottom: '0.3rem' }}
                      htmlFor="categoryname"
                    >
                      Employee ID
                    </label>
                    <input
                      placeholder="Enter Employee ID"
                      id="full-name"
                      required
                      value={EID}
                      onChange={(e) => setEID(e.target.value)}
                      lang="hi"
                    />
                  </div>

                  <div className="inner-input-divadd">


                    <label htmlFor="Department">Select Department</label>
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
                      <MenuItem disabled>Select Department</MenuItem>

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
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value)}
                    displayEmpty
                  >
                    <MenuItem disabled>
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
                  </Select>
                </div>

              </div>

              <div className="main-input-div1">

                <div className="inner-input-divadd">
                  <label
                    style={{ marginBottom: '0.3rem' }}
                    htmlFor="categoryname"
                  >
                    Start Date
                  </label>
                  <input
                    placeholder="Enter Start Date"

                    type='date'
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}

                  />
                </div>

                <div className="inner-input-divadd">
                  <label
                    style={{ marginBottom: '0.3rem' }}
                    htmlFor="remark"
                  >
                    Remark
                  </label>
                  <input
                    placeholder="Enter Remark"
                    type='text'

                    required
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}

                  />
                </div>
              </div>

              <div className="main-input-div1">

                <div className="inner-input-divadd">
                  <label
                    style={{ marginBottom: '0.3rem' }}
                    htmlFor="endDate"
                  >
                    End Date
                  </label>
                  <input
                    placeholder="Enter End Date"
                    type='date'

                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}

                  />
                </div>


              </div>
            </div>


            <div className="save-div-btn">
              <button className="save-div-btn-btn">
                Update
              </button>
              <button
                onClick={handleClose}
                className="save-div-btn-btn-cancel"
                type="button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default UpdateLeave;
