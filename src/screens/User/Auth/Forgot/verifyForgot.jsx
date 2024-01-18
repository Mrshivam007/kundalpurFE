import { useState } from 'react';
import OtpInput from 'react-otp-input';
import axios from 'axios';
import { backendApiUrl } from '../../../../config/config';
import Swal from 'sweetalert2';
import logo from '../../../../assets/sideimg.jpeg';
import { useNavigate } from 'react-router-dom';
const verifyForgot = ({ title, description, mobileNo }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');

  const handleVerify = async (otp) => {
    const { data } = await axios.post(
      `${backendApiUrl}user/verify-otp-forgot`,
      {
        username: mobileNo,
        otp: otp,
      },
    );

    if (data.status) {
      Swal.fire('Great!', data.message, 'success');
      console.log('otp verify res is ', data);
      navigate('/forgetpassword', {
        state: {
          data: data,
        },
      });
    }
  };
  return (
    <div className="mainlogin-div">
      <img className="img-container" src={logo} alt="logo " />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (otp.length < 6) return;
          handleVerify(otp);
        }}
        className="verify-form"
      >
        <div className="verify-heading">{title}</div>
        <div className="verify-desc">{description}</div>
        <div className="mobile-no">{mobileNo}</div>
        <div className="input-group">
          <label htmlFor="otp">OTP</label>
          <OtpInput
            id="otp"
            value={otp}
            className=""
            onChange={setOtp}
            numInputs={6}
            containerStyle="otp-container"
            inputStyle="otp-input"
            separator={<span style={{ margin: '0.2rem' }}> </span>}
          />
        </div>

        <div className="verify-btn-container">
          <button type="submit" className="verify-btn">
            Verify
          </button>
        </div>
      </form>
    </div>
  );
};

export default verifyForgot;
