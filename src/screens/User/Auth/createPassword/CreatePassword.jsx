import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CreatePassword.scss';
import axios from 'axios';
import { backendApiUrl } from '../../../../config/config';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';
const CreatePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (password != confirmpassword) {
        Swal.fire('Error!', 'Must Match Both Password!!', 'error');
        return 0;
      }
      const { data } = await axios.post(
        `${backendApiUrl}user/changepass-forgot`,
        {
          token: location?.state?.data?.token,
          password: password,
        },
      );

      if (data.status) {
        Swal.fire('Great!', data.message, 'success');
        console.log('otp verify res is ', data);
        navigate('/login');
      }
    } catch (error) {
      Swal.fire('Great!', error?.response?.data?.message, 'success');
    }
  };

  useEffect(() => {
    console.log('params data is', location?.state?.data?.token);
  }, []);

  return (
    <div className="create-container">
      <form onSubmit={handleSubmit} className="create-form">
        <div className="heading">Create Password</div>
        <p>Password must have</p>
        <ul className="unorderlist">
          <li>have at least 8 character</li>
          <li>have at least one upper case</li>
          <li>have at least one special character (!, %, @, #, etc.)</li>
        </ul>
        <div className="sendotp">
          <div className="input-group">
            <label htmlFor="password">New Password</label>
            <input
              required
              type="text"
              name="password"
              id="password"
              placeholder="Enter New Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="conpassword">Confirm New Password</label>
            <input
              required
              type="text"
              name="conpassword"
              id="conpassword"
              placeholder="ERnter Confirn New Password"
              value={confirmpassword}
              onChange={(e) => setconfirmpassword(e.target.value)}
            />
          </div>
        </div>

        <div className="input-group">
          <button className="login-btn">Password Change</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePassword;
