import React, { useState, useEffect } from 'react';
import { backendApiUrl } from '../../../config/config';
import Swal from 'sweetalert2';
import axios from 'axios';
import './ChangePassword.css';
function ChangePassword({ setOpen5 }) {
  const [userrole, setuserrole] = React.useState('');
  const [oldpassword, setoldpassword] = useState('');
  const [newpassword, setnewpassword] = useState('');
  const [ConfirmPasswod, setConfirmPasswod] = useState('');

  const submitHandler = async () => {
    try {
      if (userrole === 1) {
        axios.defaults.headers.put[
          'Authorization'
        ] = `Bearer ${sessionStorage.getItem('token')}`;

        const res = await axios.put(`${backendApiUrl}admin/change-admin-pass`, {
          oldPass: oldpassword,
          newPass: newpassword,
        });

        console.log(res);
        if (res?.data?.status) {
          Swal.fire('Great!', res.data?.msg, 'success');
          setOpen5(false);
        }
      }

      if (userrole === 3) {
        console.log('clieh employe');
        axios.defaults.headers.put[
          'Authorization'
        ] = `Bearer ${sessionStorage.getItem('token')}`;

        const res = await axios.put(`${backendApiUrl}admin/change-pass`, {
          oldPass: oldpassword,
          newPass: newpassword,
        });

        console.log(res.data);

        if (res.data.status) {
          Swal.fire('Great!', res.data.msg, 'success');
          setOpen5(false);
        }
      }
    } catch (error) {
      Swal.fire('Error!', error.response.data.message, 'error');
      setOpen5(false);
    }
  };

  useEffect(() => {
    setuserrole(Number(sessionStorage.getItem('userrole')));
  }, []);

  return (
    <>
      <p className="password_warning">Password must have</p>
      <p className="password_warning">
        . have at least 8 characters
        <br />. have at least one uper case
        <br />. have at least one special character (!, %, @, #, etc.)
      </p>
      <div className="adminprofile_input">
        <label htmlFor="oldpassword">Old Password</label>
        <input
          style={{ width: '99%' }}
          type="text"
          id="oldpassword"
          name="oldpassword"
          placeholder="enter Old password"
          value={oldpassword}
          onChange={(e) => setoldpassword(e.target.value)}
        />
      </div>
      <div className="adminprofile_input">
        <label htmlFor="newpassword">New Password</label>
        <input
          style={{ width: '99%' }}
          type="text"
          id="newpassword"
          name="newpassword"
          placeholder="enter newpassword"
          value={newpassword}
          onChange={(e) => setnewpassword(e.target.value)}
        />
      </div>
      <div className="adminprofile_input">
        <label htmlFor="ConfirmPasswod">Confirm New Password</label>
        <input
          style={{ width: '99%' }}
          type="text"
          id="ConfirmPasswod"
          name="ConfirmPasswod"
          placeholder="enter confirm passwod"
          value={ConfirmPasswod}
          onChange={(e) => setConfirmPasswod(e.target.value)}
        />
      </div>
      <div className="save-div-btn">
        <button onClick={() => submitHandler()} className="save-div-btn-btn">
          Change password
        </button>
        <button
          onClick={() => setOpen5(false)}
          className="save-div-btn-btn-cancel"
        >
          Cancel
        </button>
      </div>
    </>
  );
}

export default ChangePassword;
