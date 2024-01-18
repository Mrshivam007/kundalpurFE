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
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
// import '../Form.css';
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
function UpdatePayment({ setOpen, updatedata }) {
  const [lan, setlan] = useState(false);


  const [showloader, setshowloader] = useState(false);
  const [ paymentTypeCode , setPaymentTypeCode] = useState('')
  const [paymentType , setPaymentType] = useState('')

  const handlesubmit = async () => {
    try {
      setshowloader(true);
      const data = {
        paymentTypeCode: paymentTypeCode,
        paymentTypeName: paymentType,
        id: updatedata?.id
      };
      serverInstance('admin/edit-paymentType', 'put', data).then((res) => {
        if (res?.status) {
          setOpen(false);
          setshowloader(false);
          Swal.fire('Great!', res?.msg, 'success');
        }
        if (res?.status === false) {
          setOpen(false);
          setshowloader(false);
          Swal.fire('Error!', res?.msg, 'error');
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
      setPaymentTypeCode(updatedata?.paymentTypeCode)
      setPaymentType(updatedata?.paymentTypeName)
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
                  style={{ marginBottom: '0.3rem', marginTop: '1rem' }}

                >
                  Payment Type Code
                </label>
                <CustomInput
                  id="empType"
                  required
                  placeholder="Enter Payment Type Code"
                  value={paymentTypeCode}
                  onChange={(e) => setPaymentTypeCode(e.target.value)}
                />

                <label
                  style={{ marginBottom: '0.3rem', marginTop: '1rem' }}
                  htm
                >
                  Payment Type
                </label>
                <CustomInput
                  id="empType"
                  required
                  placeholder="Enter Payment Type"
                  value={paymentType}
                  onChange={(e) => setPaymentType(e.target.value)}
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

export default UpdatePayment;
