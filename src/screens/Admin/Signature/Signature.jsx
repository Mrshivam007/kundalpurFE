import React, { useEffect, useState } from 'react';
import { backendApiUrl } from '../../../config/config';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
const formData = new FormData();
import './Signature.css';
function Signature({ setOpen3 }) {
  const [sign, setsign] = useState('');
  const [showloader, setshowloader] = useState(false);
  const [userrole, setuserrole] = React.useState('');
  const submitHandler = async () => {
    try {
      setshowloader(true);
      if (!sign) {
        Swal.fire('Error!', 'please select signature', 'error');
        setOpen3(false);
        setshowloader(false);
      }
      formData.set('sign', sign);

      axios.defaults.headers.put[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      if (userrole === 1) {
        const res = await axios.put(
          `${backendApiUrl}admin/signature-upload`,
          formData,
          config,
        );

        if (res.data.status) {
          setOpen3(false);
          setshowloader(false);
          Swal.fire('Great!', res.data.msg, 'success');
        }
      }
      if (userrole === 3) {
        const res = await axios.put(
          `${backendApiUrl}admin/signature-upload-emplo`,
          formData,
          config,
        );

        if (res.data.status) {
          setOpen3(false);
          setshowloader(false);
          Swal.fire('Great!', res.data.msg, 'success');
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    setuserrole(Number(sessionStorage.getItem('userrole')));
  }, []);
  return (
    <>
      <div className="adminprofile_input">
        <input
          type="file"
          name="sign"
          onChange={(e) => {
            setsign(e.target.files[0]);
            console.log(e.target.files[0]);
          }}
        />
      </div>

      <div className="save-div-btn">
        <button onClick={() => submitHandler()} className="save-div-btn-btn">
          {showloader ? (
            <CircularProgress
              style={{
                width: '21px',
                height: '21px',
                color: '#FA7401',
              }}
            />
          ) : (
            'Upload'
          )}
        </button>
        <button
          onClick={() => setOpen3(false)}
          className="save-div-btn-btn-cancel"
        >
          Cancel
        </button>
      </div>
    </>
  );
}

export default Signature;
