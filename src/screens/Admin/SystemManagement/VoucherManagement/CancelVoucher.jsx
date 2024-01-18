import React, { useState, useEffect } from 'react';
import { backendApiUrl } from '../../../../config/config';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
function CancelVoucher({
  row,
  Data,
  handleClose,
  setrefetchdata,
  refetchdata,
}) {
  const [paymentId, setpaymentId] = useState('');

  const handlesubmit = async () => {
    try {
      axios.defaults.headers.post[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;

      const res = await axios.post(
        `${backendApiUrl}admin/cancel-each-voucher`,
        {
          voucherNo: Number(row?.voucherNo),
          voucherId: Number(Data?.assign),
          rsn: paymentId,
        },
      );
      console.log('empl', res.data.data);

      if (res.data.data.status === 'success') {
        handleClose();
        setrefetchdata(!refetchdata);

        Swal.fire('Great!', res.data.data.message, 'success');
      }
    } catch (error) {}
  };

  useEffect(() => {}, []);

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
                <label htmlFor="Payment id">Remark</label>
                <input
                  style={{ width: '24rem' }}
                  type="text"
                  name="paymentId"
                  id="paymentId"
                  value={paymentId}
                  placeholder="Reason"
                  onChange={(e) => setpaymentId(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="save-div-btn">
            <button onClick={() => handlesubmit()} className="save-div-btn-btn">
              Save
            </button>
            <button
              onClick={() => handleClose()}
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

export default CancelVoucher;
