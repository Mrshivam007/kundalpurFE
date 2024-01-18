import React, { useState, useEffect } from 'react';
import InputBase from '@mui/material/InputBase';
import { backendApiUrl } from '../../../../../config/config';
import { ReactTransliterate } from 'react-transliterate';
import { serverInstance } from '../../../../../API/ServerInstance';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  Box,
  Button,
  ButtonBase,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
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

  const [showloader, setshowloader] = useState(false);
  const [empTypeHindi, setEmpTypeHindi] = useState('')
  const [empTypeEnglish, setEmpTypeEnglish] = useState('')
  const [empTypeCode, setEmpTypeCode] = useState('')


  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      setshowloader(true);

      const data = {
        employeeType_code: empTypeCode,
        employeeType_hi: empTypeHindi,
        employeeType_en: empTypeEnglish
      };

      serverInstance('admin/add-employeeType', 'post', data).then((res) => {
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
      setEmpTypeCode(updatedata?.employeeType_code);
      setEmpTypeHindi(updatedata?.employeeType_hi);
      setEmpTypeEnglish(updatedata?.employeeType_en)
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
        <form onSubmit={handlesubmit} >
          <div className="cash-donation-container-innser10">


            <div className="inner-input-div2">
              <label
                style={{ marginBottom: '0.3rem', marginTop: '1rem' }}

              >
                Employee Type Code
              </label>
              <CustomInput
                id="empType"

                placeholder="Enter Employee Type Code"
                required
                value={empTypeCode}
                onChange={(e) => setEmpTypeCode(e.target.value)}
              />
            </div>


            <div className="inner-input-div2">
              <label
                style={{ marginBottom: '0.3rem', marginTop: '1rem' }}
                htmlFor="categoryname"
              >
                Enter Employee Type in Hindi
              </label>
              <ReactTransliterate
                placeholder="Enter Employee Type in Hindi"
                style={custominput}
                id="full-name"
                required
                value={empTypeHindi}
                onChangeText={(empTypeHindi) => {
                  setEmpTypeHindi(empTypeHindi);
                }}
                onChange={(e) => setEmpTypeHindi(e.target.value)}
                lang="hi"
              />
            </div>

            <div className="inner-input-div2">
              <label
                style={{ marginBottom: '0.3rem', marginTop: '1rem' }}

              >
                Employee Type in English
              </label>
              <CustomInput
                required
                id="empType"

                placeholder="Enter Employee Type in English"
                value={empTypeEnglish}
                onChange={(e) => setEmpTypeEnglish(e.target.value)}
              />
            </div>

            <div className="save-div-btn">
              <button type='submit' className="save-div-btn-btn">
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
        </form>
      </div>

    </>
  );
}

export default UDAddForm;
