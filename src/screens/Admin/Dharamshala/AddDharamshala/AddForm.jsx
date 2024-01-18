import React, { useState } from 'react';
import camera from '../../../../assets/camera.png';
import Swal from 'sweetalert2';
import { backendApiUrl } from '../../../../config/config';
import axios from 'axios';
import { ReactTransliterate } from 'react-transliterate';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box, Button, Typography } from '@mui/material';
const formData = new FormData();
const custumstyle = {
  width: '100%',
  height: '35px',
  background: '#FFFFFF',
  border: '1px solid #C5BFBF',
  borderRadius: '7px',
  paddingLeft: '0.5rem',
  marginBottom: '0.5rem',
};

function AddForm({ setOpen }) {
  const [lan, setlan] = useState(false);
  const [dharamshalaname, setdharamshalaname] = useState('');
  const [description, setdescription] = useState('');
  const [img1, setimg1] = useState('');
  const [previewprofile1, setpreviewprofile1] = useState('');
  const [showloader, setshowloader] = useState(false);
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setshowloader(true);
      formData.set('name', dharamshalaname);
      formData.set('image1', img1);
      formData.set('desc', description);
      axios.defaults.headers.post[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;

      const res = await axios.post(
        `${backendApiUrl}room/dharmashala`,

        formData,
      );

      if (res.data.data.status) {
        setOpen(false);
        setshowloader(false);
        Swal.fire('Great!', res.data.data.message, 'success');
      }
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
        <div className="cash-donation-container-innser">
          <form onSubmit={handlesubmit}>
            {lan ? (
              <>
                <div style={{ marginTop: '0.2rem' }}>
                  <label htmlFor="dharamshalaname">Dharanshala Name</label>
                  <input
                    style={{ width: '100%', marginTop: '0.2rem' }}
                    type="textarea"
                    id="dharamshalaname"
                    placeholder="enter the description"
                    className="forminput_add_user10"
                    value={dharamshalaname}
                    name="dharamshalaname"
                    onChange={(e) => setdharamshalaname(e.target.value)}
                  />
                </div>
                <div style={{ marginTop: '1.2rem' }}>
                  <label htmlFor="fromNo">Dharamshala Description</label>
                  <textarea
                    style={{
                      width: '99.8%',
                      marginTop: '0.2rem',
                      height: '100px',
                    }}
                    id="fromNo"
                    placeholder="enter the description"
                    className="forminput_add_user10"
                    value={description}
                    name="description"
                    onChange={(e) => setdescription(e.target.value)}
                  />
                </div>
              </>
            ) : (
              <>
                <div style={{ marginTop: '0.2rem' }}>
                  <label htmlFor="dharamshalaname">Dharanshala Name</label>
                  <ReactTransliterate
                    placeholder="enter the description"
                    style={custumstyle}
                    id="full-name"
                    required
                    value={dharamshalaname}
                    onChangeText={(dharamshalaname) => {
                      setdharamshalaname(dharamshalaname);
                    }}
                    onChange={(e) => setdharamshalaname(e.target.value)}
                    lang="hi"
                  />
                </div>
                <div style={{ marginTop: '1.2rem' }}>
                  <label htmlFor="fromNo">Dharamshala Description</label>
                  <ReactTransliterate
                    placeholder="enter the description"
                    style={custumstyle}
                    id="full-name"
                    required
                    value={description}
                    onChangeText={(description) => {
                      setdescription(description);
                    }}
                    onChange={(e) => setdescription(e.target.value)}
                    lang="hi"
                  />
                </div>
              </>
            )}

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '100%',
                flexDirection: 'column',
              }}
            >
              {previewprofile1 ? (
                <>
                  <div className="main_img_divvvv">
                    <img className="dharamshala_imgggg" src={previewprofile1} />
                  </div>
                </>
              ) : (
                <>
                  <div className="main_img_divvvv">
                    <img src={camera} />
                  </div>
                </>
              )}

              <div className="formdivvv_imf">
                <input
                  type="file"
                  onChange={(e) => {
                    setimg1(e.target.files[0]);
                    console.log(e.target.files[0]);
                    setpreviewprofile1(URL.createObjectURL(e.target.files[0]));
                  }}
                />
              </div>
            </div>

            <div className="save-div-btn">
              <button className="save-div-btn-btn">
                {showloader ? (
                  <CircularProgress
                    style={{
                      width: '21px',
                      height: '21px',
                      color: 'white',
                    }}
                  />
                ) : (
                  'Save'
                )}
              </button>
              <button
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

export default AddForm;
