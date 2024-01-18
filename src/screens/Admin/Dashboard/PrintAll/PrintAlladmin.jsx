import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import Group224 from '../../../../assets/Group224.png';
import Group225 from '../../../../assets/Group225.png';
import Group227 from '../../../../assets/Group227.png';
import Group228 from '../../../../assets/Group228.png';
import { serverInstance } from '../../../../API/ServerInstance';
import DonationTotal from '../../TotalDashboardFun/DonationTotal';
import ManaulTotal from '../../TotalDashboardFun/ManaulTotal';
import OnlineTotal from '../../TotalDashboardFun/OnlineTotal';
import EmpelecTotal from '../../TotalDashboardFun/EmpelecTotal';
import EmpmanulTotal from '../../TotalDashboardFun/EmpmanulTotal';
import Typography from '@mui/material/Typography';
import Moment from 'moment-js';

function PrintAlladmin({ handleClose }) {
  const componentRef = useRef();
  const [userrole, setuserrole] = useState('');
  const [emproleid, setemproleid] = useState('');
  const [userName, setuserName] = useState('');
  const [isDataadmin, setisDataadmin] = useState('');
  const [isDataemp, setisDataemp] = useState('');
  const [bookingadmin, setbookingadmin] = useState('');
  const [bookemp, setbookemp] = useState('');
  const [isData1, setisData1] = useState('');
  const [isData2, setisData2] = useState('');
  const [isData3, setisData3] = useState('');
  const [isData4, setisData4] = useState('');
  const [isData5, setisData5] = useState('');
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
      console.log('ele data', res?.data?.data);
      setisData1(res?.data?.data);
    });
  };

  const getallmanual = () => {
    serverInstance('admin/dash-admin-total-manual', 'get').then((res) => {
      console.log('ele data', res?.data?.data);
      setisData2(res?.data?.data);
    });
  };

  const getallonline = () => {
    serverInstance('admin/dash-admin-total-online', 'get').then((res) => {
      console.log('ele data', res?.data?.data);
      setisData3(res?.data?.data);
    });
  };

  const getallempelec = () => {
    serverInstance('admin/dash-employee-total-elec', 'get').then((res) => {
      console.log('ele data', res?.data?.data);
      setisData4(res?.data?.data);
    });
  };

  const getallempmanual = () => {
    serverInstance('admin/dash-employee-total-manual', 'get').then((res) => {
      console.log('ele data', res?.data?.data);
      setisData5(res?.data?.data);
    });
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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
  useEffect(() => {
    setuserrole(Number(sessionStorage.getItem('userrole')));
    setemproleid(Number(sessionStorage.getItem('empRoleid')));
    setuserName(sessionStorage.getItem('empName'));
    getallelec(),
      getallmanual(),
      getallonline(),
      getallempelec(),
      getallempmanual();
    getAllguestadmin();
    getAllempguest();
    getempbooking();
    getadminbooking();
  }, []);

  var options = { year: 'numeric', month: 'short', day: '2-digit' };
  var today = new Date();
  const currDate = today
    .toLocaleDateString('en-IN', options)
    .replace(/-/g, ' ');
  const currTime = today.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return (
    <>
      <div style={{ maxHeight: 'calc(80vh - 4rem)', overflowY: 'auto' }}>
        <div ref={componentRef} style={{ padding: '1rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <p>
              श्री दिगम्बर जैन सिद्धक्षेत्र कुण्डलगिरि कुण्डलपुर दमोह (म.प्र.)
            </p>

            <Typography variant="body2" color="primary" align="right">
              {Moment(today).format('DD-MM-YYYY')}/ {currTime}
              {userName && <>({userName})</>}
            </Typography>
          </div>
          <div style={{ width: '100%' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '1rem',
                marginTop: '1rem',
              }}
            >
              {userrole === 1 || profiledata?.admin === true  ? (
                <>
                  <div
                    className="main_card_amount"
                    style={{
                      background: '#FE0000',
                      color: 'white',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '9px',
                      }}
                    >
                      Donation
                    </p>
                    <div className="main_repue_img">
                      <p
                        style={{
                          fontSize: '9px',
                        }}
                      >
                        {' '}
                        <DonationTotal data={isData1} />{' '}
                      </p>
                      <img
                        style={{
                          width: '20px',
                        }}
                        src={Group225}
                        alt="dd"
                      />
                    </div>
                  </div>
                  <div
                    className="main_card_amount"
                    style={{ background: '#FECE00', color: 'white' }}
                  >
                    <p
                      style={{
                        fontSize: '9px',
                      }}
                    >
                      Manual Donation
                    </p>
                    <div className="main_repue_img">
                      <p
                        style={{
                          fontSize: '9px',
                        }}
                      >
                        {' '}
                        <ManaulTotal data={isData2} />
                      </p>

                      <img
                        style={{
                          width: '20px',
                        }}
                        src={Group225}
                        alt="dd"
                      />
                    </div>
                  </div>
                  <div
                    className="main_card_amount"
                    style={{ background: '#009430', color: 'white' }}
                  >
                    <p
                      style={{
                        fontSize: '9px',
                      }}
                    >
                      Online Donation
                    </p>
                    <div className="main_repue_img">
                      <p
                        style={{
                          fontSize: '9px',
                        }}
                      >
                        {' '}
                        <OnlineTotal data={isData3} />
                      </p>

                      <img
                        style={{
                          width: '20px',
                        }}
                        src={Group224}
                        alt="dd"
                      />
                    </div>
                  </div>
                  <div
                    className="main_card_amount"
                    style={{ background: '#3C5FFE', color: 'white' }}
                  >
                    <p
                      style={{
                        fontSize: '9px',
                      }}
                    >
                      Room Booking
                    </p>
                    <div className="main_repue_img">
                      <p
                        style={{
                          fontSize: '9px',
                        }}
                      >
                        ₹ 0
                      </p>
                      <img
                        style={{
                          width: '20px',
                        }}
                        src={Group227}
                        alt="dd"
                      />
                    </div>
                  </div>
                  <div
                    className="main_card_amount"
                    style={{ background: '#FF6332', color: 'white' }}
                  >
                    <p
                      style={{
                        fontSize: '9px',
                      }}
                    >
                      Online Room Booking
                    </p>
                    <div className="main_repue_img">
                      <p
                        style={{
                          fontSize: '9px',
                        }}
                      >
                        ₹ 0
                      </p>
                      <img
                        style={{
                          width: '20px',
                        }}
                        src={Group225}
                        alt="dd"
                      />
                    </div>
                  </div>
                  <div
                    className="main_card_amount"
                    style={{ background: '#808080', color: 'white' }}
                  >
                    <p
                      style={{
                        fontSize: '9px',
                      }}
                    >
                      Guest in Room
                    </p>
                    <div className="main_repue_img">
                      <p
                        style={{
                          fontSize: '9px',
                        }}
                      >
                        0
                      </p>
                      <img
                        style={{
                          width: '20px',
                        }}
                        src={Group228}
                        alt="dd"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {profiledata?.manualDonation === true && (
                    <>
                      <div
                        className="main_card_amount"
                        style={{
                          background: '#FE0000',
                          color: 'white',
                          width: '23%',
                        }}
                      >
                        <p
                          style={{
                            fontSize: '14px',
                          }}
                        >
                          Donation
                        </p>
                        <div className="main_repue_img">
                          <p
                            style={{
                              fontSize: '14px',
                            }}
                          >
                            <EmpelecTotal data={isData4} />
                          </p>

                          <img
                            style={{
                              width: '20px',
                            }}
                            src={Group225}
                            alt="dd"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {profiledata?.electronicDonation === true && (
                    <>
                      <div
                        className="main_card_amount"
                        style={{
                          background: '#FECE00',
                          color: 'white',
                          width: '23%',
                        }}
                      >
                        <p style={{ fontSize: '14px' }}>Manual Donation</p>
                        <div className="main_repue_img">
                          <p
                            style={{
                              fontSize: '14px',
                            }}
                          >
                            <EmpmanulTotal data={isData5} />
                          </p>

                          <img
                            style={{
                              width: '20px',
                            }}
                            src={Group225}
                            alt="dd"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {profiledata?.roomBooking === true && (
                    <>
                      <div
                        className="main_card_amount"
                        style={{
                          background: '#3C5FFE',
                          color: 'white',
                          width: '23%',
                        }}
                      >
                        <p style={{ fontSize: '14px' }}>Room Booking</p>
                        <div className="main_repue_img">
                          <p
                            style={{
                              fontSize: '14px',
                            }}
                          >
                            ₹ 0
                          </p>
                          <img
                            style={{
                              width: '20px',
                            }}
                            src={Group227}
                            alt="dd"
                          />
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
                        <p style={{ fontSize: '14px' }}>Guest in Room</p>
                        <div className="main_repue_img">
                          <p
                            style={{
                              fontSize: '14px',
                            }}
                          >
                            0
                          </p>
                          <img
                            style={{
                              width: '20px',
                            }}
                            src={Group228}
                            alt="dd"
                          />
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
                    </>
                  )}

                  {emproleid === 1 && (
                    <>
                      <div
                        className="main_card_amount"
                        style={{
                          background: '#FE0000',
                          color: 'white',
                          width: '23%',
                        }}
                      >
                        <p
                          style={{
                            fontSize: '14px',
                          }}
                        >
                          Donation
                        </p>
                        <div className="main_repue_img">
                          <p
                            style={{
                              fontSize: '14px',
                            }}
                          >
                            <EmpelecTotal data={isData4} />
                          </p>

                          <img
                            style={{
                              width: '20px',
                            }}
                            src={Group225}
                            alt="dd"
                          />
                        </div>
                      </div>
                      <div
                        className="main_card_amount"
                        style={{
                          background: '#FECE00',
                          color: 'white',
                          width: '23%',
                        }}
                      >
                        <p style={{ fontSize: '14px' }}>Manual Donation</p>
                        <div className="main_repue_img">
                          <p
                            style={{
                              fontSize: '14px',
                            }}
                          >
                            <EmpmanulTotal data={isData5} />
                          </p>

                          <img
                            style={{
                              width: '20px',
                            }}
                            src={Group225}
                            alt="dd"
                          />
                        </div>
                      </div>
                      <div
                        className="main_card_amount"
                        style={{
                          background: '#3C5FFE',
                          color: 'white',
                          width: '23%',
                        }}
                      >
                        <p style={{ fontSize: '14px' }}>Room Booking</p>
                        <div className="main_repue_img">
                          <p
                            style={{
                              fontSize: '14px',
                            }}
                          >
                            ₹ 0
                          </p>
                          <img
                            style={{
                              width: '20px',
                            }}
                            src={Group227}
                            alt="dd"
                          />
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
                        <p style={{ fontSize: '14px' }}>Guest in Room</p>
                        <div className="main_repue_img">
                          <p
                            style={{
                              fontSize: '14px',
                            }}
                          >
                            0
                          </p>
                          <img
                            style={{
                              width: '20px',
                            }}
                            src={Group228}
                            alt="dd"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          {userrole === 1 || emproleid === 0 ? (
            <>
              <p
                style={{
                  color: '#FE0000',
                  marginTop: '1rem',
                  marginBottom: '1rem',
                }}
              >
                Donation(दान)
              </p>
              <table>
                <tr
                  className="margintop_add"
                  style={{ borderBottom: '1px solid gray' }}
                >
                  <th>Staff Name</th>
                  <th>Cash</th>
                  <th>Bank</th>
                  <th>Cheque</th>
                  <th>Total</th>
                </tr>
                {isData1 && (
                  <>
                    {isData1 &&
                      isData1.map((row, index) => (
                        <tr
                          className="margintop_add"
                          style={{ borderBottom: '1px solid gray' }}
                          key={index}
                        >
                          <td>{row?.employee_name}</td>

                          <td>{row?.cash_amount}</td>
                          <td>{row?.bank_amount}</td>
                          <td>{row?.cheque_amount}</td>
                          <td>{row?.total}</td>
                        </tr>
                      ))}
                  </>
                )}
                <tr
                  className="margintop_add"
                  style={{ borderBottom: '1px solid gray' }}
                >
                  <th>Total</th>
                  <th>
                    {isData1
                      ? isData1.reduce(
                          (n, { cash_amount }) =>
                            parseFloat(n) + parseFloat(cash_amount),
                          0,
                        )
                      : '0'}
                  </th>
                  <th>
                    {' '}
                    {isData1
                      ? isData1.reduce(
                          (n, { bank_amount }) =>
                            parseFloat(n) + parseFloat(bank_amount),
                          0,
                        )
                      : '0'}
                  </th>
                  <th>
                    {' '}
                    {isData1
                      ? isData1.reduce(
                          (n, { cheque_amount }) =>
                            parseFloat(n) + parseFloat(cheque_amount),
                          0,
                        )
                      : '0'}
                  </th>
                  <th>
                    {isData1
                      ? isData1.reduce(
                          (n, { total }) => parseFloat(n) + parseFloat(total),
                          0,
                        )
                      : '0'}
                  </th>
                </tr>
              </table>
              <p
                style={{
                  color: '#FECE00',
                  marginTop: '1rem',
                  marginBottom: '1rem',
                }}
              >
                Manual Donation (दान)
              </p>
              <table>
                <tr
                  className="margintop_add"
                  style={{ borderBottom: '1px solid gray' }}
                >
                  <th>Staff Name</th>
                  <th>Cash</th>
                  <th>Bank</th>
                  <th>Cheque</th>
                  <th>Total</th>
                </tr>
                {isData2 && (
                  <>
                    {isData2 &&
                      isData2.map((row, index) => (
                        <tr
                          className="margintop_add"
                          style={{ borderBottom: '1px solid gray' }}
                          key={index}
                        >
                          <td>{row?.employee_name}</td>

                          <td>{row?.cash_amount}</td>
                          <td>{row?.bank_amount}</td>
                          <td>{row?.cheque_amount}</td>
                          <td>{row?.total}</td>
                        </tr>
                      ))}
                  </>
                )}
                <tr
                  className="margintop_add"
                  style={{ borderBottom: '1px solid gray' }}
                >
                  <th>Total</th>
                  <th>
                    {isData2
                      ? isData2.reduce(
                          (n, { cash_amount }) =>
                            parseFloat(n) + parseFloat(cash_amount),
                          0,
                        )
                      : '0'}
                  </th>
                  <th>
                    {' '}
                    {isData2
                      ? isData2.reduce(
                          (n, { bank_amount }) =>
                            parseFloat(n) + parseFloat(bank_amount),
                          0,
                        )
                      : '0'}
                  </th>
                  <th>
                    {' '}
                    {isData2
                      ? isData2.reduce(
                          (n, { cheque_amount }) =>
                            parseFloat(n) + parseFloat(cheque_amount),
                          0,
                        )
                      : '0'}
                  </th>
                  <th>
                    {isData2
                      ? isData2.reduce(
                          (n, { total }) => parseFloat(n) + parseFloat(total),
                          0,
                        )
                      : '0'}
                  </th>
                </tr>
              </table>
              <p
                style={{
                  color: '#009430',
                  marginTop: '1rem',
                  marginBottom: '1rem',
                }}
              >
                Online Donation(दान)
              </p>
              <table>
                <tr
                  className="margintop_add"
                  style={{ borderBottom: '1px solid gray' }}
                >
                  {' '}
                  <th>&nbsp;</th>
                  <th>Bank</th>
                  <th>Cheque</th>
                  <th>Total</th>
                </tr>
                {isData3 && (
                  <>
                    {isData3 &&
                      isData3.map((row, index) => (
                        <tr key={index} className="margintop_add">
                          <td>&nbsp;</td>
                          <td>{row?.Online_amount}</td>

                          <td>{row?.Cheque_amount}</td>
                          <td>{row?.total}</td>
                        </tr>
                      ))}
                  </>
                )}
                <tr
                  className="margintop_add"
                  style={{ borderBottom: '1px solid gray' }}
                >
                  <th>&nbsp;</th>
                  <th>
                    {' '}
                    {isData3
                      ? isData3.reduce(
                          (n, { Online_amount }) =>
                            parseFloat(n) + parseFloat(Online_amount),
                          0,
                        )
                      : '0'}
                  </th>
                  <th>
                    {isData3
                      ? isData3.reduce(
                          (n, { Cheque_amount }) =>
                            parseFloat(n) + parseFloat(Cheque_amount),
                          0,
                        )
                      : '0'}
                  </th>
                  <th>
                    {isData3
                      ? isData3.reduce(
                          (n, { total }) => parseFloat(n) + parseFloat(total),
                          0,
                        )
                      : '0'}
                  </th>
                </tr>
              </table>
              <p
                style={{
                  color: '#3C5FFE',
                  marginBottom: '1rem',
                  marginTop: '1rem',
                }}
              >
                Room Booking(आवास)
              </p>
              <table>
                <tr
                  className="margintop_add"
                  style={{ borderBottom: '1px solid gray' }}
                >
                  <th>Username</th>

                  <th>Cash</th>
                  <th>Bank</th>
                  {/* <th>Total</th> */}
                </tr>
                {bookingadmin && (
                  <>
                    {bookingadmin &&
                      bookingadmin.map((row, index) => (
                        <tr
                          className="margintop_add"
                          style={{ borderBottom: '1px solid gray' }}
                          key={index}
                        >
                          <td>{row?.Username}</td>
                          <td>{row?.cash}</td>
                          <td>{row?.online}</td>
                        </tr>
                      ))}
                  </>
                )}
                <tr
                  className="margintop_add"
                  style={{ borderBottom: '1px solid gray' }}
                >
                  <th>Total</th>
                  <th>
                    {bookingadmin
                      ? bookingadmin.reduce(
                          (n, { cash }) => parseFloat(n) + parseFloat(cash),
                          0,
                        )
                      : '0'}
                  </th>
                  <th>
                    {' '}
                    {bookingadmin
                      ? bookingadmin.reduce(
                          (n, { online }) => parseFloat(n) + parseFloat(online),
                          0,
                        )
                      : '0'}
                  </th>
                </tr>
              </table>
              <p
                style={{
                  color: '#FF6332',
                  marginBottom: '1rem',
                  marginTop: '1rem',
                }}
              >
                Online Room Booking(आवास)
              </p>
              <table>
                <tr
                  className="margintop_add"
                  style={{ borderBottom: '1px solid gray' }}
                >
                  <th>User Name</th>
                  <th>Amout</th>
                </tr>
                <tr>
                  <td>Anil Babu</td>
                  <td>0</td>
                </tr>
                <tr>
                  <th>Total</th>
                  <th>0</th>
                </tr>
              </table>
              <p
                style={{
                  color: '#808080',
                  marginTop: '1rem',
                  marginBottom: '1rem',
                }}
              >
                Guest In Room(यात्री संख्या)
              </p>
              <table>
                <tr
                  className="margintop_add"
                  style={{ borderBottom: '1px solid gray' }}
                >
                  <th>Gender</th>
                  <th>Quantity</th>
                </tr>
                {isDataadmin && (
                  <>
                    <tr
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <td>male</td>
                      <td>
                        {isDataadmin[0]?.male === null
                          ? '0'
                          : isDataadmin[0]?.male}
                      </td>
                    </tr>
                    <tr
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <td>female</td>
                      <td>
                        {isDataadmin[0]?.female === null
                          ? '0'
                          : isDataadmin[0]?.female}
                      </td>
                    </tr>
                    <tr
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <td>child</td>
                      <td>
                        {isDataadmin[0]?.child === null
                          ? '0'
                          : isDataadmin[0]?.child}
                      </td>
                    </tr>
                  </>
                )}
                <tr
                  className="margintop_add"
                  style={{ borderBottom: '1px solid gray' }}
                >
                  <th>Total</th>
                  <th>
                    {Number(isDataadmin[0]?.male) +
                      Number(isDataadmin[0]?.female) +
                      Number(isDataadmin[0]?.child)}
                  </th>
                </tr>
              </table>
            </>
          ) : (
            <>
           

              {emproleid === 1 && (
                <>
                  <p
                    style={{
                      color: '#FE0000',
                      marginTop: '1rem',
                      marginBottom: '1rem',
                    }}
                  >
                    Donation(दान)
                  </p>
                  <table>
                    <tr
                      className="margintop_add"
                      style={{ borderBottom: '1px solid gray' }}
                    >
                      <th>Cash</th>
                      <th>Bank</th>
                      <th>Cheque</th>
                      <th>Total</th>
                    </tr>
                    {isData4 && (
                      <>
                        {isData4 &&
                          isData4.map((row, index) => (
                            <tr
                              key={index}
                              className="margintop_add"
                              style={{ borderBottom: '1px solid gray' }}
                            >
                              <td>{row.cash_amount}</td>

                              <td>{row.bank_amount}</td>
                              <td>{row.cheque_amount}</td>

                              <td>{row.total}</td>
                            </tr>
                          ))}
                      </>
                    )}
                  </table>

                  <p
                    style={{
                      color: '#3C5FFE',
                      marginBottom: '1rem',
                      marginTop: '1rem',
                    }}
                  >
                    Room Booking(आवास)
                  </p>
                  <table>
                    <tr
                      className="margintop_add"
                      style={{ borderBottom: '1px solid gray' }}
                    >
                      <th>Username</th>
                      <th>Online</th>
                      <th>Cash</th>
                      <th>Total</th>
                    </tr>
                    {bookemp && (
                      <>
                        {bookemp &&
                          bookemp.map((row, index) => (
                            <tr
                              className="margintop_add"
                              style={{ borderBottom: '1px solid gray' }}
                              key={index}
                            >
                              <td>{row?.Username}</td>
                              <td>{row?.online}</td>
                              <td>{row?.cash}</td>
                              <td>{Number(row?.cash) + Number(row?.online)}</td>
                            </tr>
                          ))}
                      </>
                    )}
                  </table>
                  <p
                    style={{
                      color: '#808080',
                      marginTop: '1rem',
                      marginBottom: '1rem',
                    }}
                  >
                    Guest In Room(यात्री संख्या)
                  </p>
                  <table>
                    <tr
                      className="margintop_add"
                      style={{ borderBottom: '1px solid gray' }}
                    >
                      <th>Gender</th>
                      <th>Quantity</th>
                    </tr>
                    {isDataemp && (
                      <>
                        <tr
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <td>male</td>
                          <td>
                            {isDataemp[0]?.male === null
                              ? '0'
                              : isDataemp[0]?.male}
                          </td>
                        </tr>
                        <tr
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <td>female</td>
                          <td>
                            {isDataemp[0]?.female === null
                              ? '0'
                              : isDataemp[0]?.female}
                          </td>
                        </tr>
                        <tr
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <td>child</td>
                          <td>
                            {isDataemp[0]?.child === null
                              ? '0'
                              : isDataemp[0]?.child}
                          </td>
                        </tr>
                      </>
                    )}
                    <tr
                      className="margintop_add"
                      style={{ borderBottom: '1px solid gray' }}
                    >
                      <th>Total</th>
                      <th>
                        {Number(isDataemp[0]?.male) +
                          Number(isDataemp[0]?.female) +
                          Number(isDataemp[0]?.child)}
                      </th>
                    </tr>
                  </table>
                </>
              )}

              {profiledata?.electronicDonation === true && (
                <>
                  <p
                    style={{
                      color: '#FE0000',
                      marginTop: '1rem',
                      marginBottom: '1rem',
                    }}
                  >
                    Donation(दान)
                  </p>
                  <table>
                    <tr
                      className="margintop_add"
                      style={{ borderBottom: '1px solid gray' }}
                    >
                      <th>Cash</th>
                      <th>Bank</th>
                      <th>Cheque</th>
                      <th>Total</th>
                    </tr>
                    {isData4 && (
                      <>
                        {isData4 &&
                          isData4.map((row, index) => (
                            <tr
                              key={index}
                              className="margintop_add"
                              style={{ borderBottom: '1px solid gray' }}
                            >
                              <td>{row.cash_amount}</td>

                              <td>{row.bank_amount}</td>
                              <td>{row.cheque_amount}</td>

                              <td>{row.total}</td>
                            </tr>
                          ))}
                      </>
                    )}
                  </table>
                </>
              )}

              {profiledata?.donation === true && (
                <>
                  <p
                    style={{
                      color: '#FE0000',
                      marginTop: '1rem',
                      marginBottom: '1rem',
                    }}
                  >
                    Donation(दान)
                  </p>
                  <table>
                    <tr
                      className="margintop_add"
                      style={{ borderBottom: '1px solid gray' }}
                    >
                      <th>Bank</th>
                    </tr>
                    {isData4 && (
                      <>
                        {isData4 &&
                          isData4.map((row, index) => (
                            <tr
                              key={index}
                              className="margintop_add"
                              style={{ borderBottom: '1px solid gray' }}
                            >
                              <td>{row.bank_amount}</td>
                            </tr>
                          ))}
                      </>
                    )}
                  </table>
                </>
              )}

              {profiledata?.manualDonation === true && (
                <>
                  <p
                    style={{
                      color: '#FECE00',
                      marginTop: '1rem',
                      marginBottom: '1rem',
                    }}
                  >
                    Manual Donation (दान)
                  </p>
                  <table>
                    <tr
                      className="margintop_add"
                      style={{
                        borderBottom: '1px solid gray',
                        fontSize: '14px',
                      }}
                    >
                      <th>Cash</th>
                      <th>Bank</th>
                      <th>Cheque</th>
                      <th>Total</th>
                    </tr>
                    {isData5 && (
                      <>
                        {isData5 &&
                          isData5.map((row, index) => (
                            <tr
                              key={index}
                              className="margintop_add"
                              style={{ borderBottom: '1px solid gray' }}
                            >
                              <td>{row.cash_amount}</td>

                              <td>{row.bank_amount}</td>
                              <td>{row.cheque_amount}</td>

                              <td>{row.total}</td>
                            </tr>
                          ))}
                      </>
                    )}
                  </table>
                </>
              )}

              {profiledata?.roomBooking === true && (
                <>
                  <p
                    style={{
                      color: '#3C5FFE',
                      marginBottom: '1rem',
                      marginTop: '1rem',
                    }}
                  >
                    Room Booking(आवास)
                  </p>
                  <table>
                    <tr
                      className="margintop_add"
                      style={{ borderBottom: '1px solid gray' }}
                    >
                      <th>Username</th>
                      <th>Online</th>
                      <th>Cash</th>
                      {/* <th>Total</th> */}
                    </tr>
                    {bookemp && (
                      <>
                        {bookemp &&
                          bookemp.map((row, index) => (
                            <tr
                              className="margintop_add"
                              style={{ borderBottom: '1px solid gray' }}
                              key={index}
                            >
                              <td>{row?.userName}</td>
                              <td>{row?.bank}</td>
                              <td>{row?.cash}</td>
                              {/* <td>{Number(row?.cash) + Number(row?.bank)}</td> */}
                            </tr>
                          ))}
                      </>
                    )}
                    <tr
                      className="margintop_add"
                      style={{ borderBottom: '1px solid gray' }}
                    >
                      <th>Total</th>
                      <th>
                        {bookemp
                          ? bookemp.reduce(
                              (n, { bank }) => parseFloat(n) + parseFloat(bank),
                              0,
                            )
                          : '0'}
                      </th>
                      <th>
                        {' '}
                        {bookemp
                          ? bookemp.reduce(
                              (n, { cash }) => parseFloat(n) + parseFloat(cash),
                              0,
                            )
                          : '0'}
                      </th>
                    </tr>
                  </table>

                  <p
                    style={{
                      color: '#808080',
                      marginTop: '1rem',
                      marginBottom: '1rem',
                    }}
                  >
                    Guest In Room(यात्री संख्या)
                  </p>
                  <table>
                    <tr
                      className="margintop_add"
                      style={{ borderBottom: '1px solid gray' }}
                    >
                      <th>Gender</th>
                      <th>Quantity</th>
                    </tr>
                    {isDataemp && (
                      <>
                        <tr
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <td>male</td>
                          <td>
                            {isDataemp[0]?.male === null
                              ? '0'
                              : isDataemp[0]?.male}
                          </td>
                        </tr>
                        <tr
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <td>female</td>
                          <td>
                            {isDataemp[0]?.female === null
                              ? '0'
                              : isDataemp[0]?.female}
                          </td>
                        </tr>
                        <tr
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <td>child</td>
                          <td>
                            {isDataemp[0]?.child === null
                              ? '0'
                              : isDataemp[0]?.child}
                          </td>
                        </tr>
                      </>
                    )}
                    <tr
                      className="margintop_add"
                      style={{ borderBottom: '1px solid gray' }}
                    >
                      <th>Total</th>
                      <th>
                        {Number(isDataadmin[0]?.male) +
                          Number(isDataadmin[0]?.female) +
                          Number(isDataadmin[0]?.child)}
                      </th>
                    </tr>
                  </table>
                </>
              )}
            </>
          )}
        </div>
      </div>

      <div className="save-div-btn">
        <button onClick={() => handlePrint()} className="save-div-btn-btn">
          Print
        </button>
        <button
          onClick={() => handleClose()}
          className="save-div-btn-btn-cancel"
        >
          Cancel
        </button>
      </div>
    </>
  );
}

export default PrintAlladmin;
