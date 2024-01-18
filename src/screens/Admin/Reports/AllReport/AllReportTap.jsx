import React, { useState, useEffect } from 'react';
import f1 from '../../../../assets/f4.png';
import { NavLink } from 'react-router-dom';
import { serverInstance } from '../../../../API/ServerInstance';
const AllReportTap = ({ setopendashboard }) => {
  const [role, setrole] = useState('');
  // const [profiledata, setprofiledata] = useState('');

  // console.log('employee profile', profiledata);

  // const getprofile = () => {
  //   serverInstance('admin/update-employee-prof', 'get').then((res) => {
  //     if (res?.data) {
  //       setprofiledata(res?.data);
  //     }
  //   });
  // }
  // useEffect(() => {
  //   getprofile();
  // }, []);
  useEffect(() => {
    setopendashboard(true);
    setrole(Number(sessionStorage.getItem('userrole')));
  }, []);

  return (
    <>
      <div className="mobilewidth dashboarmain">
        <div className="container1">
          <div className="bloc-tabsonline">
            {role === 3 ? (
              <>
                <NavLink
                  style={{ width: '20rem' }}
                  to="/admin-panel/room/AllConsolidedReport"
                  className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
                >
                  <img
                    style={{ marginRight: '4%', width: '20px' }}
                    src={f1}
                    alt="fast"
                  />
                  All Consolidated
                </NavLink>
                <NavLink
                  style={{ width: '20rem' }}
                  to="/admin-panel/allreport/allconsolidated"
                  className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
                >
                  <img
                    style={{ marginRight: '4%', width: '20px' }}
                    src={f1}
                    alt="fast"
                  />
                  Consolidated
                </NavLink>

                <NavLink
                  style={{ width: '20rem' }}
                  to="/admin-panel/Room/Consolided"
                  className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
                >
                  <img
                    style={{ marginRight: '4%', width: '20px' }}
                    src={f1}
                    alt="fast"
                  />
                  Consolidated(Room Booking)
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  style={{ width: '20rem' }}
                  to="/admin-panel/room/AllConsolidedReport"
                  className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
                >
                  <img
                    style={{ marginRight: '4%', width: '20px' }}
                    src={f1}
                    alt="fast"
                  />
                  All Consolidated
                </NavLink>
                <NavLink
                  style={{ width: '20rem' }}
                  to="/admin-panel/allreport/allhead"
                  className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
                >
                  <img
                    style={{ marginRight: '4%', width: '20px' }}
                    src={f1}
                    alt="fast"
                  />
                  Head Report
                </NavLink>

                <NavLink
                  style={{ width: '20rem' }}
                  to="/admin-panel/allreport/allconsolidated"
                  className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
                >
                  <img
                    style={{ marginRight: '4%', width: '20px' }}
                    src={f1}
                    alt="fast"
                  />
                  Consolidated
                </NavLink>
                <NavLink
                  style={{ width: '20rem' }}
                  to="/admin-panel/allreport/allonline"
                  className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
                >
                  <img
                    style={{ marginRight: '4%', width: '20px' }}
                    src={f1}
                    alt="fast"
                  />
                  Online(Donator)
                </NavLink>

                <NavLink
                  style={{ width: '20rem' }}
                  to="/admin-panel/Room/Consolided"
                  className={({ isActive }) => (isActive ? 'tabs2' : 'tabs1')}
                >
                  <img
                    style={{ marginRight: '4%', width: '20px' }}
                    src={f1}
                    alt="fast"
                  />
                  Consolidated(Room Booking)
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllReportTap;
