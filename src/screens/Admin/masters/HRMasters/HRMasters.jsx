import React, { useState, useEffect } from 'react';


import f1 from '../../../../assets/f5.png';
import './ST.css';
// import ExpenseOrder from './expense_order/ExpenseOrder';



import EmpType from './EmployeeType/EmpType'
import BankName from './BankName/BankName'
import Department from './Department/Department';
import EmpStatus from './EmployeeStatus/EmpStatus';
import LeaveType from './LeaveType/LeaveType'
import Designation from './Designation/Designation';


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
          <div className="bloc-tabs1" style={{justifyContent:'flex-start'}}>
          
            <button
              className={toggleState === 1 ? 'tabs2 ' : 'tabs1'}
              onClick={() => toggleTab(1)}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
            Employee Type Master
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
            Bank Name Master
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
           Department Master
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
            Employee Status Master
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
            Leave Type Master
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
            Designation Master
            </button>
    
          </div>

          <div className="content-tabs">
            <div
              className={
                toggleState === 1 ? 'content  active-content' : 'content'
              }
            >
              <EmpType setopendashboard={setopendashboard} />
            </div>

            <div
              className={
                toggleState === 2 ? 'content  active-content' : 'content'
              }
            >
              <BankName setopendashboard={setopendashboard} />
            </div>

            <div
              className={
                toggleState === 3 ? 'content  active-content' : 'content'
              }
            >
              <Department setopendashboard={setopendashboard} />
            </div>

            <div
              className={
                toggleState === 4 ? 'content  active-content' : 'content'
              }
            >
              <EmpStatus setopendashboard={setopendashboard} />
            </div>

            <div
              className={
                toggleState === 5 ? 'content  active-content' : 'content'
              }
            >
              <LeaveType setopendashboard={setopendashboard} />
            </div>

            <div
              className={
                toggleState === 6 ? 'content  active-content' : 'content'
              }
            >
              <Designation setopendashboard={setopendashboard} />
            </div>
           
          </div>
        </div>
      </div>
    </>
  );
};

export default MasterTap;
