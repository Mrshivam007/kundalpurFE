import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { backendUrl } from '../../../../../config/config';
function Chequeinfo({ setopendashboard }) {
  const location = useLocation();
  const navigation = useNavigate();
  const [data, setdata] = useState([]);
  console.log('cheque', data);
  useEffect(() => {
    if (location.state) {
      setdata(location.state?.data);
    } else {
      navigation('/admin-panel/reports');
    }
    setopendashboard(true);
  }, []);

  return (
    <>
      <div className="dashboarddiv">
        <div className="backebj_voucher">
          <button onClick={() => navigation(-1)}>Back</button>
        </div>
        <div className="main_center_header1" style={{ paddingTop: '3rem' }}>
          <div className="cheque_main_info_div">
            <div className="cheque_img_div">
              <div className="left_info_cheque">
                <p>Image of Cheque</p>
                <img src={`${backendUrl}uploads/images/${data?.IMG}`} />
              </div>
              <div className="right_info_cheque">
                <p>Name :{data?.NAME}</p>
                <p>Address :{data?.ADDRESS}</p>
                <p>Amount :{data?.AMOUNT}</p>
                <p>CHEQUE_NO :{data?.CHEQUE_NO}</p>
                <p>DATE_OF_CHEQUE :{data?.DATE_OF_CHEQUE}</p>
                <p>DATE_OF_DAAN :{data?.DATE_OF_DAAN}</p>
                <p>MODE_OF_DONATION :{data?.MODE_OF_DONATION}</p>
                <p>NAME_OF_BANK :{data?.NAME_OF_BANK}</p>
                <p>RECEIPT_NO :{data?.RECEIPT_NO}</p>
                <p>Donation type :{data?.TYPE}</p>
                <p>REMARK :{data?.REMARK}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chequeinfo;
