import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


import EmpLeaves from './screens/EmpLeaves/EmpLeaves'
import Employee from './screens/Employee/Employee'
import EmpSalary from './screens/EmpSalary/EmpSalary'
import EmpAttendance from './screens/EmpAttendance/EmpAttendance'


import f1 from '../../../../assets/f5.png';
import './HrTab.css';


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
            {/* <button
              className={toggleState === 1 ? 'tabs2 ' : 'tabs1'}
              onClick={() => toggleTab(1)}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />

             User

             
            </button> */}
            <button
              className={toggleState === 1 ? 'tabs2 ' : 'tabs1'}
              onClick={() => toggleTab(1)}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
        Employee
            
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
             Employee Salary
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
              Employee Attendance
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
             Employee Leaves
            </button>
            
          </div>

          <div className="content-tabs">
            {/* <div
              className={
                toggleState === 1 ? 'content  active-content' : 'content'
              }
            >
              <User setopendashboard={setopendashboard}/>
            </div> */}

            <div
              className={
                toggleState === 1 ? 'content  active-content' : 'content'
              }
            >
              <Employee setopendashboard={setopendashboard}/>
            </div>
            <div
              className={
                toggleState === 2 ? 'content  active-content' : 'content'
              }
            >
             <EmpAttendance setopendashboard={setopendashboard}/>
            </div>
            <div
              className={
                toggleState === 3 ? 'content  active-content' : 'content'
              }
            >
              <EmpSalary setopendashboard={setopendashboard}/>
            </div>

            <div
              className={
                toggleState === 4 ? 'content  active-content' : 'content'
              }
            >
              <EmpLeaves setopendashboard={setopendashboard}/>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreTab;
