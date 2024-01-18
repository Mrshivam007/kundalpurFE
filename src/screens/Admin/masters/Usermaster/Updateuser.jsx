import React, { useState, useEffect } from 'react';
import { backendApiUrl } from '../../../../config/config';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
function Updateuser({ userdata, handleClose }) {
  const location = useLocation();
  const navigation = useNavigate();
  const [isData, setisData] = React.useState(null);
  const [name, setname] = useState(isData?.name);
  const [mobile, setmobile] = useState('');
  const [password, setpassword] = useState('');
  const [email, setemail] = useState('');
  const [address, setaddress] = useState('');

  const submitHandler = async () => {
    try {
      axios.defaults.headers.put[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;
      const { data } = await axios.put(`${backendApiUrl}admin/get-users`, {
        id: isData?.id,
        mobile: mobile,
        email: email,
        name: name,
        password: password,
      });

      if (data.status === true) {
        Swal.fire('Great!', data.msg, 'success');
        handleClose();
      }
      console.log(data);
    } catch (error) {
      Swal.fire('Error!', 'Not upadate user', 'error');
    }
  };
  useEffect(() => {
    if (userdata) {
      setisData(userdata);
      setname(userdata.name);
      setaddress(userdata.address);
      setemail(userdata.email);
      setmobile(userdata.mobileNo);
    } else {
      navigation('/admin-panel/master');
    }
  }, []);

  console.log(isData?.id);
  return (
    <>
      <div>
        <div className="add-div-close-div">
          <h2 clssName="add_text_only">Add New User</h2>
          <CloseIcon onClick={() => handleClose()} />
        </div>

        <div className="flex_div_main_add_user">
          <div className="main-input-div1">
            <div className="inner-input-divadd">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                text="text"
                name="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </div>
            <div className="inner-input-divadd">
              <label htmlFor="phone">Mobile Number</label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={mobile}
                onChange={(e) => setmobile(e.target.value)}
              />
            </div>
          </div>
          <div className="main-input-div1">
            <div className="inner-input-divadd">
              <label htmlFor="email">Email</label>
              <input
                text="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="inner-input-divadd">
              <label htmlFor="password">Password</label>
              <input
                text="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="save-div-btn">
          <button onClick={() => submitHandler()} className="save-div-btn-btn">
            Update User
          </button>
          <button
            onClick={() => handleClose()}
            className="save-div-btn-btn-cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default Updateuser;
