import { useState } from 'react';
import VerifyForgot from './verifyForgot';
import logo from '../../../../assets/sideimg.jpeg';
import axios from 'axios';
import { backendApiUrl } from '../../../../config/config';
import CircularProgress from '@material-ui/core/CircularProgress';
import Swal from 'sweetalert2';
import './forgot.scss';

const Forgot = () => {
  const [verify, setVerify] = useState(false);
  const [mobileNo, setmobileNo] = useState('');
  const [loading, setloading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const { data } = await axios.post(`${backendApiUrl}user/forgot-password`, {
      mobileNo: mobileNo,
    });

    if (data.status) {
      Swal.fire('Great!', data.message, 'success');
      console.log('password forget res is ', data);
      setVerify(true);
      setloading(false);
    }
    if (data.status === false) {
      setloading(false);
    }
  };

  const EmailInput = () => {
    return (
      <div className="mainlogin-div">
        <img className="img-container" src={logo} alt="logo " />

        <div className="forgot-container">
          <form onSubmit={handleSubmit} className="forgot-form">
            <div className="heading">Forget Password</div>
            <p>Enter the mobile no registered.</p>
            <div className="sendotp">
              <div className="input-group">
                <label htmlFor="mobileNo">Mobile No</label>
                <input
                  required
                  className="remove_underline"
                  name="mobileNo"
                  type="text"
                  id="mobileNo"
                  autoFocus
                  value={mobileNo}
                  onChange={(e) => setmobileNo(e.target.value)}
                  placeholder="Enter Mobile No"
                />
              </div>
            </div>

            <div className="input-group">
              <button type="submit" className="login-btn">
                {loading ? (
                  <CircularProgress style={{ width: '21px', height: '21px' }} />
                ) : (
                  'Continue'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  return (
    <>
      {!verify ? (
        <EmailInput />
      ) : (
        <VerifyForgot
          title={'Verification required'}
          description={
            "To continue, complete this verification step. We've sent an OTP to the email"
          }
          mobileNo={mobileNo}
        />
      )}
    </>
  );
};

export default Forgot;
