import React, { useEffect, useState } from 'react';
import { backendApiUrl } from '../../../../config/config';
import Swal from 'sweetalert2';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

const AcceptRequest = ({ setOpen, empdata }) => {
  const [fromNo, setfromNo] = useState('');
  const [toNo, settoNo] = useState('');
  const [assingTo, setassingTo] = useState();
  const [empname, setempname] = useState('');
  const [showloader, setshowloader] = useState(false);

  const handlesubmit = async () => {
    try {
      setshowloader(true);
      axios.defaults.headers.post[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;

      const res = await axios.post(`${backendApiUrl}user/add-voucher-user`, {
        from: fromNo,
        to: toNo,
        user: Number(assingTo),
        name: empname,
      });

      console.log(res.data.data);
      if (res.data.data.message) {
        setshowloader(false);
        Swal.fire('Great!', 'VOUCHER GENERATED SUCCESSFULLY', 'success');
        setOpen(false);
      }
    } catch (error) {
      setshowloader(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    setassingTo(empdata?.id);
    setempname(empdata?.Username);
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
                  required
                  type="number"
                  id="fromNo"
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
                  required
                  id="toNo"
                  className="forminput_add_user"
                  type="number"
                  placeholder="To VC"
                  value={toNo}
                  name="toNo"
                  onChange={(e) => settoNo(e.target.value)}
                />
              </div>

              <div className="inner-input-div2">
                <label htmlFor="toNo">Assing To </label>
                <input
                  required
                  id="assingTo"
                  className="forminput_add_user"
                  type="text"
                  placeholder="To VC"
                  value={empname}
                  name="empname"
                  onChange={(e) => setempname(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="save-div-btn">
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
                'Save'
              )}
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

export default AcceptRequest;
