import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { backendApiUrl } from '../../../../config/config';
import axios from 'axios';
import { ReactTransliterate } from 'react-transliterate';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Box, Button, Typography } from '@mui/material';
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
function UpdateFac({ updatedata, setOpen }) {
  const [lan, setlan] = useState(false);
  const [facilityname, setfacilityname] = useState('');
  const [commentss, setcommentss] = useState('');

  const handlesubmit = async () => {
    try {
      axios.defaults.headers.put[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;

      const res = await axios.put(`${backendApiUrl}room/facility`, {
        name: facilityname,
        comment: commentss,
        id: updatedata.facility_id,
      });

      console.log(res.data.data);
      if (res.data.data.status === true) {
        setOpen(false);
        Swal.fire('Great!', res.data.data.message, 'success');
      }
      if (res.data.data.status === false) {
        setOpen(false);
        Swal.fire('Great!', res.data.data.message, 'success');
      }
    } catch (error) {
      Swal.fire('Error!', error, 'error');
    }
  };

  useEffect(() => {
    if (updatedata) {
      setfacilityname(updatedata?.name);
      setcommentss(updatedata?.comments);
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
        <Typography variant="body1">Change language:</Typography>
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
        </Button>
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
                      htmlFor="facilityname"
                    >
                      Facilities Name
                    </label>
                    <CustomInput
                      id="facilityname"
                      name="facilityname"
                      placeholder="Enter facility name"
                      value={facilityname}
                      onChange={(e) => setfacilityname(e.target.value)}
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
                      Facilities Name
                    </label>
                    <ReactTransliterate
                      placeholder="Enter facility name"
                      style={custominput}
                      id="full-name"
                      required
                      value={facilityname}
                      onChangeText={(facilityname) => {
                        setfacilityname(facilityname);
                      }}
                      onChange={(e) => setfacilityname(e.target.value)}
                      lang="hi"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="form-div" style={{ marginBottom: '1rem' }}>
            <div className="form-input-div_add_user">
              {lan ? (
                <>
                  <div className="inner-input-div2">
                    <label
                      style={{ marginBottom: '0.3rem', marginTop: '1rem' }}
                      htmlFor="commentss"
                    >
                      Comments
                    </label>
                    <CustomInput
                      id="commentss"
                      name="commentss"
                      placeholder="Enter comments"
                      value={commentss}
                      onChange={(e) => setcommentss(e.target.value)}
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
                      Comments
                    </label>
                    <ReactTransliterate
                      placeholder="Enter comments"
                      style={custominput}
                      id="full-name"
                      required
                      value={commentss}
                      onChangeText={(commentss) => {
                        setcommentss(commentss);
                      }}
                      onChange={(e) => setcommentss(e.target.value)}
                      lang="hi"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="save-div-btn">
            <button onClick={() => handlesubmit()} className="save-div-btn-btn">
              Update
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

export default UpdateFac;
