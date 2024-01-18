import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import CommitteeDirectory from './screens/CommitteeDirectory/CommitteeDirectory'
import FamilyDirectory from './screens/FamilyDirectory/FamilyDirectory';


import f1 from '../../../assets/f5.png';
// import './CDTab.css';


const CDTab = ({ setopendashboard }) => {
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
        <div className="container1" >
          <div className="bloc-tabs1" style={{display:'flex' , justifyContent:'flex-start'}}>
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
              Family Directory

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
             Committee Directory
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
              <FamilyDirectory setopendashboard={setopendashboard} />
            </div>
            <div
              className={
                toggleState === 2 ? 'content  active-content' : 'content'
              }
            >
              <CommitteeDirectory setopendashboard={setopendashboard} />
            </div>


          </div>
        </div>
      </div>
    </>
  );
};

export default CDTab;