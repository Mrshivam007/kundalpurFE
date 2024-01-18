import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DonationMaster from './Donationmaster/DonationMaster';
import IntemMaster from './Itemmaster/IntemMaster';
import ReceiptMater from './Receiptmaster/ReceiptMater';
import UserMaster from './Usermaster/UserMaster';
import AddCategory from '../masters/AddCategory/AddCategory';
import AddFacilities from '../masters/AddFacilities/AddFacilities';
import BoliHead from '../masters/BoliHead/BoliHead';
import Unitboli from './Unitmaster/Unitboli';
import TrustType from './TrustRegistrationMaster/TRMaster'
import f1 from '../../../assets/f5.png';
import './MasterTap.css';
import BhojnayalayMasters from './BhojnayalayMaster/BhojnayalayMasters';

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
              Donated User Master
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
              Donation Type Master
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
              Donation Item Master
            </button>
            <button
              className={toggleState === 8 ? 'tabs2 ' : 'tabs1'}
              onClick={() => toggleTab(8)}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Unit Master
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
              Boli Head Master
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
              Receipt Master
            </button>

            <button
              className={toggleState === 9 ? 'tabs2 ' : 'tabs1'}
              onClick={() => toggleTab(9)}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Trust Type Master
            </button>

            <button
              className={toggleState === 10 ? 'tabs2 ' : 'tabs1'}
              onClick={() => toggleTab(10)}
            >
              <img
                style={{ marginRight: '4%', width: '20px' }}
                src={f1}
                alt="fast"
              />
              Bhojnayalay Master 
            </button>

          </div>

          <div className="content-tabs">
            <div
              className={
                toggleState === 1 ? 'content  active-content' : 'content'
              }
            >
              <UserMaster />
            </div>

            <div
              className={
                toggleState === 2 ? 'content  active-content' : 'content'
              }
            >
              <DonationMaster />
            </div>
            <div
              className={
                toggleState === 3 ? 'content  active-content' : 'content'
              }
            >
              <IntemMaster />
            </div>
            <div
              className={
                toggleState === 4 ? 'content  active-content' : 'content'
              }
            >
              <ReceiptMater />
            </div>
            <div
              className={
                toggleState === 5 ? 'content  active-content' : 'content'
              }
            >
              <AddCategory setopendashboard={setopendashboard} />
            </div> 
            <div
              className={
                toggleState === 6 ? 'content  active-content' : 'content'
              }
            >
              <AddFacilities setopendashboard={setopendashboard} />
            </div>

            <div
              className={
                toggleState === 7 ? 'content  active-content' : 'content'
              }
            >
              <BoliHead setopendashboard={setopendashboard} />
            </div>

            <div
              className={
                toggleState === 8 ? 'content  active-content' : 'content'
              }
            >
              <Unitboli setopendashboard={setopendashboard} />
            </div>

            <div
              className={
                toggleState === 9 ? 'content  active-content' : 'content'
              }
            >
              <TrustType setopendashboard={setopendashboard} />
            </div>
            <div
              className={
                toggleState === 10 ? 'content  active-content' : 'content'
              }
            >
              <BhojnayalayMasters setopendashboard={setopendashboard} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MasterTap;
