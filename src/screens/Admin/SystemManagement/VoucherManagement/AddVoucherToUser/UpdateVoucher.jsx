import React, { useEffect, useState } from 'react';
import { backendApiUrl } from '../../../../../config/config';
import { serverInstance } from '../../../../../API/ServerInstance';
import Swal from 'sweetalert2';
import axios from 'axios';
import './AddVoucherToUser.css';

const UpdateVoucher = ({ setOpen, data }) => {
  const [isData, setisData] = React.useState([]);
  const [fromNo, setfromNo] = useState('');
  const [toNo, settoNo] = useState('');
  const [assingTo, setassingTo] = useState();
  const [empname, setempname] = useState('');

  console.log('update data', data);

  const handlesubmit = async () => {
    try {
      if (!fromNo && !toNo && !assingTo) {
        Swal.fire('Error!', 'All fields required', 'error');
      }
      axios.defaults.headers.put[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;

      const res = await axios.put(`${backendApiUrl}admin/vocher-edit-user`, {
        id: Number(assingTo),
        from: fromNo,
        to: toNo,
      });

      console.log(res);

      if (res.data.status) {
        Swal.fire('Great!', 'VOUCHER UPDATED SUCCESSFULLY', 'success');
        setOpen(false);
      }
    } catch (error) {
      // Swal.fire("Error!", error.response.data.message, "error");
      setOpen(false);
    }
  };
  const getall_donation = () => {
    serverInstance('admin/add-employee', 'get').then((res) => {
      if (res.status) {
        setisData(res.data);
      } else {
        Swal('Error', 'somthing went  wrong', 'error');
      }
    });
  };

  useEffect(() => {
    getall_donation();
    if (data) {
      setempname(data.name);
      setfromNo(data.from);
      settoNo(data.to);
      setassingTo(data.id);
    }
  }, [open]);
  return (
    <>
      <div className="cash-donation-div">
        <div
          className="cash-donation-container-innser"
          style={{ paddingLeft: '2rem' }}
        >
          <div className="form-div">
            <div className="form-input-div_add_user">
              <div className="inner-input-div2">
                <label htmlFor="fromNo">From Number</label>
                <input
                  type="number"
                  id="fromNo"
                  required
                  placeholder="From VC"
                  className="forminput_add_user"
                  value={fromNo}
                  name="fromNo"
                  onChange={(e) => setfromNo(e.target.value)}
                />
              </div>

              <div className="inner-input-div2">
                <label htmlFor="toNo">To Number </label>
                <input
                  id="toNo"
                  required
                  className="forminput_add_user"
                  type="number"
                  placeholder="To VC"
                  value={toNo}
                  name="toNo"
                  onChange={(e) => settoNo(e.target.value)}
                />
              </div>
              <div className="inner-input-div2">
                <label htmlFor="empname">Assign To </label>
                <input
                  className="inner-input-div1-select12"
                  id="empname"
                  value={empname}
                  required
                  name="empname"
                  onChange={(e) => empname(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="save-div-btn">
            <button onClick={() => handlesubmit()} className="save-div-btn-btn">
              Save
            </button>
            <button
              onClick={() => setOpen(false)}
              className="save-div-btn-btn-cancel"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateVoucher;
