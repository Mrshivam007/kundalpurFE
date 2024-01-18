import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import Approve from './Approve/Approve';

import RequirementsRaise from './RequirementsRaise/RequirementsRaise';
import Inventory from './Inventory/Inventory';
import PO from './PurchaseOrder/PO'

import f1 from '../../../assets/f5.png';
import './StoreTab.css';
import GatePass from './GatePass/GatePass';


const StoreTab = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(()=>{

  },[])


  return (
    <>
      <div className="mobilewidth , dashboarmain">
        <div className="container1">
          <div className="bloc-tabs1">

            <NavLink
              to="/admin-panel/store/requirementraise"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />

              Requirements Raise
            </NavLink>



            <NavLink
              to="/admin-panel/store/approve"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Approve
            </NavLink>


            <NavLink
              to="/admin-panel/store/purchaseorder"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />

              Purchase Order
            </NavLink>


            <NavLink
              to="/admin-panel/store/gateentry"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />

              Gate Entry
            </NavLink>


            <NavLink
              to="/admin-panel/store/paymentin"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />

              Payment In
            </NavLink>


            <NavLink
              to="/admin-panel/store/Inventory"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />

              Inventory
            </NavLink>


            <NavLink
              to="/admin-panel/store/Stock"
              className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />

              Transfer Stock
            </NavLink>



          </div>


        </div>
      </div>
    </>
  );
};

export default StoreTab;
