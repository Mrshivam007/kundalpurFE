import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { backendApiUrl } from '../../../config/config';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import './ChangePassword.css';
function ChangePassword() {
  const [oldpassword, setoldpassword] = useState('');
  const [newpassword, setnewpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [formerror, setFormerror] = useState({});

  const [showprocess, setshowprocess] = useState(false);
  const [showonldpassword, setshowonldpassword] = useState(false);
  const [shownewpassword, setshownewpassword] = useState(false);
  const [showconfirmpassword, setshowconfirmpassword] = useState(false);
  const handlesubmit = async (e) => {
    try {
      setshowprocess(true);
      e.preventDefault();
      setFormerror(validate(oldpassword, newpassword, confirmpassword));

      axios.defaults.headers.post[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;

      const res = await axios.post(
        `${backendApiUrl}user/user-forgot-password`,

        {
          oldpassword: oldpassword,
          newPassword: confirmpassword,
        },
      );
      console.log(donationdata);

      if (res.data.status === true) {
        Swal.fire('Great!', res.data.msg, 'success');
        setshowprocess(false);
      }
    } catch (error) {
      Swal.fire('Error!', error.response.data.message, 'error');
      setshowprocess(false);
    }
  };

  const validate = (oldpassword, newpassword, confirmpassword) => {
    const errors = {};

    if (!oldpassword) {
      errors.oldpassword = 'Please old password';
    }
    if (newpassword != confirmpassword) {
      errors.confirm = 'Password not match';
    }

    return errors;
  };

  return (
    <>
      <div className="mainbghomediv">
        <div className="main_change_password">
          <div lassName="main_change_password_content">
            <form onSubmit={handlesubmit}>
              <div>
                <div
                  // className={
                  //   formerror.Remark
                  //     ? "inner-input-div-input-red"
                  //     : "inner-input-div"
                  // }

                  className="inner-input-divforget"
                >
                  <label>Old Password</label>
                  <input
                    type={showonldpassword ? 'text' : 'password'}
                    name="oldpassword"
                    placeholder="Enter Old Password"
                    value={oldpassword}
                    onChange={(e) => setoldpassword(e.target.value)}
                  />
                  <p style={{ color: 'red', marginTop: '5px' }}>
                    {formerror.oldpassword}
                  </p>

                  <li
                    className="showpassworddsignup1"
                    onClick={() => setshowonldpassword(!showonldpassword)}
                  >
                    {showonldpassword ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </li>
                </div>
                <div
                  // className={
                  //   formerror.Remark
                  //     ? "inner-input-div-input-red"
                  //     : "inner-input-div"
                  // }

                  className="inner-input-divforget"
                >
                  <label>New Password</label>
                  <input
                    type={shownewpassword ? 'text' : 'password'}
                    name="newpassword"
                    placeholder="Enter New Password"
                    value={newpassword}
                    onChange={(e) => setnewpassword(e.target.value)}
                  />
                  <p style={{ color: 'red', marginTop: '5px' }}>
                    {formerror.confirm}
                  </p>
                  <li
                    className="showpassworddsignup20"
                    onClick={() => setshownewpassword(!shownewpassword)}
                  >
                    {shownewpassword ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </li>
                </div>

                <div
                  // className={
                  //   formerror.Remark
                  //     ? "inner-input-div-input-red"
                  //     : "inner-input-div"
                  // }

                  className="inner-input-divforget"
                >
                  <label>Confirm Password</label>
                  <input
                    type={showconfirmpassword ? 'text' : 'password'}
                    name="confirmpassword"
                    placeholder="Enter Confirm Password"
                    value={confirmpassword}
                    onChange={(e) => setconfirmpassword(e.target.value)}
                  />
                  <p style={{ color: 'red', marginTop: '5px' }}>
                    {formerror.confirm}
                  </p>
                  <li
                    className="showpassworddsignup3"
                    onClick={() => setshowconfirmpassword(!showconfirmpassword)}
                  >
                    {showconfirmpassword ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </li>
                </div>
              </div>
              <div className="opt_div_text">
                <p>The minimum Password age is 1</p>
                <p>The maximum Password age is 45</p>
                <p>No of Password remembered is 24</p>
                <p>The Password complexity property is enabled</p>
              </div>
              <div className="btn_div_change_password">
                <button className="ChangePassword_btn">
                  {' '}
                  {showprocess ? (
                    <CircularProgress
                      style={{ width: '21px', height: '21px' }}
                    />
                  ) : (
                    'Change Password'
                  )}{' '}
                </button>
                <button className="cancel_btn_password">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
