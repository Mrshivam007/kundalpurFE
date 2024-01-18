import React, { useState, useEffect, useRef } from 'react';
import RoomBookingTap from '../RoomBookingTap';
import Print from '../../../../assets/Print.png';
import { serverInstance } from '../../../../API/ServerInstance';
import LoadingSpinner1 from '../../../../components/Loading/LoadingSpinner1';
import Tooltip from '@mui/material/Tooltip';
import { useReactToPrint } from 'react-to-print';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import '../Newdashboard/Newdashboard.css';
function NowDashboard({ setopendashboard }) {
  const componentRef = useRef();
  const navigate = useNavigate();
  const [isData, setisData] = useState('');
  const [categoryRooms, setcategoryRooms] = useState('');
  const [roomdetails, setroomdetails] = useState('');
  const [dharamshalaname, setdharamshalaname] = useState('');
  const [Dharamshala, setDharamshala] = useState('');
  const [loader, setloader] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const getdata = () => {
    try {
      serverInstance('room/dharmashala-data', 'post').then((res) => {
        setloader(true);

        console.log('data is ', res);
        if (res?.data?.data) {
          setloader(false);
          setisData(res?.data?.data);
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
        if (res?.data?.data) {
          setloader(false);
          setisData(res?.data?.data);
        }
        console.log("dharamsjala ",res?.data?.data);
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
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  console.log('dharamshala data is ', isData);
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
        style={{ paddingLeft: '5.5%', paddingRight: '48.3rem' }}
      >
        <div className="search-inner-div-reports" style={{ pa: '20rem' }}>
          <div className="search-inner-div-reports">
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
        </div>
      </div>
      <div style={{ paddingLeft: '4.5%', paddingRight: '0.5rem' }}>
        <div ref={componentRef} style={{ padding: '1rem' }}>
          {isData &&
            isData?.map((item20, index) => {
              return (
                <div>
                  <p style={{ marginBottom: '1rem', marginTop: '1rem' }}>
                    धर्मशाला का नाम : {item20?.name}
                  </p>
                  <Table
                    sx={{ minWidth: 650, width: '100%' }}
                    aria-label="simple table"
                  >
                    <TableHead style={{ background: '#F1F0F0' }}>
                      <TableRow>
                        <TableCell>
                          Category
                          {/* <i
                            style={{ marginLeft: '0rem' }}
                            // onClick={() => sortData('booking_id')}
                            class={`fa fa-sort`}
                          /> */}
                        </TableCell>
                        <TableCell>
                          Occupied Room
                          {/* <i
                            style={{ marginLeft: '0rem' }}
                            // onClick={() => sortData('contactNo')}
                            class={`fa fa-sort`}
                          /> */}
                        </TableCell>

                        <TableCell>
                          Hold Room
                          {/* <i
                            style={{ marginLeft: '0rem' }}
                            // onClick={() => sortData('name')}
                            class={`fa fa-sort`}
                          /> */}
                        </TableCell>

                        <TableCell>
                          Available Rooms
                          {/* <i
                            style={{ marginLeft: '0rem' }}
                            // onClick={() => sortData('dharmasala?.name')}
                            class={`fa fa-sort`}
                          /> */}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {item20?.categories?.map((item, index) => {
                        return (
                          <TableRow>
                            <TableCell>
                              {item?.category} {console.log(item)}
                            </TableCell>
                            <TableCell sx={{ background: '#40e0d0' }}>
                              {item?.occupiedRooms?.length === 0
                                ? '0'
                                : item?.occupiedRooms?.map((item) => {
                                    return <span>{item}&nbsp;&nbsp;</span>;
                                  })}
                            </TableCell>
                            <TableCell sx={{ background: '#ff7f50' }}>
                              {item?.holdRooms?.length === 0
                                ? '0'
                                : item?.holdRooms?.map((item) => {
                                    return <span>{item}&nbsp;&nbsp;</span>;
                                  })}
                            </TableCell>
                            <TableCell sx={{ background: '#deb887' }}>
                              {item?.availableRooms?.length === 0
                                ? '0'
                                : item?.availableRooms?.map((item10) => {
                                    return (
                                      <span
                                        onClick={() =>
                                          navigate(
                                            '/admin-panel/room/Newcheckin',
                                            {
                                              state: {
                                                roomNo: item10,
                                                item:item,
                                                dharamshalaDetails:item20
                                              },
                                            },
                                          )
                                        }
                                      >
                                        {item10}&nbsp;&nbsp;
                                      </span>
                                    );
                                  })}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                    {/* <TableFooter>
            <TableRow>
              <TablePagination
                //   count={isData && isData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[50, 100, 250]}
                labelRowsPerPage={<span>Rows:</span>}
                labelDisplayedRows={({ page }) => {
                  return `Page: ${page}`;
                }}
                backIconButtonProps={{
                  color: 'secondary',
                }}
                nextIconButtonProps={{ color: 'secondary' }}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'page number',
                  },
                }}
              />
            </TableRow>
          </TableFooter> */}
                  </Table>
                </div>
              );
            })}
        </div>
      </div>
      {loader && <LoadingSpinner1 />}
    </>
  );
}

export default NowDashboard;
