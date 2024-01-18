import React, { useState } from 'react';
import { backendApiUrl } from '../../../config/config';
import Swal from 'sweetalert2';
import axios from 'axios';
function Cancel({ handleClose, updateId, type }) {
  const [reasonmsg, setreasonmsg] = useState('');
  const handlesubmit = async () => {
    handleClose();
    axios.defaults.headers.post[
      'Authorization'
    ] = `Bearer ${sessionStorage.getItem('token')}`;
    const { data } = await axios.post(`${backendApiUrl}admin/change-elec`, {
      id: updateId,
      status: false,
      rsn: reasonmsg,
      type: type,
    });

    if (data.status) {
      Swal.fire('Great!', data.msg, 'success');
    }
  };

  return (
    <>
      <div>
        <div>
          <form className="Status_main_div">
            <label htmlFor="reasonmsg">Are you sure to cancel</label>
            <input
              type="text"
              name="reasonmsg"
              id="reasonmsg"
              value={reasonmsg}
              placeholder="Reason"
              onChange={(e) => setreasonmsg(e.target.value)}
            />

            <button onClick={() => handlesubmit()}>Cancel</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Cancel;
