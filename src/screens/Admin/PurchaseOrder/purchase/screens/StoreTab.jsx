import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Approve from './Approve/Approve';
import Invoice from './Invoice/Invoice';
import RequirementsRaise from './RequirementsRaise/RequirementsRaise';
import Inventory from './Inventory/Inventory';

import AddCategory from '../masters/AddCategory/AddCategory';
// import Expense from './Expense/Expense';
import AddFacilities from '../masters/AddFacilities/AddFacilities';
import BoliHead from '../masters/BoliHead/BoliHead';
import f1 from '../../../assets/f5.png';
import './StoreTab.css';
// import ExpenseOrder from './expense_order/ExpenseOrder';
// import UDMaster from './UserDirectoryMaster/UDMaster'

const StoreTab = ({ setopendashboard }) => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    setopendashboard(true);
  }, []);

  return (
    <>
      <div className="mobilewidth , dashboarmain">
        <div className="container1">
          <div className="bloc-tabs1">
            <button
              className={toggleState === 1 ? 'tabs2 ' : 'tabs1'}
              onClick={() => toggleTab(1)}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />

             Requirements Raise

             
            </button>
            <button
              className={toggleState === 2 ? 'tabs2 ' : 'tabs1'}
              onClick={() => toggleTab(2)}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
            Approve
            
            </button>
            <button
              className={toggleState === 3 ? 'tabs2 ' : 'tabs1'}
              onClick={() => toggleTab(3)}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Invoice
            </button>
        
            <button
              className={toggleState === 4 ? 'tabs2 ' : 'tabs1'}
              onClick={() => toggleTab(4)}
            >

          
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Inventory
            </button>

        
            
          </div>

          <div className="content-tabs">
            <div
              className={
                toggleState === 1 ? 'content  active-content' : 'content'
              }
            >
              <RequirementsRaise />
            </div>

            <div
              className={
                toggleState === 2 ? 'content  active-content' : 'content'
              }
            >
              <Approve setopendashboard={setopendashboard}/>
            </div>
            <div
              className={
                toggleState === 3 ? 'content  active-content' : 'content'
              }
            >
             <Invoice />
            </div>
            <div
              className={
                toggleState === 4 ? 'content  active-content' : 'content'
              }
            >
              <Inventory />
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreTab;
