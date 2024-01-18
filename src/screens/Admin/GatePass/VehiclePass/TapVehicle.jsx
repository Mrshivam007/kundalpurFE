import React, { useState, useEffect } from 'react';
import f1 from '../../../../assets/f1.png';
import { NavLink, useNavigate } from 'react-router-dom';
const TapVehicle = ({ setopendashboard }) => {
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
              to="/admin-panel/vehiclepass"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Gate Pass
            </NavLink>
            <NavLink
              to="/admin-panel/vehicle/GateOut1"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Gate Out
            </NavLink>

            <NavLink
              to="/admin-panel/vehicle/GateoutHistory"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Gate Pass History
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default TapVehicle;
