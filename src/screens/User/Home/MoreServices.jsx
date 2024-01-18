import React, { useEffect } from 'react';
import logo from '../../../assets/sideimg.jpeg';
import money from '../../../assets/money.jpeg';
import { useNavigate } from 'react-router-dom';
import './MoreServices.css';
const MoreServices = () => {
  const navigation = useNavigate();
  return (
    <>
      <div className="super_main_srevice">
        <h2>आस्था</h2>
        <p>मोक्षमार्ग तो, भीतर अधिक है, बाहर कम</p>
        <div className="mainbghomediv10">
          <div className="manin_more_service_innear">
            <h2>आवास व्यवस्था</h2>
            <button> और पढ़ें</button>
          </div>
          <div className="manin_more_service_innear">
            <h2>अन्य सुविधाये</h2>
            <button> और पढ़ें</button>
          </div>
          <div className="manin_more_service_innear">
            <h2>दान</h2>
            <button> और पढ़ें</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoreServices;
