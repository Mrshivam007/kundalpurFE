import React, { useState, useEffect } from 'react';
import RoomBookingTap from '../RoomBookingTap';
import Print from '../../../../assets/Print.png';
import Tooltip from '@mui/material/Tooltip';
import { serverInstance } from '../../../../API/ServerInstance';
import LoadingSpinner1 from '../../../../components/Loading/LoadingSpinner1';
import './Dashbord.css';
function Dashbord({ setopendashboard }) {
  const [isData, setisData] = useState('');
  const [categoryRooms, setcategoryRooms] = useState('');
  const [loader, setloader] = useState(true);
  const getdata = () => {
    serverInstance('room/dharmashala-data', 'get').then((res) => {
      setloader(true);

      console.log(res);
      if (res?.data?.dharmsalas) {
        setloader(false);
        setisData(res?.data?.dharmsalas);
      }
    });
  };

  const getobject = (roomData) => {
    let localityParameterSets;
    if (roomData) {
      localityParameterSets = Object.entries(roomData).map(([key, val]) => ({
        name: key,
        value: val,
      }));
    }

    return localityParameterSets;
  };

  const getholdobject = (roomData) => {
    let localityParameterSets;
    if (roomData) {
      localityParameterSets = Object.entries(roomData).map(([key, val]) => ({
        name: key,
        value: val,
      }));
    }

    return localityParameterSets;
  };

  const getoccupidedobject = (roomData) => {
    let localityParameterSets;
    if (roomData) {
      localityParameterSets = Object.entries(roomData).map(([key, val]) => ({
        name: key,
        value: val,
      }));
    }

    return localityParameterSets;
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      <RoomBookingTap setopendashboard={setopendashboard} />
      <div className="print_all_align">
        <div className="only_flex">
          <p style={{ marginTop: '0px', marginBottom: '0px' }}>Print All</p>
          <Tooltip title="Print">
            <img
              src={Print}
              alt="dd"
              style={{ width: '25px', marginLeft: '1rem' }}
            />
          </Tooltip>
        </div>
      </div>
      <div>
        <h1 className="trust_text">
          श्री दिगम्बर जैन सिद्धक्षेत्र कुण्डलगिरि कुण्डलपुर दमोह (म.प्र.)
        </h1>

        {isData &&
          isData?.map((item, index) => {
            return (
              <>
                <div className="table_main_div" key={index}>
                  <table>
                    <tr
                      className="margintop_add"
                      style={{
                        borderBottom: '1px solid gray',
                        fontSize: '16px',
                        borderRight: '1px solid gray',
                      }}
                    >
                      <th colSpan={2}>धर्मशाला का विवरण</th>
                    </tr>
                    {getobject(item?.roomData)?.length > 0 ? (
                      <>
                        {getobject(item?.roomData)?.map((item, index) => {
                          return (
                            <>
                              <tr
                                style={{
                                  borderBottom: '1px solid gray',
                                  borderRight: '1px solid gray',
                                }}
                              >
                                <td>FacilityCategory</td>
                                <td>Available Rooms ({item?.value.length})</td>
                              </tr>
                              <tr
                                style={{
                                  borderBottom: '1px solid gray',
                                  borderRight: '1px solid gray',
                                }}
                              >
                                <td>{item?.name}</td>
                                <td
                                  style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                  }}
                                >
                                  {item?.value.map((x) => {
                                    return <span>{x},</span>;
                                  })}
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        <tr
                          style={{
                            borderBottom: '1px solid gray',
                            borderRight: '1px solid gray',
                          }}
                        >
                          <td>FacilityCategory</td>
                          <td>Available Rooms (0)</td>
                        </tr>
                        <tr
                          style={{
                            borderBottom: '1px solid gray',
                            borderRight: '1px solid gray',
                          }}
                        >
                          <td>.....</td>
                          <td>0</td>
                        </tr>
                      </>
                    )}
                  </table>
                  <table style={{ width: '60%' }}>
                    <tr
                      className="margintop_add"
                      style={{
                        borderBottom: '1px solid gray',
                        fontSize: '14px',
                      }}
                    >
                      <th colSpan={2}>धर्मशाला का नाम-{item?.name}</th>
                    </tr>

                    {getholdobject(item?.holdRooms)?.length > 0 ? (
                      <>
                        {getholdobject(item?.holdRooms).map((item, index) => {
                          return (
                            <>
                              <tr style={{ borderBottom: '1px solid gray' }}>
                                <td>Hold Room ({item?.value.length})</td>
                              </tr>
                              <tr
                                style={{
                                  borderBottom: '1px solid gray',
                                }}
                              >
                                <td>
                                  {item?.value?.length > 0
                                    ? item?.value.map((x) => {
                                        return <span>{x},</span>;
                                      })
                                    : '0'}
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        <tr style={{ borderBottom: '1px solid gray' }}>
                          <td>Hold Room (0)</td>
                        </tr>
                        <tr
                          style={{
                            borderBottom: '1px solid gray',
                          }}
                        >
                          <td>0</td>
                        </tr>
                      </>
                    )}
                  </table>
                  <table style={{ width: '30%' }}>
                    <tr
                      className="margintop_add"
                      style={{
                        borderBottom: '1px solid gray',
                      }}
                    >
                      <th colSpan={2}>&nbsp;</th>
                    </tr>
                    {getholdobject(item?.occupiedRooms)?.length > 0 ? (
                      <>
                        {getholdobject(item?.occupiedRooms)?.map(
                          (item, index) => {
                            return (
                              <>
                                <tr style={{ borderBottom: '1px solid gray' }}>
                                  <td>Occupied Room ({item?.value.length})</td>
                                </tr>
                                <tr
                                  style={{
                                    borderBottom: '1px solid gray',
                                  }}
                                >
                                  <td>
                                    {item?.value?.length > 0
                                      ? item?.value.map((x) => {
                                          return <span>{x},</span>;
                                        })
                                      : '0'}
                                  </td>
                                </tr>
                              </>
                            );
                          },
                        )}
                      </>
                    ) : (
                      <>
                        <tr style={{ borderBottom: '1px solid gray' }}>
                          <td>Occupied Room (0)</td>
                        </tr>
                        <tr
                          style={{
                            borderBottom: '1px solid gray',
                          }}
                        >
                          <td>0</td>
                        </tr>
                      </>
                    )}
                  </table>
                </div>
              </>
            );
          })}
      </div>
      {loader && <LoadingSpinner1 />}
    </>
  );
}

export default Dashbord;
