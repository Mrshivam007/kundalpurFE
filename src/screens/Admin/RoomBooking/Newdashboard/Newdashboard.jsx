import React, { useState, useEffect, useRef } from 'react';
import RoomBookingTap from '../RoomBookingTap';
import Print from '../../../../assets/Print.png';
import { serverInstance } from '../../../../API/ServerInstance';
import LoadingSpinner1 from '../../../../components/Loading/LoadingSpinner1';
import Tooltip from '@mui/material/Tooltip';
import { useReactToPrint } from 'react-to-print';
import './Newdashboard.css';
function Newdashboard({ setopendashboard }) {
  const componentRef = useRef();
  const [isData, setisData] = useState('');
  const [categoryRooms, setcategoryRooms] = useState('');
  const [roomdetails, setroomdetails] = useState('');
  const [dharamshalaname, setdharamshalaname] = useState('');
  const [Dharamshala, setDharamshala] = useState('');
  const [loader, setloader] = useState(true);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const getdata = () => {
    try {
      serverInstance('room/dharmashala-data', 'post').then((res) => {
        setloader(true);
        if (res?.data?.dharmsalas) {
          setloader(false);
          setisData(res?.data?.dharmsalas);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const filterdata = () => {
    try {
      setloader(true);
      serverInstance('room/dharmashala-data', 'post', {
        name: dharamshalaname,
      }).then((res) => {
        if (res?.data?.dharmsalas) {
          setloader(false);
          setisData(res?.data?.dharmsalas);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const resetbtn = () => {
    setdharamshalaname('');
    filterdata();
  };
  const getroomdetails = () => {
    serverInstance('room/room-detail', 'get').then((res) => {
      setloader(true);
      if (res?.data) {
        setloader(false);
        setroomdetails(res?.data);
      }
    });
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

  const getalldharamshala = () => {
    serverInstance('room/get-dharmasalas', 'get').then((res) => {
      if (res.data) {
        setDharamshala(res.data);
      }
    });
  };

  useEffect(() => {
    getdata();
    getroomdetails();
    getalldharamshala();
  }, []);

  return (
    <>
      <RoomBookingTap setopendashboard={setopendashboard} />
      <div className="mainrooomdashboard">
        <div
          className="mainrooomdashboardinnear"
          style={{ backgroundColor: 'yellowgreen' }}
        >
          <span className="textco"> Total Rooms</span> {roomdetails?.totalRooms}
        </div>
        <div
          className="mainrooomdashboardinnear"
          style={{ backgroundColor: 'turquoise' }}
        >
          <span className="textco"> Occupied Rooms </span>
          {roomdetails?.occupiedRooms}
        </div>
        <div
          className="mainrooomdashboardinnear"
          style={{ backgroundColor: 'coral' }}
        >
          <span className="textco"> Hold Rooms</span> {roomdetails?.holdRooms}
        </div>
        <div
          className="mainrooomdashboardinnear"
          style={{ backgroundColor: 'burlywood' }}
        >
          <span className="textco"> Available Rooms </span>
          {roomdetails?.availableRooms}
        </div>
      </div>

      <div
        className="search-header "
        style={{ paddingLeft: '5.5%', paddingRight: '12.3rem' }}
      >
        <div className="search-inner-div-reports">
          <div className="search-inner-div-reports" style={{ width: '40%' }}>
            <div className="Center_main_dic_filetr">
              <label>Dharamshala</label>
              <select
                value={dharamshalaname}
                onChange={(e) => {
                  setdharamshalaname(e.target.value);
                  getallcategory(e.target.value);
                }}
              >
                <option>All</option>
                {Dharamshala
                  ? Dharamshala.map((item, index) => {
                      return (
                        <option key={item?.dharmasala_id} value={item?.name}>
                          {item?.name}
                        </option>
                      );
                    })
                  : ''}
              </select>
            </div>
            <div className="Center_main_dic_filetr">
              <label>&nbsp;</label>
              <button onClick={() => filterdata()}>Search</button>
            </div>
          </div>
          <div className="Center_main_dic_filetr">
            <label>&nbsp;</label>
            <button onClick={() => resetbtn()}>Reset</button>
          </div>
          <div className="Center_main_dic_filetr">
            <label>&nbsp;</label>
            <Tooltip title="Print Report">
              <img
                onClick={() => handlePrint()}
                style={{ width: '30px' }}
                src={Print}
                alt=" Print"
              />
            </Tooltip>
          </div>
          <div className="availablediv">
            <p>Available Room</p>
          </div>
          <div className="Occupieddiv">
            <p>Occupied Room</p>
          </div>
          <div className="holddiv">
            <p>Hold Room</p>
          </div>
        </div>
      </div>
      <div ref={componentRef} style={{ paddingTop: '1rem' }}>
        {isData &&
          isData?.map((item, index) => {
            return (
              <div
                key={index}
                style={{ paddingLeft: '5.5%', paddingRight: '.3rem' }}
              >
                <div className="borderisbodediv">
                  <h3>धर्मशाला का नाम</h3>
                </div>
                <div className="borderisbodediv10">
                  <p>{item?.name}</p>
                </div>
                <div className="borderisbodediv">
                  <h3>धर्मशाला का विवरण</h3>
                </div>
                {item?.roomData &&
                  getholdobject(item?.roomData)?.map((item) => {
                    return (
                      <div>
                        <div
                          className="borderisbodediv"
                          style={{ backgroundColor: '#60b060' }}
                        >
                          <h3>
                            Category and Available Rooms ({item?.value?.length})
                          </h3>
                        </div>
                        <div className="borderisbodediv10">
                          <p>{item?.name}</p>
                        </div>
                        <div className="borderisbodediv10">
                          <p>
                            {item?.value?.map((i) => {
                              return `${i},`;
                            })}
                          </p>
                        </div>
                      </div>
                    );
                  })}

                {item?.roomData &&
                  getholdobject(item?.occupiedRooms)?.map((item) => {
                    return (
                      <div>
                        <div
                          className="borderisbodediv"
                          style={{ backgroundColor: 'teal' }}
                        >
                          <h3>
                            Category And Occupied Room {item?.name} (
                            {item?.value?.length})
                          </h3>
                        </div>
                        <div className="borderisbodediv10">
                          <p>
                            {item?.value?.map((i) => {
                              return `${i},`;
                            })}
                          </p>
                        </div>
                      </div>
                    );
                  })}

                {item?.roomData &&
                  getholdobject(item?.holdRooms)?.map((item) => {
                    return (
                      <div>
                        <div
                          className="borderisbodediv"
                          style={{ backgroundColor: 'blueviolet' }}
                        >
                          <h3>
                            Category And Hold Room {item?.name} (
                            {item?.value?.length})
                          </h3>
                        </div>
                        <div className="borderisbodediv10">
                          <p>
                            {item?.value?.map((i) => {
                              return `${i},`;
                            })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
      {loader && <LoadingSpinner1 />}
    </>
  );
}

export default Newdashboard;
