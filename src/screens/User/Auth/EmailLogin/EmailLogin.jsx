import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import jwt_decode from 'jwt-decode';
import logo from '../../../../assets/sideimg.jpeg';
import Swal from 'sweetalert2';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { backendApiUrl } from '../../../../config/config';
import './emaillogin.scss';

const initialState = {
  email: '',
  password: '',
};

const EmailLogin = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const [unchecked1, setunchecked1] = useState(true);
  const [unchecked2, setunchecked2] = useState(false);
  const [unchecked3, setunchecked3] = useState(false);
  const [showprocess, setshowprocess] = useState(false);
  const [showonldpassword, setshowonldpassword] = useState(false);
  const { email, password } = state;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setshowprocess(true);
      if (unchecked1) {
        const res = await axios.post(`${backendApiUrl}user/login`, {
          identity: email,
          password: password,
        });
        if (res.data.status) {
          setshowprocess(false);
          Swal.fire('Great!', 'You Have Login Successfully', 'success');
          var decoded = jwt_decode(res.data.tokens.access.token);

          if (decoded.role === 2) {
            if (sessionStorage.getItem('redirectto')) {
              navigate('/roombooking');
              sessionStorage.removeItem('redirectto');
            } else {
              navigate('/donation');
            }
          }

          sessionStorage.setItem('userrole', decoded.role);
          sessionStorage.setItem('token', res.data.tokens.access.token);
          auth.setUser(res.data.tokens.access.token);
        }
      }
      if (unchecked2) {
        const res = await axios.post(`${backendApiUrl}admin/login-employee`, {
          email: email,
          password: password,
        });
        console.log('empl', res.data.user);

        if (res.data.user) {
          setshowprocess(false);
          Swal.fire('Great!', 'You Have Login Successfully', 'success');
          var decoded = jwt_decode(res.data.tokens.access.token);

          if (decoded.role === 3) {
            navigate('/admin-panel/dashboard');
          }
          sessionStorage.setItem('userrole', decoded.role);
          sessionStorage.setItem('empName', res.data.user.username);
          sessionStorage.setItem('empRole', res.data.user.Role);
          sessionStorage.setItem('empRoleid', res.data.user.Rid);
          sessionStorage.setItem('empid', res.data.user.id);
          sessionStorage.setItem('adminSignature', res.data.user.signature);
          sessionStorage.setItem('token', res.data.tokens.access.token);
          auth.setUser(res.data.tokens.access.token);
        }
      }
      if (unchecked3) {
        const res = await axios.post(`${backendApiUrl}admin/login`, {
          username: email,
          password: password,
        });

        console.log('admin data', res);
        if (res.data.user) {
          setshowprocess(false);
          Swal.fire('Great!', 'You Have Login Successfully', 'success');
          var decoded = jwt_decode(res.data.tokens.access.token);
          if (decoded.role === 1) {
            navigate('/admin-panel/dashboard');
          }
          console.log(res.data);

          sessionStorage.setItem('adminName', res.data.user.name);
          sessionStorage.setItem('adminSignature', res.data.user.signature);
          sessionStorage.setItem('userrole', decoded.role);
          sessionStorage.setItem('adminprofile', res.data.user.profile_image);
          sessionStorage.setItem('token', res.data.tokens.access.token);
          auth.setUser(res.data.tokens.access.token);
        }
      }
    } catch (error) {
      Swal.fire('Error!', error.response.data.message, 'error');
      setshowprocess(false);
    }
  };
  return (
    <div className="mainlogin-div">
      <img className="img-container" src={logo} alt="logo " />
      <form onSubmit={handleSubmit} className="login-form">
        <div className="heading">Login</div>
        <div className="admin_radio">
          <div className="admin_radio_innear">
            <input
              id="adiovalue1"
              type="radio"
              name="radAnswer"
              checked={unchecked1}
              onClick={() => {
                setunchecked1(!unchecked1);
                setunchecked2(false);
                setunchecked3(false);
              }}
            />
            <label htmlFor="adiovalue1">Donator</label>
          </div>
          <div className="admin_radio_innear">
            <input
              id="adiovalue2"
              type="radio"
              name="radAnswer"
              checked={unchecked2}
              onClick={() => {
                setunchecked2(!unchecked2);
                setunchecked1(false);
                setunchecked3(false);
              }}
            />
            <label htmlFor="adiovalue2">Staff</label>
          </div>
          <div className="admin_radio_innear">
            <input
              id="adiovalue3"
              type="radio"
              name="radAnswer"
              checked={unchecked3}
              onClick={() => {
                setunchecked3(!unchecked3);
                setunchecked1(false);
                setunchecked2(false);
              }}
            />
            <label htmlFor="adiovalue3">Admin</label>
          </div>
        </div>
        {unchecked1 && (
          <>
            <div className="button-container">
              <Link
                to="/phonelogin"
                className="disableBtn"
                id="secondary-button"
              >
                Phone Number
              </Link>

              <button className="pl-button pl-button--active">Email</button>
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                className="remove_underline"
                required
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
                value={email}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                className="remove_underline"
                required
                type={showonldpassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Enter Password"
                value={password}
                onChange={handleInputChange}
              />
              <li
                className="showpassworddsignup2"
                onClick={() => setshowonldpassword(!showonldpassword)}
              >
                {showonldpassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </li>
            </div>
            <Link to="/forgot" className="forget-link">
              {'Forgot Password ?'}
            </Link>
            <div className="input-group">
              <button className="login-btn">
                {showprocess ? (
                  <CircularProgress style={{ width: '21px', height: '21px' }} />
                ) : (
                  'Login'
                )}
              </button>
            </div>
            <span className="newusertag">New to kundalpur</span>
            <Link to="/register" className="creatbtn">
              Create Account
            </Link>
          </>
        )}
        {unchecked3 && (
          <>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                className="remove_underline"
                required
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
                value={email}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                className="remove_underline"
                required
                type={showonldpassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Enter Password"
                value={password}
                onChange={handleInputChange}
              />
              <li
                className="showpassworddsignup2"
                onClick={() => setshowonldpassword(!showonldpassword)}
              >
                {showonldpassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </li>
            </div>
            <div className="input-group">
              <button className="login-btn">
                {showprocess ? (
                  <CircularProgress style={{ width: '21px', height: '21px' }} />
                ) : (
                  'Login'
                )}
              </button>
            </div>
          </>
        )}

        {unchecked2 && (
          <>
            <div className="input-group">
              <label htmlFor="email">UserName</label>
              <input
                className="remove_underline"
                required
                type="test"
                id="email"
                name="email"
                placeholder="Enter Username"
                value={email}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                className="remove_underline"
                required
                type={showonldpassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Enter Password"
                value={password}
                onChange={handleInputChange}
              />
              <li
                className="showpassworddsignup2"
                onClick={() => setshowonldpassword(!showonldpassword)}
              >
                {showonldpassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </li>
            </div>
            <div className="input-group">
              <button className="login-btn">
                {' '}
                {showprocess ? (
                  <CircularProgress style={{ width: '21px', height: '21px' }} />
                ) : (
                  'Login'
                )}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default EmailLogin;
