import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import f1 from '../../../../assets/f4.png';

const ComBineTap = ({ setopendashboard }) => {
  useEffect(() => {
    setopendashboard(true);
  }, []);

  return (
    <>
      <div className="mobilewidth dashboarmain">
        <div className="container1">
          <div className="bloc-tabsonline">
            <NavLink
              style={{ width: '17%' }}
              to="/admin-panel/room/AllCombine"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              All Donation Report
            </NavLink>
            <NavLink
              style={{ marginRight: '3rem', width: '17%' }}
              to="/admin-panel/DonationCombine"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Donation Combine
            </NavLink>
            <NavLink
              style={{ marginRight: '3rem', width: '17%' }}
              to="/admin-panel/ManulCombine"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Manual Combine
            </NavLink>
            <NavLink
              style={{ width: '17%' }}
              to="/admin-panel/OnlineCombine"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Online Combine
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComBineTap;
