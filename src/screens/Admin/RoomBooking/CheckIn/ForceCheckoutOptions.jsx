import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForceCheckoutOptions.css';
const ForceCheckoutOptions = ({ setOpen, row }) => {
  const navigation = useNavigate();
  const [option, setoption] = useState('one');

  const handleforcecheckout = () => {
    if (option === 'one') {
      navigation('/admin-panel/Room/ForceRoomChequeOut', {
        state: {
          data: row,
        },
      });
    }
    if (option === 'all') {
      navigation('/admin-panel/Room/ForceRoomChequeOut', {
        state: {
          data: row,
        },
      });
    }
  };
  return (
    <>
      <div>
        <p style={{ marginBottom: '1rem' }}>Options</p>
        <div className="manforceoptions">
          <div className="manforceoptions" style={{ marginRight: '2rem' }}>
            <label>One force check out</label>
            <input checked={true} value={'one'} type="radio" name="is" />
          </div>
          <div className="manforceoptions">
            <label>All force check out</label>
            <input type="radio" value={'all'} name="is" />
          </div>
        </div>
        <div className="save-div-btn">
          <button
            onClick={() => handleforcecheckout()}
            className="save-div-btn-btn"
          >
            Force checkout
          </button>
          <button onClick={() => setOpen()} className="save-div-btn-btn-cancel">
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default ForceCheckoutOptions;
