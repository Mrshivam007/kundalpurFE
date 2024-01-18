import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
function Userinfo({ userdata, handleClose }) {
  const [isData, setisData] = React.useState(null);

  useEffect(() => {
    if (userdata) {
      setisData(userdata);
    }
  }, []);
  return (
    <>
      <div>
        <div className="add-div-close-div">
          <h2 clssName="add_text_only">&nbsp;</h2>
          <CloseIcon onClick={() => handleClose()} />
        </div>

        <h2
          className="info_head_color"
          style={{ textAlign: 'center', marginBottom: '1rem' }}
        >
          User Details
        </h2>
        <div className="main_emep_info_innear_content">
          <div style={{ marginRight: '1rem' }}>
            <p className="info_head_color">Full Name</p>
            <p>{isData?.name}</p>
            <p className="info_head_color">Email</p>
            <p>{isData?.email}</p>
          </div>
          <div>
            <p className="info_head_color">Mobile Number</p>
            <p> {isData?.mobileNo}</p>
            <p className="info_head_color">Address</p>
            <p> {isData?.mobileNo}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Userinfo;
