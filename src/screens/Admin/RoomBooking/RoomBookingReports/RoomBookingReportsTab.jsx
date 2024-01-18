import React, { useState, useEffect } from 'react';
import f1 from '../../../../assets/f1.png';

import { NavLink, useNavigate } from 'react-router-dom';
const RoomBookingReportsTab = ({ setopendashboard }) => {
  const [userrole, setuserrole] = useState('');
  useEffect(() => {
    setopendashboard(true);
    setuserrole(Number(sessionStorage.getItem('userrole')));
  }, []);

  return (
    <>
      <div className="mobilewidth dashboarmain">
        <div className="container1">
          <div className="bloc-tabs1">
            <NavLink
              style={{ width: '15rem' }}
              to="/admin-panel/Onlycheckin"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Offline Checkin
            </NavLink>
            <NavLink
              style={{ width: '15rem' }}
              to="/admin-panel/Room/checkinreports"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Offline Checkout
            </NavLink>

            <NavLink
              style={{ width: '15rem' }}
              to="/admin-panel/OnlinecheckHistotry"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Online Checkin
            </NavLink>
            <NavLink
              style={{ width: '15rem' }}
              to="/admin-panel/Room/onlinecheckin"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Online Checkout
            </NavLink>

            {userrole === 1 ? (
              <>
                <NavLink
                  style={{ width: '15rem' }}
                  to="/admin-panel/ForceCheckoutHistory"
                  className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
                >
                  <img
                    style={{ marginRight: '4%', width: '20px' }}
                    src={f1}
                    alt="fast"
                  />
                  Force Checkout History
                </NavLink>
              </>
            ) : (
              <></>
            )}
            <NavLink
              to="/admin-panel/Room/Holdhistory"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Hold History
            </NavLink>
            <NavLink
              to="/admin-panel/Room/CanceledHistory"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Cancel History
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomBookingReportsTab;
