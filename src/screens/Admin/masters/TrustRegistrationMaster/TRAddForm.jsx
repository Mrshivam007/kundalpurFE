import React, { useState, useEffect } from 'react';
import InputBase from '@mui/material/InputBase';
import { backendApiUrl } from '../../../../config/config';
import { ReactTransliterate } from 'react-transliterate';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  Box,

} from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import './Form.css';

import { serverInstance } from '../../../../API/ServerInstance';




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
function TRAddForm({ setOpen, updatedata }) {
  
  const [trustTypeEng, setTrustTypeEng] = useState('')
  const [trustTypeHi, setTrustTypeHi] = useState('')
  const [showloader, setshowloader] = useState(false);





  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setshowloader(true);

      const data = {
        trustType_en: trustTypeEng,
        trustType_hi: trustTypeHi

      };

      serverInstance('admin/add-trustType', 'post', data).then((res) => {
        console.log(res.data)
        if (res.data) {
          setOpen(false);
          setshowloader(false);
          Swal.fire('Great!', res.msg, 'success');
        }
        if (res.data === false) {
          setOpen(false);
          setshowloader(false);
          Swal.fire('Error', res.msg, 'error');
        }
      })


    } catch (error) {
      Swal.fire('Error!', error, 'error');
    }
  };

  

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
      <div>
        <div>
          <form onSubmit={handlesubmit}>
            <div className="form-div" style={{ marginBottom: '1rem' }}>
              <div className="form-input-div_add_user">
                <div className="inner-input-div2">
                  <label
                    style={{ marginBottom: '0.3rem' }}
                    htmlFor="categoryname"
                  >
                    Trust Type in English
                  </label>
                  <CustomInput
                  required
                    id="trustTypeEng"
                    name="trustTypeEng"
                    placeholder="Enter Trust Type"
                    value={trustTypeEng}
                    onChange={(e) => setTrustTypeEng(e.target.value)}
                  />
                </div>

              </div>
            </div>

            <div className="form-div" style={{ marginBottom: '1rem' }}>
              <div className="form-input-div_add_user">

                <>
                  <div className="inner-input-div2">
                    <label
                      style={{ marginBottom: '0.3rem' }}
                      htmlFor="trustTypeHi"
                    >
                      Trust Type in Hindi
                    </label>
                    <ReactTransliterate
                      placeholder="Enter Trust Type in Hindi"
                      style={custominput}
                      id="trustTypeHi"
                      required
                      value={trustTypeHi}
                      onChangeText={(trustTypeHi) => {
                        setTrustTypeHi(trustTypeHi);
                      }}
                      onChange={(e) => setTrustTypeHi(e.target.value)}
                      lang="hi"
                    />
                  </div>
                </>

              </div>
            </div>
            <div className="save-div-btn">
              <button className="save-div-btn-btn">
                Save
              </button>
              <button
              type='button'
                onClick={() => setOpen(false)}
                className="save-div-btn-btn-cancel"
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

export default TRAddForm;
