import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import f1 from '../../../../assets/f4.png';
import './OnlineTap.css';
const OnlineTap = ({ setopendashboard }) => {
  useEffect(() => {
    setopendashboard(true);
  }, []);

  return (
    <>
      <div className="mobilewidth dashboarmain">
        <div className="container1">
          <div className="bloc-tabsonline">
            <NavLink
              style={{ marginRight: '3rem', width: '17%' }}
              to="/admin-panel/online/report/online"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Online Donation Report
            </NavLink>
            <NavLink
              style={{ marginRight: '3rem', width: '17%' }}
              to="/admin-panel/online/report/online-paymentfail"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Payment failed online
            </NavLink>
            <NavLink
              style={{ width: '17%' }}
              to="/admin-panel/online/report/cheque"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Cheque Donation Report
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnlineTap;
