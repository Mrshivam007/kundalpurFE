import React, { useState, useEffect } from 'react';
import InputBase from '@mui/material/InputBase';
import { backendApiUrl } from '../../../../../config/config';
import { ReactTransliterate } from 'react-transliterate';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  Box,

} from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import './Form.css';
import LoadingSpinner1 from '../../../../../components/Loading/LoadingSpinner1';
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
function UpdateExpenseHead({ setOpen, updatedata }) {
  const [headHi, setHeadHi] = useState('')
  const [headEng, setHeadEng] = useState('')
  const [showloader, setshowloader] = useState(false);

  const handlesubmit = async () => {
    try {
      setshowloader(true);

      const data = {
        expenseHead_hi: headHi,
        expenseHead_en: headEng,
        id : updatedata?.id
      };
      axios.defaults.headers.put[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;

      const res = await axios.put(`${backendApiUrl}admin/edit-expenseHead`, data);

      if (res.status) {
        setOpen(false);
        setshowloader(false);
        Swal.fire('Great!', res.data.data.message, 'success');
      }
      if (res.status === false) {
        setOpen(false);
        setshowloader(false);
        Swal.fire('Great!', res.data.data.message, 'success');
      }
    } catch (error) {
        setOpen(false)
      setshowloader(false);
      Swal.fire('Error!', error, 'error');
    }
  };


  useEffect(() => {
    if (updatedata) {
      setHeadEng(updatedata?.expenseHead_en);
      setHeadHi(updatedata?.expenseHead_hi);
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

          <div className="inner-input-div2">
            <label
              style={{ marginBottom: '0.3rem', marginTop: '1rem' }}
              htmlFor="categoryname"
            >
              Enter Expense Head in Hindi
            </label>
            <ReactTransliterate
              placeholder="Enter Expense Head in Hindi"
              style={custominput}
              id="full-name"
              required
              value={headHi}
              onChangeText={(headHi) => {
                setHeadHi(headHi);
              }}
              onChange={(e) => setHeadHi(e.target.value)}
              lang="hi"
            />
          </div>

          <div className="inner-input-div2">
            <label
              style={{ marginBottom: '0.3rem', marginTop: '1rem' }}
              htmlFor="commentss"
            >
              Enter Expense Head in English
            </label>
            <CustomInput
              id="vehicleType"
              name="commentss"
              placeholder="Enter Expense Head in English"
              value={headEng}
              onChange={(e) => setHeadEng(e.target.value)}
            />
          </div>



          <div className="save-div-btn">
            <button onClick={() => handlesubmit()} className="save-div-btn-btn">
              Save
            </button>
            <button
              onClick={() => setOpen(false)}
              className="save-div-btn-btn-cancel"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {showloader&& <LoadingSpinner1 />}
    </>
  );
}

export default UpdateExpenseHead;
