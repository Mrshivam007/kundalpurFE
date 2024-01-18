import React, { useState, useEffect } from 'react';
import f1 from '../../../../assets/f4.png';
import { NavLink } from 'react-router-dom';
const BoliTabs = ({ setopendashboard }) => {
  const [role, setrole] = useState('');
  const [emproleid, setemproleid] = useState('');
  useEffect(() => {
    setopendashboard(true);
    setrole(Number(sessionStorage.getItem('userrole')));
    setemproleid(Number(sessionStorage.getItem('empRoleid')));
  }, []);

  return (
    <>
      <div className="mobilewidth dashboarmain">
        <div className="container1">
          <div className="bloc-tabs1">
            <NavLink
              to="/admin-panel/boli/BoliLedger1"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Boli Ledger
            </NavLink>
            <NavLink
              to="/admin-panel/boli/BoliVoucher"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Boli Voucher
            </NavLink>
            <NavLink
              to="/admin-panel/boli/BoliGroup"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Boli Group
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoliTabs;
