import React, { useState, useEffect } from 'react';
import camera from '../../../../assets/camera.png';
import Swal from 'sweetalert2';
import { backendApiUrl } from '../../../../config/config';
import axios from 'axios';
import { ReactTransliterate } from 'react-transliterate';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MenuItem, Select, Box, Typography } from '@mui/material';
import { serverInstance } from '../../../../API/ServerInstance';
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

function Updatedharmshala({ setOpen, updatedata }) {
  const [fromdate, setfromdate] = useState('');
  const [todate, settodate] = useState('');
  const [showloader, setshowloader] = useState(false);
  console.log("update data is ",updatedata);
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setshowloader(true);
      const data = {
        id:updatedata?.id,
        dharamshala: updatedata?.dharamshala,
        fromDate: fromdate,
        toDate: todate,
      };
      axios.defaults.headers.put[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;

      const res = await axios.put(
        `${backendApiUrl}admin/edit-disableDharamshala`,
        data,
      );

      console.log('res is', res?.data);

      if (res?.data?.status) {
        setOpen(false);
        setshowloader(false);
        Swal.fire('Great!', res?.data?.msg, 'success');
      }
    } catch (error) {
      Swal.fire('Error!', error, 'error');
    }
  };
  const [dharamshalalist, setdharamshalalist] = useState('');
  const [dharamname, setdharamname] = useState('');
  const getalldharamshala = () => {
    serverInstance('room/get-dharmasalas', 'get').then((res) => {
      console.log('dharmshala', res.data);
      if (res.data) {
        setdharamshalalist(res.data);
      }
    });
  };
  useEffect(() => {
    getalldharamshala();
    if (updatedata) {
      setfromdate(updatedata?.fromDate);
      settodate(updatedata?.toDate);
      // setdharamname(updatedata?.dharamshalaName);
    }
  }, []);

  return (
    <>
      <div className="cash-donation-div">
        <div className="cash-donation-container-innser">
          <form onSubmit={handlesubmit}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div
                style={{
                  marginTop: '0.2rem',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <label htmlFor="dharamshalaname">From Date</label>
                <input
                  style={{ width: '15rem', marginTop: '0.2rem' }}
                  type="date"
                  id="dharamshalaname"
                  className="forminput_add_user10"
                  value={fromdate}
                  name="fromdate"
                  onChange={(e) => setfromdate(e.target.value)}
                />
              </div>
              <div
                style={{
                  marginTop: '0.2rem',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <label htmlFor="dharamshalaname">To Date</label>
                <input
                  style={{ width: '15rem', marginTop: '0.2rem' }}
                  type="date"
                  id="dharamshalaname"
                  className="forminput_add_user10"
                  value={todate}
                  name="todate"
                  onChange={(e) => settodate(e.target.value)}
                />
              </div>
              {/* <div
                style={{
                  marginTop: '0.2rem',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <label htmlFor="dharamshalaname">Dharanshala</label>

                <Select
                  id="donation-type"
                  required
                  sx={{
                    width: '266px',
                    fontSize: 14,
                    '& .MuiSelect-select': {
                      padding: '10px 0px 10px 10px',
                      background: '#fff',
                    },
                  }}
                  value={dharamname}
                  className="forminput_add_user10"
                  name="dharamname"
                  onChange={(e) => {
                    setdharamname(e.target.value);
                  }}
                  displayEmpty
                >
                  <MenuItem
                    sx={{
                      fontSize: 14,
                    }}
                    value=""
                  >
                    Please select
                  </MenuItem>
                  {dharamshalalist
                    ? dharamshalalist.map((item, index) => {
                        return (
                          <MenuItem
                            sx={{
                              fontSize: 14,
                            }}
                            key={item?.dharmasala_id}
                            value={item?.name}
                          >
                            {item?.name}
                          </MenuItem>
                        );
                      })
                    : ''}
                </Select>
              </div> */}
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
                  'Update'
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

export default Updatedharmshala;
