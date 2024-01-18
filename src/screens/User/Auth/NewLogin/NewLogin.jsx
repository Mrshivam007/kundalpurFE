import { useState } from 'react';
import './NewLogin.scss';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../../assets/sideimg.jpeg';
import OtpVerify from './OtpVerify';
import { useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  LoginwithOtp,
  VerifyOtp,
} from '../../../../Redux/redux/action/AuthAction';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useAuth } from '../../../../Context/AuthContext';
import { useJwt } from 'react-jwt';

const VivekPLogin = () => {
  const [verify, setVerify] = useState(false);
  const [mobileNo, setMobileNo] = useState('');
  const [showalert, setshowalert] = useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const auth = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setshowalert(true);
    if (!mobileNo) {
      Swal.fire('Error!', 'please enter mobile no.', 'error');
      return false;
    }
    if (mobileNo.length !== 10) {
      Swal.fire('Error!', 'please enter valid mobile no.', 'error');
      return false;
    }
    setVerify(true);
    setMobileNo(mobileNo);
    dispatch(
      LoginwithOtp({ mobile_no: mobileNo }, (res) => {
        console.log(res);
        if (res.status === 1) {
          Swal.fire('Great!', 'OTP Sent Successfully', 'success');
          setVerify(true);
          setMobileNo(mobileNo);
          setshowalert(false);
        } else {
          Swal.fire('Error!', res.message, 'error');
        }
      }),
    );
  };

  const handleVerify = (otp) => {
    dispatch(
      VerifyOtp({ username: mobileNo?.toString(), otp: otp }, (res) => {
        if (res.user) {
          sessionStorage.setItem('token', res.tokens.access.token);
          auth.setUser(res.tokens.access.token);

          if (sessionStorage.getItem('redirectto')) {
            Swal.fire('Great!', 'You Have Login Successfully', 'success');
            navigation('/roombooking');
            sessionStorage.removeItem('redirectto');
          } else {
            Swal.fire('Great!', 'You Have Login Successfully', 'success');
            navigation('/donation');
          }

          setMobileNo('');
        }
        if (res.message) {
          Swal.fire('Error!', res.message, 'error');
        }
      }),
    );
  };

  const MoNumberInput = () => {
    return (
      <div className="mainlogin-div">
        <img className="img-container" src={logo} alt="logo " />
        <form onSubmit={handleSubmit} className="login-form">
          <div className="heading">Login</div>
          <div className="button-container">
            <Link to="/login"className="disableBtn">
              Email
            </Link>
            <button
              className="pl-button pl-button--active"
              id="secondary-button"
            >
              Phone Number
            </button>
          </div>

          <div className="input-group">
            <label htmlFor="mobileNo">Phone</label>
            <input
              className="remove_underline"
              required
              type="text"
              id="mobileNo"
              name="mobileNo"
              placeholder="Enter Mobile No"
              autoFocus
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
            />
          </div>

          <div className="input-group">
            <button type="submit" className="login-btn">
              Send OTP
            </button>
          </div>

          <span className="newusertag">New to kundalpur</span>
          <Link to="/register" className="creatbtn">
            Create Account
          </Link>
        </form>
      </div>
    );
  };
  return (
    <>
      {!verify ? (
        <MoNumberInput />
      ) : (
        <OtpVerify
          title={'Login'}
          description={'We have send the OTP to your mobile number'}
          handleVerify={handleVerify}
          mobileNo={mobileNo}
        />
      )}
    </>
  );
};

export default VivekPLogin;
