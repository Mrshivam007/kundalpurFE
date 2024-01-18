import React, { useEffect, useState } from 'react';
import { backendApiUrl } from '../../../../config/config';
import Swal from 'sweetalert2';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

const Checkoutform = ({ setOpen, empdata }) => {
  const [returnamount, setreturnamount] = useState('');
  const [showloader, setshowloader] = useState(false);
  var options = { year: 'numeric', month: 'short', day: '2-digit' };
  var today = new Date();
  const currDate = today
    .toLocaleDateString('en-IN', options)
    .replace(/-/g, ' ');
  const currTime = today.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  var date = today.toISOString().substring(0, 10);

  const [checkoutdate, setcheckoutdate] = useState(date);
  const handlesubmit = async () => {
    try {
      setshowloader(true);
      axios.defaults.headers.post[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;

      const res = await axios.post(`${backendApiUrl}room/checkOut`, {
        id: empdata?.id,
        checkoutDate: checkoutdate,
        advanceAmount: returnamount ? returnamount : 0,
      });

      console.log(res.data.data);
      if (res.data.data.message) {
        navigation('/admin-panel/room/Print/Room/Booking', {
          state: {
            data: row,
          },
        });
        setshowloader(false);
        // Swal.fire('Great!', res.data.data.message, 'success');
        setOpen(false);
      }
    } catch (error) {
      setshowloader(false);
      setOpen(false);
    }
  };

  return (
    <>
      <div className="cash-donation-div">
        <div
          className="cash-donation-container-innser"
          //   style={{ paddingLeft: '2rem' }}
        >
          <div className="form-div">
            <div
              className="form-input-div_add_user"
              style={{ marginTop: '1rem' }}
            >
              <div className="inner-input-div2">
                <label htmlFor="toNo">Return Amount</label>
                <input
                  required
                  id="toNo"
                  className="forminput_add_user"
                  type="text"
                  placeholder="Enter return amount"
                  value={returnamount}
                  name="returnamount"
                  onChange={(e) => setreturnamount(e.target.value)}
                />
              </div>
              <div className="inner-input-div2">
                <label htmlFor="donation-date">CheckOut Date</label>
                <input
                  required
                  id="donation-date"
                  className="forminput_add_user"
                  type="date"
                  placeholder="To VC"
                  value={checkoutdate}
                  name="checkoutdate"
                  onChange={(e) =>
                    setcheckoutdate(
                      new Date(event.target.value)
                        .toISOString()
                        .substring(0, 10),
                    )
                  }
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
                'Checkout'
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

export default Checkoutform;
