import React, { useState, useEffect } from 'react';
import f1 from '../../../assets/f3.png';
import { NavLink, useNavigate } from 'react-router-dom';


const Etab = ({ setopendashboard }) => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };



  useEffect(() => {
    setopendashboard(true);
  }, [toggleState]);

  return (
    <>


      {/* <Expense setopendashboard={setopendashboard} /> */}
      <div className="mobilewidth dashboarmain">
        <div className="container1">
          <div className="bloc-tabs1">
            <NavLink
              to="/admin-panel/expense/group"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
             Expense Group
            </NavLink>
            <NavLink
              to="/admin-panel/expense/ledger"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
             Expense Ledger
            </NavLink>
            <NavLink
              to="/admin-panel/expense/voucher"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
            Expense Voucher
            </NavLink>


          </div>
        </div>
      </div>
    </>
  );
};

export default Etab;
