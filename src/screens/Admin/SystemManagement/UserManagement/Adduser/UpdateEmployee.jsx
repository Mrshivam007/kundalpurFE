import React, { useState, useEffect } from 'react';
import { backendApiUrl } from '../../../../../config/config';
import Swal from 'sweetalert2';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Adduser.css';

const empRoles = {
  Administrator: 0,
  'Donation And Booking': 1,
  'Room Booking': 2,
  Accounts: 3,
  Store: 4,
  'Super Admin': 5,
  'Manual Donation': 6,
  'Elect Donation': 7,
  'Vehicle Pass': 8,
  Boli: 9,
  Directory: 10,
};

const empRolesReverse = {
  0: 'Administrator',
  1: 'Donation And Booking',
  2: 'Room Booking',
  3: 'Accounts',
  4: 'Store',
  5: 'Super Admin',
  6: 'Manual Donation',
  7: 'Elect Donation',
  8: 'Vehicle Pass',
  9: 'Boli',
  10: 'Directory',
};
const UpdateEmployee = ({ setOpen, empdata }) => {
  const [username, setusername] = useState('');
  const [mobile, setmobile] = useState('');
  const [password, setpassword] = useState('');
  const [email, setemail] = useState('');
  const [address, setaddress] = useState('');
  const [role, setrole] = useState('');
  const [status, setstatus] = useState(null);
  const [showloader, setshowloader] = useState(false);
  const [showroleoption, setshowroleoption] = useState(false);
  const [manualDonation, setmanualDonation] = useState(false);
  const [donation, setdonation] = useState(false);
  const [roomBooking, setroomBooking] = useState(false);
  const [boli, setboli] = useState(false);
  const [vehiclePass, setvehiclePass] = useState(false);
  const [materialpass, setmaterialpass] = useState(false);
  const [store, setstore] = useState(false);
  const [expence, setexpence] = useState(false);
  const [directory, setdirectory] = useState(false);
  const [hr, sethr] = useState(false);
  const [adminrole, setadminrole] = useState(false);
  const [approver, setApprover] = useState(false)
  const [onlychequeandElectronic, setonlychequeandElectronic] = useState(false);

  console.log('approver', empdata);
  const handlesubmit = async () => {
    try {
      setshowloader(true);

      axios.defaults.headers.put[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;
      if (username) {
        const res = await axios.put(`${backendApiUrl}admin/add-employee`, {
          id: empdata?.id,
          Username: username,
          Mobile: mobile,
          Email: email,
          Address: address,
          Password: password,
          Role: role,
          Rid: empRoles[role],
          Status: status,
          approver: approver,
          manualDonation: adminrole === true ? false : manualDonation,
          electronicDonation: adminrole === true ? false : donation,
          roomBooking: adminrole === true ? false : roomBooking,
          boli: adminrole === true ? false : boli,
          vehiclePass: adminrole === true ? false : vehiclePass,
          materialPass: adminrole === true ? false : materialpass,
          store: adminrole === true ? false : store,
          expense: adminrole === true ? false : expence,
          directory: adminrole === true ? false : directory,
          hr: adminrole === true ? false : hr,
          admin: adminrole,
          donation: adminrole === true ? false : onlychequeandElectronic,
        });
        console.log(res.data);
        if (res.data.status === true) {
          setshowloader(false);
          Swal.fire('Great!', res.data.message, 'success');
          setOpen(false);
        }
        if (res.data.status === false) {
          Swal.fire('Error!', res.data.message, 'error');
          setOpen(false);
          setshowloader(false);
        }
      }
    } catch (error) {
      Swal.fire('Error!', error.response.data.message, 'error');
      setOpen(false);
      setshowloader(false);
    }
  };

  useEffect(() => {
    if (empdata) {
      setusername(empdata?.Username);
      setmobile(empdata?.Mobile);
      setaddress(empdata?.Address);
      setemail(empdata?.Email);
      setrole(empdata?.Role);
      setstatus(empdata?.Status);
      setmanualDonation(empdata?.manualDonation);
      setdonation(empdata?.electronicDonation);
      setroomBooking(empdata?.roomBooking);
      setboli(empdata?.boli);
      setApprover(empdata?.approver);
      setvehiclePass(empdata?.vehiclePass);
      setmaterialpass(empdata?.materialPass);
      setstore(empdata?.store);
      setexpence(empdata?.expense);
      setdirectory(empdata?.directory);
      sethr(empdata?.hr);
      setonlychequeandElectronic(empdata?.donation);
      setadminrole(empdata?.admin);
    }
  }, []);
  return (
    <>
      <div className="cash-donation-di">
        {showroleoption ? (
          <>
            <div
              style={{
                width: '25rem',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <input
                  type="checkbox"
                  checked={manualDonation}
                  value={true}
                  onChange={(e) => {
                    setmanualDonation(e.target.checked);
                  }}
                />
                Manual Donation
              </div>
              <div>
                <input
                  type="checkbox"
                  checked={donation}
                  value={true}
                  onChange={(e) => {
                    setdonation(e.target.checked);
                  }}
                />
                Electronic Donation
              </div>
            </div>

            <div
              style={{
                width: '25rem',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <input
                  type="checkbox"
                  checked={roomBooking}
                  value={true}
                  onChange={(e) => {
                    setroomBooking(e.target.checked);
                  }}
                />
                Room Booking
              </div>
              <div>
                <input
                  type="checkbox"
                  checked={boli}
                  value={true}
                  onChange={(e) => {
                    setboli(e.target.checked);
                  }}
                />
                Boli
              </div>
            </div>

            <div
              style={{
                width: '25rem',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <input
                  type="checkbox"
                  checked={vehiclePass}
                  value={true}
                  onChange={(e) => {
                    setvehiclePass(e.target.checked);
                  }}
                />
                Vehicle Pass
              </div>
              <div>
                <input
                  type="checkbox"
                  checked={materialpass}
                  value={true}
                  onChange={(e) => {
                    setmaterialpass(e.target.checked);
                  }}
                />
                Material Pass
              </div>
            </div>

            <div
              style={{
                width: '25rem',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <input
                  type="checkbox"
                  checked={store}
                  value={true}
                  onChange={(e) => {
                    setstore(e.target.checked);
                  }}
                />
                Store
              </div>
              <div>
                <input
                  type="checkbox"
                  checked={expence}
                  value={true}
                  onChange={(e) => {
                    setexpence(e.target.checked);
                  }}
                />
                Expense
              </div>
            </div>

            <div
              style={{
                width: '25rem',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <input
                  type="checkbox"
                  checked={directory}
                  value={true}
                  onChange={(e) => {
                    setdirectory(e.target.checked);
                  }}
                />
                Directory
              </div>
              <div>
                <input
                  type="checkbox"
                  checked={hr}
                  value={true}
                  onChange={(e) => {
                    sethr(e.target.checked);
                  }}
                />
                Hr
              </div>
            </div>
            <div
              style={{
                width: '25rem',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <input
                  type="checkbox"
                  checked={adminrole}
                  value={true}
                  onChange={(e) => {
                    setadminrole(e.target.checked);
                  }}
                />
                Admin
              </div>
              <div>
                <input
                  type="checkbox"
                  checked={onlychequeandElectronic}
                  value={true}
                  onChange={(e) => {
                    setonlychequeandElectronic(e.target.checked);
                  }}
                />
                cheque And Electronic
              </div>


            </div>
            <div>
              <input
                type="checkbox"
                checked={approver}
                value={true}
                onChange={(e) => {
                  setApprover(e.target.checked);
                }}
              />
              Approver
            </div>
          </>
        ) : (
          <>
            <div>
              <div className="cash-donation-container-innser">
                <div className="form-div">
                  <div className="form-input-div_add_user">
                    <div className="inner-input-div2">
                      <label htmlFor="mobile">Mobile No</label>
                      <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        value={mobile}
                        onChange={(e) => setmobile(e.target.value)}
                        className="forminput_add_user"
                      />

                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={address}
                        onChange={(e) => setaddress(e.target.value)}
                        className="forminput_add_user"
                      />
                    </div>
                  </div>
                  <div className="form-input-div_add_user">
                    <div className="inner-input-div2">
                      <label htmlFor="username">Username</label>
                      <input
                        text="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                        className="forminput_add_user"
                      />
                      <label>Password</label>
                      <input
                        htmlFor="password"
                        text="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        className="forminput_add_user"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-div">
                  <div className="form-input-div_add_user">
                    <div className="inner-input-div2">
                      <labe htmlFor="email" l>
                        Email Address
                      </labe>
                      <input
                        text="email"
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        className="forminput_add_user"
                      />
                    </div>
                  </div>

                  <div className="form-input-div_add_user">
                    <div className="inner-input-div2">
                      <label htmlFor="status">Status</label>
                      <select
                        className="inner-input-div1-select_add"
                        id="status"
                        name="status"
                        value={status}
                        onChange={(e) => setstatus(e.target.value)}
                      >
                        <option value="None">Status</option>
                        <option value={true}>Active</option>
                        <option value={false}>De-Active</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="save-div-btn">
        {showroleoption ? (
          <>
            <button onClick={() => handlesubmit()} className="save-div-btn-btn">
              {showloader ? (
                <CircularProgress
                  style={{
                    width: '21px',
                    height: '21px',
                    color: '#FE7600',
                  }}
                />
              ) : (
                'Update'
              )}
            </button>
            <button
              onClick={() => setshowroleoption(false)}
              className="save-div-btn-btn-cancel"
            >
              Back
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setshowroleoption(true)}
              className="save-div-btn-btn"
            >
              Next
            </button>
            <button
              onClick={() => setOpen(false)}
              className="save-div-btn-btn-cancel"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default UpdateEmployee;
