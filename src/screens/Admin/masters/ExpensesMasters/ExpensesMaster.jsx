import React, { useState, useEffect } from 'react';


import f1 from '../../../../assets/f5.png';
import './ST.css';
// import ExpenseOrder from './expense_order/ExpenseOrder';

import SupplierName from './SupplierName/SupplierName';
import SupplierType from './SupplierType/SupplierType';
import DepartmentName from './DepartmentName/DepartmentName';
import ExpenseHead from './ExpenseHead/ExpenseHead';
import TallyHead from './TallyHead/TallyHead';
import PaymentMode from './PaymentMode/PaymentMode';
import TransporterName from './TransporterName/TransporterName';


const MasterTap = ({ setopendashboard }) => {
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
          <div className="bloc-tabs1" style={{ justifyContent: 'flex-start' }}>

            <button
              className={toggleState === 1 ? 'tabs2 ' : 'tabs1'}
              onClick={() => toggleTab(1)}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Supplier Name Master
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
              Supplier Type Master
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
              Department Name Master
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
              Expense Head Master
            </button>


            <button
              className={toggleState === 5 ? 'tabs2 ' : 'tabs1'}
              onClick={() => toggleTab(5)}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Tally Head Master
            </button>

            <button
              className={toggleState === 6 ? 'tabs2 ' : 'tabs1'}
              onClick={() => toggleTab(6)}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Payment Mode Master
            </button>
            <button
              className={toggleState === 7 ? 'tabs2 ' : 'tabs1'}
              onClick={() => toggleTab(7)}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Transporter Name Master
            </button>


          </div>

          <div className="content-tabs">
            <div
              className={
                toggleState === 1 ? 'content  active-content' : 'content'
              }
            >
              <SupplierName setopendashboard={setopendashboard} />

            </div>

            <div
              className={
                toggleState === 2 ? 'content  active-content' : 'content'
              }
            >
              <SupplierType setopendashboard={setopendashboard} />
            </div>

            <div
              className={
                toggleState === 3 ? 'content  active-content' : 'content'
              }
            >
              <DepartmentName setopendashboard={setopendashboard} />
            </div>

            <div
              className={
                toggleState === 4 ? 'content  active-content' : 'content'
              }
            >
              <ExpenseHead setopendashboard={setopendashboard} />
            </div>

            <div
              className={
                toggleState === 5 ? 'content  active-content' : 'content'
              }
            >
              <TallyHead setopendashboard={setopendashboard} />
            </div>

            <div
              className={
                toggleState === 6 ? 'content  active-content' : 'content'
              }
            >
              <PaymentMode setopendashboard={setopendashboard} />
            </div>

            <div
              className={
                toggleState === 7 ? 'content  active-content' : 'content'
              }
            >
              <TransporterName setopendashboard={setopendashboard} />
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default MasterTap;
