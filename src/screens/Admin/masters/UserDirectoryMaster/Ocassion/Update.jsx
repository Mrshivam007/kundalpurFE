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
import './Form.css';
const custominput = {
  border: '1px solid #B8B8B8',
  width: '20rem',
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
function Update({ setOpen, updatedata }) {
  const [lan, setlan] = useState(false);
  const [commentss, setcommentss] = useState('');
  const [categoryname, setcategoryname] = useState('');
  const [showloader, setshowloader] = useState(false);

  const handlesubmit = async () => {
    try {
      setshowloader(true);
      const data = {
        occasionType_hi: commentss,
        occasionType_en: categoryname,
        id: updatedata?.id,
      };
      serverInstance('admin/edit-occasionType', 'put', data).then((res) => {
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

  const handleCloseModal = () => {
    setOpen(false); // Set the state to close the modal
  };

  useEffect(() => {
    if (updatedata) {
      setcategoryname(updatedata?.occasionType_en);
      setcommentss(updatedata?.occasionType_hi);
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
          <div className="form-div" style={{ marginBottom: '1rem' }}>
            <div className="form-input-div_add_user">
              {lan ? (
                <>
                  <div className="inner-input-div2">
                    <label
                      style={{ marginBottom: '0.3rem' }}
                      htmlFor="categoryname"
                    >
                      Ocassion Type
                    </label>
                    <CustomInput
                      id="categoryname"
                      name="categoryname"
                      placeholder="Enter Sadasya Type"
                      value={categoryname}
                      onChange={(e) => setcategoryname(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="inner-input-div2">
                    <label
                      style={{ marginBottom: '0.3rem' }}
                      htmlFor="categoryname"
                    >
                      Enter Ocassion Type in Hindi
                    </label>
                    <ReactTransliterate
                      placeholder="Enter Sadasya Type"
                      style={custominput}
                      id="full-name"
                      required
                      value={categoryname}
                      onChangeText={(categoryname) => {
                        setcategoryname(categoryname);
                      }}
                      onChange={(e) => setcategoryname(e.target.value)}
                      lang="hi"
                    />
                  </div>
                </>
              )}

              <div className="inner-input-div2">
                <label
                  style={{ marginBottom: '0.3rem' }}
                  htmlFor="categoryname"
                >
                  Enter Ocassion Type in English
                </label>
                <input
                  placeholder="Enter Sadasya Type"
                  style={custominput}
                  id="full-name"
                  required
                  value={commentss}
                  name="commentss"
                  onChange={(e) => setcommentss(e.target.value)}
                  lang="hi"
                />
              </div>
            </div>
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

export default Update;
