import React, { useState } from 'react';
import { backendApiUrl } from '../../../../../config/config';
import Swal from 'sweetalert2';
import axios from 'axios';
function ChangeStatus({ id, handleClose }) {
  const [paymentId, setpaymentId] = useState('');
  const [approvevalue, setapprovevalue] = useState('');
  console.log(id);

  const handlesubmit = async () => {
    try {
      if (approvevalue && paymentId) {
        axios.defaults.headers.post[
          'Authorization'
        ] = `Bearer ${sessionStorage.getItem('token')}`;

        const res = await axios.post(`${backendApiUrl}admin/cheque-status`, {
          status: Number(approvevalue),
          id: id,
          PAYMENT_ID: paymentId,
        });
        if (res.data.status) {
          Swal.fire('Great!', res.data.msg, 'success');

          handleClose(false);
        }
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="cash-donation-div">
        <div
          className="cash-donation-container-innser"
          style={{ paddingLeft: '2rem' }}
        >
          <div className="form-div">
            <div className="form-input-div_add_user">
              <div className="inner-input-div">
                <label htmlFor="Payment id">Payment id</label>
                <input
                  required
                  type="text"
                  name="paymentId"
                  id="paymentId"
                  value={paymentId}
                  placeholder="Payment id"
                  onChange={(e) => setpaymentId(e.target.value)}
                />
              </div>

              <div className="inner-input-div">
                <label htmlFor="type">Status</label>
                <select
                  required
                  className="inner-input-div1-select-cheque"
                  id="type"
                  name="mode"
                  value={approvevalue}
                  onChange={(e) => setapprovevalue(e.target.value)}
                >
                  <option value={0}> Not approved</option>
                  <option value={1}>Approved</option>
                </select>
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
}

export default ChangeStatus;
