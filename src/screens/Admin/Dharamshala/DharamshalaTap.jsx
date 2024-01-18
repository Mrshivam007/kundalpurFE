import React, { useState, useEffect } from 'react';
import f1 from '../../../assets/f1.png';
import AddDharamshala from './AddDharamshala/AddDharamshala';
import AddRoom from './AddRoom/AddRoom';
import AddCategory from '../masters/AddCategory/AddCategory';
import AddFacilities from '../masters/AddFacilities/AddFacilities';
import DisableDharamshala from './Disablesharmshala/AddDharamshala';
const DharamshalaTap = ({ setopendashboard }) => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    setopendashboard(true);
  }, []);

  return (
    <>
      <div className="mobilewidth dashboarmain">
        <div className="container1">
          <div className="bloc-tabsonline">
            <button
              className={toggleState === 1 ? 'tabs2 ' : 'tabs1'}
              onClick={() => toggleTab(1)}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Category Master
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
              Facility Master
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
              Dharamshala
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
              Disable Dharamshala
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
              Room
            </button>
          </div>

          <div className="content-tabs">
            <div
              className={
                toggleState === 1 ? 'content  active-content' : 'content'
              }
            >
              <AddCategory setopendashboard={setopendashboard} />
            </div>
            <div
              className={
                toggleState === 2 ? 'content  active-content' : 'content'
              }
            >
              <AddFacilities setopendashboard={setopendashboard} />
            </div>
            <div
              className={
                toggleState === 3 ? 'content  active-content' : 'content'
              }
            >
              <AddDharamshala setopendashboard={setopendashboard} />
            </div>  

            <div
              className={
                toggleState === 4 ? 'content  active-content' : 'content'
              }
            >
              <AddRoom setopendashboard={setopendashboard} />
            </div>

            <div
              className={
                toggleState === 5 ? 'content  active-content' : 'content'
              }
            >
              <DisableDharamshala setopendashboard={setopendashboard} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DharamshalaTap;
