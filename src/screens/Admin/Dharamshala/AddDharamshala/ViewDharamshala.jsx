import React, { useState, useEffect } from 'react';
import camera from '../../../../assets/camera.png';

import { backendUrl } from '../../../../config/config';

function ViewDharamshala({ updatedata }) {
  const [dharamshalaname, setdharamshalaname] = useState('');
  const [description, setdescription] = useState('');
  const [img1, setimg1] = useState('');
  const [previewprofile1, setpreviewprofile1] = useState('');

  useEffect(() => {
    if (updatedata) {
      setimg1(updatedata?.image1);
      setdescription(updatedata?.desc);
      setdharamshalaname(updatedata?.name);
    }
  }, []);

  return (
    <>
      <div className="cash-donation-div">
        <div className="cash-donation-container-innser">
          <div style={{ marginTop: '0.2rem' }}>
            <label htmlFor="dharamshalaname">Dharanshala Name</label>
            <input
              disabled={true}
              style={{ width: '100%', marginTop: '0.2rem' }}
              type="textarea"
              id="dharamshalaname"
              placeholder="enter the description"
              className="forminput_add_user10"
              value={dharamshalaname}
              name="dharamshalaname"
              onChange={(e) => setdharamshalaname(e.target.value)}
            />
          </div>
          <div style={{ marginTop: '1.2rem' }}>
            <label htmlFor="fromNo">Dharamshala Description</label>
            <textarea
              disabled={true}
              style={{ width: '99.8%', marginTop: '0.2rem', height: '100px' }}
              id="fromNo"
              placeholder="enter the description"
              className="forminput_add_user10"
              value={description}
              name="description"
              onChange={(e) => setdescription(e.target.value)}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              width: '100%',
              flexDirection: 'column',
            }}
          >
            <div className="main_img_divvvv">
              <img
                className="dharamshala_imgggg"
                src={
                  previewprofile1
                    ? previewprofile1
                    : img1
                    ? `${backendUrl}uploads/images/${img1}`
                    : camera
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewDharamshala;
