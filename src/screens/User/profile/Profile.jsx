import React, { useState, useEffect } from 'react';
import profileimgs from '../../../assets/profileimg.jpg';
import { updateProfile } from '../../../Redux/redux/action/AuthAction';
import { backendUrl, backendApiUrl } from '../../../config/config';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from '../../../Redux/redux/action/AuthAction';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import './Profile.css';
const formData = new FormData();
function Profile() {
  const dispatch = useDispatch();
  const [name, setname] = useState('');
  const [mobile, setmobile] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [dob, setdob] = useState('');
  const [anniversary_date, setanniversary_date] = useState('');
  const [address, setaddress] = useState('');
  const [profile_image, setprofile_image] = useState('');
  const [previewprofile, setpreviewprofile] = useState('');
  const [profileimg, setprofileimg] = useState('');
  const [signature, setsignature] = useState('');
  const [showloader, setshowloader] = useState(false);
  const { user } = useSelector((state) => state.userReducer);
  console.log(user);
  const submitHandler = async (e) => {
    try {
      setshowloader(true);
      e.preventDefault();

      formData.set('name', name);
      formData.set('mobile', mobile);
      formData.set('email', email);
      formData.set('password', password);
      formData.set('dob', dob);
      formData.set('anniversary_date', anniversary_date);
      formData.set('address', address);
      formData.set('profile_image', profile_image);
      formData.set('sign', signature);
      axios.defaults.headers.post[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const res = await axios.post(
        `${backendApiUrl}user/update-profile`,

        formData,
        config,
      );

      if (res.data.status) {
        Swal.fire('Great!', res.data.msg, 'success');
        dispatch(loadUser());
        setshowloader(false);
      }
    } catch (error) {
      Swal.fire('Error!', error.response.data.message, 'error');
      setshowloader(false);
    }
  };
  console.log('url', profileimg);
  useEffect(() => {
    if (user) {
      setname(user?.name);
      setaddress(user?.address);
      setemail(user?.email);
      setmobile(user?.mobileNo);
      setanniversary_date(
        new Date(user && user?.anniversary_date).toISOString().substring(0, 10),
      );
      setdob(new Date(user?.dob).toISOString().substring(0, 10));
      setprofileimg(`${backendUrl}uploads/images/${user?.profile_image}`);
    }
  }, []);

  return (
    <>
      <div className="Profile-main-div">
        <div>
          <form onSubmit={submitHandler}>
            <div className="main-inear-prifile-div">
              <div className="left-inear-div-profile">
                <h2>Complete your Profile</h2>
              </div>

              <div className="right-inear-div-profile">
                <div className="upload-profile-div-main">
                  <input
                    type="file"
                    name="profile"
                    onChange={(e) => {
                      setprofile_image(e.target.files[0]);

                      setpreviewprofile(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                  <div className="profile-img-div">
                    <img
                      src={
                        previewprofile
                          ? previewprofile
                          : profileimg
                          ? profileimg
                          : profileimgs
                      }
                      alt="profileimg"
                    />
                  </div>
                  <p>Upload Photo</p>
                </div>
              </div>
            </div>
            <div className="form-main-div-profile">
              <div>
                <div className="input-group-profile">
                  <label htmlFor="mobile">Mobile Number</label>
                  <input
                    type="mobile"
                    id="mobile"
                    name="mobile"
                    placeholder="Enter Phone"
                    value={mobile}
                    onChange={(e) => setmobile(e.target.value)}
                  />
                </div>
                <div className="input-group-profile">
                  <label htmlFor="address">Address</label>
                  <input
                    type="address"
                    id="address"
                    name="address"
                    placeholder="Enter Address"
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                  />
                </div>
                <div className="input-group-profile">
                  <label htmlFor="dob">Date of Birth </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    placeholder="Enter DOB"
                    value={dob}
                    onChange={(e) => setdob(e.target.value)}
                  />
                </div>

                <div className="profile-img-div1">
                  <img
                    src={
                      user?.signature
                        ? `${backendUrl}uploads/images/${user?.signature}`
                        : ''
                    }
                    alt="profileimg"
                  />
                </div>
              </div>
              <div>
                <div>
                  <div className="input-group-profile">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="name"
                      id="name"
                      name="name"
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                    />
                  </div>
                  <div className="input-group-profile">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                    />
                  </div>
                  <div className="input-group-profile">
                    <label htmlFor="anniversary_date">Anniversary date</label>
                    <input
                      type="date"
                      id="anniversary_date"
                      name="anniversary_date"
                      placeholder="Enter Anniversary"
                      value={anniversary_date}
                      onChange={(e) => setanniversary_date(e.target.value)}
                    />
                  </div>
                </div>
                <div className="input-group-profile">
                  <label htmlFor="signature">Upload Signature</label>
                  <input
                    type="file"
                    name="signature"
                    onChange={(e) => {
                      setsignature(e.target.files[0]);
                      console.log(e.target.files[0]);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="save-btn-profile-div">
              <button className="save-btn-profile">
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
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Profile;
