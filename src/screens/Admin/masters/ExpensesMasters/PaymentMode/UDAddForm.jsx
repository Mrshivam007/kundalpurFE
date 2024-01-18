import React, { useState, useEffect } from 'react';
import InputBase from '@mui/material/InputBase';
import { backendApiUrl } from '../../../../../config/config';
import { ReactTransliterate } from 'react-transliterate';
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
import './Form.css';
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
  const  [code,setCode]=useState('')
  const [paymentMode,setPaymentMode] = useState('')
  const [showloader, setshowloader] = useState(false);

  const handlesubmit = async (e) => {
    e.preventDefault()
    try {
      setshowloader(true);

      const data = {
        paymentModeCode: code,
        paymentMode: paymentMode,
       
      };
      axios.defaults.headers.post[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;

      const res = await axios.post(`${backendApiUrl}admin/add-paymentMode`, data);

      if (res.data.data.status) {
        setOpen(false);
        setshowloader(false);
        Swal.fire('Great!', res.data.data.message, 'success');
      }
      if (res.data.data.status === false) {
        setOpen(false);
        setshowloader(false);
        Swal.fire('Error!', res.data.data.message, 'error');
      }
    } catch (error) {
      setOpen(false);
      Swal.fire('Error!', error, 'error');
    }
  };


  useEffect(() => {
    if (updatedata) {
      setCode(updatedata?.paymentModeCode);
      setPaymentMode(updatedata?.paymentMode);
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
        <div className="cash-donation-container-innser10">
        <form onSubmit={handlesubmit}>
        <div className="inner-input-div2">
            <label
              style={{ marginBottom: '0.3rem', marginTop: '1rem' }}
              htmlFor="commentss"
            >
              Payment Mode Code
            </label>
            <CustomInput
              id="paymentMode"
              placeholder="Enter Payment Mode Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          <div className="inner-input-div2">
            <label
              style={{ marginBottom: '0.3rem', marginTop: '1rem' }}
              htmlFor="commentss"
            >
              Payment Mode
            </label>
            <CustomInput
              id="paymentMode"
              placeholder="Enter Payment Mode"
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
            />
          </div>



          <div className="save-div-btn">
            <button  className="save-div-btn-btn">
              Save
            </button>
            <button
              onClick={() => setOpen(false)}
              className="save-div-btn-btn-cancel"
              type='button'
            >
              Cancel
            </button>
            
          </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UDAddForm;
