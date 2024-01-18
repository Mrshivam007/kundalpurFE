import React, { useState, useEffect } from 'react';
import InputBase from '@mui/material/InputBase';
import { backendApiUrl } from '../../../../../config/config';
import { ReactTransliterate } from 'react-transliterate';
import { serverInstance } from '../../../../../API/ServerInstance';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  Box
} from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import '../Form.css';
const custominput = {
  border: '1px solid #B8B8B8',
  width: '37rem',
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
function UDAddForm({ setOpen, updatedata }) {
  const [lan, setlan] = useState(false);
  const [commentss, setcommentss] = useState('');
  const [categoryname, setcategoryname] = useState('');
  const [showloader, setshowloader] = useState(false);

  const [deptNameHindi, setDeptNameHindi] = useState('')
  const [deptNameEnglish, setDeptNameEnglish] = useState('')
  const [deptCode, setDeptCode] = useState('')

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      setshowloader(true);

      const data = {
        department_code: deptCode,
        departmentName_hi: deptNameHindi,
        departmentName_en: deptNameEnglish
      };

      serverInstance('admin/add-department', 'post', data).then((res) => {
        if (res?.status) {
          setOpen(false);
          setshowloader(false);
          Swal.fire('Great!', res?.msg, 'success');
        }

      });
    } catch (error) {
      setOpen(false)
      Swal.fire('Error!', error, 'error');
    }
  };

  const handleCloseModal = () => {
    setOpen(false); // Set the state to close the modal
  };

  useEffect(() => {
    if (updatedata) {
      setDeptCode(updatedata?.department_code);
      setDeptNameHindi(updatedata?.departmentName_hi);
      setDeptNameEnglish(updatedata?.departmentName_en)
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
          <div className="cash-donation-container-innser10">

            <div className="inner-input-div2">
              <label
                style={{ marginBottom: '0.3rem', marginTop: '1rem' }}
                
              >
                Enter Department Code
              </label>
              <CustomInput
                id="empType"
                required
                placeholder="Enter Department Code"
                value={deptCode}
                onChange={(e) => setDeptCode(e.target.value)}
              />
            </div>

            <div className="inner-input-div2">
              <label
                style={{ marginBottom: '0.3rem', marginTop: '1rem' }}
                
              >
                Enter Department Name in English
              </label>
              <CustomInput
                id="empType"
                required
                placeholder="Enter Department Name"
                value={deptNameEnglish}
                onChange={(e) => setDeptNameEnglish(e.target.value)}
              />
            </div>



            <div className="inner-input-div2">
              <label
                style={{ marginBottom: '0.3rem', marginTop: '1rem' }}
                htmlFor="categoryname"
              >
                Enter Department Name in Hindi
              </label>
              <ReactTransliterate
                placeholder="Enter Department Name in Hindi"
                style={custominput}
                id="full-name"
                required
                value={deptNameHindi}
                onChangeText={(deptNameHindi) => {
                  setDeptNameHindi(deptNameHindi);
                }}
                onChange={(e) => setDeptNameHindi(e.target.value)}
                lang="hi"
              />
            </div>



            <div className="save-div-btn">
              <button className="save-div-btn-btn">
                Save
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                }}
                className="save-div-btn-btn-cancel"
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

export default UDAddForm;
