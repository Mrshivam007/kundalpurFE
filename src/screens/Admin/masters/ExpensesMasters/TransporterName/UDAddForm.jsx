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
  const [transporterNameHindi, setTransporterNameHindi] = useState('')
  const [transporterNameEng, setTransporterNameEng] = useState('')
  const [tCode ,setTCode] = useState('')

  const [showloader, setshowloader] = useState(false);

  const handlesubmit = async () => {
    try {
      setshowloader(true);

      const data = {
        name: categoryname,
        comment: commentss,
        id: updatedata?.category_id,
      };
      axios.defaults.headers.put[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;

      const res = await axios.put(`${backendApiUrl}room/category`, data);

      if (res.data.data.status) {
        setOpen(false);
        setshowloader(false);
        Swal.fire('Great!', res.data.data.message, 'success');
      }
      if (res.data.data.status === false) {
        setOpen(false);
        setshowloader(false);
        Swal.fire('Great!', res.data.data.message, 'success');
      }
    } catch (error) {
      Swal.fire('Error!', error, 'error');
    }
  };

  const handleCloseModal = () => {
    setOpen(false); // Set the state to close the modal
  };

  useEffect(() => {
    if (updatedata) {
      setcategoryname(updatedata?.name);
      setcommentss(updatedata?.comment);
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
        {/* <Typography variant="body1">Change language:</Typography>
        <Button
          variant={lan ? 'outlined' : 'contained'}
          sx={{
            borderColor: '#C8C8C8',
            fontSize: 12,
            minWidth: 100,
            padding: 0.5,
            color: lan ? '#656565' : '#fff',
          }}
          onClick={() => setlan(false)}
        >
          Hindi
        </Button>
        <Button
          onClick={() => setlan(true)}
          variant={lan ? 'contained' : 'outlined'}
          sx={{
            borderColor: '#C8C8C8',
            fontSize: 12,
            minWidth: 100,
            padding: 0.5,
            color: lan ? '#fff' : '#656565',
          }}
        >
          English
        </Button> */}
      </Box>
      <div className="cash-donation-div">
        <div className="cash-donation-container-innser10">

          <div className="inner-input-div2">
            <label
              style={{ marginBottom: '0.3rem', marginTop: '1rem' }}
              htmlFor="commentss"
            >
              Enter Transporter Name in English
            </label>
            <CustomInput
              id="vehicleType"
              name="commentss"
              placeholder="Enter Transporter Name"
              value={transporterNameEng}
              onChange={(e) => setTransporterNameEng(e.target.value)}
            />
          </div>

          <div className="inner-input-div2">
            <label
              style={{ marginBottom: '0.3rem', marginTop: '1rem' }}
              htmlFor="categoryname"
            >
              Enter Transporter Name in Hindi
            </label>
            <ReactTransliterate
              placeholder="Enter Transporter Name in Hindi"
              style={custominput}
              id="full-name"
              required
              value={transporterNameHindi}
              onChangeText={(transporterNameHindi) => {
                setTransporterNameHindi(transporterNameHindi);
              }}
              onChange={(e) => setTransporterNameHindi(e.target.value)}
              lang="hi"
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
    </>
  );
}

export default UDAddForm;
