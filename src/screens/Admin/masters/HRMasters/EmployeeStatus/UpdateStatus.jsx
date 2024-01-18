import React, { useState, useEffect } from 'react';
import InputBase from '@mui/material/InputBase';
import { backendApiUrl } from '../../../../../config/config';
import { ReactTransliterate } from 'react-transliterate';
import { serverInstance } from '../../../../../API/ServerInstance';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  Box,

} from '@mui/material';
import { styled } from '@mui/material/styles';
import '../Form.css';
import EmpStatus from './EmpStatus';
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
function UpdateDept({ setOpen, updatedata }) {
  const [lan, setlan] = useState(false);


  const [showloader, setshowloader] = useState(false);
  const [empStatusCode, setEmpStatusCode] = useState('')
  const [empStatus, setEmpStatus] = useState('')

  const handlesubmit = async () => {
    try {
      setshowloader(true);
      const data = {
        employeeStatus : empStatus,
        employeeStatus_code: empStatusCode,
        id: updatedata?.id
      };
      serverInstance('admin/edit-employeeStatus', 'put', data).then((res) => {
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
      Swal.fire('Error!', error, 'error');
    }
  };

  const handleClose = () => {
    setOpen(false)
  }

  const handleCloseModal = () => {
    setOpen(false); // Set the state to close the modal
  };

  useEffect(() => {
    if (updatedata) {
      setEmpStatus(updatedata?.employeeStatus)
      setEmpStatusCode(updatedata?.employeeStatus_code)
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
      <div className="cash-donation-div">
        <div className="cash-donation-container-innser10s">
          <div className="form-div" style={{ marginBottom: '1rem' }}>
            <div className="form-input-div_add_user">

              <div className="inner-input-div2">
                <label
                  style={{ marginBottom: '0.3rem' }}
                  htmlFor="categoryname"
                >
                  Enter Employee Status Code
                </label>
                <input
                  placeholder="Enter Employee Status Code"
                  style={custominput}
                  id="full-name"
                  required
                  value={empStatusCode}
                  onChange={(e) => setEmpStatusCode(e.target.value)}
                  lang="hi"
                />
              </div>



              <div className="inner-input-div2">
                <label
                  style={{ marginBottom: '0.3rem' }}
                
                >
                  Enter Employee Status
                </label>
                <input
                  placeholder="Enter Employee Status"
                  style={custominput}
                  required
                  value={empStatus}
                  onChange={(e) => setEmpStatus(e.target.value)}

                />
              </div>
            </div>
          </div>

          <div className="save-div-btn">
            <button onClick={() => handlesubmit()} className="save-div-btn-btn">
              Update
            </button>
            <button
              onClick={handleClose}
              className="save-div-btn-btn-cancel"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateDept;
