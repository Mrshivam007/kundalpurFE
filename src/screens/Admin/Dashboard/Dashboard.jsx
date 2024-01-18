import React, { useEffect, useState } from 'react';
import DashbordTap from './DashbordTap';
import Group224 from '../../../assets/Group224.png';
import Group225 from '../../../assets/Group225.png';
import Group227 from '../../../assets/Group227.png';
import Group228 from '../../../assets/Group228.png';
import { serverInstance } from '../../../API/ServerInstance';
import DonationTotal from '../TotalDashboardFun/DonationTotal';
import ManaulTotal from '../TotalDashboardFun/ManaulTotal';
import OnlineTotal from '../TotalDashboardFun/OnlineTotal';
import EmpelecTotal from '../TotalDashboardFun/EmpelecTotal';
import EmpmanulTotal from '../TotalDashboardFun/EmpmanulTotal';
import LoadingSpinner1 from '../../../components/Loading/LoadingSpinner1';
import Bookingadmin from '../TotalDashboardFun/Bookingadmin';
import BookingEmpTotal from '../TotalDashboardFun/BookingEmpTotal';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ setopendashboard }) => {
  const navigate = useNavigate();
  const [loader, setloader] = useState(false);
  const [empid, setempid] = useState('');
  const [userrole, setuserrole] = useState('');
  const [emproleid, setemproleid] = useState('');
  const [isDataadmin, setisDataadmin] = useState('');
  const [isDataemp, setisDataemp] = useState('');
  const [bookingadmin, setbookingadmin] = useState('');
  const [bookemp, setbookemp] = useState('');
  const [isData1, setisData1] = useState('');
  const [isData2, setisData2] = useState('');
  const [isData3, setisData3] = useState('');
  const [isData4, setisData4] = useState('');
  const [isData5, setisData5] = useState('');
  const [onlineamount, setonlineamount] = useState('');
  const [profiledata, setprofiledata] = useState('');

  console.log('employee profile', profiledata);

  const getprofile = () => {
    serverInstance('admin/update-employee-prof', 'get').then((res) => {
      if (res?.data) {
        setprofiledata(res?.data);
      }
    });
  };

  useEffect(() => {
    getprofile();
  }, []);
  const getallelec = () => {
    serverInstance('admin/dash-admin-total-elec', 'get').then((res) => {
      setloader(true);
      if (res.data.data) {
        setloader(false);
        setisData1(res?.data?.data);
      }
    });
  };

  const getallmanual = () => {
    serverInstance('admin/dash-admin-total-manual', 'get').then((res) => {
      setloader(true);
      if (res.data.data) {
        setloader(false);
        setisData2(res?.data?.data);
      }
    });
  };

  const getallonline = () => {
    serverInstance('admin/dash-admin-total-online', 'get').then((res) => {
      setloader(true);
      if (res.data.data) {
        setloader(false);
        setisData3(res?.data?.data);
      }
    });
  };

  const getallempelec = () => {
    serverInstance('admin/dash-employee-total-elec', 'get').then((res) => {
      setloader(true);
      if (res.data.data) {
        setloader(false);
        setisData4(res?.data?.data);
      }
    });
  };

  const getallempmanual = () => {
    serverInstance('admin/dash-employee-total-manual', 'get').then((res) => {
      setloader(true);
      console.log('manua dele', res.data.data);
      if (res.data.data) {
        setloader(false);
        setisData5(res?.data?.data);
      }
    });
  };
  const getAllguestadmin = () => {
    serverInstance('room/get-guests', 'GET').then((res) => {
      setisDataadmin(res?.data);
    });
  };

  const getAllempguest = () => {
    serverInstance('room/employee-get-guests', 'GET').then((res) => {
      setisDataemp(res?.data);
    });
  };

  const getempbooking = () => {
    serverInstance('room/employee-booking-stats-1', 'GET').then((res) => {
      setbookemp(res?.data);
    });
  };
  const getadminbooking = () => {
    serverInstance('room/room-booking-stats-1', 'GET').then((res) => {
      setbookingadmin(res?.data);
    });
  };

  const getOnlineBooingAmount = () => {
    serverInstance('room/room-booking-report', 'GET').then((res) => {
      setonlineamount(res?.data);
    });
  };

  useEffect(() => {
    setopendashboard(true);
    setuserrole(Number(sessionStorage.getItem('userrole')));
    setemproleid(Number(sessionStorage.getItem('empRoleid')));
    setempid(Number(sessionStorage.getItem('empRoleid')));
    getallelec(), getempbooking();
    getAllempguest();
    getallmanual(), getallonline(), getallempelec(), getallempmanual();
    getAllguestadmin();
    getadminbooking();
    getOnlineBooingAmount();
  }, []);

  return (
    <>
      <div style={{ position: 'fixed', width: '100%', paddingTop: '0.5rem' }}>
        <div
          className="dashboarddiv"
          style={{
            marginLeft: '5.3%',
            marginRight: '1%',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          {userrole === 1 ||  profiledata?.admin === true ? (
            <>
              <div
                onClick={() => navigate('/admin-panel/donation')}
                className="main_card_amount"
                style={{ background: '#FE0000', color: 'white' }}
              >
                <p>Donation</p>
                <div
                  className="main_repue_img"
                  style={{ color: '#05313C', fontWeight: 700 }}
                >
                  <DonationTotal data={isData1} />
                  <img src={Group225} alt="dd" />
                </div>
              </div>
              <div
                onClick={() => navigate('/admin-panel/manualdonation')}
                className="main_card_amount"
                style={{ background: '#FECE00', color: 'white' }}
              >
                <p>Manual Donation</p>
                <div
                  className="main_repue_img"
                  style={{ color: '#05313C', fontWeight: 700 }}
                >
                  <ManaulTotal data={isData2} />
                  <img src={Group225} alt="dd" />
                </div>
              </div>
              <div
                onClick={() => navigate('/admin-panel/online/report/online')}
                className="main_card_amount"
                style={{ background: '#009430', color: 'white' }}
              >
                <p>Online Donation</p>
                <div
                  className="main_repue_img"
                  style={{ color: '#05313C', fontWeight: 700 }}
                >
                  <OnlineTotal data={isData3} />
                  <img src={Group224} alt="dd" />
                </div>
              </div>
              <div
                onClick={() => navigate('/admin-panel/room/Newcheckin')}
                className="main_card_amount"
                style={{ background: '#3C5FFE', color: 'white' }}
              >
                <p>Room Booking</p>
                <div className="main_repue_img">
                  <Bookingadmin data={bookingadmin} />
                  <img src={Group227} alt="dd" />
                </div>
              </div>
              <div
                onClick={() => navigate('/admin-panel/room/roomshift')}
                className="main_card_amount"
                style={{ background: '#FF6332', color: 'white' }}
              >
                <p>Online Room Booking</p>
                <div className="main_repue_img">
                  <p>
                    ₹
                    {onlineamount[1]?.modeOfBooking === 2
                      ? onlineamount[1]?.total_amount
                      : '0'}.00
                  </p>
                  <img src={Group225} alt="dd" />
                </div>
              </div>
              <div
                className="main_card_amount"
                style={{ background: '#808080', color: 'white' }}
              >
                <p>Guest in Room</p>
                <div className="main_repue_img">
                  <p>
                    {Number(isDataadmin[0]?.male) +
                      Number(isDataadmin[0]?.female) +
                      Number(isDataadmin[0]?.child)}
                  </p>
                  <img src={Group228} alt="dd" />
                </div>
              </div>
            </>
          ) : (
            <>
              {profiledata?.electronicDonation === true && (
                <>
                  {
                    <div
                      onClick={() => navigate('/admin-panel/donation')}
                      className="main_card_amount"
                      style={{
                        background: '#FE0000',
                        color: 'white',
                        width: '23%',
                      }}
                    >
                      <p>Donation</p>
                      <div
                        className="main_repue_img"
                        style={{ color: '#05313C', fontWeight: 700 }}
                      >
                        <EmpelecTotal data={isData4} />
                        <img src={Group225} alt="dd" />
                      </div>
                    </div>
                  }
                </>
              )}

              {profiledata?.donation === true && (
                <>
                  {
                    <div
                      onClick={() => navigate('/admin-panel/donation')}
                      className="main_card_amount"
                      style={{
                        background: '#FE0000',
                        color: 'white',
                        width: '23%',
                      }}
                    >
                      <p>Donation</p>
                      <div
                        className="main_repue_img"
                        style={{ color: '#05313C', fontWeight: 700 }}
                      >
                        <EmpelecTotal data={isData4} />
                        <img src={Group225} alt="dd" />
                      </div>
                    </div>
                  }
                </>
              )}

              {emproleid === 1 && (
                <>
                  <div
                    onClick={() => navigate('/admin-panel/donation')}
                    className="main_card_amount"
                    style={{
                      background: '#FE0000',
                      color: 'white',
                      width: '23%',
                    }}
                  >
                    <p>Donation</p>
                    <div
                      className="main_repue_img"
                      style={{ color: '#05313C', fontWeight: 700 }}
                    >
                      <EmpelecTotal data={isData4} />
                      <img src={Group225} alt="dd" />
                    </div>
                  </div>

                  <div
                    onClick={() => navigate('/admin-panel/manualdonation')}
                    className="main_card_amount"
                    style={{
                      background: '#FECE00',
                      color: 'white',
                      width: '23%',
                    }}
                  >
                    <p>Manual Donation</p>
                    <div
                      className="main_repue_img"
                      style={{ color: '#05313C', fontWeight: 700 }}
                    >
                      <EmpmanulTotal data={isData5} />
                      <img src={Group225} alt="dd" />
                    </div>
                  </div>

                  <div
                    onClick={() => navigate('/admin-panel/room/Newcheckin')}
                    className="main_card_amount"
                    style={{
                      background: '#3C5FFE',
                      color: 'white',
                      width: '23%',
                    }}
                  >
                    <p>Room Booking</p>
                    <div className="main_repue_img">
                      <BookingEmpTotal data={bookemp} />
                      <img src={Group227} alt="dd" />
                    </div>
                  </div>

                  <div
                    className="main_card_amount"
                    style={{
                      background: '#808080',
                      color: 'white',
                      width: '23%',
                    }}
                  >
                    <p>Guest in Room</p>
                    <div className="main_repue_img">
                      <p>
                        {Number(isDataemp[0]?.male) +
                          Number(isDataemp[0]?.female) +
                          Number(isDataemp[0]?.child)}
                      </p>
                      <img src={Group228} alt="dd" />
                    </div>
                  </div>
                </>
              )}

              {profiledata?.manualDonation === true && (
                <>
                  <div
                    onClick={() => navigate('/admin-panel/manualdonation')}
                    className="main_card_amount"
                    style={{
                      background: '#FECE00',
                      color: 'white',
                      width: '23%',
                    }}
                  >
                    <p>Manual Donation</p>
                    <div
                      className="main_repue_img"
                      style={{ color: '#05313C', fontWeight: 700 }}
                    >
                      <EmpmanulTotal data={isData5} />
                      <img src={Group225} alt="dd" />
                    </div>
                  </div>
                </>
              )}

              {profiledata?.roomBooking === true && (
                <>
                  <div
                    onClick={() => navigate('/admin-panel/room/Newcheckin')}
                    className="main_card_amount"
                    style={{
                      background: '#3C5FFE',
                      color: 'white',
                      width: '23%',
                    }}
                  >
                    <p>Room Booking</p>
                    <div className="main_repue_img">
                      <BookingEmpTotal data={bookemp} />
                      <img src={Group227} alt="dd" />
                    </div>
                  </div>

                  <div
                    className="main_card_amount"
                    style={{
                      background: '#808080',
                      color: 'white',
                      width: '23%',
                    }}
                  >
                    <p>Guest in Room</p>
                    <div className="main_repue_img">
                      <p>
                        {Number(isDataemp[0]?.male) +
                          Number(isDataemp[0]?.female) +
                          Number(isDataemp[0]?.child)}
                      </p>
                      <img src={Group228} alt="dd" />
                    </div>
                  </div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </>
              )}
            </>
          )}
        </div>
      </div>

      <DashbordTap setopendashboard={setopendashboard} />
      {loader && <LoadingSpinner1 />}
    </>
  );
};

export default Dashboard;
