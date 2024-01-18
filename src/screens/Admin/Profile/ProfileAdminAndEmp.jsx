import React, { useState, useEffect } from 'react';
import profileimgs from '../../../assets/profileimg.jpg';
import { useNavigate } from 'react-router-dom';
import { backendApiUrl } from '../../../config/config';
import Swal from 'sweetalert2';
import axios from 'axios';
import './ProfileAdminAndEmp.css';
import CircularProgress from '@material-ui/core/CircularProgress';
const formData = new FormData();
function ProfileAdminAndEmp({ setOpen4 }) {
  const navigate = useNavigate();

  const [name, setname] = useState('');
  const [mobile, setmobile] = useState('');
  const [email, setemail] = useState('');
  const [userrole, setuserrole] = React.useState('');
  const [address, setaddress] = useState('');
  const [profile_image, setprofile_image] = useState('');
  const [previewprofile, setpreviewprofile] = useState('');
  const [profileimg, setprofileimg] = useState('');
  const [showloader, setshowloader] = useState(false);
  const adminprofile = async () => {
    axios.defaults.headers.get[
      'Authorization'
    ] = `Bearer ${sessionStorage.getItem('token')}`;

    const res = await axios.get(`${backendApiUrl}admin/update-admin-prof`);

    setname(res.data.data.name);
    setemail(res.data.data.email);
    setaddress(res.data.data.Address);
    setmobile(res.data.data.mobileNo);

    console.log('profile admin', res);
  };

  const empprofile = async () => {
    axios.defaults.headers.get[
      'Authorization'
    ] = `Bearer ${sessionStorage.getItem('token')}`;

    const res = await axios.get(`${backendApiUrl}admin/update-employee-prof`);

    console.log('profile employee', res.data.data);
    setname(res.data.data.Username);
    setemail(res.data.data.Email);
    setaddress(res.data.data.Address);
    setmobile(res.data.data.Mobile);
  };

  const submitHandler = async () => {
    try {
      setshowloader(true);
      if (userrole === 1) {
        formData.set('name', name);
        formData.set('mobile', mobile);
        formData.set('email', email);
        formData.set('address', address);
        formData.set('profile_image', profile_image);

        axios.defaults.headers.put[
          'Authorization'
        ] = `Bearer ${sessionStorage.getItem('token')}`;
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
        const res = await axios.put(
          `${backendApiUrl}admin/update-admin-prof`,
          formData,
          config,
        );

        console.log(res.data.data);
        if (res.data.data.status) {
          setshowloader(true);
          Swal.fire('Great!', res.data.data.message, 'success');
          setOpen4(false);
        }
      }

      if (userrole === 3) {
        axios.defaults.headers.put[
          'Authorization'
        ] = `Bearer ${sessionStorage.getItem('token')}`;
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };

        formData.set('profile_image', profile_image);
        const res = await axios.put(
          `${backendApiUrl}admin/update-employee-prof`,

          formData,
          config,
        );

        console.log(res.data.data);
        if (res.data.data.status) {
          Swal.fire('Great!', res.data.data.message, 'success');
          setOpen4(false);
          setshowloader(true);
        }
      }
    } catch (error) {
      Swal.fire('Error!', error.response.data.message, 'error');
      setOpen4(false);
      setshowloader(true);
    }
  };
  console.log('url', profileimg);

  if (userrole === 1) {
    adminprofile();
  }
  if (userrole === 3) {
    empprofile();
  }

  useEffect(() => {
    // if (user) {
    //   setname(user?.name);
    //   setaddress(user?.address);
    //   setemail(user?.email);
    //   setmobile(user?.mobileNo);
    //   setanniversary_date(user?.anniversary_date);
    //   setdob(user?.dob);
    //   setprofileimg(`${backendUrl}uploads/images/${user?.profile_image}`);
    // }

    setuserrole(Number(sessionStorage.getItem('userrole')));
  }, []);

  return (
    <>
      <div>
        <div
          className="main-inear-prifile-div"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <div className="right-inear-div-profile">
            <div className="upload-profile-div-main">
              <input
                className="adminprofile_input"
                type="file"
                name="profile"
                onChange={(e) => {
                  setprofile_image(e.target.files[0]);
                  console.log(e.target.files[0]);
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
            <div className="adminprofile_input">
              <label htmlFor="name">Full Name</label>
              <input
                type="name"
                id="name"
                name="name"
                placeholder="enter name"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </div>
            <div className="adminprofile_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="enter email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div>
              <div className="adminprofile_input">
                <label htmlFor="mobile">Mobile Number</label>
                <input
                  type="mobile"
                  id="mobile"
                  name="mobile"
                  placeholder="enter phone"
                  value={mobile}
                  onChange={(e) => setmobile(e.target.value)}
                />
              </div>
              <div className="adminprofile_input">
                {userrole === 1 ? (
                  <></>
                ) : (
                  <>
                    <label htmlFor="address">Address</label>
                    <input
                      type="address"
                      id="address"
                      name="address"
                      placeholder="enter address"
                      value={address}
                      onChange={(e) => setaddress(e.target.value)}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
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
              'Update'
            )}
          </button>
          <button
            onClick={() => setOpen4(false)}
            className="save-div-btn-btn-cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default ProfileAdminAndEmp;
